import mongoose from 'mongoose';

const OptionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  text: { type: String, required: true },
  isCorrect: { type: Boolean, required: true },
});

const QuestionSchema = new mongoose.Schema({
  topicSlug: {
    type: String,
    required: true,
    index: true,
  },
  questionId: {
    type: String,
    required: true,
  },
  prompt: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['mcq', 'multi_select', 'flashcard'],
    default: 'mcq',
  },
  options: [OptionSchema],
  explanation: {
    type: String,
    default: '',
  },
  hint: {
    type: String,
    default: '',
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium',
  },
  tags: [{ type: String }],
});

// Compound index so questions for a topic can be looked up fast
QuestionSchema.index({ topicSlug: 1, questionId: 1 }, { unique: true });

export const Question = mongoose.models.Question || mongoose.model('Question', QuestionSchema);
