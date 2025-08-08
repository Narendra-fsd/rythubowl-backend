const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const authMiddleware = require('../middlewares/authMiddleware');
const { rbacMiddleware } = require('../middlewares/rbacMiddleware');

// SuperAdmin only
router.get('/live', authMiddleware, rbacMiddleware('SuperAdmin'), analyticsController.getLiveAnalytics);
router.get('/cached', authMiddleware, rbacMiddleware('SuperAdmin'), analyticsController.getCachedAnalytics);
router.post('/update', authMiddleware, rbacMiddleware('SuperAdmin'), analyticsController.updateCachedAnalytics);

module.exports = router;
