const Product = require('../../models/Product');
const User = require('../../models/User');
const formatResponse = require("../../utils/response");

// Lấy danh sách sản phẩm
exports.getAllProducts = async (req, res) => {
    try {
        console.info("===========[] ===========[SP USER] : ");
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.page_size) || 8;
        const userId = req.user._id;

        const total = await Product.countDocuments({ createdBy: userId });
        const products = await Product.find({ createdBy: userId })
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .populate('category', 'name')
            .populate('createdBy', 'name email');

        const meta = {
            total,
            total_page: Math.ceil(total / pageSize),
            page,
            page_size: pageSize
        };

        res.json(formatResponse('success', { products, meta }, 'Get list of products successfully'));
    } catch (err) {
        res.status(500).json(formatResponse('error', [], 'Server error'));
    }
};

// Lấy chi tiết sản phẩm theo ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category', 'name');
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(formatResponse('success', { product }, 'Get product successfully'));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Tạo sản phẩm mới
exports.createProduct = async (req, res) => {
    const userId = req.user._id;
    const { name, content, album, avatar, price, category } = req.body;

    const newProduct = new Product({
        name,
        content,
        album,
        avatar,
        price,
        category,
        createdBy: userId
    });

    try {
        const productNew = await newProduct.save();
        const product = await Product.findById(productNew._id).populate('category', 'name');

        res.status(200).json(formatResponse('success', { product }, 'Product created successfully'));
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.createProductScrape = async (req, res) => {
    let userId = req.user ? req.user._id : null;

    if (!userId) {
        try {
            const adminUser = await User.findOne({ role: 'admin' });
            if (adminUser) {
                userId = adminUser._id;
            } else {
                return res.status(400).json(formatResponse('error', null, 'No admin user found'));
            }
        } catch (err) {
            return res.status(500).json(formatResponse('error', null, 'Server error when searching for admin user'));
        }
    }

    const { name, content, album, avatar, price, category } = req.body;

    const newProduct = new Product({
        name,
        content,
        album,
        avatar,
        price,
        category,
        createdBy: userId
    });

    try {
        const product = await newProduct.save();
        res.status(200).json(formatResponse('success', { product }, 'Product created successfully'));
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Cập nhật sản phẩm
exports.updateProduct = async (req, res) => {
    try {
        const productUpdate = await Product.findById(req.params.id);
        if (!productUpdate) return res.status(404).json({ message: 'Product not found' });
        const userId = req.user._id;
        const { name, content, album, avatar, price, category } = req.body;
        if (name) productUpdate.name = name;
        if (content) productUpdate.content = content;
        if (album) productUpdate.album = album;
        if (avatar) productUpdate.avatar = avatar;
        if (price) productUpdate.price = price;
        if (category) productUpdate.category = category;
        productUpdate.createdBy = userId;

        await productUpdate.save();
        const product = await Product.findById(req.params.id).populate('category', 'name');
        res.status(200).json(formatResponse('success', { product }, 'Product updated successfully'));
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Xóa sản phẩm
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        await Product.findByIdAndDelete(req.params.id);
        res.json(formatResponse('success', [], 'Product deleted successfully'));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
