const serviceRegistrationService = require('../../services/user/serviceRegistrationService');
const formatResponse = require('../../utils/response');

exports.registerService = async (req, res) => {
    try {
        const registrationData = { ...req.body, user: req.user.id };
        const registration = await serviceRegistrationService.registerService(registrationData);
        res.status(201).json(formatResponse('success', { registration }, 'Service registered successfully'));
    } catch (err) {
        res.status(500).json(formatResponse('error', [], 'Server error'));
    }
};

exports.cancelServiceRegistration = async (req, res) => {
    try {
        const registrationId = req.params.id;
        const userId = req.user.id;
        const registration = await serviceRegistrationService.cancelServiceRegistration(registrationId, userId);
        res.json(formatResponse('success', { registration }, 'Service registration canceled successfully'));
    } catch (err) {
        res.status(400).json(formatResponse('error', [], err.message));
    }
};

exports.getUserServiceRegistrations = async (req, res) => {
    try {
        const userId = req.user.id;
        const registrations = await serviceRegistrationService.getUserServiceRegistrations(userId);
        res.json(formatResponse('success', { registrations }, 'Service registrations retrieved successfully'));
    } catch (err) {
        res.status(500).json(formatResponse('error', [], 'Server error'));
    }
};
