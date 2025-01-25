import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";
import {
  getAllProducts,
  GetProductsByCategory,
} from "../apis/products/Productapi";
import { useNavigate } from "react-router-dom";
import Loading from "../utils/Loading";

const ProductsPage = () => {
  const categories = [
    "All",
    "Electronics",
    "Furniture",
    "Books",
    "Fashion",
    "Home & Kitchen",
    "Toys",
    "Sports",
  ];
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState(10000); // Set a max price for range
  const [searchQuery, setSearchQuery] = useState("");
  const [showQuickView, setShowQuickView] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch products by selected category or fetch all products
  const fetchProductsByCategory = async () => {
    try {
      let response;
      if (selectedCategory === "All") {
        response = await getAllProducts(); // Assuming getAllProducts fetches all products
      } else {
        response = await GetProductsByCategory(selectedCategory);
      }
      setProducts(response.products); // Set the products from the API response
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

  const handleAddtoCart = () => {
    if (loading) {
      alert("Product added to cart successfully!");
      setShowQuickView(null); // Close quick view
    }
  };
  if (loading) {
    return <Loading />;
  }

  useEffect(() => {
    setLoading(true); // Show loading spinner before fetching products
    fetchProductsByCategory(); // Fetch products when the component mounts or category changes
    setLoading(false); // Hide loading spinner after fetching products
  }, [selectedCategory]);

  // Filter Products based on category, price, and search query
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesPrice = product.ProductPrice <= priceRange;
    const matchesSearch = product.ProductName.toLowerCase().includes(
      searchQuery.toLowerCase()
    );
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
              <label
                key={category}
                className="flex items-center mb-2 hover:cursor-pointer"
              >
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
              max={Math.max(...products.map((product) => product.ProductPrice))}
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full"
            />
            <div className="text-sm text-gray-600 mt-1">
              Up to $
              {Math.max(...products.map((product) => product.ProductPrice))}
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
                    src={`${import.meta.env.VITE_BACKEND_URL}${product.ProductImage
                      }`}
                    alt={product.ProductName}
                    className="w-full h-48 object-cover"
                  />
                  {showQuickView === index && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                      onClick={() => navigate(`/user/products/${product._id}`)}
                    >
                      <button
                        className="bg-white text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-100"

                      >
                        Quick View
                      </button>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium mb-2">
                    {product.ProductName}
                  </h3>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <AiFillStar
                        key={i}
                        className={`${i < Math.floor(product.rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                          }`}
                      />
                    ))}
                    <span className="ml-1 text-sm text-gray-600">
                      ({product.rating})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">
                      ${product.ProductPrice}
                    </span>
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      onClick={handleAddtoCart}
                    >
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
