import React, { useState, useMemo } from 'react';
import { Search, Clock, HelpCircle, CheckCircle2, BookOpen, Filter, ArrowRight } from 'lucide-react';

export default function CatalogPage({ topics = [], onSelectTopic }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  // Categories list
  const categories = useMemo(() => {
    const set = new Set(topics.map(t => t.category));
    return ['All', ...Array.from(set)];
  }, [topics]);

  // Filtered topics
  const filteredTopics = useMemo(() => {
    return topics.filter(t => {
      const matchesSearch = 
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        (t.summary && t.summary.toLowerCase().includes(search.toLowerCase())) ||
        (t.tags && t.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase())));
      
      const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'All' || t.difficulty === selectedDifficulty;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [topics, search, selectedCategory, selectedDifficulty]);

  return (
    <div className="space-y-6 py-4">
      {/* Title & Filter Bar */}
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Study Guides & Topics</h1>
          <p className="text-sm text-slate-400 mt-1">
            Explore markdown study notes, read concept explanations, and take interactive practice tests.
          </p>
        </div>

        {/* Search & Category Pills */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search topics, keywords, algorithms..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* Difficulty Dropdown */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="All">All Difficulties</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pt-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Topics Grid */}
      {filteredTopics.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-slate-800 bg-slate-900/30">
          <p className="text-slate-400 text-sm">No study guides match your filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTopics.map((topic) => {
            const isCompleted = topic.status === 'completed';
            const isReading = topic.status === 'reading';

            return (
              <div
                key={topic.slug}
                className="flex flex-col justify-between p-5 rounded-2xl border border-slate-800 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-900/80 transition-all group"
              >
                <div>
                  {/* Category & Status Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-indigo-400 border border-slate-700/60">
                      {topic.category}
                    </span>

                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Completed</span>
                      </span>
                    ) : isReading ? (
                      <span className="text-xs font-medium text-indigo-400 px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                        In Progress
                      </span>
                    ) : null}
                  </div>

                  {/* Title & Excerpt */}
                  <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {topic.summary}
                  </p>
                </div>

                {/* Footer Info & Action */}
                <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>{topic.estimatedMinutes}m read</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
                      <span>{topic.questionCount} Qs</span>
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectTopic(topic.slug)}
                    className="flex items-center gap-1 text-indigo-400 font-semibold group-hover:gap-1.5 transition-all hover:text-indigo-300 cursor-pointer"
                  >
                    <span>Open</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
