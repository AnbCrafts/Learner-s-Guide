import mongoose from 'mongoose';

const TopicSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    index: true,
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner',
  },
  tags: [{ type: String }],
  summary: { type: String, default: '' },
  estimatedMinutes: { type: Number, default: 10 },
  order: { type: Number, default: 0 },
  relativeFilePath: { type: String, required: true },
  questionCount: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now },
});

export const Topic = mongoose.models.Topic || mongoose.model('Topic', TopicSchema);
