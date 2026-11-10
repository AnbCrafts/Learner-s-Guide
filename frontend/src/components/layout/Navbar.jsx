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
    <header className="sticky top-0 z-40 border-b border-[#24221e] bg-[#0d0d0c]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div 
          onClick={() => setActiveView('dashboard')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="h-9 w-9 rounded-lg bg-[#1a1916] border border-[#332f28] flex items-center justify-center text-[#ded8cb] group-hover:border-[#4d483e] transition-colors">
            <BookOpen className="w-4 h-4 text-[#eae5d8]" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-[#f5f3ec] tracking-tight">
              LearnersGuide
            </span>
            <span className="hidden sm:inline-block text-[11px] font-medium px-2 py-0.5 rounded bg-[#1c1b18] text-[#a8a192] border border-[#2d2a24]">
              MERN
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => setActiveView('dashboard')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
              activeView === 'dashboard'
                ? 'bg-[#201e1a] text-[#f5f3ec] border border-[#38342c]'
                : 'text-[#9c9586] hover:text-[#ede8df] hover:bg-[#171613]'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveView('catalog')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
              activeView === 'catalog' || activeView === 'study'
                ? 'bg-[#201e1a] text-[#f5f3ec] border border-[#38342c]'
                : 'text-[#9c9586] hover:text-[#ede8df] hover:bg-[#171613]'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Study Guides</span>
          </button>
        </nav>

        {/* Actions & Streak */}
        <div className="flex items-center gap-3">
          {/* Content Sync Button */}
          <button
            onClick={handleSync}
            disabled={isSyncing}
            title="Scan & Sync .md files from content folder"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#9c9586] hover:text-[#ede8df] hover:bg-[#1a1916] border border-[#2b2822] transition-colors cursor-pointer"
          >
            {syncedMsg ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#b8b394]" />
                <span className="text-[#dcd7be] hidden sm:inline">Synced</span>
              </>
            ) : (
              <>
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-[#dcd7be]' : ''}`} />
                <span className="hidden sm:inline">{isSyncing ? 'Syncing...' : 'Sync Notes'}</span>
              </>
            )}
          </button>

          {/* Streak Indicator */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1a1916] border border-[#332f27] text-[#ded8cb] text-xs font-medium">
            <Flame className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>{streak} {streak === 1 ? 'day' : 'days'}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
