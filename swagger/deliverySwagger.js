/**
 * @swagger
 * tags:
 *   name: Delivery
 *   description: Manage deliveries
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Delivery:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 64c93b2fae3a6d1a14fcb790
 *         order:
 *           type: string
 *           description: Order ID
 *           example: 64c91234ae3a6d1a14fcb711
 *         deliveryAgent:
 *           type: string
 *           description: User ID of the delivery agent
 *           example: 64c94567ae3a6d1a14fcb722
 *         deliveryStatus:
 *           type: string
 *           enum: [Pending, OutForDelivery, Delivered, Cancelled]
 *           example: Pending
 *         deliveredAt:
 *           type: string
 *           format: date-time
 *           example: 2025-08-11T12:34:56.000Z
 *         notes:
 *           type: string
 *           example: Leave at front desk
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 * 
 *     CreateDeliveryRequest:
 *       type: object
 *       required:
 *         - order
 *         - deliveryAgent
 *       properties:
 *         order:
 *           type: string
 *           example: 64c91234ae3a6d1a14fcb711
 *         deliveryAgent:
 *           type: string
 *           example: 64c94567ae3a6d1a14fcb722
 *         deliveryStatus:
 *           type: string
 *           enum: [Pending, OutForDelivery, Delivered, Cancelled]
 *           example: Pending
 *         deliveredAt:
 *           type: string
 *           format: date-time
 *           example: 2025-08-11T12:34:56.000Z
 *         notes:
 *           type: string
 *           example: Leave at front desk
 */

/**
 * @swagger
 * /api/deliveries:
 *   post:
 *     summary: Create a new delivery
 *     tags: [Delivery]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateDeliveryRequest'
 *     responses:
 *       201:
 *         description: Delivery created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Delivery'
 *       500:
 *         description: Failed to create delivery
 *
 *   get:
 *     summary: Get all deliveries
 *     tags: [Delivery]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of deliveries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Delivery'
 *       500:
 *         description: Failed to fetch deliveries
 */

/**
 * @swagger
 * /api/deliveries/{id}:
 *   get:
 *     summary: Get delivery by ID
 *     tags: [Delivery]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Delivery ID
 *     responses:
 *       200:
 *         description: Delivery found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Delivery'
 *       404:
 *         description: Delivery not found
 *       500:
 *         description: Failed to get delivery
 *
 *   put:
 *     summary: Update delivery by ID
 *     tags: [Delivery]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Delivery ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateDeliveryRequest'
 *     responses:
 *       200:
 *         description: Delivery updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Delivery'
 *       404:
 *         description: Delivery not found
 *       500:
 *         description: Failed to update delivery
 *
 *   delete:
 *     summary: Delete delivery by ID
 *     tags: [Delivery]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Delivery ID
 *     responses:
 *       200:
 *         description: Delivery deleted successfully
 *       404:
 *         description: Delivery not found
 *       500:
 *         description: Failed to delete delivery
 */
