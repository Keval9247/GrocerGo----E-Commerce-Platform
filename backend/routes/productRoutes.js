const express = require('express');
const productController = require('../controller/productcontroller');
const { productImageHandler } = require('../miidleware/uploadImage');
const router = express.Router();


router.get('/count', productController().getCountData)
router.post('/create-product', productImageHandler.single('productImg'), productController().createProduct)
router.get('/', productController().getAllProducts)
router.put('/update/:id', productImageHandler.single('productImg'), productController().updateProduct)


router.delete('/delete', productController().deleteProduct)

router.post('/findProductByCategory', productController().findProductByCategory)
router.get('/:id', productController().getProductById)

module.exports = router;
