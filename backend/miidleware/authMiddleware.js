const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const authMiddleware = (...roles) => {
    return asyncHandler(async (req, res, next) => {
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({ error: "No token, authorization denied" });
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

            const user = await User.findOne({ email: decoded.email }).select("-password");
            if (!user) {
                return res.status(401).json({ error: "User not found" });
            }

            req.user = user;

            if (roles.length && !roles.includes(user.role)) {
                return res.status(403).json({ message: "Forbidden: Insufficient rights" });
            }
            next();
        } catch (error) {
            console.error("🚀 Token Error: ", error);
            res.status(401).json({ error: "Invalid token" });
        }
    });
};

module.exports = authMiddleware;
