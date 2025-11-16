from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from scraper import scrape_wikipedia
from llm_quiz_generator import generate_quiz
from database import SessionLocal, Quiz, init_db
import json

app = FastAPI()

init_db()

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/generate_quiz")
def generate_quiz_api(payload: dict):
    url = payload.get("url")
    if not url:
        raise HTTPException(status_code=400, detail="URL is required")

    # Scrape Wikipedia page
    title, text = scrape_wikipedia(url)

    # Generate quiz (ONLY 3 arguments!)
    quiz_data = generate_quiz(text, url, title)

    db = SessionLocal()
    record = Quiz(
        url=url,
        title=quiz_data["title"],
        scraped_content=text,
        full_quiz_data=json.dumps(quiz_data)
    )
    db.add(record)
    db.commit()
    db.refresh(record)

    return quiz_data | {"id": record.id}


@app.get("/history")
def get_history():
    db = SessionLocal()
    rows = db.query(Quiz).all()
    return [
        {
            "id": r.id,
            "url": r.url,
            "title": r.title,
            "date_generated": r.date_generated
        }
        for r in rows
    ]


@app.get("/quiz/{quiz_id}")
def get_quiz(quiz_id: int):
    db = SessionLocal()
    row = db.query(Quiz).filter(Quiz.id == quiz_id).first()

    if not row:
        raise HTTPException(status_code=404, detail="Quiz not found")

    return json.loads(row.full_quiz_data)
