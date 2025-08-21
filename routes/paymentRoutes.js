const express = require("express");
const router = express.Router();
const {createpayment, verifyPayment, getKey } = require("../controllers/paymentController");

router.post("/create-order", createpayment);
router.post("/verify-payment", verifyPayment);
router.get("/get-key", getKey);

module.exports = router;
