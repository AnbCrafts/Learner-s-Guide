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

// In-memory cache for fast lookups
let cachedTopics = [];
let cachedQuestions = {}; // { [topicSlug]: Question[] }
let cachedMarkdown = {};  // { [topicSlug]: { content, toc, frontmatter } }

// Helper to extract Table of Contents (H1, H2, H3)
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

// Estimate reading time in minutes
function estimateReadingTime(text) {
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

// Recursively find all .md files
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
    // If directory doesn't exist yet, return empty
    return [];
  }
  return files;
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

    // Default category to folder name if available, e.g. "dsa" -> "DSA"
    const folderCategory = pathParts.length > 1 ? pathParts[0] : 'General';
    const formattedCategory = folderCategory
      .split('-')
      .map(s => s.charAt(0).toUpperCase() + s.slice(1))
      .join(' ');

    const slug = parsed.data.slug || fileName;
    const title = parsed.data.title || fileName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const category = parsed.data.category || formattedCategory;
    const difficulty = parsed.data.difficulty || 'Beginner';
    const tags = Array.isArray(parsed.data.tags) ? parsed.data.tags : [];
    const order = typeof parsed.data.order === 'number' ? parsed.data.order : 0;
    const estimatedMinutes = parsed.data.estimatedMinutes || estimateReadingTime(parsed.content);
    const summary = parsed.data.summary || parsed.content.slice(0, 160).replace(/[#*_`]/g, '').trim() + '...';

    // Look for companion questions JSON: [slug].questions.json
    let questions = [];
    const jsonPath = path.join(path.dirname(filePath), `${fileName}.questions.json`);
    try {
      const jsonContent = await fs.readFile(jsonPath, 'utf-8');
      const loaded = JSON.parse(jsonContent);
      if (Array.isArray(loaded)) {
        questions = loaded;
      }
    } catch {
      // Check if questions are inside frontmatter
      if (Array.isArray(parsed.data.questions)) {
        questions = parsed.data.questions;
      }
    }

    // Ensure questions have topicSlug and proper shape
    const formattedQuestions = questions.map((q, idx) => ({
      topicSlug: slug,
      questionId: q.id || `q_${slug}_${idx + 1}`,
      prompt: q.prompt || q.question || '',
      type: q.type || 'mcq',
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

    // If MongoDB is connected, upsert to database
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

  // Sort topics by category and order
  topics.sort((a, b) => {
    if (a.category !== b.category) return a.category.localeCompare(b.category);
    return a.order - b.order;
  });

  cachedTopics = topics;
  cachedQuestions = questionsBySlug;
  cachedMarkdown = markdownBySlug;

  console.log(`📚 Content Synced: ${topics.length} topics, ${Object.values(questionsBySlug).flat().length} questions.`);
  return { topicCount: topics.length };
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
  // Strip isCorrect and explanation so client cannot cheat beforehand
  return questions.map(q => ({
    questionId: q.questionId,
    prompt: q.prompt,
    type: q.type,
    options: q.options.map(opt => ({
      id: opt.id,
      text: opt.text,
    })),
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
    const selectedOptionId = userAnswers[q.questionId];
    const correctOption = q.options.find(o => o.isCorrect);
    const isCorrect = correctOption && correctOption.id === selectedOptionId;
    if (isCorrect) correctCount++;

    return {
      questionId: q.questionId,
      prompt: q.prompt,
      selectedOptionId: selectedOptionId || null,
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
