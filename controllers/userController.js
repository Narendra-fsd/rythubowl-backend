const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const { generateToken } = require('../utils/jwt');

// Get all users (SuperAdmin only)
const getAllUsers = async (req, res) => {
  const users = await User.find().select('-passwordHash');
  res.json(users);
};

// Get user by ID (SuperAdmin or Self)
const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select('-passwordHash');
  if (!user) return res.status(404).json({ message: 'User not found' });

  // Allow only SuperAdmin or the user themselves
  if (req.user.role !== 'SuperAdmin' && req.user.userId !== user._id.toString()) {
    return res.status(403).json({ message: 'Access denied' });
  }

  res.json(user);
};

// Update user (SuperAdmin or Self)
const updateUser = async (req, res) => {
  const { name, phone, addresses } = req.body;

  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  if (req.user.role !== 'SuperAdmin' && req.user.userId !== user._id.toString()) {
    return res.status(403).json({ message: 'Access denied' });
  }

  user.name = name || user.name;
  user.phone = phone || user.phone;
  user.addresses = addresses || user.addresses;

  await user.save();
  res.json({ message: 'User updated', user });
};

// ✅ Get my profile (self)
const getMyProfile = async (req, res) => {
  const user = await User.findById(req.user.userId).select("-passwordHash");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

// ✅ Update my profile (self)
const updateMyProfile = async (req, res) => {
  const { name, phone, addresses } = req.body;

  const user = await User.findById(req.user.userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.name = name || user.name;
  user.phone = phone || user.phone;
  user.addresses = addresses || user.addresses;

  await user.save();

  res.json({ message: "Profile updated successfully", user });
};


// Delete user (Only SuperAdmin)
const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  if (req.user.role !== 'SuperAdmin') {
    return res.status(403).json({ message: 'Only SuperAdmin can delete users' });
  }

  await User.deleteOne({ _id: req.params.id });
  res.json({ message: 'User deleted' });
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  getMyProfile,
  updateMyProfile,
  deleteUser,
};