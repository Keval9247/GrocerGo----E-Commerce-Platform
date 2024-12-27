const express = require('express');
const router = express.Router()
const userController = require('../controller/usercontroller');
const User = require('../models/User');


// GET request for the homepage

const getAdminDetails = async (req, res) => {
    console.log(222);

    try {
        const user = await User.findOne({ role: 'admin' });
        if (!user) {
            return res.status(404).json({ error: 'No admin found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


router.get('/', userController().getAllUser)
router.get('/:id', userController().getUserById)
router.get('/admin', getAdminDetails)



module.exports = router;

