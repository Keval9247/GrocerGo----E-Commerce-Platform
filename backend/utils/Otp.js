const otpgenerate = require('otp-generator');

const OtpGenerate = () => {
    const otp = otpgenerate.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
        digits: true,
        lowerCaseAlphabets: false,
        alphabets: false,
    });
    return otp;
};


const ExpireOtp = () => {
    const expiredAt = new Date();
    expiredAt.setMinutes(expiredAt.getMinutes() + 10);
    return expiredAt;
}

module.exports = {
    OtpGenerate,
    ExpireOtp
};
