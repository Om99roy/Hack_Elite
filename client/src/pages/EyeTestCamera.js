import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';
import { 
  Camera, 
  Eye, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  RotateCcw,
  Play,
  Pause,
  Settings,
  ArrowLeft,
  Zap,
  Target,
  Sun,
  Wifi,
  Sparkles,
  Shield,
  Activity
} from 'lucide-react';
import toast from 'react-hot-toast';
import { eyeTestAPI } from '../services/api';

const EyeTestCamera = () => {
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [captureCount, setCaptureCount] = useState(0);
  const [qualityScore, setQualityScore] = useState(0);
  const [guidance, setGuidance] = useState('Position your eye in the center of the frame');
  const [guidanceType, setGuidanceType] = useState('info'); // info, success, warning, error
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [autoCaptureEnabled, setAutoCaptureEnabled] = useState(true);
  const [countdown, setCountdown] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [capturedImages, setCapturedImages] = useState([]);
  const [currentStep, setCurrentStep] = useState('preparation'); // preparation, capturing, analyzing

  // Motion values for animations
  const progressValue = useMotionValue(0);
  const progressWidth = useTransform(progressValue, [0, 100], ['0%', '100%']);

  // Quality assessment thresholds
  const qualityThresholds = {
    excellent: 85,
    good: 70,
    retry: 70
  };

  // Enhanced auto-capture conditions simulation
  const checkAutoCaptureConditions = useCallback(() => {
    if (!autoCaptureEnabled || isPaused) return false;
    
    // Simulate more realistic quality checks
    const eyeDetected = Math.random() > 0.2; // 80% chance eye is detected
    const focusSharpness = Math.random() * 100; // Random focus score
    const lightingAdequacy = Math.random() * 100; // Random lighting score
    const deviceStable = Math.random() > 0.15; // 85% chance device is stable
    const eyeOpen = Math.random() > 0.05; // 95% chance eye is open
    const distance = Math.random() * 100; // Distance from camera

    return eyeDetected && 
           focusSharpness > 75 && 
           lightingAdequacy > 60 && 
           deviceStable && 
           eyeOpen && 
           distance > 30 && distance < 80;
  }, [autoCaptureEnabled, isPaused]);

  // Enhanced real-time guidance system
  const updateGuidance = useCallback(() => {
    const conditions = {
      eyeDetected: Math.random() > 0.2,
      distance: Math.random() * 100,
      focus: Math.random() * 100,
      lighting: Math.random() * 100,
      stability: Math.random() * 100,
      eyeOpen: Math.random() > 0.05
    };

    if (!conditions.eyeDetected) {
      setGuidance('Eye not detected. Please position your eye in the center.');
      setGuidanceType('error');
    } else if (!conditions.eyeOpen) {
      setGuidance('Please keep your eye fully open.');
      setGuidanceType('warning');
    } else if (conditions.distance < 25) {
      setGuidance('Too close. Move your device further away.');
      setGuidanceType('warning');
    } else if (conditions.distance > 85) {
      setGuidance('Too far. Move your device closer.');
      setGuidanceType('warning');
    } else if (conditions.focus < 65) {
      setGuidance('Image is blurry. Hold your device steady.');
      setGuidanceType('warning');
    } else if (conditions.lighting < 45) {
      setGuidance('Poor lighting. Move to a brighter area.');
      setGuidanceType('warning');
    } else if (conditions.stability < 75) {
      setGuidance('Device is moving. Hold steady.');
      setGuidanceType('warning');
    } else {
      setGuidance('Perfect! Hold still for auto-capture.');
      setGuidanceType('success');
    }
  }, []);

  // Auto-capture logic with enhanced timing
  useEffect(() => {
    if (!autoCaptureEnabled || isPaused) return;

    const interval = setInterval(() => {
      updateGuidance();
      
      if (checkAutoCaptureConditions()) {
        if (countdown === 0) {
          setCountdown(3);
        }
      } else {
        setCountdown(0);
      }
    }, 800); // Faster updates for better responsiveness

    return () => clearInterval(interval);
  }, [autoCaptureEnabled, isPaused, checkAutoCaptureConditions, updateGuidance, countdown]);

  // Countdown effect with enhanced animation
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        if (countdown === 1) {
          captureImage();
          setCountdown(0);
        } else {
          setCountdown(countdown - 1);
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Update progress animation
  useEffect(() => {
    const progress = (captureCount / 3) * 100;
    progressValue.set(progress);
  }, [captureCount, progressValue]);

  const captureImage = useCallback(async () => {
    if (!webcamRef.current) return;

    setIsCapturing(true);
    const imageSrc = webcamRef.current.getScreenshot();
    
    // Simulate enhanced quality assessment
    const quality = Math.random() * 40 + 60; // Quality between 60-100
    setQualityScore(quality);
    
    if (quality >= qualityThresholds.good) {
      setCapturedImage(imageSrc);
      setCapturedImages(prev => [...prev, { src: imageSrc, quality, timestamp: Date.now() }]);
      setCaptureCount(prev => prev + 1);
      
      if (captureCount >= 2) {
        // Proceed to analysis
        await analyzeImages();
      } else {
        toast.success(`Image ${captureCount + 1} captured! Quality: ${quality.toFixed(0)}%`, {
          icon: '📸',
          duration: 2000,
        });
      }
    } else {
      toast.error('Image quality too low. Please try again.', {
        icon: '⚠️',
        duration: 3000,
      });
    }
    
    setIsCapturing(false);
  }, [captureCount]);

  const analyzeImages = async () => {
    setIsAnalyzing(true);
    setCurrentStep('analyzing');
    toast.loading('Analyzing your eye images with AI...', { 
      id: 'analysis',
      icon: '🔬',
    });
    
    try {
      // Simulate API call with progress updates
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      // Mock response
      const mockTestId = 'test_' + Date.now();
      
      toast.success('Analysis complete! Redirecting to results...', { 
        id: 'analysis',
        icon: '✅',
        duration: 2000,
      });
      
      setTimeout(() => {
        navigate(`/patient/results/${mockTestId}`);
      }, 2000);
    } catch (error) {
      toast.error('Analysis failed. Please try again.', { 
        id: 'analysis',
        icon: '❌',
      });
      setIsAnalyzing(false);
      setCurrentStep('capturing');
    }
  };

  const retakeImage = () => {
    setCapturedImage(null);
    setQualityScore(0);
    setCaptureCount(0);
    setCountdown(0);
    setCapturedImages([]);
    setCurrentStep('capturing');
  };

  const getGuidanceIcon = () => {
    switch (guidanceType) {
      case 'success':
        return <CheckCircle className="w-6 h-6 text-green-400" />;
      case 'warning':
        return <AlertCircle className="w-6 h-6 text-yellow-400" />;
      case 'error':
        return <XCircle className="w-6 h-6 text-red-400" />;
      default:
        return <Eye className="w-6 h-6 text-blue-400" />;
    }
  };

  const getGuidanceColor = () => {
    switch (guidanceType) {
      case 'success':
        return 'text-green-400';
      case 'warning':
        return 'text-yellow-400';
      case 'error':
        return 'text-red-400';
      default:
        return 'text-blue-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <button
            onClick={() => navigate('/patient/dashboard')}
            className="glass-button flex items-center space-x-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white">Eye Health Screening</h1>
            <p className="text-blue-200">Capture clear images for AI analysis</p>
          </div>
          
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="glass-button flex items-center space-x-2"
          >
            {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
            <span>{isPaused ? 'Resume' : 'Pause'}</span>
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Camera Interface */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="camera-frame"
            >
              {!capturedImage ? (
                <div className="relative w-full h-full">
                  <Webcam
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Enhanced Overlay Elements */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Animated Target Ring */}
                    <motion.div 
                      className="relative"
                      animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <div className="w-32 h-32 border-2 border-white/50 rounded-full pulse-ring"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Target className="w-8 h-8 text-white/70" />
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Enhanced Countdown */}
                  <AnimatePresence>
                    {countdown > 0 && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <motion.div 
                          className="text-6xl font-bold text-white bg-black/50 rounded-full w-24 h-24 flex items-center justify-center"
                          animate={{ 
                            scale: [1, 1.2, 1],
                            rotate: [0, 360]
                          }}
                          transition={{ 
                            duration: 1,
                            repeat: countdown,
                            ease: "easeInOut"
                          }}
                        >
                          {countdown}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* Enhanced Quality Indicators */}
                  <div className="absolute top-4 left-4 flex space-x-2">
                    <motion.div 
                      className="glass-card px-3 py-2 flex items-center space-x-2"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Sun className="w-4 h-4 text-yellow-400" />
                      <span className="text-white text-sm">Good</span>
                    </motion.div>
                    <motion.div 
                      className="glass-card px-3 py-2 flex items-center space-x-2"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Wifi className="w-4 h-4 text-green-400" />
                      <span className="text-white text-sm">Stable</span>
                    </motion.div>
                  </div>

                  {/* Capture Progress Indicator */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="glass-card p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white text-sm">Capture Progress</span>
                        <span className="text-white text-sm font-semibold">{captureCount}/3</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <motion.div 
                          className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full"
                          style={{ width: progressWidth }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full">
                  <img
                    src={capturedImage}
                    alt="Captured eye"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <motion.div 
                      className="text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <motion.div
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                      </motion.div>
                      <p className="text-white text-lg font-semibold">Image Captured!</p>
                      <p className="text-blue-200">Quality Score: {qualityScore.toFixed(0)}%</p>
                    </motion.div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Enhanced Camera Controls */}
            <div className="mt-6 flex justify-center space-x-4">
              {!capturedImage ? (
                <motion.button
                  onClick={captureImage}
                  disabled={isCapturing || isAnalyzing}
                  className="glass-button flex items-center space-x-2 disabled:opacity-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Camera className="w-5 h-5" />
                  <span>Manual Capture</span>
                </motion.button>
              ) : (
                <motion.button
                  onClick={retakeImage}
                  className="glass-button flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>Retake</span>
                </motion.button>
              )}
              
              <motion.button
                onClick={() => setAutoCaptureEnabled(!autoCaptureEnabled)}
                className={`glass-button flex items-center space-x-2 ${
                  autoCaptureEnabled ? 'bg-green-500/20' : 'bg-red-500/20'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Zap className="w-5 h-5" />
                <span>Auto: {autoCaptureEnabled ? 'ON' : 'OFF'}</span>
              </motion.button>
            </div>
          </div>

          {/* Enhanced Guidance Panel */}
          <div className="space-y-6">
            {/* Real-time Guidance */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                {getGuidanceIcon()}
                <span>Real-time Guidance</span>
              </h3>
              <p className={`text-sm ${getGuidanceColor()}`}>
                {guidance}
              </p>
            </motion.div>

            {/* Enhanced Progress */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Progress</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-blue-200">Images Captured</span>
                  <span className="text-white font-semibold">{captureCount}/3</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <motion.div 
                    className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full"
                    style={{ width: progressWidth }}
                  />
                </div>
                {qualityScore > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-200">Quality Score</span>
                    <span className={`font-semibold ${
                      qualityScore >= qualityThresholds.excellent ? 'text-green-400' :
                      qualityScore >= qualityThresholds.good ? 'text-yellow-400' :
                      'text-red-400'
                    }`}>
                      {qualityScore.toFixed(0)}%
                    </span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Enhanced Instructions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Instructions</h3>
              <ul className="space-y-2 text-sm text-blue-200">
                <li className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span>Remove glasses and contacts</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Sun className="w-4 h-4 text-yellow-400" />
                  <span>Ensure good lighting</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-blue-400" />
                  <span>Hold device steady</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-purple-400" />
                  <span>Position eye in center</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Eye className="w-4 h-4 text-indigo-400" />
                  <span>Keep eye fully open</span>
                </li>
              </ul>
            </motion.div>

            {/* Enhanced Analysis Status */}
            {isAnalyzing && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-6 bg-blue-500/20"
              >
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-blue-400" />
                  <span>AI Analysis in Progress</span>
                </h3>
                <div className="flex items-center space-x-3">
                  <motion.div 
                    className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <span className="text-blue-200">Processing your images...</span>
                </div>
                <div className="mt-3 text-xs text-blue-300">
                  Analyzing eye conditions, color patterns, and structural health
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EyeTestCamera; 