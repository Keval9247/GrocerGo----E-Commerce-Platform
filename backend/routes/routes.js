// routes/routes.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Read all JavaScript files in the current directory, excluding this file
fs.readdirSync(__dirname).forEach((file) => {
    if (file !== 'routes.js' && file.endsWith('.js')) {
        const routePath = `/${file.replace('.js', '')}`;
        const route = require(path.join(__dirname, file));

        // Check if the imported route is an Express Router instance
        if (route instanceof express.Router) {
            router.use(routePath, route);
            console.log(`Registered route: ${routePath}`);
        } else {
            console.error(`Error: ${file} does not export a valid Express Router.`);
        }
    }
});

module.exports = router;
