const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Product = require("../models/productModel");

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
      availableFor: "Order",
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
      price: 50,
      description: "Desc1",
      availableFor: "all",
    });
    await Product.create({
      name: "Product2",
      price: 150,
      description: "Desc2",
      availableFor: "all",
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
      price: 300,
      description: "Desc",
      availableFor: "all",
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
      price: 400,
      description: "Desc",
      availableFor: "all",
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
