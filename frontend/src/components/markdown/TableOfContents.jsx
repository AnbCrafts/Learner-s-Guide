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
    <nav className="p-4 rounded-xl border border-[#24221e] bg-[#141412] sticky top-24">
      <div className="flex items-center gap-2 pb-3 mb-3 border-b border-[#22201b] text-[11px] font-semibold uppercase tracking-wider text-[#8f8879]">
        <List className="w-3.5 h-3.5 text-[#ded8cb]" />
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
                className={`block py-1 px-2 rounded-md transition-all text-xs truncate ${
                  isActive
                    ? 'text-[#f5f3ec] font-semibold bg-[#201e1a] border-l-2 border-[#ede8df]'
                    : 'text-[#8f8879] hover:text-[#ede8df] hover:bg-[#191715]'
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
