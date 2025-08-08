const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  passwordHash: String,
  role: { type: String, enum: ['SuperAdmin', 'Viewer'] },
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);
