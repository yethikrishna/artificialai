import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Button, 
  Card, 
  Typography, 
  Space, 
  Row, 
  Col, 
  Badge,
  Divider,
  Avatar
} from 'antd';
import { 
  RocketOutlined, 
  BankOutlined, 
  EyeOutlined, 
  ThunderboltOutlined,
  BulbOutlined,
  SearchOutlined,
  ToolOutlined,
  ScissorOutlined,
  ArrowRightOutlined,
  StarOutlined,
  CheckCircleOutlined,
  ApiOutlined
} from '@ant-design/icons';
import { Link } from "react-router-dom";

const { Title, Paragraph, Text } = Typography;

// Hero Section Component
const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <motion.section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
      style={{ y, opacity }}
    >
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge.Ribbon text="Free AI Platform" color="blue" className="mb-8">
            <div className="inline-block">
              <Title level={1} className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
                YETI AI
              </Title>
            </div>
          </Badge.Ribbon>
          
          <Title level={2} className="text-2xl md:text-4xl text-gray-700 mb-8 font-light">
            8 AI Model Types. One Powerful Platform.
          </Title>
          
          <Paragraph className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Experience the future of AI with our comprehensive platform featuring Large Language Models, 
            Vision AI, Small Language Models, and 5 other cutting-edge AI technologies. All free to use.
          </Paragraph>

          <Space size="large" className="mb-16">
            <Link to="/chat">
              <Button 
                type="primary" 
                size="large" 
                icon={<RocketOutlined />}
                className="bg-gradient-to-r from-blue-500 to-purple-600 border-none h-14 px-8 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Start Chatting Now
              </Button>
            </Link>
            <Button 
              size="large" 
              icon={<ApiOutlined />}
              className="h-14 px-8 text-lg font-semibold border-2 border-blue-500 text-blue-600 hover:bg-blue-50 transform hover:scale-105 transition-all duration-300"
              onClick={() => document.getElementById('models')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Models
            </Button>
          </Space>

          {/* Stats */}
          <Row gutter={[32, 16]} className="max-w-2xl mx-auto">
            <Col span={8}>
              <div className="text-center">
                <Title level={2} className="text-blue-600 mb-2">8</Title>
                <Text className="text-gray-600">AI Model Types</Text>
              </div>
            </Col>
            <Col span={8}>
              <div className="text-center">
                <Title level={2} className="text-purple-600 mb-2">∞</Title>
                <Text className="text-gray-600">Free Usage</Text>
              </div>
            </Col>
            <Col span={8}>
              <div className="text-center">
                <Title level={2} className="text-indigo-600 mb-2">24/7</Title>
                <Text className="text-gray-600">Available</Text>
              </div>
            </Col>
          </Row>
        </motion.div>
      </div>
    </motion.section>
  );
};

