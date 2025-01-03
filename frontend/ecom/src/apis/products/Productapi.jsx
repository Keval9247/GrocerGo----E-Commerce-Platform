import axios from "axios";
import { useEffect, useState } from "react";



// const api = axios.create({
//     baseURL: import.meta.env.VITE_BACKEND_URL,
//     timeout: 5000,
//     withCredentials: "include", // Include credentials in cross-origin requests
// });

// api.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

export const getDataLength = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/products/count`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const GetUSers = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const CreateProduct = async (formdata) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/products/create-product`, formdata);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getAllProducts = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/products`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const GetProductById = async (_id) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${_id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const UpdateProduct = async (_id, formdata) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/products/update/${_id}`, formdata);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const DeleteProduct = async (_id) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/products/delete`, { data: { _id } });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


//////
export const ListProducts = ({ ...props }) => {


    const fetchProducts = async (page) => {
        try {
            const token = localStorage.getItem('token')
            console.log("🚀 ~ fetchProducts ~ token:", token)
            console.log("Current Page: ", page);
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/list-products?page=${page.page}&limit=${page.productsPerPage}`);
            console.log("Product API response:", response);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    };
    return fetchProducts({ ...props });

};

export const ListProductsWithoutParams = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/list-products`);
        console.log("Product API response without params:", response);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const ReadOneProduct = async (_id) => {
    try {
        // const_id = '668e0be852c73adc6cd2073e';
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product/${_id}`);
        console.log("Product API response:", response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const AddProducts = async (credentials) => {
    console.log("🚀 ~ AddProducts ~ credentials:", 12, credentials)
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/addProduct`, credentials);
        console.log("Product API response:", response);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const CraetePayment = async (credentials) => {
    try {
        console.log("credentials payment api: ", credentials);
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/create-payment`, credentials);
        console.log("Payment API response:", response);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const AddToCart = async (productId) => {
    try {
        console.log("🚀 ~ AddToCart ~ productId:", productId)
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart/add`, productId);
        console.log("Cart API response:", response);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const GetCart = async () => {
    try {
        // console.log(1423);
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart`);
        console.log("Cart API response:", response);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


export const RemoveFromCart = async (productId) => {
    try {
        console.log("��� ~ RemoveFromCart ~ productId:", productId)
        const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/cart/remove`, { data: { productId } });
        console.log("Cart API response:", response);
        return response.data;
    } catch (error) {
        console.log("error : - ", error);
    }
}