import mongoose from 'mongoose';

const TopicProgressSchema = new mongoose.Schema({
  topicSlug: { type: String, required: true },
  status: {
    type: String,
    enum: ['not_started', 'reading', 'completed'],
    default: 'not_started',
  },
  lastReadAt: { type: Date, default: Date.now },
  notes: { type: String, default: '' },
  isBookmarked: { type: Boolean, default: false },
});

const QuizAttemptSchema = new mongoose.Schema({
  topicSlug: { type: String, required: true },
  score: { type: Number, required: true }, // percentage e.g. 80
  totalQuestions: { type: Number, required: true },
  correctCount: { type: Number, required: true },
  answers: [{
    questionId: String,
    selectedOptionId: String,
    isCorrect: Boolean,
  }],
  attemptedAt: { type: Date, default: Date.now },
});

const UserProgressSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    default: 'default_learner',
  },
  topics: [TopicProgressSchema],
  quizAttempts: [QuizAttemptSchema],
  streak: {
    count: { type: Number, default: 0 },
    lastActiveDate: { type: String, default: null }, // YYYY-MM-DD
  },
  updatedAt: { type: Date, default: Date.now },
});

export const UserProgress = mongoose.models.UserProgress || mongoose.model('UserProgress', UserProgressSchema);
