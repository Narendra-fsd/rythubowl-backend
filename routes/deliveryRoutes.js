const express = require('express');
const router = express.Router();
const deliveryController = require('../controllers/deliveryController');
const authMiddleware = require('../middlewares/authMiddleware');
const { rbacMiddleware } = require('../middlewares/rbacMiddleware');


// Only SuperAdmin can manage all deliveries
router.post('/', authMiddleware, rbacMiddleware('SuperAdmin'), deliveryController.createDelivery);

router.get('/', rbacMiddleware('SuperAdmin'), deliveryController.getAllDeliveries);
router.get('/:id', rbacMiddleware('SuperAdmin', 'DeliveryAgent'), deliveryController.getDeliveryById);
router.put('/:id', rbacMiddleware('SuperAdmin', 'DeliveryAgent'), deliveryController.updateDelivery);
router.delete('/:id', rbacMiddleware('SuperAdmin'), deliveryController.deleteDelivery);

module.exports = router;
