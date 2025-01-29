import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Star, ArrowLeft, ShoppingCart, Heart, Share2, Truck, CheckCircle, Package, Calendar, Tag, ShieldBan } from "lucide-react";
import { AddRatingAndReview, getAllRatingbyProductId, GetProductById, GetProductsByCategory } from "../apis/products/Productapi";
import Loading from "../utils/Loading";
import { toast } from "react-toastify";
import ShareOptions from "./ShareOption";
import { Tooltip } from '@mui/material'
import { AddToCart } from "../store/thunks/productThunk";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewError, setReviewError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [productRating, setProductRating] = useState();
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [cartPreview, setCartPreview] = useState('');

  const isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated);
  const user = useSelector((state) => state.authReducer.user);
  const dispatch = useDispatch();

  const fetchProductDetails = useCallback(async () => {
    setLoading(true);
    try {
      const response = await GetProductById(id);
      setProductDetails(response?.product);
      if (response?.product.category) {
        const similarProducts = await GetProductsByCategory(response?.product.category);
        setSimilarProducts(similarProducts?.products?.filter((p) => p._id !== response.product._id));
      }
      if (response?.product._id) await fetchProductRatings(response?.product._id);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }, [id])

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  const fetchProductRatings = useCallback(async (productId) => {
    try {
      const response = await getAllRatingbyProductId(productId);
      setProductRating(response.data);
    } catch (error) {
      console.error("Error fetching ratings:", error);
    }
  }, []);

  const handleAddReview = useCallback(async () => {
    if (!review.trim() || !rating) {
      setReviewError("Please provide both a review and rating");
      return;
    }
    setLoading(true);
    const data = { productId: productDetails._id, userId: user.id, rating, review };

    try {
      await AddRatingAndReview(data);
      toast.success("Review added successfully!");
      setReview("");
      setRating(0);
      setReviewError(null);
      setShowReviewModal(false);
      await fetchProductRatings(productDetails._id);
    } catch (error) {
      setReviewError("Failed to submit review");
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [review, rating, productDetails, user, fetchProductRatings])

  useEffect(() => { }, [cartPreview])

  const handleShareToggle = () => setShowShareOptions(!showShareOptions);

  const handletoAddToCart = async (product) => {
    if (!user) navigate("/login");
    else {
      setCartPreview(product);
      const payload = {
        _id: product._id,
        userId: user.id,
        productId: product._id,
        quantity: 1,
      }
      const response = await dispatch(AddToCart(payload))
      toast.success(response?.payload?.message);
      setAddedToCart(true);
    }
  }

  const handleAddToFavaourite = () => {
    toast.success("Product added to favorites successfully!");
  }


  const handleReviewModalToggle = () => {
    if (!user) navigate("/login");
    else setShowReviewModal(!showReviewModal);
  };

  if (loading) return <Loading />;

  if (!productDetails) return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h2 className="text-2xl font-bold text-gray-700">Product not found</h2>
      <button onClick={() => navigate("/user/products")} className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
        Back to Products
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 scrollbar-hidden">
      <div className="max-w-7xl mx-auto py-8 px-4">
        <nav className="flex items-center space-x-2 text-sm">
          <button onClick={() => navigate("/user/products")} className="flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="w-4 h-4 mr-1" /> Products
          </button>
          <span className="text-gray-500">/</span>
          <span className="text-gray-700">{productDetails.ProductName}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}${productDetails.ProductImages?.[activeImageIndex] || productDetails.ProductImage}`}
                  alt={productDetails.ProductName}
                  className="w-full h-full object-cover cursor-pointer transform hover:scale-105 transition"
                />
                {productDetails.stock <= 0 && <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full">Out of Stock</div>}
                {productDetails.ProductImages?.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {productDetails.ProductImages.map((_, idx) => (
                      <button key={idx} onClick={() => setActiveImageIndex(idx)} className={`w-2 h-2 rounded-full transition ${idx === activeImageIndex ? "bg-blue-500" : "bg-gray-300"}`} />
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{productDetails.ProductName}</h1>
              </div>

              <div className="space-y-4">
                <p className="text-3xl font-bold text-blue-600">${productDetails.ProductPrice}</p>
                <p className="text-gray-600 leading-relaxed">{productDetails.ProductDescription}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Tag className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">{productDetails.category}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Package className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Stock:</span>
                  <span className="font-medium">{productDetails.stock > 0 ? `${productDetails.stock} units` : "Out of Stock"}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Listed:</span>
                  <span className="font-medium">{new Date(productDetails.created_at).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Tooltip title={!user ? "Please login to purchase this product" : productDetails.stock === 0 ? "Out of stock" : ""} arrow placement="top">
                  <button
                    onClick={() => handletoAddToCart(productDetails)}
                    disabled={productDetails.stock === 0 || !user}
                    className={`flex-1 py-3 px-8 rounded-lg flex items-center justify-center space-x-2 ${productDetails.stock === 0 || !user ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white hover:cursor-pointer"} transition`}>
                    <ShoppingCart className="w-5 h-5" /> <span>Buy Now</span>
                  </button>
                </Tooltip>
                <button onClick={handleAddToFavaourite} className="flex-1 py-3 px-8 rounded-lg flex items-center justify-center space-x-2 border border-gray-300 hover:bg-gray-50 transition">
                  <Heart className="w-5 h-5" /> <span>Save</span>
                </button>
                <button onClick={handleShareToggle} className="py-3 px-8 rounded-lg flex items-center justify-center space-x-2 border border-gray-300 hover:bg-gray-50 transition">
                  <Share2 className="w-5 h-5" /> <span>Share</span>
                </button>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <h3 className="font-semibold text-gray-900">Key Features</h3>
                <div className="grid gap-4">
                  <div className="flex items-center space-x-3">
                    <Truck className="w-5 h-5 text-blue-500" /> <span>Free shipping on orders over $50</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <ShieldBan className="w-5 h-5 text-blue-500" /> <span>1-year warranty included</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-500" /> <span>100% authentic product</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between mb-4 mt-16">
            <div className="relative">
              <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
              <div className="absolute left-16 w-36 h-[3px] bg-blue-300 mt-1"></div>
              <div className="items-center gap-2 flex">
                <div className="flex items-center mt-5">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const averageRating = productRating.reduce((sum, obj) => sum + obj.rating, 0) / productRating.length;
                    const isFull = star <= Math.floor(averageRating);
                    const isHalf = star > Math.floor(averageRating) && star - 1 < averageRating;
                    return (
                      <button key={star} onClick={() => setRating(star)} className="focus:outline-none relative">
                        <Star className="w-5 h-5 text-gray-300" />
                        {isFull && <Star className="absolute inset-0 w-5 h-5 text-yellow-400 fill-current" />}
                        {isHalf && <Star className="absolute inset-0 w-5 h-5 text-yellow-400 fill-current" style={{ clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)" }} />}
                      </button>
                    );
                  })}
                </div>
                <span className="mt-5 text-yellow-400 text-2xl font-bold">{productRating.reduce((sum, obj) => sum + obj.rating, 0) / productRating.length || 0}</span>
                <span className="mt-5 text-sm">( {productRating.length} reviews )</span>
              </div>
            </div>
            <div className="items-center">
              <button className="bg-blue-400 text-white rounded-lg px-4 py-2 border border-blue-700 hover:bg-blue-500" onClick={handleReviewModalToggle}>Write a Review</button>
            </div>
          </div>

          <div className="mt-5">
            <div className="">
              {productRating && productRating.length > 0 ? (
                productRating.map((review) => (
                  <div key={review._id} className="flex items-start space-x-4 py-4 border border-gray-200 p-8 rounded-lg mb-4">
                    <img src={review.user?.profielePic ? `${import.meta.env.VITE_BACKEND_URL}${review.user.profielePic}` : "/images/usernull.png"} alt={review.user?.name.toUpperCase() || "User"} className="w-12 h-12 rounded-full object-cover" />
                    <div className="flex-1">
                      <div className="flex flex-row justify-between items-center">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-800">{review.user?.name || "Anonymous"}</h4>
                          <p className="text-[11px] text-gray-500 mt-[-5px]">Posted on : {new Date(review?.createdAt).toLocaleDateString()}</p>
                          <div className="flex items-center space-x-1 mb-2 mt-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className={`w-4 h-5 ${review.rating >= star ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col justify-center">
                          <span className="text-yellow-400 text-center font-bold text-3xl">{review?.rating?.toFixed(1)}</span>
                          <span className="text-xs text-gray-700 font-semibold tracking-tight">ratings</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 font-bold">{review?.comment}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">No reviews yet. Be the first to review this product!</p>
              )}
            </div>
          </div>

          <div className="relative">
            <h2 className="text-2xl font-bold text-gray-900 mt-10">You May Also Like</h2>
            <div className="absolute left-[5.5%] right-0 h-[3px] bg-blue-300 w-[12%] top-full mt-1"></div>
          </div>
          {similarProducts.length > 0 ? (
            <div className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {similarProducts?.map((product) => (
                  <div key={product._id} className="bg-white rounded-lg overflow-hidden shadow-lg transition p-4 hover:cursor-pointer" onClick={() => navigate(`/user/products/${product._id}`)}>
                    <div className="w-full h-60 overflow-hidden rounded-lg">
                      <img src={`${import.meta.env.VITE_BACKEND_URL}${product.ProductImage}`} alt={product.ProductName} className="w-full h-60 object-cover cursor-pointer transform hover:scale-105 transition" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{product.ProductName}</h3>
                      <p className="text-blue-600 font-bold">${product.ProductPrice}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-center">No similar products found.</p>
          )}
        </div>
      </div>

      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Write a Review</h2>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review..."
              className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              rows="4"
            />
            <div className="flex items-center mt-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-8 h-8 ${rating >= star ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                  />
                </button>
              ))}
            </div>
            {reviewError && (
              <p className="text-red-500 text-sm mt-2">{reviewError}</p>
            )}
            <div className="flex items-center justify-end mt-6 space-x-4">
              <button
                onClick={() => setShowReviewModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddReview}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}

      {showShareOptions && (
        <ShareOptions
          product={productDetails}
          onClose={() => setShowShareOptions(false)}
        />
      )}

      {addedToCart && cartPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
            <button
              onClick={() => setAddedToCart(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
              aria-label="Close"
            >
              ✕
            </button>
            <div className="flex flex-col justify-center items-center text-center">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48">
                <path fill="#c8e6c9" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path fill="#4caf50" d="M34.586,14.586l-13.57,13.586l-5.602-5.586l-2.828,2.828l8.434,8.414l16.395-16.414L34.586,14.586z"></path>
              </svg>
              <p className="text-center text-xl font-bold text-green-600 mb-4">
                Product Added to Cart!
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}${cartPreview.ProductImage}`}
                alt={cartPreview.ProductName}
                className="w-24 h-24 rounded-lg border border-gray-300 object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{cartPreview.ProductName}</h3>
                <p className="text-blue-600 text-lg font-bold">${cartPreview.ProductPrice}</p>
                <p className="text-gray-500 text-sm mt-1">Stock Available: {cartPreview.stock} units</p>
              </div>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate("/user/cart")}
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold shadow-md"
              >
                Go to Cart
              </button>
              <button
                onClick={() => setAddedToCart(false)}
                className="w-full sm:w-auto px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-semibold"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}



    </div>
  );
};

export default ProductDetails;
