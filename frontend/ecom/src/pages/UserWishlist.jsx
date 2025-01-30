import { useEffect, useState } from "react";
import { ShoppingBag, Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getWishlistItems, removeFromWishlist } from "../apis/products/Productapi";
import { AddToCart } from "../store/thunks/productThunk";
import { useDispatch } from "react-redux";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const dispatch = useDispatch();

  const getWishList = async () => {
    const response = await getWishlistItems();
    setWishlist(response?.Products);
  };

  useEffect(() => {
    getWishList();
  }, [])

  const handleRemoveFromWishlist = async (product) => {
    try {
      const response = await removeFromWishlist(product.productId._id);
      setWishlist(wishlist.filter((item) => item.productId._id !== product.productId._id))
      if (response?.message) {
        toast.success(response.message);
      } else {
        toast.error("Failed to remove product from wishlist.");
      }
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
    }
  };

  const handleAddToCart = async (product) => {
    console.log("🚀🚀 Your selected text is => product: ", product);
    const payload = {
      _id: product.productId._id,
      // userId: user.id,
      productId: product.productId._id,
      quantity: 1,
    }
    const response = await dispatch(AddToCart(payload));
    console.log("🚀🚀 Your selected text is => response: ", response);
    setWishlist(wishlist.filter((item) => item.productId.id !== product.productId._id));
    toast.success(response?.payload?.message);
  };

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
        My Wishlist
      </h1>

      {wishlist?.length === 0 ? (
        <EmptyState
          title="Your wishlist is empty"
          description="Save items you love and come back to them later."
          link="/user/products"
          linkText="Start Shopping"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
          {wishlist?.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onRemove={handleRemoveFromWishlist}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;


export const EmptyState = ({ title, description, link, linkText }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 animate-fade-in">
      <div className="rounded-full bg-indigo-100 p-6 mb-6 shadow-lg">
        <ShoppingBag className="w-12 h-12 text-indigo-600" />
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
        {title || "Your cart is empty"}
      </h2>

      <p className="text-gray-600 text-lg text-center mb-6 max-w-md">
        {description ||
          "Looks like you haven’t added anything to your wishlist yet. Browse our collections to find something you love!"}
      </p>

      <Link
        to={link || "/"}
        className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium text-lg rounded-lg shadow-md hover:bg-indigo-700 transform hover:scale-105 transition-transform duration-300"
      >
        {linkText || "Start Shopping"}
      </Link>

      <div className="mt-8 w-16 h-1 bg-indigo-500 rounded-full"></div>
    </div>
  );
};


export const ProductCard = ({
  product,
  onAddToCart,
  onRemove,
}) => {
  const handleAddToCart = () => {
    onAddToCart?.(product);
  };

  const handleRemove = () => {
    onRemove?.(product);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img
        src={`${import.meta.env.VITE_BACKEND_URL}${product?.productId?.ProductImage}`}
        alt={product?.productId?.ProductName}
        className="w-full h-56 object-cover"
      />

      <div className="p-6">
        <h3 className="font-semibold text-lg text-gray-800 mb-2">
          {product?.productId?.ProductName}
        </h3>
        <p className="text-indigo-600 font-medium text-xl mb-4">
          ${product?.productId?.ProductPrice?.toFixed(2)}
        </p>

        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transform hover:scale-105 transition-transform duration-300"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </button>

          <button
            onClick={handleRemove}
            className="inline-flex items-center justify-center px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:text-red-500 hover:border-red-500 transform hover:scale-105 transition-transform duration-300"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
