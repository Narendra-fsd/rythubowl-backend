const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const { generateToken } = require("../utils/jwt");

// @desc    Register a new user
const register = async (req, res) => {
  const { name, email, phone, password } = req.body;

  const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User already exists with email or phone" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    phone,
    passwordHash: hashedPassword,
    role: "User", // default role
  });

  const token = generateToken({ userId: newUser._id, role: newUser.role });

  res.status(201).json({
    message: "User registered successfully",
    token,
    // user: {
    //   id: newUser._id,
    //   name: newUser.name,
    //   email: newUser.email,
    //   phone: newUser.phone,
    //   role: newUser.role,
    // },
  });
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
  login,
};
