const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
    landmark: { type: String },
    label: { type: String, default: "Home" }, // e.g., Home, Office
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", addressSchema);
