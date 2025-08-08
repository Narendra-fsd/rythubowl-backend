const mongoose = require('mongoose');

const pincodeZoneSchema = new mongoose.Schema({
  pincode: { type: String, required: true, unique: true },
  zoneName: { type: String, required: true }, // e.g., West Hyderabad
  deliveryAvailable: { type: Boolean, default: true },
  deliveryCharges: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('PincodeZone', pincodeZoneSchema);
