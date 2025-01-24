const express = require('express');
const paymentController = require('../controller/paymentController');
const router = express.Router();

router.post('/create-checkout-session/:id', paymentController().getCheckoutSession)
router.get('/success', paymentController().handlePaymentSuccess);
router.get('/cancel', paymentController().handlePaymentCancel);


// PayPal Routes
router.post('/paypal', paymentController().handlePayPalPayment)
router.post('/paypal/download/invoice', paymentController().downloadInvoice)
router.post('/paypal-success', paymentController().handlePayPalSuccess)

module.exports = router;