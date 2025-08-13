const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const User = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");
const { generateToken } = require("../utils/jwt");
const { calculateAnalytics } = require("../services/analyticsService");
const Analytics = require("../models/analyticsModel");

// @desc    Register a new user
const register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Check existing user
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with email or phone"
      });
    }

    // Create user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

    const newUser = await User.create({
      name,
      email,
      phone,
      passwordHash: hashedPassword,
      role: "User",
      isEmailVerified: false,
      emailOTP: otpHash,
      emailOTPExpiry: Date.now() + 10 * 60 * 1000
    });

    // Send OTP (fire and forget)
    sendEmail(email, "Email Verification OTP", `Your OTP is: ${otp}`)
      .catch(err => console.error("Email send error:", err));

    // Return success response
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        email: newUser.email
      }
    });

  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

// @desc    Verify Email OTP
const verifyEmailOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

    const user = await User.findOne({
      email,
      emailOTP: otpHash,
      emailOTPExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid or expired OTP" 
      });
    }

    user.isEmailVerified = true;
    user.emailOTP = undefined;
    user.emailOTPExpiry = undefined;
    await user.save();

    res.status(200).json({ 
      success: true,
      message: "Email verified successfully" 
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "OTP verification failed",
      error: error.message
    });
  }
};

/// @desc    Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ 
        success: false,
        message: "Invalid credentials" 
      });
    }

    if (!user.isEmailVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email before login",
        isVerified: false,
        email: user.email // Include email for resend OTP
      });
    }

    const token = generateToken({ userId: user._id, role: user.role });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isEmailVerified: user.isEmailVerified
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message
    });
  }
};

module.exports = {
  register,
  verifyEmailOTP,
  login,
};
