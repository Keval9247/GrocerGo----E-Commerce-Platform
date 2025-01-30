const express = require('express');
const router = express.Router()
const userController = require('../controller/usercontroller');
const { saveAdminProfilePic } = require('../miidleware/uploadImage');
const paymentRouter = require('./paymentRoutes')
const orderRoutes = require('./orderRoutes');
const authMiddleware = require('../miidleware/authMiddleware');


router.get('/', userController().getAllUser);
router.get('/:id', userController().getUserById);
router.get('/profile/:id', userController().getProfileById)

// ---------------------------> payment and order routes  <--------------------------------------------------------------//

router.use('/payment', authMiddleware('user', 'admin'), paymentRouter)
router.use('/orders', authMiddleware('user', 'admin'), orderRoutes)


module.exports = router;

