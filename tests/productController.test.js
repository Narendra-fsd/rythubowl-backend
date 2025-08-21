import request from "supertest";
import mongoose from "mongoose";
import app from "../app.js";
import Product from "../models/productModel.js";

beforeEach(async () => {
  await Product.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("Product Controller", () => {
  it("should create a new product", async () => {
    const productData = {
      name: "Test Product",
      description: "A test product",
      category: "Fruits",
      price: 100,
      unit: "kg",
      stock: 10,
      availableFor: "Order", // ✅ must match schema enum
      imageUrl: "http://example.com/image.jpg",
      isActive: true,
    };

    const res = await request(app).post("/api/products").send(productData);
    expect(res.statusCode).toBe(201);
    expect(res.body.product).toHaveProperty("name", "Test Product");
    expect(res.body.product).toHaveProperty("category", "Fruits");
  });

  it("should get all products", async () => {
    await Product.create({
      name: "Product1",
      description: "Desc1",
      category: "Fruits",
      price: 50,
      unit: "kg",
      stock: 5,
      availableFor: "Order", // ✅ fixed (was "all")
      imageUrl: "http://example.com/p1.jpg",
      isActive: true,
    });
    await Product.create({
      name: "Product2",
      description: "Desc2",
      category: "Vegetables",
      price: 150,
      unit: "kg",
      stock: 8,
      availableFor: "Order", // ✅ fixed
      imageUrl: "http://example.com/p2.jpg",
      isActive: true,
    });

    const res = await request(app).get("/api/products");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(2);
  });

  it("should get product by id", async () => {
    const product = await Product.create({
      name: "ProductById",
      description: "Desc",
      category: "Vegetables",
      price: 50,
      unit: "kg",
      stock: 5,
      availableFor: "Order",
      imageUrl: "http://example.com/image2.jpg",
      isActive: true,
    });

    const res = await request(app).get(`/api/products/${product._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("name", "ProductById");
    expect(res.body).toHaveProperty("category", "Vegetables");
  });

  it("should update product by id", async () => {
    const product = await Product.create({
      name: "ToUpdate",
      description: "Desc",
      category: "Fruits",
      price: 300,
      unit: "kg",
      stock: 2,
      availableFor: "Order", // ✅ fixed
      imageUrl: "http://example.com/u1.jpg",
      isActive: true,
    });

    const res = await request(app)
      .put(`/api/products/${product._id}`)
      .send({ name: "UpdatedName" });

    expect(res.statusCode).toBe(200);
    expect(res.body.product).toHaveProperty("name", "UpdatedName");
  });

  it("should delete product by id", async () => {
    const product = await Product.create({
      name: "ToDelete",
      description: "Desc",
      category: "Fruits",
      price: 400,
      unit: "kg",
      stock: 1,
      availableFor: "Order", // ✅ fixed
      imageUrl: "http://example.com/d1.jpg",
      isActive: true,
    });

    const res = await request(app).delete(`/api/products/${product._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/deleted successfully/);
  });

  it("should return 404 for non-existent product", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/api/products/${fakeId}`);
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toMatch(/Product not found/);
  });
});
