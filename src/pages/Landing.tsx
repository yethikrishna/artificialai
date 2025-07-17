import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router';
import { 
  BrainCircuit, 
  Zap, 
  Globe, 
  Shield, 
  Sparkles, 
  ArrowRight
} from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <motion.header 
        className="w-full py-4 px-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src="/assets/1000158361.jpg" 
              alt="YETI AI Logo" 
              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-blue-200 shadow-lg"
            />
            <div>
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                YETI AI
              </h1>
              <p className="text-xs text-gray-600 hidden md:block">Advanced AI Platform</p>
            </div>
          </div>
          <Link to="/chat">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Try Free <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section 
        className="py-12 md:py-20 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm">
            🚀 Free AI Platform - No Signup Required
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight">
            Meet YETI AI
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Experience the power of 8 specialized AI models in one platform. From creative writing to code generation, YETI AI adapts to your needs with intelligent model routing.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/chat">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 text-lg">
                Start Chatting Free
              </Button>
            </Link>
            <Badge variant="outline" className="px-4 py-2">
              ✨ No API Keys Required to Start
            </Badge>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <img 
              src="/assets/1000158361.jpg" 
              alt="YETI AI Platform" 
              className="w-32 h-32 md:w-48 md:h-48 mx-auto rounded-full object-cover border-4 border-blue-200 shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-100/20 to-transparent rounded-full"></div>
          </div>
        </div>
      </motion.section>

      {/* Founder Section */}
      <motion.section 
        className="py-16 px-4 bg-white/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">Meet the Founder</h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img 
              src="/assets/unnamed.jpg" 
              alt="Yethikrishna R." 
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-blue-200 shadow-lg"
            />
            <div className="text-left">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Yethikrishna R.</h3>
              <p className="text-lg text-gray-600 mb-4">Founder & AI Engineer</p>
              <p className="text-gray-600 leading-relaxed">
                Passionate about democratizing AI access, Yethikrishna created YETI AI to bring advanced AI capabilities to everyone, free of charge. With expertise in machine learning and a vision for accessible AI, YETI AI represents the future of intelligent assistance.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Model Specialties */}
      <motion.section 
        className="py-16 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">8 Specialized AI Models</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'LLM', desc: 'Large Language Models', icon: '🧠', color: 'from-blue-500 to-blue-600' },
              { name: 'VLM', desc: 'Vision-Language Models', icon: '👁️', color: 'from-purple-500 to-purple-600' },
              { name: 'SLM', desc: 'Small Language Models', icon: '⚡', color: 'from-green-500 to-green-600' },
              { name: 'MOE', desc: 'Mixture of Experts', icon: '🎯', color: 'from-orange-500 to-orange-600' },
              { name: 'LCM', desc: 'Large Concept Models', icon: '🌐', color: 'from-teal-500 to-teal-600' },
              { name: 'MLM', desc: 'Masked Language Models', icon: '🔍', color: 'from-pink-500 to-pink-600' },
              { name: 'LAM', desc: 'Large Action Models', icon: '🚀', color: 'from-indigo-500 to-indigo-600' },
              { name: 'SAM', desc: 'Segment Anything Models', icon: '✂️', color: 'from-red-500 to-red-600' }
            ].map((model, index) => (
              <motion.div
                key={model.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6 text-center">
                    <div className={`w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r ${model.color} flex items-center justify-center text-white text-xl`}>
                      {model.icon}
                    </div>
                    <h3 className="font-bold text-lg mb-2">{model.name}</h3>
                    <p className="text-sm text-gray-600">{model.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features */}
      <motion.section 
        className="py-16 px-4 bg-white/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Why Choose YETI AI?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="h-8 w-8" />,
                title: 'Lightning Fast',
                desc: 'Optimized for speed with intelligent model routing'
              },
              {
                icon: <Globe className="h-8 w-8" />,
                title: 'Always Free',
                desc: 'No subscriptions, no hidden costs, completely free'
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: 'Privacy First',
                desc: 'Your conversations are private and secure'
              },
              {
                icon: <BrainCircuit className="h-8 w-8" />,
                title: 'Smart Routing',
                desc: 'Automatically selects the best AI model for your task'
              },
              {
                icon: <Sparkles className="h-8 w-8" />,
                title: 'No Signup',
                desc: 'Start using immediately without registration'
              },
              {
                icon: <ArrowRight className="h-8 w-8" />,
                title: 'Easy to Use',
                desc: 'Simple interface, powerful capabilities'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="text-blue-600 mb-4">{feature.icon}</div>
                    <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience YETI AI?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of users who are already experiencing the future of AI assistance.
          </p>
          <Link to="/chat">
            <Button size="lg" variant="secondary" className="px-8 py-3 text-lg">
              Start Your Free Chat Now
            </Button>
          </Link>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 text-white">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <img 
              src="/assets/1000158361.jpg" 
              alt="YETI AI Logo" 
              className="w-8 h-8 rounded-full object-cover border border-gray-600"
            />
            <span className="font-bold">YETI AI</span>
          </div>
          <p className="text-gray-400 text-sm">
            © 2025 YETI AI. Built with ❤️ for the AI community.
          </p>
        </div>
      </footer>
    </div>
  );
}