import axios from "axios";

export const getCheckoutSession = async (id, items) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/payment/create-checkout-session/${id}`, { items });
        return response.data;
    } catch (error) {
        console.error('Error fetching payment intent:', error);
        throw error;
    }
}

export const handlePaymentSuccess = async (session_id) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/payment/success?session_id=${session_id}`);
        return response.data;
    } catch (error) {
        console.error('Error handling payment success:', error);
        throw error;
    }
}

export const handlePaymentCancel = async (session_id) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/payment/cancel?session_id=${session_id}`);
        return response.data;
    } catch (error) {
        console.error('Error handling payment cancel:', error);
        throw error;
    }
}

export const payPalPayment = async (order) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/payment/paypal`, order);
        return response.data;
    } catch (error) {
        console.error('Error paying with PayPal:', error);
        throw error;
    }
}

export const payPalSuccess = async (orderId) => {
    console.log("🚀🚀 Your selected text is => orderId: ", orderId);
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/payment/paypal-success`, { orderId },
            {
                responseType: "blob", // Ensure response is treated as binary
            }
        );
        return response;
    } catch (error) {
        console.error('Error handling PayPal payment success:', error);
        throw error;
    }
}