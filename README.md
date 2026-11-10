# 📚 LearnersGuide

> A modern, full-stack learning platform powered by **Markdown study notes**, **interactive practice questions**, and **progress/mastery tracking**.

---

## 🌟 Key Features

1. **Rich Markdown Study Engine**:
   - Organize study notes into categories and topics (`/content` directory).
   - High-quality syntax-highlighted code blocks with 1-click copy.
   - LaTeX mathematical expressions via KaTeX (`$E = mc^2$`, `\mathcal{O}(n \log n)`).
   - Interactive Table of Contents (TOC) with scroll spy.
   - GitHub alerts (`[!NOTE]`, `[!TIP]`, `[!IMPORTANT]`, `[!WARNING]`).

2. **Interactive Practice & Assessment**:
   - Practice questions attached directly to topics.
   - Instant feedback mode with hints and detailed explanations.
   - Score reports and retry functionality.

3. **Progress & Record Tracking**:
   - Track read status: *Not Started*, *Reading*, *Completed*.
   - Quiz score history and accuracy %.
   - Daily learning streak tracker.
   - Category mastery breakdown.

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js**: v18+ (tested on v26)
- **MongoDB**: MongoDB Atlas connection string or local MongoDB instance

### 2. Configure Environment
Create `backend/.env` (or copy from `backend/.env.example`):
```env
PORT=5000
MONGODB_URI=mongodb+srv://<db_username>:<password>@cluster0.axfzn5n.mongodb.net/learnersguide?retryWrites=true&w=majority
```
> *Note: If MongoDB credentials are not yet set or offline, LearnersGuide automatically falls back to an integrated local storage mode so you can start studying immediately without errors.*

### 3. Run the Application
Open two terminals (or run concurrently):

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📁 Project Architecture

```text
LearnersGuide/
├── backend/
│   ├── content/                   # Your .md study guides and question banks
│   │   ├── dsa/
│   │   ├── web-dev/
│   │   └── system-design/
│   ├── config/                    # MongoDB connection & fallback adapter
│   ├── models/                    # Topic, Question, Progress schemas
│   ├── routes/                    # API endpoints (/api/topics, /api/questions, /api/progress)
│   ├── services/                  # Content scanner, markdown parser, progress analytics
│   └── server.js                  # Express application entry
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── layout/            # Navbar, Sidebar
    │   │   ├── markdown/          # MarkdownViewer, TableOfContents, CodeBlock
    │   │   └── practice/          # QuizRunner, QuestionCard, ScoreSummary
    │   ├── pages/                 # DashboardPage, StudyPage, CatalogPage
    │   └── services/              # API client (axios/fetch)
    └── vite.config.js
```
