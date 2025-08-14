const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, unique: true },
  passwordHash: { type: String, required: true },
  role: {
    type: String,
    enum: ['User', 'DeliveryAgent', 'SuperAdmin'],
    default: 'User',
  },
  isEmailVerified: { type: Boolean, default: false },

  // Registration OTP
  emailOTP: { type: String },
  emailOTPExpiry: { type: Date },

  // Forgot password OTP
  resetPasswordOTP: { type: String },
  resetPasswordOTPExpiry: { type: Date },
  otpVerifiedForReset: { type: Boolean, default: false },

  addresses: [
    {
      street: String,
      city: String,
      state: String,
      zip: String,
      landmark: String,
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
