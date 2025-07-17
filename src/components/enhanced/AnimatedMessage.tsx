import { motion, AnimatePresence } from "framer-motion";
import { Card, Avatar, Badge, Typography } from "antd";
import { RobotOutlined } from "@ant-design/icons";
import { MessageAnimation } from "@/components/animations/MessageAnimation";
import { TypingAnimation } from "@/components/animations/TypingAnimation";
import { usePersonalization } from "@/components/enhanced/PersonalizationProvider";

const { Text } = Typography;

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  skill?: string;
}

interface AnimatedMessageProps {
  message: Message;
  isTyping?: boolean;
}

export function AnimatedMessage({ message, isTyping = false }: AnimatedMessageProps) {
  const { settings } = usePersonalization();

  const messageVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: settings.animationsEnabled ? 0.3 : 0,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      scale: 0.95,
      transition: {
        duration: settings.animationsEnabled ? 0.2 : 0
      }
    }
  };

  const avatarVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: {
        duration: settings.animationsEnabled ? 0.5 : 0,
        delay: 0.1,
        type: "spring",
        stiffness: 200
      }
    }
  };

  return (
    <motion.div
      variants={messageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`flex items-start space-x-2 sm:space-x-3 max-w-[85%] sm:max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
        <motion.div
          variants={avatarVariants}
          whileHover={settings.animationsEnabled ? { scale: 1.1, rotate: 5 } : {}}
          whileTap={settings.animationsEnabled ? { scale: 0.9 } : {}}
        >
          <Avatar 
            src={message.type === 'ai' ? '/assets/1000158361.jpg' : undefined}
            icon={message.type === 'user' ? <RobotOutlined /> : undefined}
            className={`${message.type === 'ai' ? 'border-2 border-blue-200 shadow-lg' : 'bg-blue-600 shadow-lg'}`}
            size={window.innerWidth < 640 ? "default" : "large"}
          />
          
          {/* Message Animation Overlay */}
          {settings.animationsEnabled && (
            <div className="absolute inset-0 pointer-events-none">
              <MessageAnimation 
                messageType={message.type}
                isVisible={true}
                className="w-full h-full"
              />
            </div>
          )}
        </motion.div>
        
        <motion.div
          whileHover={settings.animationsEnabled ? { scale: 1.02 } : {}}
          transition={{ duration: 0.2 }}
        >
          <Card
            className={`${
              message.type === 'user' 
                ? 'bg-blue-600 text-white border-blue-500' 
                : 'bg-white/80 backdrop-blur-sm text-gray-700 border-gray-200'
            } shadow-lg transition-all duration-300`}
            bodyStyle={{ padding: window.innerWidth < 640 ? '8px 12px' : '12px 16px' }}
          >
            {message.skill && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Badge 
                  count={message.skill} 
                  color="blue" 
                  className="mb-2"
                />
              </motion.div>
            )}
            
            <div className="relative">
              <Text className={`${message.type === 'user' ? 'text-white' : 'text-gray-700'} text-sm sm:text-base`}>
                {message.content}
              </Text>
              
              {/* Typing Animation for AI messages */}
              {isTyping && message.type === 'ai' && settings.animationsEnabled && (
                <div className="absolute right-0 bottom-0">
                  <TypingAnimation isTyping={true} speed="medium" />
                </div>
              )}
            </div>
            
            <div className={`text-xs opacity-70 mt-1 sm:mt-2 ${message.type === 'user' ? 'text-white/70' : 'text-gray-500'}`}>
              {message.timestamp.toLocaleTimeString()}
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
