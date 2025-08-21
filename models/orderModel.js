import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    paymentOrderId: {
      type: String,
      required: true,
    },
    customerDetails: {
      type: Object,
    },
    deliveryAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
    OrderItems: [],

    paymentStatus: {
      type: String,
      enum: ["pending", "initiated", "completed", "failed"],
      default: "pending",
    },
    status: {
      type: String,
      enum: [
        "Placed",
        "pending",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
      default: "pending",
    },
    deliveryDate: { type: Date },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
