import asyncio
import json
import os
from dotenv import load_dotenv
from fastapi import FastAPI, Request, WebSocket, WebSocketDisconnect, requests,HTTPException
from fastapi.responses import JSONResponse, PlainTextResponse
from fastapi.websockets import WebSocketState
import httpx
from pydantic import BaseModel
from llm import LlmClient
from retell import Retell # type: ignore
# from custom_types import (
#     ConfigResponse,
# )
from fastapi.middleware.cors import CORSMiddleware

load_dotenv(override=True)

app = FastAPI()

# app.include_router(calls.router, prefix="/api/v1")

# retell = Retell(api_key=os.environ["RETELL_API_KEY"])
retell_agent_id = os.environ.get("RETELL_AGENT_ID")
openai_api_key = os.environ.get("OPENAI_API_KEY")
retell = os.environ.get("RETELL_API_KEY")

origins = [
    "http://localhost:3000",
    "https://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://api.retellai.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CreateWebCallRequest(BaseModel):
    agent_id: str
    # metadata: dict = None
    # retell_llm_dynamic_variables: dict = None


@app.websocket("/llm-websocket/{call_id}")
async def websocket_handler(websocket: WebSocket, call_id: str):
    await websocket.accept()
    print(f"Handle llm ws for: {call_id}")
    
    llm_client = LlmClient()

    # send first message to signal ready of server
    response_id = 0
    first_event = llm_client.draft_begin_messsage()
    await websocket.send_text(json.dumps(first_event))

    active_responses = {}

    async def stream_response(request):
        nonlocal response_id

        if request['response_id'] in active_responses:
            active_responses[request['response_id']].cancel()
            
        for event in llm_client.draft_response(request):
            await websocket.send_text(json.dumps(event))
            if request['response_id'] < response_id:
                return # new response needed, abondon this one
    try:
        while True:
            message = await websocket.receive_text()
            request = json.loads(message)
            # print out transcript
            os.system('cls' if os.name == 'nt' else 'clear')
            print(json.dumps(request, indent=4))
            
            if 'response_id' not in request:
                continue # no response needed, process live transcript update if needed
            response_id = request['response_id']
            asyncio.create_task(stream_response(request))
    except WebSocketDisconnect:
        print(f"LLM WebSocket disconnected for {call_id}")
    except Exception as e:
        print(f'LLM WebSocket error for {call_id}: {e}')
    finally:
        print(f"LLM WebSocket connection closed for {call_id}")

@app.post("/create-web-call")
async def create_web_call(request: CreateWebCallRequest):
    print(f"Received request: {request}")
    RETELL_API_KEY = retell

    payload = {
        "agent_id": request.agent_id
    }

    print(f"Payload: {payload}")
    print(f"RETELL_API_KEY: {RETELL_API_KEY}")

    headers = {
        "Authorization": f"Bearer {RETELL_API_KEY}",
        "Content-Type": "application/json"
    }

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://api.retellai.com/v2/create-web-call",
                json=payload,
                headers=headers
            )
        response.raise_for_status()

        return response.json()
    
    except httpx.RequestError as e:
        print(f"Request error: {e}")
        raise HTTPException(status_code=400, detail=str(e))
    except httpx.HTTPStatusError as e:
        print(f"HTTP error: {e.response.json()}")
        raise HTTPException(status_code=e.response.status_code, detail=str(e))