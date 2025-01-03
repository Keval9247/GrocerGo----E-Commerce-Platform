const express = require('express');
const User = require('../models/User');


const adminController = () => {
    return {
        getAdminDetails: async (req, res) => {
            try {
                const user = await User.findOne({ role: 'admin' }).select("-password ");
                if (!user) {
                    return res.status(404).json({ error: 'No admin found' });
                }
                res.json(user);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        },

        updateAdminDetails: async (req, res) => {
            const { name, address, phone, } = req.body;
            const profilePic = req.file;
            try {
                const user = await User.findById(req.params.id);
                if (!user) {
                    return res.status(404).json({ error: "User not found" });
                }
                user.name = name || user.name;
                user.address = address || user.address;
                user.phone = phone || user.phone;

                if (profilePic) {
                    user.profilePic = `/public/profile/admin/${profilePic.filename}`;
                }
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }
                await user.save();
                res.status(201).json({
                    success: true,
                    message: 'Admin details updated successfully',
                    admin: user
                });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        },

        deleteUser: async (req, res) => {
            try {
                const { id } = req.params;
                const deletedUser = await User.findByIdAndDelete(id);

                if (!deletedUser) {
                    return res.status(404).json({ message: "User not found" });
                }

                res.status(200).json({ message: "User deleted successfully" });
            } catch (err) {
                res.status(500).json({ message: "Error deleting user", error: err.message });
            }
        },

        getAllUsers: async (req, res) => {
            try {
                const users = await User.find({ role: 'user' }).select("-password -token");
                res.json({ success: true, message: "Users retrieved successfully", users: users });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        },
    }
}

module.exports = adminController;