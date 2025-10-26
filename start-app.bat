@echo off
echo ========================================
echo  Personal Finance Tracker - Quick Start
echo ========================================
echo.

echo [1/3] Starting MongoDB...
net start MongoDB 2>nul
if %ERRORLEVEL% EQU 0 (
    echo      MongoDB started successfully!
) else (
    echo      MongoDB is already running or failed to start
)
echo.

echo [2/3] Initializing Database...
cd backend
call node initDatabase.js
cd ..
echo.

echo [3/3] Starting Servers...
echo.
echo Opening Backend Server (Port 5000)...
start "Finance Tracker Backend" cmd /k "cd backend && npm run dev"
timeout /t 5 /nobreak > nul

echo Opening Frontend Server (Port 3000)...  
start "Finance Tracker Frontend" cmd /k "cd frontend && npm run dev"
timeout /t 3 /nobreak > nul

echo.
echo ========================================
echo  Servers Started Successfully!
echo ========================================
echo.
echo  Backend:  http://localhost:5000
echo  Frontend: http://localhost:3000
echo.
echo Press any key to open the app in your browser...
pause > nul

start http://localhost:3000

echo.
echo App is running! Close this window when done.
