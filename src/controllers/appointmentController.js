const appointmentService = require('../services/appointmentService');
const formatResponse = require('../utils/response');

exports.createAppointment = async (req, res) => {
    try {
        const appointmentData = { ...req.body, user: req.user.id };
        const appointment = await appointmentService.createAppointment(appointmentData);
        res.status(201).json(formatResponse('success', { appointment }, 'Appointment created successfully'));
    } catch (err) {
        res.status(500).json(formatResponse('error', [], 'Server error'));
    }
};

exports.updateAppointment = async (req, res) => {
    try {
        const appointmentId = req.params.id;
        const appointment = await appointmentService.updateAppointment(appointmentId, req.body);
        if (!appointment) {
            return res.status(404).json(formatResponse('error', [], 'Appointment not found'));
        }
        res.json(formatResponse('success', { appointment }, 'Appointment updated successfully'));
    } catch (err) {
        res.status(500).json(formatResponse('error', [], 'Server error'));
    }
};

exports.deleteAppointment = async (req, res) => {
    try {
        const appointmentId = req.params.id;
        await appointmentService.deleteAppointment(appointmentId);
        res.json(formatResponse('success', [], 'Appointment deleted successfully'));
    } catch (err) {
        res.status(500).json(formatResponse('error', [], 'Server error'));
    }
};

exports.getAppointmentById = async (req, res) => {
    try {
        const appointmentId = req.params.id;
        const appointment = await appointmentService.getAppointmentById(appointmentId);
        if (!appointment) {
            return res.status(404).json(formatResponse('error', [], 'Appointment not found'));
        }
        res.json(formatResponse('success', { appointment }, 'Appointment retrieved successfully'));
    } catch (err) {
        res.status(500).json(formatResponse('error', [], 'Server error'));
    }
};

exports.getUserAppointments = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.page_size) || 10;

        const { appointments, meta } = await appointmentService.getUserAppointments(req.user.id, page, pageSize);

        res.json(formatResponse('success', { appointments, meta }, 'Appointments retrieved successfully'));
    } catch (err) {
        res.status(500).json(formatResponse('error', [], 'Server error'));
    }
};
