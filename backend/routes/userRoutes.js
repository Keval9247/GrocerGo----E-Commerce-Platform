const express = require('express');
const router = express.Router()
const userController = require('../controller/usercontroller');


router.get('/', userController().getAllUser)
router.get('/admin', userController().getAdminDetails)
router.get('/:id', userController().getUserById)



module.exports = router;

