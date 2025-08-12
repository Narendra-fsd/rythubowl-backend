/**
 * @swagger
 * tags:
 *   name: Analytics
 *   description: Application analytics (SuperAdmin only)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Analytics:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 64c92b5fae3a6d1a14fcb789
 *         totalUsers:
 *           type: number
 *           example: 1200
 *         totalOrders:
 *           type: number
 *           example: 450
 *         totalSales:
 *           type: number
 *           example: 87500
 *         salesPerMonth:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               month:
 *                 type: number
 *                 example: 7
 *               year:
 *                 type: number
 *                 example: 2025
 *               total:
 *                 type: number
 *                 example: 15000
 *         topProducts:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 64c92b1eae3a6d1a14fcb123
 *               name:
 *                 type: string
 *                 example: Organic Mangoes
 *               totalQuantity:
 *                 type: number
 *                 example: 200
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/analytics/live:
 *   get:
 *     summary: Get live analytics from the database
 *     description: Fetches analytics in real-time without storing them in the Analytics collection.
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Live analytics data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Analytics'
 *       500:
 *         description: Failed to fetch analytics
 */

/**
 * @swagger
 * /api/analytics/cached:
 *   get:
 *     summary: Get cached analytics from the database
 *     description: Fetches the latest saved analytics from the Analytics collection.
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cached analytics data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Analytics'
 *       404:
 *         description: No analytics data found
 *       500:
 *         description: Failed to fetch cached analytics
 */

/**
 * @swagger
 * /api/analytics/update:
 *   post:
 *     summary: Manually update cached analytics
 *     description: Calculates analytics and stores them in the Analytics collection. **SuperAdmin only**.
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Analytics updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Analytics updated successfully
 *                 analytics:
 *                   $ref: '#/components/schemas/Analytics'
 *       500:
 *         description: Failed to update analytics
 */
