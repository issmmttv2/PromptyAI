#!/bin/bash

# PromptyAI Setup Verification Script

echo "╔═══════════════════════════════════════╗"
echo "║   PromptyAI Setup Verification Tool   ║"
echo "╚═══════════════════════════════════════╝"
echo ""

ERRORS=0
WARNINGS=0

# Function to check if a file exists
check_file() {
    if [ -f "$1" ]; then
        echo "✅ $1"
    else
        echo "❌ $1 (missing)"
        ((ERRORS++))
    fi
}

# Function to check if a directory exists
check_dir() {
    if [ -d "$1" ]; then
        echo "✅ $1/"
    else
        echo "❌ $1/ (missing)"
        ((ERRORS++))
    fi
}

# Function to check if a command exists
check_command() {
    if command -v "$1" &> /dev/null; then
        VERSION=$($2 2>&1 || echo "unknown")
        echo "✅ $1 - $VERSION"
    else
        echo "⚠️  $1 (not installed)"
        ((WARNINGS++))
    fi
}

echo "📋 Checking Project Structure..."
echo ""

# Backend files
echo "Backend Files:"
check_file "codes/backend/main.py"
check_file "codes/backend/run.py"
check_file "codes/backend/requirements.txt"
check_file "codes/backend/.env.example"
check_file "codes/backend/Dockerfile"
check_file "codes/backend/README.md"
echo ""

# Frontend files
echo "Frontend Files:"
check_file "codes/frontend/promptyai-frontend/package.json"
check_file "codes/frontend/promptyai-frontend/vite.config.js"
check_file "codes/frontend/promptyai-frontend/tailwind.config.js"
check_file "codes/frontend/promptyai-frontend/postcss.config.js"
check_file "codes/frontend/promptyai-frontend/.env.example"
check_file "codes/frontend/promptyai-frontend/Dockerfile"
check_file "codes/frontend/promptyai-frontend/src/App.jsx"
check_file "codes/frontend/promptyai-frontend/src/index.css"
check_file "codes/frontend/promptyai-frontend/README.md"
echo ""

# Root files
echo "Root Files:"
check_file "README.md"
check_file "LICENSE"
check_file "CONTRIBUTING.md"
check_file ".gitignore"
check_file ".env.example"
check_file "docker-compose.yml"
check_file "start-backend.sh"
check_file "start-frontend.sh"
echo ""

echo "🔧 Checking System Requirements..."
echo ""

check_command "python3" "python3 --version"
check_command "node" "node --version"
check_command "npm" "npm --version"
check_command "pnpm" "pnpm --version"
check_command "mongod" "mongod --version | head -n 1"
check_command "docker" "docker --version"
check_command "git" "git --version"
echo ""

echo "🔍 Checking Environment Variables..."
echo ""

# Check backend .env
if [ -f "codes/backend/.env" ]; then
    echo "✅ Backend .env file exists"
    if grep -q "OPENAI_API_KEY=your_openai_api_key_here" codes/backend/.env; then
        echo "⚠️  OpenAI API key not configured (using default)"
        ((WARNINGS++))
    fi
else
    echo "⚠️  Backend .env file not found (will use defaults)"
    ((WARNINGS++))
fi

# Check frontend .env
if [ -f "codes/frontend/promptyai-frontend/.env" ]; then
    echo "✅ Frontend .env file exists"
else
    echo "⚠️  Frontend .env file not found (will use defaults)"
    ((WARNINGS++))
fi
echo ""

echo "📊 Checking Dependencies..."
echo ""

# Check backend venv
if [ -d "codes/backend/venv" ]; then
    echo "✅ Backend virtual environment exists"
else
    echo "⚠️  Backend virtual environment not created yet"
    echo "   Run: cd codes/backend && python3 -m venv venv"
    ((WARNINGS++))
fi

# Check frontend node_modules
if [ -d "codes/frontend/promptyai-frontend/node_modules" ]; then
    echo "✅ Frontend dependencies installed"
else
    echo "⚠️  Frontend dependencies not installed yet"
    echo "   Run: cd codes/frontend/promptyai-frontend && pnpm install"
    ((WARNINGS++))
fi
echo ""

echo "╔═══════════════════════════════════════╗"
echo "║          Verification Summary         ║"
echo "╚═══════════════════════════════════════╝"
echo ""

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo "🎉 Perfect! All checks passed!"
    echo ""
    echo "You're ready to start PromptyAI!"
    echo ""
    echo "Quick Start:"
    echo "1. Configure environment: Edit .env files"
    echo "2. Install dependencies:"
    echo "   Backend:  cd codes/backend && python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt"
    echo "   Frontend: cd codes/frontend/promptyai-frontend && pnpm install"
    echo "3. Start servers:"
    echo "   ./start-backend.sh  (in one terminal)"
    echo "   ./start-frontend.sh (in another terminal)"
elif [ $ERRORS -eq 0 ]; then
    echo "✅ All required files present"
    echo "⚠️  $WARNINGS warning(s) - see above for details"
    echo ""
    echo "You can proceed with setup, but address the warnings for full functionality."
else
    echo "❌ $ERRORS error(s) found"
    echo "⚠️  $WARNINGS warning(s) found"
    echo ""
    echo "Please fix the errors before proceeding."
fi

echo ""
exit $ERRORS
