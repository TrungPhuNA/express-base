const Category = require('../../models/Category');
const formatResponse = require("../../utils/response");

// Lấy danh sách category
exports.getAllCategories = async (req, res) => {
    try {
        const params = req.query;
        const query = {};
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.page_size) || 10;

        if (params.name) {
            query.name = { $regex: params.name, $options: 'i' }; // Tìm kiếm không phân biệt hoa thường
        }
        const total = await Category.countDocuments(query);
        const categories = await Category.find(query)
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .populate('createdBy', 'name'); // Lấy tên người tạo

        const meta = {
            total,
            total_page: Math.ceil(total / pageSize),
            page,
            page_size: pageSize
        };
        res.json(formatResponse('success', { categories, meta }, 'Get list of categories successfully'));
    } catch (err) {
        res.status(500).json(formatResponse('error', [], 'Server error'));
    }
};

// Lấy chi tiết category theo ID
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
            .populate('createdBy', 'name');
        if (!category) return res.status(404).json({ message: 'Category not found' });
        res.status(200).json(formatResponse('success', { category }, 'Get category successfully'));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

