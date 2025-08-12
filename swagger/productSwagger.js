/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Manage products (SuperAdmin only for create, update, delete)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 64c93b2fae3a6d1a14fcb790
 *         name:
 *           type: string
 *           example: Fresh Apples
 *         description:
 *           type: string
 *           example: Crisp and sweet apples, freshly harvested
 *         category:
 *           type: string
 *           enum: [Fruits, Vegetables, Meat, Eggs, Juices, Sprouts]
 *           example: Fruits
 *         price:
 *           type: number
 *           example: 120
 *         unit:
 *           type: string
 *           enum: [kg, g, litre, piece, packet]
 *           example: kg
 *         stock:
 *           type: number
 *           example: 50
 *         availableFor:
 *           type: string
 *           enum: [Order, Subscription, Both]
 *           example: Order
 *         imageUrl:
 *           type: string
 *           example: https://example.com/images/apple.jpg
 *         isActive:
 *           type: boolean
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     CreateProductRequest:
 *       type: object
 *       required:
 *         - name
 *         - category
 *         - price
 *         - stock
 *       properties:
 *         name:
 *           type: string
 *           example: Fresh Apples
 *         description:
 *           type: string
 *           example: Crisp and sweet apples, freshly harvested
 *         category:
 *           type: string
 *           enum: [Fruits, Vegetables, Meat, Eggs, Juices, Sprouts]
 *           example: Fruits
 *         price:
 *           type: number
 *           example: 120
 *         unit:
 *           type: string
 *           enum: [kg, g, litre, piece, packet]
 *           example: kg
 *         stock:
 *           type: number
 *           example: 50
 *         availableFor:
 *           type: string
 *           enum: [Order, Subscription, Both]
 *           example: Order
 *         imageUrl:
 *           type: string
 *           example: https://example.com/images/apple.jpg
 *         isActive:
 *           type: boolean
 *           example: true
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products (public)
 *     tags: [Product]
 *     parameters:
 *       - in: query
 *         name: availableFor
 *         schema:
 *           type: string
 *           enum: [Order, Subscription, Both]
 *         description: Filter products by availability type
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Failed to fetch products
 *
 *   post:
 *     summary: Create a new product (SuperAdmin only)
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProductRequest'
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Failed to create product
 */

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Failed to get product
 *
 *   put:
 *     summary: Update a product by ID (SuperAdmin only)
 *     tags: [Product]
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
 *             $ref: '#/components/schemas/CreateProductRequest'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Failed to update product
 *
 *   delete:
 *     summary: Delete a product by ID (SuperAdmin only)
 *     tags: [Product]
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
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Failed to delete product
 */
