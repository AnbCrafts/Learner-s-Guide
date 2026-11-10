import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';
import { Topic } from '../models/Topic.js';
import { Question } from '../models/Question.js';
import { isDbConnected } from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CONTENT_DIR = path.join(__dirname, '..', 'content');

let cachedTopics = [];
let cachedQuestions = {}; // { [topicSlug]: Question[] }
let cachedMarkdown = {};  // { [topicSlug]: { content, toc, frontmatter } }

function extractTOC(markdown) {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const toc = [];
  let match;
  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim().replace(/[*_~`]/g, '');
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    toc.push({ level, text, id });
  }
  return toc;
}

function estimateReadingTime(text) {
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

async function scanDirectory(dir) {
  let files = [];
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        const subFiles = await scanDirectory(fullPath);
        files = files.concat(subFiles);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        files.push(fullPath);
      }
    }
  } catch (err) {
    return [];
  }
  return files;
}

// Dynamically extract questions embedded in Markdown content
function extractQuestionsFromMarkdown(markdown, slug) {
  const questions = [];

  // Pattern 1: Practice Questions with Solution
  // Matches: * **TCS Practice Question:** ... * **Solution:** ...
  // Or: **Question**: ... > **Solution**: ...
  const qRegex = /(?:[*\-]\s*)?\*\*(?:TCS\s+)?(?:Practice\s+)?Question:?\*\*\s*:?\s*([\s\S]+?)(?:[*\->]\s*)?\*\*Solution:?\*\*\s*:?\s*([\s\S]+?)(?=\n---\s*|\n###\s+Type|\n###\s+Q\d+|\n#\s+|$)/gi;
  let m;
  let idx = 1;

  while ((m = qRegex.exec(markdown)) !== null) {
    const rawPrompt = m[1].trim();
    const rawSolution = m[2].trim();

    // Check for A) B) C) D) options in prompt
    const optRegex = /(?:^|\n)\s*([A-D])[\)\.]\s+([^\n]+)/g;
    let optMatch;
    const options = [];

    while ((optMatch = optRegex.exec(rawPrompt)) !== null) {
      options.push({
        id: optMatch[1].toLowerCase(),
        text: optMatch[2].trim(),
        isCorrect: false,
      });
    }

    let cleanPrompt = rawPrompt;
    if (options.length >= 2) {
      cleanPrompt = rawPrompt.replace(/(?:^|\n)\s*[A-D][\)\.]\s+[^\n]+/g, '').trim();
      const correctMatch = rawSolution.match(/(?:Option|Part)\s+\*?\*?\(?([A-D])\)?\*?\*?/i);
      if (correctMatch) {
        const letter = correctMatch[1].toLowerCase();
        const target = options.find(o => o.id === letter);
        if (target) target.isCorrect = true;
      } else {
        options[0].isCorrect = true;
      }
    }

    // Extract trap or hint
    let hint = '';
    const trapMatch = rawSolution.match(/(?:\*Trap to avoid:\*|\*\*Trap:\*\*|Hint:?)\s*([^\n\.]+[\.]?)/i);
    if (trapMatch) hint = trapMatch[1].trim();

    // Extract target bold answer if numerical problem
    let targetAnswer = '';
    const boldMatch = rawSolution.match(/\\mathbf\{([^}]+)\}/);
    if (boldMatch) {
      targetAnswer = boldMatch[1].replace(/\\/g, '').trim();
    }

    questions.push({
      topicSlug: slug,
      questionId: `q_${slug}_${idx++}`,
      prompt: cleanPrompt,
      type: options.length >= 2 ? 'mcq' : 'practice',
      options: options,
      targetAnswer: targetAnswer,
      explanation: rawSolution,
      hint: hint,
      difficulty: 'Medium',
      tags: [],
    });
  }

  // Pattern 2: Coding Problem statements (### Problem 1: ...)
  const regex2 = /(?:^|\n)###\s+Problem\s+(\d+):\s*([^\n]+)([\s\S]+?)(?=\n###\s+Problem|\n##\s+|$)/gi;
  let m2;
  while ((m2 = regex2.exec(markdown)) !== null) {
    const pNum = m2[1];
    const pTitle = m2[2].trim();
    const pBody = m2[3].trim();
    const stmtMatch = pBody.match(/\*\s*\*\*Statement:\*\*\s*([\s\S]+?)(?=\n\*\s*\*\*|\n###|$)/i);
    const hintMatch = pBody.match(/\*\s*\*\*Hint:\*\*\s*([\s\S]+?)(?=\n\*\s*\*\*|\n###|$)/i);
    const promptText = stmtMatch ? `${pTitle}: ${stmtMatch[1].trim()}` : `${pTitle}\n\n${pBody.slice(0, 300)}`;

    questions.push({
      topicSlug: slug,
      questionId: `q_${slug}_prob_${pNum}`,
      prompt: promptText,
      type: 'coding',
      options: [],
      explanation: pBody,
      hint: hintMatch ? hintMatch[1].trim() : '',
      difficulty: 'Medium',
      tags: ['coding'],
    });
  }

  return questions;
}

export async function syncContent() {
  const mdFiles = await scanDirectory(CONTENT_DIR);
  const topics = [];
  const questionsBySlug = {};
  const markdownBySlug = {};

  for (const filePath of mdFiles) {
    const rawContent = await fs.readFile(filePath, 'utf-8');
    const parsed = matter(rawContent);
    const relativePath = path.relative(CONTENT_DIR, filePath).replace(/\\/g, '/');
    const pathParts = relativePath.split('/');
    const fileName = path.basename(filePath, '.md');

    let extractedTitle = null;
    const h1Match = parsed.content.match(/^#\s+(.+)$/m);
    if (h1Match) {
      extractedTitle = h1Match[1].trim().replace(/[*_`]/g, '');
    }

    let folderCategory = 'General';
    if (pathParts.length > 1) {
      folderCategory = pathParts[0]
        .replace(/^\d+[-_]/, '')
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());
    } else if (fileName.includes('tcs') || fileName.includes('plan')) {
      folderCategory = 'Strategy & Plans';
    }

    const slug = (parsed.data.slug || fileName)
      .toLowerCase()
      .replace(/[_\s]+/g, '-')
      .replace(/[^\w-]/g, '');

    const title = parsed.data.title || extractedTitle || fileName
      .replace(/^\d+[-_]/, '')
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());

    const category = parsed.data.category || folderCategory;
    const difficulty = parsed.data.difficulty || 'Beginner';
    const tags = Array.isArray(parsed.data.tags) ? parsed.data.tags : [];
    const order = typeof parsed.data.order === 'number' ? parsed.data.order : 0;
    const estimatedMinutes = parsed.data.estimatedMinutes || estimateReadingTime(parsed.content);
    const summary = parsed.data.summary || parsed.content.slice(0, 160).replace(/[#*_`]/g, '').trim() + '...';

    // 1. Check companion questions JSON
    let questions = [];
    const jsonPath = path.join(path.dirname(filePath), `${fileName}.questions.json`);
    try {
      const jsonContent = await fs.readFile(jsonPath, 'utf-8');
      const loaded = JSON.parse(jsonContent);
      if (Array.isArray(loaded)) {
        questions = loaded;
      }
    } catch {
      // 2. Check frontmatter
      if (Array.isArray(parsed.data.questions)) {
        questions = parsed.data.questions;
      }
    }

    // 3. If no external questions found, dynamically extract from Markdown content!
    if (questions.length === 0) {
      questions = extractQuestionsFromMarkdown(parsed.content, slug);
    }

    const formattedQuestions = questions.map((q, idx) => ({
      topicSlug: slug,
      questionId: q.questionId || q.id || `q_${slug}_${idx + 1}`,
      prompt: q.prompt || q.question || '',
      type: q.type || (q.options && q.options.length >= 2 ? 'mcq' : 'practice'),
      options: (q.options || []).map((opt, oIdx) => {
        if (typeof opt === 'string') {
          return { id: `opt_${oIdx}`, text: opt, isCorrect: oIdx === (q.correctIndex || 0) };
        }
        return {
          id: opt.id || `opt_${oIdx}`,
          text: opt.text || '',
          isCorrect: Boolean(opt.isCorrect),
        };
      }),
      targetAnswer: q.targetAnswer || '',
      explanation: q.explanation || '',
      hint: q.hint || '',
      difficulty: q.difficulty || difficulty,
      tags: q.tags || tags,
    }));

    const topicItem = {
      slug,
      title,
      category,
      difficulty,
      tags,
      summary,
      estimatedMinutes,
      order,
      relativeFilePath: relativePath,
      questionCount: formattedQuestions.length,
      updatedAt: new Date(),
    };

    topics.push(topicItem);
    questionsBySlug[slug] = formattedQuestions;
    markdownBySlug[slug] = {
      content: parsed.content,
      toc: extractTOC(parsed.content),
      frontmatter: parsed.data,
    };

    if (isDbConnected()) {
      try {
        await Topic.findOneAndUpdate({ slug }, topicItem, { upsert: true, new: true });
        for (const q of formattedQuestions) {
          await Question.findOneAndUpdate(
            { topicSlug: slug, questionId: q.questionId },
            q,
            { upsert: true, new: true }
          );
        }
      } catch (err) {
        console.error(`MongoDB sync error for topic ${slug}:`, err.message);
      }
    }
  }

  topics.sort((a, b) => {
    if (a.category !== b.category) return a.category.localeCompare(b.category);
    return a.order - b.order;
  });

  cachedTopics = topics;
  cachedQuestions = questionsBySlug;
  cachedMarkdown = markdownBySlug;

  const totalQuestions = Object.values(questionsBySlug).flat().length;
  console.log(`📚 Content Synced: ${topics.length} topics, ${totalQuestions} dynamic questions loaded.`);
  return { topicCount: topics.length, totalQuestions };
}

