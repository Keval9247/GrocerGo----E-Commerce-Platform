import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { ForgotPassword, Login, Signup, VerifyOtp } from '../../apis/Authapi';

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await Login({ email, password });
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
        try {
            const response = await ForgotPassword({ email })
            if (response.message) {
                throw new Error(response.message);
            }
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data.error);
        }
    }
)

export const verifyOtp = createAsyncThunk(
    'auth/verifyOtp',
    async (otp, { rejectWithValue }) => {
        try {
            const response = await VerifyOtp(otp)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data.error);
        }
    }
)
