import React from "react";

const OrderManagement = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold mb-4">Order Management</h2>
        <table className="min-w-full">
            <thead>
                <tr className="bg-gray-100">
                    <th className="py-3 px-6 text-left">Order ID</th>
                    <th className="py-3 px-6 text-left">Customer</th>
                    <th className="py-3 px-6 text-left">Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="py-4 px-6">ORD001</td>
                    <td className="py-4 px-6">John Doe</td>
                    <td className="py-4 px-6">Pending</td>
                </tr>
                <tr>
                    <td className="py-4 px-6">ORD002</td>
                    <td className="py-4 px-6">Jane Smith</td>
                    <td className="py-4 px-6">Delivered</td>
                </tr>
            </tbody>
        </table>
    </div>
);

export default OrderManagement;
