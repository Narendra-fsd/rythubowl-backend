import bcrypt from "bcryptjs";
import crypto from "crypto";
import User from "../models/userModel.js";
import sendEmail from "../utils/sendEmail.js";
import { generateToken } from "../utils/jwt.js";

// Register a new user - Simplified without email verification
export const register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Clean up any existing user with same email or phone (for test environments)
    if (process.env.NODE_ENV === "test") {
      await User.deleteMany({ $or: [{ email }, { phone }] });
    }

    // Check existing user
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with email or phone",
      });
    }

    // Create user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      phone,
      passwordHash: hashedPassword,
      role: "User",
      isEmailVerified: true, // Auto-verify the user
    });

    // Return success response - No OTP sent
    return res.status(201).json({
      success: true,
      message: "User registered successfully. You can now login.",
      data: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Login - No email verification check needed
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
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
        isEmailVerified: user.isEmailVerified,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};
