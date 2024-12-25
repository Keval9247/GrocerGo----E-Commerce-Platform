// import React from 'react';
// import { AppBar, Toolbar, Typography, Button, Drawer, List, ListItem, ListItemText } from '@mui/material';
// import { useSelector } from 'react-redux';
// import { Link, useLocation } from 'react-router-dom';
// import ListSharpIcon from '@mui/icons-material/ListSharp';
// import Logout from '../../pages/Logout';
// import { ROLES } from '../../Roles/roles';

// function AdminlayoutHeader() {
//     // const authStatus = useSelector((state) => state.authReducer.isAuthenticated);
//     const role = useSelector((state) => state.authReducer.role);
//     const location = useLocation();

//     const navItems = [
//         {
//             name: 'Home',
//             slug: '/admin/',
//         },
//         {
//             name: 'Products',
//             slug: '/admin/products',
//         },
//         {
//             name: 'Solutions',
//             slug: '/admin/solution',
//         },
//     ];

//     const drawerItems = navItems.filter(item => item.name);

//     const [openDrawer, setOpenDrawer] = React.useState(false);

//     const toggleDrawer = () => {
//         setOpenDrawer(!openDrawer);
//     };

//     return (
//         <>
//             <AppBar position="fixed" style={{ backgroundColor: 'rgba(28, 36, 46, 0.9)' }}>

//                 <Toolbar>
//                     <Button onClick={toggleDrawer} sx={{ color: 'white' }}>
//                         <ListSharpIcon />
//                     </Button>
//                     <Typography variant="h6" style={{ flexGrow: 1, textAlign: 'center' }}>
//                         Authentication
//                     </Typography>

//                     {navItems.map((item) =>
//                         item.name && (
//                             <Button
//                                 key={item.name}
//                                 component={Link}
//                                 to={item.slug}
//                                 sx={{
//                                     textDecoration: 'none',
//                                     margin: '0 1rem',
//                                     color: item.slug === location.pathname ? '#ffffff' : 'black',
//                                     backgroundColor: 'rgb(146, 169, 187)',
//                                     '&:hover': {
//                                         color: '#ffffff',
//                                         backgroundColor: 'rgb(140, 169, 187)',
//                                     },
//                                 }}
//                             >
//                                 {item.name}
//                             </Button>
//                         )
//                     )}
//                     {/* {authStatus && ( */}
//                     <Logout />
//                     {/* // )} */}
//                 </Toolbar>
//             </AppBar>

//             <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer}>
//                 <List>
//                     {drawerItems.map((item) => (
//                         <ListItem
//                             button
//                             key={item.name}
//                             component={Link}
//                             to={item.slug}
//                             onClick={toggleDrawer}
//                             sx={{
//                                 padding: '1rem',
//                                 margin: '1rem 4rem',
//                                 width: '100%',
//                                 color: item.slug === location.pathname ? '#ffffff' : 'black',
//                                 textDecoration: 'none',
//                                 backgroundColor: item.slug === location.pathname ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
//                             }}
//                         >
//                             <ListItemText primary={item.name} />
//                         </ListItem>
//                     ))}
//                 </List>
//             </Drawer>
//         </>
//     );
// }

// export default AdminlayoutHeader;


import React, { useState } from "react";
import { FiBox, FiShoppingBag, FiHome, FiMenu, FiX, FiEdit2, FiTrash2, FiEye } from "react-icons/fi";

