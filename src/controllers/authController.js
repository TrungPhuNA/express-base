const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const formatResponse = require('../utils/response'); // Import hàm phản hồi

// Register a new user
exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(formatResponse('error', [], 'Dữ liệu không hợp lệ'));
    }

    const { name, email, password, role } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json(formatResponse('error', [], 'Người dùng đã tồn tại'));
        }

        user = new User({
            name,
            email,
            password,
            role
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        res.status(201).json(formatResponse('success', { user: { id: user.id, name: user.name, email: user.email, role: user.role } }, 'Đăng ký thành công'));
    } catch (err) {
        console.error(err.message);
        res.status(500).json(formatResponse('error', [], 'Lỗi máy chủ'));
    }
};

// Login a user
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Kiểm tra email tồn tại
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // Kiểm tra mật khẩu
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // Tạo và trả về token
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};
