const { default: mongoose } = require("mongoose");
const { ExpireOtp } = require("../utils/Otp");

const Otp = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        ref: 'User'
    },
    otp: {
        type: Number,
        required: true
    },
    isverifiedOtp: {
        type: Boolean,
        default: false
    },
    expiredAt: {
        type: Date,
        default: ExpireOtp()
    },
    created_at: {
        type: String,
        default: new Date().toISOString()
    }
});

module.exports = mongoose.model('Otp', Otp);
