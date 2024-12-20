const User = require("../models/User");

const verifycontroller = () => {
    return {
        verify: async (req, res) => {
            const { token } = req.params;
            if (!token) {
                return res.status(400).json({ error: 'Token is required.' });
            }
            try {
                const user = await User.findOne({ verifyToken: token });
                if (!user) {
                    return res.status(404).json({ error: 'User not found.' });
                }
                user.isVerified = true;
                user.verifyToken = null;
                await user.save();
                res.json({ message: 'User verified successfully.' });
            } catch (error) {
                console.error('Error in verify:', error);
                res.status(500).json({ error: error.message });
            }
        }
    }
}