import { createSlice } from '@reduxjs/toolkit';
import { AddToCart, DeleteCart, UpdateCart } from '../thunks/productThunk';

const initialState = {
    cart: [],
    cartItems: 0,
    loading: false,
    error: null,
    favourites: [],
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addToFavourites: (state, action) => {
            const productId = action.payload;
            if (!state.favourites.includes(productId)) {
                state.favourites.push(productId);
            }
        },
        removeToFavourites: (state, action) => {
            state.favourites = state.favourites.filter(id => id !== action.payload);
        },
        clearFavourites: (state, action) => {
            state.favourites = [];
        },
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
                if (action.payload?.cart) {
                    state.cart = action.payload.cart.items;
                    state.cartItems = action.payload.cart.items.reduce((total, item) => total + item.quantity, 0);
                }
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
                state.cart = action.payload.cart.items;
                state.cartItems = action.payload.cart.items.reduce((total, item) => total + item.quantity, 0);
            })
            .addCase(UpdateCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(DeleteCart.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(DeleteCart.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.cart = action.payload.cart.items;
                state.cartItems = action.payload.cart.items.reduce((total, item) => total + item.quantity, 0);
            })
            .addCase(DeleteCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
});

export const { setTotalItems, addToFavourites, removeToFavourites, clearFavourites, clearCart } = productsSlice.actions;
export default productsSlice.reducer;
