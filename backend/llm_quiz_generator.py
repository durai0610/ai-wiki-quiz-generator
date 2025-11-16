import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from models import QuizOutput

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Initialize the Gemini model
model = ChatGoogleGenerativeAI(
    model="gemini-2.0-flash",              
    api_key=GEMINI_API_KEY,
    temperature=0.3,                      
)

def generate_quiz(article_text: str, url: str, title: str):
    """
    Generate a structured quiz JSON using LangChain + Gemini.
    """

    # Strict JSON format enforced by Pydantic
    parser = JsonOutputParser(pydantic_object=QuizOutput)

    # ----------------------------
    # Prompt Template
    # ----------------------------
    prompt_template = PromptTemplate(
        template="""
You are a professional quiz generator.

Your task is to read a Wikipedia article and generate a structured quiz strictly in **valid JSON format**.

Follow all rules exactly:

============================
    ARTICLE INFORMATION
============================
Title: {title}
URL: {url}

============================
      ARTICLE CONTENT
============================
{article_text}

============================
    REQUIRED OUTPUT FORMAT
============================

You MUST return JSON in this exact structure:

{json_schema}

============================
       GENERATION RULES
============================

1. All facts MUST be based ONLY on the provided article text.
2. No hallucinations — if an entity/fact is missing, omit it or keep empty.
3. Questions should be diverse and cover multiple sections of the article.
4. Generate **5 to 10** quiz questions.
5. Each question MUST have:
    - question
    - 4 options (A-D)
    - correct answer
    - short explanation
    - difficulty: easy / medium / hard
6. related_topics should contain 3–8 Wikipedia topics.
7. summary must be 2–4 sentences.
8. key_entities must include:
    - people
    - organizations
    - locations
9. sections should be extracted/collapsed from headings in article text.

Return ONLY valid JSON. No markdown. No comments. No extra text.
""",
        input_variables=["title", "url", "article_text"],
        partial_variables={
            "json_schema": parser.get_format_instructions()
        }
    )

    # Create the chain
    chain = prompt_template | model | parser

    # Run inference
    result = chain.invoke({
        "title": title,
        "url": url,
        "article_text": article_text
    })

    return result
