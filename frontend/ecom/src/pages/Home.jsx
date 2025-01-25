import React, { useState, useEffect } from "react";
import { FiSearch, FiShoppingCart, FiUser, FiHome, FiPackage } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";
import { Link } from 'react-router-dom';

const products = [
    {
        id: 1,
        name: "Premium Wireless Headphones",
        price: 299.99,
        rating: 4.5,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    },
    {
        id: 2,
        name: "Ergonomic Office Chair",
        price: 199.99,
        rating: 4.0,
        category: "Furniture",
        image: "https://images.unsplash.com/photo-1592078615290-033ee584e267"
    },
    {
        id: 3,
        name: "Smart Watch Pro",
        price: 399.99,
        rating: 4.8,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
    },
    {
        id: 4,
        name: "Designer Backpack",
        price: 89.99,
        rating: 4.2,
        category: "Fashion",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62"
    }
];

const Dashboard = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [priceRange, setPriceRange] = useState(500);
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [showQuickView, setShowQuickView] = useState(null);


    useEffect(() => {

    })

    useEffect(() => {
        const filtered = products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
            const matchesPrice = product.price <= priceRange;
            return matchesSearch && matchesCategory && matchesPrice;
        });
        setFilteredProducts(filtered);
    }, [searchQuery, selectedCategory, priceRange]);

    const categories = ["All", "Electronics", "Furniture", "Fashion"];

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            {/* <header className="bg-white shadow-md">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-gray-800">E-Shop</div>
                        <nav className="hidden md:flex space-x-6">
                            <NavItem icon={<FiHome />} text="Home" />
                            <NavItem icon={<FiPackage />} text="Orders" />
                            <NavItem icon={<FiUser />} text="Profile" />
                            <NavItem icon={<FiShoppingCart />} text="Cart" />
                        </nav>
                    </div>
                </div>
            </header> */}

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="w-full md:w-64 bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-lg font-semibold mb-4">Filters</h2>

                        <div className="mb-6">
                            <h3 className="text-sm font-medium mb-2">Categories</h3>
                            {categories.map(category => (
                                <label key={category} className="flex items-center mb-2">
                                    <input
                                        type="radio"
                                        name="category"
                                        checked={selectedCategory === category}
                                        onChange={() => setSelectedCategory(category)}
                                        className="form-radio text-blue-600"
                                    />
                                    <span className="ml-2">{category}</span>
                                </label>
                            ))}
                        </div>

                        <div className="mb-6">
                            <h3 className="text-sm font-medium mb-2">Price Range</h3>
                            <input
                                type="range"
                                min="0"
                                max="500"
                                value={priceRange}
                                onChange={(e) => setPriceRange(e.target.value)}
                                className="w-full"
                            />
                            <div className="text-sm text-gray-600 mt-1">
                                Up to ${priceRange}
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1">
                        <div className="mb-6">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <FiSearch className="absolute left-3 top-3 text-gray-400" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map(product => (
                                <div
                                    key={product.id}
                                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300"
                                    onMouseEnter={() => setShowQuickView(product.id)}
                                    onMouseLeave={() => setShowQuickView(null)}
                                >
                                    <div className="relative">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-48 object-cover"
                                        />
                                        {showQuickView === product.id && (
                                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                                <button className="bg-white text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-100">
                                                    Quick View
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg font-medium mb-2">{product.name}</h3>
                                        <div className="flex items-center mb-2">
                                            {[...Array(5)].map((_, i) => (
                                                <AiFillStar
                                                    key={i}
                                                    className={`${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                                                />
                                            ))}
                                            <span className="ml-1 text-sm text-gray-600">({product.rating})</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-lg font-bold">${product.price}</span>
                                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

const NavItem = ({ icon, text }) => (
    <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors">
        {icon}
        <span>{text}</span>
    </button>
);

export default Dashboard;