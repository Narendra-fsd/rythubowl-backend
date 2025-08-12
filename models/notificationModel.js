const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['Order', 'Subscription', 'System'],
    default: 'System',
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  readAt: {
    type: Date,
  },
  expiresAt: {
    type: Date, // Optional auto-delete after some time
  }
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
