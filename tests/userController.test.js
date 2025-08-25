import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as userController from "../controllers/userController.js";
import User from "../models/userModel.js";
import { generateMockToken } from "./setup.js";

// Create express app for testing
const app = express();
app.use(express.json());
app.get("/api/users", userController.getAllUsers);
app.get("/api/users/:id", userController.getUserById);
app.get("/api/users/me/profile", userController.getMyProfile);
app.put("/api/users/:id", userController.updateUser);
app.put("/api/users/me/profile", userController.updateMyProfile);
app.delete("/api/users/:id", userController.deleteUser);

// Mock the JWT middleware to add user to request
app.use((req, res, next) => {
  // Skip auth for certain routes if needed
  if (req.path === "/api/users" && req.method === "GET") {
    return next();
  }

  // Check for token in header
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "test-secret");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
});

describe("User Controller Tests", () => {
  let testUser;
  let authToken;

  beforeEach(async () => {
    // Create a test user
    const passwordHash = await bcrypt.hash("password123", 12);
    testUser = await User.create({
      name: "Test User",
      email: "test@example.com",
      passwordHash,
      phone: "1234567890",
      addresses: [
        {
          street: "123 Test St",
          city: "Test City",
          state: "TS",
          zipCode: "12345",
          isDefault: true,
        },
      ],
    });

    authToken = generateMockToken(testUser._id.toString());
  });

  describe("getAllUsers", () => {
    it("should get all users without password hashes", async () => {
      const response = await request(app).get("/api/users");

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(1);
      expect(response.body[0]).toHaveProperty("name", "Test User");
      expect(response.body[0]).not.toHaveProperty("passwordHash");
    });
  });

  describe("getUserById", () => {
    it("should get a user by ID when authorized", async () => {
      const response = await request(app)
        .get(`/api/users/${testUser._id}`)
        .set("Authorization", `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("_id", testUser._id.toString());
      expect(response.body).toHaveProperty("name", "Test User");
      expect(response.body).not.toHaveProperty("passwordHash");
    });

    it("should return 403 when trying to access another user", async () => {
      const otherUser = await User.create({
        name: "Other User",
        email: "other@example.com",
        passwordHash: await bcrypt.hash("password123", 12),
      });

      const otherToken = generateMockToken(otherUser._id.toString());

      const response = await request(app)
        .get(`/api/users/${testUser._id}`)
        .set("Authorization", `Bearer ${otherToken}`);

      expect(response.status).toBe(403);
      expect(response.body).toHaveProperty("message", "Access denied");
    });

    it("should return 404 for non-existent user", async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .get(`/api/users/${nonExistentId}`)
        .set("Authorization", `Bearer ${authToken}`);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "User not found");
    });
  });

  describe("getMyProfile", () => {
    it("should get the authenticated user profile", async () => {
      const response = await request(app)
        .get("/api/users/me/profile")
        .set("Authorization", `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("_id", testUser._id.toString());
      expect(response.body).toHaveProperty("name", "Test User");
      expect(response.body).not.toHaveProperty("passwordHash");
    });

    it("should return 404 if user not found", async () => {
      // Delete the user first
      await User.findByIdAndDelete(testUser._id);

      const response = await request(app)
        .get("/api/users/me/profile")
        .set("Authorization", `Bearer ${authToken}`);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "User not found");
    });
  });

  describe("updateUser", () => {
    it("should update user when authorized", async () => {
      const updatedData = {
        name: "Updated User",
        phone: "0987654321",
        addresses: [
          {
            street: "456 Updated St",
            city: "Updated City",
            state: "US",
            zipCode: "54321",
            isDefault: true,
          },
        ],
      };

      const response = await request(app)
        .put(`/api/users/${testUser._id}`)
        .set("Authorization", `Bearer ${authToken}`)
        .send(updatedData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", "User updated");
      expect(response.body.user).toHaveProperty("name", "Updated User");
      expect(response.body.user).toHaveProperty("phone", "0987654321");

      // Verify the update in database
      const updatedUser = await User.findById(testUser._id);
      expect(updatedUser.name).toBe("Updated User");
      expect(updatedUser.addresses[0].street).toBe("456 Updated St");
    });

    it("should return 403 when trying to update another user", async () => {
      const otherUser = await User.create({
        name: "Other User",
        email: "other@example.com",
        passwordHash: await bcrypt.hash("password123", 12),
      });

      const response = await request(app)
        .put(`/api/users/${otherUser._id}`)
        .set("Authorization", `Bearer ${authToken}`)
        .send({ name: "Unauthorized Update" });

      expect(response.status).toBe(403);
      expect(response.body).toHaveProperty("message", "Access denied");
    });
  });

  describe("updateMyProfile", () => {
    it("should update the authenticated user profile", async () => {
      const updatedData = {
        name: "My Updated Profile",
        phone: "1112223333",
      };

      const response = await request(app)
        .put("/api/users/me/profile")
        .set("Authorization", `Bearer ${authToken}`)
        .send(updatedData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty(
        "message",
        "Profile updated successfully"
      );
      expect(response.body.user).toHaveProperty("name", "My Updated Profile");
      expect(response.body.user).toHaveProperty("phone", "1112223333");

      // Verify the update in database
      const updatedUser = await User.findById(testUser._id);
      expect(updatedUser.name).toBe("My Updated Profile");
    });
  });

  describe("deleteUser", () => {
    it("should delete user when authorized", async () => {
      const response = await request(app)
        .delete(`/api/users/${testUser._id}`)
        .set("Authorization", `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", "User deleted");

      // Verify the user is deleted from database
      const deletedUser = await User.findById(testUser._id);
      expect(deletedUser).toBeNull();
    });

    it("should return 403 when trying to delete another user", async () => {
      const otherUser = await User.create({
        name: "Other User",
        email: "other@example.com",
        passwordHash: await bcrypt.hash("password123", 12),
      });

      const response = await request(app)
        .delete(`/api/users/${otherUser._id}`)
        .set("Authorization", `Bearer ${authToken}`);

      expect(response.status).toBe(403);
      expect(response.body).toHaveProperty("message", "Access denied");

      // Verify the other user still exists
      const stillExists = await User.findById(otherUser._id);
      expect(stillExists).not.toBeNull();
    });
  });
});
