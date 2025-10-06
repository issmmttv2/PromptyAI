# Contributing to PromptyAI

First off, thank you for considering contributing to PromptyAI! It's people like you that make PromptyAI such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed and what you expected**
- **Include screenshots if applicable**
- **Include your environment details** (OS, Python version, Node version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List any similar features in other applications**

### Pull Requests

1. **Fork the repo** and create your branch from `main`
2. **Make your changes** with clear, descriptive commits
3. **Update documentation** if needed
4. **Ensure tests pass** (if applicable)
5. **Follow the code style** of the project
6. **Submit your pull request**

## Development Setup

### Backend Development

```bash
cd codes/backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python -m spacy download en_core_web_sm
```

### Frontend Development

```bash
cd codes/frontend/promptyai-frontend
pnpm install
pnpm dev
```

## Coding Standards

### Backend (Python)

- Follow PEP 8 style guide
- Use type hints where appropriate
- Write docstrings for functions and classes
- Keep functions focused and concise
- Add comments for complex logic

```python
def enhance_prompt(text: str, style: str) -> str:
    """
    Enhance a prompt using AI.
    
    Args:
        text: The original prompt text
        style: The writing style to apply
        
    Returns:
        The enhanced prompt text
    """
    # Implementation here
    pass
```

### Frontend (JavaScript/React)

- Use functional components with hooks
- Follow React best practices
- Use meaningful variable names
- Keep components small and focused
- Add comments for complex logic

```javascript
/**
 * Generate an enhanced prompt
 * @param {string} prompt - The original prompt
 * @param {string} style - The writing style
 * @returns {Promise<Object>} The enhanced prompt data
 */
async function generatePrompt(prompt, style) {
  // Implementation here
}
```

## Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally

Examples:
```
Add sentiment analysis to prompt generation
Fix MongoDB connection timeout issue
Update README with Docker instructions
```

## Project Structure

### Backend
```
codes/backend/
├── main.py           # FastAPI application
├── run.py            # Server startup script
├── requirements.txt  # Python dependencies
└── .env.example     # Environment template
```

### Frontend
```
codes/frontend/promptyai-frontend/
├── src/
│   ├── components/   # React components
│   ├── App.jsx      # Main app component
│   └── main.jsx     # Entry point
├── package.json     # Dependencies
└── vite.config.js   # Vite configuration
```

## Testing

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

## Documentation

- Update README.md if adding new features
- Add comments to explain complex code
- Update API documentation for new endpoints
- Include examples for new functionality

## Feature Development Workflow

1. **Create an issue** describing the feature
2. **Get feedback** from maintainers
3. **Create a branch** (`feature/your-feature-name`)
4. **Develop the feature** with tests
5. **Update documentation**
6. **Submit a pull request**
7. **Address review feedback**

## Areas for Contribution

We welcome contributions in these areas:

### Backend
- [ ] Additional NLP features
- [ ] More prompt categories
- [ ] Caching layer for API responses
- [ ] Rate limiting
- [ ] User authentication
- [ ] Prompt versioning
- [ ] Export functionality

### Frontend
- [ ] Dark mode support
- [ ] Mobile app
- [ ] Browser extension
- [ ] Advanced search filters
- [ ] Prompt templates
- [ ] Keyboard shortcuts
- [ ] Accessibility improvements

### Documentation
- [ ] Video tutorials
- [ ] API examples
- [ ] Deployment guides
- [ ] Troubleshooting guides

### DevOps
- [ ] CI/CD pipelines
- [ ] Automated testing
- [ ] Performance monitoring
- [ ] Docker optimization

## Getting Help

- Check the [README](README.md) for setup instructions
- Read the [API Documentation](http://localhost:8000/docs)
- Create an issue for questions
- Join our community discussions

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

## License

By contributing to PromptyAI, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to PromptyAI! 🎉
