import request from "supertest";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import app from "../app.js"; // Ensure app.js exports your Express app
import User from "../models/userModel.js";

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("Auth Controller", () => {
  afterEach(async () => {
    await User.deleteMany({});
  });

  describe("POST /api/auth/register", () => {
    it("should register a new user", async () => {
      const res = await request(app).post("/api/auth/register").send({
        name: "Test User",
        email: "testuser@example.com",
        phone: "1234567890",
        password: "password123",
      });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty("email", "testuser@example.com");
    });
  });

  describe("POST /api/auth/login", () => {
    it("should login with valid credentials", async () => {
      const password = "password123";
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      await User.create({
        name: "Login User",
        email: "login@example.com",
        phone: "9876543210",
        passwordHash,
        role: "User",
        isEmailVerified: true,
      });

      const res = await request(app).post("/api/auth/login").send({
        email: "login@example.com",
        password,
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body).toHaveProperty("token");
      expect(res.body.user).toHaveProperty("email", "login@example.com");
    });
  });
});
