import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const getDataLength = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/products/count`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const GetUSers = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const CreateProduct = async (formdata) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/products/create-product`, formdata);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/products`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const GetProductsByCategory = async (category) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/products/findProductByCategory`, { category: category });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const GetProductById = async (id) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const UpdateProduct = async (_id, formdata) => {
  try {
    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/products/update/${_id}`, formdata
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const DeleteProduct = async (_id) => {
  try {
    const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/products/delete`, { data: { _id } }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllRatingbyProductId = async (_id) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/get-rating/${_id}`);
    return response?.data;
  } catch (error) {
    console.error(error);
  }
};

export const AddRatingAndReview = async (props) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/products/rating-review/${props.userId}/${props.productId}`,
      { rating: props.rating, review: props.review }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const Add_To_Cart = async (props) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/products/cart/add-to-cart/${props._id}`, { quantity: props.quantity, userId: props.userId });
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};

export const GetCartItems = async (id) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/cart/getcart/${id}`);
    return response?.data;
  } catch (error) {
    console.error(error);
  }
}

export const UpdateCartItemQuantity = async (data) => {
  try {
    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/products/cart/update-quantity`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const DeleteCartItem = async (data) => {
  try {
    const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/products/cart/remove-from-cart`, { data: { userId: data.userId, productId: data.productId } });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const GetOrderHistory = async (userId) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/orders/readOne/${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}