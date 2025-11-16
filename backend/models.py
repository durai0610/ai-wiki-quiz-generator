from pydantic import BaseModel
from typing import List, Dict

class QuizItem(BaseModel):
    question: str
    options: List[str]
    answer: str
    difficulty: str
    explanation: str

class QuizOutput(BaseModel):
    url: str
    title: str
    summary: str
    key_entities: Dict[str, List[str]]
    sections: List[str]
    quiz: List[QuizItem]
    related_topics: List[str]
