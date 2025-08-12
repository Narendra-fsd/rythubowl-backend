/**
 * @swagger
 * tags:
 *   name: Review
 *   description: Manage product reviews (Users can create/delete their own, SuperAdmin can delete any)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 64ca4b2fae3a6d1a14fcb799
 *         user:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: 64a8d2efae3a6d1a14fcb788
 *             name:
 *               type: string
 *               example: John Doe
 *         product:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: 64a9b2efa2e5a1f0b4a2d5e7
 *             name:
 *               type: string
 *               example: Fresh Apples
 *         rating:
 *           type: number
 *           example: 5
 *         comment:
 *           type: string
 *           example: Excellent quality apples, very fresh!
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     CreateReviewRequest:
 *       type: object
 *       required:
 *         - product
 *         - rating
 *       properties:
 *         product:
 *           type: string
 *           example: 64a9b2efa2e5a1f0b4a2d5e7
 *         rating:
 *           type: number
 *           minimum: 1
 *           maximum: 5
 *           example: 4
 *         comment:
 *           type: string
 *           example: Very good product, will buy again.
 */

/**
 * @swagger
 * /api/reviews:
 *   get:
 *     summary: Get all reviews (optionally filter by productId)
 *     tags: [Review]
 *     parameters:
 *       - in: query
 *         name: productId
 *         schema:
 *           type: string
 *         description: Filter reviews for a specific product
 *     responses:
 *       200:
 *         description: List of reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       500:
 *         description: Failed to fetch reviews
 *
 *   post:
 *     summary: Create a new review (Authenticated users only)
 *     tags: [Review]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateReviewRequest'
 *     responses:
 *       201:
 *         description: Review created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       500:
 *         description: Failed to add review
 */

/**
 * @swagger
 * /api/reviews/{id}:
 *   delete:
 *     summary: Delete a review by ID (Review owner or SuperAdmin only)
 *     tags: [Review]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       403:
 *         description: Not authorized to delete this review
 *       404:
 *         description: Review not found
 *       500:
 *         description: Failed to delete review
 */
