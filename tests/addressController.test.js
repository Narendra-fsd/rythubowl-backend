import request from "supertest";
import mongoose from "mongoose";
import app from "../app.js";
import Address from "../models/addressModel.js";

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
      zip: "123456",       // match your schema (uses `zip`, not `pincode`)
      landmark: "Near Park",
      userId: new mongoose.Types.ObjectId(),
    };

    const res = await request(app).post("/api/addresses/add-address").send(addressData);

    expect(res.statusCode).toBe(201);
    expect(res.body.address).toHaveProperty("street", "123 Main St");
  });

  it("should get address by id", async () => {
    const address = await Address.create({
      street: "ById",
      city: "City",
      state: "ST",
      zip: "333333",      // match schema
      landmark: "Test Landmark",
      userId: new mongoose.Types.ObjectId(),
    });

    const res = await request(app).get(`/api/addresses/${address._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body[0]).toHaveProperty("street", "ById");
  });
});
