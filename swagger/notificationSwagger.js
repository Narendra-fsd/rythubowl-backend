/**
 * @swagger
 * tags:
 *   name: Notification
 *   description: Manage notifications
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 64c93b2fae3a6d1a14fcb790
 *         user:
 *           type: string
 *           description: User ID the notification belongs to
 *           example: 64c94567ae3a6d1a14fcb722
 *         title:
 *           type: string
 *           example: Order Shipped
 *         message:
 *           type: string
 *           example: Your order #1234 has been shipped.
 *         type:
 *           type: string
 *           enum: [Order, Subscription, System]
 *           example: Order
 *         isRead:
 *           type: boolean
 *           example: false
 *         readAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           example: null
 *         expiresAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           example: null
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 * 
 *     CreateNotificationRequest:
 *       type: object
 *       required:
 *         - user
 *         - title
 *         - message
 *       properties:
 *         user:
 *           oneOf:
 *             - type: string
 *               example: 64c94567ae3a6d1a14fcb722
 *             - type: array
 *               items:
 *                 type: string
 *               example: ["64c94567ae3a6d1a14fcb722", "64c94567ae3a6d1a14fcb723"]
 *         title:
 *           type: string
 *           example: Order Shipped
 *         message:
 *           type: string
 *           example: Your order #1234 has been shipped.
 *         type:
 *           type: string
 *           enum: [Order, Subscription, System]
 *           example: Order
 */

/**
 * @swagger
 * /api/notifications:
 *   post:
 *     summary: Create a new notification (Admin / SuperAdmin only)
 *     tags: [Notification]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateNotificationRequest'
 *     responses:
 *       201:
 *         description: Notification(s) created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 notifications:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Notification'
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Failed to create notification
 *
 *   get:
 *     summary: Get all notifications (SuperAdmin only)
 *     tags: [Notification]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notification'
 *       500:
 *         description: Failed to fetch notifications
 */

/**
 * @swagger
 * /api/notifications/my:
 *   get:
 *     summary: Get logged-in user's notifications
 *     tags: [Notification]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notification'
 *       500:
 *         description: Failed to fetch notifications
 */

/**
 * @swagger
 * /api/notifications/{id}/read:
 *   put:
 *     summary: Mark notification as read
 *     tags: [Notification]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Notification ID
 *     responses:
 *       200:
 *         description: Notification marked as read
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 notification:
 *                   $ref: '#/components/schemas/Notification'
 *       403:
 *         description: Access denied
 *       404:
 *         description: Notification not found
 *       500:
 *         description: Failed to update notification
 */

/**
 * @swagger
 * /api/notifications/{id}:
 *   delete:
 *     summary: Delete a notification (SuperAdmin only)
 *     tags: [Notification]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Notification ID
 *     responses:
 *       200:
 *         description: Notification deleted successfully
 *       404:
 *         description: Notification not found
 *       500:
 *         description: Failed to delete notification
 */
