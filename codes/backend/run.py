"""
Run script for PromptyAI backend
"""
import uvicorn
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

if __name__ == "__main__":
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", 8000))
    
    print(f"""
    ╔═══════════════════════════════════════╗
    ║        PromptyAI Backend Server       ║
    ╚═══════════════════════════════════════╝
    
    🚀 Starting server...
    📍 Host: {host}
    🔌 Port: {port}
    📚 API Docs: http://localhost:{port}/docs
    
    """)
    
    uvicorn.run(
        "main:app",
        host=host,
        port=port,
        reload=True,
        log_level="info"
    )
