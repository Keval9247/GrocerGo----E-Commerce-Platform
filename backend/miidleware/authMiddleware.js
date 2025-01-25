const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    console.log("Cokkiese : ", req.cookies.token);

    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied' });
    }

    try {
        let decoded;
        if (req.cookies.token) {
            decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY);
            req.user = decoded
        }
        if (token) {
            decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = decoded
        }
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
