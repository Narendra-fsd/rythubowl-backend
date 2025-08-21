import express from "express";
import {
  getMyProfile,
  updateMyProfile,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/me", getMyProfile);
router.put("/me", updateMyProfile);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/", getAllUsers);

export default router;
