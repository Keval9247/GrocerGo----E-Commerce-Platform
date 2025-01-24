const axios = require('axios');

async function generatePayPalAccessToken() {
    try {
        const response = await axios({
            method: 'POST',
            url: `${process.env.PAYPAL_BASE_URL}/v1/oauth2/token`,
            auth: {
                username: process.env.PAYPAL_SANDBOX_CLIENT_ID,
                password: process.env.PAYPAL_SANDBOX_SECRET
            },
            data: 'grant_type=client_credentials'
        });
        return response.data.access_token;
    } catch (error) {
        console.error(error);
    }
}


module.exports = generatePayPalAccessToken;