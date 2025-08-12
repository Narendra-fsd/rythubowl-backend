/**
 * @swagger
 * tags:
 *   name: Subscriptions
 *   description: API endpoints for managing subscriptions
 */

/**
 * @swagger
 * /api/subscriptions:
 *   post:
 *     summary: Create a new subscription
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product
 *               - planType
 *               - startDate
 *               - price
 *             properties:
 *               product:
 *                 type: string
 *                 description: Product ID for the subscription
 *               planType:
 *                 type: string
 *                 enum: [Weekly, Monthly]
 *               startDate:
 *                 type: string
 *                 format: date
 *               price:
 *                 type: number
 *             example:
 *               product: 64b8a8c4f98f8a12d4b9f876
 *               planType: Monthly
 *               startDate: 2025-08-12
 *               price: 499
 *     responses:
 *       201:
 *         description: Subscription created successfully
 *       500:
 *         description: Failed to create subscription
 */

/**
 * @swagger
 * /api/subscriptions:
 *   get:
 *     summary: Get all subscriptions (SuperAdmin only)
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all subscriptions
 *       500:
 *         description: Failed to fetch subscriptions
 */

/**
 * @swagger
 * /api/subscriptions/{id}:
 *   get:
 *     summary: Get subscription by ID (Owner or SuperAdmin)
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Subscription ID
 *     responses:
 *       200:
 *         description: Subscription details
 *       404:
 *         description: Subscription not found
 *       403:
 *         description: Access denied
 *       500:
 *         description: Failed to fetch subscription
 */

/**
 * @swagger
 * /api/subscriptions/{id}:
 *   put:
 *     summary: Update subscription (SuperAdmin only)
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Subscription ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               planType:
 *                 type: string
 *                 enum: [Weekly, Monthly]
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               price:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: [Active, Cancelled, Expired]
 *             example:
 *               planType: Weekly
 *               startDate: 2025-08-15
 *               endDate: 2025-09-15
 *               price: 299
 *               status: Active
 *     responses:
 *       200:
 *         description: Subscription updated successfully
 *       404:
 *         description: Subscription not found
 *       500:
 *         description: Failed to update subscription
 */

/**
 * @swagger
 * /api/subscriptions/{id}:
 *   delete:
 *     summary: Cancel subscription (Owner or SuperAdmin)
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Subscription ID
 *     responses:
 *       200:
 *         description: Subscription cancelled successfully
 *       404:
 *         description: Subscription not found
 *       403:
 *         description: Access denied
 *       500:
 *         description: Failed to cancel subscription
 */
