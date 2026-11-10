import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ArrowRight, 
  RotateCcw, 
  Award, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import { evaluateQuiz } from '../../api/client';

export default function QuizRunner({ topicSlug, topicTitle, questions = [], onComplete, onBackToStudy }) {
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { [questionId]: optionId }
  const [showHints, setShowHints] = useState({}); // { [questionId]: boolean }
  const [evaluation, setEvaluation] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelectOption = (questionId, optionId) => {
    if (evaluation) return; // Prevent changing after submission
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

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const res = await evaluateQuiz(topicSlug, selectedAnswers);
      setEvaluation(res);

      if (res.score >= 70) {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
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
    setEvaluation(null);
  };

  const totalAnswered = Object.keys(selectedAnswers).length;
  const isAllAnswered = questions.length > 0 && totalAnswered === questions.length;

  if (questions.length === 0) {
    return (
      <div className="p-12 text-center rounded-2xl border border-slate-800 bg-slate-900/40">
        <HelpCircle className="w-12 h-12 text-slate-500 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-slate-300">No questions available yet</h3>
        <p className="text-slate-400 text-sm mt-1">
          Add questions to <code className="text-indigo-400 font-mono">{topicSlug}.questions.json</code> to practice here!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Quiz Header & Score Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Interactive Practice</span>
          <h2 className="text-xl font-bold text-white mt-0.5">{topicTitle}</h2>
          <p className="text-xs text-slate-400 mt-1">
            Answer the questions below to test your understanding and update your mastery streak.
          </p>
        </div>

        {evaluation ? (
          <div className="flex items-center gap-3">
            <div className={`px-4 py-2 rounded-xl border flex items-center gap-2 ${
              evaluation.score >= 70 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
                : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
            }`}>
              <Award className="w-5 h-5" />
              <div className="text-left">
                <div className="text-xs font-semibold uppercase">Score</div>
                <div className="text-lg font-bold">{evaluation.score}% ({evaluation.correctCount}/{evaluation.totalQuestions})</div>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="p-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Retry Practice"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="text-xs text-slate-400 flex items-center gap-2 bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-750">
            <span>Progress:</span>
            <span className="font-semibold text-slate-200">{totalAnswered} / {questions.length} answered</span>
          </div>
        )}
      </div>

      {/* Question Cards List */}
      <div className="space-y-6">
        {questions.map((q, idx) => {
          const detail = evaluation?.details?.find(d => d.questionId === q.questionId);
          const isAnswered = selectedAnswers[q.questionId] !== undefined;

          return (
            <div
              key={q.questionId}
              className={`p-6 rounded-2xl border transition-all ${
                detail
                  ? detail.isCorrect
                    ? 'border-emerald-500/40 bg-emerald-950/10'
                    : 'border-rose-500/40 bg-rose-950/10'
                  : isAnswered
                  ? 'border-indigo-500/40 bg-slate-900/80 shadow-md shadow-indigo-500/5'
                  : 'border-slate-800 bg-slate-900/40'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="h-6 w-6 rounded-lg bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300 flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="text-xs font-medium uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/60">
                    {q.difficulty || 'Question'}
                  </span>
                </div>

                {q.hint && !evaluation && (
                  <button
                    onClick={() => toggleHint(q.questionId)}
                    className="flex items-center gap-1 text-xs text-amber-400/80 hover:text-amber-300 transition-colors"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>{showHints[q.questionId] ? 'Hide Hint' : 'Hint'}</span>
                  </button>
                )}
              </div>

              {/* Prompt */}
              <h3 className="text-base font-semibold text-slate-100 mb-4 leading-relaxed">
                {q.prompt}
              </h3>

              {/* Hint Box */}
              {showHints[q.questionId] && !evaluation && (
                <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
                  <span className="font-semibold">💡 Hint: </span>{q.hint}
                </div>
              )}

              {/* Options */}
              <div className="space-y-2.5">
                {q.options.map((opt) => {
                  const isSelected = selectedAnswers[q.questionId] === opt.id;
                  
                  let optionStyle = 'border-slate-800 bg-slate-800/40 hover:bg-slate-800/80 hover:border-slate-700 text-slate-300';
                  let icon = null;

                  if (detail) {
                    const isOptionCorrect = detail.correctOptionId === opt.id;
                    if (isOptionCorrect) {
                      optionStyle = 'border-emerald-500 bg-emerald-500/15 text-emerald-200 font-semibold';
                      icon = <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-auto" />;
                    } else if (isSelected && !detail.isCorrect) {
                      optionStyle = 'border-rose-500 bg-rose-500/15 text-rose-200 font-medium';
                      icon = <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-auto" />;
                    } else {
                      optionStyle = 'border-slate-800/60 bg-slate-900/30 text-slate-500 opacity-60';
                    }
                  } else if (isSelected) {
                    optionStyle = 'border-indigo-500 bg-indigo-500/15 text-white font-medium ring-1 ring-indigo-500';
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(q.questionId, opt.id)}
                      disabled={Boolean(evaluation)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 text-sm ${optionStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`h-5 w-5 rounded-md flex items-center justify-center text-xs font-semibold ${
                          isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {opt.id.toUpperCase()}
                        </span>
                        <span>{opt.text}</span>
                      </div>
                      {icon}
                    </button>
                  );
                })}
              </div>

              {/* Explanation (Shown after evaluation) */}
              {detail && (
                <div className={`mt-5 p-4 rounded-xl border text-sm leading-relaxed ${
                  detail.isCorrect
                    ? 'border-emerald-500/30 bg-emerald-950/20 text-emerald-200'
                    : 'border-amber-500/30 bg-amber-950/20 text-amber-200'
                }`}>
                  <div className="flex items-center gap-1.5 font-bold mb-1 text-xs uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Explanation</span>
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm">
                    {detail.explanation || 'No explanation provided.'}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Action Footer */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        {evaluation ? (
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleReset}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm transition-colors border border-slate-700"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Assessment</span>
            </button>
            {onBackToStudy && (
              <button
                onClick={onBackToStudy}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-colors shadow-lg shadow-indigo-600/20"
              >
                <BookOpen className="w-4 h-4" />
                <span>Return to Notes</span>
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="text-xs text-slate-400">
              {isAllAnswered ? (
                <span className="text-emerald-400 font-medium">All questions answered! Ready to submit.</span>
              ) : (
                <span>Please select an answer for all questions to evaluate.</span>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting || totalAnswered === 0}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-white font-semibold text-sm transition-all shadow-lg ${
                isAllAnswered
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-indigo-500/25 cursor-pointer'
                  : 'bg-slate-800 text-slate-400 border border-slate-700 cursor-pointer hover:bg-slate-750'
              }`}
            >
              <span>{isSubmitting ? 'Evaluating...' : 'Submit Assessment'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
