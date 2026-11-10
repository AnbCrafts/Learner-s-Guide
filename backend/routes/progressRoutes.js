import express from 'express';
import {
  getUserProgress,
  updateTopicStatus,
  recordQuizAttempt,
  getDashboardAnalytics,
} from '../services/progressService.js';

const router = express.Router();

// GET /api/progress/dashboard - Comprehensive analytics
router.get('/dashboard', async (req, res) => {
  try {
    const analytics = await getDashboardAnalytics();
    res.json({ success: true, analytics });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/progress/raw - Raw progress record
router.get('/raw', async (req, res) => {
  try {
    const progress = await getUserProgress();
    res.json({ success: true, progress });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/progress/topic-status - Update topic status (reading/completed), notes, bookmark
router.post('/topic-status', async (req, res) => {
  try {
    const { topicSlug, status, notes, isBookmarked } = req.body;
    if (!topicSlug) {
      return res.status(400).json({ success: false, message: 'topicSlug is required.' });
    }

    const updated = await updateTopicStatus(topicSlug, status, notes, isBookmarked);
    res.json({ success: true, message: 'Progress updated', updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
