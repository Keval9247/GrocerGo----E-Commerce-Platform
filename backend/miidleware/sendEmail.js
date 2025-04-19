const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // ✅ full and correct
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


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


    await transporter.sendMail({
        from: `"GrocerGo" <no-reply@grocergostore.com>`,
        to: to || req.user?.email,
        subject: subject || defaultSubject,
        html: htmlContent || defaultHtmlContent,
    });
}

const sendContactEmail = async (name, email, message, subject) => {
    const supportSubject = `New Contact Inquiry from ${name}`;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto;">
        <h2 style="color: #2c3e50;">📩 New Contact Us Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        ${subject ? `<p><strong>subject:</strong> ${subject}</p>` : ''}
        <div style="margin: 20px 0; padding: 15px; border-left: 4px solid #0d6efd; background: #f1f1f1;">
          <p style="margin: 0;"><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; margin-top: 8px;">${message}</p>
        </div>
        <p style="margin-top: 30px;">💼 This inquiry was submitted via the GrocerGo Contact Us page.</p>
      </div>
    `;

    await transporter.sendMail({
        from: `"GrocerGo Contact" <no-reply@grocergostore.com>`,
        to: email,
        cc: process.env.EMAIL_USER,
        subject: supportSubject,
        html: htmlContent,
    });
};

module.exports = { sendEmail, sendContactEmail };