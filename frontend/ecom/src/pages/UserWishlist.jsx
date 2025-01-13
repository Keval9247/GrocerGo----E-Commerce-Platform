import { useState } from "react";
import { ShoppingBag, Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const initialWishlist = [
  {
    id: "1",
    name: "Aesthetic Minimal Chair",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500",
  },
  {
    id: "2",
    name: "Modern Coffee Table",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=500",
  },
];

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState(initialWishlist);

  const handleRemoveFromWishlist = (product) => {
    setWishlist(wishlist.filter((item) => item.id !== product.id));
    toast.success(`${product.name} removed from wishlist.`);
  };

  const handleAddToCart = (product) => {
    setWishlist(wishlist.filter((item) => item.id !== product.id));
    toast.success(`${product.name} added to cart.`);
  };

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
        My Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <EmptyState
          title="Your wishlist is empty"
          description="Save items you love and come back to them later."
          link="/user/products"
          linkText="Start Shopping"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
          {wishlist.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              inWishlist
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
      {/* Icon */}
      <div className="rounded-full bg-indigo-100 p-6 mb-6 shadow-lg">
        <ShoppingBag className="w-12 h-12 text-indigo-600" />
      </div>

      {/* Title */}
      <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
        {title || "Your cart is empty"}
      </h2>

      {/* Description */}
      <p className="text-gray-600 text-lg text-center mb-6 max-w-md">
        {description ||
          "Looks like you haven’t added anything to your wishlist yet. Browse our collections to find something you love!"}
      </p>

      {/* Button */}
      <Link
        to={link || "/"}
        className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium text-lg rounded-lg shadow-md hover:bg-indigo-700 transform hover:scale-105 transition-transform duration-300"
      >
        {linkText || "Start Shopping"}
      </Link>

      {/* Decorative Divider */}
      <div className="mt-8 w-16 h-1 bg-indigo-500 rounded-full"></div>
    </div>
  );
};


export const ProductCard = ({
  product,
  inWishlist,
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
      {/* Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-56 object-cover"
      />

      {/* Content */}
      <div className="p-6">
        <h3 className="font-semibold text-lg text-gray-800 mb-2">
          {product.name}
        </h3>
        <p className="text-indigo-600 font-medium text-xl mb-4">
          ${product.price.toFixed(2)}
        </p>

        {/* Actions */}
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
            {inWishlist ? (
              <Heart className="w-5 h-5" />
            ) : (
              <Trash2 className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
