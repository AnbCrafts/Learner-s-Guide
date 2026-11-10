import React from 'react';
import { 
  Award, 
  CheckCircle, 
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
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#181715]"></div>
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
    <div className="space-y-6">
      {/* Editorial Welcome Card */}
      <div className="rounded-2xl border border-[#dfd8cb] bg-[#ffffff] p-6 sm:p-8 shadow-2xs">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f5f2ea] border border-[#dcd5c7] text-[#544f43] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#181715]" />
            <span>Learning Dashboard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#141311] tracking-tight">
            Study Guides & Practice Record
          </h1>
          <p className="text-sm text-[#544f43] leading-relaxed">
            Read markdown study notes, test your comprehension with interactive assessments, and track your retention over time.
          </p>

          {inProgressTopic && (
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onSelectTopic(inProgressTopic.slug)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#181715] hover:bg-[#2b2925] text-[#ffffff] font-semibold text-sm transition-all shadow-sm cursor-pointer"
              >
                <span>Continue: {inProgressTopic.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onNavigateCatalog}
                className="px-4 py-2.5 rounded-xl border border-[#dfd8cb] bg-[#ffffff] hover:bg-[#f5f2ea] text-[#181715] font-semibold text-sm transition-colors cursor-pointer shadow-2xs"
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
        <div className="p-5 rounded-2xl border border-[#dfd8cb] bg-[#ffffff] shadow-2xs">
          <div className="flex items-center justify-between text-[#6b6455] mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Completed</span>
            <div className="p-1.5 rounded-lg bg-[#f5f2ea] text-[#181715] border border-[#dfd8cb]">
              <CheckCircle className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-[#141311]">{completedTopics}</span>
            <span className="text-xs text-[#6b6455]">/ {totalTopics} topics</span>
          </div>
          <div className="w-full bg-[#eae4d8] h-1.5 rounded-full mt-3 overflow-hidden">
            <div 
              className="bg-[#181715] h-full rounded-full transition-all duration-500" 
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        {/* Stat 2: Avg Accuracy */}
        <div className="p-5 rounded-2xl border border-[#dfd8cb] bg-[#ffffff] shadow-2xs">
          <div className="flex items-center justify-between text-[#6b6455] mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Avg Accuracy</span>
            <div className="p-1.5 rounded-lg bg-[#f5f2ea] text-[#181715] border border-[#dfd8cb]">
              <Target className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-[#141311]">{averageQuizScore}%</span>
            <span className="text-xs text-[#6b6455]">{quizzesAttempted} quizzes</span>
          </div>
          <div className="w-full bg-[#eae4d8] h-1.5 rounded-full mt-3 overflow-hidden">
            <div 
              className="bg-[#181715] h-full rounded-full transition-all duration-500" 
              style={{ width: `${averageQuizScore}%` }}
            />
          </div>
        </div>

        {/* Stat 3: Daily Streak */}
        <div className="p-5 rounded-2xl border border-[#dfd8cb] bg-[#ffffff] shadow-2xs">
          <div className="flex items-center justify-between text-[#6b6455] mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Daily Streak</span>
            <div className="p-1.5 rounded-lg bg-[#f5f2ea] text-[#b8860b] border border-[#dfd8cb]">
              <Flame className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-[#141311]">{streak.count}</span>
            <span className="text-xs text-[#6b6455]">days active</span>
          </div>
          <div className="text-xs text-[#544f43] mt-3 font-medium">
            Daily practice streak
          </div>
        </div>

        {/* Stat 4: Total Subjects */}
        <div className="p-5 rounded-2xl border border-[#dfd8cb] bg-[#ffffff] shadow-2xs">
          <div className="flex items-center justify-between text-[#6b6455] mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Curriculum</span>
            <div className="p-1.5 rounded-lg bg-[#f5f2ea] text-[#181715] border border-[#dfd8cb]">
              <Layers className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-[#141311]">{categoryBreakdown.length}</span>
            <span className="text-xs text-[#6b6455]">categories</span>
          </div>
          <div className="text-xs text-[#6b6455] mt-3 truncate font-mono">
            /backend/content
          </div>
        </div>
      </div>

      {/* Two-Column Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Category Mastery */}
        <div className="lg:col-span-2 p-6 rounded-2xl border border-[#dfd8cb] bg-[#ffffff] space-y-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#181715]" />
              <h3 className="font-bold text-[#141311] text-base">Subject Mastery</h3>
            </div>
            <button
              onClick={onNavigateCatalog}
              className="inline-flex items-center gap-1 text-xs text-[#181715] hover:underline font-bold cursor-pointer"
            >
              <span>View All Topics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {categoryBreakdown.map((cat) => (
              <div key={cat.category} className="p-4 rounded-xl border border-[#e5dfd3] bg-[#faf8f4]">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="font-bold text-[#1a1917]">{cat.category}</span>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-[#6b6455]">{cat.completed} of {cat.total} completed</span>
                    {cat.averageScore !== null && (
                      <span className="px-2 py-0.5 rounded bg-[#ffffff] text-[#141311] border border-[#d8d0bf] font-bold">
                        {cat.averageScore}% avg
                      </span>
                    )}
                  </div>
                </div>
                <div className="w-full bg-[#eae4d8] h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#181715] h-full rounded-full transition-all"
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Weak Areas / Focus List */}
        <div className="p-6 rounded-2xl border border-[#dfd8cb] bg-[#ffffff] space-y-4 shadow-2xs">
          <div className="flex items-center gap-2 text-[#8b4513]">
            <AlertTriangle className="w-4 h-4" />
            <h3 className="font-bold text-[#141311] text-base">Recommended Practice</h3>
          </div>

          {weakTopics.length > 0 ? (
            <div className="space-y-3">
              <p className="text-xs text-[#6b6455]">
                Topics with score below 70%. Reviewing will reinforce the concepts:
              </p>
              {weakTopics.map((topic) => (
                <div
                  key={topic.slug}
                  onClick={() => onSelectTopic(topic.slug)}
                  className="p-3.5 rounded-xl border border-[#e5dfd3] bg-[#faf8f4] hover:border-[#b8b09f] hover:bg-[#ffffff] transition-all cursor-pointer group flex items-center justify-between"
                >
                  <div>
                    <h4 className="text-sm font-bold text-[#181715] group-hover:text-black transition-colors">
                      {topic.title}
                    </h4>
                    <span className="text-xs text-[#6b6455]">{topic.category}</span>
                  </div>
                  <span className="px-2 py-1 rounded bg-[#ffffff] text-[#181715] border border-[#dcd5c7] text-xs font-bold shadow-2xs">
                    {topic.score}%
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-[#6b6455] text-xs space-y-2">
              <Award className="w-8 h-8 text-[#181715] mx-auto opacity-70" />
              <p className="font-bold text-[#141311] text-sm">Up to date</p>
              <p>No weak areas flagged. Keep taking topic quizzes to challenge your retention.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
