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
    const notification = await Notification.create({
      user: userId,
      title,
      message,
      type
    });
    return notification;
  } catch (err) {
    console.error(`[NotificationService] Failed to create notification for user ${userId}: ${err.message}`);
    throw new Error('Notification creation failed');
  }
};

/**
 * Mark a notification as read
 * @param {ObjectId} notificationId
 */
const markAsRead = async (notificationId) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true }
    );
    if (!notification) throw new Error('Notification not found');
    return notification;
  } catch (err) {
    console.error(`[NotificationService] Failed to mark as read (${notificationId}): ${err.message}`);
    throw new Error('Mark as read failed');
  }
};

/**
 * Get notifications for a specific user
 * @param {ObjectId} userId
 * @param {Boolean} populateUser - Whether to populate user details
 */
const getUserNotifications = async (userId, populateUser = false) => {
  try {
    let query = Notification.find({ user: userId })
      .sort({ createdAt: -1 })
      .lean();

    if (populateUser) {
      query = query.populate('user', 'name email');
    }

    return await query;
  } catch (err) {
    console.error(`[NotificationService] Failed to fetch notifications for user ${userId}: ${err.message}`);
    throw new Error('Fetching notifications failed');
  }
};

module.exports = {
  createNotification,
  markAsRead,
  getUserNotifications
};
