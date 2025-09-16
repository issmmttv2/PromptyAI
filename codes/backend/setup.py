#!/usr/bin/env python3
"""
Setup script for PromptyAI Backend
"""
import subprocess
import sys
import os

def run_command(command):
    """Run a shell command and return the result"""
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print(f"✓ {command}")
        return True
    except subprocess.CalledProcessError as e:
        print(f"✗ {command}")
        print(f"Error: {e.stderr}")
        return False

def main():
    print("🚀 Setting up PromptyAI Backend...")
    
    # Install Python dependencies
    print("\n📦 Installing Python dependencies...")
    if not run_command("pip install -r requirements.txt"):
        print("❌ Failed to install dependencies")
        sys.exit(1)
    
    # Download spaCy model
    print("\n🧠 Downloading spaCy English model...")
    if not run_command("python -m spacy download en_core_web_sm"):
        print("⚠️  Warning: spaCy model download failed. Some features may not work.")
    
    # Download NLTK data
    print("\n📚 Downloading NLTK data...")
    nltk_script = '''
import nltk
try:
    nltk.download('punkt', quiet=True)
    nltk.download('stopwords', quiet=True)
    nltk.download('averaged_perceptron_tagger', quiet=True)
    print("NLTK data downloaded successfully")
except Exception as e:
    print(f"NLTK download error: {e}")
'''
    
    with open('download_nltk.py', 'w') as f:
        f.write(nltk_script)
    
    run_command("python download_nltk.py")
    os.remove('download_nltk.py')
    
    print("\n✅ Backend setup complete!")
    print("\n🔧 Next steps:")
    print("1. Make sure MongoDB is running on localhost:27017")
    print("2. Set your OpenAI API key: export OPENAI_API_KEY='your-key-here'")
    print("3. Run the server: python main.py")

if __name__ == "__main__":
    main()
