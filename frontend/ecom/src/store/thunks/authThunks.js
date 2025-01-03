import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { ForgotPassword, Login, Signup, VerifyOtp } from '../../apis/Authapi';

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        console.log("🚀🚀 Your selected text is email, password: ", email, password);
        try {
            const response = await Login({ email, password });
            console.log("🚀🚀 Your selected text is response: ", response);
            // const { token, role } = response.user;

            // if (!response.user.token) {
            //     alert('Token Invalid. Please Login Again...');
            //     return rejectWithValue('Invalid Token');
            // } else {
            //     localStorage.setItem('token', response.user.token);
            //     document.cookie = `token=${response.user.token}; Secure; SameSite=Strict`;
            //     return { user: response.user, role };
            // }
            return response
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);

export const signup = createAsyncThunk(
    'auth/signup',
    async ({ ...data }, { rejectWithValue }) => {
        try {
            const response = await Signup(data);
            const { token, role } = response.user;

            if (!response.user.token) {
                alert('Token Invalid. Please Login Again...');
                return rejectWithValue('Invalid Token');
            } else {
                localStorage.setItem('token', response.user.token);
                return { user: response.user, role };
            }
        } catch (error) {
            return rejectWithValue(error.response.data.error);
        }
    }
);

export const forgetPassword = createAsyncThunk(
    'auth/forgetPassword',
    async (email, { rejectWithValue }) => {
        console.log("🚀 ~ email:", email)
        try {
            const response = await ForgotPassword({ email })
            console.log("response : ", response)
            if (response.message) {
                throw new Error(response.message);
            }
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data.error);
        }
    }
)

export const verifyOtp = createAsyncThunk('auth/verifyOtp',
    async (otp, { rejectWithValue }) => {
        try {
            const response = await VerifyOtp(otp)
            console.log("response : ", response)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data.error);
        }
    }
)
