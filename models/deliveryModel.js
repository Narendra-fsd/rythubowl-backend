const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  deliveryAgent: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  deliveryStatus: {
    type: String,
    enum: ['Pending', 'OutForDelivery', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
  deliveredAt: { type: Date },
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Delivery', deliverySchema);
