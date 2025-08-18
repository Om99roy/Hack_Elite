import React from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Camera, Brain, Heart, Menu, X } from 'lucide-react';
import { TbHealthRecognition } from "react-icons/tb";
import DevRoleSwitcher from '../ui/DevRoleSwitcher';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);



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
    <div className="min-h-screen bg-[linear-gradient(180deg,#ffd3ea_0%,#e54be0_45%,#6b1f80_100%)]">
      {/* Navigation Header */}
      <nav className="relative z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <TbHealthRecognition  className="w-6 h-6 text-brand-500" />
            </div>
            <span className="text-xl font-bold text-white">MediElite</span>
          </Link>

          {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="glass-nav">Home</Link>
            <Link to="/about" className="glass-nav">About Us</Link>
            <Link to="/contact" className="glass-nav">Contact</Link>
            <Link to="/login" className="glass-nav">Login</Link>
            <Link to="/doctor/portal" className="glass-nav">Doctor Portal</Link>
            <Link to="/onboarding" className="glass-button glass-button--float">Get Started</Link>
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
                className="block text-white hover:text-brand-200 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="block text-white hover:text-brand-200 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                to="/contact" 
                className="block text-white hover:text-brand-200 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                to="/login" 
                className="block text-white hover:text-brand-200 transition-colors"
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
        {/* subtle animated backdrop */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ duration: 1.2 }}
          style={{ background: 'radial-gradient(circle at 20% 20%, rgba(99,102,241,0.15), transparent 20%), radial-gradient(circle at 80% 80%, rgba(139,92,246,0.12), transparent 25%)' }}
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-10 md:p-14 text-center shadow-xl"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-brand-300 via-accent-300 to-accent-500">AI-Powered Eye Health</span>
              <span className="block text-brand-100 mt-2 text-lg md:text-xl">Monitoring & Remote Screening</span>
            </h1>

            <p className="mt-6 text-base md:text-lg text-brand-100 max-w-3xl mx-auto">
              Transform your eye care with cutting-edge AI screening, secure biometric authentication, and instant, actionable reports — all from your smartphone.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/onboarding" className="inline-flex items-center gap-3 bg-gradient-to-r from-brand-500 to-accent-500 text-white px-6 py-3 rounded-lg shadow-lg hover:scale-[1.02] transition-transform glass-button--float">
                <span className="font-semibold">Start Free Screening</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              {/* Watch Demo removed per request */}
            </div>

            {/* benefits small */}
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
              {benefits.map((benefit, i) => (
                <div key={i} className="text-center">
                  <div className="mx-auto w-10 h-10 flex items-center justify-center text-white/90 mb-2">{benefit.icon}</div>
                  <div className="text-white text-sm font-semibold">{benefit.title}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section
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
      </section> */}

      {/* How It Works Section
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
      </section> */}

      {/* Testimonials Section
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
      </section> */}

      {/* CTA Section
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
      </section> */}

      {/* Footer */}
  <footer className="px-6 py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
      <TbHealthRecognition  className="w-5 h-5 text-brand-600" />
            </div>
            <span className="text-xl font-bold text-white">MediElite</span>
          </div>
          <p className="text-brand-200">
            © 2025 MediElite. All rights reserved. HIPAA compliant and FDA registered.
          </p>
        </div>
      </footer>
  <DevRoleSwitcher />
    </div>
  );
};

export default LandingPage; 