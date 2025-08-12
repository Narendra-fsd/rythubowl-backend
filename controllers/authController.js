const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const User = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");
const { generateToken } = require("../utils/jwt");
const { calculateAnalytics } = require("../services/analyticsService");
const Analytics = require("../models/analyticsModel");

// @desc    Register a new user
const register = async (req, res) => {
  const { name, email, phone, password } = req.body;

  const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User already exists with email or phone" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Generate OTP for email verification
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

  const newUser = await User.create({
    name,
    email,
    phone,
    passwordHash: hashedPassword,
    role: "User", // default role
    isEmailVerified: false,
    emailOTP: otpHash,
    emailOTPExpiry: Date.now() + 10 * 60 * 1000 // 10 minutes
  });

  // Send OTP to user's email
  await sendEmail(email, "Email Verification OTP", `Your OTP is: ${otp}`);

  // const token = generateToken({ userId: newUser._id, role: newUser.role });

  // 🔹 Auto-update analytics after new user registration
    try {
      const newData = await calculateAnalytics();
      await Analytics.create(newData);
    } catch (analyticsErr) {
      console.error("Analytics update failed after user registration:", analyticsErr.message);
    }

  res.status(201).json({
    message: "User registered successfully",
  });
};

// @desc    Verify Email OTP
const verifyEmailOTP = async (req, res) => {
  const { email, otp } = req.body;
  const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

  const user = await User.findOne({
    email,
    emailOTP: otpHash,
    emailOTPExpiry: { $gt: Date.now() }
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  user.isEmailVerified = true;
  user.emailOTP = undefined;
  user.emailOTPExpiry = undefined;
  await user.save();

  res.status(200).json({ message: "Email verified successfully. You can now log in." });
};

// @desc    Login
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    $or: [{ email: email }],
  });

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

   if (!user.isEmailVerified) {
    return res.status(403).json({ message: "Please verify your email before login" });
  }

  const token = generateToken({ userId: user._id, role: user.role });

  res.status(200).json({
    message: "Login successful",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
  });
};

module.exports = {
  register,
  verifyEmailOTP,
  login,
};
