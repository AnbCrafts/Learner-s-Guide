const BASE_URL = ''; // Proxied via Vite to http://localhost:5000

export async function fetchTopics() {
  const res = await fetch(`${BASE_URL}/api/topics`);
  if (!res.ok) throw new Error('Failed to load topics');
  const data = await res.json();
  return data.topics;
}

export async function fetchTopicDetails(slug) {
  const res = await fetch(`${BASE_URL}/api/topics/${slug}`);
  if (!res.ok) throw new Error(`Failed to load topic ${slug}`);
  const data = await res.json();
  return data.topic;
}

export async function fetchQuestions(slug) {
  const res = await fetch(`${BASE_URL}/api/questions/topic/${slug}`);
  if (!res.ok) throw new Error(`Failed to load questions for ${slug}`);
  const data = await res.json();
  return data.questions;
}

export async function evaluateQuiz(slug, answers) {
  const res = await fetch(`${BASE_URL}/api/questions/evaluate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topicSlug: slug, answers }),
  });
  if (!res.ok) throw new Error('Failed to evaluate quiz');
  return res.json();
}

export async function fetchDashboardAnalytics() {
  const res = await fetch(`${BASE_URL}/api/progress/dashboard`);
  if (!res.ok) throw new Error('Failed to load dashboard analytics');
  const data = await res.json();
  return data.analytics;
}

export async function updateTopicStatus(slug, status, notes = null, isBookmarked = null) {
  const res = await fetch(`${BASE_URL}/api/progress/topic-status`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topicSlug: slug, status, notes, isBookmarked }),
  });
  if (!res.ok) throw new Error('Failed to update progress');
  return res.json();
}

export async function triggerSync() {
  const res = await fetch(`${BASE_URL}/api/topics/sync`, { method: 'POST' });
  if (!res.ok) throw new Error('Failed to sync content');
  return res.json();
}
