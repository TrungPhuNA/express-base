const reviewService = require('../../services/admin/reviewService');
const formatResponse = require('../../utils/response');

exports.getAllReviews = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.page_size) || 10;

        const { reviews, meta } = await reviewService.getAllReviews(page, pageSize);

        res.json(formatResponse('success', { reviews, meta }, 'Reviews retrieved successfully'));
    } catch (err) {
        res.status(500).json(formatResponse('error', [], 'Server error'));
    }
};

exports.deleteReview = async (req, res) => {
    try {
        const reviewId = req.params.id;
        await reviewService.deleteReview(reviewId);
        res.json(formatResponse('success', [], 'Review deleted successfully'));
    } catch (err) {
        res.status(500).json(formatResponse('error', [], 'Server error'));
    }
};
