import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllRatingbyProductId, GetProductById, GetProductsByCategory } from '../apis/products/Productapi';
import { useSelector } from 'react-redux';
import { FaStar, FaArrowLeft, FaShoppingCart, FaHeart, FaShareAlt, FaTruck, FaShieldAlt, FaCheckCircle } from 'react-icons/fa';
import { MdOutlineDescription, MdCategory, MdInventory, MdDateRange } from 'react-icons/md';

const ProductDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [productDetails, setProductDetails] = useState(null);
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [reviewError, setReviewError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [similarProducts, setSimilarProducts] = useState([]);

    const user = useSelector((state) => state.authReducer.user);

    // Color Palette
    const primaryColor = '#4A76A8';
    const secondaryColor = '#2ECC71';
    const accentColor = '#FFC107';
    const bgColor = '#F5F5F5';
    const textColor = '#333333';

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const response = await GetProductById(id);
                console.log("🚀🚀 Your selected text is response: ", response);
                setProductDetails(response?.product);
                if (response?.product.category) {
                    const getSimilarProduct = await GetProductsByCategory(response?.product.category);
                    const filtered = getSimilarProduct?.products?.filter((product) => product._id !== response.product._id);
                    setSimilarProducts(filtered);
                }
                if (response?.product._id) {
                    const getrating = await getAllRatingbyProductId(response?.product._id)
                    const data = getrating;
                    console.log("🚀🚀 Your selected text is response: ", data);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddReview = async () => {
        if (review.trim() === '' || rating === 0) {
            setReviewError('Please provide both a review and a rating.');
            return;
        }
        try {
            // await SubmitReview({
            //   productId: id,
            //   review,
            //   rating
            // });
            alert('Review added successfully!');
            setReview('');
            setRating(0);
            setReviewError(null);
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('Failed to submit the review. Please try again.');
        }
    };

    const backToProducts = () => navigate('/user/products/');

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-500"></div>
            </div>
        );
    }

    if (!productDetails) {
        return (
            <div className="text-center mt-20">
                <h2 className="text-2xl font-bold text-gray-700">Product not found.</h2>
                <button
                    onClick={backToProducts}
                    className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Back to Products
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto my-10 p-6 bg-white shadow-xl rounded-xl font-poppins">
            <nav className="mb-10">
                <ol className="flex items-center space-x-2 text-gray-600">
                    <li>
                        <button
                            onClick={backToProducts}
                            className="text-blue-500 hover:underline flex items-center"
                        >
                            <FaArrowLeft className="mr-2" /> Products
                        </button>
                    </li>
                    <li className="text-gray-400">/</li>
                    <li className="text-gray-600">{productDetails.ProductName}</li>
                </ol>
            </nav>

            <h1 className="text-5xl font-bold text-gray-800 mb-8 text-center font-playfair">{productDetails.ProductName}</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="relative">
                    {productDetails.ProductImages && productDetails.ProductImages.length > 1 ? (
                        <div className="carousel relative rounded-xl shadow-lg">
                            {productDetails.ProductImages.map((image, index) => (
                                <div
                                    key={index}
                                    className={`carousel-item absolute w-full ${index === 0 ? 'active' : ''}`}
                                >
                                    <img
                                        src={`${import.meta.env.VITE_BACKEND_URL}${image}`}
                                        alt={`${productDetails.ProductName} - Image ${index + 1}`}
                                        className="w-full h-auto rounded-xl object-cover"
                                    />
                                </div>
                            ))}
                            <div className="carousel-pagination absolute bottom-4 left-1/2 -translate-x-1/2 flex">
                                {productDetails.ProductImages.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`carousel indicators btn btn-xs ${index === 0 ? 'btn-primary' : 'btn-secondary'}`}
                                        onClick={() => setActiveIndex(index)}
                                    ></button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <img
                            src={`${import.meta.env.VITE_BACKEND_URL}${productDetails.ProductImage}`}
                            alt={productDetails.ProductName}
                            className="w-full h-auto rounded-xl shadow-lg transform hover:scale-105 transition duration-500"
                        />
                    )}
                    {productDetails.stock <= 0 && (
                        <div className="absolute top-0 right-0 bg-red-500 text-white px-4 py-2 rounded-bl-xl rounded-tr-xl">
                            Out of Stock
                        </div>
                    )}
                </div>
                <div className="flex flex-col space-y-6">
                    <p className="text-3xl text-gray-700 font-semibold">${productDetails.ProductPrice}</p>
                    <p className="text-gray-600 text-lg">{productDetails.ProductDescription}</p>
                    <div className="flex flex-col space-y-2">
                        <p className="text-sm text-gray-500 flex items-center">
                            <MdCategory className="mr-2" /> Category: {productDetails.category}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center">
                            <MdInventory className="mr-2" /> Stock: {productDetails.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center">
                            <MdDateRange className="mr-2" /> Created At: {new Date(productDetails.created_at).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-yellow-500 flex items-center">
                            <FaStar className="mr-2" /> Rating: {productDetails.rating} ★
                        </p>
                    </div>
                    <div className="flex space-x-4">
                        <button
                            onClick={() => navigate(`/user/payment/${productDetails._id}`)}
                            className="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-700 transition duration-300 flex items-center"
                        >
                            <FaShoppingCart className="mr-2" /> Buy Now
                        </button>
                        <button
                            onClick={() => alert('Added to wishlist!')}
                            className="px-8 py-3 bg-red-500 text-white rounded-lg hover:bg-red-700 transition duration-300 flex items-center"
                        >
                            <FaHeart className="mr-2" /> Wishlist
                        </button>
                        <button
                            onClick={() => alert('Shared!')}
                            className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300 flex items-center"
                        >
                            <FaShareAlt className="mr-2" /> Share
                        </button>
                    </div>
                    <div className="mt-4 p-6 bg-gray-50 rounded-xl">
                        <h3 className="text-xl font-bold text-gray-700 mb-4">Product Highlights</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center text-gray-600">
                                <FaTruck className="mr-2 text-green-500" /> Free Shipping on orders above $50
                            </li>
                            <li className="flex items-center text-gray-600">
                                <FaShieldAlt className="mr-2 text-blue-500" /> 1-Year Warranty Included
                            </li>
                            <li className="flex items-center text-gray-600">
                                <FaCheckCircle className="mr-2 text-yellow-500" /> 100% Authentic Products
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="mt-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 font-playfair">Add a Review</h2>
                <textarea
                    className="w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                    rows="4"
                    placeholder="Write your review here..."
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                ></textarea>
                <div className="flex items-center space-x-4 mt-4">
                    <p className="text-gray-600">Rating:</p>
                    <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onClick={() => setRating(star)}
                                className={`text-2xl ${rating >= star ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-500 transition duration-300`}
                            >
                                ★
                            </button>
                        ))}
                    </div>
                </div>
                {reviewError && <p className="text-red-500 mt-2">{reviewError}</p>}
                <button
                    onClick={handleAddReview}
                    className="mt-4 px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300 flex items-center"
                >
                    Submit Review
                </button>
            </div>

            <div className="mt-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 font-playfair">Similar Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {similarProducts.map((product) => (
                        <div
                            key={product._id}
                            className="p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300"
                        >
                            <img
                                src={`${import.meta.env.VITE_BACKEND_URL}${product.ProductImage}`}
                                alt={product.ProductName}
                                className="w-full h-56 object-cover rounded-md mb-4"
                            />
                            <h3 className="text-xl font-bold text-gray-700 truncate font-poppins">{product.ProductName}</h3>
                            <p className="text-gray-500">${product.ProductPrice}</p>
                            <button
                                onClick={() => navigate(`/user/product/${product._id}`)}
                                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300 flex items-center"
                            >
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;