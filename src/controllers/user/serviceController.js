const serviceService = require('../../services/user/serviceService');
const formatResponse = require('../../utils/response');

exports.getAllServices = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.page_size) || 10;
        const searchQuery = req.query.search || '';
        const type = req.query.type || '';

        const { services, meta } = await serviceService.getAllServices(page, pageSize, searchQuery, type);

        res.json(formatResponse('success', { services, meta }, 'Services retrieved successfully'));
    } catch (err) {
        res.status(500).json(formatResponse('error', [], 'Server error'));
    }
};
