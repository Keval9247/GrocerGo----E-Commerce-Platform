import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
const api = axios.create({
    baseURL: API_BASE_URL + '/api',
    headers: {
        "Content-Type": "application/json",
    },
});

export const apiRequest = async (method, endpoint, data = {}, params = {}, headers = {}) => {
    try {
        const response = await api({ method, url: endpoint, data, params, headers, withCredentials: true, });
        return response.data;
    } catch (error) {
        console.error("API Error:", error.response);
        toast.error(error?.response?.data?.message || "Something went wrong!");
    }
};




export const Login = (credentials) => apiRequest("POST", "/auth/login", credentials, {}, { withCredentials: true });

export const Signup = (userData) => apiRequest("POST", "/auth/add", userData);

export const ForgotPassword = (email) => apiRequest("POST", "/auth/forgot-password", { email });

export const VerifyOtp = (otp) => apiRequest("POST", "/auth/verifyOtp", { otp });

export const getUserDetails = (id) => apiRequest("GET", `/user/profile/${id}`);
