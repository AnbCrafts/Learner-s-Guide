import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Award, 
  Sparkles, 
  BookOpen, 
  Lightbulb,
  Eye,
  ChevronLeft,
  ChevronRight,
  Check,
  X
} from 'lucide-react';
import { evaluateQuiz } from '../../api/client';

function preprocessLaTeX(text) {
  if (!text) return '';
  return text.replace(/(\$\$[\s\S]*?\$\$|\$[^$\n]+?\$)/g, (mathBlock) => {
    return mathBlock.replace(/(?<!\\)%/g, '\\%');
  });
}

function FormattedMath({ content }) {
  if (!content) return null;
  const processed = preprocessLaTeX(content);
  return (
    <div className="math-container inline-block max-w-full">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeHighlight, rehypeKatex]}
        components={{
          p: ({ children }) => <span className="leading-relaxed">{children}</span>,
        }}
      >
        {processed}
      </ReactMarkdown>
    </div>
  );
}

export default function QuizRunner({ topicSlug, topicTitle, questions = [], onComplete, onBackToStudy }) {
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { [questionId]: optionId | 'correct' | 'incorrect' }
  const [showHints, setShowHints] = useState({}); // { [questionId]: boolean }
  const [revealedSolutions, setRevealedSolutions] = useState({}); // { [questionId]: boolean }
  const [evaluation, setEvaluation] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const PAGE_SIZE = 10;

  const handleSelectOption = (questionId, optionId) => {
    if (evaluation) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const toggleHint = (questionId) => {
    setShowHints(prev => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const toggleSolutionReveal = (questionId) => {
    setRevealedSolutions(prev => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const res = await evaluateQuiz(topicSlug, selectedAnswers);
      setEvaluation(res);

      if (res.score >= 70) {
        confetti({
          particleCount: 50,
          spread: 45,
          origin: { y: 0.6 },
          colors: ['#181715', '#b8860b', '#d8d1c2'],
        });
      }

      if (onComplete) {
        onComplete(res);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowHints({});
    setRevealedSolutions({});
    setEvaluation(null);
    setCurrentPage(0);
  };

  const totalAnswered = Object.keys(selectedAnswers).length;
  const isAllAnswered = questions.length > 0 && totalAnswered === questions.length;

  if (questions.length === 0) {
    return (
      <div className="p-12 text-center rounded-2xl border border-[#dfd8cb] bg-[#ffffff]">
        <h3 className="text-sm font-bold text-[#141311]">No questions detected</h3>
        <p className="text-[#6b6455] text-xs mt-1">
          Questions are dynamically parsed from markdown notes with <code className="font-mono font-bold">* **TCS Practice Question:**</code>
        </p>
      </div>
    );
  }

  // Pagination for large question sets (e.g. 43 questions)
  const totalPages = Math.ceil(questions.length / PAGE_SIZE);
  const currentQuestions = questions.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE);

  return (
    <div className="space-y-6">
      {/* Quiz Header & Score Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl border border-[#dfd8cb] bg-[#ffffff] shadow-2xs">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#6b6455]">Practice & Self-Test</span>
          <h2 className="text-lg font-black text-[#141311] mt-0.5">{topicTitle}</h2>
          <p className="text-xs text-[#6b6455] mt-1">
            {questions.length} questions dynamically extracted from study notes.
          </p>
        </div>

        {evaluation ? (
          <div className="flex items-center gap-3">
            <div className={`px-4 py-2 rounded-xl border flex items-center gap-2 ${
              evaluation.score >= 70 
                ? 'bg-[#edf5e6] border-[#bcd3a8] text-[#234215]' 
                : 'bg-[#fdf0ed] border-[#e8bbb2] text-[#4f1810]'
            }`}>
              <Award className="w-4 h-4" />
              <div className="text-left">
                <div className="text-[10px] font-bold uppercase tracking-wider">Score</div>
                <div className="text-base font-black">{evaluation.score}% ({evaluation.correctCount}/{evaluation.totalQuestions})</div>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="p-2.5 rounded-xl border border-[#dfd8cb] bg-[#ffffff] hover:bg-[#f5f2ea] text-[#181715] transition-colors cursor-pointer shadow-2xs"
              title="Retry Practice"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="text-xs text-[#5c564a] flex items-center gap-2 bg-[#f5f2ea] px-3.5 py-1.5 rounded-lg border border-[#dfd8cb] font-semibold">
            <span>Progress:</span>
            <span className="font-bold text-[#141311]">{totalAnswered} / {questions.length} answered</span>
          </div>
        )}
      </div>

      {/* Pagination Bar (when questions > 10) */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between p-3 rounded-xl border border-[#dfd8cb] bg-[#ffffff] text-xs">
          <span className="font-semibold text-[#6b6455]">
            Showing questions {currentPage * PAGE_SIZE + 1} - {Math.min((currentPage + 1) * PAGE_SIZE, questions.length)} of {questions.length}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              className="p-1.5 rounded-lg border border-[#dfd8cb] bg-[#ffffff] disabled:opacity-40 hover:bg-[#f5f2ea] cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 text-[#181715]" />
            </button>
            <span className="font-bold text-[#141311]">
              Page {currentPage + 1} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={currentPage >= totalPages - 1}
              className="p-1.5 rounded-lg border border-[#dfd8cb] bg-[#ffffff] disabled:opacity-40 hover:bg-[#f5f2ea] cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 text-[#181715]" />
            </button>
          </div>
        </div>
      )}

      {/* Question Cards List */}
      <div className="space-y-5">
        {currentQuestions.map((q, localIdx) => {
          const globalIdx = currentPage * PAGE_SIZE + localIdx;
          const detail = evaluation?.details?.find(d => d.questionId === q.questionId);
          const isAnswered = selectedAnswers[q.questionId] !== undefined;
          const isMCQ = q.options && q.options.length >= 2;
          const isRevealed = revealedSolutions[q.questionId];

          return (
            <div
              key={q.questionId}
              className={`p-6 rounded-2xl border transition-all shadow-2xs ${
                detail
                  ? detail.isCorrect
                    ? 'border-[#a3c489] bg-[#f4f9f0]'
                    : 'border-[#df9e92] bg-[#fcf2f0]'
                  : isAnswered
                  ? 'border-[#181715] bg-[#ffffff]'
                  : 'border-[#dfd8cb] bg-[#ffffff]'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="h-6 w-6 rounded-lg bg-[#181715] text-xs font-bold text-[#ffffff] flex items-center justify-center">
                    {globalIdx + 1}
                  </span>
                  <span className="text-[11px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#f5f2ea] text-[#5c564a] border border-[#dfd8cb]">
                    {isMCQ ? 'Multiple Choice' : 'Practice Problem'}
                  </span>
                </div>

                {q.hint && !evaluation && (
                  <button
                    onClick={() => toggleHint(q.questionId)}
                    className="flex items-center gap-1.5 text-xs text-[#6b6455] hover:text-[#181715] font-semibold transition-colors cursor-pointer"
                  >
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>{showHints[q.questionId] ? 'Hide Hint' : 'Show Hint'}</span>
                  </button>
                )}
              </div>

              {/* Prompt with Full LaTeX Support */}
              <div className="text-sm sm:text-base font-bold text-[#141311] mb-4 leading-relaxed">
                <FormattedMath content={q.prompt} />
              </div>

              {/* Hint Box */}
              {showHints[q.questionId] && !evaluation && (
                <div className="mb-4 p-3 rounded-xl bg-[#faf7f0] border border-[#e2d8c3] text-xs text-[#4f4838] flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 shrink-0 text-[#b8860b] mt-0.5" />
                  <div>
                    <span className="font-bold text-[#181715]">Hint: </span>
                    <span>{q.hint}</span>
                  </div>
                </div>
              )}

              {/* Mode A: MCQ Choices */}
              {isMCQ ? (
                <div className="space-y-2.5">
                  {q.options.map((opt) => {
                    const isSelected = selectedAnswers[q.questionId] === opt.id;
                    
                    let optionStyle = 'border-[#dfd8cb] bg-[#faf8f4] hover:bg-[#ede7dc] hover:border-[#b8b09f] text-[#2b2823]';
                    let icon = null;

                    if (detail) {
                      const isOptionCorrect = detail.correctOptionId === opt.id;
                      if (isOptionCorrect) {
                        optionStyle = 'border-[#4a7c29] bg-[#edf5e6] text-[#1c3810] font-bold';
                        icon = <CheckCircle2 className="w-4 h-4 text-[#2c521b] shrink-0 ml-auto" />;
                      } else if (isSelected && !detail.isCorrect) {
                        optionStyle = 'border-[#a84939] bg-[#fdf0ed] text-[#4f1810] font-bold';
                        icon = <XCircle className="w-4 h-4 text-[#8a2618] shrink-0 ml-auto" />;
                      } else {
                        optionStyle = 'border-[#dfd8cb] bg-[#faf8f4] text-[#8c8473] opacity-60';
                      }
                    } else if (isSelected) {
                      optionStyle = 'border-[#181715] bg-[#f5f2ea] text-[#141311] font-bold ring-2 ring-[#181715]';
                    }

                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectOption(q.questionId, opt.id)}
                        disabled={Boolean(evaluation)}
                        className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 text-xs sm:text-sm cursor-pointer shadow-2xs ${optionStyle}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`h-5 w-5 rounded flex items-center justify-center text-[11px] font-bold ${
                            isSelected ? 'bg-[#181715] text-[#ffffff]' : 'bg-[#ede7dc] text-[#181715] border border-[#d5cebf]'
                          }`}>
                            {opt.id.toUpperCase()}
                          </span>
                          <FormattedMath content={opt.text} />
                        </div>
                        {icon}
                      </button>
                    );
                  })}
                </div>
              ) : (
                /* Mode B: Open Practice / Numerical / Coding Question with Solution Reveal & Self-Assessment */
                <div className="space-y-3">
                  {!evaluation && (
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => toggleSolutionReveal(q.questionId)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#dfd8cb] bg-[#faf8f4] hover:bg-[#ede7dc] text-xs font-bold text-[#181715] transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{isRevealed ? 'Hide Solution' : 'Reveal Solution & Steps'}</span>
                      </button>

                      <div className="ml-auto flex items-center gap-2">
                        <button
                          onClick={() => handleSelectOption(q.questionId, 'correct')}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                            selectedAnswers[q.questionId] === 'correct'
                              ? 'border-[#4a7c29] bg-[#edf5e6] text-[#1c3810] ring-2 ring-[#4a7c29]'
                              : 'border-[#dfd8cb] bg-[#ffffff] hover:bg-[#f5f2ea] text-[#2b2823]'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5 text-[#2c521b]" />
                          <span>I Got It Right</span>
                        </button>
                        <button
                          onClick={() => handleSelectOption(q.questionId, 'incorrect')}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                            selectedAnswers[q.questionId] === 'incorrect'
                              ? 'border-[#a84939] bg-[#fdf0ed] text-[#4f1810] ring-2 ring-[#a84939]'
                              : 'border-[#dfd8cb] bg-[#ffffff] hover:bg-[#f5f2ea] text-[#2b2823]'
                          }`}
                        >
                          <X className="w-3.5 h-3.5 text-[#8a2618]" />
                          <span>Need Review</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Pre-evaluation solution preview if user revealed it */}
                  {isRevealed && !detail && (
                    <div className="p-4 rounded-xl border border-[#dfd8cb] bg-[#faf8f4] text-xs leading-relaxed text-[#2b2823]">
                      <div className="font-bold text-[#141311] mb-2 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#181715]" />
                        <span>Step-by-Step Solution:</span>
                      </div>
                      <FormattedMath content={q.explanation} />
                    </div>
                  )}
                </div>
              )}

              {/* Explanation (Shown after evaluation) */}
              {detail && (
                <div className={`mt-4 p-4 rounded-xl border text-xs sm:text-sm leading-relaxed ${
                  detail.isCorrect
                    ? 'border-[#bcd3a8] bg-[#edf5e6] text-[#234215]'
                    : 'border-[#dfd8cb] bg-[#faf8f4] text-[#38342d]'
                }`}>
                  <div className="flex items-center gap-1.5 font-bold mb-2 text-[11px] uppercase tracking-wider text-[#141311]">
                    <Sparkles className="w-3.5 h-3.5 text-[#181715]" />
                    <span>Explanation & Solution</span>
                  </div>
                  <FormattedMath content={detail.explanation} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Action Footer */}
      <div className="p-5 rounded-2xl border border-[#dfd8cb] bg-[#ffffff] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
        {evaluation ? (
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleReset}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#ffffff] hover:bg-[#f5f2ea] text-[#181715] font-bold text-xs sm:text-sm transition-colors border border-[#dfd8cb] cursor-pointer shadow-2xs"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Assessment</span>
            </button>
            {onBackToStudy && (
              <button
                onClick={onBackToStudy}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#181715] hover:bg-[#2e2c27] text-[#ffffff] font-bold text-xs sm:text-sm transition-colors shadow-sm cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>Return to Notes</span>
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="text-xs text-[#6b6455]">
              {isAllAnswered ? (
                <span className="text-[#141311] font-bold">All {questions.length} questions answered. Ready to submit!</span>
              ) : (
                <span>{totalAnswered} of {questions.length} completed. You can submit when ready.</span>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting || totalAnswered === 0}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                totalAnswered > 0
                  ? 'bg-[#181715] hover:bg-[#2e2c27] text-[#ffffff] shadow-sm'
                  : 'bg-[#ede7dc] text-[#8c8473] border border-[#d5cebf]'
              }`}
            >
              <span>{isSubmitting ? 'Evaluating...' : `Submit (${totalAnswered}/${questions.length})`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
