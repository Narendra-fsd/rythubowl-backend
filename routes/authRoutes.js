const express = require("express");
const router = express.Router();

const {
  register,
  login,
  verifyEmailOTP,
  forgotPassword,
  verifyResetPasswordOtp,
  resetPassword,
} = require("../controllers/authController");

const validate = require("../middlewares/validateMiddleware");
const { registerSchema, loginSchema } = require("../utils/validationSchemas");

// Auth
router.post("/register", validate(registerSchema), register);
router.post("/verify-email", verifyEmailOTP);
router.post("/login", validate(loginSchema), login);

// Forgot-password flow
router.post("/forgot-password", forgotPassword);
router.post("/verify-forgot-otp", verifyResetPasswordOtp);
router.post("/reset-password", resetPassword);

module.exports = router;
