# Service Phone Agent

## Overview
Service Phone Agent is a full-stack web application that provides an AI-powered phone agent system. It features a Python backend and a modern Next.js frontend, enabling web calls and voice/audio processing through integration with RetellAI.

## Features
- AI-driven phone agent logic (backend)
- Web call integration with external APIs
- Modern React/Next.js frontend
- CORS support for seamless frontend-backend communication
- RetellAI API integration for voice and audio

## Technologies Used
- **Backend**: Python (FastAPI or custom server)
- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **API Integration**: RetellAI

## Project Structure
```
service-phone-agent/
├── backend/         # Python backend (LLM, API, custom types)
│   ├── custom_types.py
│   ├── llm.py
│   ├── main.py
│   └── __pycache__/
├── frontend/        # Next.js frontend
│   ├── src/
│   │   ├── app/
│   │   └── components/
│   ├── public/
│   ├── package.json
│   ├── tailwind.config.ts
│   └── ...
├── LICENSE
└── README.md
```

## Getting Started

### Backend (Python)
1. Navigate to the `backend` directory:
   ```powershell
   cd backend
   ```
2. Install required Python packages:
   ```powershell
   pip install -r requirements.txt
   ```
3. Run the backend server:
   ```powershell
   python main.py
   ```

### Frontend (Next.js)
1. Navigate to the `frontend` directory:
   ```powershell
   cd frontend
   ```
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Start the development server:
   ```powershell
   npm run dev
   ```

## Usage
- Access the frontend at `http://localhost:3000` after starting the Next.js server.
- The backend should be running to handle API requests from the frontend.

## RetellAI Integration
- Follow the RetellAI documentation to connect your agent:
  https://docs.retellai.com/integrate-llm/setup-websocket-server#step-3-test-your-basic-agent-on-dashboard

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the terms of the LICENSE file in this repository.

