import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  GetProductById,
  UpdateProduct,
} from "../../../apis/products/Productapi";
import { toast } from "react-toastify";
import Loading from "../../../utils/Loading";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  if (loading) {
    <Loading />;
  }

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true); // Start loading
      try {
        const response = await GetProductById(id);
        setProduct({
          name: response?.product?.ProductName || "ss",
          description: response?.product.ProductDescription,
          price: response?.product.ProductPrice,
          stock: response?.product.stock,
          category: response?.product.category,
          image: response?.product.ProductImage
        });

        // setImagePreview(response?.product.ProductImage);
      } catch (error) {
        toast.error("Failed to load product details");
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchProduct();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true); // Start updating
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("stock", product.stock);
    formData.append("category", product.category);
    if (newImage) formData.append("productImg", newImage);

    try {
      await UpdateProduct(id, formData);
      toast.success("Product updated successfully");
      navigate(-1);
    } catch (error) {
      toast.error("Failed to update product");
    } finally {
      setUpdating(false); // Stop updating
    }
  };

  return (
    <div className="bg-white p-6 m-5 rounded-lg shadow-md mt-10">
      <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={product?.name}
              onChange={(e) => handleInputChange(e)}
              required
              className="w-full p-2 border rounded-md focus:ring-blue-500 focus:outline-none focus:ring-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={product?.price}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded-md focus:ring-blue-500 focus:outline-none focus:ring-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stock Quantity
            </label>
            <input
              type="number"
              name="stock"
              value={product?.stock}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded-md focus:ring-blue-500 focus:outline-none focus:ring-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category"
              value={product?.category}
              onChange={handleInputChange}
              required
              className="block w-full p-2 border rounded-md bg-white appearance-none shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled className="text-gray-400">
                Select Category
              </option>
              <option value="Electronics">Electronics</option>
              <option value="Furniture">Furniture</option>
              <option value="Books">Books</option>
              <option value="Fashion">Fashion</option>
              <option value="Home & Kitchen">Home & Kitchen</option>
              <option value="Toys">Toys</option>
              <option value="Sports">Sports</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={product?.description}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded-md focus:ring-blue-500 focus:outline-none focus:ring-2"
              rows="3"
            ></textarea>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border rounded-md focus:ring-blue-500 focus:outline-none focus:ring-2"
            />
            {imagePreview ? (
              <div className="mt-2 relative w-48 h-48">
                <img
                  src={imagePreview}
                  alt="Product Preview"
                  className="w-full h-full object-cover rounded-md shadow-md"
                />
              </div>
            ) : (
              <div className="mt-2 relative w-48 h-48">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}${product?.image}`}
                  alt="Product Preview"
                  className="w-full h-full object-cover rounded-md shadow-md"
                />
              </div>
            )}
          </div>
          <div className="md:col-span-2 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 border rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ${updating ? "opacity-50 cursor-not-allowed" : ""
                }`}
              disabled={
                !product.name ||
                !product.price ||
                // !product.stock ||
                !product.category ||
                !product.description ||
                updating
              }
            >
              {updating ? "Updating..." : "Update Product"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditProduct;
