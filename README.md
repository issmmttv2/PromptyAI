# PromptyAI 🧠✨

An intelligent prompt generation system leveraging React, FastAPI, and MongoDB, integrating AI technologies to refine prompt structures dynamically, enhancing contextual relevance and usability for Large Language Models (LLMs).

![PromptyAI Banner](https://img.shields.io/badge/PromptyAI-AI--Powered%20Prompts-blue?style=for-the-badge)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=flat-square&logo=openai&logoColor=white)

## 🌟 Features

- **AI-Powered Enhancement**: Automatically improve prompts using OpenAI's GPT models
- **Intelligent Categorization**: Automatic prompt classification using NLP techniques
- **Style Optimization**: Multiple writing styles (professional, casual, academic, creative, etc.)
- **Real-time Processing**: Fast prompt generation and refinement
- **Prompt Library**: Store, search, and manage generated prompts
- **Shareable URLs**: Share enhanced prompts with others
- **Analytics Dashboard**: Track usage statistics and category distribution
- **Responsive Design**: Modern React frontend with Tailwind CSS
- **RESTful API**: Scalable FastAPI backend with comprehensive endpoints

## 🛠 Technology Stack

### Backend
- **FastAPI**: Modern, fast web framework for building APIs
- **MongoDB**: NoSQL database for storing prompts and metadata
- **OpenAI API**: GPT models for prompt enhancement
- **spaCy**: Advanced NLP for text processing and entity recognition
- **NLTK**: Natural language processing toolkit
- **Transformers**: Hugging Face models for sentiment analysis

### Frontend
- **React**: Modern JavaScript library for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality React components
- **Framer Motion**: Smooth animations and transitions
- **Lucide Icons**: Beautiful icon library

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.9+**
- **Node.js 18+** and **pnpm** (or npm/yarn)
- **MongoDB** (local installation or MongoDB Atlas account)
- **OpenAI API Key** (get one at https://platform.openai.com)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd promptyai
```

### 2. Backend Setup

```bash
cd codes/backend

# Create a virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Download spaCy English model
python -m spacy download en_core_web_sm

# Create .env file from example
cp .env.example .env

# Edit .env and add your credentials
# MONGODB_URL=mongodb://localhost:27017
# OPENAI_API_KEY=your_openai_api_key_here
```

### 3. Frontend Setup

```bash
cd codes/frontend/promptyai-frontend

# Install dependencies
pnpm install
# or: npm install

# Create .env file from example
cp .env.example .env

# The default configuration should work if backend runs on localhost:8000
```

### 4. Start MongoDB

```bash
# If using local MongoDB
mongod

# Or use Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Or use MongoDB Atlas (cloud) - just update MONGODB_URL in backend .env
```

### 5. Run the Application

**Terminal 1 - Backend:**
```bash
cd codes/backend
python run.py
# Or: uvicorn main:app --reload
```

**Terminal 2 - Frontend:**
```bash
cd codes/frontend/promptyai-frontend
pnpm dev
# Or: npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 🔧 Configuration

### Backend Environment Variables (.env)

```bash
# MongoDB Connection
MONGODB_URL=mongodb://localhost:27017

# OpenAI API Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Server Configuration
HOST=0.0.0.0
PORT=8000
```

### Frontend Environment Variables (.env)

```bash
# Backend API URL
VITE_API_BASE_URL=http://localhost:8000

# App Configuration
VITE_APP_NAME=PromptyAI
VITE_APP_DESCRIPTION=AI-Powered Prompt Generator for LLMs
```

## 📚 API Endpoints

### Prompt Management

- `POST /generate` - Generate and enhance a prompt
- `GET /prompts` - Get list of prompts (with optional filters)
- `GET /prompts/{prompt_id}` - Get specific prompt by ID
- `PUT /prompts/{prompt_id}` - Update a prompt
- `DELETE /prompts/{prompt_id}` - Delete a prompt

### Utilities

- `GET /categories` - Get available categories
- `GET /styles` - Get available writing styles
- `GET /stats` - Get system statistics
- `GET /share/{prompt_id}` - Get shareable prompt

### Interactive API Documentation

Visit http://localhost:8000/docs for interactive Swagger UI documentation.

## 🎨 Features in Detail

### 1. Prompt Enhancement

The AI analyzes your input and enhances it based on:
- Selected writing style (professional, casual, academic, creative, technical, friendly)
- Complexity level (simple, medium, complex)
- Automatic or manual category selection
- Context and intent preservation

### 2. Intelligent Categorization

Prompts are automatically categorized into:
- **Creative**: Story writing, art, imagination
- **Technical**: Code, programming, algorithms
- **Business**: Marketing, strategy, analysis
- **Educational**: Teaching, tutorials, explanations
- **Conversational**: Chat, discussions
- **Analytical**: Comparisons, evaluations

### 3. NLP Features

- **Keyword Extraction**: Uses NLTK and spaCy for intelligent keyword identification
- **Sentiment Analysis**: Powered by Hugging Face Transformers
- **Entity Recognition**: Identifies important entities in your prompts
- **Text Processing**: Advanced tokenization and text analysis

### 4. Analytics Dashboard

Track your prompt generation with:
- Total prompts created
- Category distribution
- Style usage statistics
- Trend analysis

## 🐳 Docker Deployment (Optional)

Create a `docker-compose.yml` in the root directory:

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

  backend:
    build: ./codes/backend
    ports:
      - "8000:8000"
    environment:
      - MONGODB_URL=mongodb://mongodb:27017
      - OPENAI_API_KEY=${OPENAI_API_KEY}
    depends_on:
      - mongodb

  frontend:
    build: ./codes/frontend/promptyai-frontend
    ports:
      - "5173:5173"
    environment:
      - VITE_API_BASE_URL=http://localhost:8000

volumes:
  mongodb_data:
```

Then run:
```bash
docker-compose up
```

## 🧪 Testing

### Backend Tests
```bash
cd codes/backend
pytest tests/
```

### Frontend Tests
```bash
cd codes/frontend/promptyai-frontend
pnpm test
```

## 📈 Usage Examples

### Example 1: Creative Writing Prompt

**Input:**
```
Write a story about space
```

**Enhanced Output:**
```
Craft an imaginative and engaging science fiction narrative set in the vast expanse of space. 
Include vivid descriptions of celestial phenomena, compelling characters facing unique challenges 
in zero gravity, and explore themes of human adaptation and discovery in the cosmos. Consider 
incorporating elements of wonder, isolation, or adventure to create a captivating tale that 
transports readers beyond Earth's atmosphere.
```

### Example 2: Technical Prompt

**Input:**
```
Debug my Python code
```

**Enhanced Output:**
```
Please provide a systematic debugging analysis of the Python code. Include:
1. Identification of syntax errors, runtime errors, and logical bugs
2. Step-by-step explanation of the debugging process
3. Recommended fixes with code examples
4. Best practices to prevent similar issues in the future
5. Performance optimization suggestions if applicable
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- OpenAI for GPT models
- Hugging Face for Transformers
- spaCy team for NLP capabilities
- shadcn/ui for beautiful React components
- FastAPI and React communities

## 📞 Support

For questions or issues, please:
- Open an issue on GitHub
- Check the API documentation at http://localhost:8000/docs
- Review existing issues and discussions

## 🗺 Roadmap

- [ ] User authentication and authorization
- [ ] Prompt versioning and history
- [ ] Collaborative prompt editing
- [ ] Export prompts to various formats
- [ ] Browser extension
- [ ] Mobile app
- [ ] Advanced analytics and insights
- [ ] Prompt templates library
- [ ] Multi-language support
- [ ] Integration with popular LLM platforms

---

Built with ❤️ using FastAPI, React, and AI
