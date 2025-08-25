import express from "express";
import {
  createOrder,
  getOrderById,
  getAllOrders,
  getOrderByUserId,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/orderController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();
router.get("/user/:userId", getOrderByUserId);

// router.use(authMiddleware);

router.post("/", createOrder);
router.get("/:id", getOrderById);

router.get("/", getAllOrders);
router.put("/:id", updateOrderStatus);
router.delete("/:id", deleteOrder);

export default router;
