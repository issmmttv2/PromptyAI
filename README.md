# PromptyAI - AI-Powered Prompt Generator

An intelligent prompt generation system leveraging React, FastAPI, and MongoDB, integrating AI technologies to refine prompt structures dynamically, enhancing contextual relevance and usability for Large Language Models (LLMs).

## Features

- **AI-Powered Enhancement**: Automatically improve prompts using OpenAI's GPT models
- **Intelligent Categorization**: Automatic prompt classification using NLP techniques
- **Style Optimization**: Multiple writing styles (professional, casual, academic, creative, etc.)
- **Real-time Processing**: Fast prompt generation and refinement
- **Prompt Library**: Store, search, and manage generated prompts
- **Shareable URLs**: Share enhanced prompts with others
- **Analytics Dashboard**: Track usage statistics and category distribution
- **Responsive Design**: Modern React frontend with Tailwind CSS
- **RESTful API**: Scalable FastAPI backend with comprehensive endpoints

## Technology Stack

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

## Project Structure

```
promptyai/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── requirements.txt     # Python dependencies
│   └── setup.py            # Backend setup script
├── frontend/
│   └── promptyai-frontend/  # React application
│       ├── src/
│       │   ├── App.jsx     # Main React component
│       │   ├── App.css     # Styling
│       │   └── components/ # UI components
│       ├── package.json    # Node.js dependencies
│       └── index.html      # HTML entry point

└── README.md               # This file
```

## Quick Start

### Prerequisites

- Python 3.8+
- Node.js 16+
- MongoDB 4.4+
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone 
   cd promptyai
   ```

2. **Backend Setup**
   ```bash
   cd backend
   pip install -r requirements.txt
   python setup.py
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend/promptyai-frontend
   npm install
   ```

4. **Environment Configuration**
   ```bash
   # Set OpenAI API key (optional)
   export OPENAI_API_KEY="your-openai-api-key"
   ```

5. **Start MongoDB**
   ```bash
   # Ubuntu/Debian
   sudo systemctl start mongod
   
   # macOS with Homebrew
   brew services start mongodb-community
   
   # Docker
   docker run -d -p 27017:27017 mongo:latest
   ```

6. **Run the Application**
   
   Terminal 1 (Backend):
   ```bash
   cd backend
   python main.py
   ```
   
   Terminal 2 (Frontend):
   ```bash
   cd frontend/promptyai-frontend
   npm run dev
   ```

7. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

## Usage

### Basic Prompt Enhancement

1. Open the application in your browser
2. Navigate to the "Generate" tab
3. Enter your prompt in the text area
4. Select category, style, and complexity (optional)
5. Click "Generate Enhanced Prompt"
6. Copy or share the enhanced result

### Managing Prompts

- **Library Tab**: Browse all generated prompts
- **Search**: Filter prompts by content or category
- **Share**: Generate shareable URLs for prompts
- **Delete**: Remove unwanted prompts

### Analytics

- **Stats Tab**: View usage statistics
- **Category Distribution**: See prompt categorization trends
- **Total Counts**: Track generation metrics

## API Endpoints

### Core Endpoints

- `POST /generate` - Generate enhanced prompt
- `GET /prompts` - List all prompts
- `GET /prompts/{id}` - Get specific prompt
- `PUT /prompts/{id}` - Update prompt
- `DELETE /prompts/{id}` - Delete prompt
- `GET /share/{id}` - Get shareable prompt
- `GET /categories` - List available categories
- `GET /styles` - List available styles
- `GET /stats` - Get system statistics

### Sample Request

```bash
curl -X POST "http://localhost:8000/generate" \
     -H "Content-Type: application/json" \
     -d '{
       "text": "Write a story about AI",
       "style": "creative",
       "complexity": "medium"
     }'
```

## Configuration

### Environment Variables

- `OPENAI_API_KEY`: OpenAI API key for prompt enhancement
- `MONGODB_URL`: MongoDB connection string (default: mongodb://localhost:27017)

### Customization

- **Categories**: Modify `PROMPT_CATEGORIES` in `main.py`
- **Styles**: Update `STYLE_TEMPLATES` in `main.py`
- **UI Theme**: Customize colors in `App.css`

## Development

### Backend Development

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Development

```bash
cd frontend/promptyai-frontend
npm run dev
```

### Testing

```bash
# Backend tests
cd backend
python -m pytest

# Frontend tests
cd frontend/promptyai-frontend
npm test
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- OpenAI for GPT models
- Hugging Face for Transformers
- spaCy team for NLP tools
- React and FastAPI communities
