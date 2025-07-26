import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input, Button, Card, Select, Badge, Typography } from 'antd';
import { 
  SendOutlined, 
  RobotOutlined, 
  UserOutlined,
  HomeOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { LiveAIActivation } from '@/components/LiveAIActivation';
import { FREE_API_MODELS } from '@/lib/api-clients';
import { AIRouter } from '@/lib/ai-router';
import { toast } from 'sonner';

const { Title, Text } = Typography;
const { Option } = Select;

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  modelType?: string;
  skill?: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<string>('');
  const [isLiveMode, setIsLiveMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const skills = [
    { value: 'writing', label: '✍️ Creative Writing', model: 'LLM' },
    { value: 'code', label: '💻 Code Generation', model: 'SLM' },
    { value: 'image', label: '🎨 Image Analysis', model: 'VLM' },
    { value: 'translate', label: '🌍 Translation', model: 'LCM' },
    { value: 'research', label: '🔍 Research & Analysis', model: 'MLM' },
    { value: 'ai', label: '🧠 Complex Reasoning', model: 'MOE' },
    { value: 'optimize', label: '🚀 Task Automation', model: 'LAM' },
    { value: 'design', label: '✂️ Visual Segmentation', model: 'SAM' }
  ];

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
      skill: selectedSkill
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      if (isLiveMode) {
        // Use AI Router for live responses
        const result = await AIRouter.routeMessage(inputValue, selectedSkill);
        
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: String(result.realResponse || result.error || 'No response generated'),
          timestamp: new Date(),
          modelType: result.selectedModel,
          skill: selectedSkill
        };

        setMessages(prev => [...prev, aiMessage]);
      } else {
        // Demo mode responses
        const demoResponses = {
          writing: "✍️ **Creative Writing Demo**: I'd love to help you write! In live mode, I can create stories, poems, articles, and any creative content you need. Activate live AI to unlock full creative capabilities!",
          code: "💻 **Code Generation Demo**: I can help with programming! In live mode, I generate code in any language, debug issues, and explain complex algorithms. Get your API key to start coding together!",
          image: "🎨 **Image Analysis Demo**: I can analyze and understand images! In live mode, I can describe images, extract text, identify objects, and even generate new images. Upload images in live mode!",
          translate: "🌍 **Translation Demo**: I speak many languages! In live mode, I can translate between dozens of languages with high accuracy and cultural context. Activate live AI for real translations!",
          research: "🔍 **Research Demo**: I'm great at analysis! In live mode, I can research topics, analyze data, summarize documents, and provide detailed insights. Get live access for real research!",
          ai: "🧠 **Complex Reasoning Demo**: I can handle complex problems! In live mode, I use advanced reasoning to solve multi-step problems, make decisions, and provide strategic thinking.",
          optimize: "🚀 **Task Automation Demo**: I can automate workflows! In live mode, I can help create automation scripts, optimize processes, and handle repetitive tasks efficiently.",
          design: "✂️ **Visual Segmentation Demo**: I can analyze visual elements! In live mode, I can segment images, detect objects, and provide detailed visual analysis."
        };

        const response = demoResponses[selectedSkill as keyof typeof demoResponses] || 
          "🤖 **YETI AI Demo Mode**: I'm ready to help! This is a demo response. Activate live AI with your Hugging Face API key to get real AI responses from 8 different model types. Each model specializes in different tasks - from creative writing to code generation to image analysis!";

        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: response,
          timestamp: new Date(),
          modelType: 'Demo',
          skill: selectedSkill
        };

        setMessages(prev => [...prev, aiMessage]);
      }
    } catch (error) {
      toast.error('Failed to get AI response');
      console.error('Chat error:', error);
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100"
    >
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button icon={<HomeOutlined />} type="text">
                  Home
                </Button>
              </Link>
              <Title level={3} className="m-0 text-blue-600">
                YETI AI Chat
              </Title>
              <Badge 
                status={isLiveMode ? "processing" : "default"} 
                text={isLiveMode ? "Live AI Active" : "Demo Mode"}
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <Select
                placeholder="Choose AI skill"
                value={selectedSkill}
                onChange={setSelectedSkill}
                style={{ width: 200 }}
                allowClear
              >
                {skills.map(skill => (
                  <Option key={skill.value} value={skill.value}>
                    <div className="flex items-center justify-between">
                      <span>{skill.label}</span>
                      <Badge size="small" color="blue">{skill.model}</Badge>
                    </div>
                  </Option>
                ))}
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Live AI Activation */}
        {!isLiveMode && (
          <div className="mb-6">
            <LiveAIActivation onActivation={setIsLiveMode} />
          </div>
        )}

        {/* Chat Messages */}
        <Card className="mb-6 shadow-lg">
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center py-12">
                <RobotOutlined className="text-6xl text-blue-300 mb-4" />
                <Title level={4} className="text-gray-500">
                  Welcome to YETI AI Chat!
                </Title>
                <Text className="text-gray-400">
                  Choose a skill and start chatting with AI models
                </Text>
              </div>
            )}

            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.type === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    <div className="flex items-center space-x-2 mb-1">
                      {message.type === 'user' ? (
                        <UserOutlined className="text-sm" />
                      ) : (
                        <RobotOutlined className="text-sm" />
                      )}
                      <Text className={`text-xs ${message.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                        {message.type === 'user' ? 'You' : `YETI AI ${message.modelType || 'Demo'}`}
                      </Text>
                      {message.skill && (
                        <Badge size="small" color="green">
                          {skills.find(s => s.value === message.skill)?.label.split(' ')[1] || message.skill}
                        </Badge>
                      )}
                    </div>
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    <Text className={`text-xs ${message.type === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                      {message.timestamp.toLocaleTimeString()}
                    </Text>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-gray-100 px-4 py-2 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <RobotOutlined className="text-blue-500" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </Card>

        {/* Input Area */}
        <Card className="shadow-lg">
          <div className="flex space-x-4">
            <Input.TextArea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here... (Press Enter to send)"
              autoSize={{ minRows: 2, maxRows: 4 }}
              className="flex-1"
            />
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={handleSendMessage}
              loading={isLoading}
              disabled={!inputValue.trim()}
              size="large"
              className="bg-blue-600"
            >
              Send
            </Button>
          </div>
          
          {selectedSkill && (
            <div className="mt-3 pt-3 border-t">
              <Text className="text-sm text-gray-500">
                Using: <Badge color="blue">{skills.find(s => s.value === selectedSkill)?.label}</Badge>
                {isLiveMode ? (
                  <span className="text-green-600 ml-2">• Live AI Active</span>
                ) : (
                  <span className="text-orange-600 ml-2">• Demo Mode (Activate Live AI for real responses)</span>
                )}
              </Text>
            </div>
          )}
        </Card>

        {/* Model Info */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(FREE_API_MODELS).map(([key, model]) => (
            <Card key={key} size="small" className="text-center">
              <div className="text-2xl mb-2">
                {key === 'LLM' && '🧠'}
                {key === 'VLM' && '👁️'}
                {key === 'SLM' && '⚡'}
                {key === 'MOE' && '🎯'}
                {key === 'LCM' && '💭'}
                {key === 'MLM' && '🔍'}
                {key === 'LAM' && '🚀'}
                {key === 'SAM' && '✂️'}
              </div>
              <Text strong className="text-xs">{key}</Text>
              <br />
              <Text className="text-xs text-gray-500">{model.name}</Text>
            </Card>
          ))}
        </div>
      </div>
    </motion.div>
  );
}