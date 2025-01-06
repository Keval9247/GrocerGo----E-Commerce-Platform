// import { Grid, Typography, Dialog } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import { ButtonC, Input } from '../components';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { ROLES } from '../Roles/roles';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { addproducts } from '../store/thunks/productThunk';
// import { WidthFull } from '@mui/icons-material';

// function Products() {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated);
//     const role = useSelector((state) => state.authReducer.role);
//     const [products, setProducts] = useState(null);
//     const [isavailable, setAvailable] = useState(false);
//     const [view, setView] = useState(false);
//     const [productname, setProductName] = useState('');
//     const [productprice, setProductPrice] = useState('');
//     const [productdescription, setProductDescription] = useState('');
//     const [err, setErr] = useState('');

//     const handleAddProduct = async () => {
//         try {
//             if (!products) {
//                 setErr("No file selected.");
//                 throw new Error("No file selected.");
//             }

//             const data = {
//                 category: products,
//                 name: productname,
//                 price: productprice,
//                 description: productdescription,
//             };

//             console.log("Data to send => ", data);

//             const productVar = await dispatch(addproducts(data));
//             console.log("productVar => ", productVar.meta.arg);

//             toast.success(productVar.meta.arg.message);
//             setView(true);
//             setAvailable(false);
//             setProducts(null);
//         } catch (error) {
//             console.error("Error adding product:", error);
//             if (err) {
//                 toast.error(err);
//             } else {
//                 toast.error('Failed to add product');
//             }
//         }
//     };

//     const handleFileUpload = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             console.log("File selected:", file);
//             setProducts(file);
//             setAvailable(true);
//         }
//     };

//     // useEffect(() => {
//     //     if (!isAuthenticated) {
//     //         navigate('*');
//     //     } else if (role !== ROLES.ADMIN) {
//     //         navigate('/');
//     //     }
//     //     return navigate('/admin/products');
//     // }, [isAuthenticated, role]);

//     const handleBack = () => {
//         navigate('/admin/');
//     };

//     return (
//         <div>
//             <h1>Welcome to Products page</h1>
//             <Typography variant='h6'>Add Your Products:</Typography>
//             <Grid
//                 container
//                 justifyContent='center'
//                 alignItems='center'
//                 display={'flex'}
//                 flexDirection={'column'}
//                 spacing={2}
//                 style={{ marginTop: '2rem' }}
//             >
//                 <Grid item display={'flex'} flexDirection={'column'} gap={'1rem'} alignItems={'center'}>
//                     <Grid item display={'flex'} flexDirection={'row'} gap={'1rem'} alignItems={'center'}>
//                         <Input type='text' label='Enter Product Name' variant='outlined' value={productname} onChange={(e) => { setProductName(e.target.value) }} />
//                         <Input type="number" label="Price" variant="outlined" value={productprice} onChange={(e) => setProductPrice(e.target.value)} inputProps={{ min: 0 }} style={{ width: '10rem' }} />
//                     </Grid>
//                     <Input type='text' label='Product Description' variant='outlined' rows={5} multiline value={productdescription} onChange={(e) => { setProductDescription(e.target.value) }} style={{ width: '25rem' }} />
//                     <Input type='file' variant='outlined' onChange={handleFileUpload} />

//                     <ButtonC onClick={handleAddProduct}>Upload</ButtonC>
//                 </Grid>

//                 <Grid item>
//                     {isavailable && (
//                         <ButtonC onClick={() => setView(true)}>View Product</ButtonC>
//                     )}
//                 </Grid>

//                 {!isavailable && products && (
//                     <Dialog open={view} onClose={() => setView(false)}>
//                         <img
//                             src={URL.createObjectURL(products)}
//                             alt='Product'
//                             style={{ width: '30rem', height: '25rem', margin: '2rem' }}
//                         />
//                     </Dialog>
//                 )}
//             </Grid>

//             <ButtonC
//                 onClick={handleBack}
//                 style={{
//                     width: '13rem',
//                     fontSize: '1.2rem',
//                     fontWeight: 'bold',
//                     letterSpacing: '0.05rem',
//                     textTransform: 'uppercase',
//                     boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
//                     borderRadius: '8px',
//                     marginTop: '2rem',
//                     marginBottom: '2rem',
//                     backgroundColor: '#a1aba3',
//                 }}
//             >
//                 Back to Home
//             </ButtonC>
//             <ToastContainer autoClose={2000} />
//         </div>
//     );
// }

// export default Products;


import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";
import { getAllProducts, GetProductsByCategory } from "../apis/products/Productapi";

const ProductsPage = () => {
    const categories = ["All", "Electronics", "Fashion", "Home & Kitchen", "Books", "Toys", "Furniture"];
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [priceRange, setPriceRange] = useState(10000); // Set a max price for range
    const [searchQuery, setSearchQuery] = useState("");
    const [showQuickView, setShowQuickView] = useState(null);

    // Fetch products by selected category or fetch all products
    const fetchProductsByCategory = async () => {
        try {
            let response;
            if (selectedCategory === "All") {
                response = await getAllProducts();  // Assuming getAllProducts fetches all products
            } else {
                response = await GetProductsByCategory(selectedCategory);
            }
            setProducts(response.products);  // Set the products from the API response
        } catch (error) {
            console.log("Error fetching products: ", error);
        }
    };

    useEffect(() => {
        fetchProductsByCategory();  // Fetch products when the component mounts or category changes
    }, [selectedCategory]);

    // Filter Products based on category, price, and search query
    const filteredProducts = products.filter((product) => {
        const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
        const matchesPrice = product.ProductPrice <= priceRange;
        const matchesSearch = product.ProductName.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesPrice && matchesSearch;
    });

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Filters Sidebar */}
                <aside className="w-full md:w-64 bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-lg font-semibold mb-4">Filters</h2>

                    <div className="mb-6">
                        <h3 className="text-sm font-medium mb-2">Categories</h3>
                        {categories.map((category) => (
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

                    {/* Price Range */}
                    <div className="mb-6">
                        <h3 className="text-sm font-medium mb-2">Price Range</h3>
                        <input
                            type="range"
                            min="0"
                            max="10000"
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
                    {/* Search Bar */}
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

                    {/* Product Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map((product, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300"
                                onMouseEnter={() => setShowQuickView(index)}
                                onMouseLeave={() => setShowQuickView(null)}
                            >
                                <div className="relative">
                                    <img
                                        src={`${import.meta.env.VITE_BACKEND_URL}${product.ProductImage}`}
                                        alt={product.ProductName}
                                        className="w-full h-48 object-cover"
                                    />
                                    {showQuickView === index && (
                                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                            <button className="bg-white text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-100">
                                                Quick View
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-medium mb-2">{product.ProductName}</h3>
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
                                        <span className="text-lg font-bold">${product.ProductPrice}</span>
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
    );
};

export default ProductsPage;
