const express = require('express');
const router = express.Router()
const userController = require('../controller/usercontroller');
const { saveAdminProfilePic } = require('../miidleware/uploadImage');
const paymentRouter = require('./paymentRoutes')
const orderRoutes = require('./orderRoutes')


router.get('/', userController().getAllUser);
router.get('/:id', userController().getUserById);
router.get('/profile/:id', userController().getProfileById)

// router.post('/create-payment-intent', userController().createPaymentIntent)

router.use('/payment', paymentRouter)
router.use('/orders', orderRoutes)


module.exports = router;

