const { default: mongoose } = require("mongoose");

const Product = new mongoose.Schema({
    category: { type: String, enum: ["Electronics", "Furniture", "Books", "Fashion", "Home & Kitchen", "Toys", "Sports"], required: false },
    ProductName: { type: String, required: false },
    sales: { type: Number, required: false, default: 0 },
    growth: { type: Number, required: false, default: 0 },
    stock: { type: Number, required: false, default: 0 },
    rating: { type: Number, required: false, default: 0 },
    ProductPrice: { type: Number, required: false, default: 0 },
    ProductDescription: { type: String, required: false, default: 'null' },
    ProductImage: { type: String, required: true, default: 'null' },
    RatingCount: { type: Number, required: false, default: 0 },

    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now() },
    deleted_at: { type: Date, default: null }
})

module.exports = mongoose.model("products", Product)