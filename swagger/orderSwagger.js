/**
 * @swagger
 * tags:
 *   name: Order
 *   description: Manage orders
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     OrderItem:
 *       type: object
 *       properties:
 *         product:
 *           type: string
 *           description: Product ID
 *           example: 64c94567ae3a6d1a14fcb722
 *         name:
 *           type: string
 *           example: Wireless Mouse
 *         quantity:
 *           type: integer
 *           example: 2
 *         price:
 *           type: number
 *           format: float
 *           example: 25.99
 *
 *     Order:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 64d12b3fae3a6d1a14fcb799
 *         user:
 *           type: string
 *           description: User ID who placed the order
 *           example: 64c94567ae3a6d1a14fcb722
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderItem'
 *         totalAmount:
 *           type: number
 *           format: float
 *           example: 59.98
 *         paymentStatus:
 *           type: string
 *           enum: [Pending, Paid, Failed, Refunded]
 *           example: Paid
 *         orderStatus:
 *           type: string
 *           enum: [Pending, Processing, Shipped, Delivered, Cancelled]
 *           example: Shipped
 *         shippingAddress:
 *           type: string
 *           example: 123 Main Street, New York, NY 10001
 *         billingAddress:
 *           type: string
 *           example: 123 Main Street, New York, NY 10001
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     CreateOrderRequest:
 *       type: object
 *       required:
 *         - items
 *         - shippingAddress
 *         - billingAddress
 *       properties:
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderItem'
 *         shippingAddress:
 *           type: string
 *           example: 123 Main Street, New York, NY 10001
 *         billingAddress:
 *           type: string
 *           example: 123 Main Street, New York, NY 10001
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order (User only)
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrderRequest'
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Failed to create order
 *
 *   get:
 *     summary: Get all orders (Admin / SuperAdmin only)
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       500:
 *         description: Failed to fetch orders
 */

/**
 * @swagger
 * /api/orders/my:
 *   get:
 *     summary: Get logged-in user's orders
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       500:
 *         description: Failed to fetch orders
 */

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 *       500:
 *         description: Failed to fetch order
 *
 *   put:
 *     summary: Update order status (Admin / SuperAdmin only)
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderStatus:
 *                 type: string
 *                 enum: [Pending, Processing, Shipped, Delivered, Cancelled]
 *                 example: Delivered
 *     responses:
 *       200:
 *         description: Order updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 *       500:
 *         description: Failed to update order
 *
 *   delete:
 *     summary: Delete an order (SuperAdmin only)
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 *       500:
 *         description: Failed to delete order
 */

/**
 * @swagger
 * /api/orders/{id}/cancel:
 *   put:
 *     summary: Cancel order (User only, if not yet shipped)
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order cancelled successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       403:
 *         description: Not allowed to cancel this order
 *       404:
 *         description: Order not found
 *       500:
 *         description: Failed to cancel order
 */
