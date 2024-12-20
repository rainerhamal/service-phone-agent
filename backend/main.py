from fastapi import FastAPI, WebSocket
import openai
import os
from dotenv import load_dotenv

app = FastAPI()

@app.get("/")
async def read_foot():
    return{"message": "Helloo, World!"}