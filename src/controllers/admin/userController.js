const User = require('../../models/User');
const formatResponse = require("../../utils/response");
const bcrypt = require("bcryptjs");

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const params = req.query;
        const query = {};
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.page_size) || 10;

        if (params.name) {
            query.name = { $regex: params.name, $options: 'i' }; // Case-insensitive search
        }
        const total = await User.countDocuments(query);
        const users = await User.find(query)
            .skip((page - 1) * pageSize)
            .limit(pageSize);

        const meta = {
            total,
            total_page: Math.ceil(total / pageSize),
            page,
            page_size: pageSize
        }
        res.json(formatResponse('success', { users, meta }, 'Get Lists user successfully'));
    } catch (err) {
        res.status(500).json(formatResponse('error', [], 'Server error'));
    }
};

// Get user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create new user
exports.createUser = async (req, res) => {
    const { name, email, password, avatar, phone, role, dateOfBirth } = req.body;

    const newUser = new User({
        name,
        email,
        password, // Ideally, you should hash the password before saving
        avatar,
        phone,
        role,
        dateOfBirth
    });

    try {
        const user = await newUser.save();
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        res.status(200).json(formatResponse('success', { user }, 'created successfully'));
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update user
exports.updateUser = async (req, res) => {
    try {
        const userUpdate = await User.findById(req.params.id);
        if (!userUpdate) return res.status(404).json({ message: 'User not found' });

        const { name, email, avatar, phone, role, dateOfBirth } = req.body;
        if (name) userUpdate.name = name;
        if (email) userUpdate.email = email;
        if (avatar) userUpdate.avatar = avatar;
        if (phone) userUpdate.phone = phone;
        if (role) userUpdate.role = role;
        if (dateOfBirth) userUpdate.dateOfBirth = dateOfBirth;

        const user = await userUpdate.save();
        res.status(200).json(formatResponse('success', { user }, 'created successfully'));
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        await User.findByIdAndDelete(req.params.id);
        res.json(formatResponse('success', [], 'Service deleted successfully'));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
