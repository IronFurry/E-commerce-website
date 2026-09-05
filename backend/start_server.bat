@echo off
title NEXORA Backend Server
color 0A

echo ============================================
echo   NEXORA Backend + Cloudflare Tunnel
echo ============================================
echo.

:: Check Python
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python not found. Install from python.org
    pause
    exit /b 1
)

:: Check cloudflared - install if missing
cloudflared --version >nul 2>&1
if errorlevel 1 (
    echo [INFO] cloudflared not found. Downloading...
    curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe -o cloudflared.exe
    echo [OK] cloudflared downloaded.
    set CF_CMD=cloudflared.exe
) else (
    set CF_CMD=cloudflared
)

:: Install Python deps
echo [INFO] Checking Python dependencies...
python -m pip install -r requirements.txt -q

:: Start FastAPI in background
echo.
echo [STARTING] FastAPI backend on port 9000...
start "NEXORA-API" cmd /k "python -m uvicorn app.main:app --host 0.0.0.0 --port 9000 --reload"

:: Wait for it to be ready
echo [WAIT] Waiting for backend to start...
timeout /t 4 /nobreak >nul

:: Open Cloudflare Tunnel
echo.
echo [TUNNEL] Opening Cloudflare Tunnel...
echo         Copy the https://... URL below and set it in Vercel:
echo         VITE_API_URL = ^<that URL^>
echo.
echo ============================================

%CF_CMD% tunnel --url http://localhost:9000

pause
