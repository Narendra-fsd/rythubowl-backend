import dotenv from "dotenv";
// Load environment variables FIRST
dotenv.config();
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from "@adminjs/mongoose";
import mongoose from "mongoose";

import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import Payment from "./models/paymentModel.js";
import Address from "./models/addressModel.js";

// Register mongoose adapter
AdminJS.registerAdapter(AdminJSMongoose);

const adminJs = new AdminJS({
  databases: [mongoose],
  rootPath: "/admin",
  resources: [
    { resource: User, options: { parent: { name: "User Management" } } },
    { resource: Product, options: { parent: { name: "Product Management" } } },
    { resource: Order, options: { parent: { name: "Order Management" } } },
    { resource: Payment, options: { parent: { name: "Payment Management" } } },
    { resource: Address, options: { parent: { name: "Address Management" } } },
  ],
  branding: {
    companyName: "RythuBowl Admin",
    logo: false,
    softwareBrothers: false,
  },
});

// Get credentials from environment variables
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_COOKIE_SECRET = process.env.ADMIN_COOKIE_SECRET;

// Validate that required environment variables are set
if (!ADMIN_EMAIL || !ADMIN_PASSWORD || !ADMIN_COOKIE_SECRET) {
  console.error("❌ Missing required AdminJS environment variables");
  console.error(
    "Please set ADMIN_EMAIL, ADMIN_PASSWORD, and ADMIN_COOKIE_SECRET in your .env file"
  );
  process.exit(1);
}

const router = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
  authenticate: async (email, password) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      return { email: ADMIN_EMAIL };
    }
    return null;
  },
  cookiePassword: ADMIN_COOKIE_SECRET,
});

export { adminJs, router };
