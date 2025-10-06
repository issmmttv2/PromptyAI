# PromptyAI Quick Start Guide

Get PromptyAI up and running in 5 minutes!

## Prerequisites

- Python 3.9+ installed
- Node.js 18+ installed
- pnpm installed (or npm)
- MongoDB installed or access to MongoDB Atlas

## Step 1: Clone and Verify

```bash
# Navigate to project directory
cd /workspace

# Run verification script
./verify-setup.sh
```

## Step 2: Configure Environment

### Backend Configuration

```bash
# Create backend .env file
cd codes/backend
cp .env.example .env

# Edit .env and add your OpenAI API key
# MONGODB_URL=mongodb://localhost:27017
# OPENAI_API_KEY=your_actual_api_key_here
```

### Frontend Configuration

```bash
# Create frontend .env file
cd codes/frontend/promptyai-frontend
cp .env.example .env

# Default configuration should work for local development
# VITE_API_BASE_URL=http://localhost:8000
```

## Step 3: Install Dependencies

### Backend

```bash
cd codes/backend

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Download spaCy model
python -m spacy download en_core_web_sm
```

### Frontend

```bash
cd codes/frontend/promptyai-frontend

# Install dependencies
pnpm install
# or: npm install
```

## Step 4: Start MongoDB

### Option 1: Local MongoDB

```bash
# Start MongoDB service
mongod

# Or on Linux with systemd:
sudo systemctl start mongod

# Or on macOS with Homebrew:
brew services start mongodb-community
```

### Option 2: Docker

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### Option 3: MongoDB Atlas

- Create a free cluster at https://www.mongodb.com/cloud/atlas
- Get connection string and update `MONGODB_URL` in backend `.env`

## Step 5: Start the Application

### Option A: Using Scripts (Recommended)

**Terminal 1 - Backend:**
```bash
./start-backend.sh
```

**Terminal 2 - Frontend:**
```bash
./start-frontend.sh
```

### Option B: Manual Start

**Terminal 1 - Backend:**
```bash
cd codes/backend
source venv/bin/activate
python run.py
```

**Terminal 2 - Frontend:**
```bash
cd codes/frontend/promptyai-frontend
pnpm dev
```

## Step 6: Access the Application

Open your browser and navigate to:

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## Usage Guide

### 1. Generate Your First Prompt

1. Go to the **Generate** tab
2. Enter your prompt in the text area
3. Select a category (or leave it to auto-detect)
4. Choose a writing style (professional, casual, creative, etc.)
5. Set complexity level
6. Click "Generate Enhanced Prompt"

### 2. View Your Prompts

1. Go to the **Library** tab
2. Search and filter your prompts
3. Copy, share, or delete prompts

### 3. Check Analytics

1. Go to the **Stats** tab
2. View total prompts and category distribution

## Troubleshooting

### Backend won't start

```bash
# Check if port 8000 is available
lsof -i :8000

# Verify MongoDB is running
mongosh --eval "db.runCommand('ping')"

# Check OpenAI API key
echo $OPENAI_API_KEY
```

### Frontend won't start

```bash
# Check if port 5173 is available
lsof -i :5173

# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### MongoDB connection error

```bash
# Test MongoDB connection
mongosh

# Check MongoDB URL in .env
cat codes/backend/.env | grep MONGODB_URL
```

### OpenAI API errors

- Verify your API key is correct
- Check you have credits in your OpenAI account
- Visit https://platform.openai.com/account/api-keys

## Docker Setup (Alternative)

If you prefer Docker:

```bash
# Create root .env file
cp .env.example .env

# Edit .env and add your OpenAI API key
# OPENAI_API_KEY=your_actual_api_key_here

# Start all services
docker-compose up

# Or start in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

## Next Steps

- Read the full [README.md](README.md) for detailed information
- Check out [CONTRIBUTING.md](CONTRIBUTING.md) to contribute
- Explore the API at http://localhost:8000/docs
- Customize the frontend in `codes/frontend/promptyai-frontend/src/App.jsx`
- Add new features to the backend in `codes/backend/main.py`

## Getting Help

- Check the documentation in `codes/backend/README.md` and `codes/frontend/promptyai-frontend/README.md`
- Run `./verify-setup.sh` to diagnose issues
- Create an issue on GitHub for bugs or questions

## Common Use Cases

### Example 1: Creative Writing

**Input:**
```
Write a story about a robot learning to paint
```

**Enhanced Output:**
```
Craft an engaging narrative about an artificial intelligence or robot discovering 
the world of visual arts and painting. Explore themes of creativity, self-expression, 
and the intersection of technology and art. Include vivid descriptions of the robot's 
journey, the challenges it faces in understanding artistic concepts, and the emotional 
growth throughout the learning process.
```

### Example 2: Technical Documentation

**Input:**
```
Explain how to use React hooks
```

**Enhanced Output:**
```
Provide a comprehensive technical explanation of React Hooks, including:
1. What React Hooks are and why they were introduced
2. The most common hooks (useState, useEffect, useContext, etc.)
3. Rules of Hooks and best practices
4. Practical code examples demonstrating each hook
5. Common pitfalls and how to avoid them
6. Performance optimization tips when using hooks
```

## Tips for Better Prompts

1. **Be Specific**: Include relevant details and context
2. **Choose the Right Style**: Match the style to your use case
3. **Use Categories**: Help the AI understand your intent
4. **Iterate**: Refine prompts based on results
5. **Save Good Ones**: Build a library of effective prompts

---

🎉 Congratulations! You're now ready to use PromptyAI!

For more information, visit the [main README](README.md).
