const express = require('express');
const adminController = require('../controller/adminControllers');
const { saveAdminProfilePic } = require('../miidleware/uploadImage');
const router = express.Router();
const productsRoutes = require('./productRoutes')



router.get('/', adminController().getAdminDetails);
router.put('/update/:id', saveAdminProfilePic.single("profilePic"), adminController().updateAdminDetails);

router.get('/users', adminController().getAllUsers);


router.delete('/delete/:id', adminController().deleteUser);

router.use('/products', productsRoutes);



module.exports = router;