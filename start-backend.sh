#!/bin/bash

# PromptyAI Backend Start Script

set -e

echo "╔═══════════════════════════════════════╗"
echo "║    PromptyAI Backend Server Start     ║"
echo "╚═══════════════════════════════════════╝"
echo ""

cd codes/backend

# Activate virtual environment
if [ -d "venv" ]; then
    echo "📦 Activating virtual environment..."
    source venv/bin/activate
else
    echo "⚠️  Virtual environment not found!"
    echo "Please run: python3 -m venv venv"
    echo "Then install dependencies: pip install -r requirements.txt"
    exit 1
fi

# Check for .env file
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found. Creating from example..."
    cp .env.example .env
    echo "⚠️  Please edit codes/backend/.env and add your OpenAI API key"
    echo ""
fi

echo "🚀 Starting PromptyAI Backend..."
echo ""
echo "📍 Server: http://localhost:8000"
echo "📚 API Docs: http://localhost:8000/docs"
echo "📊 ReDoc: http://localhost:8000/redoc"
echo ""
echo "Press Ctrl+C to stop"
echo ""

# Start the server
python run.py
