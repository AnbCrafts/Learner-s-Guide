import { UserProgress } from '../models/Progress.js';
import { isDbConnected, getLocalStore, saveLocalStore } from '../config/db.js';
import { getAllTopics } from './contentService.js';

const DEFAULT_USER_ID = 'default_learner';

// Helper to format today's date as YYYY-MM-DD
function getTodayString() {
  const d = new Date();
  return d.toISOString().split('T')[0];
}

// Calculate streak updates
function updateStreak(currentStreak, lastDate) {
  const today = getTodayString();
  if (!lastDate) {
    return { count: 1, lastActiveDate: today };
  }
  if (lastDate === today) {
    return { count: currentStreak, lastActiveDate: today };
  }

  const prev = new Date(lastDate);
  const now = new Date(today);
  const diffDays = Math.round((now - prev) / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    return { count: currentStreak + 1, lastActiveDate: today };
  } else {
    return { count: 1, lastActiveDate: today };
  }
}

// Get user progress record
export async function getUserProgress() {
  if (isDbConnected()) {
    let progress = await UserProgress.findOne({ userId: DEFAULT_USER_ID });
    if (!progress) {
      progress = await UserProgress.create({ userId: DEFAULT_USER_ID });
    }
    return progress;
  } else {
    const store = await getLocalStore();
    return {
      userId: DEFAULT_USER_ID,
      topics: Object.entries(store.progress || {}).map(([slug, data]) => ({
        topicSlug: slug,
        ...data,
      })),
      quizAttempts: store.quizAttempts || [],
      streak: store.streak || { count: 0, lastActiveDate: null },
    };
  }
}

// Update status of a study topic
export async function updateTopicStatus(topicSlug, status, notes = null, isBookmarked = null) {
  const today = getTodayString();

  if (isDbConnected()) {
    let userProgress = await UserProgress.findOne({ userId: DEFAULT_USER_ID });
    if (!userProgress) userProgress = new UserProgress({ userId: DEFAULT_USER_ID });

    let item = userProgress.topics.find(t => t.topicSlug === topicSlug);
    if (!item) {
      userProgress.topics.push({
        topicSlug,
        status: status || 'reading',
        lastReadAt: new Date(),
        notes: notes || '',
        isBookmarked: isBookmarked || false,
      });
    } else {
      if (status) item.status = status;
      if (notes !== null) item.notes = notes;
      if (isBookmarked !== null) item.isBookmarked = isBookmarked;
      item.lastReadAt = new Date();
    }

    const streakUpdate = updateStreak(userProgress.streak.count, userProgress.streak.lastActiveDate);
    userProgress.streak.count = streakUpdate.count;
    userProgress.streak.lastActiveDate = streakUpdate.lastActiveDate;

    await userProgress.save();
    return userProgress;
  } else {
    const store = await getLocalStore();
    if (!store.progress) store.progress = {};
    if (!store.progress[topicSlug]) {
      store.progress[topicSlug] = {
        status: status || 'reading',
        lastReadAt: new Date(),
        notes: notes || '',
        isBookmarked: isBookmarked || false,
      };
    } else {
      if (status) store.progress[topicSlug].status = status;
      if (notes !== null) store.progress[topicSlug].notes = notes;
      if (isBookmarked !== null) store.progress[topicSlug].isBookmarked = isBookmarked;
      store.progress[topicSlug].lastReadAt = new Date();
    }

    const currentStreak = store.streak ? store.streak.count : 0;
    const lastDate = store.streak ? store.streak.lastActiveDate : null;
    store.streak = updateStreak(currentStreak, lastDate);

    await saveLocalStore(store);
    return store;
  }
}

