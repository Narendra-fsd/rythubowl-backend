import Order from "../models/orderModel.js";

// Create new order
export const createOrder = async (req, res) => {
  try {
    const order = new Order({
      user: req.user.userId,
      ...req.body,
    });

    await order.save();

    // Notify user about order creation
    await createNotification(
      req.user.userId,
      "Order Placed",
      `Your order #${order._id} has been placed successfully.`,
      "Order"
    );

    // 🔹 Update analytics after order creation
    try {
      const analyticsData = await calculateAnalytics();
      await Analytics.create(analyticsData);
    } catch (analyticsErr) {
      console.error(
        "Analytics update failed after order creation:",
        analyticsErr.message
      );
    }

    res.status(201).json(order);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to place order", error: err.message });
  }
};

// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("products.product", "name")
      .populate("deliveryAddress");

    res.json(orders);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch orders", error: err.message });
  }
};

// Get order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("products.product", "name")
      .populate("deliveryAddress");

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch order", error: err.message });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus, paymentStatus, deliveryDate } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (orderStatus) order.orderStatus = orderStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;
    if (deliveryDate) order.deliveryDate = deliveryDate;

    await order.save();

    // Send notification when order status changes
    if (orderStatus) {
      await createNotification(
        order.user,
        "Order Status Updated",
        `Your order #${order._id} status has been updated to: ${orderStatus}.`,
        "Order"
      );
    }

    // 🔹 Update analytics after order update
    try {
      const analyticsData = await calculateAnalytics();
      await Analytics.create(analyticsData);
    } catch (analyticsErr) {
      console.error(
        "Analytics update failed after order update:",
        analyticsErr.message
      );
    }

    res.json({ message: "Order updated", order });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update order", error: err.message });
  }
};

// Delete order
export const deleteOrder = async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Order not found" });

    // Notify user about order deletion
    await createNotification(
      deleted.user,
      "Order Cancelled",
      `Your order #${deleted._id} has been cancelled by the admin.`,
      "Order"
    );

    // 🔹 Update analytics after order deletion
    try {
      const analyticsData = await calculateAnalytics();
      await Analytics.create(analyticsData);
    } catch (analyticsErr) {
      console.error(
        "Analytics update failed after order deletion:",
        analyticsErr.message
      );
    }

    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete order", error: err.message });
  }
};
