// authAPI.js

import axios from 'axios';


export const Login = async (credentials) => {
    console.log("🚀🚀 Your selected text is credentials: ", credentials);
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, credentials);
        console.log("🚀🚀 Your selected text is response: ", response);
        return response?.data;
    } catch (error) {
        throw error
    }
};

export const Signup = async (userData) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/add`, userData);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const ForgotPassword = async (email) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/forgot-password`, email);
        return response;
    } catch (error) {
        throw error;
    }
};

export const VerifyOtp = async (otp) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/verifyOtp`, otp);
        return response;
    } catch (error) {
        throw error;
    }
}

