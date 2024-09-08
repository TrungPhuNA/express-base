const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const formatResponse = require('../utils/response'); // Import hàm phản hồi

// Register a new user
exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(formatResponse('error', [], 'Dữ liệu không hợp lệ'));
    }

    const {name, email, password, role, avatar = 'https://via.placeholder.com/150'} = req.body;

    try {
        let user = await User.findOne({email});

        if (user) {
            return res.status(400).json(formatResponse('error', [], 'Người dùng đã tồn tại'));
        }

        user = new User({
            name,
            email,
            password,
            avatar,
            role
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        res.status(201).json(formatResponse('success', {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
            }
        }, 'Đăng ký thành công'));
    } catch (err) {
        console.error(err.message);
        res.status(500).json(formatResponse('error', [], 'Lỗi máy chủ'));
    }
};

// Login a user
exports.login = async (req, res) => {
    const {email, password} = req.body;

    try {
        // Kiểm tra email tồn tại
        let user = await User.findOne({email});
        if (!user) {
            res.status(500).json(formatResponse('error', [], 'Email không tồn tại'));
        }

        // Kiểm tra mật khẩu
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(500).json(formatResponse('error', [], 'Mật khẩu không chính xác'));
        }

        // Tạo và trả về token
        const payload = {
            user: {
                id: user.id
            }
        };
        console.info("===========[] ===========[] : ",user);
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {expiresIn: '100h'},
            (err, token) => {
                if (err) throw err;
                res.status(200).json(formatResponse('success', {
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        avatar: user.avatar,
                        role: user.role
                    },
                    token: token
                }, 'Login success'));
            }
        );
    } catch (err) {
        res.status(500).json(formatResponse('error', [], 'Có lỗi xẩy ra, xin vui lòng thử lại'));
    }
};
