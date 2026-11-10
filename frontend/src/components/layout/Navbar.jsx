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
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div 
          onClick={() => setActiveView('dashboard')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-lg font-bold bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
              LearnersGuide
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              MERN
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setActiveView('dashboard')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              activeView === 'dashboard'
                ? 'bg-slate-800 text-white shadow-inner'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span className="hidden md:inline">Dashboard</span>
          </button>

          <button
            onClick={() => setActiveView('catalog')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              activeView === 'catalog' || activeView === 'study'
                ? 'bg-slate-800 text-white shadow-inner'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Compass className="w-4 h-4" />
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
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-slate-800 transition-colors"
          >
            {syncedMsg ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 hidden sm:inline">Synced</span>
              </>
            ) : (
              <>
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-indigo-400' : ''}`} />
                <span className="hidden sm:inline">{isSyncing ? 'Syncing...' : 'Sync Notes'}</span>
              </>
            )}
          </button>

          {/* Streak Indicator */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold shadow-sm">
            <Flame className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>{streak} {streak === 1 ? 'day' : 'days'} streak</span>
          </div>
        </div>
      </div>
    </header>
  );
}
