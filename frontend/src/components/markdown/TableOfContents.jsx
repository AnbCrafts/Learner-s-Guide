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
    <nav className="p-4 rounded-2xl border border-[#dfd8cb] bg-[#ffffff] sticky top-24 shadow-2xs">
      <div className="flex items-center gap-2 pb-3 mb-3 border-b border-[#ede7dc] text-[11px] font-bold uppercase tracking-wider text-[#6b6455]">
        <List className="w-3.5 h-3.5 text-[#181715]" />
        <span>Contents</span>
      </div>
      <ul className="space-y-1 text-xs max-h-[70vh] overflow-y-auto pr-1">
        {toc.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li
              key={item.id}
              style={{ paddingLeft: `${(item.level - 1) * 0.65}rem` }}
            >
              <a
                href={`#${item.id}`}
                className={`block py-1.5 px-2 rounded-md transition-all text-xs truncate ${
                  isActive
                    ? 'text-[#141311] font-bold bg-[#f5f2ea] border-l-2 border-[#181715]'
                    : 'text-[#6b6455] hover:text-[#181715] hover:bg-[#faf8f4]'
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
