const Product = require('../models/Product');
const formatResponse = require("../utils/response");

// Lấy danh sách sản phẩm
exports.getListsProduct = async (req, res) => {
    try {
        const products = await Product.find().populate('category', 'name');
        res.json(formatResponse('success', { products }, 'Get list of products successfully'));
    } catch (err) {
        res.status(500).json(formatResponse('error', [], 'Server error'));
    }
};

exports.showProductDetail = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category', 'name');
        if (!product) return res.status(404).json({ message: 'Product not found' });

        const products = await Product.find().populate('category', 'name');

        res.status(200).json(formatResponse('success', {
            product: product,
            relatedProducts: products
        }, 'Get product successfully'));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