// AI Models Section
const AIModelsSection = () => {
  const models = [
    {
      icon: <BankOutlined className="text-4xl text-blue-500" />,
      title: "Large Language Model (LLM)",
      description: "Advanced conversational AI with deep reasoning capabilities",
      features: ["Natural conversations", "Complex reasoning", "Creative writing", "Code generation"],
      color: "blue"
    },
    {
      icon: <EyeOutlined className="text-4xl text-green-500" />,
      title: "Vision-Language Model (VLM)",
      description: "Multimodal AI that understands both images and text",
      features: ["Image analysis", "Visual reasoning", "OCR capabilities", "Scene understanding"],
      color: "green"
    },
    {
      icon: <ThunderboltOutlined className="text-4xl text-yellow-500" />,
      title: "Small Language Model (SLM)",
      description: "Fast, efficient AI for quick responses and edge computing",
      features: ["Lightning fast", "Low latency", "Edge deployment", "Efficient processing"],
      color: "yellow"
    },
    {
      icon: <BulbOutlined className="text-4xl text-purple-500" />,
      title: "Mixture of Experts (MOE)",
      description: "Intelligent routing to specialized AI models",
      features: ["Smart routing", "Specialized tasks", "Optimal efficiency", "Expert selection"],
      color: "purple"
    },
    {
      icon: <SearchOutlined className="text-4xl text-cyan-500" />,
      title: "Large Concept Model (LCM)",
      description: "Semantic understanding and multilingual processing",
      features: ["Semantic search", "Translation", "Concept mapping", "Multilingual"],
      color: "cyan"
    },
    {
      icon: <ToolOutlined className="text-4xl text-orange-500" />,
      title: "Masked Language Model (MLM)",
      description: "Text analysis, classification, and sentiment understanding",
      features: ["Text classification", "Sentiment analysis", "Entity extraction", "Pattern recognition"],
      color: "orange"
    },
    {
      icon: <RocketOutlined className="text-4xl text-red-500" />,
      title: "Large Action Model (LAM)",
      description: "AI that takes action and executes complex tasks",
      features: ["Task automation", "Workflow execution", "Action planning", "System operations"],
      color: "red"
    },
    {
      icon: <ScissorOutlined className="text-4xl text-pink-500" />,
      title: "Segment Anything Model (SAM)",
      description: "Precise computer vision and image segmentation",
      features: ["Image segmentation", "Object detection", "Mask generation", "Visual analysis"],
      color: "pink"
    }
  ];

  return (
    <section id="models" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Title level={2} className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            8 Powerful AI Model Types
          </Title>
          <Paragraph className="text-xl text-gray-600 max-w-3xl mx-auto">
            From conversational AI to computer vision, our platform provides access to the most 
            advanced AI technologies available today.
          </Paragraph>
        </motion.div>

        <Row gutter={[24, 24]}>
          {models.map((model, index) => (
            <Col xs={24} md={12} lg={6} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card 
                  className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50"
                  bodyStyle={{ padding: '24px' }}
                >
                  <div className="text-center mb-4">
                    {model.icon}
                  </div>
                  <Title level={4} className="text-center mb-3 text-gray-800">
                    {model.title}
                  </Title>
                  <Paragraph className="text-gray-600 text-center mb-4">
                    {model.description}
                  </Paragraph>
                  <div className="space-y-2">
                    {model.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center">
                        <CheckCircleOutlined className={`text-${model.color}-500 mr-2`} />
                        <Text className="text-sm text-gray-600">{feature}</Text>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link to="/chat">
            <Button 
              type="primary" 
              size="large" 
              icon={<ArrowRightOutlined />}
              className="bg-gradient-to-r from-blue-500 to-purple-600 border-none h-12 px-8 text-lg font-semibold"
            >
              Try All Models Now
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

// Founder Section
const FounderSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Row gutter={[48, 48]} align="middle">
            <Col xs={24} lg={12}>
              <div className="text-center lg:text-left">
                <Badge color="blue" text="Meet the Founder" className="mb-4" />
                <Title level={2} className="text-4xl font-bold text-gray-800 mb-6">
                  Built by AI Enthusiasts, For Everyone
                </Title>
                <Paragraph className="text-lg text-gray-600 mb-8 leading-relaxed">
                  YETI AI was created with a simple mission: make advanced AI accessible to everyone. 
                  Our platform democratizes access to cutting-edge AI technologies that were previously 
                  available only to large corporations and research institutions.
                </Paragraph>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <StarOutlined className="text-yellow-500 mr-3" />
                    <Text className="text-gray-700">8 different AI model types in one platform</Text>
                  </div>
                  <div className="flex items-center">
                    <CheckCircleOutlined className="text-green-500 mr-3" />
                    <Text className="text-gray-700">Completely free to use with no hidden costs</Text>
                  </div>
                  <div className="flex items-center">
                    <RocketOutlined className="text-blue-500 mr-3" />
                    <Text className="text-gray-700">Continuously updated with latest AI advances</Text>
                  </div>
                </div>
                <Link to="/chat">
                  <Button 
                    type="primary" 
                    size="large" 
                    icon={<ArrowRightOutlined />}
                    className="bg-blue-600 border-blue-600 h-12 px-8 text-lg font-semibold"
                  >
                    Start Your AI Journey
                  </Button>
                </Link>
              </div>
            </Col>
            <Col xs={24} lg={12}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <div className="relative inline-block">
                  <Avatar 
                    size={300}
                    src="/assets/unnamed.jpg"
                    className="shadow-2xl border-4 border-white"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg">
                    <BankOutlined className="text-2xl" />
                  </div>
                </div>
                <div className="mt-8">
                  <Title level={3} className="text-gray-800 mb-2">AI Innovation Leader</Title>
                  <Text className="text-gray-600 text-lg">Democratizing AI for Everyone</Text>
                </div>
              </motion.div>
            </Col>
          </Row>
        </motion.div>
      </div>
    </section>
  );
};

// CTA Section
const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Title level={2} className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Experience the Future of AI?
          </Title>
          <Paragraph className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
            Join thousands of users who are already exploring the possibilities with YETI AI. 
            Start your journey into the world of advanced artificial intelligence today.
          </Paragraph>
          <Space size="large">
            <Link to="/chat">
              <Button 
                type="primary" 
                size="large" 
                icon={<RocketOutlined />}
                className="bg-white text-blue-600 border-white h-14 px-8 text-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300"
              >
                Start Chatting Now
              </Button>
            </Link>
            <Button 
              size="large" 
              icon={<ApiOutlined />}
              className="h-14 px-8 text-lg font-semibold border-2 border-white text-white hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Learn More
            </Button>
          </Space>
        </motion.div>
      </div>
    </section>
  );
};

// Main Landing Page Component
export default function Landing() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AIModelsSection />
      <FounderSection />
      <CTASection />
      
      {/* Custom CSS for animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `
      }} />
    </div>
  );
}