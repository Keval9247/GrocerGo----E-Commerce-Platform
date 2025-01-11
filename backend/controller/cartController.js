const Cart = require("../models/Cart");

const cartController = () => {
    return {
        getCart: async (req, res) => {
            const { userId } = req.params;

            try {
                const cart = await Cart.findOne({ userId }).populate('items.productId');

                if (!cart) {
                    return res.status(404).json({ message: 'Cart not found' });
                }

                res.status(200).json(cart);
            } catch (error) {
                res.status(500).json({ message: 'Error retrieving cart', error });
            }
        },

        addItemToCart: async (req, res) => {
            const { userId, productId, quantity } = req.body;

            try {
                const product = await Product.findById(productId);

                if (!product) {
                    return res.status(404).json({ message: 'Product not found' });
                }

                let cart = await Cart.findOne({ userId });

                if (!cart) {
                    cart = new Cart({ userId, items: [] });
                }

                const existingItem = cart.items.find(
                    (item) => item.productId.toString() === productId
                );

                if (existingItem) {
                    existingItem.quantity += quantity;
                } else {
                    cart.items.push({
                        productId,
                        quantity,
                        price: product.price,
                    });
                }

                // Recalculate total price
                cart.totalPrice = cart.items.reduce(
                    (total, item) => total + item.quantity * item.price,
                    0
                );

                await cart.save();
                res.status(200).json({ message: 'Item added to cart', cart });
            } catch (error) {
                res.status(500).json({ message: 'Error adding item to cart', error });
            }
        },

        removeItemFromCart: async (req, res) => {
            const { userId, productId } = req.body;

            try {
                const cart = await Cart.findOne({ userId });

                if (!cart) {
                    return res.status(404).json({ message: 'Cart not found' });
                }

                cart.items = cart.items.filter(
                    (item) => item.productId.toString() !== productId
                );

                // Recalculate total price
                cart.totalPrice = cart.items.reduce(
                    (total, item) => total + item.quantity * item.price,
                    0
                );

                await cart.save();
                res.status(200).json({ message: 'Item removed from cart', cart });
            } catch (error) {
                res.status(500).json({ message: 'Error removing item from cart', error });
            }
        },

        updateItemQuantity: async (req, res) => {
            const { userId, productId, quantity } = req.body;

            try {
                const cart = await Cart.findOne({ userId });

                if (!cart) {
                    return res.status(404).json({ message: 'Cart not found' });
                }

                const item = cart.items.find(
                    (item) => item.productId.toString() === productId
                );

                if (!item) {
                    return res.status(404).json({ message: 'Item not found in cart' });
                }

                item.quantity = quantity;

                // Recalculate total price
                cart.totalPrice = cart.items.reduce(
                    (total, item) => total + item.quantity * item.price,
                    0
                );

                await cart.save();
                res.status(200).json({ message: 'Cart updated successfully', cart });
            } catch (error) {
                res.status(500).json({ message: 'Error updating cart', error });
            }
        },
    }
}

module.exports = cartController();