import React from 'react';
import { 
  Award, 
  BookOpen, 
  CheckCircle, 
  Clock, 
  Flame, 
  Target, 
  TrendingUp, 
  AlertTriangle,
  ArrowRight,
  Layers
} from 'lucide-react';

export default function DashboardPage({ analytics, onSelectTopic, onNavigateCatalog }) {
  if (!analytics) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  const {
    totalTopics = 0,
    completedTopics = 0,
    completionPercentage = 0,
    averageQuizScore = 0,
    quizzesAttempted = 0,
    streak = { count: 0 },
    categoryBreakdown = [],
    weakTopics = [],
    recentAttempts = [],
    topicsWithProgress = [],
  } = analytics;

  // Find a topic currently in progress or the next uncompleted topic
  const inProgressTopic = topicsWithProgress.find(t => t.status === 'reading') 
    || topicsWithProgress.find(t => t.status === 'not_started')
    || topicsWithProgress[0];

  return (
    <div className="space-y-8 py-4">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/60 via-slate-900/80 to-slate-950 p-6 sm:p-8">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-3">
            <SparklesIcon className="w-3.5 h-3.5 text-indigo-400" />
            <span>Welcome back to your study guide</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Track Your Knowledge, Master Every Topic.
          </h1>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Read markdown guides, take interactive quizzes to test your memory, and monitor your topic mastery.
          </p>

          {inProgressTopic && (
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onSelectTopic(inProgressTopic.slug)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/25 hover:gap-3 cursor-pointer"
              >
                <span>Continue: {inProgressTopic.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onNavigateCatalog}
                className="px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800/60 hover:bg-slate-800 text-slate-300 font-medium text-sm transition-colors cursor-pointer"
              >
                Browse All Guides
              </button>
            </div>
          )}
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1: Topics Mastered */}
        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Completed</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{completedTopics}</span>
            <span className="text-xs text-slate-400">/ {totalTopics} topics</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div 
              className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        {/* Stat 2: Avg Quiz Score */}
        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Avg Accuracy</span>
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{averageQuizScore}%</span>
            <span className="text-xs text-slate-400">{quizzesAttempted} quizzes</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div 
              className="bg-indigo-500 h-full rounded-full transition-all duration-500" 
              style={{ width: `${averageQuizScore}%` }}
            />
          </div>
        </div>

        {/* Stat 3: Daily Streak */}
        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Daily Streak</span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{streak.count}</span>
            <span className="text-xs text-slate-400">days active</span>
          </div>
          <div className="text-xs text-amber-400/80 mt-3 font-medium">
            Keep practicing daily!
          </div>
        </div>

        {/* Stat 4: Total Study Guides */}
        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Curriculum</span>
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{categoryBreakdown.length}</span>
            <span className="text-xs text-slate-400">active subjects</span>
          </div>
          <div className="text-xs text-slate-400 mt-3">
            Stored in <code className="text-indigo-400">/backend/content</code>
          </div>
        </div>
      </div>

      {/* Two-Column Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Category Mastery */}
        <div className="lg:col-span-2 p-6 rounded-2xl border border-slate-800 bg-slate-900/40 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-400" />
              <h3 className="font-bold text-white text-base">Subject Mastery</h3>
            </div>
            <button
              onClick={onNavigateCatalog}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
            >
              View All Topics →
            </button>
          </div>

          <div className="space-y-4">
            {categoryBreakdown.map((cat) => (
              <div key={cat.category} className="p-4 rounded-xl border border-slate-800/80 bg-slate-800/30">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="font-semibold text-slate-200">{cat.category}</span>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-slate-400">{cat.completed} of {cat.total} completed</span>
                    {cat.averageScore !== null && (
                      <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 font-medium">
                        {cat.averageScore}% avg
                      </span>
                    )}
                  </div>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-indigo-500 to-violet-500 h-full rounded-full transition-all"
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Weak Areas / Focus List */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 space-y-4">
          <div className="flex items-center gap-2 text-amber-400">
            <AlertTriangle className="w-4 h-4" />
            <h3 className="font-bold text-white text-base">Recommended Practice</h3>
          </div>

          {weakTopics.length > 0 ? (
            <div className="space-y-3">
              <p className="text-xs text-slate-400">
                Topics where your quiz score was under 70%. Retrying will reinforce the concepts:
              </p>
              {weakTopics.map((topic) => (
                <div
                  key={topic.slug}
                  onClick={() => onSelectTopic(topic.slug)}
                  className="p-3 rounded-xl border border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10 transition-colors cursor-pointer group flex items-center justify-between"
                >
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200 group-hover:text-amber-300 transition-colors">
                      {topic.title}
                    </h4>
                    <span className="text-xs text-slate-400">{topic.category}</span>
                  </div>
                  <span className="px-2 py-1 rounded bg-amber-500/10 text-amber-300 text-xs font-bold">
                    {topic.score}%
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-slate-400 text-xs space-y-2">
              <Award className="w-8 h-8 text-emerald-400 mx-auto" />
              <p className="font-medium text-slate-300">All caught up!</p>
              <p>No weak areas identified. Keep taking topic quizzes to test your limits.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SparklesIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  );
}
