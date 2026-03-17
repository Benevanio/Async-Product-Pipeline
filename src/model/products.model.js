const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
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