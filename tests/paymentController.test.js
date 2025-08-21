const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const OrderModel = require("../models/orderModel");

beforeEach(async () => {
  await OrderModel.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("Payment Controller", () => {
  it("should create a payment order", async () => {
    const orderDetails = {
      userId: new mongoose.Types.ObjectId(),
      customerDetails: { name: "Test Customer", phone: "1234567890" },
      OrderItems: [{ product: new mongoose.Types.ObjectId(), quantity: 2 }],
    };
    const paymentData = {
      amount: 500,
      currency: "INR",
      orderDetails,
    };
    const res = await request(app)
      .post("/api/payments/create")
      .send(paymentData);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.order).toHaveProperty("id");
  });

  it("should get Razorpay key", async () => {
    const res = await request(app).get("/api/payments/key");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("key", "rzp_test_h5bgZzCw9TQtTr");
  });
});
