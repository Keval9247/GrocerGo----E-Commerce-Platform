import React, { useState, useEffect } from "react";
import { FiSearch, FiEye, FiTruck, FiX } from "react-icons/fi";
import { getAllOrder } from "../../apis/products/Productapi";
import { useSelector } from "react-redux";

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getAllOrder();
                setOrders(response?.orders || []);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch orders:", err);
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const ordersPerPage = 10;
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

    const filteredOrders = orders.filter((order) => {
        const matchesSearch =
            order._id?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
            order.userId?.toLowerCase().includes(searchTerm?.toLowerCase());
        const matchesStatus = filterStatus === "all" || order.paymentStatus === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "completed":
                return "bg-green-100 text-green-800";
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "failed":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
    };

    return (
        <div className="container mx-auto px-4 pb-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Orders Management</h1>
                <div className="w-full md:w-auto">
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="block w-full md:w-48 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All Status</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
                    </select>
                </div>
            </div>

            <div className="mb-4 w-full md:w-[30%]">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search orders..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
            </div>

            {isLoading ? (
                <div className="text-center py-8 text-gray-500">Loading orders...</div>
            ) : currentOrders.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No orders found</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg overflow-hidden">
                        <thead className="bg-gray-100 hidden md:table-header-group">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Index</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">User Name</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Email Id</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Order Date</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Total Amount</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Payment Status</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {currentOrders.map((order, index) => (
                                <tr key={order._id} className="flex flex-col md:table-row hover:bg-gray-50">
                                    <td className="px-6 py-2 md:py-4 flex justify-between md:table-cell">
                                        <span className="md:hidden font-medium">Index:</span>{index + 1}.
                                    </td>
                                    <td className="px-6 py-2 md:py-4 flex justify-between md:table-cell">
                                        <span className="md:hidden font-medium">Name:</span>{order?.userId?.name}
                                    </td>
                                    <td className="px-6 py-2 md:py-4 flex justify-between md:table-cell">
                                        <span className="md:hidden font-medium">Email:</span>{order?.userId?.email}
                                    </td>
                                    <td className="px-6 py-2 md:py-4 flex justify-between md:table-cell">
                                        <span className="md:hidden font-medium">Date:</span>
                                        {new Date(order.orderDate).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-2 md:py-4 flex justify-between md:table-cell">
                                        <span className="md:hidden font-medium">Amount:</span>
                                        ${order.totalAmount.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-2 md:py-4 flex justify-between md:table-cell">
                                        <span className="md:hidden font-medium">Status:</span>
                                        <span
                                            className={`px-2 py-1 rounded-full text-sm ${getStatusColor(
                                                order.paymentStatus
                                            )}`}
                                        >
                                            {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-2 md:py-4 flex justify-between md:table-cell">
                                        <span className="md:hidden font-medium">Actions:</span>
                                        <button
                                            onClick={() => handleViewDetails(order)}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            <FiEye size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {filteredOrders.length > ordersPerPage && (
                <div className="mt-4 flex justify-center">
                    <nav className="flex flex-wrap gap-2 justify-center">
                        {Array.from({ length: Math.ceil(filteredOrders.length / ordersPerPage) }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(index + 1)}
                                className={`px-3 py-1 rounded ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
                                    }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </nav>
                </div>
            )}

            {selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg w-full max-w-md sm:max-w-lg md:max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-4 sm:p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg sm:text-xl font-semibold">Order Details</h2>
                                <button
                                    onClick={() => setSelectedOrder(null)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <FiX size={24} />
                                </button>
                            </div>
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600">Order ID</p>
                                        <p className="font-medium text-sm break-words">{selectedOrder._id}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">User ID</p>
                                        <p className="font-medium text-sm break-words">{selectedOrder?.userId?._id}</p>
                                    </div>
                                    {/* Rest of the grid items remain the same */}
                                </div>

                                <div className="mt-6">
                                    <h3 className="font-semibold mb-2">Order Items</h3>
                                    <div className="space-y-4">
                                        {selectedOrder.items.map((item) => (
                                            <div key={item._id} className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 border-b pb-4">
                                                <img
                                                    src={item.productImage ? `${import.meta.env.VITE_BACKEND_URL}${item.productImage}` : "/usernull.png"}
                                                    alt={item.name}
                                                    className="w-16 h-16 object-cover rounded"
                                                    onError={(e) => (e.target.src = "/placeholder-image.jpg")}
                                                />
                                                <div className="flex-1">
                                                    <p className="font-medium">{item.name}</p>
                                                    <p className="text-sm text-gray-600">
                                                        Qty: {item.quantity} × ${item.price}
                                                    </p>
                                                    <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                                                </div>
                                                <p className="font-medium">
                                                    ${(item.quantity * item.price).toFixed(2)}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <h3 className="font-semibold mb-2">Delivery Details</h3>
                                    <p className="text-sm text-gray-600 break-words">
                                        {selectedOrder.deliveryDetails.address1}{" "}
                                        {selectedOrder.deliveryDetails.address2}
                                        <br />
                                        {selectedOrder.deliveryDetails.city}, {selectedOrder.deliveryDetails.state}{" "}
                                        {selectedOrder.deliveryDetails.pin}
                                        <br />
                                        {selectedOrder.deliveryDetails.country}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrdersPage;