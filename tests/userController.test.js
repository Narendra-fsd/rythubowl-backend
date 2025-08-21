import request from "supertest";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import app from "../app.js";
import User from "../models/userModel.js";

let token, userId;

beforeAll(async () => {
  // Create a test user and get token
  const password = "password123";
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = await User.create({
    name: "Test User",
    email: "testuser@example.com",
    phone: "1234567890",
    passwordHash,
    role: "User",
    isEmailVerified: true,
  });

  userId = user._id;

  // Login to get token
  const res = await request(app)
    .post("/api/auth/login")
    .send({ email: "testuser@example.com", password });

  token = res.body.token;
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

afterEach(async () => {
  // Clean up users except the test user
  await User.deleteMany({ email: { $ne: "testuser@example.com" } });
});

describe("User Controller", () => {
  it("should get my profile", async () => {
    const res = await request(app)
      .get("/api/users/me")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("email", "testuser@example.com");
  });

  it("should update my profile", async () => {
    const res = await request(app)
      .put("/api/users/me")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Updated Name", phone: "9999999999" });

    expect(res.statusCode).toBe(200);
    expect(res.body.user).toHaveProperty("name", "Updated Name");
    expect(res.body.user).toHaveProperty("phone", "9999999999");
  });
});
