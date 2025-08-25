import request from "supertest";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import app from "../app.js";
import User from "../models/userModel.js";

dotenv.config();

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI_TEST);
  }
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

beforeEach(async () => {
  await User.deleteMany({});
});

describe("Auth Controller", () => {
  describe("POST /api/auth/register", () => {
    it("should register a new user successfully", async () => {
      const email = `test${Date.now()}@example.com`;
      const phone = `${Math.floor(1000000000 + Math.random() * 9000000000)}`;

      const res = await request(app).post("/api/auth/register").send({
        name: "Test User",
        email,
        phone,
        password: "password123",
      });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty("email", email);
    });

    it("should fail if user already exists", async () => {
      const email = `exist${Date.now()}@example.com`;
      const phone = `${Math.floor(1000000000 + Math.random() * 9000000000)}`;

      await User.create({
        name: "Existing User",
        email,
        phone,
        passwordHash: await bcrypt.hash("password123", 10),
      });

      const res = await request(app)
        .post("/api/auth/register")
        .send({ name: "Existing User", email, phone, password: "password123" });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toMatch(/User already exists/);
    });
  });

  describe("POST /api/auth/login", () => {
    let email, password;

    beforeEach(async () => {
      email = `login${Date.now()}@example.com`;
      password = "password123";
      const hashedPassword = await bcrypt.hash(password, 10);

      await User.create({
        name: "Login User",
        email,
        phone: `${Math.floor(1000000000 + Math.random() * 9000000000)}`,
        passwordHash: hashedPassword,
        role: "User",
        isEmailVerified: true,
      });
    });

    it("should login successfully with correct credentials", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ email, password });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body).toHaveProperty("token");
      expect(res.body.user).toHaveProperty("email", email);
    });

    it("should fail login with wrong password", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ email, password: "wrongpass" });

      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toMatch(/Invalid credentials/);
    });

    it("should fail login with non-existent email", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: "noone@example.com", password });

      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toMatch(/Invalid credentials/);
    });
  });
});
