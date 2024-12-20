import { createAsyncThunk } from "@reduxjs/toolkit";
import { Subscribe } from "../../../apis/subscribe/SubscribeApi";


export const SubscribeLetter = createAsyncThunk(
    '/subscribeLetter',
    async (email, { rejectWithValue }) => {
        try {
            const response = await Subscribe({ email })
            if (!response.ok) {
                throw new Error('Failed to subscribe');
            }
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)