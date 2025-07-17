import { motion } from "framer-motion";
import { Button, Card, Typography, Space, Row, Col, Divider, Badge, Avatar } from "antd";
import { 
  RocketOutlined, 
  ThunderboltOutlined, 
  StarOutlined,
  BulbOutlined,
  EyeOutlined,
  ApiOutlined,
  CloudOutlined,
  SettingOutlined,
  BookOutlined,
  ToolOutlined,
  ScanOutlined
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

export default function Landing() {
  const modelTypes = [
    {
      icon: <BulbOutlined className="text-4xl text-blue-500" />,
      title: "LLMs",
      subtitle: "Large Language Models",
      description: "Advanced text generation and understanding with GPT-class capabilities",
      color: "blue"
    },
    {
      icon: <CloudOutlined className="text-4xl text-purple-500" />,
      title: "LCMs", 
      subtitle: "Large Concept Models",
      description: "Sentence-level semantic understanding across languages and modalities",
      color: "purple"
    },
    {
      icon: <EyeOutlined className="text-4xl text-green-500" />,
      title: "VLMs",
      subtitle: "Vision-Language Models", 
      description: "Multimodal AI that understands both images and text seamlessly",
      color: "green"
    },
    {
      icon: <ThunderboltOutlined className="text-4xl text-orange-500" />,
      title: "SLMs",
      subtitle: "Small Language Models",
      description: "Efficient edge computing with fast inference and low latency",
      color: "orange"
    },
    {
      icon: <ApiOutlined className="text-4xl text-red-500" />,
      title: "MoE",
      subtitle: "Mixture of Experts",
      description: "Intelligent routing to specialized models for optimal performance",
      color: "red"
    },
    {
      icon: <BookOutlined className="text-4xl text-cyan-500" />,
      title: "MLMs",
      subtitle: "Masked Language Models",
      description: "Bidirectional context understanding for deep text analysis",
      color: "cyan"
    },
    {
      icon: <ToolOutlined className="text-4xl text-pink-500" />,
      title: "LAMs",
      subtitle: "Large Action Models",
      description: "AI that takes action - from automation to task execution",
      color: "pink"
    },
    {
      icon: <ScanOutlined className="text-4xl text-indigo-500" />,
      title: "SAMs",
      subtitle: "Segment Anything Models",
      description: "Precise computer vision segmentation for any object or region",
      color: "indigo"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
    >
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center justify-center mb-6">
              <motion.div
                className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-blue-200 shadow-2xl mr-6"
                whileHover={{ scale: 1.1, rotate: 5 }}
                animate={{
                  rotateY: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <img 
                  src="/assets/1000158361.jpg" 
                  alt="YETI AI Logo" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div>
                <div className="text-8xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  YETI
                </div>
                <div className="text-6xl font-light text-gray-600 text-center">AI</div>
              </div>
            </div>
            
            <Title level={2} className="text-3xl font-medium mb-6 text-gray-700 max-w-4xl mx-auto">
              The Ultimate AI Platform - 8 Model Types, Infinite Possibilities
            </Title>
            
            <Paragraph className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Experience the future of AI with our intelligent routing system that seamlessly connects you to 
              <Text strong> LLMs, LCMs, VLMs, SLMs, MoE, MLMs, LAMs, and SAMs</Text> - all through one beautiful interface.
              Fast inference meets powerful capabilities.
            </Paragraph>

            <div className="flex items-center justify-center mb-8">
              <Badge count="FREE" color="green" className="mr-4">
                <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-green-200">
                  <Text className="text-green-700 font-medium">🚀 Serverless APIs Only</Text>
                </div>
              </Badge>
              <Badge count="FAST" color="blue">
                <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-200">
                  <Text className="text-blue-700 font-medium">⚡ Smart Routing</Text>
                </div>
              </Badge>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12"
          >
            <Space size="large">
              <Button 
                type="primary" 
                size="large" 
                icon={<RocketOutlined />}
                className="h-14 px-8 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => window.location.href = '/chat'}
              >
                Try YETI AI Now
              </Button>
              <Button 
                size="large" 
                icon={<StarOutlined />}
                className="h-14 px-8 text-lg font-medium border-2 hover:border-primary transition-all duration-300"
              >
                Explore Models
              </Button>
            </Space>
          </motion.div>

          {/* AI Model Types Grid */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto"
          >
            {modelTypes.map((model, index) => (
              <motion.div
                key={model.title}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              >
                <Card
                  className="h-full text-center hover:shadow-xl transition-all duration-300 cursor-pointer border-0 bg-white/60 backdrop-blur-sm hover:bg-white/80"
                  bodyStyle={{ padding: '1.5rem 1rem' }}
                >
                  <div className="mb-3">{model.icon}</div>
                  <Title level={5} className="mb-1 font-bold">{model.title}</Title>
                  <Text className="text-xs text-gray-500 block mb-2">{model.subtitle}</Text>
                  <Paragraph className="text-xs text-gray-600 mb-0 leading-tight">
                    {model.description}
                  </Paragraph>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Title level={2} className="text-4xl font-bold mb-4">
              How YETI AI Works
            </Title>
            <Paragraph className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our intelligent routing system analyzes your request and instantly connects you 
              to the most suitable AI model - no complexity, just results.
            </Paragraph>
          </motion.div>

          <Row gutter={[32, 32]}>
            <Col xs={24} md={8}>
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Card 
                  className="h-full text-center hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-indigo-50"
                  bodyStyle={{ padding: '2.5rem' }}
                >
                  <div className="text-6xl mb-4">🎯</div>
                  <Title level={3} className="mb-4 text-blue-700">Smart Analysis</Title>
                  <Paragraph className="text-gray-600 text-base">
                    Fast inference models analyze your prompt in milliseconds to understand 
                    intent, complexity, and optimal routing path.
                  </Paragraph>
                </Card>
              </motion.div>
            </Col>

            <Col xs={24} md={8}>
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card 
                  className="h-full text-center hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 to-pink-50"
                  bodyStyle={{ padding: '2.5rem' }}
                >
                  <div className="text-6xl mb-4">🔀</div>
                  <Title level={3} className="mb-4 text-purple-700">Intelligent Routing</Title>
                  <Paragraph className="text-gray-600 text-base">
                    Automatically routes to the perfect model type - whether you need vision, 
                    language, actions, or specialized processing.
                  </Paragraph>
                </Card>
              </motion.div>
            </Col>

            <Col xs={24} md={8}>
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Card 
                  className="h-full text-center hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-emerald-50"
                  bodyStyle={{ padding: '2.5rem' }}
                >
                  <div className="text-6xl mb-4">⚡</div>
                  <Title level={3} className="mb-4 text-green-700">Instant Results</Title>
                  <Paragraph className="text-gray-600 text-base">
                    Get powerful AI responses without the complexity. One interface, 
                    eight model types, infinite possibilities.
                  </Paragraph>
                </Card>
              </motion.div>
            </Col>
          </Row>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Title level={2} className="text-4xl font-bold mb-4">
              Why Choose YETI AI?
            </Title>
            <Paragraph className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built for developers, researchers, and innovators who demand the best AI capabilities 
              without the infrastructure complexity.
            </Paragraph>
          </motion.div>

          <Row gutter={[24, 24]}>
            {[
              {
                icon: "🆓",
                title: "Completely Free",
                description: "Built entirely on free serverless APIs. No hidden costs, no subscriptions."
              },
              {
                icon: "🚀",
                title: "Lightning Fast",
                description: "Optimized routing ensures you get results in milliseconds, not minutes."
              },
              {
                icon: "🧠",
                title: "8 Model Types",
                description: "Access to LLMs, VLMs, SLMs, MoE, LCMs, MLMs, LAMs, and SAMs in one platform."
              },
              {
                icon: "🎯",
                title: "Smart Routing",
                description: "AI automatically selects the best model for your specific task."
              },
              {
                icon: "🌐",
                title: "No Setup Required",
                description: "Start using advanced AI immediately - no API keys, no configuration."
              },
              {
                icon: "🔒",
                title: "Privacy First",
                description: "Your data stays secure with enterprise-grade privacy protection."
              }
            ].map((feature, index) => (
              <Col xs={24} sm={12} lg={8} key={index}>
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    className="h-full hover:shadow-lg transition-all duration-300 border border-gray-100"
                    bodyStyle={{ padding: '2rem' }}
                  >
                    <div className="text-4xl mb-4">{feature.icon}</div>
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
      <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Title level={2} className="text-4xl font-bold mb-8">
              Meet the Founder
            </Title>
            
            <Card 
              className="max-w-2xl mx-auto shadow-xl border-0 bg-white/80 backdrop-blur-sm"
              bodyStyle={{ padding: '3rem' }}
            >
              <Avatar 
                size={120} 
                src="/assets/unnamed.jpg" 
                className="mb-6 border-4 border-blue-200"
              >
                YR
              </Avatar>
              
              <Title level={3} className="mb-2 text-blue-700">
                Yethikrishna R
              </Title>
              
              <Text className="text-lg text-gray-600 block mb-4">
                Founder & AI Architect
              </Text>
              
              <Paragraph className="text-gray-700 text-base leading-relaxed">
                Passionate about democratizing AI access, Yethikrishna created YETI AI to bridge 
                the gap between complex AI capabilities and user-friendly interfaces. With a vision 
                of making advanced AI accessible to everyone, YETI AI represents the future of 
                intelligent, multi-modal AI platforms.
              </Paragraph>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Title level={2} className="text-4xl font-bold mb-6 text-white">
              Ready to Experience the Future of AI?
            </Title>
            <Paragraph className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of developers and researchers already using YETI AI 
              to unlock the full potential of artificial intelligence.
            </Paragraph>
            
            <Space size="large">
              <Button 
                type="primary" 
                size="large" 
                icon={<RocketOutlined />}
                className="h-14 px-8 text-lg font-medium bg-white text-blue-600 border-white hover:bg-blue-50 hover:text-blue-700"
                onClick={() => window.location.href = '/chat'}
              >
                Start Using YETI AI
              </Button>
              <Button 
                size="large" 
                icon={<StarOutlined />}
                className="h-14 px-8 text-lg font-medium text-white border-white hover:bg-white/10"
              >
                View Documentation
              </Button>
            </Space>
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* Footer */}
      <footer className="py-12 text-center bg-gray-50">
        <Paragraph className="text-gray-500 mb-4">
          Built with ❤️ using Lenis, Ant Design 5.0, and Rive
        </Paragraph>
        <Paragraph className="text-gray-400 text-sm">
          YETI AI - Democratizing Advanced AI for Everyone
        </Paragraph>
      </footer>
    </motion.div>
  );
}