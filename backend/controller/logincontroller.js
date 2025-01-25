const User = require("../models/User");
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
// const products = require("../models/Product");
const Product = require("../models/Product");
const Cart = require('../models/Cart');
const sendEmail = require("../miidleware/sendEmail");
const { ExpireOtp, OtpGenerate } = require("../utils/Otp");
const Otp = require("../models/Otp");
const path = require("path");
const fs = require('fs');
const uuid = require('uuid').v4
const stripe = require('stripe')(process.env.STRIPE_SECRETKEY)

const logincontroller = () => {
    return {
        readAll: async (req, res) => {
            try {
                const users = await User.find({}, ['name', 'email']);
                res.json(users);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        },

        readOne: async (rea, res) => {
            try {
                const user = await Product.findById(rea.params.id, ['category', 'name', 'price', 'description']);
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }
                res.status(200).json({
                    success: true,
                    message: "Product Retreived Successfully",
                    user: user
                })
                // res.json(user);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        },

        login: async (req, res) => {
            try {
                const { email, password } = req.body;
                const user = await User.findOne({ email });
                if (!user) {
                    return res.status(400).json({ error: 'User not found' });
                }

                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return res.status(400).json({ error: 'Invalid credentials' });
                }
                if (!user.isVerified) {
                    const otp = OtpGenerate();
                    if (!otp) {
                        return res.status(500).json({ error: 'Failed to generate OTP' });
                    }
                    await Otp.create({ userId: user._id, otp: otp });
                    const htmlContent = `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
                            <h1 style="color: #580380; text-align: center;">Welcome to GrocerGo!</h1>
                            <p style="font-size: 16px; color: #333;">
                                Hello! We're thrilled to have you join us. To complete your registration, please use the OTP below to verify your account:
                            </p>
                            <p style="font-size: 24px; color: #580380; font-weight: bold; text-align: center; margin: 20px 0;">
                                ${otp}
                            </p>
                            <p style="font-size: 16px; color: #333;">
                                If you didn’t request this email, please ignore it. Your account will remain secure.
                            </p>
                            <p style="font-size: 16px; color: #333;">
                                Thanks for joining us and welcome to GrocerGo!
                            </p>
                            <p style="font-size: 14px; color: #888; text-align: center; border-top: 1px solid #ddd; padding-top: 20px;">
                                © ${new Date().getFullYear()} GrocerGo. All rights reserved.
                            </p>
                        </div>
                    `;
                    await sendEmail(user.email, "Your OTP for Account Verification", htmlContent);
                    return res.status(200).json({
                        // verify: false,
                        message: 'User is not verified',
                        user: {
                            id: user._id,
                            name: user.name,
                            email: user.email,
                            role: user.role,
                            isVerified: user.isVerified,
                        },
                    });
                }

                const payload = {
                    id: user._id,
                    // name: user.name,
                    email: user.email
                }

                const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

                res.cookie('token', `${token}`, { httpOnly: true })
                    .status(200).json({
                        success: true,
                        message: 'User logged in successfully',
                        user: {
                            id: user._id,
                            name: user.name,
                            email: user.email,
                            role: user.role,
                            isVerified: user.isVerified,
                        },
                        token: token
                    });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        },

        signup: async (req, res) => {
            try {
                const { name, email, password, address, gender, phone, role = 'user' } = req.body;
                const existingUser = await User.findOne({ email });
                if (existingUser) {
                    return res.status(403).json({ success: false, error: 'User with this email already exists' });
                }

                const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = new User({
                    name,
                    email,
                    password: hashedPassword,
                    address,
                    gender,
                    phone,
                    role,
                    isVerified: false,
                });
                const payload = {
                    id: newUser._id,
                    email: newUser.email,
                    role: newUser.role,
                };
                const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

                const otp = OtpGenerate();
                if (!otp) {
                    return res.status(500).json({ error: 'Failed to generate OTP' });
                }
                await Otp.create({ userId: newUser._id, otp: otp });
                const htmlContent = `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
                        <h1 style="color: #580380; text-align: center;">Welcome to GrocerGo!</h1>
                        <p style="font-size: 16px; color: #333;">
                            Hello! We're thrilled to have you join us. To complete your registration, please use the OTP below to verify your account:
                        </p>
                        <p style="font-size: 24px; color: #580380; font-weight: bold; text-align: center; margin: 20px 0;">
                            ${otp}
                        </p>
                        <p style="font-size: 16px; color: #333;">
                            If you didn’t request this email, please ignore it. Your account will remain secure.
                        </p>
                        <p style="font-size: 16px; color: #333;">
                            Thanks for joining us and welcome to GrocerGo!
                        </p>
                        <p style="font-size: 14px; color: #888; text-align: center; border-top: 1px solid #ddd; padding-top: 20px;">
                            © ${new Date().getFullYear()} GrocerGo. All rights reserved.
                        </p>
                    </div>
                `;
                await sendEmail(newUser.email, "Your OTP for Account Verification", htmlContent);
                newUser.token = token;
                await newUser.save();

                res.cookie('token', `${token}`, { httpOnly: true })
                    .status(201).json({
                        success: true,
                        message: 'User registered successfully',
                        verification: "Verification mail sent. Please check your email.",
                        user: {
                            id: newUser._id,
                            name: newUser.name,
                            email: newUser.email,
                            address: newUser.address,
                            gender: newUser.gender,
                            phone: newUser.phone,
                            role: newUser.role,
                            isVerified: newUser.isVerified,
                            token: token
                        },
                    });
            } catch (error) {
                console.error('Registration error:', error.message);
                res.status(500).json({ error: 'Server error' });
            }
        },

        forgotPassword: async (req, res) => {
            try {
                const user = await User.findOne({ email: req.body.email });
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }
                const otp = OtpGenerate();
                if (!otp) {
                    return res.status(500).json({ error: 'Failed to generate OTP' });
                }
                await Otp.create({ userId: user.id, otp: otp });

                const templete = path.join(__dirname, '..', 'views', 'otpTemplete.html');
                let htmlcontentbody = fs.readFileSync(templete, 'utf-8');
                htmlcontentbody = htmlcontentbody.replace('{{otp}}', otp);
                htmlcontentbody = htmlcontentbody.replace('{{username}}', user.name || user.email);

                await sendEmail(user.email, 'Reset your password using otp', htmlcontentbody);

                res.status(200).json({ success: true, message: 'Reset password sent successfully' });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        },

        verifyOtp: async (req, res) => {
            try {
                const { otp } = req.body;
                const otpDoc = await Otp.findOne({ otp });
                if (!otpDoc) {
                    return res.status(400).json({ error: 'Invalid OTP' });
                }
                const createdAt = new Date(otpDoc.created_at);
                const expiredAt = new Date(otpDoc.expiredAt);

                if (expiredAt < createdAt) {
                    return res.status(400).json({ error: 'OTP has expired' });
                }
                const user = await User.findByIdAndUpdate(otpDoc.userId, { isVerified: true }, { new: true }).select("-password -token");
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }

                res.status(200).json({ success: true, message: 'OTP verified successfully', user: user });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        },

        resendOtp: async (req, res) => {
            try {
                const { email } = req.body;

                if (!email) {
                    return res.status(400).json({ message: 'Email is required' });
                }
                const user = await User.findOne({ email });

                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                const otp = OtpGenerate();
                user.otp = otp;
                user.expiredAt = ExpireOtp();
                await user.save();

                await Otp.create({ userId: user._id, otp: otp });
                const htmlContent = `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
                        <h1 style="color: #580380; text-align: center;">Welcome to GrocerGo!</h1>
                        <p style="font-size: 16px; color: #333;">
                            Hello! We're thrilled to have you join us. To complete your registration, please use the OTP below to verify your account:
                        </p>
                        <p style="font-size: 24px; color: #580380; font-weight: bold; text-align: center; margin: 20px 0;">
                            ${otp}
                        </p>
                        <p style="font-size: 16px; color: #333;">
                            If you didn’t request this email, please ignore it. Your account will remain secure.
                        </p>
                        <p style="font-size: 16px; color: #333;">
                            Thanks for joining us and welcome to GrocerGo!
                        </p>
                        <p style="font-size: 14px; color: #888; text-align: center; border-top: 1px solid #ddd; padding-top: 20px;">
                            © ${new Date().getFullYear()} GrocerGo. All rights reserved.
                        </p>
                    </div>
                `;

                await sendEmail(email, "Your OTP for Account Verification", htmlContent);
                res.status(200).json({ message: 'OTP has been sent to your email' });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        },

        // resetPassword: async (req, res) => {
        //     try {
        //         const { token, password } = req.body;
        //         const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        //         if (!decoded) {
        //             return res.status(400).json({ error: 'Invalid token' });
        //         }

        //         const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
        //         const user = await User.findByIdAndUpdate(decoded.id, { password: hashedPassword }, { new: true });
        //         if (!user) {
        //             return res.status(404).json({ error: 'User not found' });
        //         }

        //         res.status(200).json({ success: true, message: 'Password reset successfully' });
        //     } catch (error) {
        //         res.status(500).json({ error: error.message });
        //     }
        // },
        ListProductsWithoutParams: async (req, res) => {
            try {
                const product = await Product.find({}, ['category', 'name', 'price', 'description']);
                if (!product) {
                    return res.status(404).json({ error: 'No products found' });
                }
                res.status(200).json({
                    success: true,
                    message: 'Products listed successfully',
                    count: product.length,
                    products: product,
                })
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        },

        listproducts: async (req, res) => {
            try {
                const pagesize = 6;
                const pagenumber = parseInt(req.query.page ? req.query.page : 1);
                const startIndex = (pagenumber - 1) * pagesize;
                const endIndex = startIndex + pagesize;

                const product = await Product.find({}, ['category', 'name', 'price', 'description']);
                if (!product) {
                    return res.status(404).json({ error: 'No products found' });
                }
                const lastIndexForSliced = req.query.limit ? req.query.limit : product.length
                const slicedproducts = product.slice(startIndex, lastIndexForSliced);
                res.status(200).json({
                    success: true,
                    message: 'Products listed successfully',
                    count: slicedproducts.length,
                    currentPage: pagenumber,
                    totalPages: Math.ceil(product.length / pagesize),
                    products: slicedproducts,
                })
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        },

        addproduct: async (req, res) => {
            try {
                const { name, price, description } = req.body;
                if (!req.file) {
                    return res.status(400).json({ error: 'No image provided' });
                }
                const Productname = await Product.findOne({ name });
                if (Productname) {
                    return res.status(400).json({ error: 'Product already exists' });
                }
                const imageUrl = `/images/${req.file.filename}`;

                const newProduct = new Product({ category: imageUrl, name, price, description });
                await newProduct.save();
                res.status(201).json({
                    success: true,
                    message: 'Product added successfully',
                    product: newProduct
                });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        },

        createPayment: async (req, res) => {
            try {
                const { token, cartdata, totalPrice } = req.body;
                // const { price, name } = product;

                if (!token || !token.email) {
                    return res.status(400).json({ error: 'Token or email is missing in the request' });
                }
                if (!cartdata || !cartdata.items) {
                    return res.status(400).json({ error: 'Product data (price, name) is missing in the request' });
                }
                // Create a customer with a payment method attached
                const customer = await stripe.customers.create({
                    email: token.email,
                    source: token.id, // This attaches the payment method (token) to the customer
                });
                const name = cartdata.items ? cartdata.items.map(item => item.name) : req.user.email

                // Create a PaymentIntent
                const paymentIntent = await stripe.paymentIntents.create({
                    amount: Math.round(totalPrice), // Convert to cents and round
                    currency: 'usd',
                    customer: customer.id,
                    description: `Purchase of ${name}`,
                    metadata: { idempotencyKey: uuid() },
                    payment_method_types: ['card'],
                    confirm: true, // Confirm the PaymentIntent immediately
                    off_session: true,
                    return_url: 'http://localhost:4000/', // Replace with your own return URL
                });
                res.status(200).json({
                    success: true,
                    message: 'Payment successful',
                    paymentIntentId: paymentIntent.id,
                });
            } catch (error) {
                console.error('Error creating payment:', error);
                res.status(500).json({ error: error.message });
            }
        },

        addToCart: async (req, res) => {
            try {
                if (!req.body) {
                    return res.status(400).json({ error: 'No image provided' });
                }

                const { price, productId, category } = req.body;
                const userId = req.user.id;

                if (!productId) {
                    return res.status(400).json({ error: 'Product ID is required' });
                }

                const product = await Product.findById(productId);
                if (!product) {
                    return res.status(404).json({ error: 'Product not found' });
                }

                let cart = await Cart.findOne({ userId: userId });
                if (!cart) {
                    cart = new Cart({ userId: userId, items: [] });
                }

                // Check if the product already exists in the cart
                const existingCartItem = cart.items.find(item => item.productId.toString() === productId);

                if (existingCartItem) {
                    // Increase quantity if the item already exists in the cart
                    existingCartItem.quantity++;
                } else {
                    // Add new item to cart if it doesn't exist
                    cart.items.push({
                        productId: productId,
                        quantity: 1, // Assuming quantity is 1 for a new item
                        price: price,
                        category: category // Assuming req.body contains the category
                    });
                }
                await cart.save();

                // Respond with success message and updated cart
                res.status(200).json({
                    success: true,
                    message: 'Product added to cart successfully',
                    cart: cart
                });
            } catch (error) {
                console.error('Error adding product to cart:', error);
                res.status(500).json({ error: error.message });
            }
        },

        getCart: async (req, res) => {
            try {
                const userId = req.user.id;
                let cart = await Cart.findOne({ userId: userId }, ['userId', 'category', 'items.productId', 'items.quantity', 'items.category', 'items.price'])

                if (!cart) {
                    return res.status(404).json({ success: true, message: "Cart is Empty" });
                }

                res.status(200).json({
                    success: true,
                    message: 'Cart retrieved successfully',
                    cart: cart
                });
            } catch (error) {
                console.error('Error retrieving cart:', error);
                res.status(500).json({ error: error.message });
            }
        },

        removeFromCart: async (req, res) => {
            try {
                const { productId } = req.body;
                const userId = req.user.id;

                if (!productId) {
                    return res.status(400).json({ error: 'Product ID is required' });
                }

                const cart = await Cart.findOne({ userId: userId });

                cart.items = cart.items.filter(item => item.productId !== productId?.productId);
                await cart.save();

                res.status(200).json({
                    success: true,
                    message: 'Product removed from cart successfully',
                    // cart: cart
                });
            } catch (error) {
                console.error('Error removing product from cart:', error);
                res.status(500).json({ error: error.message });
            }

        },
    }
}

module.exports = logincontroller;
