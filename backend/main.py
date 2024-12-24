# from fastapi import FastAPI, WebSocket
# import openai
# import os
# from dotenv import load_dotenv

# app = FastAPI()

# @app.get("/")
# async def read_foot():
#     return{"message": "Hello, World!"}

import asyncio
import json
import os
from dotenv import load_dotenv
from fastapi import FastAPI, Request, WebSocket, WebSocketDisconnect
from fastapi.responses import JSONResponse, PlainTextResponse
from fastapi.websockets import WebSocketState
from llm import LlmDummyMock

app = FastAPI()

@app.websocket("/llm-websocket/{call_id}")
async def websocket_handler(websocket: WebSocket, call_id: str):
    await websocket.accept()
    # A unique call id is the identifier of each call
    print(f"Handle llm ws for: {call_id}")

    llm_client = LlmDummyMock
    response_id = 0
    first_event = llm_client.draft_response() # type: ignore
    await websocket.send_text(json.dumps(first_event))

    async def stream_response(request):
        nonlocal response_id
        for event in llm_client.draft_response(request):
            await websocket.send_text(json.dumps(event))
            if request['response_id'] < response_id:
                return

    # listen for new updates
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

