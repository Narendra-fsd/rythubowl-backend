import request from "supertest";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import app from "../app.js"; // make sure app.js exports the Express app
import User from "../models/userModel.js";
import Order from "../models/orderModel.js";

let token, userId;

beforeAll(async () => {
  // Clean up old users/orders
  await User.deleteMany({});
  await Order.deleteMany({});

  // Create test user
  const password = "password123";
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = await User.create({
    name: "Order User",
    email: "orderuser@example.com",
    phone: "1234567890",
    passwordHash,
    role: "User",
    isEmailVerified: true,
  });

  userId = user._id;

  // Login to get token
  const res = await request(app)
    .post("/api/auth/login")
    .send({ email: "orderuser@example.com", password });

  token = res.body.token;
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("Order Controller", () => {
  it("should create a new order", async () => {
    const orderData = {
      products: [{ product: new mongoose.Types.ObjectId(), quantity: 2 }],
      deliveryAddress: new mongoose.Types.ObjectId(),
      totalAmount: 200,
      paymentStatus: "initiated",
      orderStatus: "pending",
    };

    const res = await request(app)
      .post("/api/orders")
      .set("Authorization", `Bearer ${token}`)
      .send(orderData);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("user", userId.toString());
    expect(res.body).toHaveProperty("totalAmount", 200);
  });

  it("should get order by id", async () => {
    const order = await Order.create({
      user: userId,
      products: [{ product: new mongoose.Types.ObjectId(), quantity: 1 }],
      deliveryAddress: new mongoose.Types.ObjectId(),
      totalAmount: 100,
      paymentStatus: "initiated",
      orderStatus: "pending",
    });

    const res = await request(app)
      .get(`/api/orders/${order._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("user", userId.toString());
    expect(res.body).toHaveProperty("totalAmount", 100);
  });
});
