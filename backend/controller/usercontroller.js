const User = require("../models/User");
const path = require("path");
const fs = require("fs");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)


const userController = () => {
    return {
        getAllUser: async (req, res) => {

            try {
                const users = await User.find();
                res.json(users);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        },

        getUserById: async (req, res) => {
            try {
                const user = await User.findById(req.params.id);
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }
                res.json(user);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        },

        getProfileById: async (req, res) => {
            try {
                const user = await User.findById(req.params.id).select("-password -token -role");
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }
                res.status(200).json({ message: "User Profile Retrived Successfully.", user: user });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        },

// -------------------------------->>> Payment Creation -----------------------------------


        createPaymentIntent: async (req, res) => {
            try {
                const { amount, currency } = req.body;

                const intent = await stripe.paymentIntents.create({
                    amount,
                    currency: "usd",
                    payment_method_types: ['card'],
                });
                res.status(200).json({ clientSecret: intent.client_secret });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        },


    }
}

module.exports = userController;

