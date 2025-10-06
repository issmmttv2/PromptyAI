#!/bin/bash


set -e

echo "PromptyAI Start"
echo "======================="

if [ ! -f "README.md" ] || [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo "Please run this script from the PromptyAI root directory"
    exit 1
fi

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo "🔍 Checking prerequisites..."

if ! command_exists python3; then
    echo "Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

if ! command_exists node; then
    echo "Node.js is not installed. Please install Node.js 16 or higher."
    exit 1
fi

if ! command_exists npm; then
    echo "npm is not installed. Please install npm."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Check if MongoDB is running
echo "🔍 Checking MongoDB..."
if command_exists mongosh; then
    if mongosh --eval "db.runCommand('ping')" --quiet >/dev/null 2>&1; then
        echo "✅ MongoDB is running"
    else
        echo "⚠️  MongoDB is not running. Please start MongoDB:"
        echo "   Ubuntu/Debian: sudo systemctl start mongod"
        echo "   macOS: brew services start mongodb-community"
        echo "   Docker: docker run -d -p 27017:27017 mongo:latest"
        echo ""
        echo "Press Enter to continue anyway, or Ctrl+C to exit..."
        read
    fi
elif command_exists mongo; then
    if mongo --eval "db.runCommand('ping')" --quiet >/dev/null 2>&1; then
        echo "✅ MongoDB is running"
    else
        echo "⚠️  MongoDB is not running. Please start MongoDB first."
        echo "Press Enter to continue anyway, or Ctrl+C to exit..."
        read
    fi
else
    echo "⚠️  MongoDB client not found. Please install MongoDB."
    echo "Press Enter to continue anyway, or Ctrl+C to exit..."
    read
fi

# Setup backend
echo ""
echo "🔧 Setting up backend..."
cd backend

if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
fi

echo "Activating virtual environment..."
source venv/bin/activate

echo "Installing Python dependencies..."
pip install -r requirements.txt

echo "Running backend setup..."
python setup.py

echo "✅ Backend setup complete"

echo ""
echo "🔧 Setting up frontend..."
cd ../frontend/promptyai-frontend

echo "Installing Node.js dependencies..."
npm install

echo "✅ Frontend setup complete"

echo ""
echo "🔑 Checking OpenAI API key..."
if [ -z "$OPENAI_API_KEY" ]; then
    echo "⚠️  OpenAI API key not found in environment variables."
    echo "   The application will work with limited functionality."
    echo "   To enable AI enhancement, set your OpenAI API key:"
    echo "   export OPENAI_API_KEY='your-api-key-here'"
    echo ""
else
    echo "✅ OpenAI API key found"
fi

echo ""
echo "📝 Creating start scripts..."

cat > ../../start-backend.sh << 'EOF'
#!/bin/bash
cd backend
source venv/bin/activate
echo "🚀 Starting PromptyAI Backend on http://localhost:8000"
echo "📚 API Documentation: http://localhost:8000/docs"
python main.py
EOF

cat > ../../start-frontend.sh << 'EOF'
#!/bin/bash
cd frontend/promptyai-frontend
echo "🚀 Starting PromptyAI Frontend on http://localhost:5173"
npm run dev
EOF

chmod +x ../../start-backend.sh
chmod +x ../../start-frontend.sh

echo "✅ Start scripts created"

echo ""
echo "🎉 Setup Complete!"
echo "=================="
echo ""
echo "To start PromptyAI:"
echo ""
echo "1. Start the backend (in one terminal):"
echo "   ./start-backend.sh"
echo ""
echo "2. Start the frontend (in another terminal):"
echo "   ./start-frontend.sh"
echo ""
echo "3. Open your browser and go to:"
echo "   http://localhost:5173"
echo ""
echo "📚 Documentation:"
echo "   - README.md - Overview and quick start"
echo "   - docs/SETUP.md - Detailed setup guide"
echo "   - docs/API.md - API documentation"
echo "   - docs/DEPLOYMENT.md - Production deployment"
echo ""
echo "🔧 Troubleshooting:"
echo "   - Make sure MongoDB is running"
echo "   - Check that ports 8000 and 5173 are available"
echo "   - Set OPENAI_API_KEY for full functionality"
echo ""
echo "Happy prompting! 🎯"