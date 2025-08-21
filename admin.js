import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from "@adminjs/mongoose";
import mongoose from "mongoose";

import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";

// Register mongoose adapter
AdminJS.registerAdapter(AdminJSMongoose);

const adminJs = new AdminJS({
  databases: [mongoose],
  rootPath: "/admin",
  resources: [
    { resource: User, options: { parent: { name: "User Management" } } },
    { resource: Product, options: { parent: { name: "Product Management" } } },
    { resource: Order, options: { parent: { name: "Order Management" } } },
  ],
  branding: {
    companyName: "RythuBowl Admin",
    logo: false,
    softwareBrothers: false,
  },
});

const ADMIN = {
  email: process.env.ADMIN_EMAIL || "admin@example.com",
  password: process.env.ADMIN_PASSWORD || "Narendra@8008072852",
};

const router = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
  authenticate: async (email, password) => {
    if (email === ADMIN.email && password === ADMIN.password) {
      return ADMIN;
    }
    return null;
  },
  cookiePassword: "Narendra@8008072852",
});

export { adminJs, router };
