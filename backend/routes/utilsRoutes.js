const express = require('express');
const router = express.Router();
const utilscontroller = require('../controller/utilscontroller');

router.post('/subscribe', utilscontroller().subscribeletter);

router.get('/details', (req, res) => {
    res.send('Product Details');
});

module.exports = router;