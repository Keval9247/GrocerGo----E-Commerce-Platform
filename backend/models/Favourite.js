const { default: mongoose } = require("mongoose");

const FavouriteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
}, { timestamps: true }
);

module.exports = mongoose.model('Favourite', FavouriteSchema);