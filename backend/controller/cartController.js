const Cart = require("../models/Cart");
const Product = require("../models/Product");

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
                // Validate input
                if (!userId || !productId || !quantity) {
                    return res.status(400).json({ message: 'Missing required fields' });
                }

                // Check if the product exists
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
                        price: product.ProductPrice,
                        profilePic: product.profilePic || null, // Assuming the product model has `profilePic`
                        description: product.ProductDescription || null, // Assuming the product model has `description`
                    });
                }

                console.log("🚀🚀 Your selected text is => cart.items: ", cart.items);
                // Recalculate total price
                cart.totalPrice = cart.items.reduce((total, item) => {
                    console.log("🚀🚀 Your selected text is => item: ", item);
                    const itemTotal = item.quantity * item.price;
                    return total + (isNaN(itemTotal) ? 0 : itemTotal); // Ensure valid numbers
                }, 0);

                // Save the cart
                await cart.save();
                console.log("🚀🚀 Your selected text is => cart: ", cart);

                res.status(200).json({ message: 'Item added to cart successfully', cart });
            } catch (error) {
                console.error("Error adding item to cart:", error);
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

module.exports = cartController;