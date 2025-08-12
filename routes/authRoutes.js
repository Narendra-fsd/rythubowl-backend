const express = require("express");
const router = express.Router();
const { register, login, verifyEmailOTP } = require("../controllers/authController");
const validate = require("../middlewares/validateMiddleware");
const { registerSchema, loginSchema } = require("../utils/validationSchemas");

router.post("/register", validate(registerSchema), register);
router.post("/verify-email", verifyEmailOTP);
router.post("/login", validate(loginSchema), login);

module.exports = router;
