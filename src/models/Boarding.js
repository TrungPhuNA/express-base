const mongoose = require('mongoose');
const BoardingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet' },
    services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
    days: Number,
    totalPrice: Number,
    status: {
        type: String,
        enum: ['pending', 'delivered', 'completed'], // Trạng thái bằng tiếng Anh
        default: 'pending' // Trạng thái mặc định khi tạo mới là "pending"
    },
    createdAt: { type: Date, default: Date.now }
});

const Boarding = mongoose.model('Boarding', BoardingSchema);
module.exports = Boarding;
