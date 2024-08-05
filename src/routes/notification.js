const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const auth = require('../middleware/auth');
const validate = require('../middleware/validation');
const notificationController = require('../controllers/notificationController');

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Notification management
 */

/**
 * @swagger
 * /notifications/send-confirmation:
 *   post:
 *     summary: Send appointment confirmation SMS
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 description: The phone number to send the SMS to
 *               appointmentDetails:
 *                 type: string
 *                 description: Details of the appointment
 *     responses:
 *       200:
 *         description: Successfully sent the SMS
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
 *                     sid:
 *                       type: string
 *                       description: The SID of the sent SMS
 *       500:
 *         description: Server error
 */
router.post(
    '/send-confirmation',
    [
        auth,
        check('phoneNumber', 'Phone number is required').not().isEmpty(),
        check('appointmentDetails', 'Appointment details are required').not().isEmpty(),
    ],
    validate,
    notificationController.sendAppointmentConfirmation
);

module.exports = router;
