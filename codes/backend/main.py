from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import os
from datetime import datetime
import uuid
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import openai
from transformers import pipeline
import spacy
import nltk
from nltk.tokenize import word_tokenize, sent_tokenize
from nltk.corpus import stopwords
import re
import json

# Download required NLTK data
try:
    nltk.download('punkt', quiet=True)
    nltk.download('stopwords', quiet=True)
    nltk.download('averaged_perceptron_tagger', quiet=True)
except:
    pass

app = FastAPI(title="PromptyAI", description="AI-powered prompt generator for LLMs", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables
db = None
openai_client = None
nlp = None
sentiment_analyzer = None

# Pydantic models
class PromptRequest(BaseModel):
    text: str
    category: Optional[str] = None
    style: Optional[str] = "professional"
    complexity: Optional[str] = "medium"

class PromptResponse(BaseModel):
    id: str
    original_text: str
    enhanced_prompt: str
    category: str
    style: str
    complexity: str
    keywords: List[str]
    sentiment: str
    created_at: datetime
    shareable_url: str

class PromptUpdate(BaseModel):
    enhanced_prompt: Optional[str] = None
    category: Optional[str] = None
    style: Optional[str] = None

# Categories for prompt classification
PROMPT_CATEGORIES = {
    "creative": ["story", "creative", "write", "imagine", "create", "design", "art"],
    "technical": ["code", "program", "develop", "technical", "algorithm", "debug", "api"],
    "business": ["business", "marketing", "strategy", "analysis", "report", "proposal"],
    "educational": ["explain", "teach", "learn", "tutorial", "guide", "lesson", "study"],
    "conversational": ["chat", "talk", "discuss", "conversation", "dialogue", "ask"],
    "analytical": ["analyze", "compare", "evaluate", "assess", "review", "examine"]
}

# Style templates
STYLE_TEMPLATES = {
    "professional": "Please provide a professional and detailed response to: {prompt}",
    "casual": "Hey! Can you help me with: {prompt}",
    "academic": "From an academic perspective, please analyze and explain: {prompt}",
    "creative": "Let your creativity flow and explore: {prompt}",
    "technical": "Provide a technical and precise explanation for: {prompt}",
    "friendly": "In a friendly and approachable way, please help with: {prompt}"
}

@app.on_event("startup")
async def startup_event():
    global db, openai_client, nlp, sentiment_analyzer
    
    # Initialize MongoDB
    '''
    try:
        client = AsyncIOMotorClient("mongodb://localhost:27017")
        db = client.promptyai
        print("Connected to MongoDB")
    except Exception as e:
        print(f"MongoDB connection failed: {e}")
        db = None
        
    mongo_url = os.getenv("MONGODB_URL")
'''
if mongo_url:
    try:
        client = AsyncIOMotorClient(mongo_url)
        db = client.promptyai
        print("Connected to MongoDB")
    except Exception as e:
        print(f"MongoDB connection failed: {e}")
        db = None
else:
    print("MONGODB_URL not set. Running without database persistence.")
    db = None
    
    # Initialize OpenAI client
    try:
        openai_client = openai.OpenAI()
        print("OpenAI client initialized")
    except Exception as e:
        print(f"OpenAI initialization failed: {e}")
        openai_client = None
    
    # Initialize spaCy
    try:
        nlp = spacy.load("en_core_web_sm")
        print("spaCy model loaded")
    except Exception as e:
        print(f"spaCy loading failed: {e}")
        nlp = None
    
    # Initialize sentiment analyzer
    try:
        sentiment_analyzer = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")
        print("Sentiment analyzer loaded")
    except Exception as e:
        print(f"Sentiment analyzer loading failed: {e}")
        sentiment_analyzer = None

def extract_keywords(text: str) -> List[str]:
    """Extract keywords from text using NLTK and spaCy"""
    keywords = []
    
    try:
        # NLTK approach
        tokens = word_tokenize(text.lower())
        stop_words = set(stopwords.words('english'))
        filtered_tokens = [word for word in tokens if word.isalnum() and word not in stop_words and len(word) > 2]
        keywords.extend(filtered_tokens[:5])
        
        # spaCy approach for named entities
        if nlp:
            doc = nlp(text)
            entities = [ent.text.lower() for ent in doc.ents if ent.label_ in ["PERSON", "ORG", "GPE", "PRODUCT"]]
            keywords.extend(entities[:3])
        
    except Exception as e:
        print(f"Keyword extraction error: {e}")
    
    return list(set(keywords))[:8]

def categorize_prompt(text: str) -> str:
    """Categorize prompt based on keywords"""
    text_lower = text.lower()
    category_scores = {}
    
    for category, keywords in PROMPT_CATEGORIES.items():
        score = sum(1 for keyword in keywords if keyword in text_lower)
        category_scores[category] = score
    
    if max(category_scores.values()) > 0:
        return max(category_scores, key=category_scores.get)
    return "general"

def get_sentiment(text: str) -> str:
    """Get sentiment of text"""
    try:
        if sentiment_analyzer:
            result = sentiment_analyzer(text)[0]
            return result['label'].lower()
    except Exception as e:
        print(f"Sentiment analysis error: {e}")
    return "neutral"

async def enhance_prompt_with_ai(text: str, style: str, complexity: str) -> str:
    """Enhance prompt using OpenAI"""
    try:
        if not openai_client:
            return STYLE_TEMPLATES.get(style, STYLE_TEMPLATES["professional"]).format(prompt=text)
        
        system_prompt = f"""You are an expert prompt engineer. Enhance the given prompt to be more effective for LLMs.
        Style: {style}
        Complexity: {complexity}
        
        Guidelines:
        - Make it clear and specific
        - Add context when needed
        - Maintain the original intent
        - Optimize for better LLM responses
        """
        
        response = openai_client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"Enhance this prompt: {text}"}
            ],
            max_tokens=200,
            temperature=0.7
        )
        
        return response.choices[0].message.content.strip()
    
    except Exception as e:
        print(f"AI enhancement error: {e}")
        return STYLE_TEMPLATES.get(style, STYLE_TEMPLATES["professional"]).format(prompt=text)

