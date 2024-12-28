const User = require("../models/User");


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
        getAdminDetails: async (req, res) => {
            console.log(222);

            try {
                const user = await User.findOne({ role: 'admin' }).select("-password ");
                if (!user) {
                    return res.status(404).json({ error: 'No admin found' });
                }
                res.json(user);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        }
    }
}

module.exports = userController;

