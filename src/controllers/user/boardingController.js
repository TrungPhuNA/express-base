const Post = require('../../models/Post');
const Boarding = require('../../models/Boarding');
const Service = require('../../models/Service');
const Rating = require('../../models/Rating');
const formatResponse = require("../../utils/response");

exports.getAll = async (req, res) => {
    try {
        const params = req.query;
        const query = {};
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.page_size) || 10;

        if (params.title) {
            query.title = { $regex: params.title, $options: 'i' }; // Tìm kiếm không phân biệt hoa thường
        }
        query.user =  req.user._id
        const total = await Boarding.countDocuments(query);
        const boardings = await Boarding.find(query)
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .populate('pet')
            .populate('services')
            .sort({ createdAt: -1 });

        const meta = {
            total,
            total_page: Math.ceil(total / pageSize),
            page,
            page_size: pageSize
        };
        res.json(formatResponse('success', { boardings, meta }, 'Get list of posts successfully'));
    } catch (err) {
        res.status(500).json(formatResponse('error', [], 'Server error'));
    }
};


exports.getById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate('menu', 'name')
            .populate('createdBy', 'name');
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.status(200).json(formatResponse('success', { post }, 'Get post successfully'));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Tạo bài viết mới
exports.create = async (req, res) => {
    try {
        const { petId, serviceIds, days, totalPrice } = req.body;
        const boarding = new Boarding({
            user: req.user._id,
            pet: petId,
            services: serviceIds,
            days,
            totalPrice: totalPrice, // Lưu tổng tiền vào DB
            status: 'pending'
        });
        await boarding.save();
        res.status(200).json(formatResponse('success', { boarding }, 'boarding created successfully'));
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const boarding = await Boarding.findById(req.params.id);
        if (!boarding) return res.status(404).json({ message: 'Boarding not found' });

        // Xóa tất cả các đánh giá liên quan đến dịch vụ này
        await Rating.deleteMany({ type: 'service', itemId: req.params.id });

        // Xóa dịch vụ
        await Boarding.findByIdAndDelete(req.params.id);

        // Tìm tất cả các dịch vụ còn lại và cập nhật lại đánh giá trung bình và tổng số đánh giá
        const ratings = await Rating.find({ type: 'service', itemId: req.params.id });
        const totalReviews = ratings.length;
        const averageRating = totalReviews > 0 ? ratings.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews : 0;

        // Cập nhật bảng Service với thông tin đánh giá mới
        const service = await Service.findById(req.params.id);
        if (service) {
            service.totalReviews = totalReviews;
            service.averageRating = averageRating;
            await service.save();
        }
        res.json(formatResponse('success', [], 'Boarding deleted successfully'));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
