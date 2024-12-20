const path = require('path');
const fs = require('fs');
const sendEmail = require("../miidleware/sendEmail");

// const sendEmail = require('../middleware/sendEmail');

const subscribecontroller = () => {
    return {
        subscribeletter: async (req, res) => {
            try {
                const { email } = req.body;
                console.log("🚀 ~ subscribeletter: ~ email:", email)
                if (!email) {
                    return res.status(400).json({ error: 'Email is required.' });
                }
                const templete = path.join(__dirname, '..', 'views', 'subscribeTemplete.html');
                const htmlContentuserset = fs.readFileSync(templete, 'utf8');
                const htmlContent = htmlContentuserset.replace('{{username}}', req.user?.email || email);

                const defaultSubject = `Thanks for Joining GrocerGo! Let's Get Shopping 🛒`;
                await sendEmail(email, defaultSubject, htmlContent);
                res.json({
                    email: email,
                    message: 'Subscribed Newsletter successfully.'
                });
            } catch (error) {
                console.error('Error in subscribeletter:', error);
                res.status(500).json({ error: error.message });
            }
        }
    };
};

module.exports = subscribecontroller;
