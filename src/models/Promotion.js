const mongoose = require('mongoose');

const PromotionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['gift', 'discount']
    },
    value: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Promotion', PromotionSchema);
