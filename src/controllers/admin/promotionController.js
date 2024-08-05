const promotionService = require('../../services/admin/promotionService');
const formatResponse = require('../../utils/response');

exports.createPromotion = async (req, res) => {
    try {
        const promotion = await promotionService.createPromotion(req.body);
        res.status(201).json(formatResponse('success', { promotion }, 'Promotion created successfully'));
    } catch (err) {
        res.status(500).json(formatResponse('error', [], 'Server error'));
    }
};

exports.updatePromotion = async (req, res) => {
    try {
        const promotionId = req.params.id;
        const promotion = await promotionService.updatePromotion(promotionId, req.body);
        if (!promotion) {
            return res.status(404).json(formatResponse('error', [], 'Promotion not found'));
        }
        res.json(formatResponse('success', { promotion }, 'Promotion updated successfully'));
    } catch (err) {
        res.status(500).json(formatResponse('error', [], 'Server error'));
    }
};

exports.deletePromotion = async (req, res) => {
    try {
        const promotionId = req.params.id;
        await promotionService.deletePromotion(promotionId);
        res.json(formatResponse('success', [], 'Promotion deleted successfully'));
    } catch (err) {
        res.status(500).json(formatResponse('error', [], 'Server error'));
    }
};

exports.getPromotionById = async (req, res) => {
    try {
        const promotionId = req.params.id;
        const promotion = await promotionService.getPromotionById(promotionId);
        if (!promotion) {
            return res.status(404).json(formatResponse('error', [], 'Promotion not found'));
        }
        res.json(formatResponse('success', { promotion }, 'Promotion retrieved successfully'));
    } catch (err) {
        res.status(500).json(formatResponse('error', [], 'Server error'));
    }
};

exports.getAllPromotions = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.page_size) || 10;
        const searchName = req.query.name || '';
        const searchType = req.query.type || '';

        const { promotions, meta } = await promotionService.getAllPromotions(page, pageSize, searchName, searchType);

        res.json(formatResponse('success', { promotions, meta }, 'Promotions retrieved successfully'));
    } catch (err) {
        res.status(500).json(formatResponse('error', [], 'Server error'));
    }
};
