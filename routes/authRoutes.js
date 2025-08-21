const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/authController");

const validate = require("../middlewares/validateMiddleware");
const { registerSchema, loginSchema } = require("../utils/validationSchemas");

// Auth
router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

module.exports = router;
