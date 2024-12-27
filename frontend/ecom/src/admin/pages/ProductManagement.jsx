import React from "react";

const ProductManagement = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold mb-4">Product Management</h2>
        <table className="min-w-full">
            <thead>
                <tr className="bg-gray-100">
                    <th className="py-3 px-6 text-left">Product</th>
                    <th className="py-3 px-6 text-left">Price</th>
                    <th className="py-3 px-6 text-left">Stock</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="py-4 px-6">Premium Headphones</td>
                    <td className="py-4 px-6">$299.99</td>
                    <td className="py-4 px-6">50</td>
                </tr>
                <tr>
                    <td className="py-4 px-6">Smart Watch</td>
                    <td className="py-4 px-6">$199.99</td>
                    <td className="py-4 px-6">30</td>
                </tr>
            </tbody>
        </table>
    </div>
);

export default ProductManagement;
