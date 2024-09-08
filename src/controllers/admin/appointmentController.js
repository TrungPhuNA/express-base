const adminAppointmentService = require('../../services/admin/appointmentService');
const formatResponse = require('../../utils/response');

exports.getAllAppointments = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.page_size) || 10;

        const { appointments, meta } = await adminAppointmentService.getAllAppointments(page, pageSize);

        res.json(formatResponse('success', { appointments, meta }, 'Appointments retrieved successfully'));
    } catch (err) {
        res.status(500).json(formatResponse('error', [], 'Server error'));
    }
};

exports.confirmAppointment = async (req, res) => {
    try {
        const appointmentId = req.params.id;
        const appointment = await adminAppointmentService.confirmAppointment(appointmentId);
        if (!appointment) {
            return res.status(404).json(formatResponse('error', [], 'Appointment not found'));
        }
        res.json(formatResponse('success', { appointment }, 'Appointment confirmed successfully'));
    } catch (err) {
        res.status(500).json(formatResponse('error', [], 'Server error'));
    }
};

exports.cancelAppointment = async (req, res) => {
    try {
        const appointmentId = req.params.id;
        const appointment = await adminAppointmentService.cancelAppointment(appointmentId);
        if (!appointment) {
            return res.status(404).json(formatResponse('error', [], 'Appointment not found'));
        }
        res.json(formatResponse('success', { appointment }, 'Appointment canceled successfully'));
    } catch (err) {
        res.status(500).json(formatResponse('error', [], 'Server error'));
    }
};

exports.completeAppointment = async (req, res) => {
    try {
        const appointmentId = req.params.id;
        const appointment = await adminAppointmentService.completeAppointment(appointmentId);
        if (!appointment) {
            return res.status(404).json(formatResponse('error', [], 'Appointment not found'));
        }
        res.json(formatResponse('success', { appointment }, 'Appointment canceled successfully'));
    } catch (err) {
        res.status(500).json(formatResponse('error', [], 'Server error'));
    }
};

exports.pendingAppointment = async (req, res) => {
    try {
        const appointmentId = req.params.id;
        const appointment = await adminAppointmentService.pendingAppointment(appointmentId);
        if (!appointment) {
            return res.status(404).json(formatResponse('error', [], 'Appointment not found'));
        }
        res.json(formatResponse('success', { appointment }, 'Appointment canceled successfully'));
    } catch (err) {
        res.status(500).json(formatResponse('error', [], 'Server error'));
    }
};
