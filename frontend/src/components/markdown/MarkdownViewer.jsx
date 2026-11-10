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
    return <code className="bg-[#191816] text-[#ded8cb] border border-[#2b2924] px-1.5 py-0.5 rounded text-xs font-mono" {...props}>{children}</code>;
  }

  return (
    <div className="relative my-4 rounded-xl border border-[#24221e] bg-[#10100e] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-[#161513] border-b border-[#24221e] text-xs text-[#8f8879] font-mono">
        <span className="uppercase tracking-wider font-semibold text-[#ded8cb] text-[11px]">{language || 'code'}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#201e1a] hover:bg-[#2b2823] text-[#ded8cb] transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#bad09d]" />
              <span className="text-[#bad09d] text-xs">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="text-xs">Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed text-[#dfdbd2]">
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
            <div className="overflow-x-auto my-4 rounded-xl border border-[#24221e]">
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
              let borderColor = 'border-[#332f27] bg-[#181613] text-[#ded8cb]';
              let title = 'Note';

              if (isTip) {
                Icon = Lightbulb;
                borderColor = 'border-[#353c29] bg-[#161a14] text-[#d6e0c7]';
                title = 'Tip';
              } else if (isImportant) {
                Icon = AlertCircle;
                borderColor = 'border-[#3d382d] bg-[#1b1915] text-[#ded8cb]';
                title = 'Important';
              } else if (isWarning) {
                Icon = AlertTriangle;
                borderColor = 'border-[#423328] bg-[#1e1714] text-[#dfc5b7]';
                title = 'Warning';
              }

              return (
                <div className={`my-4 p-4 rounded-xl border ${borderColor} flex gap-3 text-xs sm:text-sm leading-relaxed`}>
                  <Icon className="w-4 h-4 shrink-0 mt-0.5 opacity-90" />
                  <div className="space-y-1">
                    <span className="font-semibold uppercase tracking-wider text-[11px] block opacity-90">{title}</span>
                    <div className="text-[#cdc7bb]">
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
