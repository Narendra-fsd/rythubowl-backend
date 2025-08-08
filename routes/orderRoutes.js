const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');
const { rbacMiddleware } = require('../middlewares/rbacMiddleware');

router.use(authMiddleware);

// User creates order
router.post('/', orderController.createOrder);

// User or SuperAdmin gets a single order
router.get('/:id', orderController.getOrderById);

// SuperAdmin gets all
router.get('/', rbacMiddleware('SuperAdmin'), orderController.getAllOrders);

// SuperAdmin can update/delete
router.put('/:id', rbacMiddleware('SuperAdmin'), orderController.updateOrderStatus);
router.delete('/:id', rbacMiddleware('SuperAdmin'), orderController.deleteOrder);

module.exports = router;
