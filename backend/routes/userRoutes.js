const express = require('express');
const router = express.Router()
const userController = require('../controller/usercontroller');
const { saveAdminProfilePic } = require('../miidleware/uploadImage');


router.get('/', userController().getAllUser);
router.get('/:id', userController().getUserById);
router.get('/profile/:id', userController().getProfileById)

router.post('/create-payment-intent', userController().createPaymentIntent)


module.exports = router;

