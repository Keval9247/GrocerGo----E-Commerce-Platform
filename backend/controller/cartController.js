const Cart = require("../models/Cart");
const Product = require("../models/Product");

const cartController = () => {
    return {
        getCart: async (req, res) => {
            const { userId } = req.params;
            try {
                const cart = await Cart.findOne(userId);
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
                if (!userId || !productId || !quantity) {
                    return res.status(400).json({ message: 'Missing required fields' });
                }
                const product = await Product.findById(productId);
                if (!product) {
                    return res.status(404).json({ message: 'Product not found' });
                }

                // Find the user's cart or create a new one if it doesn't exist
                let cart = await Cart.findOne({ userId });

                if (!cart) {
                    cart = new Cart({ userId, items: [], totalPrice: 0 });
                }

                // Check if the product already exists in the cart
                const existingItemIndex = cart.items.findIndex(
                    (item) => item.productId.toString() === productId
                );

                if (existingItemIndex !== -1) {
                    // Update the quantity if the product already exists
                    cart.items[existingItemIndex].quantity += quantity;
                } else {
                    // Add the product as a new item
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
                // Recalculate total price
                cart.totalPrice = cart.items.reduce((total, item) => {
                    const itemTotal = item.quantity * item.price;
                    return total + (isNaN(itemTotal) ? 0 : itemTotal);
                }, 0);

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

                const initialItemCount = cart.items.length;
                cart.items = cart.items.filter((item) => item.productId.toString() !== productId);

                if (cart.items.length === initialItemCount) {
                    return res.status(404).json({ message: 'Item not found in cart' });
                }

                // Recalculate total price
                cart.totalPrice = cart.items.reduce(
                    (total, item) => total + item.quantity * item.price,
                    0
                );

                // Save the updated cart
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

                // Find the user's cart
                const cart = await Cart.findOne({ userId });
                if (!cart) {
                    return res.status(404).json({ message: 'Cart not found for the user' });
                }

                // Ensure cart.items exists and is an array
                if (!cart.items || !Array.isArray(cart.items)) {
                    return res.status(400).json({ message: 'Cart items are invalid or missing' });
                }

                // Find the item in the cart
                const item = cart.items.find((item) => item.productId == productId);
                if (!item) {
                    return res.status(404).json({ message: 'Item not found in cart' });
                }

                // Validate quantity against available stock
                if (quantity > item.stock) {
                    return res.status(400).json({
                        message: `Quantity exceeds available stock (${item.stock})`,
                    });
                }

                // Update item quantity
                item.quantity = quantity;

                // Recalculate total price
                cart.totalPrice = cart.items.reduce(
                    (total, item) => total + item.quantity * item.price,
                    0
                );

                // Save the updated cart
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