import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Button, 
  Card, 
  Typography, 
  Row, 
  Col, 
  Space, 
  Badge,
  Avatar,
  Divider,
  Timeline
} from 'antd';
import {
  RocketOutlined,
  ApiOutlined,
  ThunderboltOutlined,
  BulbOutlined,
  GlobalOutlined,
  CodeOutlined,
  StarOutlined,
  TeamOutlined,
  CloudServerOutlined,
  ExperimentOutlined
} from '@ant-design/icons';
import { AuthButton } from '@/components/auth/AuthButton';
import { RiveAnimation } from '@/components/RiveAnimation';
import { useLenis } from '@/hooks/use-lenis';
import { Link } from 'react-router';

const { Title, Paragraph, Text } = Typography;

export default function Landing() {
  useLenis(); // Smooth scrolling with Lenis
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);

  const aiModels = [
    { name: 'LLM', description: 'Large Language Models', icon: <BulbOutlined />, color: '#1890ff' },
    { name: 'VLM', description: 'Vision-Language Models', icon: <ExperimentOutlined />, color: '#722ed1' },
    { name: 'SLM', description: 'Small Language Models', icon: <ThunderboltOutlined />, color: '#52c41a' },
    { name: 'MOE', description: 'Mixture of Experts', icon: <TeamOutlined />, color: '#fa8c16' },
    { name: 'LCM', description: 'Large Concept Models', icon: <GlobalOutlined />, color: '#eb2f96' },
    { name: 'MLM', description: 'Masked Language Models', icon: <CodeOutlined />, color: '#13c2c2' },
    { name: 'LAM', description: 'Large Action Models', icon: <RocketOutlined />, color: '#f5222d' },
    { name: 'SAM', description: 'Segment Anything Models', icon: <StarOutlined />, color: '#faad14' }
  ];

  const features = [
    {
      title: 'Smart AI Routing',
      description: 'Intelligent routing across 8 different AI model types for optimal responses',
      icon: <BulbOutlined className="text-2xl" />,
      color: '#1890ff'
    },
    {
      title: '16 Specialized Skills',
      description: 'From coding to creative writing, image generation to data analysis',
      icon: <StarOutlined className="text-2xl" />,
      color: '#722ed1'
    },
    {
      title: 'Real-time Processing',
      description: 'Lightning-fast responses with contextual understanding',
      icon: <ThunderboltOutlined className="text-2xl" />,
      color: '#52c41a'
    },
    {
      title: 'Multi-language Support',
      description: 'Translate and communicate in 100+ languages instantly',
      icon: <GlobalOutlined className="text-2xl" />,
      color: '#fa8c16'
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section with YETI AI Introduction - Enhanced Responsive */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 sm:w-36 sm:h-36 md:w-48 md:h-48 bg-purple-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </motion.div>

        <motion.div 
          style={{ y: textY }}
          className="relative z-10 text-center max-w-7xl mx-auto w-full"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-6 sm:mb-8"
          >
            <div className="flex justify-center mb-4 sm:mb-6">
              <RiveAnimation 
                src="/assets/untitled.riv"
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32"
                stateMachines="Main State Machine"
              />
            </div>
            
            <Title level={1} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-4 px-2">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                YETI AI
              </span>
            </Title>
            
            <Title level={2} className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 font-light mb-6 sm:mb-8 px-4">
              Your Intelligent Assistant with Smart AI Routing
            </Title>
            
            <Paragraph className="text-base sm:text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-6 sm:mb-8 px-4">
              Experience the future of AI with intelligent routing across 8 model types, 
              16 specialized skills, and lightning-fast responses tailored to your needs.
            </Paragraph>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center px-4">
              <AuthButton 
                trigger={
                  <Button 
                    type="primary" 
                    size="large" 
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 border-none hover:shadow-lg transform hover:scale-105 transition-all duration-300 h-12 sm:h-auto text-base sm:text-lg px-6 sm:px-8"
                    icon={<RocketOutlined />}
                  >
                    Get Started Free
                  </Button>
                }
                dashboardTrigger={
                  <Button 
                    type="primary" 
                    size="large" 
                    className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-emerald-600 border-none hover:shadow-lg transform hover:scale-105 transition-all duration-300 h-12 sm:h-auto text-base sm:text-lg px-6 sm:px-8"
                    icon={<RocketOutlined />}
                  >
                    <Link to="/chat">Open YETI AI</Link>
                  </Button>
                }
              />
              <Button 
                size="large" 
                className="w-full sm:w-auto border-blue-300 text-blue-600 hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 h-12 sm:h-auto text-base sm:text-lg px-6 sm:px-8"
              >
                Watch Demo
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* AI Models Specialty Section - Enhanced Responsive */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <Title level={2} className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-4">
              Our Specialty: 8 AI Model Types
            </Title>
            <Paragraph className="text-base sm:text-lg text-gray-600 max-w-4xl mx-auto px-4">
              YETI AI intelligently routes your requests to the most suitable AI model type, 
              ensuring optimal performance for every task.
            </Paragraph>
          </motion.div>

          <Row gutter={[16, 16]} className="sm:gutter-24">
            {aiModels.map((model, index) => (
              <Col xs={12} sm={12} md={8} lg={6} xl={6} key={model.name}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Card 
                    className="h-full text-center hover:shadow-lg transition-all duration-300 border-gray-200"
                    bodyStyle={{ padding: '16px 12px' }}
                  >
                    <div 
                      className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center text-white text-lg sm:text-xl md:text-2xl"
                      style={{ backgroundColor: model.color }}
                    >
                      {model.icon}
                    </div>
                    <Title level={5} className="mb-1 sm:mb-2 text-sm sm:text-base">{model.name}</Title>
                    <Text className="text-gray-600 text-xs sm:text-sm leading-tight">{model.description}</Text>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* API Serverless Section - Enhanced Responsive */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-white/20 rounded-full flex items-center justify-center">
                <CloudServerOutlined className="text-2xl sm:text-3xl md:text-4xl text-white" />
              </div>
            </div>
            
            <Title level={2} className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-4">
              Serverless API Architecture
            </Title>
            
            <Paragraph className="text-lg sm:text-xl text-white/90 max-w-4xl mx-auto mb-8 sm:mb-12 px-4">
              Built on modern serverless infrastructure for unlimited scalability, 
              zero downtime, and lightning-fast global response times.
            </Paragraph>

            <Row gutter={[16, 24]} className="mb-8 sm:mb-12">
              <Col xs={24} sm={8} md={8}>
                <div className="text-center px-4">
                  <ApiOutlined className="text-3xl sm:text-4xl text-white mb-3 sm:mb-4" />
                  <Title level={5} className="text-white text-base sm:text-lg">RESTful APIs</Title>
                  <Text className="text-white/80 text-sm sm:text-base">Clean, documented APIs for seamless integration</Text>
                </div>
              </Col>
              <Col xs={24} sm={8} md={8}>
                <div className="text-center px-4">
                  <ThunderboltOutlined className="text-3xl sm:text-4xl text-white mb-3 sm:mb-4" />
                  <Title level={5} className="text-white text-base sm:text-lg">Real-time Processing</Title>
                  <Text className="text-white/80 text-sm sm:text-base">Sub-second response times globally</Text>
                </div>
              </Col>
              <Col xs={24} sm={8} md={8}>
                <div className="text-center px-4">
                  <GlobalOutlined className="text-3xl sm:text-4xl text-white mb-3 sm:mb-4" />
                  <Title level={5} className="text-white text-base sm:text-lg">Global CDN</Title>
                  <Text className="text-white/80 text-sm sm:text-base">Distributed worldwide for optimal performance</Text>
                </div>
              </Col>
            </Row>

            <div className="px-4">
              <AuthButton 
                trigger={
                  <Button 
                    size="large" 
                    className="w-full sm:w-auto bg-white text-blue-600 border-none hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 h-12 sm:h-auto text-base sm:text-lg px-6 sm:px-8"
                    icon={<ApiOutlined />}
                  >
                    Access API Documentation
                  </Button>
                }
                dashboardTrigger={
                  <Button 
                    size="large" 
                    className="w-full sm:w-auto bg-white text-green-600 border-none hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 h-12 sm:h-auto text-base sm:text-lg px-6 sm:px-8"
                    icon={<ApiOutlined />}
                  >
                    <Link to="/chat">Try YETI API</Link>
                  </Button>
                }
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section - Enhanced Responsive */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <Title level={2} className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-4">
              Powerful Features
            </Title>
            <Paragraph className="text-base sm:text-lg text-gray-600 max-w-4xl mx-auto px-4">
              Everything you need for intelligent AI interactions, from smart routing to specialized skills.
            </Paragraph>
          </motion.div>

          <Row gutter={[16, 24]} className="sm:gutter-32">
            {features.map((feature, index) => (
              <Col xs={24} sm={12} md={12} lg={6} key={feature.title}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Card 
                    className="h-full text-center hover:shadow-lg transition-all duration-300"
                    bodyStyle={{ padding: '24px 16px' }}
                  >
                    <div 
                      className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${feature.color}20`, color: feature.color }}
                    >
                      {feature.icon}
                    </div>
                    <Title level={5} className="mb-2 sm:mb-3 text-base sm:text-lg">{feature.title}</Title>
                    <Paragraph className="text-gray-600 mb-0 text-sm sm:text-base leading-relaxed">
                      {feature.description}
                    </Paragraph>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Founder Section - Enhanced Responsive with Your Image */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Title level={2} className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 px-4">
              Meet the Founder
            </Title>
            
            <Row justify="center">
              <Col xs={24} sm={20} md={16} lg={12} xl={10}>
                <Card 
                  className="text-center shadow-lg border-gray-200"
                  bodyStyle={{ padding: '32px 24px' }}
                >
                  <Avatar 
                    size={{ xs: 80, sm: 100, md: 120, lg: 140 }}
                    src="/assets/unnamed.jpg"
                    className="mb-4 sm:mb-6 border-4 border-blue-200 mx-auto"
                  />
                  
                  <Title level={3} className="mb-1 sm:mb-2 text-xl sm:text-2xl">Yethikrishna R</Title>
                  <Text className="text-base sm:text-lg text-blue-600 font-medium mb-4 sm:mb-6 block">
                    Founder & AI Engineer
                  </Text>
                  
                  <Paragraph className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 px-2">
                    Passionate about democratizing AI technology and making intelligent systems 
                    accessible to everyone. With expertise in machine learning, natural language processing, 
                    and distributed systems, Yethikrishna created YETI AI to bridge the gap between 
                    complex AI models and everyday users.
                  </Paragraph>

                  <Timeline className="text-left max-w-sm mx-auto">
                    <Timeline.Item color="blue">
                      <Text strong className="text-sm sm:text-base">AI Research & Development</Text>
                      <br />
                      <Text type="secondary" className="text-xs sm:text-sm">Specialized in multi-model AI systems</Text>
                    </Timeline.Item>
                    <Timeline.Item color="purple">
                      <Text strong className="text-sm sm:text-base">Smart Routing Innovation</Text>
                      <br />
                      <Text type="secondary" className="text-xs sm:text-sm">Pioneered intelligent AI model selection</Text>
                    </Timeline.Item>
                    <Timeline.Item color="green">
                      <Text strong className="text-sm sm:text-base">YETI AI Launch</Text>
                      <br />
                      <Text type="secondary" className="text-xs sm:text-sm">Bringing AI to the masses</Text>
                    </Timeline.Item>
                  </Timeline>
                </Card>
              </Col>
            </Row>
          </motion.div>
        </div>
      </section>

      {/* Call to Action - Enhanced Responsive */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-slate-900 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Title level={2} className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-4">
              Ready to Experience YETI AI?
            </Title>
            <Paragraph className="text-lg sm:text-xl text-white/90 max-w-4xl mx-auto mb-6 sm:mb-8 px-4">
              Join the AI revolution with intelligent routing, specialized skills, and lightning-fast responses.
            </Paragraph>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center px-4">
              <AuthButton 
                trigger={
                  <Button 
                    type="primary" 
                    size="large" 
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 border-none hover:shadow-lg transform hover:scale-105 transition-all duration-300 h-12 sm:h-auto text-base sm:text-lg px-6 sm:px-8"
                    icon={<RocketOutlined />}
                  >
                    Start Free Trial
                  </Button>
                }
                dashboardTrigger={
                  <Button 
                    type="primary" 
                    size="large" 
                    className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-emerald-600 border-none hover:shadow-lg transform hover:scale-105 transition-all duration-300 h-12 sm:h-auto text-base sm:text-lg px-6 sm:px-8"
                    icon={<RocketOutlined />}
                  >
                    <Link to="/chat">Launch YETI AI</Link>
                  </Button>
                }
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer - Enhanced Responsive */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Row gutter={[24, 32]}>
            <Col xs={24} sm={24} md={8}>
              <div className="flex items-center justify-center md:justify-start mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-3 text-sm sm:text-base">
                  YETI
                </div>
                <Title level={4} className="text-white mb-0 text-lg sm:text-xl">YETI AI</Title>
              </div>
              <Paragraph className="text-gray-400 text-center md:text-left text-sm sm:text-base">
                The most intelligent AI assistant with smart routing across 8 model types 
                and 16 specialized skills.
              </Paragraph>
            </Col>
            
            <Col xs={12} sm={12} md={8}>
              <Title level={5} className="text-white mb-4 text-center md:text-left text-base sm:text-lg">Product</Title>
              <div className="space-y-2 text-center md:text-left">
                <div><Link to="/chat" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">Try YETI AI</Link></div>
                <div><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">API Documentation</a></div>
                <div><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">Features</a></div>
              </div>
            </Col>
            
            <Col xs={12} sm={12} md={8}>
              <Title level={5} className="text-white mb-4 text-center md:text-left text-base sm:text-lg">Company</Title>
              <div className="space-y-2 text-center md:text-left">
                <div><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">About</a></div>
                <div><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">Contact</a></div>
                <div><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">Privacy</a></div>
              </div>
            </Col>
          </Row>
          
          <Divider className="border-gray-700 my-6 sm:my-8" />
          
          <div className="text-center">
            <Text className="text-gray-400 text-xs sm:text-sm">
              © 2025 YETI AI by Yethikrishna R. All rights reserved.
            </Text>
          </div>
        </div>
      </footer>
    </div>
  );
}