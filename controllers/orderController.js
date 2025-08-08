const Order = require('../models/orderModel');
const { assignDeliveryAgent } = require('../services/deliveryTrackingService');
const { createNotification } = require('../services/notificationService');

// Create new order and assign delivery
exports.createOrder = async (req, res) => {
  try {
    const order = new Order({
      user: req.user.userId,
      ...req.body
    });

    await order.save();

    // Assign delivery agent after order is saved
    const deliveryAgentId = req.body.deliveryAgent || null;
    if (deliveryAgentId) {
      await assignDeliveryAgent(order._id, deliveryAgentId);
    }

    // Notify user about order creation
    await createNotification(
      req.user.userId,
      'Order Placed',
      `Your order #${order._id} has been placed successfully.`,
      'Order'
    );

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Failed to place order', error: err.message });
  }
};

// Get all orders (SuperAdmin only)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('products.product', 'name')
      .populate('deliveryAddress')
      .populate('deliveryAgent', 'name phone');

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
  }
};

// Get order by ID (Owner or SuperAdmin)
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('products.product', 'name')
      .populate('deliveryAddress')
      .populate('deliveryAgent', 'name phone');

    if (!order) return res.status(404).json({ message: 'Order not found' });

    if (req.user.role !== 'SuperAdmin' && req.user.userId !== order.user.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch order', error: err.message });
  }
};

// Update order status (SuperAdmin only)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus, paymentStatus, deliveryAgent, deliveryDate } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    if (orderStatus) order.orderStatus = orderStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;
    if (deliveryAgent) order.deliveryAgent = deliveryAgent;
    if (deliveryDate) order.deliveryDate = deliveryDate;

    await order.save();

    // Send notification when order status changes
    if (orderStatus) {
      await createNotification(
        order.user,
        'Order Status Updated',
        `Your order #${order._id} status has been updated to: ${orderStatus}.`,
        'Order'
      );
    }

    res.json({ message: 'Order updated', order });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update order', error: err.message });
  }
};

// Delete order (SuperAdmin only)
exports.deleteOrder = async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Order not found' });

    // Notify user about order deletion
    await createNotification(
      deleted.user,
      'Order Cancelled',
      `Your order #${deleted._id} has been cancelled by the admin.`,
      'Order'
    );

    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete order', error: err.message });
  }
};
