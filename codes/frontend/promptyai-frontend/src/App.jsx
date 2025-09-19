import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Alert, AlertDescription } from '@/components/ui/alert.jsx'
import { Loader2, Sparkles, Copy, Share, Trash2, Brain, TrendingUp, Search } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'

const API_BASE_URL = 'http://localhost:8000'

function App() {
  const [prompts, setPrompts] = useState([])
  const [currentPrompt, setCurrentPrompt] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('professional')
  const [selectedComplexity, setSelectedComplexity] = useState('medium')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedPrompt, setGeneratedPrompt] = useState(null)
  const [stats, setStats] = useState(null)
  const [categories, setCategories] = useState([])
  const [styles, setStyles] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetchPrompts()
    fetchStats()
    fetchCategories()
    fetchStyles()
  }, [])

  const fetchPrompts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/prompts?limit=20`)
      if (response.ok) {
        const data = await response.json()
        setPrompts(data)
      }
    } catch (error) {
      console.error('Error fetching prompts:', error)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/stats`)
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories`)
      if (response.ok) {
        const data = await response.json()
        setCategories(data.categories)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const fetchStyles = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/styles`)
      if (response.ok) {
        const data = await response.json()
        setStyles(data.styles)
      }
    } catch (error) {
      console.error('Error fetching styles:', error)
    }
  }

  const generatePrompt = async () => {
    if (!currentPrompt.trim()) {
      setError('Please enter a prompt to enhance')
      return
    }

    setIsGenerating(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch(`${API_BASE_URL}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: currentPrompt,
          category: selectedCategory || null,
          style: selectedStyle,
          complexity: selectedComplexity,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setGeneratedPrompt(data)
        setSuccess('Prompt generated successfully!')
        fetchPrompts()
        fetchStats()
      } else {
        const errorData = await response.json()
        setError(errorData.detail || 'Failed to generate prompt')
      }
    } catch (error) {
      setError('Network error. Please check if the backend is running.')
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setSuccess('Copied to clipboard!')
  }

  const sharePrompt = (promptId) => {
    const shareUrl = `${window.location.origin}/share/${promptId}`
    copyToClipboard(shareUrl)
  }

  const deletePrompt = async (promptId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/prompts/${promptId}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        setSuccess('Prompt deleted successfully!')
        fetchPrompts()
        fetchStats()
      }
    } catch (error) {
      setError('Failed to delete prompt')
    }
  }

  const filteredPrompts = prompts.filter(prompt => {
    const matchesSearch = prompt.enhanced_prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prompt.original_text.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !filterCategory || prompt.category === filterCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="h-12 w-12 text-blue-600" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PromptyAI
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            AI-powered prompt generator for Large Language Models. Enhance your prompts with intelligent categorization and style optimization.
          </p>
        </motion.div>

        {/* Error/Success Messages */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mb-6"
            >
              <Alert className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-700">{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mb-6"
            >
              <Alert className="border-green-200 bg-green-50">
                <AlertDescription className="text-green-700">{success}</AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        <Tabs defaultValue="generate" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="generate" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Generate
            </TabsTrigger>
            <TabsTrigger value="library" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Library
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Stats
            </TabsTrigger>
          </TabsList>

          {/* Generate Tab */}
          <TabsContent value="generate" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Generate Enhanced Prompt
                </CardTitle>
                <CardDescription>
                  Enter your prompt and let AI enhance it for better LLM responses
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Your Prompt</label>
                    <Textarea
                      placeholder="Enter your prompt here..."
                      value={currentPrompt}
                      onChange={(e) => setCurrentPrompt(e.target.value)}
                      className="min-h-[120px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Category</label>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Auto-detect" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Auto-detect</SelectItem>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category.charAt(0).toUpperCase() + category.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Style</label>
                      <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {styles.map((style) => (
                            <SelectItem key={style} value={style}>
                              {style.charAt(0).toUpperCase() + style.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Complexity</label>
                      <Select value={selectedComplexity} onValueChange={setSelectedComplexity}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="simple">Simple</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="complex">Complex</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button 
                    onClick={generatePrompt} 
                    disabled={isGenerating || !currentPrompt.trim()}
                    className="w-full"
                    size="lg"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate Enhanced Prompt
                      </>
                    )}
                  </Button>
                </div>

                {/* Generated Prompt Display */}
                <AnimatePresence>
                  {generatedPrompt && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <Card className="border-green-200 bg-green-50">
                        <CardHeader>
                          <CardTitle className="text-green-800 flex items-center gap-2">
                            <Sparkles className="h-5 w-5" />
                            Enhanced Prompt
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="bg-white p-4 rounded-lg border">
                            <p className="text-gray-800">{generatedPrompt.enhanced_prompt}</p>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary">{generatedPrompt.category}</Badge>
                            <Badge variant="outline">{generatedPrompt.style}</Badge>
                            <Badge variant="outline">{generatedPrompt.complexity}</Badge>
                            <Badge variant="outline">{generatedPrompt.sentiment}</Badge>
                          </div>

                          {generatedPrompt.keywords.length > 0 && (
                            <div>
                              <p className="text-sm font-medium mb-2">Keywords:</p>
                              <div className="flex flex-wrap gap-1">
                                {generatedPrompt.keywords.map((keyword, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {keyword}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copyToClipboard(generatedPrompt.enhanced_prompt)}
                            >
                              <Copy className="h-4 w-4 mr-1" />
                              Copy
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => sharePrompt(generatedPrompt.id)}
                            >
                              <Share className="h-4 w-4 mr-1" />
                              Share
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Library Tab */}
          <TabsContent value="library" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Prompt Library</CardTitle>
                <CardDescription>Browse and manage your generated prompts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Search prompts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="All categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-4">
                  {filteredPrompts.map((prompt) => (
                    <motion.div
                      key={prompt.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      layout
                    >
                      <Card>
                        <CardContent className="pt-6">
                          <div className="space-y-3">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <p className="text-sm text-gray-600 mb-2">Original:</p>
                                <p className="text-sm bg-gray-50 p-2 rounded">{prompt.original_text}</p>
                              </div>
                            </div>
                            
                            <div>
                              <p className="text-sm text-gray-600 mb-2">Enhanced:</p>
                              <p className="bg-blue-50 p-3 rounded border-l-4 border-blue-400">
                                {prompt.enhanced_prompt}
                              </p>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              <Badge variant="secondary">{prompt.category}</Badge>
                              <Badge variant="outline">{prompt.style}</Badge>
                              <Badge variant="outline">{prompt.sentiment}</Badge>
                            </div>

                            <div className="flex justify-between items-center">
                              <p className="text-xs text-gray-500">
                                {new Date(prompt.created_at).toLocaleDateString()}
                              </p>
                              <div className="flex gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => copyToClipboard(prompt.enhanced_prompt)}
                                >
                                  <Copy className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => sharePrompt(prompt.id)}
                                >
                                  <Share className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => deletePrompt(prompt.id)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {filteredPrompts.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No prompts found. Generate your first prompt to get started!
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Stats Tab */}
          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{stats?.total_prompts || 0}</CardTitle>
                  <CardDescription>Total Prompts Generated</CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{Object.keys(stats?.categories || {}).length}</CardTitle>
                  <CardDescription>Active Categories</CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{styles.length}</CardTitle>
                  <CardDescription>Available Styles</CardDescription>
                </CardHeader>
              </Card>
            </div>

            {stats?.categories && Object.keys(stats.categories).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Category Distribution</CardTitle>
                  <CardDescription>Number of prompts by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(stats.categories).map(([category, count]) => (
                      <div key={category} className="flex justify-between items-center">
                        <span className="capitalize">{category}</span>
                        <Badge variant="secondary">{count}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default App

