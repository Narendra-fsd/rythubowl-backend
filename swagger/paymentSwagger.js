/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: Manage payments and transactions
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 64c93b2fae3a6d1a14fcb790
 *         user:
 *           type: string
 *           description: User ID who made the payment
 *           example: 64c94567ae3a6d1a14fcb722
 *         order:
 *           type: string
 *           nullable: true
 *           description: Associated order ID (if any)
 *           example: 64c94567ae3a6d1a14fcb888
 *         subscription:
 *           type: string
 *           nullable: true
 *           description: Associated subscription ID (if any)
 *           example: 64c94567ae3a6d1a14fcb999
 *         paymentMode:
 *           type: string
 *           enum: [CashOnDelivery, Online]
 *           example: Online
 *         paymentGateway:
 *           type: string
 *           enum: [Razorpay, COD]
 *           example: Razorpay
 *         amount:
 *           type: number
 *           example: 499.99
 *         status:
 *           type: string
 *           enum: [Pending, Success, Failed]
 *           example: Success
 *         transactionId:
 *           type: string
 *           example: pay_29QQoUBi66xm2f
 *         paymentDate:
 *           type: string
 *           format: date-time
 *           example: 2025-08-11T10:00:00.000Z
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     CreatePaymentRequest:
 *       type: object
 *       required:
 *         - paymentMode
 *         - amount
 *       properties:
 *         order:
 *           type: string
 *           nullable: true
 *           example: 64c94567ae3a6d1a14fcb888
 *         subscription:
 *           type: string
 *           nullable: true
 *           example: 64c94567ae3a6d1a14fcb999
 *         paymentMode:
 *           type: string
 *           enum: [CashOnDelivery, Online]
 *           example: Online
 *         paymentGateway:
 *           type: string
 *           enum: [Razorpay, COD]
 *           example: Razorpay
 *         amount:
 *           type: number
 *           example: 499.99
 *         transactionId:
 *           type: string
 *           example: pay_29QQoUBi66xm2f
 */

/**
 * @swagger
 * /api/payments/razorpay-order:
 *   post:
 *     summary: Create a Razorpay order
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 499.99
 *     responses:
 *       200:
 *         description: Razorpay order created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 id: order_9A33XWu170gUtm
 *                 amount: 49999
 *                 currency: INR
 *                 receipt: order_rcptid_123
 *       500:
 *         description: Failed to create Razorpay order
 */

/**
 * @swagger
 * /api/payments/verify-razorpay-payment:
 *   post:
 *     summary: Verify Razorpay payment and store in DB
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - paymentId
 *               - signature
 *               - amount
 *             properties:
 *               orderId:
 *                 type: string
 *               paymentId:
 *                 type: string
 *               signature:
 *                 type: string
 *               amount:
 *                 type: number
 *               paymentMode:
 *                 type: string
 *                 enum: [Online, CashOnDelivery]
 *               orderRef:
 *                 type: string
 *               subscriptionRef:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment verified and saved
 *       400:
 *         description: Invalid signature
 *       500:
 *         description: Payment verification failed
 */

/**
 * @swagger
 * /api/payments:
 *   post:
 *     summary: Create a new payment
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePaymentRequest'
 *     responses:
 *       201:
 *         description: Payment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       500:
 *         description: Failed to create payment
 *
 *   get:
 *     summary: Get all payments (SuperAdmin only)
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of payments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Payment'
 *       500:
 *         description: Failed to fetch payments
 */

/**
 * @swagger
 * /api/payments/{id}:
 *   get:
 *     summary: Get payment by ID
 *     tags: [Payment]
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
 *         description: Payment details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Failed to get payment
 *
 *   put:
 *     summary: Update a payment (SuperAdmin only)
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePaymentRequest'
 *     responses:
 *       200:
 *         description: Payment updated successfully
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Failed to update payment
 *
 *   delete:
 *     summary: Delete a payment (SuperAdmin only)
 *     tags: [Payment]
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
 *         description: Payment deleted successfully
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Failed to delete payment
 */
