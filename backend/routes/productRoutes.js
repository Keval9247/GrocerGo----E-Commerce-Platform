const express = require('express');
const productController = require('../controller/productcontroller');
const { productImageHandler } = require('../miidleware/uploadImage');
const router = express.Router();
const cartRoutes = require('./cartRoutes');


router.get('/count', productController().getCountData)
router.post('/create-product', productImageHandler.single('productImg'), productController().createProduct)
router.get('/', productController().getAllProducts)
router.put('/update/:id', productImageHandler.single('productImg'), productController().updateProduct)


router.delete('/delete', productController().deleteProduct)

router.post('/findProductByCategory', productController().findProductByCategory)
router.get('/:id', productController().getProductById)


// ratind and reviews :
router.get('/get-rating/:productId', productController().getProductRatings)
router.post('/rating-review/:userId/:productId', productController().createRatingAndReview)


// favourite routes :
router.post('/add-to-favorite/:productId', productController().addToFavourite)


// category routes :
router.use('/cart', cartRoutes)

module.exports = router;
