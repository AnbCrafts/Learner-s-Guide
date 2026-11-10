import React, { useEffect, useState } from 'react';
import { List } from 'lucide-react';

export default function TableOfContents({ toc = [] }) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    if (!toc.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0% -60% 0%' }
    );

    toc.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [toc]);

  if (!toc.length) return null;

  return (
    <nav className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur sticky top-24">
      <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-800 text-xs font-semibold uppercase tracking-wider text-slate-400">
        <List className="w-4 h-4 text-indigo-400" />
        <span>Table of Contents</span>
      </div>
      <ul className="space-y-1 text-sm max-h-[70vh] overflow-y-auto pr-2">
        {toc.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li
              key={item.id}
              style={{ paddingLeft: `${(item.level - 1) * 0.75}rem` }}
            >
              <a
                href={`#${item.id}`}
                className={`block py-1 px-2 rounded-md transition-all text-xs truncate ${
                  isActive
                    ? 'text-indigo-400 font-semibold bg-indigo-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
