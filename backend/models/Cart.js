const mongoose = require('mongoose')

const Cart = new mongoose.Schema({
    id: {
        type: Number,
        // required: true,
        unique: true,
    },
    userId: {
        type: String,
        ref: 'User',
        required: true
    },
    items: [{
        profilePic: {
            type: String,
            required: false
        },
        productId: {
            type: String,
            ref: 'Product',
            required: true
        },
        description: {
            type: String,
            required: false
        },
        quantity: {
            type: Number,
            required: true,
            default: 1,
        },
        price: {
            type: Number,
            required: false
        }
    }],
    totalPrice: {
        type: Number,
        required: false,
        default: 0,
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    }
})

Cart.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
});


module.exports = mongoose.model('Cart', Cart)