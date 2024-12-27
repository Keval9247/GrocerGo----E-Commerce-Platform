// import React, { useEffect, useState } from "react";
// import {
//     Button,
//     Typography,
//     Container,
//     Box,
//     Grid,
//     Paper,
//     Snackbar,
//     Alert,
// } from "@mui/material";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import ExploreIcon from "@mui/icons-material/Explore";
// import ContactMailIcon from "@mui/icons-material/ContactMail";
// import InfoIcon from "@mui/icons-material/Info";
// import { ItemCenterStyle } from "../css/ItemsCenter";
// import { ButtonC, Input } from "../components";

// const MotionTypography = motion(Typography);
// const MotionBox = motion(Box);
// const MotionPaper = motion(Paper);

// const Home = () => {
//     const [visible, setVisible] = useState(true);

//     useEffect(() => {
//         const intervalId = setInterval(() => {
//             setVisible((prevVisible) => !prevVisible);
//         }, 250);
//         return () => clearInterval(intervalId);
//     }, []);

//     return (
//         <>
//             <Container
//                 sx={{
//                     ...ItemCenterStyle,
//                     minHeight: "100vh",
//                     py: 8,
//                     backgroundColor: "rgb(45,55,72)",
//                 }}
//             >
//                 {/* Header Section */}
//                 <Grid container spacing={4} justifyContent="center" alignItems="center">
//                     <Grid item xs={12} md={6}>
//                         <MotionTypography
//                             variant="h3"
//                             sx={{
//                                 gap: "2rem",
//                                 mb: 2,
//                                 color: "#ffd1d1",
//                                 fontWeight: "bold",
//                             }}
//                             initial={{ opacity: 0, y: -50 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 2 }}
//                         >
//                             You're Welcome!
//                             <br />
//                             <Typography variant="body1" sx={{ color: "#ffffff" }}>
//                                 You can use this app anytime you want.. Auth App is a powerful,
//                                 easy-to-use, and secure authentication solution for your digital
//                                 world.
//                             </Typography>
//                         </MotionTypography>
//                         <MotionTypography
//                             variant="h5"
//                             sx={{ mb: 4, color: "#e2e8f0" }}
//                             initial={{ opacity: 0, y: -30 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.8, delay: 0.2 }}
//                         >
//                             Discover powerful features and transform your workflow today.
//                         </MotionTypography>
//                         <MotionBox
//                             sx={{
//                                 display: "flex",
//                                 flexDirection: { xs: "column", sm: "row" },
//                                 gap: 2,
//                                 mb: 4,
//                             }}
//                             initial={{ opacity: 0, y: 30 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 1, delay: 2 }}
//                         >
//                             <ButtonC
//                                 variant="contained"
//                                 color="primary"
//                                 component={Link}
//                                 to="/user/products-list"
//                                 startIcon={<ExploreIcon />}
//                                 sx={{
//                                     py: 1.5,
//                                     px: 3,
//                                     borderRadius: "30px",
//                                     backgroundColor: "#ffd1d1",
//                                     color: "#2d3748",
//                                     "&:hover": {
//                                         color: "#2d3748",
//                                         backgroundColor: "#f6c1c1",
//                                         transform: "translateY(-3px)",
//                                         boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
//                                     },
//                                     transition: "all 0.3s ease",
//                                 }}
//                             >
//                                 Explore Products
//                             </ButtonC>
//                         </MotionBox>
//                     </Grid>

//                     {/* Highlight Section */}
//                     <Grid item xs={12} md={6}>
//                         <MotionPaper
//                             elevation={6}
//                             sx={{
//                                 borderRadius: "16px",
//                                 overflow: "hidden",
//                                 position: "relative",
//                                 boxShadow: "0px 0px  20px 10px rgba(189, 100, 100, 0.7)",
//                                 padding: "2rem",
//                                 backgroundColor: "#ffffff",
//                             }}
//                             initial={{ opacity: 0, scale: 0.8 }}
//                             animate={{ opacity: 1, scale: 1 }}
//                             transition={{ duration: 0.8, delay: 0.6 }}
//                         >
//                             <Box
//                                 sx={{
//                                     position: "absolute",
//                                     bottom: 0,
//                                     left: 0,
//                                     right: 0,
//                                     backgroundColor: "rgba(0, 0, 0, 0.7)",
//                                     color: "white",
//                                     padding: 2,
//                                     textAlign: "center",
//                                 }}
//                             >
//                                 <Typography
//                                     variant="h6"
//                                     color={"#ffd1d1"}
//                                     sx={{ visibility: visible ? "visible" : "hidden" }}
//                                 >
//                                     Don't delay — sales today!
//                                 </Typography>
//                             </Box>
//                         </MotionPaper>
//                     </Grid>
//                 </Grid>

//                 {/* Product Listings Section */}
//                 <Box sx={{ mt: 6 }}>
//                     <Typography
//                         variant="h4"
//                         sx={{
//                             textAlign: "center",
//                             color: "#e2e8f0",
//                             fontWeight: "bold",
//                             mb: 4,
//                         }}
//                     >
//                         Featured Products
//                     </Typography>
//                     <Grid container spacing={4}>
//                         {[1, 2, 3, 4].map((item) => (
//                             <Grid item xs={12} sm={6} md={3} key={item}>
//                                 <MotionPaper
//                                     elevation={4}
//                                     sx={{
//                                         p: 2,
//                                         textAlign: "center",
//                                         borderRadius: "16px",
//                                         backgroundColor: "#2d3748",
//                                         color: "#e2e8f0",
//                                     }}
//                                     whileHover={{
//                                         scale: 1.05,
//                                         transition: { duration: 0.3 },
//                                     }}
//                                 >
//                                     <Typography
//                                         variant="h6"
//                                         sx={{
//                                             mb: 1,
//                                             fontWeight: "bold",
//                                             color: "#ffd1d1",
//                                         }}
//                                     >
//                                         Product {item}
//                                     </Typography>
//                                     <Typography
//                                         variant="body2"
//                                         sx={{
//                                             mb: 2,
//                                             color: "#e2e8f0",
//                                         }}
//                                     >
//                                         This is an amazing product description that will get you
//                                         excited!
//                                     </Typography>
//                                     <Button
//                                         variant="contained"
//                                         sx={{
//                                             backgroundColor: "#ffd1d1",
//                                             color: "#2d3748",
//                                             "&:hover": {
//                                                 backgroundColor: "#f6c1c1",
//                                             },
//                                         }}
//                                     >
//                                         Buy Now
//                                     </Button>
//                                 </MotionPaper>
//                             </Grid>
//                         ))}
//                     </Grid>
//                 </Box>
//             </Container>
//         </>
//     );
// };

// export default Home;


import React, { useState, useEffect } from "react";
import { FiSearch, FiShoppingCart, FiUser, FiHome, FiPackage } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";

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
            <header className="bg-white shadow-md">
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
            </header>

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