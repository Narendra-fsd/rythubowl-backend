import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import logger from "./utils/logger.js";
import errorHandler from "./middlewares/errorMiddleware.js";
import setupSwaggerDocs from "./swagger/index.js";
import { adminJs, router } from "./admin.js";

// Import Routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();

const app = express();

// Swagger Documentation
setupSwaggerDocs(app);

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan("dev"));

// AdminJS route
app.use(adminJs.options.rootPath, router);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/products", productRoutes);

// ===== Serve Frontend in Production =====
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// if (process.env.NODE_ENV === "production") {
//   const frontendPath = path.join(__dirname, "..", "frontend", "build");
//   app.use(express.static(frontendPath));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(frontendPath, "index.html"));
//   });
// }

// Error middleware
app.use(errorHandler);

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(
        `📚 Swagger docs available at: http://localhost:${PORT}/api-docs`
      );
      console.log(
        `👨‍💼 AdminJS available at: http://localhost:${PORT}${adminJs.options.rootPath}`
      );
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });

export default app;
