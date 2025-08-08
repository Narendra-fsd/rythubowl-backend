const Subscription = require('../models/subscriptionModel');
const { createRazorpayOrder } = require('../services/paymentService');
const { createNotification } = require('../services/notificationService');

// Create a subscription
exports.createSubscription = async (req, res) => {
  try {
    const { product, planType, startDate, price } = req.body;

    const subscription = new Subscription({
      user: req.user.userId,
      product,
      planType,
      startDate,
      price
    });

    await subscription.save();

    // Create Razorpay order for payment
    const razorpayOrder = await createRazorpayOrder(price * 100, 'INR', `sub_${subscription._id}`);

    // Send notification
    await createNotification(
      req.user.userId,
      'Subscription Created',
      `Your ${planType} subscription for product has been created.`,
      'Subscription'
    );

    res.status(201).json({ subscription, razorpayOrder });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create subscription', error: err.message });
  }
};

// Get all subscriptions (SuperAdmin only)
exports.getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find()
      .populate('user', 'name email')
      .populate('product', 'name price');

    res.json(subscriptions);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch subscriptions', error: err.message });
  }
};

// Get subscription by ID (Owner or SuperAdmin)
exports.getSubscriptionById = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id)
      .populate('user', 'name email')
      .populate('product', 'name price');

    if (!subscription) return res.status(404).json({ message: 'Subscription not found' });

    if (req.user.role !== 'SuperAdmin' && req.user.userId !== subscription.user.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(subscription);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch subscription', error: err.message });
  }
};

// Update subscription (SuperAdmin only)
exports.updateSubscription = async (req, res) => {
  try {
    const updated = await Subscription.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Subscription not found' });

    await createNotification(
      updated.user,
      'Subscription Updated',
      `Your subscription #${updated._id} has been updated.`,
      'Subscription'
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update subscription', error: err.message });
  }
};

// Cancel subscription
exports.cancelSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    if (!subscription) return res.status(404).json({ message: 'Subscription not found' });

    if (req.user.role !== 'SuperAdmin' && req.user.userId !== subscription.user.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    subscription.status = 'Cancelled';
    await subscription.save();

    await createNotification(
      subscription.user,
      'Subscription Cancelled',
      `Your subscription #${subscription._id} has been cancelled.`,
      'Subscription'
    );

    res.json({ message: 'Subscription cancelled successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to cancel subscription', error: err.message });
  }
};
