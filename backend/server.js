import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB, isDbConnected } from './config/db.js';
import { syncContent } from './services/contentService.js';
import topicRoutes from './routes/topicRoutes.js';
import questionRoutes from './routes/questionRoutes.js';
import progressRoutes from './routes/progressRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/topics', topicRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/progress', progressRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: isDbConnected() ? 'connected (MongoDB Atlas)' : 'active (Local Storage Fallback)',
  });
});

// Boot function
async function startServer() {
  await connectDB();
  await syncContent();

  app.listen(PORT, () => {
    console.log(`\n🚀 LearnersGuide Server running at http://localhost:${PORT}`);
    console.log(`📡 Health Check: http://localhost:${PORT}/api/health\n`);
  });
}

startServer().catch(err => {
  console.error('Fatal Server Boot Error:', err);
});
