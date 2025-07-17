import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Button, Input, Alert, Badge, Typography, Space, Divider } from 'antd';
import { 
  ThunderboltOutlined, 
  KeyOutlined, 
  CheckCircleOutlined, 
  ExclamationCircleOutlined,
  RocketOutlined,
  ApiOutlined,
  BulbOutlined
} from '@ant-design/icons';
import { YetiAPIClient } from '@/lib/api-clients';
import { toast } from 'sonner';

const { Title, Text, Paragraph } = Typography;

interface LiveAIActivationProps {
  onActivation?: (isActive: boolean) => void;
  className?: string;
}

export const LiveAIActivation: React.FC<LiveAIActivationProps> = ({ 
  onActivation, 
  className = "" 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [isActivating, setIsActivating] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<Record<string, boolean>>({});
  const [apiClient] = useState(new YetiAPIClient());

  // Check initial status
  useEffect(() => {
    const checkStatus = async () => {
      const isLive = apiClient.isLive();
      setIsActive(isLive);
      
      if (isLive) {
        const status = await apiClient.testConnections();
        setConnectionStatus(status);
      }
      
      onActivation?.(isLive);
    };
    
    checkStatus();
  }, [apiClient, onActivation]);

  const handleActivation = async () => {
    if (!apiKey.trim()) {
      toast.error('Please enter your Hugging Face API key');
      return;
    }

    setIsActivating(true);
    
    try {
      // Enable live mode
      apiClient.enableLiveMode(apiKey);
      
      // Test connections
      const status = await apiClient.testConnections();
      setConnectionStatus(status);
      
      const successCount = Object.values(status).filter(Boolean).length;
      
      if (successCount > 0) {
        setIsActive(true);
        setIsExpanded(false);
        onActivation?.(true);
        
        toast.success(`🚀 Live AI Activated! ${successCount}/8 models ready`, {
          description: 'YETI AI is now powered by real AI models',
          duration: 5000,
        });
      } else {
        toast.error('Failed to connect to AI models. Please check your API key.');
      }
      
    } catch (error) {
      console.error('Activation error:', error);
      toast.error('Activation failed. Please try again.');
    } finally {
      setIsActivating(false);
    }
  };

  const modelTypes = [
    { key: 'LLM', name: 'Large Language Model', icon: '🧠' },
    { key: 'VLM', name: 'Vision-Language Model', icon: '👁️' },
    { key: 'SLM', name: 'Small Language Model', icon: '⚡' },
    { key: 'MOE', name: 'Mixture of Experts', icon: '🎯' },
    { key: 'LCM', name: 'Large Concept Model', icon: '💭' },
    { key: 'MLM', name: 'Masked Language Model', icon: '🔍' },
    { key: 'LAM', name: 'Large Action Model', icon: '🚀' },
    { key: 'SAM', name: 'Segment Anything Model', icon: '✂️' }
  ];

  if (isActive) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`${className}`}
      >
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Badge status="processing" />
              <div>
                <Text className="text-green-700 font-semibold">Live AI Active</Text>
                <div className="text-xs text-green-600">
                  {Object.values(connectionStatus).filter(Boolean).length}/8 models ready
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {modelTypes.slice(0, 4).map(model => (
                <div
                  key={model.key}
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    connectionStatus[model.key] 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-400'
                  }`}
                  title={`${model.name}: ${connectionStatus[model.key] ? 'Ready' : 'Offline'}`}
                >
                  {model.icon}
                </div>
              ))}
              <Button 
                type="text" 
                size="small"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-green-600"
              >
                {isExpanded ? 'Hide' : 'Details'}
              </Button>
            </div>
          </div>
          
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-4 pt-4 border-t border-green-200"
              >
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {modelTypes.map(model => (
                    <div
                      key={model.key}
                      className={`p-2 rounded-lg text-center ${
                        connectionStatus[model.key]
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      <div className="text-lg mb-1">{model.icon}</div>
                      <div className="text-xs font-medium">{model.key}</div>
                      <div className="text-xs">
                        {connectionStatus[model.key] ? '✓ Ready' : '○ Offline'}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${className}`}
    >
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 hover:shadow-lg transition-shadow">
        <div className="text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4"
          >
            <ThunderboltOutlined className="text-2xl text-blue-600" />
          </motion.div>
          
          <Title level={4} className="text-blue-800 mb-2">
            Activate Live AI (Recommended)
          </Title>
          
          <Paragraph className="text-blue-600 mb-4">
            Get free API keys from Hugging Face & Groq<br/>
            Test real AI responses with all 8 model types<br/>
            Experience the full YETI AI capabilities
          </Paragraph>
          
          <AnimatePresence>
            {!isExpanded ? (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Button
                  type="primary"
                  size="large"
                  icon={<RocketOutlined />}
                  onClick={() => setIsExpanded(true)}
                  className="bg-blue-600 hover:bg-blue-700 border-blue-600"
                >
                  Activate Live AI
                </Button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4"
              >
                <Alert
                  message="Quick Setup Instructions"
                  description={
                    <div className="space-y-2 text-left">
                      <div>1. Visit <a href="https://huggingface.co/join" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">huggingface.co/join</a> (free account)</div>
                      <div>2. Go to <a href="https://huggingface.co/settings/tokens" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Settings → Access Tokens</a></div>
                      <div>3. Create a token with "read" permissions</div>
                      <div>4. Paste your token below and activate!</div>
                    </div>
                  }
                  type="info"
                  showIcon
                  icon={<BulbOutlined />}
                />
                
                <Space.Compact style={{ width: '100%' }}>
                  <Input
                    placeholder="Paste your Hugging Face API key here..."
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    prefix={<KeyOutlined />}
                    type="password"
                    size="large"
                  />
                  <Button
                    type="primary"
                    size="large"
                    loading={isActivating}
                    onClick={handleActivation}
                    icon={isActivating ? undefined : <CheckCircleOutlined />}
                    className="bg-green-600 hover:bg-green-700 border-green-600"
                  >
                    {isActivating ? 'Activating...' : 'Activate'}
                  </Button>
                </Space.Compact>
                
                <div className="flex justify-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <ApiOutlined />
                    <span>8 AI Models</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ThunderboltOutlined />
                    <span>Real-time</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircleOutlined />
                    <span>Free Tier</span>
                  </div>
                </div>
                
                <Button
                  type="text"
                  onClick={() => setIsExpanded(false)}
                  className="text-gray-500"
                >
                  Cancel
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </motion.div>
  );
};

export default LiveAIActivation;
