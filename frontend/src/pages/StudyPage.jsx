import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight,
  BookOpen, 
  CheckCircle2, 
  Clock, 
  HelpCircle, 
  Bookmark, 
  BookmarkCheck,
  Award,
  Sparkles
} from 'lucide-react';
import { fetchTopicDetails, fetchQuestions, updateTopicStatus } from '../api/client';
import MarkdownViewer from '../components/markdown/MarkdownViewer';
import TableOfContents from '../components/markdown/TableOfContents';
import QuizRunner from '../components/practice/QuizRunner';

export default function StudyPage({ slug, onBack, onProgressUpdated }) {
  const [topic, setTopic] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('study'); // 'study' | 'practice'
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        setLoading(true);
        const [topicData, questionsData] = await Promise.all([
          fetchTopicDetails(slug),
          fetchQuestions(slug),
        ]);

        if (!mounted) return;
        setTopic(topicData);
        setQuestions(questionsData);
        setIsBookmarked(topicData.isBookmarked || false);
        setIsCompleted(topicData.status === 'completed');

        // Automatically set status to 'reading' if not yet completed
        if (topicData.status === 'not_started') {
          await updateTopicStatus(slug, 'reading');
          if (onProgressUpdated) onProgressUpdated();
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadData();
    return () => { mounted = false; };
  }, [slug]);

  const handleToggleComplete = async () => {
    const nextStatus = isCompleted ? 'reading' : 'completed';
    setIsCompleted(!isCompleted);
    try {
      await updateTopicStatus(slug, nextStatus);
      if (onProgressUpdated) onProgressUpdated();
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleBookmark = async () => {
    const nextState = !isBookmarked;
    setIsBookmarked(nextState);
    try {
      await updateTopicStatus(slug, null, null, nextState);
      if (onProgressUpdated) onProgressUpdated();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="p-12 text-center">
        <h2 className="text-lg font-bold text-slate-300">Topic not found</h2>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm"
        >
          Back to Guides
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-4">
      {/* Top Navigation & Status Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Back to Guides"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-indigo-400 border border-slate-750">
                {topic.category}
              </span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {topic.estimatedMinutes} min read
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white mt-1">
              {topic.title}
            </h1>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
          <button
            onClick={handleToggleBookmark}
            className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
              isBookmarked
                ? 'border-indigo-500/50 bg-indigo-500/10 text-indigo-400'
                : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
            title={isBookmarked ? 'Bookmarked' : 'Add to bookmarks'}
          >
            {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          </button>

          <button
            onClick={handleToggleComplete}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
              isCompleted
                ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300'
                : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isCompleted ? 'Completed' : 'Mark Complete'}</span>
          </button>
        </div>
      </div>

      {/* Mode Switch Tabs (Notes vs Practice) */}
      <div className="flex items-center border-b border-slate-800">
        <button
          onClick={() => setActiveTab('study')}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === 'study'
              ? 'border-indigo-500 text-white bg-slate-900/40'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4 text-indigo-400" />
          <span>Study Notes</span>
        </button>

        <button
          onClick={() => setActiveTab('practice')}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === 'practice'
              ? 'border-indigo-500 text-white bg-slate-900/40'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Award className="w-4 h-4 text-amber-400" />
          <span>Practice Questions ({questions.length})</span>
        </button>
      </div>

      {/* Main Content Area */}
      {activeTab === 'study' ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Markdown Body */}
          <div className="lg:col-span-3 bg-slate-900/30 p-6 sm:p-8 rounded-2xl border border-slate-800/80">
            <MarkdownViewer content={topic.content} />

            {/* Bottom transition prompt to take the quiz */}
            <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-indigo-950/20 border border-indigo-500/20">
              <div>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  Finished reading? Test your recall!
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Practice with {questions.length} questions designed to test key concepts and edge cases.
                </p>
              </div>

              <button
                onClick={() => {
                  setActiveTab('practice');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/25 shrink-0 cursor-pointer"
              >
                <span>Start Practice Quiz</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Sticky TOC Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <TableOfContents toc={topic.toc} />
          </div>
        </div>
      ) : (
        /* Practice / Quiz Engine Mode */
        <div className="max-w-3xl mx-auto">
          <QuizRunner
            topicSlug={slug}
            topicTitle={topic.title}
            questions={questions}
            onComplete={() => {
              if (onProgressUpdated) onProgressUpdated();
            }}
            onBackToStudy={() => setActiveTab('study')}
          />
        </div>
      )}
    </div>
  );
}
