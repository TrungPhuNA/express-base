const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PromotionSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    programName: {
        type: String,
        required: true,
        trim: true,
    },
    discountValue: {
        type: Number,
        required: true,
    },
    discountType: {
        type: String,
        enum: ['percent', 'amount'],
        required: true,
    },
    programImage: {
        type: String
    },
    startDate: {
        type: Date,
        required: function () {
            return !this.isUnlimited;
        }
    },
    endDate: {
        type: Date,
        required: function () {
            return !this.isUnlimited;
        }
    },
    isUnlimited: {
        type: Boolean,
        default: false,
    },
    usageLimit: {
        type: Number,
        default: null,  // null means unlimited
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true });

PromotionSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Promotion = mongoose.model('Promotion', PromotionSchema);

module.exports = Promotion;
