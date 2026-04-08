@echo off
echo =========================================
echo KAMAND PROMPT DEVCELL - STARTUP SEQUENCE
echo =========================================

echo.
echo [1/2] Spinning up Python Admin Database Server...
start "FastApi Admin Server" cmd /k "cd admin-backend && run_backend.bat"

echo [2/2] Spinning up Next.js Website Server...
start "Next.js Website Server" cmd /k "cd kp-dev-website && npm run dev"

echo.
echo System boot initialized! 
echo Two terminal windows have opened. Please do not close them while working.
echo.
pause
