import axios from "axios";

export const createPaymentIntent = async (amount) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/create-payment-intent`, { amount: 1000 });
        console.log("🚀🚀 Your selected text is => response: ", response);
        return response.data;
    } catch (error) {
        console.error('Error creating payment intent:', error);
        throw error;
    }
}