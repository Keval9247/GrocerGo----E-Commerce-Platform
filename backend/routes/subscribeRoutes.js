// routes/subscribe.js

const express = require('express');
const router = express.Router();
const subscribecontroller = require('../controller/subscribecontroller');

// router.post('/', subscribecontroller().subscribeletter);
router.post('/', subscribecontroller().subscribeletter);

module.exports = router;
