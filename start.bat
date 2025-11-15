@echo off
echo ========================================
echo HOMESTYLÉ Catering Website - Quick Start
echo ========================================
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo Installing dependencies...
    echo.
    call npm install
    echo.
    echo ========================================
    echo Dependencies installed successfully!
    echo ========================================
    echo.
) else (
    echo Dependencies already installed.
    echo.
)

echo Starting development server...
echo.
echo ========================================
echo Server will be available at:
echo http://localhost:3000
echo ========================================
echo.
echo Press Ctrl+C to stop the server
echo.

call npm run dev
