import request from "supertest";
import mongoose from "mongoose";
import app from "../app.js";
import Address from "../models/addressModel.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

let token; // JWT token for auth
let userId;

beforeAll(async () => {
  // Connect to test DB
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  // Clear users and addresses
  await User.deleteMany({});
  await Address.deleteMany({});

  // Create a test user
  const password = await bcrypt.hash("testpassword", 10);
  const user = await User.create({
    name: "Test User",
    email: "testuser@example.com",
    phone: `12345${Math.floor(Math.random() * 10000)}`, // unique phone
    password,
  });

  userId = user._id;

  // Generate JWT token
  token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

beforeEach(async () => {
  await Address.deleteMany({});
});

describe("Address Controller", () => {
  it("should create a new address", async () => {
    const addressData = {
      street: "123 Main St",
      city: "Testville",
      state: "TS",
      zip: "123456",
      landmark: "Near Park",
      userId,
    };

    const res = await request(app)
      .post("/api/addresses/add-address")
      .set("Authorization", `Bearer ${token}`)
      .send(addressData);

    expect(res.statusCode).toBe(201);
    expect(res.body.address).toHaveProperty("street", "123 Main St");
    expect(res.body.address).toHaveProperty("userId", userId.toString());
  });

  it("should get address by id", async () => {
    const address = await Address.create({
      street: "ById",
      city: "City",
      state: "ST",
      zip: "333333",
      landmark: "Test Landmark",
      userId,
    });

    const res = await request(app)
      .get(`/api/addresses/${address._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    // Depending on your controller, it may return an array or object
    // Adjust accordingly:
    const addressRes = Array.isArray(res.body) ? res.body[0] : res.body;
    expect(addressRes).toHaveProperty("street", "ById");
    expect(addressRes).toHaveProperty("userId", userId.toString());
  });
});