// Record a quiz attempt
export async function recordQuizAttempt(topicSlug, score, totalQuestions, correctCount, answers = []) {
  const attempt = {
    topicSlug,
    score,
    totalQuestions,
    correctCount,
    answers,
    attemptedAt: new Date(),
  };

  if (isDbConnected()) {
    let userProgress = await UserProgress.findOne({ userId: DEFAULT_USER_ID });
    if (!userProgress) userProgress = new UserProgress({ userId: DEFAULT_USER_ID });

    userProgress.quizAttempts.unshift(attempt);

    // If score is high (>= 70%), also mark topic as completed if not already
    if (score >= 70) {
      let tItem = userProgress.topics.find(t => t.topicSlug === topicSlug);
      if (tItem) {
        tItem.status = 'completed';
      } else {
        userProgress.topics.push({ topicSlug, status: 'completed' });
      }
    }

    const streakUpdate = updateStreak(userProgress.streak.count, userProgress.streak.lastActiveDate);
    userProgress.streak.count = streakUpdate.count;
    userProgress.streak.lastActiveDate = streakUpdate.lastActiveDate;

    await userProgress.save();
    return attempt;
  } else {
    const store = await getLocalStore();
    if (!store.quizAttempts) store.quizAttempts = [];
    store.quizAttempts.unshift(attempt);

    if (score >= 70) {
      if (!store.progress) store.progress = {};
      if (!store.progress[topicSlug]) {
        store.progress[topicSlug] = { status: 'completed', lastReadAt: new Date(), notes: '' };
      } else {
        store.progress[topicSlug].status = 'completed';
      }
    }

    const currentStreak = store.streak ? store.streak.count : 0;
    const lastDate = store.streak ? store.streak.lastActiveDate : null;
    store.streak = updateStreak(currentStreak, lastDate);

    await saveLocalStore(store);
    return attempt;
  }
}

// Aggregate Dashboard Analytics
export async function getDashboardAnalytics() {
  const progressData = await getUserProgress();
  const allTopics = getAllTopics();

  const progressMap = {};
  for (const t of progressData.topics || []) {
    progressMap[t.topicSlug] = t;
  }

  // Calculate high scores per topic from quiz attempts
  const topicHighScores = {};
  for (const attempt of progressData.quizAttempts || []) {
    if (topicHighScores[attempt.topicSlug] === undefined || attempt.score > topicHighScores[attempt.topicSlug]) {
      topicHighScores[attempt.topicSlug] = attempt.score;
    }
  }

  let completedCount = 0;
  let readingCount = 0;

  // Category breakdown
  const categoryStats = {};

  for (const topic of allTopics) {
    const cat = topic.category || 'General';
    if (!categoryStats[cat]) {
      categoryStats[cat] = { category: cat, total: 0, completed: 0, quizScores: [] };
    }
    categoryStats[cat].total += 1;

    const prog = progressMap[topic.slug];
    if (prog && prog.status === 'completed') {
      completedCount++;
      categoryStats[cat].completed += 1;
    } else if (prog && prog.status === 'reading') {
      readingCount++;
    }

    if (topicHighScores[topic.slug] !== undefined) {
      categoryStats[cat].quizScores.push(topicHighScores[topic.slug]);
    }
  }

  const categoryBreakdown = Object.values(categoryStats).map(c => {
    const avgScore = c.quizScores.length > 0
      ? Math.round(c.quizScores.reduce((a, b) => a + b, 0) / c.quizScores.length)
      : null;
    return {
      category: c.category,
      total: c.total,
      completed: c.completed,
      percentage: c.total > 0 ? Math.round((c.completed / c.total) * 100) : 0,
      averageScore: avgScore,
    };
  });

  // Calculate overall average quiz score
  const allScores = Object.values(topicHighScores);
  const averageQuizScore = allScores.length > 0
    ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length)
    : 0;

  // Identify weak areas (topics with score < 70% or attempted with incorrect answers)
  const weakTopics = [];
  for (const topic of allTopics) {
    const score = topicHighScores[topic.slug];
    if (score !== undefined && score < 70) {
      weakTopics.push({
        slug: topic.slug,
        title: topic.title,
        category: topic.category,
        score,
      });
    }
  }

  return {
    totalTopics: allTopics.length,
    completedTopics: completedCount,
    readingTopics: readingCount,
    completionPercentage: allTopics.length > 0 ? Math.round((completedCount / allTopics.length) * 100) : 0,
    averageQuizScore,
    quizzesAttempted: (progressData.quizAttempts || []).length,
    streak: progressData.streak || { count: 0, lastActiveDate: null },
    categoryBreakdown,
    weakTopics,
    recentAttempts: (progressData.quizAttempts || []).slice(0, 5),
    topicsWithProgress: allTopics.map(t => ({
      ...t,
      status: progressMap[t.slug]?.status || 'not_started',
      isBookmarked: progressMap[t.slug]?.isBookmarked || false,
      lastReadAt: progressMap[t.slug]?.lastReadAt || null,
      quizHighScore: topicHighScores[t.slug] ?? null,
    })),
  };
}
