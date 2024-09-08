// models/Rating.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['service', 'product'], required: true },
    itemId: { type: Schema.Types.ObjectId, required: true, refPath: 'typeRef' },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

RatingSchema.virtual('typeRef').get(function() {
    return this.type === 'service' ? 'Service' : 'Product';
});

module.exports = mongoose.model('Rating', RatingSchema);
