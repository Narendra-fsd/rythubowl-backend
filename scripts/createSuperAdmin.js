require("dotenv").config();
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const createSuperAdmin = async () => {
  const existingAdmin = await User.findOne({ role: "SuperAdmin" });
  if (existingAdmin) {
    console.log("✅ SuperAdmin already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash("SuperSecure@123", 10);

  const superAdmin = new User({
    name: "Super Admin",
    email: "admin@rythubowl.com",
    phone: "9999999999",
    passwordHash: hashedPassword,
    role: "SuperAdmin",
  });

  await superAdmin.save();
  console.log("✅ SuperAdmin created:", superAdmin.email);
};

module.exports = { createSuperAdmin };
