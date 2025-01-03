const User = require("../models/User");
const path = require("path");
const fs = require("fs");


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
        // getAdminDetails: async (req, res) => {
        //     try {
        //         const user = await User.findOne({ role: 'admin' }).select("-password ");
        //         if (!user) {
        //             return res.status(404).json({ error: 'No admin found' });
        //         }
        //         res.json(user);
        //     } catch (error) {
        //         res.status(500).json({ error: error.message });
        //     }
        // },
        // updateAdminDetails: async (req, res) => {
        //     const { name, address, phone, } = req.body;
        //     const profilePic = req.file;
        //     console.log("🚀🚀 Your selected text is profilePic: ", profilePic);
        //     try {
        //         const user = await User.findById(req.params.id);
        //         if (!user) {
        //             return res.status(404).json({ error: "User not found" });
        //         }
        //         user.name = name || user.name;
        //         user.address = address || user.address;
        //         user.phone = phone || user.phone;

        //         if (profilePic) {
        //             user.profilePic = `/public/profile/admin/${profilePic.filename}`;
        //         }
        //         if (!user) {
        //             return res.status(404).json({ error: 'User not found' });
        //         }
        //         await user.save();
        //         res.status(201).json({
        //             success: true,
        //             message: 'Admin details updated successfully',
        //             admin: user
        //         });
        //     } catch (error) {
        //         res.status(500).json({ error: error.message });
        //     }
        // }
    }
}

module.exports = userController;

