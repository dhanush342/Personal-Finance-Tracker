@echo off
REM Quick start script for Finance Tracker on Windows

echo 🚀 Finance Tracker - Quick Start
echo =================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install it from https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✓ Node.js found: %NODE_VERSION%
echo.

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)
echo ✓ Frontend dependencies installed
echo.

REM Install backend dependencies
echo 📦 Installing backend dependencies...
cd backend
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to install backend dependencies
    pause
    exit /b 1
)
echo ✓ Backend dependencies installed
cd ..
echo.

echo =================================
echo ✅ Installation Complete!
echo =================================
echo.
echo 📝 Next Steps:
echo.
echo 1. Setup MongoDB:
echo    - Download from: https://www.mongodb.com/try/download/community
echo    - OR use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas
echo.
echo 2. Configure backend:
echo    - Edit backend\.env with your MongoDB URI
echo.
echo 3. Start the backend (PowerShell Terminal 1):
echo    cd backend
echo    npm run dev
echo.
echo 4. Start the frontend (PowerShell Terminal 2):
echo    npm run dev
echo.
echo 5. Open browser:
echo    Frontend: http://localhost:3000
echo    Backend API: http://localhost:5000/api
echo.
echo 6. Initialize categories:
echo    Invoke-WebRequest -Uri http://localhost:5000/api/categories/init/defaults -Method POST
echo.
echo Happy tracking! 💰
echo.
pause
