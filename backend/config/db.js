import mongoose from 'mongoose';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let isConnected = false;

export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.includes('<db_username>')) {
    console.warn('\n⚠️ [Database Notice]:');
    console.warn('MongoDB URI contains "<db_username>" placeholder or is not configured.');
    console.warn('👉 To connect to your cloud cluster, replace <db_username> with your Atlas username in backend/.env.');
    console.warn('⚡ Active fallback: Using integrated local persistence store (backend/data/local_store.json). All features work!\n');
    return false;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log(`✅ MongoDB Connected successfully: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`\n⚠️ [Database Connection Failed]: ${error.message}`);
    console.warn('⚡ Active fallback: Using integrated local persistence store. All features remain operational.\n');
    isConnected = false;
    return false;
  }
}

export function isDbConnected() {
  return isConnected;
}

// Lightweight local fallback storage
const DATA_DIR = path.join(__dirname, '..', 'data');
const LOCAL_STORE_FILE = path.join(DATA_DIR, 'local_store.json');

export async function getLocalStore() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const data = await fs.readFile(LOCAL_STORE_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    const initial = {
      progress: {},      // { [topicSlug]: { status, lastReadAt, notes } }
      quizAttempts: [],  // [ { topicSlug, score, totalQuestions, correctCount, answers, attemptedAt } ]
      streak: { count: 0, lastDate: null }
    };
    await saveLocalStore(initial);
    return initial;
  }
}

export async function saveLocalStore(storeData) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(LOCAL_STORE_FILE, JSON.stringify(storeData, null, 2), 'utf-8');
}
