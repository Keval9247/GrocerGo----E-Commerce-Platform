import React, { useEffect } from "react";
import { FiX } from "react-icons/fi";

const ViewProduct = ({ product, onClose }) => {
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };
        window.addEventListener("keydown", handleEscape);
        return () => {
            window.removeEventListener("keydown", handleEscape);
        };
    }, [onClose]);

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg shadow-lg w-[90%] md:w-[60%] lg:w-[40%] p-6 relative animate-slide-in"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-800"
                    onClick={onClose}
                >
                    <FiX size={24} />
                </button>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{product.ProductName}</h2>
                <div className="mb-6">
                    <img
                        src={`${import.meta.env.VITE_BACKEND_URL}${product.ProductImage}`}
                        alt={product.ProductName}
                        className="w-full h-64 object-cover rounded-lg shadow-md hover:scale-105 transition duration-300 ease-in-out"
                    />
                </div>
                <div className="space-y-4 text-gray-700">
                    <p>
                        <strong className="text-gray-900">Price:</strong>{" "}
                        <span className="text-green-600 font-medium">₹{product.ProductPrice}</span>
                    </p>
                    <p>
                        <strong className="text-gray-900">Stock:</strong>{" "}
                        {product.stock ? (
                            <span className="text-green-600 font-medium">{product.stock} pieces available</span>
                        ) : (
                            <span className="text-red-600 font-medium">Out of Stock</span>
                        )}
                    </p>
                    <p>
                        <strong className="text-gray-900">Category:</strong>{" "}
                        <span>{product.category}</span>
                    </p>
                    <p>
                        <strong className="text-gray-900">Description:</strong>{" "}
                        <span>{product.ProductDescription || "No description available."}</span>
                    </p>
                    <p>
                        <strong className="text-gray-900">Created At:</strong>{" "}
                        <span>{formatDate(product.created_at)}</span>
                    </p>
                    {/* <p>
                        <strong className="text-gray-900">Last Updated:</strong>{" "}
                        <span>{formatDate(product.updated_at)}</span>
                    </p> */}
                </div>
            </div>
        </div>
    );
};

export default ViewProduct;
