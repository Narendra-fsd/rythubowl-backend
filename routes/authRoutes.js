const express = require("express");
const router = express.Router();

const {
  register,
  login,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

const validate = require("../middlewares/validateMiddleware");
const { registerSchema, loginSchema } = require("../utils/validationSchemas");

// Auth
router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

// Forgot-password flow (without OTP)
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;
