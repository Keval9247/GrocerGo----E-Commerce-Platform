const express = require('express');
const adminController = require('../controller/adminControllers');
const { saveAdminProfilePic } = require('../miidleware/uploadImage');
const router = express.Router();
const productsRoutes = require('./productRoutes');
const authMiddleware = require('../miidleware/authMiddleware');



router.get('/', authMiddleware('admin'), adminController().getAdminDetails);
router.put('/update/:id', authMiddleware('admin'), saveAdminProfilePic.single("profilePic"), adminController().updateAdminDetails);

router.get('/users', authMiddleware('admin'), adminController().getAllUsers);


router.delete('/delete/:id', authMiddleware('admin'), adminController().deleteUser);

router.use('/products', productsRoutes);



module.exports = router;