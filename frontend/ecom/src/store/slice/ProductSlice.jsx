import { createSlice } from '@reduxjs/toolkit';
import { addproducts, fetchProducts, createPayment, fetchProductsWithoutParams, getCart, removeCartItem, AddToCart, UpdateCart } from '../thunks/productThunk';

const initialState = {
    products: [],
    cart: [],
    cartItems: 0,
    allproducts: [],
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsWithoutParams.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductsWithoutParams.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.products = action.payload;
            })
            .addCase(fetchProductsWithoutParams.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchProducts.pending, (state) => {
                // state.products = [];
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.allproducts = action.payload.products;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addproducts.pending, (state, action) => {
                state.loading = true;
                state.error = null;
                // state.products = [];
            })
            .addCase(addproducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.meta.arg;
                state.error = null;
            })
            .addCase(addproducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createPayment.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPayment.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(createPayment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(AddToCart.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(AddToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.cart = action.payload;
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
                state.cart = action.payload;
                state.cartItems = action.payload.cart.items.reduce((total, item) => total + item.quantity, 0);
            })
            .addCase(UpdateCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getCart.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.cart = action.payload;
            })
            .addCase(getCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(removeCartItem.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeCartItem.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.cart = action.payload.cart
            })
            .addCase(removeCartItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            ;
    },
});

export const { setTotalItems } = productsSlice.actions;
export default productsSlice.reducer;
