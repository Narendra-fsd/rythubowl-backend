const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);


router.post('/', orderController.createOrder);
router.get('/:id', orderController.getOrderById);
router.get('/', orderController.getAllOrders);
router.put('/:id', orderController.updateOrderStatus);
router.delete('/:id', orderController.deleteOrder);

module.exports = router;