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
      {/* Hero Section with YETI AI Introduction */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </motion.div>

        <motion.div 
          style={{ y: textY }}
          className="relative z-10 text-center max-w-6xl mx-auto px-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="flex justify-center mb-6">
              <RiveAnimation 
                src="/assets/untitled.riv"
                className="w-24 h-24 md:w-32 md:h-32"
                stateMachines="Main State Machine"
              />
            </div>
            
            <Title level={1} className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                YETI AI
              </span>
            </Title>
            
            <Title level={2} className="text-xl md:text-2xl lg:text-3xl text-gray-600 font-light mb-8">
              Your Intelligent Assistant with Smart AI Routing
            </Title>
            
            <Paragraph className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
              Experience the future of AI with intelligent routing across 8 model types, 
              16 specialized skills, and lightning-fast responses tailored to your needs.
            </Paragraph>

            <Space size="large" className="flex-wrap justify-center">
              <AuthButton 
                trigger={
                  <Button 
                    type="primary" 
                    size="large" 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 border-none hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                    icon={<RocketOutlined />}
                  >
                    Get Started Free
                  </Button>
                }
                dashboardTrigger={
                  <Button 
                    type="primary" 
                    size="large" 
                    className="bg-gradient-to-r from-green-600 to-emerald-600 border-none hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                    icon={<RocketOutlined />}
                  >
                    <Link to="/chat">Open YETI AI</Link>
                  </Button>
                }
              />
              <Button 
                size="large" 
                className="border-blue-300 text-blue-600 hover:bg-blue-50 transform hover:scale-105 transition-all duration-300"
              >
                Watch Demo
              </Button>
            </Space>
          </motion.div>
        </motion.div>
      </section>

      {/* AI Models Specialty Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Title level={2} className="text-3xl md:text-4xl font-bold mb-4">
              Our Specialty: 8 AI Model Types
            </Title>
            <Paragraph className="text-lg text-gray-600 max-w-3xl mx-auto">
              YETI AI intelligently routes your requests to the most suitable AI model type, 
              ensuring optimal performance for every task.
            </Paragraph>
          </motion.div>

          <Row gutter={[24, 24]}>
            {aiModels.map((model, index) => (
              <Col xs={24} sm={12} md={8} lg={6} key={model.name}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Card 
                    className="h-full text-center hover:shadow-lg transition-all duration-300 border-gray-200"
                    bodyStyle={{ padding: '24px' }}
                  >
                    <div 
                      className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-white text-2xl"
                      style={{ backgroundColor: model.color }}
                    >
                      {model.icon}
                    </div>
                    <Title level={4} className="mb-2">{model.name}</Title>
                    <Text className="text-gray-600">{model.description}</Text>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* API Serverless Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <CloudServerOutlined className="text-4xl text-white" />
              </div>
            </div>
            
            <Title level={2} className="text-white text-3xl md:text-4xl font-bold mb-4">
              Serverless API Architecture
            </Title>
            
            <Paragraph className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Built on modern serverless infrastructure for unlimited scalability, 
              zero downtime, and lightning-fast global response times.
            </Paragraph>

            <Row gutter={[32, 32]} className="mb-12">
              <Col xs={24} md={8}>
                <div className="text-center">
                  <ApiOutlined className="text-4xl text-white mb-4" />
                  <Title level={4} className="text-white">RESTful APIs</Title>
                  <Text className="text-white/80">Clean, documented APIs for seamless integration</Text>
                </div>
              </Col>
              <Col xs={24} md={8}>
                <div className="text-center">
                  <ThunderboltOutlined className="text-4xl text-white mb-4" />
                  <Title level={4} className="text-white">Real-time Processing</Title>
                  <Text className="text-white/80">Sub-second response times globally</Text>
                </div>
              </Col>
              <Col xs={24} md={8}>
                <div className="text-center">
                  <GlobalOutlined className="text-4xl text-white mb-4" />
                  <Title level={4} className="text-white">Global CDN</Title>
                  <Text className="text-white/80">Distributed worldwide for optimal performance</Text>
                </div>
              </Col>
            </Row>

            <AuthButton 
              trigger={
                <Button 
                  size="large" 
                  className="bg-white text-blue-600 border-none hover:bg-gray-100 transform hover:scale-105 transition-all duration-300"
                  icon={<ApiOutlined />}
                >
                  Access API Documentation
                </Button>
              }
              dashboardTrigger={
                <Button 
                  size="large" 
                  className="bg-white text-green-600 border-none hover:bg-gray-100 transform hover:scale-105 transition-all duration-300"
                  icon={<ApiOutlined />}
                >
                  <Link to="/chat">Try YETI API</Link>
                </Button>
              }
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Title level={2} className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Features
            </Title>
            <Paragraph className="text-lg text-gray-600 max-w-3xl mx-auto">
              Everything you need for intelligent AI interactions, from smart routing to specialized skills.
            </Paragraph>
          </motion.div>

          <Row gutter={[32, 32]}>
            {features.map((feature, index) => (
              <Col xs={24} md={12} lg={6} key={feature.title}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Card 
                    className="h-full text-center hover:shadow-lg transition-all duration-300"
                    bodyStyle={{ padding: '32px 24px' }}
                  >
                    <div 
                      className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${feature.color}20`, color: feature.color }}
                    >
                      {feature.icon}
                    </div>
                    <Title level={4} className="mb-3">{feature.title}</Title>
                    <Paragraph className="text-gray-600 mb-0">
                      {feature.description}
                    </Paragraph>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Title level={2} className="text-3xl md:text-4xl font-bold mb-8">
              Meet the Founder
            </Title>
            
            <Row justify="center">
              <Col xs={24} md={16} lg={12}>
                <Card 
                  className="text-center shadow-lg border-gray-200"
                  bodyStyle={{ padding: '48px 32px' }}
                >
                  <Avatar 
                    size={120} 
                    src="/assets/1000158361.jpg"
                    className="mb-6 border-4 border-blue-200"
                  />
                  
                  <Title level={3} className="mb-2">Yethikrishna R</Title>
                  <Text className="text-lg text-blue-600 font-medium mb-4 block">
                    Founder & AI Engineer
                  </Text>
                  
                  <Paragraph className="text-gray-600 text-base leading-relaxed mb-6">
                    Passionate about democratizing AI technology and making intelligent systems 
                    accessible to everyone. With expertise in machine learning, natural language processing, 
                    and distributed systems, Yethikrishna created YETI AI to bridge the gap between 
                    complex AI models and everyday users.
                  </Paragraph>

                  <Timeline className="text-left max-w-md mx-auto">
                    <Timeline.Item color="blue">
                      <Text strong>AI Research & Development</Text>
                      <br />
                      <Text type="secondary">Specialized in multi-model AI systems</Text>
                    </Timeline.Item>
                    <Timeline.Item color="purple">
                      <Text strong>Smart Routing Innovation</Text>
                      <br />
                      <Text type="secondary">Pioneered intelligent AI model selection</Text>
                    </Timeline.Item>
                    <Timeline.Item color="green">
                      <Text strong>YETI AI Launch</Text>
                      <br />
                      <Text type="secondary">Bringing AI to the masses</Text>
                    </Timeline.Item>
                  </Timeline>
                </Card>
              </Col>
            </Row>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Title level={2} className="text-white text-3xl md:text-4xl font-bold mb-4">
              Ready to Experience YETI AI?
            </Title>
            <Paragraph className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Join the AI revolution with intelligent routing, specialized skills, and lightning-fast responses.
            </Paragraph>
            
            <Space size="large" className="flex-wrap justify-center">
              <AuthButton 
                trigger={
                  <Button 
                    type="primary" 
                    size="large" 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 border-none hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                    icon={<RocketOutlined />}
                  >
                    Start Free Trial
                  </Button>
                }
                dashboardTrigger={
                  <Button 
                    type="primary" 
                    size="large" 
                    className="bg-gradient-to-r from-green-600 to-emerald-600 border-none hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                    icon={<RocketOutlined />}
                  >
                    <Link to="/chat">Launch YETI AI</Link>
                  </Button>
                }
              />
            </Space>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <Row gutter={[32, 32]}>
            <Col xs={24} md={8}>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                  YETI
                </div>
                <Title level={4} className="text-white mb-0">YETI AI</Title>
              </div>
              <Paragraph className="text-gray-400">
                The most intelligent AI assistant with smart routing across 8 model types 
                and 16 specialized skills.
              </Paragraph>
            </Col>
            
            <Col xs={24} md={8}>
              <Title level={5} className="text-white mb-4">Product</Title>
              <div className="space-y-2">
                <div><Link to="/chat" className="text-gray-400 hover:text-white transition-colors">Try YETI AI</Link></div>
                <div><a href="#" className="text-gray-400 hover:text-white transition-colors">API Documentation</a></div>
                <div><a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a></div>
              </div>
            </Col>
            
            <Col xs={24} md={8}>
              <Title level={5} className="text-white mb-4">Company</Title>
              <div className="space-y-2">
                <div><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></div>
                <div><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></div>
                <div><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a></div>
              </div>
            </Col>
          </Row>
          
          <Divider className="border-gray-700 my-8" />
          
          <div className="text-center">
            <Text className="text-gray-400">
              © 2025 YETI AI by Yethikrishna R. All rights reserved.
            </Text>
          </div>
        </div>
      </footer>
    </div>
  );
}