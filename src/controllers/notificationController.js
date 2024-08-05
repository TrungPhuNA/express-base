const twilioService = require('../services/twilioService');

exports.sendAppointmentConfirmation = async (req, res) => {
    try {
        const { phoneNumber, appointmentDetails } = req.body;
        const messageBody = `Your appointment is confirmed: ${appointmentDetails}`;
        const response = await twilioService.sendSMS(phoneNumber, messageBody);
        res.status(200).json(response);
    } catch (err) {
        console.info("===========[] ===========[] : ",err);
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
};
