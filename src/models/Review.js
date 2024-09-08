const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    target: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, // Dùng cho serviceId hoặc productId
        refPath: 'targetModel' // Dynamic reference để liên kết đến bảng Service hoặc Product
    },
    targetModel: {
        type: String,
        required: true,
        enum: ['Service', 'Product'] // Cho phép chỉ liên kết đến bảng Service hoặc Product
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Review', ReviewSchema);

