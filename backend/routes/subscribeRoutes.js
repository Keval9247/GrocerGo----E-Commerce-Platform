const express = require('express');
const router = express.Router();
const subscribecontroller = require('../controller/subscribecontroller');

router.post('/', subscribecontroller().subscribeletter);
router.post('/contact', subscribecontroller().contactUs)

module.exports = router;
