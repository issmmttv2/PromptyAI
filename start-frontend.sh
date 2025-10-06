#!/bin/bash

# PromptyAI Frontend Start Script

set -e

echo "╔═══════════════════════════════════════╗"
echo "║    PromptyAI Frontend Server Start    ║"
echo "╚═══════════════════════════════════════╝"
echo ""

cd codes/frontend/promptyai-frontend

# Check for .env file
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found. Creating from example..."
    cp .env.example .env
fi

# Check for node_modules
if [ ! -d "node_modules" ]; then
    echo "⚠️  node_modules not found!"
    echo "Installing dependencies..."
    if command -v pnpm &> /dev/null; then
        pnpm install
    else
        npm install
    fi
fi

echo "🚀 Starting PromptyAI Frontend..."
echo ""
echo "📍 Frontend: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop"
echo ""

# Start the server
if command -v pnpm &> /dev/null; then
    pnpm dev
else
    npm run dev
fi
