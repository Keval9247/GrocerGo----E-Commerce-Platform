const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    id: { type: String, required: false },
    customer: { type: String, required: false },
    product: { type: String, required: false },
    amount: { type: Number, required: false },
    status: { type: String, enum: ["Delivered", "Processing", "Pending"], required: false },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", OrderSchema);
