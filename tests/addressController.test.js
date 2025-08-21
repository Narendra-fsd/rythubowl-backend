const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Address = require("../models/addressModel");

beforeEach(async () => {
  await Address.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("Address Controller", () => {
  it("should create a new address", async () => {
    const addressData = {
      street: "123 Main St",
      city: "Testville",
      state: "TS",
      pincode: "123456",
      country: "India",
      userId: new mongoose.Types.ObjectId(), // Add required userId field
    };
    const res = await request(app).post("/api/addresses").send(addressData);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("street", "123 Main St");
  });

  it("should get address by id", async () => {
    const address = await Address.create({
      street: "ById",
      city: "City",
      state: "ST",
      pincode: "333333",
      country: "India",
      userId: new mongoose.Types.ObjectId(),
    });
    const res = await request(app).get(`/api/addresses/${address._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("street", "ById");
  });
});
