const petService = require('../../services/admin/petService');
const formatResponse = require('../../utils/response');

exports.getAllPets = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.page_size) || 10;

        const { pets, meta } = await petService.getAllPets(page, pageSize);

        res.json(formatResponse('success', { pets, meta }, 'All pets retrieved successfully'));
    } catch (err) {
        res.status(500).json(formatResponse('error', [], 'Server error'));
    }
};