@app.get("/")
async def root():
    return {"message": "PromptyAI API is running!", "version": "1.0.0"}

@app.post("/generate", response_model=PromptResponse)
async def generate_prompt(request: PromptRequest):
    """Generate and enhance a prompt"""
    try:
        # Generate unique ID
        prompt_id = str(uuid.uuid4())
        
        # Categorize if not provided
        category = request.category or categorize_prompt(request.text)
        
        # Extract keywords
        keywords = extract_keywords(request.text)
        
        # Get sentiment
        sentiment = get_sentiment(request.text)
        
        # Enhance prompt with AI
        enhanced_prompt = await enhance_prompt_with_ai(request.text, request.style, request.complexity)
        
        # Create response object
        prompt_data = {
            "id": prompt_id,
            "original_text": request.text,
            "enhanced_prompt": enhanced_prompt,
            "category": category,
            "style": request.style,
            "complexity": request.complexity,
            "keywords": keywords,
            "sentiment": sentiment,
            "created_at": datetime.utcnow(),
            "shareable_url": f"/share/{prompt_id}"
        }
        
        # Save to MongoDB
        if db:
            try:
                await db.prompts.insert_one(prompt_data.copy())
            except Exception as e:
                print(f"MongoDB save error: {e}")
        
        return PromptResponse(**prompt_data)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating prompt: {str(e)}")

@app.get("/prompts", response_model=List[PromptResponse])
async def get_prompts(limit: int = 10, category: Optional[str] = None):
    """Get list of prompts"""
    try:
        if not db:
            return []
        
        query = {}
        if category:
            query["category"] = category
        
        cursor = db.prompts.find(query).sort("created_at", -1).limit(limit)
        prompts = await cursor.to_list(length=limit)
        
        return [PromptResponse(**prompt) for prompt in prompts]
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching prompts: {str(e)}")

@app.get("/prompts/{prompt_id}", response_model=PromptResponse)
async def get_prompt(prompt_id: str):
    """Get specific prompt by ID"""
    try:
        if not db:
            raise HTTPException(status_code=503, detail="Database not available")
        
        prompt = await db.prompts.find_one({"id": prompt_id})
        if not prompt:
            raise HTTPException(status_code=404, detail="Prompt not found")
        
        return PromptResponse(**prompt)
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching prompt: {str(e)}")

@app.put("/prompts/{prompt_id}", response_model=PromptResponse)
async def update_prompt(prompt_id: str, update: PromptUpdate):
    """Update a prompt"""
    try:
        if not db:
            raise HTTPException(status_code=503, detail="Database not available")
        
        update_data = {k: v for k, v in update.dict().items() if v is not None}
        update_data["updated_at"] = datetime.utcnow()
        
        result = await db.prompts.update_one(
            {"id": prompt_id},
            {"$set": update_data}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Prompt not found")
        
        updated_prompt = await db.prompts.find_one({"id": prompt_id})
        return PromptResponse(**updated_prompt)
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating prompt: {str(e)}")

@app.delete("/prompts/{prompt_id}")
async def delete_prompt(prompt_id: str):
    """Delete a prompt"""
    try:
        if not db:
            raise HTTPException(status_code=503, detail="Database not available")
        
        result = await db.prompts.delete_one({"id": prompt_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Prompt not found")
        
        return {"message": "Prompt deleted successfully"}
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting prompt: {str(e)}")

@app.get("/share/{prompt_id}")
async def share_prompt(prompt_id: str):
    """Get shareable prompt"""
    try:
        if not db:
            return {"error": "Database not available"}
        
        prompt = await db.prompts.find_one({"id": prompt_id})
        if not prompt:
            raise HTTPException(status_code=404, detail="Prompt not found")
        
        return {
            "id": prompt["id"],
            "enhanced_prompt": prompt["enhanced_prompt"],
            "category": prompt["category"],
            "style": prompt["style"],
            "created_at": prompt["created_at"]
        }
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error sharing prompt: {str(e)}")

@app.get("/categories")
async def get_categories():
    """Get available categories"""
    return {"categories": list(PROMPT_CATEGORIES.keys())}

@app.get("/styles")
async def get_styles():
    """Get available styles"""
    return {"styles": list(STYLE_TEMPLATES.keys())}

@app.get("/stats")
async def get_stats():
    """Get system statistics"""
    try:
        if not db:
            return {"total_prompts": 0, "categories": {}}
        
        total_prompts = await db.prompts.count_documents({})
        
        # Category distribution
        pipeline = [
            {"$group": {"_id": "$category", "count": {"$sum": 1}}},
            {"$sort": {"count": -1}}
        ]
        category_stats = await db.prompts.aggregate(pipeline).to_list(length=None)
        categories = {item["_id"]: item["count"] for item in category_stats}
        
        return {
            "total_prompts": total_prompts,
            "categories": categories,
            "available_categories": list(PROMPT_CATEGORIES.keys()),
            "available_styles": list(STYLE_TEMPLATES.keys())
        }
    
    except Exception as e:
        return {"error": f"Error fetching stats: {str(e)}"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)