import React, { useState } from "react";
import { toast } from "react-toastify";
import { CreateProduct } from "../../../apis/products/Productapi";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const navigate = useNavigate();
    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        image: null,
    });
    const [image, setImage] = useState(null);
    console.log("🚀🚀 Your selected text is image: ", newProduct.image);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setNewProduct((prev) => ({
            ...prev,
            image: URL.createObjectURL(file),
        }));
        setImage(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", newProduct.name);
        formData.append("description", newProduct.description);
        formData.append("price", newProduct.price);
        formData.append("stock", newProduct.stock);
        formData.append("category", newProduct.category);
        formData.append("productImg", image);

        const response = await CreateProduct(formData);
        if (response.error) {
            toast.error(response.error);
        } else {
            toast.success("Product added successfully");
            navigate(-1);
        }

        // Reset form
        setNewProduct({
            name: "",
            description: "",
            price: "",
            stock: "",
            category: "",
            image: null,
        });
        setImage(null);
    };

    return (
        <div className="bg-white p-6 m-5 rounded-lg shadow-md mt-10 ">
            <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={newProduct.name}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md focus:ring-blue-500 focus:outline-none focus:ring-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <input
                        type="number"
                        name="price"
                        required
                        value={newProduct.price}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md focus:ring-blue-500 focus:outline-none focus:ring-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                    <input
                        type="number"
                        name="stock"
                        required
                        value={newProduct.stock}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md focus:ring-blue-500 focus:outline-none focus:ring-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                        name="category"
                        required
                        value={newProduct.category}
                        onChange={handleInputChange}
                        className="block w-full p-2 border rounded-md bg-white appearance-none shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="" disabled className="text-gray-400">
                            Select Category
                        </option>
                        <option value="Electronics" className="bg-white">
                            Electronics
                        </option>
                        <option value="Furniture" className="bg-white">
                            Furniture
                        </option>
                        <option value="Clothing" className="bg-white">
                            Clothing
                        </option>
                    </select>
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        name="description"
                        required
                        value={newProduct.description}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md focus:ring-blue-500 focus:outline-none focus:ring-2"
                        rows="3"
                    ></textarea>
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full p-2 border rounded-md focus:ring-blue-500 focus:outline-none focus:ring-2"
                    />
                </div>
                <div className="md:col-span-2">
                    {newProduct.image && (
                        <div className="relative w-48 h-48">
                            <img
                                src={newProduct.image}
                                alt="Product Image"
                                className="w-full h-full object-cover rounded-md shadow-md"
                            />
                            <button
                                onClick={() => setNewProduct((prev) => ({ ...prev, image: null }))}
                                className="absolute top-1 right-1 bg-white text-red-600 hover:text-red-800 font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-md"
                                title="Remove Image"
                            >
                                &times;
                            </button>
                        </div>
                    )}

                </div>
                <div className="md:col-span-2 flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => {
                            navigate(-1);
                        }}
                        className="px-4 py-2 border rounded-md hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        disabled={!newProduct.name || !newProduct.price || !newProduct.stock || !newProduct.category || !newProduct.description || !image}
                    >
                        Add Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
