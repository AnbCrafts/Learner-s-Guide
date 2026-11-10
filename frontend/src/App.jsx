import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/layout/Navbar';
import DashboardPage from './pages/DashboardPage';
import CatalogPage from './pages/CatalogPage';
import StudyPage from './pages/StudyPage';
import { fetchTopics, fetchDashboardAnalytics } from './api/client';

export default function App() {
  const [activeView, setActiveView] = useState('dashboard'); // 'dashboard' | 'catalog' | 'study'
  const [activeSlug, setActiveSlug] = useState(null);
  const [topics, setTopics] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      const [topicsData, analyticsData] = await Promise.all([
        fetchTopics(),
        fetchDashboardAnalytics(),
      ]);
      setTopics(topicsData);
      setAnalytics(analyticsData);
    } catch (err) {
      console.error('Failed to load application data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSelectTopic = (slug) => {
    setActiveSlug(slug);
    setActiveView('study');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f5f2ea] text-[#1a1917] flex flex-col font-sans selection:bg-[#e4ddce] selection:text-[#141311]">
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        streak={analytics?.streak?.count || 0}
        onSyncComplete={loadData}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[70vh] gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#181715]"></div>
            <p className="text-xs text-[#706a5e]">Loading study guides...</p>
          </div>
        ) : (
          <>
            {activeView === 'dashboard' && (
              <DashboardPage
                analytics={analytics}
                onSelectTopic={handleSelectTopic}
                onNavigateCatalog={() => setActiveView('catalog')}
              />
            )}

            {activeView === 'catalog' && (
              <CatalogPage
                topics={topics}
                onSelectTopic={handleSelectTopic}
              />
            )}

            {activeView === 'study' && activeSlug && (
              <StudyPage
                slug={activeSlug}
                onBack={() => setActiveView('catalog')}
                onProgressUpdated={loadData}
              />
            )}
          </>
        )}
      </main>

      <footer className="border-t border-[#dfd8cb] bg-[#ede7dc] py-6 text-center text-xs text-[#706a5e]">
        <div className="max-w-7xl mx-auto px-4">
          LearnersGuide • Markdown Study Materials & Practice Record
        </div>
      </footer>
    </div>
  );
}
