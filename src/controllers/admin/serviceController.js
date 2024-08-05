const serviceService = require('../../services/serviceService');
const formatResponse = require('../../utils/response');

exports.createService = async (req, res) => {
    try {
        const service = await serviceService.createService(req.body);
        res.status(201).json(formatResponse('success', { service }, 'Service created successfully'));
    } catch (err) {
        res.status(500).json(formatResponse('error', [], 'Server error'));
    }
};

exports.updateService = async (req, res) => {
    try {
        const serviceId = req.params.id;
        const service = await serviceService.updateService(serviceId, req.body);
        if (!service) {
            return res.status(404).json(formatResponse('error', [], 'Service not found'));
        }
        res.json(formatResponse('success', { service }, 'Service updated successfully'));
    } catch (err) {
        res.status(500).json(formatResponse('error', [], 'Server error'));
    }
};

exports.deleteService = async (req, res) => {
    try {
        const serviceId = req.params.id;
        await serviceService.deleteService(serviceId);
        res.json(formatResponse('success', [], 'Service deleted successfully'));
    } catch (err) {
        res.status(500).json(formatResponse('error', [], 'Server error'));
    }
};

exports.getServiceById = async (req, res) => {
    try {
        const serviceId = req.params.id;
        const service = await serviceService.getServiceById(serviceId);
        if (!service) {
            return res.status(404).json(formatResponse('error', [], 'Service not found'));
        }
        res.json(formatResponse('success', { service }, 'Service retrieved successfully'));
    } catch (err) {
        res.status(500).json(formatResponse('error', [], 'Server error'));
    }
};

exports.getAllServices = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.page_size) || 10;

        const { services, meta } = await serviceService.getAllServices(page, pageSize);

        res.json(formatResponse('success', { services, meta }, 'Services retrieved successfully'));
    } catch (err) {
        res.status(500).json(formatResponse('error', [], 'Server error'));
    }
};
