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

  if (loading) return <Loading />;

  const filteredProducts = products?.filter((product) =>
    (selectedCategory === "All" || product.category === selectedCategory) &&
    product.ProductPrice <= priceRange &&
    product.ProductName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-8">

        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h2 className="text-xl font-bold mb-6">Filters</h2>
          <div>
            <h3 className="text-sm font-semibold mb-3 text-gray-700">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <label key={category} className="flex items-center text-sm text-gray-600 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === category}
                    onChange={() => handleCategoryChange(category)}
                    className="accent-indigo-500"
                  />
                  <span className="ml-2">{category}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="relative mb-8">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
            />
            <FiSearch className="absolute top-3.5 left-3 text-gray-400 text-lg" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts?.map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow group transition-transform duration-300 hover:shadow-lg hover:scale-[1.02]"
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
                    <div
                      className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 cursor-pointer"
                      onClick={() => navigate(`/user/products/${product._id}`)}
                    >
                      <button className="bg-white text-sm text-gray-800 px-4 py-2 rounded-full shadow hover:bg-gray-100">
                        Quick View
                      </button>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.ProductName}</h3>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <AiFillStar key={i} className={`${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`} />
                    ))}
                    <span className="ml-2 text-xs text-gray-500">({product.rating})</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-lg font-bold text-indigo-600">${product.ProductPrice}</span>
                    <button
                      className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-full hover:bg-indigo-500 transition"
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
