import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Add_To_Cart, UpdateCartItemQuantity } from "../../apis/products/Productapi";


export const AddToCart = createAsyncThunk(
    'products/Add_To_Cart',
    async (props) => {
        try {
            const response = await Add_To_Cart(props)
            return response;
        } catch (error) {
            console.error(error);
        }
    }
)

export const UpdateCart = createAsyncThunk(
    'products/updateCartQuantity',
    async (props) => {
        try {
            const response = await UpdateCartItemQuantity(props);
            return response;
        } catch (error) {
            console.error("Error : ", error);
        }
    }
)