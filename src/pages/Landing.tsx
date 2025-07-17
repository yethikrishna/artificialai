import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AuthButton } from "@/components/auth/AuthButton";
import { 
  Brain, 
  Zap, 
  Globe, 
  Code, 
  Image, 
  MessageSquare, 
  Search,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Rocket,
  Shield,
  Cpu,
  Target
} from "lucide-react";
import { Link } from "react-router";

export default function Landing() {
  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Smart AI Routing",
      description: "8 AI model types with intelligent routing for optimal responses",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "16 AI Skills",
      description: "Writing, coding, image generation, translation, and more",
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Multi-Language",
      description: "Translate between 100+ languages instantly",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Code Assistant",
      description: "Debug, optimize, and generate code in any language",
      color: "from-orange-500 to-red-600"
    },
    {
      icon: <Image className="w-6 h-6" />,
      title: "Visual AI",
      description: "Create and analyze images with advanced vision models",
      color: "from-cyan-500 to-blue-600"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Real-time Chat",
      description: "Instant responses with contextual understanding",
      color: "from-violet-500 to-purple-600"
    }
  ];

  const stats = [
    { number: "8", label: "AI Models", icon: <Cpu className="w-4 h-4" /> },
    { number: "16", label: "Skills", icon: <Target className="w-4 h-4" /> },
    { number: "100+", label: "Languages", icon: <Globe className="w-4 h-4" /> },
    { number: "24/7", label: "Available", icon: <Shield className="w-4 h-4" /> }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Developer",
      content: "YETI AI has revolutionized my coding workflow. The smart routing always picks the perfect model for my needs.",
      avatar: "SC"
    },
    {
      name: "Marcus Rodriguez",
      role: "Content Creator",
      content: "From writing to image generation, YETI handles everything. It's like having a creative team in my pocket.",
      avatar: "MR"
    },
    {
      name: "Dr. Emily Watson",
      role: "Researcher",
      content: "The research capabilities are incredible. YETI helps me analyze data and generate insights faster than ever.",
      avatar: "EW"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <motion.nav 
        className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                YETI
              </div>
              <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                YETI AI
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                How it Works
              </a>
              <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                Testimonials
              </a>
            </div>

            {/* CTA Button */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <AuthButton 
                trigger={
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 sm:px-6 py-2 text-sm sm:text-base">
                    Get Started
                  </Button>
                }
                dashboardTrigger={
                  <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 sm:px-6 py-2 text-sm sm:text-base">
                    <Link to="/chat">Open YETI</Link>
                  </Button>
                }
              />
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-4 sm:mb-6 bg-blue-100 text-blue-700 border-blue-200 px-3 sm:px-4 py-1 text-xs sm:text-sm">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Powered by 8 AI Model Types
              </Badge>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                Meet{" "}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  YETI AI
                </span>
                <br className="hidden sm:block" />
                Your Intelligent Assistant
              </h1>
              
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 leading-relaxed px-4 sm:px-0">
                Experience the future of AI with smart routing across 8 model types, 
                16 specialized skills, and lightning-fast responses tailored to your needs.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="flex items-center justify-center mb-2">
                      <div className="p-2 bg-blue-100 rounded-full text-blue-600 mr-2">
                        {stat.icon}
                      </div>
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.number}</div>
                    <div className="text-sm sm:text-base text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                <AuthButton 
                  trigger={
                    <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-base sm:text-lg">
                      Start Chatting Now
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  }
                  dashboardTrigger={
                    <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 text-base sm:text-lg">
                      <Link to="/chat" className="flex items-center">
                        Open YETI AI
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Link>
                    </Button>
                  }
                />
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 text-base sm:text-lg">
                  Watch Demo
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-32 sm:w-64 h-32 sm:h-64 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-24 sm:w-48 h-24 sm:h-48 bg-purple-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Powerful AI Features
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
              YETI AI combines multiple AI models to give you the best possible experience for every task
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 sm:p-8">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center text-white mb-4 sm:mb-6`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-12 sm:py-20 lg:py-32 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              How YETI AI Works
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
              Our intelligent routing system automatically selects the best AI model for your specific task
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            {[
              {
                step: "1",
                title: "Input Analysis",
                description: "YETI analyzes your message to understand the task type, complexity, and requirements",
                icon: <Search className="w-6 h-6" />
              },
              {
                step: "2",
                title: "Smart Routing",
                description: "Our AI router selects the optimal model from 8 different types based on your needs",
                icon: <Brain className="w-6 h-6" />
              },
              {
                step: "3",
                title: "Instant Response",
                description: "Get the best possible answer with lightning-fast processing and contextual understanding",
                icon: <Zap className="w-6 h-6" />
              }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative mb-6 sm:mb-8">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white border-2 border-blue-600 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed px-2 sm:px-0">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-12 sm:py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              What Users Say
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
              Join thousands of satisfied users who have transformed their workflow with YETI AI
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-gray-200 hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6 sm:p-8">
                    <div className="flex items-center mb-4 sm:mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3 sm:mr-4">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 text-sm sm:text-base">
                          {testimonial.name}
                        </div>
                        <div className="text-gray-600 text-xs sm:text-sm">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 lg:py-32 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
              Ready to Experience YETI AI?
            </h2>
            <p className="text-lg sm:text-xl opacity-90 mb-6 sm:mb-8 max-w-2xl mx-auto px-4 sm:px-0">
              Join the AI revolution with intelligent routing, 16 specialized skills, and lightning-fast responses.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <AuthButton 
                trigger={
                  <Button size="lg" className="w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-base sm:text-lg font-semibold">
                    Get Started Free
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                }
                dashboardTrigger={
                  <Button size="lg" className="w-full sm:w-auto bg-white text-green-600 hover:bg-gray-100 px-8 py-3 text-base sm:text-lg font-semibold">
                    <Link to="/chat" className="flex items-center">
                      Open YETI AI
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                }
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div className="col-span-1 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  YETI
                </div>
                <div className="text-xl font-bold">YETI AI</div>
              </div>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                The most intelligent AI assistant with smart routing across 8 model types and 16 specialized skills.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a></li>
                <li><Link to="/chat" className="hover:text-white transition-colors">Try YETI</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Support</h4>
              <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-6 sm:pt-8 text-center">
            <p className="text-gray-400 text-xs sm:text-sm">
              © 2025 YETI AI by Yethikrishna R. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}