const { default: mongoose } = require("mongoose");

const Product = new mongoose.Schema({
    category: { type: String, enum: ["Electronics", "Furniture", "Clothing", "Books"], required: false },
    ProductName: { type: String, required: false },
    sales: { type: Number, required: false },
    growth: { type: Number, required: false },
    stock: { type: Number, required: false },
    ProductPrice: { type: Number, required: false },
    ProductDescription: { type: String, required: false },
    ProductImage: { type: String, required: true },

    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now() },
    deleted_at: { type: Date, default: null }
})

module.exports = mongoose.model("products", Product)