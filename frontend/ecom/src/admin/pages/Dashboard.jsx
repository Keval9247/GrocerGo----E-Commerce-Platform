import React, { useEffect, useState } from "react";
import { FiUsers, FiDollarSign, FiShoppingBag, FiArrowUp, FiArrowDown, FiAlertCircle, FiExternalLink } from "react-icons/fi";
import { MdProductionQuantityLimits } from "react-icons/md";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { getDataLength } from "../../apis/products/Productapi";
import { redirect, useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [dateRange] = useState("Last 7 Days");
    const [count, setCount] = useState(0);
    const navigate = useNavigate();

    const salesData = [
        { name: "Mon", sales: 4000, orders: 24 },
        { name: "Tue", sales: 3000, orders: 18 },
        { name: "Wed", sales: 5000, orders: 30 },
        { name: "Thu", sales: 2780, orders: 16 },
        { name: "Fri", sales: 6890, orders: 42 },
        { name: "Sat", sales: 8390, orders: 52 },
        { name: "Sun", sales: 3490, orders: 22 }
    ];

    const categoryData = [
        { name: "Electronics", value: count?.CategoryCount?.electronics || 0 },
        { name: "Clothing", value: count?.CategoryCount?.clothing },
        { name: "Books", value: count?.CategoryCount?.books },
        { name: "Furniture", value: count?.CategoryCount?.furniture }
    ];

    useEffect(() => {
        try {
            const fetchData = async () => {
                const response = await getDataLength();
                setCount(response);
            }
            fetchData();
        } catch (error) {
            console.error(error);
        }
    }, []);

    const categoryStockTotals = (count?.ProductData || []).reduce((acc, item) => {
        const { category, stock } = item;
        if (acc[category]) {
            acc[category] += stock;
        } else {
            acc[category] = stock;
        }
        return acc;
    }, {});

    const categoryDatas = Object?.entries(categoryStockTotals)?.map(([name, value]) => ({
        name,
        value,
    }));

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#C45850", "#7F525C", "#3F51B5", "#4CAF50", "#FF9800",];

    const statsCards = [
        {
            title: "Total Revenue",
            value: "$33,549" || "0",
            change: "+12.5%",
            icon: FiDollarSign,
            positive: true,
            redirectTo: '/admin'
        },
        {
            title: "Total Orders",
            value: "204" || "No orders found.",
            change: "+8.2%",
            icon: FiShoppingBag,
            positive: true,
            redirectTo: '/admin/orders'

        },
        {
            title: "Active Users",
            value: `${count?.UserCount}` || "No user found.",
            change: "-2.4%",
            icon: FiUsers,
            positive: false,
            redirectTo: '/admin/users'
        },
        {
            title: "Total Products",
            value: `${count?.ProductCount}` || "No product found.",
            change: "+4.7%",
            icon: MdProductionQuantityLimits,
            positive: true,
            redirectTo: '/admin/products'
        }
    ];

    const recentOrders = [
        { id: "#ORD-1234", customer: "John Doe", product: "Premium Headphones", amount: "$299", status: "Delivered" },
        { id: "#ORD-1235", customer: "Jane Smith", product: "Wireless Mouse", amount: "$59", status: "Processing" },
        { id: "#ORD-1236", customer: "Mike Johnson", product: "Gaming Keyboard", amount: "$129", status: "Pending" },
    ];


    const getStatusColor = (status) => {
        switch (status) {
            case "Delivered": return "text-green-600 bg-green-100";
            case "Processing": return "text-blue-600 bg-blue-100";
            case "Pending": return "text-yellow-600 bg-yellow-100";
            default: return "text-gray-600 bg-gray-100";
        }
    };

    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">E-commerce Dashboard</h1>
                <select className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>{dateRange}</option>
                    <option>Last 30 Days</option>
                    <option>Last 90 Days</option>
                    <option>This Year</option>
                </select>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statsCards.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-blue-100 rounded-full">
                                <stat.icon className="text-blue-600 text-xl" />
                            </div>
                            <span className={`text-sm ${stat.positive ? "text-green-600" : "text-red-600"} flex items-center`}>
                                {stat.positive ? <FiArrowUp className="mr-1" /> : <FiArrowDown className="mr-1" />}
                                {stat.change}
                            </span>
                        </div>
                        <h3 className="text-gray-600 text-sm font-medium flex  items-center gap-3">{stat.title} <button onClick={() => navigate(`${stat?.redirectTo}`)}><FiExternalLink /></button></h3>
                        <p className="text-2xl font-bold mt-2">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Sales Chart */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-6">Revenue Overview</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={salesData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Category Distribution */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-6">Sales by Category</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={categoryDatas}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {categoryDatas?.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Orders */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-6">Recent Orders</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-2">Order ID</th>
                                    <th className="text-left py-2">Customer</th>
                                    <th className="text-left py-2">Amount</th>
                                    <th className="text-left py-2">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="border-b">
                                        <td className="py-2">{order.id}</td>
                                        <td className="py-2">{order.customer}</td>
                                        <td className="py-2">{order.amount}</td>
                                        <td className="py-2">
                                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Low Stock Alert */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-6">Inventory Alert</h2>
                    <div className="space-y-4">
                        {count?.ProductData && count.ProductData.length > 0 ? (
                            count.ProductData.filter((product) => product.stock < 5).map((product, index) => (
                                <div key={index} className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                                    <div className="flex items-center">
                                        <FiAlertCircle className="text-red-500 mr-3" />
                                        <div>
                                            <h3 className="font-medium">{product.category}</h3>
                                            <p className="text-xs text-gray-600">(Product Name : {product?.product})</p>
                                            <p className="text-sm text-red-600">Low stock alert: {product.stock} units left</p>
                                        </div>
                                    </div>
                                    <button className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200" onClick={() => navigate('/admin/products')}>
                                        Restock
                                    </button>
                                </div>
                            ))
                        ) : (<p className="text-gray-600">No products with low stock found.</p>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;