const express = require('express');
const orderController = require('../controller/orderController');
const router = express.Router();

router.get('/readAll', orderController().getAllOrders);
router.get('/readOne/:id', orderController().getOrderById);

module.exports = router;