const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');
const authMiddleware = require('../middlewares/authMiddleware');
const { rbacMiddleware } = require('../middlewares/rbacMiddleware');

// Create subscription
router.post('/', authMiddleware, subscriptionController.createSubscription);

// Get all subscriptions (SuperAdmin only)
router.get('/', authMiddleware, rbacMiddleware('SuperAdmin'), subscriptionController.getAllSubscriptions);

// Get subscription by ID (Owner or SuperAdmin)
router.get('/:id', authMiddleware, subscriptionController.getSubscriptionById);

// Update subscription (SuperAdmin only)
router.put('/:id', authMiddleware, rbacMiddleware('SuperAdmin'), subscriptionController.updateSubscription);

// Cancel subscription (Owner or SuperAdmin)
router.delete('/:id', authMiddleware, subscriptionController.cancelSubscription);

module.exports = router;
