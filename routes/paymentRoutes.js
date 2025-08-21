import express from "express";
import {
  createpayment,
  verifyPayment,
  getKey,
} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-order", createpayment);
router.post("/verify-payment", verifyPayment);
router.get("/get-key", getKey);

export default router;
