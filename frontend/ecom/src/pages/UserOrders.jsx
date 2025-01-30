import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderHistory } from "../apis/products/Productapi";
import Loading from "../utils/Loading";

const OrdersPage = () => {
    const { userId } = useParams();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch orders for the user
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getOrderHistory(userId);
                setOrders(response.order);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch orders. Please try again later.");
                setLoading(false);
            }
        };

        fetchOrders();
    }, [userId]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div className="text-center py-8 text-red-600">{error}</div>;
    }

    if (!orders || orders.length === 0) {
        return <div className="text-center py-8">No orders found.</div>;
    }
    const handleOrderStatus = (status) => {
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
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                    Your Orders
                </h1>

                {orders.map((order) => (
                    <div
                        key={order._id}
                        className="bg-white rounded-lg shadow-md mb-8 overflow-hidden"
                    >
                        {/* Order Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
                            <h2 className="text-xl font-semibold text-white">
                                Order ID: #{order._id}
                            </h2>
                            <p className="text-sm text-blue-100">
                                Date: {new Date(order.orderDate).toLocaleDateString()}
                            </p>
                        </div>

                        {/* Order Details */}
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Order Summary */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                        Order Summary
                                    </h3>
                                    <div className="space-y-2">
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium">Status:</span>{" "}
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${handleOrderStatus(order.paymentStatus)}`}>
                                                {order.paymentStatus}
                                            </span>
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium">Total Amount : </span> <span className="text-green-600 font-bold text-xl">${order.totalAmount.toFixed(2)}</span>
                                        </p>
                                    </div>
                                </div>

                                {/* Delivery Details */}
                                {order.deliveryDetails && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                            Delivery Details
                                        </h3>
                                        <div className="space-y-2">
                                            <p className="text-sm text-gray-600">
                                                <span className="font-medium">Address:</span>{" "}
                                                {order.deliveryDetails.address1 || "Not provided"}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                <span className="font-medium">City:</span>{" "}
                                                {order.deliveryDetails.city || "Not provided"}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                <span className="font-medium">State:</span>{" "}
                                                {order.deliveryDetails.state || "Not provided"}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                <span className="font-medium">PIN:</span>{" "}
                                                {order.deliveryDetails.pin || "Not provided"}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Product Details */}
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                    Products
                                </h3>
                                <div className="space-y-4">
                                    {order.items.map((item) => (
                                        <div
                                            key={item._id}
                                            className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                        >
                                            <img
                                                src={`${import.meta.env.VITE_BACKEND_URL}${item.productImage}`}
                                                alt={item.name}
                                                className="w-16 h-16 object-cover rounded-lg"
                                            />
                                            <div className="ml-4 flex-1">
                                                <h4 className="text-sm font-medium text-gray-800">
                                                    {item.name}
                                                </h4>
                                                <p className="text-xs text-gray-600">
                                                    {item.description}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    <span className="font-medium">Quantity:</span>{" "}
                                                    {item.quantity}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    <span className="font-medium">Price:</span> $
                                                    {item.price.toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrdersPage;