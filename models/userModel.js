import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, unique: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ["User", "DeliveryAgent", "SuperAdmin"],
      default: "User",
    },
    isEmailVerified: { type: Boolean, default: true },

    addresses: [
      {
        street: String,
        city: String,
        state: String,
        zip: String,
        landmark: String,
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
