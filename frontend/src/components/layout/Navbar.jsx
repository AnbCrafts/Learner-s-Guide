import React, { useState } from 'react';
import { BookOpen, Flame, Compass, LayoutDashboard, RefreshCw, CheckCircle2 } from 'lucide-react';
import { triggerSync } from '../../api/client';

export default function Navbar({ activeView, setActiveView, streak = 0, onSyncComplete }) {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncedMsg, setSyncedMsg] = useState(false);

  const handleSync = async () => {
    try {
      setIsSyncing(true);
      await triggerSync();
      setSyncedMsg(true);
      if (onSyncComplete) onSyncComplete();
      setTimeout(() => setSyncedMsg(false), 2500);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#dfd8cb] bg-[#f5f2ea]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div 
          onClick={() => setActiveView('dashboard')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="h-9 w-9 rounded-xl bg-[#181715] flex items-center justify-center text-[#f5f2ea] shadow-sm group-hover:scale-105 transition-transform">
            <BookOpen className="w-4 h-4 text-[#f5f2ea]" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-[#141311] tracking-tight">
              LearnersGuide
            </span>
            <span className="hidden sm:inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#eae4d8] text-[#5c564a] border border-[#d8d1c2]">
              MERN
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setActiveView('dashboard')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeView === 'dashboard'
                ? 'bg-[#181715] text-[#ffffff] shadow-sm'
                : 'text-[#615a4c] hover:text-[#181715] hover:bg-[#eae4d8]'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveView('catalog')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeView === 'catalog' || activeView === 'study'
                ? 'bg-[#181715] text-[#ffffff] shadow-sm'
                : 'text-[#615a4c] hover:text-[#181715] hover:bg-[#eae4d8]'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Study Guides</span>
          </button>
        </nav>

        {/* Actions & Streak */}
        <div className="flex items-center gap-2.5">
          {/* Content Sync Button */}
          <button
            onClick={handleSync}
            disabled={isSyncing}
            title="Scan & Sync .md files from content folder"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#ffffff] hover:bg-[#eae4d8] text-[#474237] border border-[#dfd8cb] transition-colors shadow-2xs cursor-pointer"
          >
            {syncedMsg ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2c521b]" />
                <span className="text-[#2c521b] hidden sm:inline">Synced</span>
              </>
            ) : (
              <>
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-[#181715]' : ''}`} />
                <span className="hidden sm:inline">{isSyncing ? 'Syncing...' : 'Sync Notes'}</span>
              </>
            )}
          </button>

          {/* Streak Indicator */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ffffff] border border-[#dfd8cb] text-[#141311] text-xs font-bold shadow-2xs">
            <Flame className="w-3.5 h-3.5 text-[#b8860b]" />
            <span>{streak} {streak === 1 ? 'day' : 'days'}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
