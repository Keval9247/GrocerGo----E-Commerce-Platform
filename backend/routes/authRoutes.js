const express = require('express');
const router = express.Router();
const logincontroller = require('../controller/logincontroller');


router.post('/add', logincontroller().signup);
router.post('/login', logincontroller().login);
router.post('/forgot-password', logincontroller().forgotPassword);
router.post('/verifyOtp', logincontroller().verifyOtp);
router.post('/resend-otp', logincontroller().resendOtp);
// router.post('/reset-password/', logincontroller().resetPassword);

module.exports = router;
