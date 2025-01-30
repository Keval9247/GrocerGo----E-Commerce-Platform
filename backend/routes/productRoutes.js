const express = require('express');
const productController = require('../controller/productcontroller');
const { productImageHandler } = require('../miidleware/uploadImage');
const router = express.Router();
const cartRoutes = require('./cartRoutes');
const authMiddleware = require('../miidleware/authMiddleware');


router.get('/count', authMiddleware('user', 'admin'), productController().getCountData)
router.post('/create-product', authMiddleware('admin'), productImageHandler.single('productImg'), productController().createProduct)
router.get('/', authMiddleware('user', 'admin'), productController().getAllProducts)
router.put('/update/:id', authMiddleware('admin'), productImageHandler.single('productImg'), productController().updateProduct)


router.delete('/delete', authMiddleware('admin'), productController().deleteProduct)

router.post('/findProductByCategory', authMiddleware('user', 'admin'), productController().findProductByCategory)
router.get('/id/:id', authMiddleware('user', 'admin'), productController().getProductById)


// ratind and reviews :
router.get('/get-rating/:productId', authMiddleware('user', 'admin'), productController().getProductRatings)
router.post('/rating-review/:userId/:productId', authMiddleware('user'), productController().createRatingAndReview)


// favourite routes :
router.get('/get-favorite-products', authMiddleware('user', 'admin'), productController().getFavouriteProducts)
router.post('/add-to-favorite/:productId', authMiddleware('user'), productController().addToFavourite)
router.delete('/remove-from-favorite/:productId', authMiddleware('user'), productController().removeFromFavourite)

// cart routes :
router.use('/cart', authMiddleware('user'), cartRoutes)

module.exports = router;
