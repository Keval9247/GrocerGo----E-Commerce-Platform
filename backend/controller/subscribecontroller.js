const path = require('path');
const fs = require('fs');
const sendEmail = require("../miidleware/sendEmail");

const subscribecontroller = () => {
    return {
        subscribeletter: async (req, res) => {
            try {
                const { email } = req.body;
                if (!email) {
                    return res.status(400).json({ error: 'Email is required.' });
                }
                const templete = path.join(__dirname, '..', 'views', 'subscribeTemplete.html');
                const htmlContentuserset = fs.readFileSync(templete, 'utf8');
                const htmlContent = htmlContentuserset.replace('{{username}}', req.user?.email || email);

                const defaultSubject = `Thanks for Joining GrocerGo! Let's Get Shopping 🛒`;
                await sendEmail.sendEmail(email, defaultSubject, htmlContent);
                res.json({
                    email: email,
                    message: 'Subscribed Newsletter successfully.'
                });
            } catch (error) {
                console.error('Error in subscribeletter:', error);
                res.status(500).json({ error: error.message });
            }
        },

        contactUs: async (req, res) => {
            const { name, email, subject, message } = req.body;
            console.log("🚀🚀 Your selected text is => req.body: ", req.body);
            if (!name || !email || !subject || !message) {
                return res.status(400).json({ error: 'All fields are required.' });
            }
            await sendEmail.sendContactEmail(name, email, message, subject)

            res.status(201).json({ message: 'Your message has been sent successfully.' })
        }
    };
};

module.exports = subscribecontroller;
