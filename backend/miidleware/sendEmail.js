const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, htmlContent) => {

    const defaultHtmlContent = `
    <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>Welcome to GrocerGo!</h2>
        <p>Thank you for joining us. We're excited to have you on board.</p>
        <div style="text-align: center; margin: 20px 0;">
            <img src="https://example.com/welcome-image.jpg" alt="GrocerGo Welcome" style="max-width: 100%; height: auto;" />
        </div>
        <p>Get ready to explore the best groceries at your fingertips.</p>
        <p>Cheers, <br/> The GrocerGo Team</p>
    </div>
`;
    const defaultSubject = `Thanks for Joining GrocerGo! Let's Get Shopping 🛒`

    let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: process.env.EMAIL_SECURE === 'true',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    await transporter.sendMail({
        from: `"GrocerGo" <no-reply@grocergostore.com>`,
        to: to || req.user?.email,
        subject: subject || defaultSubject,
        html: htmlContent || defaultHtmlContent,
    });
}

module.exports = sendEmail;