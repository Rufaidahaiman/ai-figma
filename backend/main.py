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


@app.get("/")
def home():
    return {"message": "AI Figma Studio is alive 🚀"}


@app.post("/prompt")
def receive_prompt(request: PromptRequest):
    response = client.chat.completions.create(
        model="openai/gpt-oss-20b",
        messages=[
            {
                "role": "user",
                "content": request.prompt
            }
        ]
    )

    return {
        "response": response.choices[0].message.content
    }