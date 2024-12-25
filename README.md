# Color Bar Phone Agent

## Overview
Color Bar Phone Agent is a web-based application built with **FastAPI** for the backend and **Next.js** for the frontend. This application serves as a phone agent system that facilitates web calls and integrates with **RetellAI** for voice and audio processing.

## Features
- **Web Call Integration**: Facilitates creating web calls with external API integration.
- **CORS Support**: Handles cross-origin requests to allow frontend and backend interaction.
- **API Communication**: Communicates with the RetellAI API for web call creation.

## Technologies Used
- **Backend**: FastAPI
- **Frontend**: Next.js
- **API Integration**: RetellAI API
- **HTTP Requests**: HTTPx (for API calls)
- **CORS Middleware**: FastAPI CORS middleware

## Installation

### Prerequisites
Make sure you have the following installed:
- **Python 3.8+**
- **Node.js** (for frontend)
- **npm** or **yarn** (for package management)

### Backend Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/color-bar-phone-agent.git
   cd color-bar-phone-agent/backend
2. Create a virtual environment:
   ```bash
   python -m venv .venv
3. Activate the virtual environment:
   ```bash
   .venv\Scripts\activate
4. Install the backend dependencies:
   ```bash
   pip install -r requirements.txt
5. Create a .env file in the backend directory to store sensitive environment variables. This file will hold your API keys and agent ID.
   ```bash
   uvicorn main:app --reload
6. Run the backend server:
   ```bash
   OPENAI_API_KEY="your_openai_api_key"
   RETELL_API_KEY="your_retell_api_key"
   RETELL_AGENT_ID="your_retell_agent_id"


### Frontend Installation
1. Change to the frontend directory:
   ```bash
   cd ../frontend
2. Install frontend dependencies:
   ```bash
    npm install
3. Run the frontend server:
   ```bash
   npm run dev

### Connecting your agent on Retell Dashboard
1. Please read this documentation from Retell AI
   -https://docs.retellai.com/integrate-llm/setup-websocket-server#step-3-test-your-basic-agent-on-dashboard

