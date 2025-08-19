const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createpayment,
  verifyPayment,
  getKey,
} = require("../controllers/paymentController");
const { rbacMiddleware } = require("../middlewares/rbacMiddleware");

router.post("/create-order", createpayment);
router.post("/verify-payment", verifyPayment);
router.get("/get-key", getKey);

module.exports = router;
