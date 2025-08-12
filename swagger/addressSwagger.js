/**
 * @swagger
 * tags:
 *   name: Addresses
 *   description: User address management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Address:
 *       type: object
 *       required:
 *         - street
 *         - city
 *         - state
 *         - zip
 *       properties:
 *         _id:
 *           type: string
 *           example: 64c92b5fae3a6d1a14fcb789
 *         userId:
 *           type: string
 *           example: 64c92b1eae3a6d1a14fcb123
 *         street:
 *           type: string
 *           example: "123 Green Farm Road"
 *         city:
 *           type: string
 *           example: "Hyderabad"
 *         state:
 *           type: string
 *           example: "Telangana"
 *         zip:
 *           type: string
 *           example: "500081"
 *         landmark:
 *           type: string
 *           example: "Near Organic Market"
 *         label:
 *           type: string
 *           example: "Home"
 *         isDefault:
 *           type: boolean
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/addresses:
 *   post:
 *     summary: Create a new address
 *     tags: [Addresses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Address'
 *     responses:
 *       201:
 *         description: Address created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Address created
 *                 address:
 *                   $ref: '#/components/schemas/Address'
 *       500:
 *         description: Failed to create address
 *
 *   get:
 *     summary: Get all addresses of the logged-in user
 *     tags: [Addresses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user addresses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Address'
 *       500:
 *         description: Failed to fetch addresses
 */

/**
 * @swagger
 * /api/addresses/{id}:
 *   get:
 *     summary: Get a specific address by ID
 *     tags: [Addresses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Address ID
 *     responses:
 *       200:
 *         description: Address details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Address'
 *       404:
 *         description: Address not found
 *       500:
 *         description: Failed to fetch address
 *
 *   put:
 *     summary: Update a specific address
 *     tags: [Addresses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Address ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Address'
 *     responses:
 *       200:
 *         description: Address updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Address updated
 *                 address:
 *                   $ref: '#/components/schemas/Address'
 *       404:
 *         description: Address not found or unauthorized
 *       500:
 *         description: Failed to update address
 *
 *   delete:
 *     summary: Delete a specific address
 *     tags: [Addresses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Address ID
 *     responses:
 *       200:
 *         description: Address deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Address deleted successfully
 *       404:
 *         description: Address not found or unauthorized
 *       500:
 *         description: Failed to delete address
 */
