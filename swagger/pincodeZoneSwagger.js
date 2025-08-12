/**
 * @swagger
 * tags:
 *   name: PincodeZone
 *   description: Manage delivery zones based on pincodes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PincodeZone:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 64c93b2fae3a6d1a14fcb790
 *         pincode:
 *           type: string
 *           description: Unique postal code for the zone
 *           example: "500001"
 *         zoneName:
 *           type: string
 *           description: Name of the delivery zone
 *           example: "West Hyderabad"
 *         deliveryAvailable:
 *           type: boolean
 *           description: Whether delivery is available in this zone
 *           example: true
 *         deliveryCharges:
 *           type: number
 *           description: Delivery charges for the zone
 *           example: 50
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     CreatePincodeZoneRequest:
 *       type: object
 *       required:
 *         - pincode
 *         - zoneName
 *       properties:
 *         pincode:
 *           type: string
 *           example: "500001"
 *         zoneName:
 *           type: string
 *           example: "West Hyderabad"
 *         deliveryAvailable:
 *           type: boolean
 *           example: true
 *         deliveryCharges:
 *           type: number
 *           example: 50
 */

/**
 * @swagger
 * /api/pincode-zones:
 *   post:
 *     summary: Create a new delivery zone
 *     tags: [PincodeZone]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePincodeZoneRequest'
 *     responses:
 *       201:
 *         description: Zone created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PincodeZone'
 *       500:
 *         description: Failed to create zone
 *
 *   get:
 *     summary: Get all delivery zones
 *     tags: [PincodeZone]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of delivery zones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PincodeZone'
 *       500:
 *         description: Failed to fetch zones
 */

/**
 * @swagger
 * /api/pincode-zones/{pincode}:
 *   get:
 *     summary: Get zone by pincode
 *     tags: [PincodeZone]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: pincode
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Zone details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PincodeZone'
 *       404:
 *         description: Zone not found
 *       500:
 *         description: Failed to fetch zone
 *
 *   put:
 *     summary: Update a zone
 *     tags: [PincodeZone]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: pincode
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePincodeZoneRequest'
 *     responses:
 *       200:
 *         description: Zone updated successfully
 *       404:
 *         description: Zone not found
 *       500:
 *         description: Failed to update zone
 *
 *   delete:
 *     summary: Delete a zone
 *     tags: [PincodeZone]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: pincode
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Zone deleted successfully
 *       404:
 *         description: Zone not found
 *       500:
 *         description: Failed to delete zone
 */
