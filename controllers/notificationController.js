const Notification = require('../models/notificationModel');

// Create Notification (supports single or multiple users)
exports.createNotification = async (req, res) => {
  try {
    let { user, title, message, type } = req.body;

    if (!user || !title || !message) {
      return res.status(400).json({ message: 'User, title, and message are required' });
    }

    // Support single user ID or array
    const users = Array.isArray(user) ? user : [user];
    const notifications = users.map(uid => ({ user: uid, title, message, type }));

    const created = await Notification.insertMany(notifications);

    res.status(201).json({
      message: `${created.length} notification(s) created`,
      notifications: created
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create notification', error: err.message });
  }
};

// Get all notifications (SuperAdmin only)
exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch notifications', error: err.message });
  }
};

// Get logged-in user notifications
exports.getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch notifications', error: err.message });
  }
};

// Mark as read
exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    // Only allow if it's their notification or they're a SuperAdmin
    if (req.user.role !== 'SuperAdmin' && notification.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    notification.isRead = true;
    notification.readAt = new Date();
    await notification.save();

    res.json({ message: 'Notification marked as read', notification });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update notification', error: err.message });
  }
};

// Delete Notification (SuperAdmin only)
exports.deleteNotification = async (req, res) => {
  try {
    const deleted = await Notification.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.json({ message: 'Notification deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete notification', error: err.message });
  }
};
