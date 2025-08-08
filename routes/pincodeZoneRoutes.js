const express = require('express');
const router = express.Router();
const zoneController = require('../controllers/pincodeZoneController');
const authMiddleware = require('../middlewares/authMiddleware');
const { rbacMiddleware } = require('../middlewares/rbacMiddleware');

router.use(authMiddleware);
router.use(rbacMiddleware('SuperAdmin')); // Only SuperAdmin can manage zones

router.post('/', zoneController.createZone);
router.get('/', zoneController.getAllZones);
router.get('/:pincode', zoneController.getZoneByPincode);
router.put('/:pincode', zoneController.updateZone);
router.delete('/:pincode', zoneController.deleteZone);

module.exports = router;
