# PromptyAI Frontend

Modern React-based frontend for PromptyAI with Tailwind CSS and shadcn/ui components.

## Features

- **Modern UI** with React 19 and Tailwind CSS
- **shadcn/ui Components** for consistent design
- **Framer Motion** animations
- **Responsive Design** for all devices
- **Real-time Updates** with async state management
- **Dark Mode** support (optional)

## Setup

### 1. Install Dependencies

```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install
```

### 2. Configure Environment

Create a `.env` file:

```bash
cp .env.example .env
```

Edit `.env`:

```
VITE_API_BASE_URL=http://localhost:8000
VITE_APP_NAME=PromptyAI
```

### 3. Run Development Server

```bash
# Using pnpm
pnpm dev

# Or using npm
npm run dev
```

The app will be available at http://localhost:5173

## Building for Production

```bash
# Build the app
pnpm build

# Preview the build
pnpm preview
```

## Project Structure

```
src/
├── components/
│   └── ui/              # shadcn/ui components
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── App.jsx             # Main application
├── main.jsx            # Application entry point
├── index.css           # Global styles
└── App.css             # Component styles
```

## Key Components

### App.jsx
Main application component with three tabs:
- **Generate** - Create and enhance prompts
- **Library** - Browse saved prompts
- **Stats** - View analytics

### UI Components (shadcn/ui)
- Button, Card, Input, Textarea
- Select, Tabs, Badge, Alert
- And many more...

## Styling

### Tailwind CSS

The app uses Tailwind CSS with a custom configuration:

```javascript
// tailwind.config.js
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  // ... custom theme
}
```

### Custom Styles

Global styles are defined in `src/index.css` with CSS variables for theming.

## API Integration

The frontend communicates with the backend API:

```javascript
const API_BASE_URL = 'http://localhost:8000'

// Generate prompt
const response = await fetch(`${API_BASE_URL}/generate`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    text: prompt,
    style: selectedStyle,
    complexity: selectedComplexity,
  }),
})
```

## Features in Detail

### 1. Prompt Generation
- Enter your prompt
- Select category (auto-detect or manual)
- Choose writing style
- Set complexity level
- Generate enhanced prompt

### 2. Prompt Library
- Search prompts
- Filter by category
- View original and enhanced versions
- Copy, share, or delete prompts

### 3. Analytics
- Total prompts generated
- Category distribution
- Active styles count

## Development

### Adding New Components

```bash
# Using shadcn/ui CLI
pnpm dlx shadcn-ui@latest add <component-name>
```

### Code Structure

```javascript
// Component example
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

function MyComponent() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Button>Click me</Button>
    </motion.div>
  )
}
```

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Build command
pnpm build

# Publish directory
dist
```

### Docker

```bash
docker build -t promptyai-frontend .
docker run -p 5173:5173 promptyai-frontend
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API URL | `http://localhost:8000` |
| `VITE_APP_NAME` | Application name | `PromptyAI` |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Dependencies

### Core
- **react** - UI library
- **react-dom** - React DOM renderer
- **react-router-dom** - Routing (if needed)

### UI Components
- **@radix-ui/** - Unstyled accessible components
- **tailwindcss** - Utility-first CSS
- **framer-motion** - Animations
- **lucide-react** - Icons

### Utilities
- **class-variance-authority** - Component variants
- **clsx** - Conditional classes
- **tailwind-merge** - Merge Tailwind classes

## Troubleshooting

### Port Already in Use

```bash
# Use a different port
pnpm dev --port 3000
```

### API Connection Errors

1. Ensure backend is running on port 8000
2. Check CORS settings in backend
3. Verify `VITE_API_BASE_URL` in `.env`

### Build Errors

```bash
# Clear cache and rebuild
rm -rf node_modules dist
pnpm install
pnpm build
```

## Contributing

1. Follow the existing code style
2. Use TypeScript (optional but recommended)
3. Add comments for complex logic
4. Test on multiple browsers

## License

MIT License - See LICENSE file for details
