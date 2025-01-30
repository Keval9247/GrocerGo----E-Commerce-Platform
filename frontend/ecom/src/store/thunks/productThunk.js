import { createAsyncThunk } from "@reduxjs/toolkit";
import { addToCart, deleteCartItem, updateCartItemQuantity } from "../../apis/products/Productapi";


export const AddToCart = createAsyncThunk(
    'products/Add_To_Cart',
    async (props, { rejectWithValue }) => {
        console.log("🚀🚀 Your selected text is => props: ", props);
        try {
            const response = await addToCart(props);
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
            const response = await updateCartItemQuantity(props);
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
            const response = await deleteCartItem(props);
            return response;
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong");
        }
    }
)
