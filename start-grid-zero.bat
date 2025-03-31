@echo off
echo 🔥 Starting GRID ZERO...

REM --- Navigate to backend and start FastAPI
cd /d %~dp0\grid-zero-backend

REM --- Activate virtual environment
if exist venv\Scripts\activate (
    call venv\Scripts\activate
) else (
    echo ⚠️ Virtual environment not found. Make sure to set it up using `python -m venv venv`
    pause
    exit /b
)

REM --- Start FastAPI backend in a new terminal window
start "FastAPI Backend" cmd /k "uvicorn main:app --host 127.0.0.1 --port 8000"

REM --- Navigate to frontend and start Next.js
cd ..\grid-zero-frontend
start "Grid Zero UI" cmd /k "npm run dev"

REM --- Open in browser
start http://localhost:3000

echo ✅ Grid Zero is now live on http://localhost:3000
