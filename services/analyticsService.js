const Order = require('../models/orderModel');
const User = require('../models/userModel');
const Product = require('../models/productModel');

const calculateAnalytics = async () => {
  const totalUsers = await User.countDocuments();
  const totalOrders = await Order.countDocuments();

  const totalSalesAgg = await Order.aggregate([
    { $group: { _id: null, total: { $sum: '$totalAmount' } } }
  ]);
  const totalSales = totalSalesAgg.length > 0 ? totalSalesAgg[0].total : 0;

  const salesPerMonth = await Order.aggregate([
    {
      $group: {
        _id: { month: { $month: '$createdAt' }, year: { $year: '$createdAt' } },
        total: { $sum: '$totalAmount' }
      }
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 }
  ]);

  const topProducts = await Order.aggregate([
    { $unwind: '$products' },
    {
      $group: {
        _id: '$products.product',
        totalQuantity: { $sum: '$products.quantity' }
      }
    },
    { $sort: { totalQuantity: -1 } },
    { $limit: 5 },
    {
      $lookup: {
        from: 'products',
        localField: '_id',
        foreignField: '_id',
        as: 'productDetails'
      }
    },
    { $unwind: '$productDetails' },
    {
      $project: {
        _id: 0,
        productId: '$productDetails._id',
        name: '$productDetails.name',
        totalQuantity: 1
      }
    }
  ]);

  return {
    totalUsers,
    totalOrders,
    totalSales,
    salesPerMonth,
    topProducts
  };
};

module.exports = { calculateAnalytics };
