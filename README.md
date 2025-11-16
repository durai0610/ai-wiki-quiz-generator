# AI Wiki Quiz Generator

A full-stack application that converts any Wikipedia article into an AI-generated quiz.
Users can enter a Wikipedia URL, and the system will scrape the content, summarize key details, generate quiz questions using an LLM, and store the results in a database with a history view.

---

# 🚀 Features

## Backend (FastAPI + PostgreSQL + LangChain)

* Scrapes Wikipedia page content

* Cleans HTML and extracts text

* Uses LLM to generate:

    * Summary

    * Key entities

    * Sections

    * 10-question quiz

    * Related topics

* Stores quizzes in PostgreSQL

* Provides API endpoints for quiz generation, history, and quiz retrieval

---

# Frontend (React)

* User interface to enter Wikipedia URL

* Displays generated quiz

* Stylish UI with animations

* History page showing previously generated quizzes

* Click to open any quiz

---

# 📁 Project Structure

```text
ai-quiz-generator/
├── backend/
│   ├── venv/                       # Python Virtual Environment
│   ├── database.py                 # SQLAlchemy setup and Quiz model
│   ├── models.py                   # Pydantic Schemas for LLM output (QuizOutput)
│   ├── scraper.py                  # Functions for fetching and cleaning Wikipedia HTML
│   ├── llm_quiz_generator.py       # LangChain setup, prompt templates, and chain logic
│   ├── main.py                     # FastAPI application and API endpoints
│   ├── requirements.txt            # List of all Python dependencies
│   └── .env                        # API keys and environment variables
|
├── frontend/
│   ├── src/
│   │   ├── components/             # Reusable UI parts (e.g., QuizCard, TabButton, Modal)
│   │   │   ├── QuizDisplay.jsx     # Reusable component for rendering generated quiz data
│   │   │   └── HistoryTable.jsx
│   │   ├── services/
│   │   │   └── api.js              # Functions for communicating with the FastAPI backend
│   │   ├── tabs/
│   │   │   ├── GenerateQuizTab.jsx
│   │   │   └── HistoryTab.jsx
│   │   ├── App.jsx                 # Main React component, handles tab switching
│   │   └── index.css               # Tailwind directives and custom styles
│   ├── package.json
|
└── README.md                       # Project Setup, Endpoints, and Testing Instructions
```

---

# 🛠️ Tech Stack

**Backend**

* FastAPI

* LangChain

* Gemini AI or OpenAI

* PostgreSQL

* SQLAlchemy

* BeautifulSoup4

**Frontend**

* React + Vite

* Tailwind CSS

* Axios

---

# 🗄️ Database Setup (PostgreSQL)

**1. Create a database**

```bash
psql -U postgres
CREATE DATABASE quizzesdb;
```

**2. Add your DB URL into ```.env```**

```bash
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/quizzesdb
GEMINI_API_KEY=your_api_key_here
```

**3. FastAPI auto-creates the table from database.py**

No manual migration needed.

---

# ▶️ Run the Backend

**1. Create virtual environment**

```bash
python -m venv venv
```

**2. Activate it**

For Windows
```bash
venv\Scripts\activate
```

**3. Install dependencies**
```bash
pip install -r requirements.txt
```

**4. Start FastAPI server**
```bash
uvicorn main:app --reload
```

API will run at:

http://127.0.0.1:8000

---

# 🌐 Run the Frontend

**1. Install packages**
```bash
npm install
```

**2. Start React dev server**
```bash
npm run dev
```

Frontend runs at:

http://localhost:5173


---

# 📡 API Endpoints

**1. Generate Quiz**

POST ```/generate_quiz```

**Request**:

```bash
{
  "url": "https://en.wikipedia.org/wiki/Artificial_intelligence"
}
```

**Response**:
```bash
{
  "id": 1,
  "title": "...",
  "quiz": [...],
  "summary": "...",
  ...
}
```

**2. Get History**

GET ```/history```

**3. Get Quiz By ID**

GET ```/quiz/{id}```

---

# 🧪 Testing

You can test API using:

* Postman

* Thunder Client

* FastAPI Swagger Docs:

http://127.0.0.1:8000/docs

---

# 📝 Notes

* Quiz count varies based on LLM output — this is normal.
  
* Database resets only if you delete the db or change DB name.

