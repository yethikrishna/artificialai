// TODO: THIS IS THE LANDING PAGE THAT THE USER WILL ALWAYS FIRST SEE. make sure to update this page
// Make sure that the marketing text always reflects the app marketing. create an aesthetic properly-designed landing page that fits the theme of the app
// start completely from scratch to make this landing page using aesthetic design principles and tailwind styling to create a unique and thematic landing page.

import { motion } from "framer-motion";
import { Button, Card, Typography, Space, Row, Col, Divider } from "antd";
import { RocketOutlined, ThunderboltOutlined, StarOutlined } from "@ant-design/icons";
import { RiveAnimation } from "@/components/RiveAnimation";

const { Title, Paragraph } = Typography;

export default function Landing() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100"
    >
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Title level={1} className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Revolutionary UI/UX Experience
            </Title>
            <Paragraph className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Experience buttery-smooth scrolling with Lenis, powerful components with Ant Design 5.0, 
              and real-time animations with Rive - all working together seamlessly.
            </Paragraph>
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
                className="h-12 px-8 text-lg"
              >
                Get Started
              </Button>
              <Button 
                size="large" 
                icon={<StarOutlined />}
                className="h-12 px-8 text-lg"
              >
                Learn More
              </Button>
            </Space>
          </motion.div>

          {/* Rive Animation Placeholder */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="w-full max-w-md mx-auto h-64 bg-white rounded-2xl shadow-lg flex items-center justify-center"
          >
            <div className="text-center">
              <ThunderboltOutlined className="text-6xl text-blue-500 mb-4" />
              <Paragraph className="text-gray-500">
                Rive Animation Placeholder
                <br />
                <small>Add your .riv file to see real-time animations</small>
              </Paragraph>
            </div>
          </motion.div>
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
              Powerful Technologies Combined
            </Title>
            <Paragraph className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three cutting-edge technologies working in perfect harmony to deliver 
              an unparalleled user experience.
            </Paragraph>
          </motion.div>

          <Row gutter={[32, 32]}>
            <Col xs={24} md={8}>
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Card 
                  className="h-full text-center hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm"
                  bodyStyle={{ padding: '2rem' }}
                >
                  <div className="text-5xl mb-4">🚀</div>
                  <Title level={3} className="mb-4">Lenis Smooth Scrolling</Title>
                  <Paragraph className="text-gray-600">
                    Buttery-smooth scrolling experience with advanced easing and 
                    gesture controls for the most natural feel.
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
                  className="h-full text-center hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm"
                  bodyStyle={{ padding: '2rem' }}
                >
                  <div className="text-5xl mb-4">🎨</div>
                  <Title level={3} className="mb-4">Ant Design 5.0</Title>
                  <Paragraph className="text-gray-600">
                    Enterprise-class UI design language with a complete set of 
                    high-quality React components.
                  </Paragraph>
                </Card>
              </motion.div>
            </Col>

            <Col xs={24} md={8}>
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Card 
                  className="h-full text-center hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm"
                  bodyStyle={{ padding: '2rem' }}
                >
                  <div className="text-5xl mb-4">⚡</div>
                  <Title level={3} className="mb-4">Rive Animations</Title>
                  <Paragraph className="text-gray-600">
                    Real-time animations with state machines and interactive 
                    graphics for revolutionary user experiences.
                  </Paragraph>
                </Card>
              </motion.div>
            </Col>
          </Row>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 px-4 bg-white/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Title level={2} className="text-4xl font-bold mb-8">
              Experience the Difference
            </Title>
            <Paragraph className="text-xl text-gray-600 mb-12">
              Scroll through this page to feel the smooth Lenis scrolling, 
              interact with Ant Design components, and see how everything 
              works together seamlessly.
            </Paragraph>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[1, 2, 3].map((item) => (
              <Card
                key={item}
                className="hover:shadow-lg transition-all duration-300 cursor-pointer"
                bodyStyle={{ padding: '1.5rem' }}
                onClick={() => console.log(`Card ${item} clicked`)}
              >
                <div className="text-3xl mb-4">🎯</div>
                <Title level={4}>Interactive Element {item}</Title>
                <Paragraph className="text-gray-600">
                  Click me to see smooth interactions powered by our tech stack.
                </Paragraph>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* Footer */}
      <footer className="py-12 text-center">
        <Paragraph className="text-gray-500">
          Built with ❤️ using Lenis, Ant Design 5.0, and Rive
        </Paragraph>
      </footer>
    </motion.div>
  );
}