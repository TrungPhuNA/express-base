const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const formatResponse = require('../utils/response');

module.exports = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json(formatResponse('error', [], 'No token, authorization denied'));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(403).json(formatResponse('error', [], 'Token is not valid'));
    }
};

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(formatResponse('error', [], 'Dữ liệu không hợp lệ', errors.array()));
    }
    next();
};
