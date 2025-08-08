const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ['User', 'DeliveryAgent', 'SuperAdmin'],
    required: true,
    unique: true,
  },
  permissions: [
    {
      type: String,
      enum: [
        'CREATE_PRODUCT',
        'UPDATE_PRODUCT',
        'DELETE_PRODUCT',
        'VIEW_ALL_ORDERS',
        'MANAGE_DELIVERIES',
        'ACCESS_ANALYTICS',
      ],
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('Role', roleSchema);
