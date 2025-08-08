const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
    subscription: { type: mongoose.Schema.Types.ObjectId, ref: "Subscription" },
    paymentMode: {
      type: String,
      enum: ["CashOnDelivery", "Online"],
      required: true,
    },
    paymentGateway: {
      type: String,
      enum: ["Razorpay", "COD"],
      default: "Razorpay",
    },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Success", "Failed"],
      default: "Pending",
    },
    transactionId: { type: String },
    paymentDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
