import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";
import { getAllProducts, getProductsByCategory } from "../apis/products/Productapi";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loading from "../utils/Loading";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AddToCart } from "../store/thunks/productThunk";

const ProductsPage = () => {
  const categories = [
    "All", "Electronics", "Furniture", "Books", "Fashion", "Home & Kitchen", "Toys", "Sports"
  ];

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.user);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [priceRange, setPriceRange] = useState(10000);
  const [searchQuery, setSearchQuery] = useState("");
  const [showQuickView, setShowQuickView] = useState(null);

  const categoryFromUrl = searchParams.get("category") || "All";
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);

  useEffect(() => {
    setSelectedCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = selectedCategory === "All" ? await getAllProducts() : await getProductsByCategory(selectedCategory);
        setProducts(response?.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchParams({ category });
  };

  const handleAddtoCart = async (product) => {
    if (!user) {
      navigate("/login");
    } else {
      const payload = { _id: product._id, userId: user.id, productId: product._id, quantity: 1 };
      const response = await dispatch(AddToCart(payload));
      toast.success(response?.payload?.message);
    }
  };

  if (loading) {
    return <Loading />;
  }

  const filteredProducts = products?.filter((product) => {
    return (
      (selectedCategory === "All" || product.category === selectedCategory) &&
      product.ProductPrice <= priceRange &&
      product.ProductName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Categories</h3>
            {categories.map((category) => (
              <label key={category} className="flex items-center mb-2 hover:cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === category}
                  onChange={() => handleCategoryChange(category)}
                  className="form-radio text-blue-600"
                />
                <span className="ml-2">{category}</span>
              </label>
            ))}
          </div>
        </aside>
        <main className="flex-1">
          <div className="mb-6 relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts?.map((product, index) => (
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
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                      onClick={() => navigate(`/user/products/${product._id}`)}
                    >
                      <button className="bg-white text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-100">Quick View</button>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium mb-2">{product.ProductName}</h3>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <AiFillStar key={i} className={`${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`} />
                    ))}
                    <span className="ml-1 text-sm text-gray-600">({product.rating})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">${product.ProductPrice}</span>
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      onClick={() => handleAddtoCart(product)}
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
