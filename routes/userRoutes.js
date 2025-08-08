const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const { rbacMiddleware } = require('../middlewares/rbacMiddleware');

router.use(authMiddleware); // All routes below require auth

router.get('/', rbacMiddleware('SuperAdmin'), userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', rbacMiddleware('SuperAdmin'), userController.deleteUser);

module.exports = router;
