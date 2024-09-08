const mongoose = require('mongoose');
const {text} = require("express");

const PetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    price: {
        type: Number
    },
    gender: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Pet', PetSchema);
