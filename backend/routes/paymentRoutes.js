const express = require('express');
const paymentController = require('../controller/paymentController');
const router = express.Router();

router.post('/create-checkout-session/:id', paymentController().getCheckoutSession)
router.get('/success', paymentController().handlePaymentSuccess);
router.get('/cancel', paymentController().handlePaymentCancel);

module.exports = router;