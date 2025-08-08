const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middlewares/authMiddleware');

// Public: get all reviews
router.get('/', reviewController.getAllReviews);

// Authenticated users can create and delete reviews
router.use(authMiddleware);

router.post('/', reviewController.createReview);
router.delete('/:id', reviewController.deleteReview);

module.exports = router;
