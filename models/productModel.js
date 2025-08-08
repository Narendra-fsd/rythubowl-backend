const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: {
    type: String,
    enum: ['Fruits', 'Vegetables', 'Meat', 'Eggs', 'Juices', 'Sprouts'],
    required: true
  },
  price: { type: Number, required: true },
  unit: { type: String, enum: ['kg', 'g', 'litre', 'piece', 'packet'], default: 'kg' },
  stock: { type: Number, required: true },
  availableFor: {
    type: String,
    enum: ['Order', 'Subscription', 'Both'],
    default: 'Order'
  },
  imageUrl: { type: String },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
