const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const Product = require("../models/Product");
const sendEmail = require("../miidleware/sendEmail");
const { ExpireOtp, OtpGenerate } = require("../utils/Otp");
const Otp = require("../models/Otp");
const path = require("path");
const fs = require('fs');

const logincontroller = () => {
    return {
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
    }
}

module.exports = logincontroller;
