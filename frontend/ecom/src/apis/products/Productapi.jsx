import { apiRequest } from "../Authapi";

export const getDataLength = async () => {
  return await apiRequest("GET", "/admin/products/count");
};

export const getUsers = async () => {
  return await apiRequest("GET", "/admin/users");
};

// -----------------------------> cart APis -----------------------------------------

export const createProduct = async (formData) => {
  return await apiRequest("POST", "/admin/products/create-product", formData);
};
export const getProductById = async (id) => {
  return await apiRequest("GET", `/products/id/${id}`);
};

export const updateProduct = async (_id, formData) => {
  return await apiRequest("PUT", `/admin/products/update/${_id}`, formData);
};

export const deleteProduct = async (_id) => {
  return await apiRequest("DELETE", "/admin/products/delete", { _id });
};

export const getAllProducts = async () => {
  return await apiRequest("GET", "/admin/products");
};

export const getProductsByCategory = async (category) => {
  return await apiRequest("POST", "/admin/products/findProductByCategory", { category });
};


// -------------------------> rating and review APis -----------------------------------------

export const getAllRatingByProductId = async (_id) => {
  return await apiRequest("GET", `/products/get-rating/${_id}`);
};

export const addRatingAndReview = async ({ userId, productId, rating, review }) => {
  return await apiRequest("POST", `/products/rating-review/${userId}/${productId}`, { rating, review });
};

// -----------------------------> cart APis -----------------------------------------

export const addToCart = async ({ _id, quantity, userId }) => {
  return await apiRequest("POST", `/products/cart/add-to-cart/${_id}`, { quantity, userId }, {}, { withCredentials: true });
};

export const getCartItems = async (id) => {
  return await apiRequest("GET", `/products/cart/getcart/${id}`);
};

export const updateCartItemQuantity = async (data) => {
  return await apiRequest("PUT", "/products/cart/update-quantity", data);
};

export const deleteCartItem = async ({ userId, productId }) => {
  return await apiRequest("DELETE", "/products/cart/remove-from-cart", { userId, productId });
};



// -------------------------> wishlist APis -----------------------------------------

export const addToWishlist = async (productId) => {
  return await apiRequest("POST", `/products/add-to-favorite/${productId}`);
};

export const removeFromWishlist = async (productId) => {
  return await apiRequest("DELETE", `/products/remove-from-favorite/${productId}`);
};

export const getWishlistItems = async () => {
  return await apiRequest("GET", `/products/get-favorite-products`);
};



// -------------------------> order APIs -----------------------------------------

export const getOrderHistory = async (userId) => {
  return await apiRequest("GET", `/user/orders/readOne/${userId}`);
};

export const getAllOrder = async () => {
  return await apiRequest("GET", `/user/orders/readAll`);
}