const AdminPanel = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("dashboard");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [products] = useState([
        {
            id: 1,
            name: "Premium Headphones",
            price: 299.99,
            stock: 50,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
            category: "Electronics"
        },
        {
            id: 2,
            name: "Smart Watch",
            price: 199.99,
            stock: 30,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
            category: "Electronics"
        }
    ]);

    const [orders] = useState([
        {
            id: "ORD001",
            customerName: "John Doe",
            date: "2024-01-15",
            status: "Pending",
            total: 299.99
        },
        {
            id: "ORD002",
            customerName: "Jane Smith",
            date: "2024-01-14",
            status: "Delivered",
            total: 199.99
        }
    ]);

    const Dashboard = () => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-700">Total Products</h3>
                <p className="text-3xl font-bold text-blue-600 mt-2">{products.length}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-700">Total Orders</h3>
                <p className="text-3xl font-bold text-green-600 mt-2">{orders.length}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-700">Pending Orders</h3>
                <p className="text-3xl font-bold text-orange-600 mt-2">
                    {orders.filter(order => order.status === "Pending").length}
                </p>
            </div>
        </div>
    );

    const ProductManagement = () => (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
                <input
                    type="text"
                    placeholder="Search products..."
                    className="p-2 border rounded-lg w-64"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Add Product
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-3 px-6 text-left">Product</th>
                            <th className="py-3 px-6 text-left">Price</th>
                            <th className="py-3 px-6 text-left">Stock</th>
                            <th className="py-3 px-6 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id} className="border-b">
                                <td className="py-4 px-6 flex items-center">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-10 h-10 rounded-full mr-3 object-cover"
                                    />
                                    {product.name}
                                </td>
                                <td className="py-4 px-6">${product.price}</td>
                                <td className="py-4 px-6">{product.stock}</td>
                                <td className="py-4 px-6 flex space-x-2">
                                    <button className="text-blue-600 hover:text-blue-800">
                                        <FiEdit2 size={20} />
                                    </button>
                                    <button
                                        onClick={() => setShowDeleteModal(true)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <FiTrash2 size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const OrderManagement = () => (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-4">
                    <input
                        type="date"
                        className="p-2 border rounded-lg"
                    />
                    <select className="p-2 border rounded-lg">
                        <option>All Status</option>
                        <option>Pending</option>
                        <option>Delivered</option>
                    </select>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-3 px-6 text-left">Order ID</th>
                            <th className="py-3 px-6 text-left">Customer</th>
                            <th className="py-3 px-6 text-left">Date</th>
                            <th className="py-3 px-6 text-left">Status</th>
                            <th className="py-3 px-6 text-left">Total</th>
                            <th className="py-3 px-6 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id} className="border-b">
                                <td className="py-4 px-6">{order.id}</td>
                                <td className="py-4 px-6">{order.customerName}</td>
                                <td className="py-4 px-6">{order.date}</td>
                                <td className="py-4 px-6">
                                    <span
                                        className={`px-2 py-1 rounded-full text-sm ${order.status === "Pending" ? "bg-orange-100 text-orange-800" : "bg-green-100 text-green-800"}`}
                                    >
                                        {order.status}
                                    </span>
                                </td>
                                <td className="py-4 px-6">${order.total}</td>
                                <td className="py-4 px-6">
                                    <button className="text-blue-600 hover:text-blue-800">
                                        <FiEye size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const DeleteConfirmationModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4">
                <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
                <p className="text-gray-600 mb-6">Are you sure you want to delete this product? This action cannot be undone.</p>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={() => setShowDeleteModal(false)}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => setShowDeleteModal(false)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
                        </div>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden"
                        >
                            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            <div className="flex">
                <aside
                    className={`${isMenuOpen ? "block" : "hidden"} md:block w-64 bg-white shadow-md h-screen fixed`}
                >
                    <div className="p-4">
                        <button
                            onClick={() => setActiveTab("dashboard")}
                            className={`flex items-center space-x-2 w-full p-2 rounded-lg ${activeTab === "dashboard" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`}
                        >
                            <FiHome size={20} />
                            <span>Dashboard</span>
                        </button>
                        <button
                            onClick={() => setActiveTab("products")}
                            className={`flex items-center space-x-2 w-full p-2 rounded-lg ${activeTab === "products" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`}
                        >
                            <FiBox size={20} />
                            <span>Products</span>
                        </button>
                        <button
                            onClick={() => setActiveTab("orders")}
                            className={`flex items-center space-x-2 w-full p-2 rounded-lg ${activeTab === "orders" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`}
                        >
                            <FiShoppingBag size={20} />
                            <span>Orders</span>
                        </button>
                    </div>
                </aside>

                <main className="flex-1 p-6 md:ml-64">
                    {activeTab === "dashboard" && <Dashboard />}
                    {activeTab === "products" && <ProductManagement />}
                    {activeTab === "orders" && <OrderManagement />}
                </main>
            </div>

            {showDeleteModal && <DeleteConfirmationModal />}
        </div>
    );
};

export default AdminPanel;