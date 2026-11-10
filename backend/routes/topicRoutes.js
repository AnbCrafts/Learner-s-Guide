import express from 'express';
import { getAllTopics, getTopicBySlug, syncContent } from '../services/contentService.js';
import { getUserProgress } from '../services/progressService.js';

const router = express.Router();

// GET /api/topics - List all topics with user progress
router.get('/', async (req, res) => {
  try {
    const topics = getAllTopics();
    const progressData = await getUserProgress();
    const progressMap = {};
    for (const p of progressData.topics || []) {
      progressMap[p.topicSlug] = p;
    }

    const topicsWithStatus = topics.map(topic => ({
      ...topic,
      status: progressMap[topic.slug]?.status || 'not_started',
      isBookmarked: progressMap[topic.slug]?.isBookmarked || false,
      lastReadAt: progressMap[topic.slug]?.lastReadAt || null,
    }));

    res.json({ success: true, count: topicsWithStatus.length, topics: topicsWithStatus });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/topics/:slug - Get full markdown study material and TOC
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const topic = getTopicBySlug(slug);
    if (!topic) {
      return res.status(404).json({ success: false, message: `Topic '${slug}' not found.` });
    }

    const progressData = await getUserProgress();
    const userTopic = (progressData.topics || []).find(t => t.topicSlug === slug);

    res.json({
      success: true,
      topic: {
        ...topic,
        status: userTopic?.status || 'not_started',
        notes: userTopic?.notes || '',
        isBookmarked: userTopic?.isBookmarked || false,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/topics/sync - Rescan content folder
router.post('/sync', async (req, res) => {
  try {
    const result = await syncContent();
    res.json({ success: true, message: 'Content synchronized', ...result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
