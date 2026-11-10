import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import { Copy, Check, Info, Lightbulb, AlertTriangle, AlertCircle } from 'lucide-react';

function CodeBlock({ children, className, ...props }) {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';

  const rawCode = String(children).replace(/\n$/, '');

  const handleCopy = () => {
    navigator.clipboard.writeText(rawCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!language && !className) {
    return <code className="bg-[#ede7dc] text-[#181715] border border-[#d8d1c2] px-1.5 py-0.5 rounded text-xs font-mono font-semibold" {...props}>{children}</code>;
  }

  return (
    <div className="relative my-4 rounded-xl border border-[#2b2823] bg-[#181715] overflow-hidden shadow-2xs">
      <div className="flex items-center justify-between px-4 py-2 bg-[#22201c] border-b border-[#2e2a24] text-xs text-[#a8a192] font-mono">
        <span className="uppercase tracking-wider font-bold text-[#eae5d8] text-[11px]">{language || 'code'}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#2e2b24] hover:bg-[#3d3930] text-[#eae5d8] transition-colors cursor-pointer text-xs"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#9ece6a]" />
              <span className="text-[#9ece6a] text-xs font-bold">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="text-xs">Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed text-[#ede7dc]">
        <code className={className} {...props}>
          {children}
        </code>
      </div>
    </div>
  );
}

function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

export default function MarkdownViewer({ content }) {
  return (
    <div className="markdown-body max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeKatex]}
        components={{
          h1: ({ children }) => {
            const id = slugify(children);
            return <h1 id={id} className="scroll-mt-24">{children}</h1>;
          },
          h2: ({ children }) => {
            const id = slugify(children);
            return <h2 id={id} className="scroll-mt-24">{children}</h2>;
          },
          h3: ({ children }) => {
            const id = slugify(children);
            return <h3 id={id} className="scroll-mt-24">{children}</h3>;
          },
          code: CodeBlock,
          table: ({ children }) => (
            <div className="overflow-x-auto my-4 rounded-xl border border-[#dfd8cb] shadow-2xs">
              <table className="w-full">{children}</table>
            </div>
          ),
          blockquote: ({ children }) => {
            const textContent = Array.isArray(children)
              ? children.map(c => (typeof c === 'string' ? c : c?.props?.children || '')).flat().join('')
              : '';

            const isNote = textContent.includes('[!NOTE]');
            const isTip = textContent.includes('[!TIP]');
            const isImportant = textContent.includes('[!IMPORTANT]');
            const isWarning = textContent.includes('[!WARNING]');

            if (isNote || isTip || isImportant || isWarning) {
              let Icon = Info;
              let borderColor = 'border-[#dfd8cb] bg-[#faf7f0] text-[#2b271e]';
              let title = 'Note';

              if (isTip) {
                Icon = Lightbulb;
                borderColor = 'border-[#c5dcb3] bg-[#f4f9f0] text-[#1e3b12]';
                title = 'Tip';
              } else if (isImportant) {
                Icon = AlertCircle;
                borderColor = 'border-[#dfd8cb] bg-[#f7f4ed] text-[#24211a]';
                title = 'Important';
              } else if (isWarning) {
                Icon = AlertTriangle;
                borderColor = 'border-[#eccdc0] bg-[#fdf6f2] text-[#542714]';
                title = 'Warning';
              }

              return (
                <div className={`my-4 p-4 rounded-xl border ${borderColor} flex gap-3 text-xs sm:text-sm leading-relaxed shadow-2xs`}>
                  <Icon className="w-4 h-4 shrink-0 mt-0.5 opacity-90" />
                  <div className="space-y-1">
                    <span className="font-bold uppercase tracking-wider text-[11px] block opacity-90">{title}</span>
                    <div className="text-[#38342d]">
                      {children}
                    </div>
                  </div>
                </div>
              );
            }

            return <blockquote>{children}</blockquote>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
