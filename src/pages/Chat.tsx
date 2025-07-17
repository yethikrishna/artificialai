import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Input, 
  Button, 
  Card, 
  Avatar, 
  Typography, 
  Row, 
  Col, 
  Badge,
  Tooltip,
  Space
} from "antd";
import {
  SendOutlined,
  EditOutlined,
  PictureOutlined,
  SoundOutlined,
  SearchOutlined,
  ExperimentOutlined,
  BarChartOutlined,
  TranslationOutlined,
  PhoneOutlined,
  VideoCameraOutlined,
  CodeOutlined,
  BulbOutlined,
  RobotOutlined,
  ThunderboltOutlined,
  StarOutlined,
  FireOutlined
} from "@ant-design/icons";
import { RiveAnimation } from "@/components/RiveAnimation";
import FloatingSidebar from '@/components/FloatingSidebar';
import AIRouter, { AIModelType, AI_MODEL_TYPES, MODEL_CAPABILITIES } from '@/lib/ai-router';
import { YetiAPIClient } from '@/lib/api-clients';
import { AnimatedMessage } from "@/components/enhanced/AnimatedMessage";
import { LoadingAnimation } from "@/components/animations/LoadingAnimation";
import { TypingAnimation } from "@/components/animations/TypingAnimation";
import { SkillAnimation } from "@/components/animations/SkillAnimation";
import { EnhancedUserButton } from "@/components/enhanced/EnhancedUserButton";
import { usePersonalization } from "@/components/enhanced/PersonalizationProvider";
import { YetiLogo, YetiAnimation } from "@/components/animations/YetiAnimations";
import { MountainTheme, mountainThemeStyles } from "@/components/animations/MountainTheme";
import { RiveScrollController } from "@/components/animations/RiveScrollController";

const { Text, Title } = Typography;
const { TextArea } = Input;

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  skill?: string;
}

interface Skill {
  id: string;
  name: string;
  icon: React.ReactNode;
  category: string;
  description: string;
  shortcut: string;
  color: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello, I am Yeti by Yethikrishna R. I can help you with 16 different AI capabilities. Type @ or / to see all available skills, or just start chatting!',
      timestamp: new Date()
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [showSkillSelector, setShowSkillSelector] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [currentModel, setCurrentModel] = useState<AIModelType | null>(null);
  const [routingInfo, setRoutingInfo] = useState<{
    confidence: number;
    reasoning: string;
    fallbacks: AIModelType[];
  } | null>(null);
  const [apiClient] = useState(new YetiAPIClient());
  const [apiStatus, setApiStatus] = useState<Record<string, boolean>>({});
  const [isScrolling, setIsScrolling] = useState(false);

