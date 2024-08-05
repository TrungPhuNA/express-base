const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const auth = require('../middleware/auth');
const validate = require('../middleware/validation');
const appointmentController = require('../controllers/appointmentController');

/**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: Appointment management
 */

/**
 * @swagger
 * /appointments:
 *   get:
 *     summary: Get user appointments
 *     tags: [Appointments]
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
 *         description: Successfully retrieved user appointments
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
 *                     appointments:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             description: The appointment ID
 *                           user:
 *                             type: object
 *                             properties:
 *                               name:
 *                                 type: string
 *                               email:
 *                                 type: string
 *                           service:
 *                             type: object
 *                             properties:
 *                               name:
 *                                 type: string
 *                             description: The service name
 *                           date:
 *                             type: string
 *                             format: date-time
 *                             description: The appointment date
 *                           address:
 *                             type: string
 *                             description: The appointment address
 *                           isHomeVisit:
 *                             type: boolean
 *                             description: Whether the appointment is a home visit
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
router.get('/', auth, appointmentController.getUserAppointments);

/**
 * @swagger
 * /appointments:
 *   post:
 *     summary: Create a new appointment
 *     tags: [Appointments]
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
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: The appointment date
 *               address:
 *                 type: string
 *                 description: The appointment address
 *               isHomeVisit:
 *                 type: boolean
 *                 description: Whether the appointment is a home visit
 *     responses:
 *       201:
 *         description: Successfully created a new appointment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The appointment ID
 *                 user:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                 service:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     description: The service name
 *                 date:
 *                   type: string
 *                   format: date-time
 *                   description: The appointment date
 *                 address:
 *                   type: string
 *                   description: The appointment address
 *                 isHomeVisit:
 *                   type: boolean
 *                   description: Whether the appointment is a home visit
 *       500:
 *         description: Server error
 */
router.post(
    '/',
    [
        auth,
        check('service', 'Dịch vụ là bắt buộc').not().isEmpty(),
        check('date', 'Ngày giờ là bắt buộc').isISO8601(),
        check('isHomeVisit', 'isHomeVisit phải là boolean').isBoolean(),
    ],
    validate,
    appointmentController.createAppointment
);

/**
 * @swagger
 * /appointments/{id}:
 *   get:
 *     summary: Get an appointment by ID
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the appointment to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the appointment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The appointment ID
 *                 user:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                 service:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     description: The service name
 *                 date:
 *                   type: string
 *                   format: date-time
 *                   description: The appointment date
 *                 address:
 *                   type: string
 *                   description: The appointment address
 *                 isHomeVisit:
 *                   type: boolean
 *                   description: Whether the appointment is a home visit
 *       404:
 *         description: Appointment not found
 *       500:
 *         description: Server error
 */
router.get('/:id', auth, appointmentController.getAppointmentById);

/**
 * @swagger
 * /appointments/{id}:
 *   put:
 *     summary: Update an existing appointment
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the appointment to update
 *         schema:
 *           type: string
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
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: The appointment date
 *               address:
 *                 type: string
 *                 description: The appointment address
 *               isHomeVisit:
 *                 type: boolean
 *                 description: Whether the appointment is a home visit
 *     responses:
 *       200:
 *         description: Successfully updated the appointment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The appointment ID
 *                 user:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                 service:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     description: The service name
 *                 date:
 *                   type: string
 *                   format: date-time
 *                   description: The appointment date
 *                 address:
 *                   type: string
 *                   description: The appointment address
 *                 isHomeVisit:
 *                   type: boolean
 *                   description: Whether the appointment is a home visit
 *       404:
 *         description: Appointment not found
 *       500:
 *         description: Server error
 */
router.put(
    '/:id',
    [
        auth,
        check('service', 'Dịch vụ là bắt buộc').not().isEmpty(),
        check('date', 'Ngày giờ là bắt buộc').isISO8601(),
        check('isHomeVisit', 'isHomeVisit phải là boolean').isBoolean(),
    ],
    validate,
    appointmentController.updateAppointment
);

/**
 * @swagger
 * /appointments/{id}:
 *   delete:
 *     summary: Delete an existing appointment
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the appointment to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted the appointment
 *       500:
 *         description: Server error
 */
router.delete('/:id', auth, appointmentController.deleteAppointment);

module.exports = router;
