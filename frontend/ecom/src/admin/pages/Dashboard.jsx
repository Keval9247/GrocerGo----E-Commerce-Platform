import React from "react";

const Dashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Total Products</h3>
            <p className="text-3xl font-bold text-blue-600">50</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Total Orders</h3>
            <p className="text-3xl font-bold text-green-600">30</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Pending Orders</h3>
            <p className="text-3xl font-bold text-orange-600">5</p>
        </div>
    </div>
);

export default Dashboard;