  const inputRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const skills: Skill[] = [
    // Creative Services
    { id: 'writing', name: 'Writing Assistant', icon: <EditOutlined />, category: 'Creative', description: 'Help with writing, editing, and content creation', shortcut: '@write', color: 'blue' },
    { id: 'image', name: 'Image Generation', icon: <PictureOutlined />, category: 'Creative', description: 'Create and edit images with AI', shortcut: '@image', color: 'purple' },
    { id: 'music', name: 'Music Creation', icon: <SoundOutlined />, category: 'Creative', description: 'Compose and generate music', shortcut: '@music', color: 'green' },
    { id: 'design', name: 'Design Assistant', icon: <StarOutlined />, category: 'Creative', description: 'UI/UX and graphic design help', shortcut: '@design', color: 'pink' },
    
    // Research & Analysis
    { id: 'search', name: 'AI Search', icon: <SearchOutlined />, category: 'Research', description: 'Intelligent web search and information gathering', shortcut: '@search', color: 'orange' },
    { id: 'research', name: 'Academic Research', icon: <ExperimentOutlined />, category: 'Research', description: 'Research papers, citations, and analysis', shortcut: '@research', color: 'red' },
    { id: 'data', name: 'Data Analysis', icon: <BarChartOutlined />, category: 'Research', description: 'Analyze and visualize data insights', shortcut: '@data', color: 'cyan' },
    { id: 'summary', name: 'Content Summary', icon: <FireOutlined />, category: 'Research', description: 'Summarize documents and articles', shortcut: '@summary', color: 'gold' },
    
    // Communication
    { id: 'translate', name: 'Translation', icon: <TranslationOutlined />, category: 'Communication', description: 'Translate between 100+ languages', shortcut: '@translate', color: 'lime' },
    { id: 'voice', name: 'Voice Calls', icon: <PhoneOutlined />, category: 'Communication', description: 'Voice-based AI conversations', shortcut: '@voice', color: 'magenta' },
    { id: 'meeting', name: 'Meeting Recording', icon: <VideoCameraOutlined />, category: 'Communication', description: 'Record and transcribe meetings', shortcut: '@meeting', color: 'volcano' },
    { id: 'email', name: 'Email Assistant', icon: <EditOutlined />, category: 'Communication', description: 'Draft and optimize emails', shortcut: '@email', color: 'geekblue' },
    
    // Technical Support
    { id: 'code', name: 'Programming', icon: <CodeOutlined />, category: 'Technical', description: 'Code generation, debugging, and review', shortcut: '@code', color: 'purple' },
    { id: 'debug', name: 'Problem Solving', icon: <BulbOutlined />, category: 'Technical', description: 'Debug issues and find solutions', shortcut: '@debug', color: 'orange' },
    { id: 'ai', name: 'AI Consultation', icon: <RobotOutlined />, category: 'Technical', description: 'AI strategy and implementation advice', shortcut: '@ai', color: 'blue' },
    { id: 'optimize', name: 'Performance', icon: <ThunderboltOutlined />, category: 'Technical', description: 'Optimize code and system performance', shortcut: '@optimize', color: 'red' }
  ];

  const skillCategories = {
    'Creative': skills.filter(s => s.category === 'Creative'),
    'Research': skills.filter(s => s.category === 'Research'),
    'Communication': skills.filter(s => s.category === 'Communication'),
    'Technical': skills.filter(s => s.category === 'Technical')
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    // Show skill selector when @ or / is typed
    if (value.endsWith('@') || value.endsWith('/')) {
      setShowSkillSelector(true);
    } else if (!value.includes('@') && !value.includes('/')) {
      setShowSkillSelector(false);
    }
  };

  const handleSkillSelect = (skill: Skill) => {
    setSelectedSkill(skill);
    setInputValue(prev => prev.replace(/@$|\/$/g, '') + skill.shortcut + ' ');
    setShowSkillSelector(false);
    inputRef.current?.focus();
  };

