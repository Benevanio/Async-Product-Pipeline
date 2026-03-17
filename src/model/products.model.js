const mongoose = require('mongoose');
const validator = require('validator');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value) => !validator.isEmpty(value),
            message: 'name cannot be empty',
        },
    },
    description: {
        type: String,
        required: true,
        validate: {
            validator: (value) => !validator.isEmpty(value),
            message: 'description cannot be empty',
        },
    },
    price: {
        type: Number,
        required: true,
        validate: {
            validator: (value) => value !== null,
            message: 'price cannot be null',
        },
    },
    imageUrl: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['SUCCESS', 'ERROR'],
        default: 'SUCCESS',
    },
    retries: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;