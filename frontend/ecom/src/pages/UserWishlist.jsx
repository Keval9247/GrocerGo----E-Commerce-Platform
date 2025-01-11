import { useState } from "react";
import { ShoppingBag, Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data - in a real app this would come from an API
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
  };

  const handleAddToCart = (product) => {
    // In a real app, this would add to cart state/API
    handleRemoveFromWishlist(product);
  };

  return (
    <div className="min-h-screen py-8">
      <h1 className="text-3xl font-bold text-secondary-foreground mb-8">
        My Wishlist
      </h1>

      {wishlist.length == 0 ? (
        <EmptyState
          title="Your wishlist is empty"
          description="Save items you love and come back to them later."
          link="/"
          linkText="Start Shopping"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    <div className="flex flex-col items-center justify-center py-12 animate-slide-up">
      <div className="rounded-full bg-primary-light p-4 mb-4">
        {/* Using Lucide React's ShoppingBag icon */}
        <ShoppingBag className="w-8 h-8 text-primary" />
      </div>
      <h2 className="text-2xl font-semibold text-secondary-foreground mb-2">
        {title}
      </h2>
      <p className="text-muted-foreground mb-6 text-center max-w-sm">
        {description}
      </p>
      {/* <Button asChild> */}
      <Link
        to={link}
        className="bg-primary hover:bg-primary-dark transition-colors"
      >
        {linkText}
      </Link>
      {/* </Button> */}
    </div>
  );
};

export const ProductCard = ({
  product,
  inWishlist,
  inCart,
  onAddToCart,
  onRemove,
}) => {
  const handleAddToCart = () => {
    onAddToCart?.(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleRemove = () => {
    onRemove?.(product);
    toast({
      title: "Removed",
      description: `${product.name} has been removed.`,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-slide-up">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-secondary-foreground mb-2">
          {product.name}
        </h3>
        <p className="text-primary-dark font-medium mb-4">
          ${product.price.toFixed(2)}
        </p>
        <div className="flex gap-2">
          {!inCart && (
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-primary hover:bg-primary-dark"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </button>
          )}
          <button
            variant="outline"
            onClick={handleRemove}
            className="text-destructive hover:text-destructive-foreground"
          >
            {inWishlist ? (
              <Heart className="w-4 h-4" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};