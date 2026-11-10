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

  // Extract raw text for copying
  const rawCode = String(children).replace(/\n$/, '');

  const handleCopy = () => {
    navigator.clipboard.writeText(rawCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!language && !className) {
    return <code className="bg-slate-800 text-indigo-300 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>{children}</code>;
  }

  return (
    <div className="relative my-4 rounded-xl border border-slate-800 bg-slate-900/90 overflow-hidden shadow-md group">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800/80 border-b border-slate-750 text-xs text-slate-400 font-mono">
        <span className="uppercase tracking-wider font-semibold text-slate-300">{language || 'code'}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-700/50 hover:bg-slate-700 text-slate-300 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 text-xs">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="text-xs">Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="p-4 overflow-x-auto text-sm font-mono leading-relaxed">
        <code className={className} {...props}>
          {children}
        </code>
      </div>
    </div>
  );
}

// Convert heading text to safe slug for anchor linking
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
            <div className="overflow-x-auto my-4 rounded-lg border border-slate-800">
              <table className="w-full">{children}</table>
            </div>
          ),
          blockquote: ({ children }) => {
            // Check if blockquote is a GitHub Alert: [!NOTE], [!TIP], [!IMPORTANT], [!WARNING], [!CAUTION]
            const textContent = Array.isArray(children)
              ? children.map(c => (typeof c === 'string' ? c : c?.props?.children || '')).flat().join('')
              : '';

            const isNote = textContent.includes('[!NOTE]');
            const isTip = textContent.includes('[!TIP]');
            const isImportant = textContent.includes('[!IMPORTANT]');
            const isWarning = textContent.includes('[!WARNING]');

            if (isNote || isTip || isImportant || isWarning) {
              let alertType = 'note';
              let Icon = Info;
              let borderColor = 'border-blue-500/50 bg-blue-500/10 text-blue-200';
              let title = 'Note';

              if (isTip) {
                alertType = 'tip';
                Icon = Lightbulb;
                borderColor = 'border-emerald-500/50 bg-emerald-500/10 text-emerald-200';
                title = 'Tip';
              } else if (isImportant) {
                alertType = 'important';
                Icon = AlertCircle;
                borderColor = 'border-purple-500/50 bg-purple-500/10 text-purple-200';
                title = 'Important';
              } else if (isWarning) {
                alertType = 'warning';
                Icon = AlertTriangle;
                borderColor = 'border-amber-500/50 bg-amber-500/10 text-amber-200';
                title = 'Warning';
              }

              return (
                <div className={`my-4 p-4 rounded-xl border ${borderColor} flex gap-3 text-sm leading-relaxed`}>
                  <Icon className="w-5 h-5 shrink-0 mt-0.5 opacity-90" />
                  <div className="space-y-1">
                    <span className="font-semibold uppercase tracking-wider text-xs block opacity-90">{title}</span>
                    <div className="text-slate-300">
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
