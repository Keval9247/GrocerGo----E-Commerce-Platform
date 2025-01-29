import { createAsyncThunk } from "@reduxjs/toolkit";
import { Add_To_Cart, DeleteCartItem, UpdateCartItemQuantity } from "../../apis/products/Productapi";


export const AddToCart = createAsyncThunk(
    'products/Add_To_Cart',
    async (props, { rejectWithValue }) => {
        try {
            const response = await Add_To_Cart(props);
            return response;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error?.response?.data || "Something went wrong");
        }
    }
)

export const UpdateCart = createAsyncThunk(
    'products/updateCartQuantity',
    async (props, { rejectWithValue }) => {
        try {
            const response = await UpdateCartItemQuantity(props);
            return response;
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong");
        }
    }
)

export const DeleteCart = createAsyncThunk(
    'products/DeleteCart',
    async (props, { rejectWithValue }) => {
        try {
            const response = await DeleteCartItem(props);
            return response;
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong");
        }
    }
)
