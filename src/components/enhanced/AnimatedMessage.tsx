import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Avatar, Badge, Typography } from 'antd';
import { TypingAnimation } from '@/components/animations/TypingAnimation';

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

// Simple typing effect component
const TypewriterText: React.FC<{ text: string; speed?: number }> = ({ text, speed = 50 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return <span>{displayText}</span>;
};

export const AnimatedMessage: React.FC<AnimatedMessageProps> = ({ message, isTyping = false }) => {
  const isUser = message.type === 'user';
  
  // Simple markdown-like formatting function
  const formatContent = (content: string) => {
    return content
      .split('\n')
      .map((line, index) => {
        // Handle bold text
        line = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-blue-700">$1</strong>');
        // Handle italic text
        line = line.replace(/\*(.*?)\*/g, '<em class="italic text-gray-600">$1</em>');
        // Handle code
        line = line.replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">$1</code>');
        
        return (
          <div key={index} className="mb-1 last:mb-0" dangerouslySetInnerHTML={{ __html: line }} />
        );
      });
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`flex items-start space-x-3 max-w-[80%] ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar */}
        <Avatar 
          src={isUser ? undefined : "/assets/1000158361.jpg"}
          className={`border-2 shadow-lg mt-1 ${isUser ? 'border-green-200' : 'border-blue-200'}`}
          size="large"
        >
          {isUser ? 'U' : undefined}
        </Avatar>
        
        {/* Message Content */}
        <div className={`relative ${isUser ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200'} rounded-2xl px-4 py-3 shadow-sm`}>
          {/* Message text with typing animation for AI */}
          {isUser ? (
            <Text className="text-white text-base leading-relaxed">
              {message.content}
            </Text>
          ) : (
            <div className="text-gray-800 text-base leading-relaxed">
              {isTyping ? (
                <div className="flex items-center space-x-2">
                  <TypewriterText text={message.content} speed={30} />
                  <TypingAnimation isTyping={true} size={16} variant="default" />
                </div>
              ) : (
                <div className="space-y-1">
                  {formatContent(message.content)}
                </div>
              )}
            </div>
          )}
          
          {/* Skill badge */}
          {message.skill && (
            <div className="mt-2">
              <Badge size="small" color="blue">
                {message.skill}
              </Badge>
            </div>
          )}
          
          {/* Timestamp */}
          <div className={`text-xs mt-2 ${isUser ? 'text-blue-100' : 'text-gray-500'}`}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};