const express = require('express');
const router = express.Router()
const userController = require('../controller/usercontroller');
const { saveAdminProfilePic } = require('../miidleware/uploadImage');


router.get('/', userController().getAllUser);
// router.get('/admin', userController().getAdminDetails);
router.get('/:id', userController().getUserById);
router.get('/profile/:id', userController().getProfileById)


// router.put('/admin/update/:id', (req, res, next) => {
//     console.log(123, req.file);
//     next()
// }, saveAdminProfilePic.single("profilePic"), userController().updateAdminDetails);

module.exports = router;

