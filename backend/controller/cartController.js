const Cart = require("../models/Cart");
const Product = require("../models/Product");

const cartController = () => {
    return {
        getCart: async (req, res) => {
            const { userId } = req.params;
            try {
                const cart = await Cart.findOne(userId);
                if (!cart) {
                    return res.status(200).json({ success: false, message: "Cart not found.", cart: cart });
                }

                res.status(200).json({ success: true, message: "Cart data retrieved successfully", cart });
            } catch (error) {
                res.status(500).json({ message: 'Error retrieving cart', error });
            }
        },

        addItemToCart: async (req, res) => {
            const { quantity } = req.body;
            const { productId } = req.params;
            const userId = req.user._id;
            try {
                if (!userId || !productId || !quantity) {
                    return res.status(400).json({ message: 'Missing required fields' });
                }
                const product = await Product.findById(productId);
                if (product?.stock < quantity) {
                    return res.status(400).json({ message: 'Not enough stock' });
                }
                if (!product) {
                    return res.status(404).json({ message: 'Product not found' });
                }

                let cart = await Cart.findOne({ userId });

                if (!cart) {
                    cart = new Cart({ userId, items: [], totalPrice: 0 });
                }

                const existingItemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

                if (existingItemIndex !== -1) {
                    const existingItem = cart.items[existingItemIndex];
                    if (existingItem.quantity > product.stock) {
                        return res.status(400).json({ message: 'Insufficient stock.' });
                    }
                    existingItem.quantity += 1;
                    // existingItem.stock -= 1;
                } else {
                    cart.items.push({
                        productId,
                        quantity,
                        name: product?.ProductName || "Unnamed Product",
                        price: product?.ProductPrice || 0,
                        productImage: product?.ProductImage || null,
                        description: product?.ProductDescription || null,
                        stock: product?.stock || 0,
                    });
                }
                product.stock -= 1;
                await product.save();

                cart.totalPrice = cart.items.reduce((total, item) => total + item.quantity * item.price, 0);

                await cart.save();
                res.status(200).json({ message: 'Item added to cart successfully', cart });
            } catch (error) {
                console.error("Error adding item to cart:", error);
                res.status(500).json({ message: 'Error adding item to cart', error });
            }
        },

        removeItemFromCart: async (req, res) => {
            const { userId, productId } = req.body;
            try {
                if (!userId || !productId) {
                    return res.status(400).json({ message: 'Missing required fields' });
                }
                const cart = await Cart.findOne({ userId });
                if (!cart) {
                    return res.status(404).json({ message: 'Cart not found' });
                }
                const product = await Product.findById(productId);

                product.stock += 1;
                await product.save();

                const initialItemCount = cart.items.length;
                cart.items = cart.items.filter((item) => item.productId.toString() !== productId);

                if (cart.items.length === initialItemCount) {
                    return res.status(404).json({ message: 'Item not found in cart' });
                }

                cart.totalPrice = cart.items.reduce((total, item) => total + item.quantity * item.price, 0);

                await cart.save();

                res.status(200).json({ message: 'Item removed from cart', cart });
            } catch (error) {
                console.error("Error removing item from cart:", error);
                res.status(500).json({ message: 'Error removing item from cart', error });
            }
        },

        updateItemQuantity: async (req, res) => {
            const { userId, productId, quantity } = req.body;

            try {
                if (!userId || !productId || quantity === undefined) {
                    return res.status(400).json({ message: 'Missing required fields: userId, productId, or quantity' });
                }

                if (typeof quantity !== 'number' || quantity < 1) {
                    return res.status(400).json({ message: 'Quantity must be a number and at least 1' });
                }

                const cart = await Cart.findOne({ userId });
                if (!cart) {
                    return res.status(404).json({ message: 'Cart not found for the user' });
                }

                if (!cart.items || !Array.isArray(cart.items)) {
                    return res.status(400).json({ message: 'Cart items are invalid or missing' });
                }

                const item = cart.items.find((item) => item.productId == productId);
                if (!item) {
                    return res.status(404).json({ message: 'Item not found in cart' });
                }

                if (quantity > item.stock) {
                    return res.status(400).json({
                        message: `Quantity exceeds available stock (${item.stock})`,
                    });
                }

                item.quantity = quantity;

                cart.totalPrice = cart.items.reduce((total, item) => total + item.quantity * item.price, 0);

                await cart.save();

                res.status(200).json({ message: 'Cart updated successfully', cart });
            } catch (error) {
                console.error("Error updating cart:", error);
                res.status(500).json({ message: 'Internal server error while updating cart', error: error.message });
            }
        },
    }
}

module.exports = cartController;