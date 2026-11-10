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
  Layers,
  Sparkles
} from 'lucide-react';

export default function DashboardPage({ analytics, onSelectTopic, onNavigateCatalog }) {
  if (!analytics) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#d6cfbe]"></div>
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
    topicsWithProgress = [],
  } = analytics;

  const inProgressTopic = topicsWithProgress.find(t => t.status === 'reading') 
    || topicsWithProgress.find(t => t.status === 'not_started')
    || topicsWithProgress[0];

  return (
    <div className="space-y-8 py-2">
      {/* Editorial Welcome Card */}
      <div className="rounded-2xl border border-[#262420] bg-[#141412] p-6 sm:p-8">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#1d1b18] border border-[#302c25] text-[#b8b09e] text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#ded8cb]" />
            <span>Learning Dashboard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#f5f3ec] tracking-tight">
            Study Guides & Practice Record
          </h1>
          <p className="text-sm text-[#a8a192] leading-relaxed">
            Read markdown study notes, test your comprehension with interactive assessments, and track your retention over time.
          </p>

          {inProgressTopic && (
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onSelectTopic(inProgressTopic.slug)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ede8df] hover:bg-[#ded7c9] text-[#141311] font-semibold text-sm transition-all shadow-sm cursor-pointer"
              >
                <span>Continue: {inProgressTopic.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onNavigateCatalog}
                className="px-4 py-2.5 rounded-xl border border-[#2e2b24] bg-[#1a1916] hover:bg-[#22201c] text-[#ded8cb] font-medium text-sm transition-colors cursor-pointer"
              >
                Browse All Guides
              </button>
            </div>
          )}
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1: Topics Completed */}
        <div className="p-5 rounded-xl border border-[#24221e] bg-[#141412]">
          <div className="flex items-center justify-between text-[#8f8879] mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Completed</span>
            <div className="p-1.5 rounded-md bg-[#1d1b18] text-[#ded8cb] border border-[#2d2a24]">
              <CheckCircle className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#f5f3ec]">{completedTopics}</span>
            <span className="text-xs text-[#8f8879]">/ {totalTopics} topics</span>
          </div>
          <div className="w-full bg-[#201e1a] h-1.5 rounded-full mt-3 overflow-hidden">
            <div 
              className="bg-[#d6cfbe] h-full rounded-full transition-all duration-500" 
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        {/* Stat 2: Avg Quiz Accuracy */}
        <div className="p-5 rounded-xl border border-[#24221e] bg-[#141412]">
          <div className="flex items-center justify-between text-[#8f8879] mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Avg Accuracy</span>
            <div className="p-1.5 rounded-md bg-[#1d1b18] text-[#ded8cb] border border-[#2d2a24]">
              <Target className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#f5f3ec]">{averageQuizScore}%</span>
            <span className="text-xs text-[#8f8879]">{quizzesAttempted} quizzes</span>
          </div>
          <div className="w-full bg-[#201e1a] h-1.5 rounded-full mt-3 overflow-hidden">
            <div 
              className="bg-[#d6cfbe] h-full rounded-full transition-all duration-500" 
              style={{ width: `${averageQuizScore}%` }}
            />
          </div>
        </div>

        {/* Stat 3: Daily Streak */}
        <div className="p-5 rounded-xl border border-[#24221e] bg-[#141412]">
          <div className="flex items-center justify-between text-[#8f8879] mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Daily Streak</span>
            <div className="p-1.5 rounded-md bg-[#1d1b18] text-[#d4af37] border border-[#2d2a24]">
              <Flame className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#f5f3ec]">{streak.count}</span>
            <span className="text-xs text-[#8f8879]">days active</span>
          </div>
          <div className="text-xs text-[#a8a192] mt-3 font-medium">
            Daily practice streak
          </div>
        </div>

        {/* Stat 4: Total Subjects */}
        <div className="p-5 rounded-xl border border-[#24221e] bg-[#141412]">
          <div className="flex items-center justify-between text-[#8f8879] mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Curriculum</span>
            <div className="p-1.5 rounded-md bg-[#1d1b18] text-[#ded8cb] border border-[#2d2a24]">
              <Layers className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#f5f3ec]">{categoryBreakdown.length}</span>
            <span className="text-xs text-[#8f8879]">active categories</span>
          </div>
          <div className="text-xs text-[#8f8879] mt-3 truncate font-mono">
            /backend/content
          </div>
        </div>
      </div>

      {/* Two-Column Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Category Mastery */}
        <div className="lg:col-span-2 p-6 rounded-2xl border border-[#24221e] bg-[#141412] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#ded8cb]" />
              <h3 className="font-bold text-[#f5f3ec] text-base">Subject Mastery</h3>
            </div>
            <button
              onClick={onNavigateCatalog}
              className="inline-flex items-center gap-1 text-xs text-[#ded8cb] hover:underline font-medium cursor-pointer"
            >
              <span>View All Topics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {categoryBreakdown.map((cat) => (
              <div key={cat.category} className="p-4 rounded-xl border border-[#262420] bg-[#181715]">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="font-semibold text-[#ede8df]">{cat.category}</span>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-[#8f8879]">{cat.completed} of {cat.total} completed</span>
                    {cat.averageScore !== null && (
                      <span className="px-2 py-0.5 rounded bg-[#201e1a] text-[#ded8cb] border border-[#2f2c25] font-medium">
                        {cat.averageScore}% avg
                      </span>
                    )}
                  </div>
                </div>
                <div className="w-full bg-[#201e1a] h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#d6cfbe] h-full rounded-full transition-all"
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Weak Areas / Focus List */}
        <div className="p-6 rounded-2xl border border-[#24221e] bg-[#141412] space-y-4">
          <div className="flex items-center gap-2 text-[#d4af37]">
            <AlertTriangle className="w-4 h-4" />
            <h3 className="font-bold text-[#f5f3ec] text-base">Recommended Practice</h3>
          </div>

          {weakTopics.length > 0 ? (
            <div className="space-y-3">
              <p className="text-xs text-[#8f8879]">
                Topics with score below 70%. Reviewing will reinforce the concepts:
              </p>
              {weakTopics.map((topic) => (
                <div
                  key={topic.slug}
                  onClick={() => onSelectTopic(topic.slug)}
                  className="p-3 rounded-xl border border-[#2f2b22] bg-[#191815] hover:border-[#423c2f] transition-colors cursor-pointer group flex items-center justify-between"
                >
                  <div>
                    <h4 className="text-sm font-semibold text-[#ede8df] group-hover:text-white transition-colors">
                      {topic.title}
                    </h4>
                    <span className="text-xs text-[#8f8879]">{topic.category}</span>
                  </div>
                  <span className="px-2 py-1 rounded bg-[#22201b] text-[#ded8cb] border border-[#332f26] text-xs font-bold">
                    {topic.score}%
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-[#8f8879] text-xs space-y-2">
              <Award className="w-8 h-8 text-[#ded8cb] mx-auto opacity-70" />
              <p className="font-medium text-[#ede8df]">Up to date</p>
              <p>No weak areas flagged. Keep taking topic quizzes to challenge your retention.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
