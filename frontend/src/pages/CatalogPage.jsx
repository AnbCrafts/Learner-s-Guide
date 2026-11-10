import React, { useState, useMemo } from 'react';
import { Search, Clock, HelpCircle, CheckCircle2, ArrowRight } from 'lucide-react';

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
    <div className="space-y-6 py-2">
      {/* Title & Filter Bar */}
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-[#f5f3ec] tracking-tight">Study Guides</h1>
          <p className="text-sm text-[#8f8879] mt-1">
            Browse markdown study guides, read deep-dives, and test your knowledge with companion quizzes.
          </p>
        </div>

        {/* Search & Difficulty Dropdown */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#756f62] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by topic, keyword, or algorithm..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#141412] border border-[#282622] text-sm text-[#ede8df] placeholder-[#756f62] focus:outline-none focus:border-[#4f4a3e] transition-colors"
            />
          </div>

          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#141412] border border-[#282622] text-xs text-[#ded8cb] focus:outline-none focus:border-[#4f4a3e] cursor-pointer"
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
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#ede8df] text-[#141311] font-semibold shadow-sm'
                  : 'bg-[#161513] border border-[#292723] text-[#9c9586] hover:text-[#ede8df] hover:border-[#3d3a33]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Topics Grid */}
      {filteredTopics.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-[#24221e] bg-[#141412]">
          <p className="text-[#8f8879] text-sm">No study guides match your filter criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTopics.map((topic) => {
            const isCompleted = topic.status === 'completed';
            const isReading = topic.status === 'reading';

            return (
              <div
                key={topic.slug}
                className="flex flex-col justify-between p-5 rounded-xl border border-[#24221e] bg-[#141412] hover:border-[#38342c] hover:bg-[#181715] transition-all group"
              >
                <div>
                  {/* Category & Status Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#1c1b18] text-[#a8a192] border border-[#2c2a24]">
                      {topic.category}
                    </span>

                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#c9c3b4] px-2 py-0.5 rounded-md bg-[#1d1b18] border border-[#302d26]">
                        <CheckCircle2 className="w-3 h-3 text-[#ded8cb]" />
                        <span>Completed</span>
                      </span>
                    ) : isReading ? (
                      <span className="text-[11px] font-medium text-[#a8a192] px-2 py-0.5 rounded-md bg-[#1d1b18] border border-[#2c2a24]">
                        In Progress
                      </span>
                    ) : null}
                  </div>

                  {/* Title & Excerpt */}
                  <h3 className="text-base font-bold text-[#f5f3ec] group-hover:text-white transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-xs text-[#8f8879] mt-2 line-clamp-2 leading-relaxed">
                    {topic.summary}
                  </p>
                </div>

                {/* Footer Info & Action */}
                <div className="mt-5 pt-3.5 border-t border-[#22201b] flex items-center justify-between text-xs text-[#8f8879]">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#756f62]" />
                      <span>{topic.estimatedMinutes}m read</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5 text-[#756f62]" />
                      <span>{topic.questionCount} Qs</span>
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectTopic(topic.slug)}
                    className="flex items-center gap-1 text-[#ded8cb] font-semibold group-hover:gap-1.5 transition-all hover:text-white cursor-pointer"
                  >
                    <span>Read</span>
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