export function getAllTopics() {
  return cachedTopics;
}

export function getTopicBySlug(slug) {
  const meta = cachedTopics.find(t => t.slug === slug);
  if (!meta) return null;
  const contentData = cachedMarkdown[slug] || { content: '', toc: [], frontmatter: {} };
  return {
    ...meta,
    content: contentData.content,
    toc: contentData.toc,
    frontmatter: contentData.frontmatter,
  };
}

export function getQuestionsForPractice(slug) {
  const questions = cachedQuestions[slug] || [];
  return questions.map(q => ({
    questionId: q.questionId,
    prompt: q.prompt,
    type: q.type,
    options: q.options.map(opt => ({
      id: opt.id,
      text: opt.text,
    })),
    targetAnswer: q.targetAnswer,
    hint: q.hint,
    difficulty: q.difficulty,
  }));
}

export function evaluateQuizSubmission(slug, userAnswers = {}) {
  const questions = cachedQuestions[slug] || [];
  if (questions.length === 0) {
    return { score: 100, correctCount: 0, totalQuestions: 0, details: [] };
  }

  let correctCount = 0;
  const details = questions.map(q => {
    const selected = userAnswers[q.questionId];
    let isCorrect = false;

    if (q.type === 'mcq' && q.options && q.options.length > 0) {
      const correctOption = q.options.find(o => o.isCorrect);
      isCorrect = correctOption && correctOption.id === selected;
    } else {
      // For practice / self-evaluated questions: user answers 'correct' or 'got_it'
      isCorrect = selected === 'correct' || selected === 'got_it' || selected === true;
    }

    if (isCorrect) correctCount++;

    const correctOption = q.options ? q.options.find(o => o.isCorrect) : null;

    return {
      questionId: q.questionId,
      prompt: q.prompt,
      type: q.type,
      selectedOptionId: typeof selected === 'string' ? selected : null,
      correctOptionId: correctOption ? correctOption.id : null,
      isCorrect: Boolean(isCorrect),
      explanation: q.explanation,
      options: q.options,
    };
  });

  const score = Math.round((correctCount / questions.length) * 100);

  return {
    score,
    correctCount,
    totalQuestions: questions.length,
    details,
  };
}
