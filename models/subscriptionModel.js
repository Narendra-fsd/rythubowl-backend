const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  planType: { type: String, enum: ['Weekly', 'Monthly'], required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  price: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Failed'], default: 'Pending' },
  status: { type: String, enum: ['Active', 'Cancelled', 'Expired'], default: 'Active' }
}, { timestamps: true });

module.exports = mongoose.model('Subscription', subscriptionSchema);
