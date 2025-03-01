import { createSlice } from "@reduxjs/toolkit";
import { forgetPassword, login, signup, verifyOtp } from "../thunks/authThunks";

const initialState = {
    isAuthenticated: false,
    user: null,
    role: null,
    error: null,
    isVerified: false,
    isUser: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        /*Actions */
        // logout: (state) => {
        //     state.isAuthenticated = false;
        //     state.user = null;
        //     state.role = null;
        //     state.error = null;
        //     localStorage.removeItem('token');
        // },
        clearAuthentication(state) {
            state.isAuthenticated = false;
            state.user = null;
            state.role = null;
            localStorage.removeItem('token');
            state.error = null;
            state.isVerified = false;
            state.isUser = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isAuthenticated = action.payload?.user?.isVerified;
                state.user = action.payload?.user;
                state.role = action.payload?.user?.role;
                state.error = null;
                state.isVerified = action.payload?.user?.isVerified;
                state.isUser = action.payload?.user?.role == 'user';
            },)
            .addCase(login.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.user = null;
                state.role = null;
                state.error = action.payload ? action.payload.error : 'Login failed';;
            },)
            .addCase(signup.fulfilled, (state, action) => {
                state.isAuthenticated = false;
                state.user = action.payload?.user;
                state.role = action.payload?.user?.role;
                state.error = null;
                state.isVerified = action.payload?.user?.isVerified;
                state.isUser = action.payload?.user?.role == 'user';
            },)
            .addCase(signup.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.user = null;
                state.role = null;
                state.error = action.payload ? action.payload.error : 'Sign up failed';;
            },)
            .addCase(verifyOtp.fulfilled, (state, action) => {
                state.user = action.payload?.user;
                state.error = null;
                state.isVerified = true;
                state.role = action.payload?.user?.role;
            })
            .addCase(verifyOtp.rejected, (state, action) => {
                state.error = action.payload ? action.payload.error : 'Invalid OTP';
            })
            .addCase(forgetPassword.pending, (state, action) => {
                state.user = null
                state.error = null;
            })
            .addCase(forgetPassword.fulfilled, (state, action) => {
                state.user = action.payload;
                state.error = null;
            })
            .addCase(forgetPassword.rejected, (state, action) => {
                state.error = action.payload ? action.payload.error : 'Failed to send reset email';
                state.user = null;
            })
    },
})


export const { logout, clearAuthentication } = authSlice.actions;
export default authSlice.reducer;