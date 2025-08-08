const Role = require('../models/roleModel');

// Create new role
exports.createRole = async (req, res) => {
  try {
    const role = await Role.create(req.body);
    res.status(201).json({ message: 'Role created', role });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create role', error: err.message });
  }
};

// Get all roles
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch roles', error: err.message });
  }
};

// Get role by ID
exports.getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) return res.status(404).json({ message: 'Role not found' });
    res.status(200).json(role);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch role', error: err.message });
  }
};

// Update role
exports.updateRole = async (req, res) => {
  try {
    const updated = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Role not found' });
    res.status(200).json({ message: 'Role updated', role: updated });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update role', error: err.message });
  }
};

// Delete role
exports.deleteRole = async (req, res) => {
  try {
    const deleted = await Role.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Role not found' });
    res.status(200).json({ message: 'Role deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete role', error: err.message });
  }
};
