import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight,
  BookOpen, 
  CheckCircle2, 
  Clock, 
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
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#181715]"></div>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="p-12 text-center bg-[#ffffff] border border-[#dfd8cb] rounded-2xl">
        <h2 className="text-base font-bold text-[#141311]">Topic not found</h2>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 rounded-xl bg-[#181715] text-[#ffffff] font-bold text-xs cursor-pointer"
        >
          Back to Guides
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Navigation & Status Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#dfd8cb]">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2.5 rounded-xl border border-[#dfd8cb] bg-[#ffffff] hover:bg-[#f5f2ea] text-[#181715] transition-colors cursor-pointer shadow-2xs"
            title="Back to Guides"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#ede7dc] text-[#544f43] border border-[#dbd3c3]">
                {topic.category}
              </span>
              <span className="text-xs text-[#a8a192]">•</span>
              <span className="text-xs text-[#6b6455] flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5" />
                {topic.estimatedMinutes} min read
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#141311] mt-1 tracking-tight">
              {topic.title}
            </h1>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
          <button
            onClick={handleToggleBookmark}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer shadow-2xs ${
              isBookmarked
                ? 'border-[#181715] bg-[#181715] text-[#ffffff]'
                : 'border-[#dfd8cb] bg-[#ffffff] text-[#6b6455] hover:text-[#181715] hover:bg-[#f5f2ea]'
            }`}
            title={isBookmarked ? 'Bookmarked' : 'Add to bookmarks'}
          >
            {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          </button>

          <button
            onClick={handleToggleComplete}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer shadow-2xs ${
              isCompleted
                ? 'border-[#234215] bg-[#edf5e6] text-[#234215]'
                : 'border-[#dfd8cb] bg-[#ffffff] text-[#181715] hover:bg-[#f5f2ea]'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isCompleted ? 'Completed' : 'Mark Complete'}</span>
          </button>
        </div>
      </div>

      {/* Mode Switch Tabs (Notes vs Practice) */}
      <div className="flex items-center border-b border-[#dfd8cb]">
        <button
          onClick={() => setActiveTab('study')}
          className={`flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'study'
              ? 'border-[#181715] text-[#181715] bg-[#ffffff] rounded-t-lg'
              : 'border-transparent text-[#6b6455] hover:text-[#181715]'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Study Notes</span>
        </button>

        <button
          onClick={() => setActiveTab('practice')}
          className={`flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'practice'
              ? 'border-[#181715] text-[#181715] bg-[#ffffff] rounded-t-lg'
              : 'border-transparent text-[#6b6455] hover:text-[#181715]'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Practice Questions ({questions.length})</span>
        </button>
      </div>

      {/* Main Content Area */}
      {activeTab === 'study' ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Markdown Body */}
          <div className="lg:col-span-3 bg-[#ffffff] p-6 sm:p-8 rounded-2xl border border-[#dfd8cb] shadow-2xs">
            <MarkdownViewer content={topic.content} />

            {/* Bottom transition card to take the quiz */}
            <div className="mt-12 pt-8 border-t border-[#ede7dc] flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-[#faf8f4] border border-[#e5dfd3]">
              <div>
                <h4 className="text-sm font-bold text-[#141311] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#181715]" />
                  Ready to test your recall?
                </h4>
                <p className="text-xs text-[#6b6455] mt-1">
                  Practice with {questions.length} questions covering key patterns and edge cases.
                </p>
              </div>

              <button
                onClick={() => {
                  setActiveTab('practice');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#181715] hover:bg-[#2b2925] text-[#ffffff] font-bold text-xs transition-all shadow-sm shrink-0 cursor-pointer"
              >
                <span>Start Practice Quiz</span>
                <ArrowRight className="w-3.5 h-3.5" />
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
