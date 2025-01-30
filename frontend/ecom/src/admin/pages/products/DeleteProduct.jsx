import React from "react";
import { deleteProduct } from "../../../apis/products/Productapi";
import { toast } from "react-toastify";

const DeleteProductModal = ({ product, onClose }) => {

    const handleDeleteProduct = async () => {
        const response = await deleteProduct(product._id);
        if (response?.message === "Product deleted successfully") {
            onClose();
            toast.success(response?.message)
        } else {
            console.error("Failed to delete product:", response?.error);
            toast.error("Failed to delete product. Please try again later.");
        }
    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
            <div className="bg-white rounded-lg p-8 w-full max-w-sm shadow-2xl transform transition-transform scale-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                    Confirm Deletion
                </h2>
                <p className="text-gray-700 text-center mb-6 leading-relaxed">
                    Are you sure you want to delete the product
                    <span className="block font-bold text-red-600 mt-1">{product?.ProductName}</span>?
                    This action cannot be undone.
                </p>
                <div className="flex justify-between gap-4">
                    <button
                        onClick={onClose}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDeleteProduct}
                        className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>

    );
};

export default DeleteProductModal;
