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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header - Updated to match landing page style */}
      <motion.header 
        className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-6 py-4 shadow-sm"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className="w-10 h-10 rounded-lg overflow-hidden border-2 border-blue-200 shadow-lg"
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
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent tracking-wider">
                YETI
              </div>
              <div className="text-xl font-light text-gray-600">AI</div>
            </motion.div>
            
            <nav className="hidden md:flex items-center space-x-6 ml-8">
              {['Explore', 'Skills', 'Research', 'Create'].map((item) => (
                <motion.a
                  key={item}
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
                  whileHover={{ y: -2 }}
                >
                  {item}
                </motion.a>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge count={16} color="blue">
              <Button type="default" className="border-blue-200 text-blue-600 hover:border-blue-400">
                Skills Available
              </Button>
            </Badge>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Avatar 
                src="/assets/1000158361.jpg" 
                size="default"
                className="border-2 border-blue-200 shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Main Chat Interface */}
      <div className="flex flex-col h-[calc(100vh-80px)]">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 py-6 custom-scrollbar">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Welcome Message */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center py-8"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="inline-block mb-4"
              >
                <Avatar 
                  src="/assets/1000158361.jpg" 
                  className="border-4 border-blue-200 shadow-xl"
                  size={80}
                />
              </motion.div>
              <Title level={3} className="text-gray-700 mb-2">
                Hello, I am Yeti by Yethikrishna R
              </Title>
              <Text className="text-gray-600 text-lg">
                I can help you with 16 different AI capabilities. Type @ or / to see all available skills!
              </Text>
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
                  <div className={`flex items-start space-x-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Avatar 
                        src={message.type === 'ai' ? '/assets/1000158361.jpg' : undefined}
                        icon={message.type === 'user' ? <RobotOutlined /> : undefined}
                        className={`${message.type === 'ai' ? 'border-2 border-blue-200 shadow-lg' : 'bg-blue-600 shadow-lg'}`}
                        size="large"
                      />
                    </motion.div>
                    
                    <Card
                      className={`${
                        message.type === 'user' 
                          ? 'bg-blue-600 text-white border-blue-500' 
                          : 'bg-white/80 backdrop-blur-sm text-gray-700 border-gray-200'
                      } shadow-lg`}
                      bodyStyle={{ padding: '12px 16px' }}
                    >
                      {message.skill && (
                        <Badge 
                          count={message.skill} 
                          color="blue" 
                          className="mb-2"
                        />
                      )}
                      <Text className={message.type === 'user' ? 'text-white' : 'text-gray-700'}>
                        {message.content}
                      </Text>
                      <div className={`text-xs opacity-70 mt-2 ${message.type === 'user' ? 'text-white/70' : 'text-gray-500'}`}>
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {/* Typing Indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex justify-start"
                >
                  <div className="flex items-center space-x-3">
                    <Avatar src="/assets/1000158361.jpg" className="border-2 border-blue-200 shadow-lg" />
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

        {/* Skill Selector */}
        <AnimatePresence>
          {showSkillSelector && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mx-4 mb-4"
            >
              <Card className="bg-white/90 backdrop-blur-sm border-gray-200 shadow-xl max-w-4xl mx-auto">
                <Title level={5} className="text-gray-700 mb-4">Select a Skill</Title>
                
                {Object.entries(skillCategories).map(([category, categorySkills]) => (
                  <div key={category} className="mb-6">
                    <Text className="text-gray-600 font-medium mb-3 block">{category}</Text>
                    <Row gutter={[12, 12]}>
                      {categorySkills.map((skill) => (
                        <Col xs={12} sm={8} md={6} key={skill.id}>
                          <motion.div
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Card
                              className="bg-white/60 border-gray-200 hover:bg-white/80 hover:border-blue-300 cursor-pointer transition-all duration-200 shadow-md hover:shadow-lg"
                              bodyStyle={{ padding: '12px' }}
                              onClick={() => handleSkillSelect(skill)}
                            >
                              <div className="text-center">
                                <div className={`text-2xl text-${skill.color}-500 mb-2`}>
                                  {skill.icon}
                                </div>
                                <Text className="text-gray-700 text-xs font-medium block mb-1">
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

        {/* Input Area */}
        <motion.div 
          className="border-t border-gray-200 bg-white/80 backdrop-blur-sm p-4 shadow-lg"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end space-x-4">
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
                  placeholder="Type your message... Use @ or / to select skills"
                  className="bg-white/80 border-gray-300 text-gray-700 placeholder-gray-500 resize-none focus:border-blue-400 focus:ring-blue-400"
                  autoSize={{ minRows: 1, maxRows: 4 }}
                />
                <div className="flex justify-between items-center mt-2">
                  <Text className="text-gray-500 text-xs">
                    Press @ or / for skills • Enter to send • Shift+Enter for new line
                  </Text>
                  <Space>
                    <Text className="text-gray-500 text-xs">16 AI models ready</Text>
                  </Space>
                </div>
              </div>
              
              <Button
                type="primary"
                icon={<SendOutlined />}
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="h-10 px-6 bg-blue-600 hover:bg-blue-700 border-blue-600 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Send
              </Button>
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
            background: rgba(0, 0, 0, 0.05);
            border-radius: 3px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(59, 130, 246, 0.3);
            border-radius: 3px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(59, 130, 246, 0.5);
          }
        `
      }} />
    </div>
  );
}