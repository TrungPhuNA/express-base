const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const auth = require('../../middleware/auth');
const validate = require('../../middleware/validation');
const serviceController = require('../../controllers/admin/serviceController');

/**
 * @swagger
 * tags:
 *   name: Services
 *   description: Pet care service management
 */

/**
 * @swagger
 * /services:
 *   get:
 *     summary: Get all services
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number
 *         required: false
 *         schema:
 *           type: integer
 *       - name: page_size
 *         in: query
 *         description: Number of items per page
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved all services
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     services:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             description: The service ID
 *                           name:
 *                             type: string
 *                             description: The service name
 *                           description:
 *                             type: string
 *                             description: The service description
 *                           price:
 *                             type: number
 *                             description: The service price
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             description: The date the service was created
 *                     meta:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: integer
 *                         total_page:
 *                           type: integer
 *                         page:
 *                           type: integer
 *                         page_size:
 *                           type: integer
 *       500:
 *         description: Server error
 */
router.get('/', auth, serviceController.getAllServices);

/**
 * @swagger
 * /services:
 *   post:
 *     summary: Create a new service
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The service name
 *               description:
 *                 type: string
 *                 description: The service description
 *               price:
 *                 type: number
 *                 description: The service price
 *     responses:
 *       201:
 *         description: Successfully created a new service
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The service ID
 *                 name:
 *                   type: string
 *                   description: The service name
 *                 description:
 *                   type: string
 *                   description: The service description
 *                 price:
 *                   type: number
 *                   description: The service price
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date the service was created
 *       500:
 *         description: Server error
 */
router.post(
    '/',
    [
        auth,
        check('name', 'Tên dịch vụ là bắt buộc').not().isEmpty(),
        check('description', 'Mô tả dịch vụ là bắt buộc').not().isEmpty(),
        check('price', 'Giá dịch vụ là bắt buộc').isNumeric(),
    ],
    validate,
    serviceController.createService
);

/**
 * @swagger
 * /services/{id}:
 *   get:
 *     summary: Get a service by ID
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the service to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the service
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The service ID
 *                 name:
 *                   type: string
 *                   description: The service name
 *                 description:
 *                   type: string
 *                   description: The service description
 *                 price:
 *                   type: number
 *                   description: The service price
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date the service was created
 *       404:
 *         description: Service not found
 *       500:
 *         description: Server error
 */
router.get('/:id', auth, serviceController.getServiceById);

/**
 * @swagger
 * /services/{id}:
 *   put:
 *     summary: Update an existing service
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the service to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The service name
 *               description:
 *                 type: string
 *                 description: The service description
 *               price:
 *                 type: number
 *                 description: The service price
 *     responses:
 *       200:
 *         description: Successfully updated the service
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The service ID
 *                 name:
 *                   type: string
 *                   description: The service name
 *                 description:
 *                   type: string
 *                   description: The service description
 *                 price:
 *                   type: number
 *                   description: The service price
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date the service was created
 *       404:
 *         description: Service not found
 *       500:
 *         description: Server error
 */
router.put(
    '/:id',
    [
        auth,
        check('name', 'Tên dịch vụ là bắt buộc').not().isEmpty(),
        check('description', 'Mô tả dịch vụ là bắt buộc').not().isEmpty(),
        check('price', 'Giá dịch vụ là bắt buộc').isNumeric(),
    ],
    validate,
    serviceController.updateService
);

/**
 * @swagger
 * /services/{id}:
 *   delete:
 *     summary: Delete an existing service
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the service to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted the service
 *       500:
 *         description: Server error
 */
router.delete('/:id', auth, serviceController.deleteService);

module.exports = router;
