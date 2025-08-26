import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import { generateToken } from "../utils/jwt.js";

// Get all users
export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-passwordHash");
  res.json(users);
};

// Get user by ID
export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select("-passwordHash");
  if (!user) return res.status(404).json({ message: "User not found" });

  if (req.user.userId !== user._id.toString()) {
    return res.status(403).json({ message: "Access denied" });
  }

  res.json(user);
};

// Update user
export const updateUser = async (req, res) => {
  const { name, phone, addresses } = req.body;

  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  if (req.user.userId !== user._id.toString()) {
    return res.status(403).json({ message: "Access denied" });
  }

  user.name = name || user.name;
  user.phone = phone || user.phone;
  user.addresses = addresses || user.addresses;

  await user.save();
  res.json({ message: "User updated", user });
};

// In userController.js - getMyProfile
export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-passwordHash");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update my profile
export const updateMyProfile = async (req, res) => {
  try {
    const { name, phone, addresses } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.addresses = addresses || user.addresses;

    await user.save();

    // Return user without passwordHash
    const updatedUser = await User.findById(req.user._id).select(
      "-passwordHash"
    );

    res.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  if (req.user.userId !== user._id.toString()) {
    return res.status(403).json({ message: "Access denied" });
  }

  await User.deleteOne({ _id: req.params.id });
  res.json({ message: "User deleted" });
};
