const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const User = require("../models/User");
const Patient = require("../models/Patient");
const { auth } = require("../middleware/auth");
const { sendOTP, verifyOTP } = require("../services/notificationService");

const router = express.Router();

// Validation schemas
const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^\+?[\d\s-]+$/)
    .required(),
  password: Joi.string().min(6).required(),
  fullName: Joi.string().min(2).required(),
  dateOfBirth: Joi.date().max("now").required(),
  gender: Joi.string()
    .valid("male", "female", "other", "prefer_not_to_say")
    .required(),
  emergencyContact: Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    relationship: Joi.string().required(),
  }).required(),
  medicalHistory: Joi.object({
    diabetes: Joi.boolean().optional(),
    bloodPressure: Joi.string()
      .valid("normal", "high", "low", "unknown")
      .optional(),
    familyHistory: Joi.object({
      glaucoma: Joi.boolean().optional(),
      cataracts: Joi.boolean().optional(),
      macularDegeneration: Joi.boolean().optional(),
      diabeticRetinopathy: Joi.boolean().optional(),
      other: Joi.array().items(Joi.string()).optional(),
    }).optional(),
    medications: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().required(),
          dosage: Joi.string().required(),
          frequency: Joi.string().required(),
          startDate: Joi.date().optional(),
          endDate: Joi.date().optional(),
          isActive: Joi.boolean().optional(),
        })
      )
      .optional(),
    allergies: Joi.array()
      .items(
        Joi.object({
          allergen: Joi.string().required(),
          severity: Joi.string().valid("mild", "moderate", "severe").optional(),
          reaction: Joi.string().optional(),
        })
      )
      .optional(),
    lifestyle: Joi.object({
      smoking: Joi.string().valid("never", "former", "current").optional(),
      alcohol: Joi.string()
        .valid("never", "occasional", "moderate", "heavy")
        .optional(),
      exercise: Joi.string()
        .valid("sedentary", "light", "moderate", "active")
        .optional(),
    }).optional(),
  }).optional(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const biometricSchema = Joi.object({
  biometricTemplate: Joi.string().required(),
  deviceFingerprint: Joi.string().optional(),
});

// Register new patient
router.post("/register", async (req, res) => {
  try {
    // Validate input
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const {
      email,
      phone,
      password,
      fullName,
      dateOfBirth,
      gender,
      emergencyContact,
      medicalHistory,
    } = value;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User with this email or phone already exists",
      });
    }

    // Create user
    const user = new User({
      email,
      phone,
      password,
      role: "patient",
    });

    await user.save();

    // Create patient profile
    const patient = new Patient({
      userId: user._id,
      fullName,
      dateOfBirth,
      gender,
      emergencyContact,
      ...(medicalHistory && { medicalHistory }),
    });

    await patient.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Update user with full name for response
    user._fullName = fullName;

    res.status(201).json({
      message: "Account created successfully",
      user: user.toPublicJSON(),
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Registration failed" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    // Validate input
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = value;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if account is locked
    if (user.isLocked()) {
      return res.status(423).json({
        message:
          "Account is temporarily locked due to multiple failed attempts",
      });
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      await user.incLoginAttempts();
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Reset failed login attempts
    await user.resetLoginAttempts();

    // Get patient profile for full name
    const patient = await Patient.findOne({ userId: user._id });
    if (patient) {
      user._fullName = patient.fullName;
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      user: user.toPublicJSON(),
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
});

// Biometric verification
router.post("/biometric-verify", async (req, res) => {
  try {
    // Validate input
    const { error, value } = biometricSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { biometricTemplate, deviceFingerprint } = value;

    // Find user by biometric template
    const user = await User.findOne({
      biometricTemplate,
      biometricEnabled: true,
      isActive: true,
    });

    if (!user) {
      return res.status(401).json({ message: "Biometric verification failed" });
    }

    // Optional device fingerprint verification
    if (
      deviceFingerprint &&
      user.deviceFingerprint &&
      deviceFingerprint !== user.deviceFingerprint
    ) {
      return res.status(401).json({ message: "Device not recognized" });
    }

    // Get patient profile for full name
    const patient = await Patient.findOne({ userId: user._id });
    if (patient) {
      user._fullName = patient.fullName;
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Biometric verification successful",
      user: user.toPublicJSON(),
      token,
    });
  } catch (error) {
    console.error("Biometric verification error:", error);
    res.status(500).json({ message: "Biometric verification failed" });
  }
});

// Enable biometric authentication
router.post("/enable-biometric", auth, async (req, res) => {
  try {
    const { biometricTemplate, deviceFingerprint } = req.body;

    if (!biometricTemplate) {
      return res
        .status(400)
        .json({ message: "Biometric template is required" });
    }

    // Update user
    await User.findByIdAndUpdate(req.user.userId, {
      biometricTemplate,
      biometricEnabled: true,
      deviceFingerprint: deviceFingerprint || null,
    });

    res.json({ message: "Biometric authentication enabled successfully" });
  } catch (error) {
    console.error("Enable biometric error:", error);
    res
      .status(500)
      .json({ message: "Failed to enable biometric authentication" });
  }
});

// Send OTP
router.post("/otp-send", async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    // Find user by phone
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate and send OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP in user document (in production, use Redis)
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 3 * 60 * 1000); // 3 minutes
    await user.save();

    // Send OTP via SMS (or dev fallback)
    const sendResult = await sendOTP(phone, otp);
    console.log('Generated OTP:', otp, 'sendResult:', sendResult);

    // In development return the OTP in response to simplify local testing.
    if (process.env.NODE_ENV !== 'production') {
      return res.json({ message: 'OTP sent successfully', otp, sendResult });
    }

    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Send OTP error:", error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

// Verify OTP
router.post("/otp-verify", async (req, res) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({ message: "Phone and OTP are required" });
    }

    // Find user by phone
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if OTP is valid and not expired
    if (!user.otp || user.otp !== otp || user.otpExpiry < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Clear OTP
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    // Get patient profile for full name
    const patient = await Patient.findOne({ userId: user._id });
    if (patient) {
      user._fullName = patient.fullName;
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "OTP verification successful",
      user: user.toPublicJSON(),
      token,
    });
  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).json({ message: "OTP verification failed" });
  }
});

// Verify token
router.get("/verify", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Get patient profile for full name
    const patient = await Patient.findOne({ userId: user._id });
    if (patient) {
      user._fullName = patient.fullName;
    }

    res.json({ user: user.toPublicJSON() });
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(500).json({ message: "Token verification failed" });
  }
});

// Logout (client-side token removal)
router.post("/logout", auth, async (req, res) => {
  try {
    // In a more sophisticated setup, you might want to blacklist the token
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Logout failed" });
  }
});

module.exports = router;
