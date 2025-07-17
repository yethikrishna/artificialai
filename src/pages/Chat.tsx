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

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Smart routing logic
    const routingResult = AIRouter.routeMessage(
      inputValue,
      selectedSkill?.id,
      {
        requiresFastResponse: false,
        complexityLevel: inputValue.length > 100 ? 'high' : inputValue.length > 50 ? 'medium' : 'low'
      }
    );

    setCurrentModel(routingResult.selectedModel);
    setRoutingInfo({
      confidence: routingResult.confidence,
      reasoning: routingResult.reasoning,
      fallbacks: routingResult.fallbackModels
    });

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
      skill: selectedSkill?.name
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setSelectedSkill(null);
    setIsTyping(true);

    // Simulate AI response with model info
    setTimeout(() => {
      const modelInfo = MODEL_CAPABILITIES[routingResult.selectedModel];
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `🧠 **${modelInfo.name}** selected for this task!\n\n**Confidence:** ${Math.round(routingResult.confidence * 100)}%\n**Reasoning:** ${routingResult.reasoning}\n\n**Model Strengths:** ${modelInfo.strengths.join(', ')}\n**Speed:** ${modelInfo.speed} | **Cost:** ${modelInfo.cost}\n\n*This is a demo response. In the next phase, I'll connect to real ${modelInfo.providers.join('/')} APIs to process your request: "${inputValue}"*`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Floating Sidebar */}
      <FloatingSidebar
        onNewConversation={handleNewConversation}
        onChatSelect={handleChatSelect}
        onFileSelect={handleFileSelect}
      />

      {/* Header - Mobile Responsive */}
      <motion.header 
        className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-3 sm:px-6 py-3 sm:py-4 shadow-sm"
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
              <motion.div 
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg overflow-hidden border-2 border-blue-200 shadow-lg"
                animate={{
                  rotateY: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <img 
                  src="/assets/1000158361.jpg" 
                  alt="YETI AI Logo" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
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
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Avatar 
                src="/assets/1000158361.jpg" 
                size={window.innerWidth < 640 ? "default" : "large"}
                className="border-2 border-blue-200 shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Main Chat Interface - Mobile Responsive */}
      <div className="flex flex-col h-[calc(100vh-64px)] sm:h-[calc(100vh-80px)]">
        {/* Messages Area - Mobile Responsive */}
        <div className="flex-1 overflow-y-auto px-2 sm:px-4 py-4 sm:py-6 custom-scrollbar">
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            {/* Welcome Message - Mobile Responsive */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center py-4 sm:py-8"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="inline-block mb-3 sm:mb-4"
              >
                <Avatar 
                  src="/assets/1000158361.jpg" 
                  className="border-4 border-blue-200 shadow-xl"
                  size={window.innerWidth < 640 ? 64 : 80}
                />
              </motion.div>
              <Title level={window.innerWidth < 640 ? 4 : 3} className="text-gray-700 mb-2 px-4">
                Hello, I am Yeti by Yethikrishna R
              </Title>
              <Text className="text-gray-600 text-base sm:text-lg px-4">
                I have 8 AI model types with smart routing. Type @ or / to see all 16 skills!
              </Text>
              
              {/* Current Model Display */}
              {currentModel && routingInfo && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 px-4"
                >
                  <Card className="bg-blue-50/80 border-blue-200 max-w-md mx-auto">
                    <div className="text-center">
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

            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 sm:space-x-3 max-w-[85%] sm:max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Avatar 
                        src={message.type === 'ai' ? '/assets/1000158361.jpg' : undefined}
                        icon={message.type === 'user' ? <RobotOutlined /> : undefined}
                        className={`${message.type === 'ai' ? 'border-2 border-blue-200 shadow-lg' : 'bg-blue-600 shadow-lg'}`}
                        size={window.innerWidth < 640 ? "default" : "large"}
                      />
                    </motion.div>
                    
                    <Card
                      className={`${
                        message.type === 'user' 
                          ? 'bg-blue-600 text-white border-blue-500' 
                          : 'bg-white/80 backdrop-blur-sm text-gray-700 border-gray-200'
                      } shadow-lg`}
                      bodyStyle={{ padding: window.innerWidth < 640 ? '8px 12px' : '12px 16px' }}
                    >
                      {message.skill && (
                        <Badge 
                          count={message.skill} 
                          color="blue" 
                          className="mb-2"
                        />
                      )}
                      <Text className={`${message.type === 'user' ? 'text-white' : 'text-gray-700'} text-sm sm:text-base`}>
                        {message.content}
                      </Text>
                      <div className={`text-xs opacity-70 mt-1 sm:mt-2 ${message.type === 'user' ? 'text-white/70' : 'text-gray-500'}`}>
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {/* Typing Indicator - Mobile Responsive */}
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
                      <div className="flex space-x-1 p-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </Card>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Skill Selector - Mobile Responsive */}
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
                              className="bg-white/60 border-gray-200 hover:bg-white/80 hover:border-blue-300 cursor-pointer transition-all duration-200 shadow-md hover:shadow-lg h-full"
                              bodyStyle={{ padding: window.innerWidth < 640 ? '8px' : '12px' }}
                              onClick={() => handleSkillSelect(skill)}
                            >
                              <div className="text-center">
                                <div className={`text-lg sm:text-2xl text-${skill.color}-500 mb-1 sm:mb-2`}>
                                  {skill.icon}
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

      {/* Custom Scrollbar Styles - Mobile Responsive */}
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
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(59, 130, 246, 0.5);
          }
          
          @media (max-width: 640px) {
            .custom-scrollbar::-webkit-scrollbar {
              width: 3px;
            }
          }
        `
      }} />
    </div>
  );
}