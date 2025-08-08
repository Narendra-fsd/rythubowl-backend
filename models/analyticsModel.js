const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  totalUsers: { type: Number, default: 0 },
  totalOrders: { type: Number, default: 0 },
  totalSales: { type: Number, default: 0 },
  salesPerMonth: [
    {
      month: Number,
      year: Number,
      total: Number
    }
  ],
  topProducts: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name: String,
      totalQuantity: Number
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Analytics', analyticsSchema);
