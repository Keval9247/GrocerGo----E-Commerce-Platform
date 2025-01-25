const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes')
const subscribeRoutes = require('./subscribeRoutes')
const productsRoutes = require('./productRoutes')
const userRoutes = require('./userRoutes');
const adminRoutes = require('./adminRoutes');

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/admin', adminRoutes);
router.use('/subscribe', subscribeRoutes);
router.use('/products', productsRoutes);


module.exports = router;
