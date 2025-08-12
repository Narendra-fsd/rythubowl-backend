/**
 * @swagger
 * tags:
 *   name: Role
 *   description: Manage user roles (SuperAdmin only)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 64c93b2fae3a6d1a14fcb790
 *         name:
 *           type: string
 *           enum: [User, DeliveryAgent, SuperAdmin]
 *           example: SuperAdmin
 *         permissions:
 *           type: array
 *           items:
 *             type: string
 *             enum:
 *               - CREATE_PRODUCT
 *               - UPDATE_PRODUCT
 *               - DELETE_PRODUCT
 *               - VIEW_ALL_ORDERS
 *               - MANAGE_DELIVERIES
 *               - ACCESS_ANALYTICS
 *           example:
 *             - CREATE_PRODUCT
 *             - UPDATE_PRODUCT
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     CreateRoleRequest:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           enum: [User, DeliveryAgent, SuperAdmin]
 *           example: DeliveryAgent
 *         permissions:
 *           type: array
 *           items:
 *             type: string
 *             enum:
 *               - CREATE_PRODUCT
 *               - UPDATE_PRODUCT
 *               - DELETE_PRODUCT
 *               - VIEW_ALL_ORDERS
 *               - MANAGE_DELIVERIES
 *               - ACCESS_ANALYTICS
 *           example:
 *             - VIEW_ALL_ORDERS
 */

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Get all roles (SuperAdmin only)
 *     tags: [Role]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Role'
 *       500:
 *         description: Failed to fetch roles
 *
 *   post:
 *     summary: Create a new role (SuperAdmin only)
 *     tags: [Role]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRoleRequest'
 *     responses:
 *       201:
 *         description: Role created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       500:
 *         description: Failed to create role
 */

/**
 * @swagger
 * /api/roles/{id}:
 *   get:
 *     summary: Get a role by ID (SuperAdmin only)
 *     tags: [Role]
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
 *         description: Role details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       404:
 *         description: Role not found
 *       500:
 *         description: Failed to fetch role
 *
 *   put:
 *     summary: Update a role by ID (SuperAdmin only)
 *     tags: [Role]
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
 *             $ref: '#/components/schemas/CreateRoleRequest'
 *     responses:
 *       200:
 *         description: Role updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       404:
 *         description: Role not found
 *       500:
 *         description: Failed to update role
 *
 *   delete:
 *     summary: Delete a role by ID (SuperAdmin only)
 *     tags: [Role]
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
 *         description: Role deleted successfully
 *       404:
 *         description: Role not found
 *       500:
 *         description: Failed to delete role
 */
