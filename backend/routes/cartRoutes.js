const express = require('express');
const cartController = require('../controller/cartController');
const router = express.Router();


router.get('/getcart/:id', cartController().getCart);
router.post('/add-to-cart/:productId', cartController().addItemToCart);
router.delete('/remove-from-cart', cartController().removeItemFromCart);
router.put('/update-quantity', cartController().updateItemQuantity);

module.exports = router;