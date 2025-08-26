import express from "express";
import {
  getMyProfile,
  updateMyProfile,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers,
} from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Corrected routes
router.get("/me", getMyProfile);
router.put("/me", updateMyProfile);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
