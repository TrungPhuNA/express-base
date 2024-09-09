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

// Tạo category mới
exports.createCategory = async (req, res) => {
    const { name, description } = req.body;

    const newCategory = new Category({
        name,
        description,
        createdBy: req.user.id // Lấy từ thông tin user đăng nhập
    });

    try {
        const categoryCreate = await newCategory.save();
        const category = await Category.findById(categoryCreate._id)
            .populate('createdBy', 'name');
        console.info("===========[] ===========[categoryCreate] : ",categoryCreate);
        console.info("===========[] ===========[category] : ",category);
        res.status(200).json(formatResponse('success', { category }, 'Category created successfully'));
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Cập nhật category
exports.updateCategory = async (req, res) => {
    try {
        const categoryUpdate = await Category.findById(req.params.id);
        if (!categoryUpdate) return res.status(404).json({ message: 'Category not found' });

        const { name, description } = req.body;
        if (name) categoryUpdate.name = name;
        if (description) categoryUpdate.description = description;

        const category = await categoryUpdate.save();
        res.status(200).json(formatResponse('success', { category }, 'Category updated successfully'));
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Xóa category
exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: 'Category not found' });

        await Category.findByIdAndDelete(req.params.id);
        res.json(formatResponse('success', [], 'Category deleted successfully'));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
