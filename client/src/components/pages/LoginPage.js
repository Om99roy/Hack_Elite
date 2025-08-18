import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Camera } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { authAPI } from '../../services/api';
import toast from 'react-hot-toast';

const LoginPage = () => {
  // navigation is handled in AuthContext after login; OTP flow reloads the page
  const { login } = useAuth();
  const [loginMethod, setLoginMethod] = useState('email'); // email, face
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phone: '',
    otp: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Attempting login with:', { email: formData.email, password: formData.password });
      await login({
        email: formData.email,
        password: formData.password
      });
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  // const handleBiometricLogin = async () => {
  //   setLoading(true);

  //   try {
  //     // Simulate biometric authentication
  //     const biometricTemplate = 'mock_biometric_template_' + Date.now();
  //     await biometricLogin({ biometricTemplate });
  //   } catch (error) {
  //     toast.error('Biometric authentication failed. Please try email login.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Face verification placeholder: opens webcam preview; integration (OpenCV) will be added later
  const startCamera = async () => {
    try {
      setCameraOpen(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.querySelector('#face-video');
      if (video) video.srcObject = stream;
    } catch (err) {
      console.error('Camera error:', err);
      toast.error('Could not open the camera. Please allow camera access.');
    }
  };

  const stopCamera = () => {
    setCameraOpen(false);
    const video = document.querySelector('#face-video');
    if (video && video.srcObject) {
      const tracks = video.srcObject.getTracks();
      tracks.forEach((t) => t.stop());
      video.srcObject = null;
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#ffd3ea_0%,#e54be0_45%,#6b1f80_100%)] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-brand-500 to-accent-500 rounded-lg"></div>
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-brand-200">Sign in to your EyeHealth AI account</p>
        </div>

        {/* Login Method Tabs */}
        <div className="glass-card p-6 mb-6">
          <div className="flex space-x-1 mb-6">
            <button
              onClick={() => setLoginMethod('email')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                  loginMethod === 'email'
                    ? 'bg-white text-brand-600'
                    : 'text-white hover:bg-white/10'
                }`}
            >
              <Mail className="w-4 h-4 inline mr-2" />
              Email
            </button>
            {/* <button
              onClick={() => setLoginMethod('biometric')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                loginMethod === 'biometric'
                  ? 'bg-white text-blue-600'
                  : 'text-white hover:bg-white/10'
              }`}
            > */}
              {/* <Fingerprint className="w-4 h-4 inline mr-2" />
              Biometric */}
            {/* </button> */}
            <button
              onClick={() => setLoginMethod('face')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                  loginMethod === 'face'
                    ? 'bg-white text-sky-700'
                    : 'text-white hover:bg-white/10'
                }`}
            >
              <Camera className="w-4 h-4 inline mr-2" />
              Face
            </button>
          </div>

          {/* Email Login Form */}
          {loginMethod === 'email' && (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleEmailLogin}
              className="space-y-4"
            >
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                  disabled={loading}
                  className="w-full glass-cta py-3 font-semibold disabled:opacity-50"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </motion.form>
          )}

          {/* Face verification tab */}
          {loginMethod === 'face' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 text-center">
              <p className="text-sky-700">Use face verification to sign in. (Camera only UI for now.)</p>
              <div className="camera-frame mx-auto">
                <video id="face-video" autoPlay muted playsInline className="w-full h-full object-cover" />
              </div>

              {!cameraOpen ? (
                <div className="flex gap-3 justify-center">
                  <button onClick={startCamera} className="glass-button px-6 py-3">Open Camera</button>
                  <Link to="/login" className="text-sm text-sky-600 self-center">Help</Link>
                </div>
              ) : (
                <div className="flex gap-3 justify-center">
                  <button onClick={() => {
                    // placeholder: do face-capture and send to backend later
                    toast.success('Face captured (placeholder). You can now be logged in via dev flows.');
                  }} className="glass-button px-6 py-3">Capture & Verify</button>
                  <button onClick={stopCamera} className="px-6 py-3 border rounded-lg text-sky-700">Close Camera</button>
                </div>
              )}
            </motion.div>
          )}

          {/* Biometric Login */}
          {/* {loginMethod === 'biometric' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center space-y-6"
            >
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto">
                <Fingerprint className="w-12 h-12 text-white" />
              </div>
              <div>
                <h3 className="text-white text-lg font-semibold mb-2">
                  Biometric Authentication
                </h3>
                <p className="text-blue-200 text-sm mb-6">
                  Use your fingerprint or face recognition to sign in
                </p>
                <button
                  onClick={handleBiometricLogin}
                  disabled={loading}
                  className="glass-button px-8 py-3 font-semibold disabled:opacity-50"
                >
                  {loading ? 'Authenticating...' : 'Authenticate with Biometric'}
                </button>
              </div>
            </motion.div>
          )} */}

          {/* OTP Login */}
          {/* OTP flow removed. Face verification tab added above. */}
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-blue-200">
            Don't have an account?{' '}
            <Link to="/onboarding" className="text-white font-semibold hover:underline">
              Sign up here
            </Link>
          </p>
        </div>

        {/* Forgot Password */}
        {/* <div className="text-center mt-4">
          <Link to="/forgot-password" className="text-blue-200 hover:text-white text-sm">
            Forgot your password?
          </Link>
        </div> */}
      </motion.div>
    </div>
  );
};

export default LoginPage; 