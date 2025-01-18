const express = require('express');
const User = require('../models/User');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)



const paymentController = () => {
    return {
        getCheckoutSession: async (req, res) => {
            const { items } = req.body;
            try {
                const customer = await User.findById(req.params.id)
                const AllItems = items?.map((item) => ({
                    price_data: {
                        currency: 'usd',
                        unit_amount: item.price * 100, // Price in cents
                        product_data: {
                            name: item.name,
                            description: item.description,
                            // images: [`${process.env.BACKEND_URL}${item.productImage}`],
                        },
                    },
                    quantity: item.quantity,
                }))
                console.log("🚀🚀 Your selected text is => `${process.env.BACKEND_URL}${encodeURIComponent(item.productImage)}`: ", `${process.env.BACKEND_URL}${(items?.map((item) => item.productImage))}`);

                const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

                const order = new Order({
                    userId: customer._id,
                    items: items.map((item) => ({
                        productId: item.productId,
                        name: item.name,
                        description: item.description,
                        productImage: item.productImage,
                        quantity: item.quantity,
                        price: item.price,
                    })),
                    totalAmount,
                    paymentStatus: 'pending',
                    stripeSessionId: '', // Will be updated after creating the Stripe session
                    deliveryDetails: {},
                });

                await order.save();

                const session = await stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    mode: 'payment',
                    success_url: `${process.env.FRONTEND_URL}/user/payment/success?session_id={CHECKOUT_SESSION_ID}`,
                    cancel_url: `${process.env.FRONTEND_URL}/user/payment/cancel?session_id={CHECKOUT_SESSION_ID}`,
                    customer_email: customer.email,
                    line_items: AllItems,
                    metadata: {
                        orderId: order._id.toString(),
                    },
                });

                order.stripeSessionId = session.id;
                await order.save();

                res.status(200).json({ url: session.url });
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Error in craeting checkout session.' });
            }
        },

        handlePaymentSuccess: async (req, res) => {
            const { session_id } = req.query;

            try {
                // Retrieve the Stripe session
                const session = await stripe.checkout.sessions.retrieve(session_id);

                const deliveryDetails = {
                    country: session.customer_details?.address?.country || '',
                    state: session.customer_details?.address?.state || '',
                    address1: session.customer_details?.address?.line1 || '',
                    address2: session.customer_details?.address?.line2 || '',
                    city: session.customer_details?.address?.city || '',
                    pin: session.customer_details?.address?.postal_code || '',
                };

                // Find the order in the database using the session ID
                const order = await Order.findOne({ stripeSessionId: session.id });

                if (!order) {
                    return res.status(404).json({ error: 'Order not found.' });
                }

                // Update the payment status to 'completed'
                order.paymentStatus = 'completed';
                order.deliveryDetails = deliveryDetails;
                await order.save();

                await Cart.findOneAndDelete({ userId: order.userId });


                // Redirect the user to a success page
                // res.redirect(`${process.env.FRONTEND_URL}/user/payment/success`);
                res.status(200).json({ success: true, message: 'Payment successful!', orderId: order?._id });
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Error handling payment success.' });
            }
        },

        handlePaymentCancel: async (req, res) => {
            const { session_id } = req.query;

            try {
                const order = await Order.findOne({ stripeSessionId: session_id });

                if (!order) {
                    return res.status(404).json({ error: 'Order not found.' });
                }

                // Update the payment status to '`failed`'
                order.paymentStatus = 'failed';
                await order.save();

                // Redirect the user to a cancel page
                res.redirect(`${process.env.FRONTEND_URL}/user/payment/cancel`);
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Error handling payment cancellation.' });
            }
        },
    }
}

module.exports = paymentController;