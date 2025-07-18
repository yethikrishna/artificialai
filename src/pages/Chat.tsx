import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Link } from 'react-router';
import { 
  Send, 
  Sparkles, 
  Brain, 
  Zap, 
  Globe,
  Eye,
  Code,
  Target,
  Search,
  Rocket,
  Scissors,
  Mountain,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';
import AIRouter, { AI_MODEL_TYPES, MODEL_CAPABILITIES } from '@/lib/ai-router';
import { LiveAIActivation } from '@/components/LiveAIActivation';
import { AILoading } from '@/components/animations/CustomRiveAnimations';
import { AnimatedMessage } from '@/components/enhanced/AnimatedMessage';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  skill?: string;
  modelType?: string;
}

const SKILLS = [
  { id: 'writing', name: 'Creative Writing', icon: '✍️', color: 'from-purple-500 to-pink-500' },
  { id: 'code', name: 'Code Generation', icon: '💻', color: 'from-blue-500 to-cyan-500' },
  { id: 'research', name: 'Research & Analysis', icon: '🔍', color: 'from-green-500 to-emerald-500' },
  { id: 'translate', name: 'Translation', icon: '🌐', color: 'from-orange-500 to-red-500' },
  { id: 'image', name: 'Image Analysis', icon: '🖼️', color: 'from-indigo-500 to-purple-500' },
  { id: 'data', name: 'Data Processing', icon: '📊', color: 'from-teal-500 to-blue-500' },
  { id: 'summary', name: 'Summarization', icon: '📝', color: 'from-yellow-500 to-orange-500' },
  { id: 'ai', name: 'AI Assistance', icon: '🤖', color: 'from-gray-500 to-slate-500' }
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [showMountainTheme, setShowMountainTheme] = useState(false);
  const [showLiveAI, setShowLiveAI] = useState(true);
  const [apiStatus, setApiStatus] = useState<Record<string, boolean>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
      skill: selectedSkill
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const routingResult = await AIRouter.routeMessage(
        userMessage.content,
        selectedSkill,
        { requiresFastResponse: false, complexityLevel: 'medium' }
      );

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: routingResult.realResponse || routingResult.error || 'I apologize, but I encountered an issue processing your request. Please try again.',
        timestamp: new Date(),
        skill: selectedSkill,
        modelType: routingResult.selectedModel
      };

      setMessages(prev => [...prev, aiMessage]);

      if (routingResult.error) {
        toast.error('AI Response Error', {
          description: routingResult.error
        });
      }

    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'I apologize, but I encountered an unexpected error. Please try again.',
        timestamp: new Date(),
        skill: selectedSkill
      };

      setMessages(prev => [...prev, errorMessage]);
      toast.error('Unexpected Error', {
        description: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleLiveAIActivation = async () => {
    setShowLiveAI(false);
    toast.success('Live AI Activated!', {
      description: 'Testing connections to all AI models...'
    });
    
    try {
      const status = await AIRouter.testAPIs();
      setApiStatus(status);
      toast.success('API Status Updated', {
        description: `${Object.values(status).filter(Boolean).length} models connected`
      });
    } catch (error) {
      toast.error('Connection Test Failed', {
        description: 'Some models may not be available'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Enhanced Header */}
      <motion.header 
        className="w-full py-4 px-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <img 
              src="/assets/1000158361.jpg" 
              alt="YETI AI Logo" 
              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-blue-200 shadow-lg"
            />
            <div>
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                YETI AI
              </h1>
              <p className="text-xs text-gray-600 hidden md:block">Chat Interface</p>
            </div>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowMountainTheme(!showMountainTheme)}
              className="hidden md:flex"
            >
              <Mountain className="h-4 w-4 mr-2" />
              {showMountainTheme ? 'Hide' : 'Show'} Theme
            </Button>
            
            <div className="flex items-center space-x-2">
              <div className="text-xs text-gray-600">API Status:</div>
              <div className="flex space-x-1">
                {Object.entries(apiStatus).map(([model, connected]) => (
                  <div
                    key={model}
                    className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500' : 'bg-gray-300'}`}
                    title={`${model}: ${connected ? 'Connected' : 'Disconnected'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <motion.div 
            className="lg:col-span-1 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Live AI Activation Card */}
            <AnimatePresence>
              {showLiveAI && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <LiveAIActivation onActivation={handleLiveAIActivation} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Skills Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-purple-600" />
                  AI Skills
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant={selectedSkill === '' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedSkill('')}
                  className="w-full justify-start"
                >
                  🤖 Auto-Select Best Model
                </Button>
                {SKILLS.map((skill) => (
                  <Button
                    key={skill.id}
                    variant={selectedSkill === skill.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedSkill(skill.id)}
                    className="w-full justify-start"
                  >
                    {skill.icon} {skill.name}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Model Types Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-blue-600" />
                  AI Models
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(AI_MODEL_TYPES).map(([key, type]) => {
                  const info = MODEL_CAPABILITIES[type];
                  const isConnected = apiStatus[key];
                  return (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">{key}</div>
                        <div className="text-xs text-gray-600">{info.name}</div>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-gray-300'}`} />
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </motion.div>

          {/* Chat Area */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="h-[calc(100vh-200px)] flex flex-col">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <img 
                      src="/assets/1000158361.jpg" 
                      alt="YETI AI" 
                      className="w-8 h-8 rounded-full object-cover mr-3 border border-blue-200"
                    />
                    Chat with YETI AI
                  </CardTitle>
                  {selectedSkill && (
                    <Badge variant="secondary">
                      {SKILLS.find(s => s.id === selectedSkill)?.name || selectedSkill}
                    </Badge>
                  )}
                </div>
              </CardHeader>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.length === 0 && (
                    <motion.div 
                      className="text-center py-12"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <img 
                        src="/assets/1000158361.jpg" 
                        alt="YETI AI" 
                        className="w-16 h-16 rounded-full object-cover mx-auto mb-4 border-2 border-blue-200"
                      />
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Welcome to YETI AI!</h3>
                      <p className="text-gray-600 mb-4">
                        I'm your intelligent AI assistant with access to 8 specialized models.
                      </p>
                      <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
                        {['Ask me anything', 'Write code', 'Analyze data', 'Creative writing'].map((suggestion) => (
                          <Button
                            key={suggestion}
                            variant="outline"
                            size="sm"
                            onClick={() => setInputValue(suggestion)}
                            className="text-xs"
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {messages.map((message) => (
                    <AnimatedMessage 
                      key={message.id} 
                      message={message}
                      isTyping={false}
                    />
                  ))}

                  {isLoading && (
                    <motion.div 
                      className="flex justify-start"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="flex items-center space-x-3">
                        <img 
                          src="/assets/1000158361.jpg" 
                          alt="YETI AI" 
                          className="w-10 h-10 rounded-full object-cover border-2 border-blue-200"
                        />
                        <div className="bg-white border border-gray-200 rounded-2xl p-4">
                          <AILoading 
                            isLoading={true} 
                            message="YETI is thinking..." 
                            size="default"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="border-t p-4">
                <div className="flex space-x-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask YETI AI anything..."
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputValue.trim()}
                    size="icon"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <div className="text-xs text-gray-500 mt-2 text-center">
                  Press Enter to send • YETI AI can make mistakes, verify important information
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}