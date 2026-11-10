import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Award, 
  Sparkles,
  BookOpen,
  Lightbulb
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
          particleCount: 50,
          spread: 45,
          origin: { y: 0.6 },
          colors: ['#ede8df', '#d4af37', '#8f8879'],
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
      <div className="p-12 text-center rounded-2xl border border-[#24221e] bg-[#141412]">
        <h3 className="text-sm font-semibold text-[#ede8df]">No questions available yet</h3>
        <p className="text-[#8f8879] text-xs mt-1">
          Add companion questions to <code className="text-[#ded8cb] font-mono">{topicSlug}.questions.json</code>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Quiz Header & Score Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl border border-[#24221e] bg-[#141412]">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#a8a192]">Practice & Self-Test</span>
          <h2 className="text-lg font-bold text-[#f5f3ec] mt-0.5">{topicTitle}</h2>
          <p className="text-xs text-[#8f8879] mt-1">
            Answer all questions to review your retention and update mastery stats.
          </p>
        </div>

        {evaluation ? (
          <div className="flex items-center gap-3">
            <div className={`px-4 py-2 rounded-xl border flex items-center gap-2 ${
              evaluation.score >= 70 
                ? 'bg-[#1b2016] border-[#38402c] text-[#d1ddbe]' 
                : 'bg-[#221c15] border-[#3d3326] text-[#ded2ba]'
            }`}>
              <Award className="w-4 h-4" />
              <div className="text-left">
                <div className="text-[10px] font-semibold uppercase tracking-wider">Score</div>
                <div className="text-base font-bold">{evaluation.score}% ({evaluation.correctCount}/{evaluation.totalQuestions})</div>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="p-2.5 rounded-xl border border-[#2e2a22] bg-[#1a1815] hover:bg-[#23201b] text-[#ded8cb] transition-colors cursor-pointer"
              title="Retry Practice"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="text-xs text-[#8f8879] flex items-center gap-2 bg-[#1a1815] px-3 py-1.5 rounded-lg border border-[#2a2721]">
            <span>Progress:</span>
            <span className="font-semibold text-[#ded8cb]">{totalAnswered} / {questions.length} answered</span>
          </div>
        )}
      </div>

      {/* Question Cards List */}
      <div className="space-y-5">
        {questions.map((q, idx) => {
          const detail = evaluation?.details?.find(d => d.questionId === q.questionId);
          const isAnswered = selectedAnswers[q.questionId] !== undefined;

          return (
            <div
              key={q.questionId}
              className={`p-6 rounded-2xl border transition-all ${
                detail
                  ? detail.isCorrect
                    ? 'border-[#39422a] bg-[#141812]'
                    : 'border-[#422c29] bg-[#181313]'
                  : isAnswered
                  ? 'border-[#38342a] bg-[#161513]'
                  : 'border-[#24221e] bg-[#141412]'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="h-6 w-6 rounded-lg bg-[#1c1b18] border border-[#2e2a23] text-xs font-bold text-[#ded8cb] flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="text-[11px] font-medium uppercase px-2 py-0.5 rounded bg-[#1c1b18] text-[#8f8879] border border-[#2a2721]">
                    {q.difficulty || 'Question'}
                  </span>
                </div>

                {q.hint && !evaluation && (
                  <button
                    onClick={() => toggleHint(q.questionId)}
                    className="flex items-center gap-1.5 text-xs text-[#b8ad96] hover:text-[#ede8df] transition-colors cursor-pointer"
                  >
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>{showHints[q.questionId] ? 'Hide Hint' : 'Show Hint'}</span>
                  </button>
                )}
              </div>

              {/* Prompt */}
              <h3 className="text-sm sm:text-base font-semibold text-[#f5f3ec] mb-4 leading-relaxed">
                {q.prompt}
              </h3>

              {/* Hint Box */}
              {showHints[q.questionId] && !evaluation && (
                <div className="mb-4 p-3 rounded-xl bg-[#1b1915] border border-[#332e24] text-xs text-[#cdc5b3] flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 shrink-0 text-[#d4af37] mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#ded8cb]">Hint: </span>
                    <span>{q.hint}</span>
                  </div>
                </div>
              )}

              {/* Options */}
              <div className="space-y-2">
                {q.options.map((opt) => {
                  const isSelected = selectedAnswers[q.questionId] === opt.id;
                  
                  let optionStyle = 'border-[#24221e] bg-[#171614] hover:bg-[#1e1c19] hover:border-[#38342c] text-[#cdc7bb]';
                  let icon = null;

                  if (detail) {
                    const isOptionCorrect = detail.correctOptionId === opt.id;
                    if (isOptionCorrect) {
                      optionStyle = 'border-[#414b2f] bg-[#192015] text-[#d6e2c3] font-semibold';
                      icon = <CheckCircle2 className="w-4 h-4 text-[#bad09d] shrink-0 ml-auto" />;
                    } else if (isSelected && !detail.isCorrect) {
                      optionStyle = 'border-[#4e2f2a] bg-[#221615] text-[#e0b6b0] font-medium';
                      icon = <XCircle className="w-4 h-4 text-[#d9958d] shrink-0 ml-auto" />;
                    } else {
                      optionStyle = 'border-[#201e1a] bg-[#121110] text-[#635e53] opacity-50';
                    }
                  } else if (isSelected) {
                    optionStyle = 'border-[#ede8df] bg-[#22201b] text-[#f5f3ec] font-medium ring-1 ring-[#ede8df]/30';
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(q.questionId, opt.id)}
                      disabled={Boolean(evaluation)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 text-xs sm:text-sm cursor-pointer ${optionStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`h-5 w-5 rounded flex items-center justify-center text-[11px] font-bold ${
                          isSelected ? 'bg-[#ede8df] text-[#141311]' : 'bg-[#1f1d19] text-[#8f8879] border border-[#2e2a22]'
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
                <div className={`mt-4 p-4 rounded-xl border text-xs sm:text-sm leading-relaxed ${
                  detail.isCorrect
                    ? 'border-[#39422a] bg-[#171d13] text-[#cfdec0]'
                    : 'border-[#383226] bg-[#191714] text-[#d6cdb8]'
                }`}>
                  <div className="flex items-center gap-1.5 font-bold mb-1 text-[11px] uppercase tracking-wider text-[#ded8cb]">
                    <Sparkles className="w-3 h-3 text-[#ded8cb]" />
                    <span>Explanation</span>
                  </div>
                  <p className="text-[#cdc7bb] text-xs leading-relaxed">
                    {detail.explanation || 'No explanation provided.'}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Action Footer */}
      <div className="p-5 rounded-2xl border border-[#24221e] bg-[#141412] flex flex-col sm:flex-row items-center justify-between gap-4">
        {evaluation ? (
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleReset}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1b1a17] hover:bg-[#23211d] text-[#ded8cb] font-medium text-xs sm:text-sm transition-colors border border-[#2d2a23] cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Assessment</span>
            </button>
            {onBackToStudy && (
              <button
                onClick={onBackToStudy}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#ede8df] hover:bg-[#ded7c9] text-[#141311] font-semibold text-xs sm:text-sm transition-colors shadow-sm cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>Return to Notes</span>
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="text-xs text-[#8f8879]">
              {isAllAnswered ? (
                <span className="text-[#ded8cb] font-medium">All questions answered. Ready to submit!</span>
              ) : (
                <span>Select an answer for each question before evaluating.</span>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting || totalAnswered === 0}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                isAllAnswered
                  ? 'bg-[#ede8df] hover:bg-[#ded7c9] text-[#141311] shadow-sm'
                  : 'bg-[#1b1916] text-[#706a5e] border border-[#26231d]'
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