  // Test API connections on component mount
  useEffect(() => {
    const testAPIs = async () => {
      const status = await AIRouter.testAPIs();
      setApiStatus(status);
    };
    testAPIs();
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
      skill: selectedSkill?.name
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setSelectedSkill(null);
    setIsTyping(true);

    try {
      // Smart routing with real API integration
      const routingResult = await AIRouter.routeMessage(
        currentInput,
        selectedSkill?.id,
        {
          requiresFastResponse: false,
          complexityLevel: currentInput.length > 100 ? 'high' : currentInput.length > 50 ? 'medium' : 'low'
        }
      );

      setCurrentModel(routingResult.selectedModel);
      setRoutingInfo({
        confidence: routingResult.confidence,
        reasoning: routingResult.reasoning,
        fallbacks: routingResult.fallbackModels
      });

      // Create AI response with real or fallback content
      let responseContent = '';
      
      if (routingResult.realResponse) {
        // Real API response
        responseContent = `${routingResult.realResponse}`;
      } else if (routingResult.error) {
        // API error - show demo response with error info
        const modelInfo = MODEL_CAPABILITIES[routingResult.selectedModel];
        responseContent = `⚠️ **API Connection Issue**\n\n**Selected Model:** ${modelInfo.name}\n**Error:** ${routingResult.error}\n\n**Demo Response:** This is a simulated response for "${currentInput}". In production, this would be processed by ${modelInfo.providers.join('/')} APIs.\n\n**Model Capabilities:** ${modelInfo.strengths.join(', ')}\n**Speed:** ${modelInfo.speed} | **Cost:** ${modelInfo.cost}`;
      } else {
        // Fallback demo response
        const modelInfo = MODEL_CAPABILITIES[routingResult.selectedModel];
        responseContent = `🧠 **${modelInfo.name}** processed your request!\n\n**Confidence:** ${Math.round(routingResult.confidence * 100)}%\n**Reasoning:** ${routingResult.reasoning}\n\n**Response:** This is a demo response for "${currentInput}". The real API integration is ready - just add your API keys!\n\n**Model Strengths:** ${modelInfo.strengths.join(', ')}\n**Speed:** ${modelInfo.speed} | **Cost:** ${modelInfo.cost}`;
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: responseContent,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      // Error handling
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `❌ **Error Processing Request**\n\nSorry, there was an issue processing your message: "${currentInput}"\n\n**Error:** ${error instanceof Error ? error.message : 'Unknown error'}\n\nPlease try again or contact support if the issue persists.`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleNewConversation = () => {
    setMessages([{
      id: Date.now().toString(),
      type: 'ai',
      content: "Hello, I am Yeti by Yethikrishna R. I can help you with 16 different AI capabilities. Type @ or / to see all available skills!",
      timestamp: new Date()
    }]);
    setInputValue('');
    setSelectedSkill(null);
  };

  const handleChatSelect = (chatId: string) => {
    console.log('Loading chat:', chatId);
    // TODO: Load chat history from Convex
  };

  const handleFileSelect = (file: any) => {
    console.log('Adding file to chat:', file);
    // TODO: Add file to current chat context
  };

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => setIsScrolling(false), 150);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 ${isScrolling ? 'scrolling' : ''}`}>
      {/* Floating Sidebar */}
      <FloatingSidebar
        onNewConversation={handleNewConversation}
        onChatSelect={handleChatSelect}
        onFileSelect={handleFileSelect}
      />

      {/* Header - Enhanced with Rive */}
      <motion.header 
        className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-3 sm:px-6 py-3 sm:py-4 shadow-sm sticky top-0 z-50"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <motion.div 
              className="flex items-center space-x-2 sm:space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              {/* Enhanced YETI Logo with Rive */}
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg overflow-hidden border-2 border-blue-200 shadow-lg">
                <RiveScrollController
                  src="/animations/yeti-logo.riv"
                  stateMachine="Logo State Machine"
                  artboard="Logo"
                  width={window.innerWidth < 640 ? 32 : 40}
                  height={window.innerWidth < 640 ? 32 : 40}
                  scrollBound={false}
                  className="yeti-header-logo"
                  onLoad={() => console.log('Header logo loaded')}
                />
              </div>
              
              <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent tracking-wider">
                YETI
              </div>
              <div className="text-lg sm:text-xl font-light text-gray-600">AI</div>
            </motion.div>
            
            <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 ml-4 lg:ml-8">
              {['Explore', 'Skills', 'Research', 'Create'].map((item) => (
                <motion.a
                  key={item}
                  href="#"
                  className="text-sm lg:text-base text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
                  whileHover={{ y: -2 }}
                >
                  {item}
                </motion.a>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* API Status with Enhanced Indicators */}
            <div className="hidden sm:flex items-center space-x-2">
              {Object.entries(apiStatus).map(([provider, status]) => (
                <motion.div
                  key={provider}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`w-2 h-2 rounded-full ${status ? 'bg-green-500' : 'bg-red-500'}`}
                  title={`${provider}: ${status ? 'Connected' : 'Disconnected'}`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>
            
            <EnhancedUserButton 
              size={window.innerWidth < 640 ? 8 : 10}
              showNotifications={true}
              onThemeChange={(theme) => {
                console.log('Theme changed to:', theme);
              }}
            />
          </div>
        </div>
      </motion.header>

      {/* Main Chat Interface */}
      <div className="flex flex-col h-[calc(100vh-64px)] sm:h-[calc(100vh-80px)]">
        {/* Messages Area with Scroll Optimization */}
        <div className="flex-1 overflow-y-auto px-2 sm:px-4 py-4 sm:py-6 custom-scrollbar">
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            {/* Welcome Message with Enhanced Animation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center py-4 sm:py-8 relative"
            >
              {/* Mountain background with scroll binding */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <RiveScrollController
                  src="/animations/mountain-background.riv"
                  stateMachine="Background State Machine"
                  artboard="Background"
                  width={800}
                  height={400}
                  scrollBound={true}
                  className="mountain-background"
                />
              </div>
              
              {/* Animated YETI Logo */}
              <motion.div
                className="inline-block mb-3 sm:mb-4 relative z-10"
              >
                <RiveScrollController
                  src="/animations/yeti-logo.riv"
                  stateMachine="Welcome State Machine"
                  artboard="Welcome"
                  width={window.innerWidth < 640 ? 64 : 80}
                  height={window.innerWidth < 640 ? 64 : 80}
                  scrollBound={false}
                  className="welcome-logo border-4 border-blue-200 shadow-xl rounded-full"
                />
              </motion.div>
              
              <Title level={window.innerWidth < 640 ? 4 : 3} className="text-gray-700 mb-2 px-4 relative z-10">
                Hello, I am Yeti by Yethikrishna R
              </Title>
              <Text className="text-gray-600 text-base sm:text-lg px-4 relative z-10">
                I have 8 AI model types with smart routing. Type @ or / to see all 16 skills!
              </Text>
              
              {/* Current Model Display with Animation */}
              {currentModel && routingInfo && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 px-4"
                >
                  <Card className="bg-blue-50/80 border-blue-200 max-w-md mx-auto">
                    <div className="text-center flex items-center justify-center gap-2">
                      <RiveScrollController
                        src="/animations/model-indicator.riv"
                        stateMachine="Model State Machine"
                        artboard={currentModel}
                        width={20}
                        height={20}
                        scrollBound={false}
                        className="model-indicator"
                      />
                      <Text className="text-blue-700 font-medium text-sm">
                        🧠 Current Model: {MODEL_CAPABILITIES[currentModel].name}
                      </Text>
                      <div className="text-xs text-blue-600 mt-1">
                        Confidence: {Math.round(routingInfo.confidence * 100)}%
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </motion.div>

            {/* Messages with Enhanced Animations */}
            <AnimatePresence>
              {messages.map((message) => (
                <AnimatedMessage
                  key={message.id}
                  message={message}
                  isTyping={isTyping && message.id === messages[messages.length - 1]?.id}
                />
              ))}
            </AnimatePresence>
            
            {/* Enhanced Typing Indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex justify-start"
                >
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Avatar 
                      src="/assets/1000158361.jpg" 
                      className="border-2 border-blue-200 shadow-lg" 
                      size={window.innerWidth < 640 ? "default" : "large"}
                    />
                    <Card className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg">
                      <div className="flex items-center space-x-2 p-2">
                        <RiveScrollController
                          src="/animations/typing-indicator.riv"
                          stateMachine="Typing State Machine"
                          artboard="Typing"
                          width={40}
                          height={20}
                          scrollBound={false}
                          className="typing-indicator"
                        />
                        <Text className="text-gray-600 text-sm">YETI is thinking...</Text>
                      </div>
                    </Card>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Skill Selector with Enhanced Animations */}
        <AnimatePresence>
          {showSkillSelector && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mx-2 sm:mx-4 mb-2 sm:mb-4"
            >
              <Card className="bg-white/90 backdrop-blur-sm border-gray-200 shadow-xl max-w-4xl mx-auto">
                <Title level={5} className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">Select a Skill</Title>
                
                {Object.entries(skillCategories).map(([category, categorySkills]) => (
                  <div key={category} className="mb-4 sm:mb-6">
                    <Text className="text-gray-600 font-medium mb-2 sm:mb-3 block text-sm sm:text-base">{category}</Text>
                    <Row gutter={[8, 8]} className="sm:gutter-12">
                      {categorySkills.map((skill) => (
                        <Col xs={12} sm={8} md={6} key={skill.id}>
                          <motion.div
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Card
                              className="bg-white/60 border-gray-200 hover:bg-white/80 hover:border-blue-300 cursor-pointer transition-all duration-200 shadow-md hover:shadow-lg h-full relative overflow-hidden"
                              bodyStyle={{ padding: window.innerWidth < 640 ? '8px' : '12px' }}
                              onClick={() => handleSkillSelect(skill)}
                            >
                              {/* Enhanced Skill Animation */}
                              <div className="absolute inset-0 pointer-events-none opacity-20">
                                <RiveScrollController
                                  src="/animations/skill-animations.riv"
                                  stateMachine="Skill State Machine"
                                  artboard={skill.id}
                                  width={100}
                                  height={100}
                                  scrollBound={false}
                                  className={`skill-background skill-${skill.id}`}
                                />
                              </div>
                              
                              <div className="text-center relative z-10">
                                <div className={`text-lg sm:text-2xl text-${skill.color}-500 mb-1 sm:mb-2`}>
                                  <RiveScrollController
                                    src={`/animations/skills/${skill.id}.riv`}
                                    stateMachine="Icon State Machine"
                                    artboard="Icon"
                                    width={24}
                                    height={24}
                                    scrollBound={false}
                                    className="skill-icon"
                                  />
                                </div>
                                <Text className="text-gray-700 text-xs sm:text-sm font-medium block mb-1">
                                  {skill.name}
                                </Text>
                                <Text className="text-gray-500 text-xs">
                                  {skill.shortcut}
                                </Text>
                              </div>
                            </Card>
                          </motion.div>
                        </Col>
                      ))}
                    </Row>
                  </div>
                ))}
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input Area - Mobile Responsive */}
        <motion.div 
          className="border-t border-gray-200 bg-white/80 backdrop-blur-sm p-2 sm:p-4 shadow-lg"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end space-x-2 sm:space-x-4">
              {selectedSkill && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="mb-2"
                >
                  <Badge count={selectedSkill.name} color="blue" />
                </motion.div>
              )}
              
              <div className="flex-1">
                <TextArea
                  ref={inputRef}
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message... Smart routing will select the best AI model"
                  className="bg-white/80 border-gray-300 text-gray-700 placeholder-gray-500 resize-none focus:border-blue-400 focus:ring-blue-400 text-sm sm:text-base"
                  autoSize={{ minRows: 1, maxRows: window.innerWidth < 640 ? 3 : 4 }}
                />
                <div className="flex justify-between items-center mt-1 sm:mt-2">
                  <Text className="text-gray-500 text-xs hidden sm:block">
                    Smart routing • @ or / for skills • Enter to send
                  </Text>
                  <Text className="text-gray-500 text-xs sm:hidden">
                    Smart routing • @ or / for skills
                  </Text>
                  <Space>
                    <Text className="text-gray-500 text-xs">8 AI models ready</Text>
                  </Space>
                </div>
              </div>
              
              <Button
                type="primary"
                icon={<SendOutlined />}
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="h-8 sm:h-10 px-3 sm:px-6 bg-blue-600 hover:bg-blue-700 border-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 text-xs sm:text-sm"
                size={window.innerWidth < 640 ? "small" : "middle"}
              >
                {window.innerWidth < 640 ? '' : 'Send'}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Scrollbar Styles with Performance */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.05);
            border-radius: 2px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(59, 130, 246, 0.3);
            border-radius: 2px;
            transition: background 0.2s ease;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(59, 130, 246, 0.5);
          }
          
          /* Scroll Performance Optimizations */
          .scrolling .rive-scroll-container {
            pointer-events: none;
          }
          
          .scrolling .skill-animation {
            animation-play-state: paused;
          }
          
          @media (max-width: 640px) {
            .custom-scrollbar::-webkit-scrollbar {
              width: 3px;
            }
          }
          
          /* Reduced Motion Support */
          @media (prefers-reduced-motion: reduce) {
            .rive-scroll-container {
              animation: none !important;
            }
          }
        `
      }} />

      {/* Mountain Theme Styles */}
      <style dangerouslySetInnerHTML={{
        __html: mountainThemeStyles
      }} />
    </div>
  );
}