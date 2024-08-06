const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const auth = require('../../middleware/auth');
const validate = require('../../middleware/validation');
const serviceRegistrationController = require('../../controllers/user/serviceRegistrationController');

/**
 * @swagger
 * tags:
 *   name: User Service Registrations
 *   description: Service registration management
 */

/**
 * @swagger
 * /api/user/services-registration:
 *   post:
 *     summary: Register for a service
 *     tags: [User Service Registrations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               service:
 *                 type: string
 *                 description: The service ID
 *     responses:
 *       201:
 *         description: Successfully registered for the service
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
 *                     registration:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           description: The registration ID
 *                         service:
 *                           type: string
 *                           description: The service ID
 *                         status:
 *                           type: string
 *                           description: The registration status
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           description: The date the registration was created
 *       500:
 *         description: Server error
 */
router.post(
    '/',
    [
        auth,
        check('service', 'Service ID is required').not().isEmpty(),
    ],
    validate,
    serviceRegistrationController.registerService
);

/**
 * @swagger
 * /api/user/services-registration/{id}/cancel:
 *   put:
 *     summary: Cancel a service registration
 *     tags: [User Service Registrations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the service registration to cancel
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully canceled the service registration
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
 *                     registration:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           description: The registration ID
 *                         service:
 *                           type: string
 *                           description: The service ID
 *                         status:
 *                           type: string
 *                           description: The registration status
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           description: The date the registration was created
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.put('/:id/cancel', auth, serviceRegistrationController.cancelServiceRegistration);

/**
 * @swagger
 * /api/user/services-registration:
 *   get:
 *     summary: Get user service registrations
 *     tags: [User Service Registrations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the service registrations
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
 *                     registrations:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             description: The registration ID
 *                           service:
 *                             type: object
 *                             properties:
 *                               name:
 *                                 type: string
 *                               description:
 *                                 type: string
 *                               price:
 *                                 type: number
 *                           status:
 *                             type: string
 *                             description: The registration status
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             description: The date the registration was created
 *       500:
 *         description: Server error
 */
router.get('/', auth, serviceRegistrationController.getUserServiceRegistrations);

module.exports = router;
