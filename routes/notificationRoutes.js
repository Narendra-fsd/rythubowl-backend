const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const authMiddleware = require('../middlewares/authMiddleware');
const { rbacMiddleware } = require('../middlewares/rbacMiddleware');


// Admin / SuperAdmin create notification
router.post('/', authMiddleware, rbacMiddleware('SuperAdmin'), notificationController.createNotification);

// Get all notifications (SuperAdmin only)
router.get('/', authMiddleware, rbacMiddleware('SuperAdmin'), notificationController.getAllNotifications);

// Get logged-in user notifications
router.get('/my', authMiddleware, rbacMiddleware('User', 'DeliveryAgent', 'SuperAdmin'), notificationController.getUserNotifications);

// Mark notification as read
router.put('/:id/read', authMiddleware, rbacMiddleware('User', 'DeliveryAgent', 'SuperAdmin'), notificationController.markAsRead);

// Delete notification (SuperAdmin only)
router.delete('/:id', authMiddleware, rbacMiddleware('SuperAdmin'), notificationController.deleteNotification);

module.exports = router;
