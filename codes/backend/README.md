# PromptyAI Backend

FastAPI-based backend for intelligent prompt generation and enhancement.

## Features

- **RESTful API** with FastAPI
- **MongoDB** integration for data persistence
- **OpenAI GPT** integration for prompt enhancement
- **NLP Processing** with spaCy and NLTK
- **Sentiment Analysis** using Transformers
- **Automatic API Documentation** with Swagger UI and ReDoc

## Setup

### 1. Create Virtual Environment

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Download Required Models

```bash
# spaCy English model
python -m spacy download en_core_web_sm

# NLTK data (automatically downloaded on first run)
```

### 4. Configure Environment

Create a `.env` file:

```bash
cp .env.example .env
```

Edit `.env` and add your credentials:

```
MONGODB_URL=mongodb://localhost:27017
OPENAI_API_KEY=your_openai_api_key_here
```

### 5. Run the Server

```bash
# Using the run script
python run.py

# Or using uvicorn directly
uvicorn main:app --reload
```

The API will be available at:
- **API**: http://localhost:8000
- **Interactive Docs**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## API Endpoints

### Prompt Generation
- `POST /generate` - Generate and enhance a prompt
- `GET /prompts` - List all prompts
- `GET /prompts/{id}` - Get specific prompt
- `PUT /prompts/{id}` - Update prompt
- `DELETE /prompts/{id}` - Delete prompt

### Utilities
- `GET /categories` - Available categories
- `GET /styles` - Available writing styles
- `GET /stats` - Usage statistics
- `GET /share/{id}` - Shareable prompt

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URL` | MongoDB connection string | `mongodb://localhost:27017` |
| `OPENAI_API_KEY` | OpenAI API key | Required |
| `HOST` | Server host | `0.0.0.0` |
| `PORT` | Server port | `8000` |

### Writing Styles

- **professional** - Professional and detailed responses
- **casual** - Friendly and approachable tone
- **academic** - Academic perspective and analysis
- **creative** - Creative and imaginative approach
- **technical** - Technical and precise explanations
- **friendly** - Warm and conversational style

### Prompt Categories

- **creative** - Story writing, art, design
- **technical** - Code, programming, algorithms
- **business** - Marketing, strategy, analysis
- **educational** - Teaching, tutorials, guides
- **conversational** - Chat, discussions, dialogue
- **analytical** - Comparisons, evaluations, reviews

## Development

### Project Structure

```
backend/
├── main.py              # FastAPI application
├── run.py               # Run script
├── requirements.txt     # Python dependencies
├── setup.py            # Setup script
├── .env.example        # Environment template
├── Dockerfile          # Docker configuration
└── README.md           # This file
```

### Adding New Features

1. Define new endpoints in `main.py`
2. Update Pydantic models for validation
3. Test using the interactive docs at `/docs`

### Testing

```bash
# Install test dependencies
pip install pytest pytest-asyncio httpx

# Run tests
pytest tests/
```

## Deployment

### Using Docker

```bash
docker build -t promptyai-backend .
docker run -p 8000:8000 -e OPENAI_API_KEY=your_key promptyai-backend
```

### Using Docker Compose

From the project root:

```bash
docker-compose up backend
```

### Production Deployment

For production, consider:

1. Use a production WSGI server (uvicorn with workers)
2. Set up proper MongoDB authentication
3. Use environment-specific configuration
4. Enable HTTPS
5. Set up monitoring and logging
6. Configure CORS for your domain

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

## Troubleshooting

### MongoDB Connection Issues

```bash
# Check if MongoDB is running
mongosh --eval "db.runCommand('ping')"

# Start MongoDB
mongod --dbpath /path/to/data
```

### spaCy Model Not Found

```bash
# Download the model
python -m spacy download en_core_web_sm

# Verify installation
python -c "import spacy; nlp = spacy.load('en_core_web_sm'); print('OK')"
```

### OpenAI API Errors

- Verify your API key is valid
- Check your OpenAI account has credits
- Ensure you're not hitting rate limits

## Dependencies

- **fastapi** - Web framework
- **uvicorn** - ASGI server
- **motor** - Async MongoDB driver
- **openai** - OpenAI API client
- **spacy** - Advanced NLP
- **nltk** - Natural language toolkit
- **transformers** - Hugging Face models
- **pydantic** - Data validation

## License

MIT License - See LICENSE file for details
