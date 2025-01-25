import { createSlice } from '@reduxjs/toolkit';
import { AddToCart, UpdateCart } from '../thunks/productThunk';

const initialState = {
    cart: [],
    cartItems: 0,
    loading: false,
    error: null,
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setTotalItems: (state, action) => {
            state.cartItems = action.payload;
        },
        clearCart: (state) => {
            state.cart = [];
            state.cartItems = 0;
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(AddToCart.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(AddToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.cart = action.payload.cart;
                state.cartItems = action.payload.cart.items.reduce((total, item) => total + item.quantity, 0);
            })
            .addCase(AddToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(UpdateCart.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(UpdateCart.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.cart = action.payload.cart;
                state.cartItems = action.payload.cart.items.reduce((total, item) => total + item.quantity, 0);
            })
            .addCase(UpdateCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
});

export const { setTotalItems, clearCart } = productsSlice.actions;
export default productsSlice.reducer;
