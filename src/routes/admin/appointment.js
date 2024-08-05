const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const adminAppointmentController = require('../../controllers/admin/appointmentController');

/**
 * @swagger
 * tags:
 *   name: Admin Appointments
 *   description: Appointment management by admin
 */

/**
 * @swagger
 * /admin/appointments:
 *   get:
 *     summary: Get all appointments
 *     tags: [Admin Appointments]
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
 *         description: Successfully retrieved all appointments
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
 *                           status:
 *                             type: string
 *                             description: The appointment status
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
router.get('/', auth, adminAppointmentController.getAllAppointments);

/**
 * @swagger
 * /admin/appointments/{id}/confirm:
 *   put:
 *     summary: Confirm an appointment
 *     tags: [Admin Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the appointment to confirm
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully confirmed the appointment
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
 *                   description: The service name
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
 *                 status:
 *                   type: string
 *                   description: The appointment status
 *       404:
 *         description: Appointment not found
 *       500:
 *         description: Server error
 */
router.put('/:id/confirm', auth, adminAppointmentController.confirmAppointment);

/**
 * @swagger
 * /admin/appointments/{id}/cancel:
 *   put:
 *     summary: Cancel an appointment
 *     tags: [Admin Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the appointment to cancel
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully canceled the appointment
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
 *                   description: The service name
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
 *                 status:
 *                   type: string
 *                   description: The appointment status
 *       404:
 *         description: Appointment not found
 *       500:
 *         description: Server error
 */
router.put('/:id/cancel', auth, adminAppointmentController.cancelAppointment);

module.exports = router;
