import { apiRequest } from "../Authapi";

export const getCheckoutSession = async (id, items) => {
    return await apiRequest("POST", `/user/payment/create-checkout-session/${id}`, { items });
};

export const handlePaymentSuccess = async (session_id) => {
    return await apiRequest("GET", "/user/payment/success", {}, { session_id });
};

export const handlePaymentCancel = async (session_id) => {
    return await apiRequest("GET", "/user/payment/cancel", {}, { session_id });
};

export const payPalPayment = async (order) => {
    return await apiRequest("POST", "/user/payment/paypal", order);
};

export const payPalSuccess = async (orderId) => {
    return await apiRequest("POST", "/user/payment/paypal-success", { orderId }, {}, { responseType: "blob" });
};
