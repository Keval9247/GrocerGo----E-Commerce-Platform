const mongoose = require('mongoose')

const User = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // confirm_password: {
    //     type: String,
    //     required: true
    // },
    address: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: null
    },
    gender: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    token: {
        type: String,
        default: null
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        required: true,
        // default: 'user'
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    },
    deleted_at: {
        type: Date,
        default: null
    }
})

User.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
});

module.exports = mongoose.model("User", User)
