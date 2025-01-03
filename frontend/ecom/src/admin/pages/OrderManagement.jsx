import React, { useState, useEffect } from "react";
import { FiSearch, FiEye, FiTruck, FiPackage, FiCheck, FiX, FiAlertCircle } from "react-icons/fi";

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showTrackingModal, setShowTrackingModal] = useState(false);

    const dummyOrders = [
        {
            id: "ORD001",
            customerName: "John Smith",
            date: "2024-01-15",
            total: 599.98,
            status: "processing",
            items: [
                {
                    id: 1,
                    name: "Premium Wireless Headphones",
                    quantity: 1,
                    price: 299.99,
                    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
                },
                {
                    id: 2,
                    name: "Smart Watch Series X",
                    quantity: 1,
                    price: 299.99,
                    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
                }
            ],
            tracking: {
                number: "TRK123456789",
                status: "in_transit",
                updates: [
                    { date: "2024-01-15", status: "Order Placed", completed: true },
                    { date: "2024-01-16", status: "Processing", completed: true },
                    { date: "2024-01-17", status: "In Transit", completed: false },
                    { date: "2024-01-18", status: "Delivered", completed: false }
                ]
            }
        },
        {
            id: "ORD002",
            customerName: "Alice Johnson",
            date: "2024-01-14",
            total: 199.99,
            status: "delivered",
            items: [
                {
                    id: 3,
                    name: "Ergonomic Office Chair",
                    quantity: 1,
                    price: 199.99,
                    image: "https://images.unsplash.com/photo-1505797149-35ebcb05a6ae"
                }
            ],
            tracking: {
                number: "TRK987654321",
                status: "delivered",
                updates: [
                    { date: "2024-01-14", status: "Order Placed", completed: true },
                    { date: "2024-01-15", status: "Processing", completed: true },
                    { date: "2024-01-16", status: "In Transit", completed: true },
                    { date: "2024-01-17", status: "Delivered", completed: true }
                ]
            }
        }
    ];

    useEffect(() => {
        setOrders(dummyOrders);
    }, []);

    const ordersPerPage = 10;
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

    const filteredOrders = orders.filter(order => {
        const matchesSearch = (
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const matchesStatus = filterStatus === "all" || order.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "processing":
                return "bg-yellow-100 text-yellow-800";
            case "shipped":
                return "bg-blue-100 text-blue-800";
            case "delivered":
                return "bg-green-100 text-green-800";
            case "cancelled":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
    };

    const handleTrackOrder = (order) => {
        setSelectedOrder(order);
        setShowTrackingModal(true);
    };

    return (
        <div className="container mx-auto px-4 pb-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Orders Management</h1>
                <div className="relative">
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="block w-48 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 appearance-none shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                    >
                        <option value="all" className="bg-gray-200 text-gray-700">All Status</option>
                        <option value="processing" className="bg-yellow-50 text-yellow-600">Processing</option>
                        <option value="shipped" className="bg-blue-50 text-blue-600">Shipped</option>
                        <option value="delivered" className="bg-green-50 text-green-700">Delivered</option>
                        <option value="cancelled" className="bg-red-50 text-red-500">Cancelled</option>
                    </select>
                    <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                        <svg
                            className="w-5 h-5 text-gray-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </span>
                </div>
            </div>

            <div className="mb-4 w-[30%]">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search orders by ID or customer name..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <FiSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
            </div>

            {currentOrders.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No orders found</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg overflow-hidden">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Order ID</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Customer</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Total</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {currentOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">{order.id}</td>
                                    <td className="px-6 py-4">{order.customerName}</td>
                                    <td className="px-6 py-4">{order.date}</td>
                                    <td className="px-6 py-4">${order.total.toFixed(2)}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex space-x-3">
                                            <button
                                                onClick={() => handleViewDetails(order)}
                                                className="text-blue-500 hover:text-blue-700"
                                            >
                                                <FiEye size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleTrackOrder(order)}
                                                className="text-green-500 hover:text-green-700"
                                            >
                                                <FiTruck size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {filteredOrders.length > ordersPerPage && (
                <div className="mt-4 flex justify-center">
                    <nav className="flex space-x-2">
                        {Array.from({ length: Math.ceil(filteredOrders.length / ordersPerPage) }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(index + 1)}
                                className={`px-3 py-1 rounded ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </nav>
                </div>
            )}

            {/* Order Details Modal */}
            {selectedOrder && !showTrackingModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">Order Details</h2>
                                <button
                                    onClick={() => setSelectedOrder(null)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <FiX size={24} />
                                </button>
                            </div>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600">Order ID</p>
                                        <p className="font-medium">{selectedOrder.id}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Customer</p>
                                        <p className="font-medium">{selectedOrder.customerName}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Date</p>
                                        <p className="font-medium">{selectedOrder.date}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Status</p>
                                        <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(selectedOrder.status)}`}>
                                            {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <h3 className="font-semibold mb-2">Order Items</h3>
                                    <div className="space-y-4">
                                        {selectedOrder.items.map((item) => (
                                            <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-16 h-16 object-cover rounded"
                                                />
                                                <div className="flex-1">
                                                    <p className="font-medium">{item.name}</p>
                                                    <p className="text-sm text-gray-600">
                                                        Quantity: {item.quantity} × ${item.price}
                                                    </p>
                                                </div>
                                                <p className="font-medium">${(item.quantity * item.price).toFixed(2)}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 text-right">
                                        <p className="text-lg font-semibold">Total: ${selectedOrder.total.toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Tracking Modal */}
            {showTrackingModal && selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">Order Tracking</h2>
                                <button
                                    onClick={() => setShowTrackingModal(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <FiX size={24} />
                                </button>
                            </div>
                            <div className="mb-4">
                                <p className="text-sm text-gray-600">Tracking Number</p>
                                <p className="font-medium">{selectedOrder.tracking.number}</p>
                            </div>
                            <div className="space-y-8">
                                {selectedOrder.tracking.updates.map((update, index) => (
                                    <div key={index} className="flex items-start">
                                        <div className="relative">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${update.completed ? "bg-green-500" : "bg-gray-200"}`}>
                                                {update.completed ? (
                                                    <FiCheck className="text-white" />
                                                ) : (
                                                    <FiPackage className="text-gray-500" />
                                                )}
                                            </div>
                                            {index !== selectedOrder.tracking.updates.length - 1 && (
                                                <div className={`absolute top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-16 ${update.completed ? "bg-green-500" : "bg-gray-200"}`} />
                                            )}
                                        </div>
                                        <div className="ml-4">
                                            <p className="font-medium">{update.status}</p>
                                            <p className="text-sm text-gray-600">{update.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrdersPage;