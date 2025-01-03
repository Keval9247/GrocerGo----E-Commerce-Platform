import React from "react";
import { FiChevronLeft } from "react-icons/fi";

const ProductDetails = ({ userId, products, onBack }) => {
    const userProducts = products.filter((product) => product.userId === userId);
    console.log("🚀🚀 Your selected text is userProducts: ", userProducts);

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-6">
                <button onClick={onBack} className="text-gray-600 hover:text-gray-800 mr-2">
                    <FiChevronLeft className="text-xl" />
                </button>
                <h2 className="text-2xl font-bold">Products</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {userProducts?.map((product) => (
                    <div key={product.id} className="p-4 border rounded-lg hover:shadow-md">
                        <h3 className="text-lg font-semibold mb-2">{product.ProductName}</h3>
                        <p className="text-gray-600 mb-2">{product?.ProductDescription}</p>
                        <p className="text-blue-600 font-bold">${product.ProductPrice.toFixed(2)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductDetails;
