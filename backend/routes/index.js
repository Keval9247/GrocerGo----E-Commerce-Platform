const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes')
const subscribeRoutes = require('./subscribeRoutes')
const productsRoutes = require('./productRoutes')
const userRoutes = require('./userRoutes')

// // Load each route file dynamically
// fs.readdirSync(__dirname).forEach((file) => {
//   console.log("🚀 ~ fs.readdirSync ~ file:", file);

//   // Only process .js files and skip index.js itself
//   if (file !== 'index.js' && file.endsWith('.js')) {
//     const route = require(path.join(__dirname, file));
//     console.log("🚀 ~ fs.readdirSync ~ route:", route)
//     const routeName = `/${file.split('.')[0]}`; // Prefix route by file name
//     router.use(routeName, route); // Attach the route
//     console.log(`Loaded route: ${routeName}`);
//   }
// });

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/subscribe', subscribeRoutes);
router.use('/products', productsRoutes);


module.exports = router;
