import React from 'react';
import { motion } from 'framer-motion';
import { Button, Card, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

export default function Chat() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4"
    >
      <div className="container mx-auto max-w-4xl">
        <div className="text-center py-20">
          <Title level={1} className="text-5xl font-bold text-blue-600 mb-6">
            YETI AI Chat
          </Title>
          
          <Paragraph className="text-xl text-gray-600 mb-8">
            Chat with 8 different AI model types in one powerful platform
          </Paragraph>

          <Card className="max-w-2xl mx-auto p-8 shadow-lg">
            <Title level={3} className="text-gray-800 mb-4">
              Coming Soon: Interactive AI Chat
            </Title>
            
            <Paragraph className="text-gray-600 mb-6">
              We're building an amazing chat interface where you can interact with:
            </Paragraph>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="text-left">
                <div className="text-blue-600 font-semibold">🧠 Large Language Model</div>
                <div className="text-green-600 font-semibold">👁️ Vision-Language Model</div>
                <div className="text-yellow-600 font-semibold">⚡ Small Language Model</div>
                <div className="text-purple-600 font-semibold">🎯 Mixture of Experts</div>
              </div>
              <div className="text-left">
                <div className="text-cyan-600 font-semibold">💭 Large Concept Model</div>
                <div className="text-orange-600 font-semibold">🔍 Masked Language Model</div>
                <div className="text-red-600 font-semibold">🚀 Large Action Model</div>
                <div className="text-pink-600 font-semibold">✂️ Segment Anything Model</div>
              </div>
            </div>

            <Link to="/">
              <Button type="primary" size="large" className="bg-blue-600">
                Back to Home
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}