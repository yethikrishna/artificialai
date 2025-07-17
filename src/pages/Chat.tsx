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

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `I understand you want help with ${selectedSkill?.name || 'general assistance'}. I'm processing your request using the most suitable AI model from my collection of LLMs, VLMs, SLMs, and specialized models. Here's my response...`,
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Header with Enhanced YETI Branding */}
      <motion.header 
        className="bg-slate-900/80 backdrop-blur-xl border-b border-white/10 px-6 py-4 relative z-10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Animated Mountain Icon */}
              <motion.div 
                className="text-4xl"
                animate={{
                  rotateY: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                🏔️
              </motion.div>
              
              {/* YETI Wordmark with Snow Effect */}
              <div className="relative">
                <motion.div 
                  className="text-3xl font-bold text-white tracking-wider relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  YETI
                </motion.div>
                
                {/* Snow particles effect */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white/60 rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [0, 20, 0],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>
              </div>
              
              {/* AI Badge */}
              <motion.div
                className="bg-blue-500/20 backdrop-blur-sm px-3 py-1 rounded-full border border-blue-400/30"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Text className="text-blue-300 text-xs font-medium">AI</Text>
              </motion.div>
            </motion.div>
            
            {/* Enhanced Navigation */}
            <nav className="hidden md:flex items-center space-x-6 ml-8">
              {[
                { name: 'Explore', icon: '🧭' },
                { name: 'Skills', icon: '⚡' },
                { name: 'Research', icon: '🔬' },
                { name: 'Create', icon: '🎨' }
              ].map((item, index) => (
                <motion.a
                  key={item.name}
                  href="#"
                  className="text-white/80 hover:text-white transition-colors duration-200 font-medium flex items-center space-x-2"
                  whileHover={{ y: -2, scale: 1.05 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </motion.a>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Badge count={16} color="blue" className="animate-pulse">
                <Button type="text" className="text-white border-white/20 hover:bg-white/10">
                  <span className="mr-2">🧠</span>
                  Skills Available
                </Button>
              </Badge>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Avatar 
                src="/assets/unnamed.jpg" 
                size="default"
                className="border-2 border-blue-400/50 shadow-lg shadow-blue-500/20"
              />
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Main Chat Interface */}
      <div className="flex flex-col h-[calc(100vh-80px)] relative z-10">
        {/* Messages Area with Enhanced Animations */}
        <div className="flex-1 overflow-y-auto px-4 py-6 custom-scrollbar">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Welcome Animation */}
            {messages.length === 1 && (
              <motion.div
                className="text-center py-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <motion.div
                  className="text-6xl mb-4"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  🤖
                </motion.div>
                <Title level={3} className="text-white/90 mb-2">
                  Welcome to YETI AI
                </Title>
                <Text className="text-white/70">
                  Powered by 8 different AI model types
                </Text>
              </motion.div>
            )}

            <AnimatePresence mode="popLayout">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ 
                    duration: 0.4,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Avatar 
                        src={message.type === 'ai' ? '/assets/unnamed.jpg' : undefined}
                        icon={message.type === 'user' ? <RobotOutlined /> : undefined}
                        className={`${message.type === 'ai' ? 'border-2 border-blue-400 shadow-lg shadow-blue-500/20' : 'bg-blue-600 shadow-lg shadow-blue-600/20'}`}
                        size="large"
                      />
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Card
                        className={`${
                          message.type === 'user' 
                            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white border-blue-500 shadow-lg shadow-blue-600/20' 
                            : 'bg-white/10 backdrop-blur-xl text-white border-white/20 shadow-lg shadow-black/10'
                        } transition-all duration-300`}
                        bodyStyle={{ padding: '16px 20px' }}
                      >
                        {message.skill && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="mb-2"
                          >
                            <Badge 
                              count={message.skill} 
                              color="blue" 
                              className="animate-pulse"
                            />
                          </motion.div>
                        )}
                        <Text className={message.type === 'user' ? 'text-white' : 'text-white'}>
                          {message.content}
                        </Text>
                        <div className="text-xs opacity-70 mt-2 flex items-center space-x-2">
                          <span>{message.timestamp.toLocaleTimeString()}</span>
                          {message.type === 'ai' && (
                            <motion.span
                              className="flex items-center space-x-1"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.5 }}
                            >
                              <span className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></span>
                              <span className="text-green-400 text-xs">AI</span>
                            </motion.span>
                          )}
                        </div>
                      </Card>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {/* Enhanced Typing Indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="flex justify-start"
                >
                  <div className="flex items-center space-x-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Avatar 
                        src="/assets/unnamed.jpg" 
                        className="border-2 border-blue-400 shadow-lg shadow-blue-500/20"
                        size="large"
                      />
                    </motion.div>
                    <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-lg">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="w-2 h-2 bg-blue-400 rounded-full"
                              animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 1, 0.5],
                              }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: i * 0.2,
                                ease: "easeInOut"
                              }}
                            />
                          ))}
                        </div>
                        <Text className="text-white/70 text-xs">YETI is thinking...</Text>
                      </div>
                    </Card>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Enhanced Skill Selector */}
        <AnimatePresence>
          {showSkillSelector && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="mx-4 mb-4"
            >
              <Card className="bg-slate-900/90 backdrop-blur-xl border-white/20 max-w-4xl mx-auto shadow-2xl">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      className="text-2xl"
                    >
                      ⚡
                    </motion.div>
                    <Title level={4} className="text-white mb-0">Select Your AI Skill</Title>
                    <Badge count="16 Available" color="blue" className="animate-pulse" />
                  </div>
                  
                  {Object.entries(skillCategories).map(([category, categorySkills], categoryIndex) => (
                    <motion.div 
                      key={category} 
                      className="mb-6"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: categoryIndex * 0.1 }}
                    >
                      <div className="flex items-center space-x-2 mb-3">
                        <Text className="text-white/90 font-semibold">{category}</Text>
                        <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent"></div>
                      </div>
                      <Row gutter={[12, 12]}>
                        {categorySkills.map((skill, skillIndex) => (
                          <Col xs={12} sm={8} md={6} key={skill.id}>
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                              whileHover={{ 
                                scale: 1.05,
                                rotateY: 5,
                                z: 10
                              }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Card
                                className="bg-white/5 border-white/10 hover:bg-white/15 hover:border-white/30 cursor-pointer transition-all duration-300 group shadow-lg hover:shadow-xl"
                                bodyStyle={{ padding: '16px' }}
                                onClick={() => handleSkillSelect(skill)}
                              >
                                <div className="text-center">
                                  <motion.div 
                                    className={`text-3xl text-${skill.color}-400 mb-3 group-hover:scale-110 transition-transform duration-200`}
                                    whileHover={{ rotate: 10 }}
                                  >
                                    {skill.icon}
                                  </motion.div>
                                  <Text className="text-white text-sm font-medium block mb-2">
                                    {skill.name}
                                  </Text>
                                  <motion.div
                                    className="bg-white/10 rounded-full px-2 py-1 mb-2"
                                    whileHover={{ scale: 1.05 }}
                                  >
                                    <Text className="text-white/80 text-xs">
                                      {skill.shortcut}
                                    </Text>
                                  </motion.div>
                                  <Text className="text-white/60 text-xs leading-tight">
                                    {skill.description}
                                  </Text>
                                </div>
                              </Card>
                            </motion.div>
                          </Col>
                        ))}
                      </Row>
                    </motion.div>
                  ))}
                </motion.div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Input Area */}
        <motion.div 
          className="border-t border-white/10 bg-slate-900/80 backdrop-blur-xl p-6 relative"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
                style={{
                  left: `${20 + i * 30}%`,
                  top: '20%',
                }}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          <div className="max-w-4xl mx-auto relative z-10">
            <div className="flex items-end space-x-4">
              {selectedSkill && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="mb-2"
                >
                  <Badge 
                    count={selectedSkill.name} 
                    color="blue" 
                    className="animate-pulse shadow-lg"
                  />
                </motion.div>
              )}
              
              <div className="flex-1">
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <TextArea
                    ref={inputRef}
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message... Use @ or / to select skills"
                    className="bg-white/10 border-white/20 text-white placeholder-white/50 resize-none backdrop-blur-sm shadow-lg hover:bg-white/15 focus:bg-white/15 transition-all duration-300"
                    autoSize={{ minRows: 1, maxRows: 4 }}
                  />
                </motion.div>
                <div className="flex justify-between items-center mt-3">
                  <Text className="text-white/50 text-xs flex items-center space-x-2">
                    <span>Press @ or / for skills</span>
                    <span>•</span>
                    <span>Enter to send</span>
                    <span>•</span>
                    <span>Shift+Enter for new line</span>
                  </Text>
                  <Space>
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Text className="text-white/50 text-xs flex items-center space-x-1">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        <span>16 AI models ready</span>
                      </Text>
                    </motion.div>
                  </Space>
                </div>
              </div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="h-12 px-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 border-blue-600 shadow-lg shadow-blue-600/20 transition-all duration-300"
                  size="large"
                >
                  Send
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 3px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(59, 130, 246, 0.5);
            border-radius: 3px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(59, 130, 246, 0.7);
          }
        `
      }} />
    </div>
  );
}