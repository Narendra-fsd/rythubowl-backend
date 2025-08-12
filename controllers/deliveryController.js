const Delivery = require('../models/deliveryModel');
const Notification = require('../models/notificationModel');

exports.createDelivery = async (req, res) => {
  try {
    const delivery = new Delivery(req.body);
    await delivery.save();
    res.status(201).json(delivery);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create delivery', error: err.message });
  }
};

exports.getAllDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find().populate('deliveryAgent', 'name phone').populate('order');
    res.json(deliveries);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch deliveries', error: err.message });
  }
};

exports.getDeliveryById = async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id).populate('deliveryAgent').populate('order');
    if (!delivery) return res.status(404).json({ message: 'Delivery not found' });
    res.json(delivery);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get delivery', error: err.message });
  }
};

// Update delivery status
exports.updateDeliveryStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const delivery = await Delivery.findById(req.params.id).populate('order');

    if (!delivery) {
      return res.status(404).json({ message: 'Delivery not found' });
    }

    delivery.status = status;
    await delivery.save();

    // Create a notification for the customer
    if (delivery.order && delivery.order.customer) {
      let title, message, type = 'Order';

      switch (status) {
        case 'Out for Delivery':
          title = 'Your order is on the way 🚚';
          message = `Order #${delivery.order._id} is out for delivery.`;
          break;
        case 'Delivered':
          title = 'Order delivered ✅';
          message = `Order #${delivery.order._id} has been delivered. Enjoy your meal!`;
          break;
        default:
          title = `Order status updated`;
          message = `Order #${delivery.order._id} status is now ${status}.`;
      }

      await Notification.create({
        user: delivery.order.customer,
        title,
        message,
        type
      });
    }

    res.json({ message: 'Delivery status updated successfully', delivery });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update delivery status', error: err.message });
  }
};

exports.deleteDelivery = async (req, res) => {
  try {
    const deleted = await Delivery.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Delivery not found' });
    res.json({ message: 'Delivery deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete delivery', error: err.message });
  }
};
