# Service Phone Agent

This repository contains a full-stack application designed to provide a phone agent service using AI. The project is organized into two main parts: a Python backend and a Next.js/React frontend.

## Features
- AI-powered phone agent logic (backend)
- Modern web interface (frontend)
- TypeScript, Tailwind CSS, and Next.js for frontend development
- Python backend for LLM and custom logic

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
2. Install required Python packages (create a `requirements.txt` if needed):
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

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the terms of the LICENSE file in this repository.

