const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: false,
            },
            productImage: {
                type: String,
                required: false,
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
            },
            price: {
                type: Number,
                required: true,
            },
        },
    ],
    totalAmount: {
        type: Number,
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending',
    },
    stripeSessionId: {
        type: String,
        required: false,
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    deliveryDetails: {
        type: {
            country: {
                type: String,
                required: false,
            },
            state: {
                type: String,
                required: false,
            },
            address1: {
                type: String,
                required: false,
            },
            address2: {
                type: String,
                required: false,
            },
            city: {
                type: String,
                required: false,
            },
            pin: {
                type: String,
                required: false,
            },
        },
        required: false,
    },
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;