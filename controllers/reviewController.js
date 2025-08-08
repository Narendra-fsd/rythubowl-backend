const Review = require('../models/reviewModel');

// Create a review
exports.createReview = async (req, res) => {
  try {
    const { product, rating, comment } = req.body;

    const review = new Review({
      user: req.user.userId,
      product,
      rating,
      comment
    });

    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add review', error: err.message });
  }
};

// Get all reviews (optionally for a specific product)
exports.getAllReviews = async (req, res) => {
  try {
    const { productId } = req.query;
    const filter = productId ? { product: productId } : {};
    const reviews = await Review.find(filter).populate('user', 'name').populate('product', 'name');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch reviews', error: err.message });
  }
};

// Delete a review (SuperAdmin or Review Owner)
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    if (req.user.role !== 'SuperAdmin' && req.user.userId !== review.user.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this review' });
    }

    await review.deleteOne();
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete review', error: err.message });
  }
};
