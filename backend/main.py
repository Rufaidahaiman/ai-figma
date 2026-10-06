from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
import os
from groq import Groq

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

app = FastAPI()

class PromptRequest(BaseModel):
    prompt: str

class UIElement(BaseModel):
    id: str
    type: str  
    x: int
    y: int  
    width: int
    height: int
    text: str 
    color: str
    action: str | None = None
    fontSize: int
    fontWeight: str

class Design(BaseModel):
    elements: list[UIElement]

@app.get("/")
def home():
    return {"message": "AI Figma Studio is alive 🚀"}


@app.post("/prompt")
def receive_prompt(request: PromptRequest):
    response = client.chat.completions.create(
        model="openai/gpt-oss-20b",
        messages=[
    {
        "role": "system",
        "content": """
You are a UI/UX design assistant.

Convert the user's design request into a JSON object.

The JSON must contain these fields:
type, x, y, width, height, text, color, action, fontSize, fontWeight.

Return ONLY valid JSON.
Do not explain anything.
"""
    },
    {
        "role": "user",
        "content": request.prompt
    }
]
        
    )

    return {
        "response": response.choices[0].message.content
    }
@app.post("/design")
def create_design(design: Design):
    return {
        "message": "Design received!",
        "design": design
    }