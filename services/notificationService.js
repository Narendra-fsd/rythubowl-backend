const Notification = require('../models/notificationModel');

/**
 * Create a notification for a user
 * @param {ObjectId} userId - User ID to notify
 * @param {String} title - Notification title
 * @param {String} message - Notification message
 * @param {String} type - Notification type (Order, Subscription, System)
 */
const createNotification = async (userId, title, message, type = 'System') => {
  try {
    const notification = new Notification({
      user: userId,
      title,
      message,
      type
    });
    await notification.save();
    return notification;
  } catch (err) {
    console.error('Failed to create notification:', err.message);
    throw new Error('Notification creation failed');
  }
};

/**
 * Mark a notification as read
 * @param {ObjectId} notificationId
 */
const markAsRead = async (notificationId) => {
  try {
    const notification = await Notification.findById(notificationId);
    if (!notification) throw new Error('Notification not found');

    notification.isRead = true;
    await notification.save();
    return notification;
  } catch (err) {
    console.error('Failed to mark notification as read:', err.message);
    throw new Error('Mark as read failed');
  }
};

/**
 * Get notifications for a specific user
 * @param {ObjectId} userId
 */
const getUserNotifications = async (userId) => {
  try {
    return await Notification.find({ user: userId }).sort({ createdAt: -1 });
  } catch (err) {
    console.error('Failed to fetch notifications:', err.message);
    throw new Error('Fetching notifications failed');
  }
};

module.exports = {
  createNotification,
  markAsRead,
  getUserNotifications
};
