const Menu = require('../../models/Menu');
const formatResponse = require("../../utils/response");

// Get all menus
exports.getAllMenus = async (req, res) => {
    try {
        const params = req.query;
        const query = {};
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.page_size) || 10;

        if (params.name) {
            query.name = { $regex: params.name, $options: 'i' }; // Case-insensitive search
        }
        const total = await Menu.countDocuments(query);
        const menus = await Menu.find(query)
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .populate('createdBy', 'name'); // Lấy tên của người tạo từ bảng User

        const meta = {
            total,
            total_page: Math.ceil(total / pageSize),
            page,
            page_size: pageSize
        }
        res.json(formatResponse('success', { menus, meta }, 'Get Lists menu successfully'));
    } catch (err) {
        res.status(500).json(formatResponse('error', [], 'Server error'));
    }
};

// Get menu by ID
exports.getMenuById = async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.id).populate('createdBy', 'name');
        if (!menu) return res.status(404).json({ message: 'Menu not found' });
        res.status(200).json(formatResponse('success', { menu }, 'Menu found successfully'));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create new menu
exports.createMenu = async (req, res) => {
    const createdBy = req.user.id;
    const { name, description } = req.body;

    const newMenu = new Menu({
        name,
        description,
        createdBy
    });

    try {
        const menu = await newMenu.save();
        res.status(200).json(formatResponse('success', { menu }, 'Menu created successfully'));
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update menu
exports.updateMenu = async (req, res) => {
    try {
        const menuUpdate = await Menu.findById(req.params.id);
        if (!menuUpdate) return res.status(404).json({ message: 'Menu not found' });

        const { name, description } = req.body;
        if (name) menuUpdate.name = name;
        if (description) menuUpdate.description = description;

        const menu = await menuUpdate.save();
        res.status(200).json(formatResponse('success', { menu }, 'Menu updated successfully'));
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete menu
exports.deleteMenu = async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.id);
        if (!menu) return res.status(404).json({ message: 'Menu not found' });

        await Menu.findByIdAndDelete(req.params.id);
        res.json(formatResponse('success', [], 'Menu deleted successfully'));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
