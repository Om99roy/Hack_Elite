import React from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { 
  Eye, 
  Shield, 
  Zap, 
  Users, 
  Smartphone, 
  Award,
  ArrowRight,
  Play,
  Star,
  CheckCircle,
  Camera,
  Brain,
  Heart,
  Menu,
  X
} from 'lucide-react';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const features = [
    {
      icon: <Eye className="w-8 h-8" />,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms analyze eye images for early detection of conditions"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Private",
      description: "HIPAA-compliant platform with end-to-end encryption and biometric authentication"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Results",
      description: "Get comprehensive eye health reports within minutes, not days"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Expert Care",
      description: "Connect with certified ophthalmologists and optometrists remotely"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile First",
      description: "Take eye tests anywhere using just your smartphone camera"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Proven Accuracy",
      description: "95%+ accuracy rate validated by leading medical institutions"
    }
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Ophthalmologist",
      content: "This platform has revolutionized how we screen patients. The AI accuracy is remarkable.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Patient",
      content: "Easy to use and gives me peace of mind. The results are detailed and easy to understand.",
      rating: 5
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Optometrist",
      content: "The triage system is excellent. It helps me prioritize patients who need immediate attention.",
      rating: 5
    }
  ];

  const benefits = [
    {
      icon: <Camera className="w-6 h-6" />,
      title: "Smartphone Camera",
      text: "Use your phone's camera for professional-grade eye screening"
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI Analysis",
      text: "Advanced algorithms detect conditions with 95%+ accuracy"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Expert Care",
      text: "Connect with certified eye care professionals remotely"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Instant Results",
      text: "Get comprehensive reports within minutes, not days"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800">
      {/* Navigation Header */}
      <nav className="relative z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-xl font-bold text-white">EyeHealth AI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-blue-200 transition-colors">Home</Link>
            <Link to="/about" className="text-white hover:text-blue-200 transition-colors">About Us</Link>
            <Link to="/contact" className="text-white hover:text-blue-200 transition-colors">Contact</Link>
            <Link to="/login" className="text-white hover:text-blue-200 transition-colors">Login</Link>
            <Link 
              to="/onboarding" 
              className="glass-button px-6 py-2 text-white hover:scale-105 transition-transform"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white/10 backdrop-blur-lg border-t border-white/20"
          >
            <div className="px-6 py-4 space-y-4">
              <Link 
                to="/" 
                className="block text-white hover:text-blue-200 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="block text-white hover:text-blue-200 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                to="/contact" 
                className="block text-white hover:text-blue-200 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                to="/login" 
                className="block text-white hover:text-blue-200 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link 
                to="/onboarding" 
                className="block glass-button px-6 py-2 text-center text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            AI-Powered
            <span className="block gradient-text">Eye Health</span>
            Monitoring
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto"
          >
            Transform your eye care with cutting-edge AI technology. 
            Screen, monitor, and protect your vision from anywhere.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link 
              to="/onboarding"
              className="glass-button text-lg px-8 py-4 flex items-center space-x-2"
            >
              <span>Start Free Screening</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="glass-button text-lg px-8 py-4 flex items-center space-x-2">
              <Play className="w-5 h-5" />
              <span>Watch Demo</span>
            </button>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="text-blue-300 mb-2">{benefit.icon}</div>
                <h3 className="text-white font-semibold text-sm mb-1">{benefit.title}</h3>
                <p className="text-blue-200 text-xs">{benefit.text}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose EyeHealth AI?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Advanced technology meets compassionate care for the future of eye health
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card p-8 hover:scale-105 transition-transform duration-300"
              >
                <div className="text-blue-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-blue-100">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              How It Works
            </h2>
            <p className="text-xl text-blue-100">
              Simple steps to better eye health
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Take Photo</h3>
              <p className="text-blue-100">Use your smartphone camera to capture clear eye images with our guided interface</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">AI Analysis</h3>
              <p className="text-blue-100">Our advanced AI analyzes your images for early detection of eye conditions</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Get Results</h3>
              <p className="text-blue-100">Receive detailed reports and connect with eye care professionals if needed</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Trusted by Healthcare Professionals
            </h2>
            <p className="text-xl text-blue-100">
              See what doctors and patients are saying about EyeHealth AI
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="glass-card p-8"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-blue-100 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="text-white font-semibold">{testimonial.name}</p>
                  <p className="text-blue-200 text-sm">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-card p-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Protect Your Vision?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of users who trust EyeHealth AI for their eye care needs
            </p>
            <Link 
              to="/onboarding"
              className="glass-button text-lg px-8 py-4 inline-flex items-center space-x-2"
            >
              <span>Start Your Free Screening</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-xl font-bold text-white">EyeHealth AI</span>
          </div>
          <p className="text-blue-200">
            © 2024 EyeHealth AI. All rights reserved. HIPAA compliant and FDA registered.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 