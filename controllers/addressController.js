const Address = require("../models/addressModel");

// Create address
exports.createAddress = async (req, res) => {
  try {
    console.log("Creating address for user:", req.body);
    const address = await Address.create({
      ...req.body,
    });
    res.status(201).json({ message: "Address created", address });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create address", error: err.message });
  }
};

// Get all addresses of the logged-in user
exports.getMyAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ userId: req.user.userId });
    res.status(200).json(addresses);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch addresses", error: err.message });
  }
};

// Get a specific address by ID
exports.getAddressById = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: "Address ID is required" });
  }
  try {
    const address = await Address.find({
      userId: req.params.id,
    });

    if (!address) return res.status(404).json({ message: "Address not found" });

    res.status(200).json(address);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch address", error: err.message });
  }
};

// Update address
exports.updateAddress = async (req, res) => {
  try {
    const updated = await Address.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true }
    );

    if (!updated)
      return res
        .status(404)
        .json({ message: "Address not found or unauthorized" });

    res.status(200).json({ message: "Address updated", address: updated });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update address", error: err.message });
  }
};

// Delete address
exports.deleteAddress = async (req, res) => {
  try {
    const deleted = await Address.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!deleted)
      return res
        .status(404)
        .json({ message: "Address not found or unauthorized" });

    res.status(200).json({ message: "Address deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete address", error: err.message });
  }
};
