import express from 'express';
import { getQuestionsForPractice, evaluateQuizSubmission } from '../services/contentService.js';
import { recordQuizAttempt } from '../services/progressService.js';

const router = express.Router();

// GET /api/questions/topic/:slug - Fetch questions for practice
router.get('/topic/:slug', (req, res) => {
  try {
    const { slug } = req.params;
    const questions = getQuestionsForPractice(slug);
    res.json({
      success: true,
      topicSlug: slug,
      count: questions.length,
      questions,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/questions/evaluate - Evaluate submitted answers, record attempt, and return explanations
router.post('/evaluate', async (req, res) => {
  try {
    const { topicSlug, answers } = req.body;
    if (!topicSlug || typeof answers !== 'object') {
      return res.status(400).json({ success: false, message: 'topicSlug and answers object are required.' });
    }

    const evaluation = evaluateQuizSubmission(topicSlug, answers);

    // Save attempt to progress tracking
    const simplifiedAnswers = evaluation.details.map(d => ({
      questionId: d.questionId,
      selectedOptionId: d.selectedOptionId,
      isCorrect: d.isCorrect,
    }));

    await recordQuizAttempt(
      topicSlug,
      evaluation.score,
      evaluation.totalQuestions,
      evaluation.correctCount,
      simplifiedAnswers
    );

    res.json({
      success: true,
      topicSlug,
      ...evaluation,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
