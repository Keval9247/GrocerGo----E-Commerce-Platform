const Order = require("../models/Order");

const orderController = () => {
    return {
        getAllOrders: async (req, res) => {
            try {
                const orders = await Order.find().populate('userId', 'name email address profilePic phone address').sort({ orderDate: -1 }).exec();
                res.status(200).json({ message: "Orders Retrieved Successfully.", orders: orders });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        },

        getOrderById: async (req, res) => {
            const { id } = req.params;
            try {
                const order = await Order.find({ userId: id }).populate('userId', 'name email address profilePic phone address').sort({ orderDate: -1 }).exec();

                if (!order) {
                    return res.status(404).json({ error: 'Order not found' });
                }
                res.status(200).json({ message: "Order Retrieved Successfully.", order: order });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        },
    }
}

module.exports = orderController;