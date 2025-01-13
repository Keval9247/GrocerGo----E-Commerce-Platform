import { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { EmptyState } from "./UserWishlist";
import { DeleteCartItem, GetCartItems, UpdateCartItemQuantity } from "../apis/products/Productapi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loading from "../utils/Loading";
import { Elements } from "@stripe/react-stripe-js";
import UserCheckout from "./UserCheckout";
import { loadStripe } from "@stripe/stripe-js";
import { Link } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY);

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.authReducer.user);

  // Fetch cart items from API
  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const response = await GetCartItems(user?.id);
      setCart(response.items);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchCartItems();
    }
  }, [user]);

  const handleUpdateQuantity = async (productId, change) => {
    try {
      const item = cart.find((item) => item.productId === productId);
      if (!item) {
        toast.error("Item not found in cart.");
        return;
      }

      const newQuantity = Math.max(1, Math.min(item.quantity + change, item.stock));
      const response = await UpdateCartItemQuantity(user?.id, productId, newQuantity);

      // if (!response.success) {
      //   throw new Error(response.message || "Failed to update quantity");
      // }

      setCart((prevCart) =>
        prevCart.map((item) =>
          item.productId === productId ? { ...item, quantity: newQuantity } : item
        )
      );

      toast.success(response.message || "Quantity updated successfully");
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error(error.message || "Failed to update quantity");
    }
  };

  // Remove an item from the cart
  const handleRemoveFromCart = async (productId) => {
    setLoading(true);
    try {
      const response = await DeleteCartItem(user?.id, productId);
      toast.success(response?.message);
      await fetchCartItems();
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove item from cart.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  // Calculate subtotal and total dynamically
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal; // Assuming shipping is free, so total = subtotal

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {cart.length === 0 ? (
        <EmptyState
          title="Your cart is empty"
          description="Add items to your cart to continue shopping."
          link="/user/products"
          linkText="Start Shopping"
        />
      ) : (
        <>
          <div className="p-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-start">
              Your Items :
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                {cart.map((item) => (
                  <div
                    key={item.productId}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col sm:flex-row gap-6 items-center animate-fade-in"
                  >
                    <img
                      src={item.productImage ? `${import.meta.env.VITE_BACKEND_URL}${item.productImage}` : "/images/productnull.jpg"}
                      alt={item.name}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                    <div className="flex-1 w-full">
                      <h3 className="font-semibold text-xl text-gray-900 mb-2">
                        {item.name}
                      </h3>
                      <p className="text-indigo-600 font-medium text-lg mb-2">
                        ${item.price.toFixed(2)}
                      </p>
                      <p className="text-gray-600 text-sm mb-4">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleUpdateQuantity(item.productId, -1)}
                          className="px-3 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 bg-gray-50 border rounded-lg text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleUpdateQuantity(item.productId, 1)}
                          className={`px-3 py-2 border rounded-lg ${item.quantity >= item.stock ? "bg-gray-200 cursor-not-allowed" : "bg-gray-100 hover:bg-gray-200"
                            } transition`}
                          disabled={item.quantity >= item.stock}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveFromCart(item.productId)}
                      className="text-red-500 hover:text-red-600 transition self-start sm:self-center"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1 bg-white rounded-xl shadow-sm p-6 sticky top-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900 font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-900 font-medium">Free</span>
                  </div>
                </div>
                <hr className="my-6 border-gray-200" />
                <div className="flex justify-between mb-6">
                  <span className="text-xl font-semibold text-gray-900">Total</span>
                  <span className="text-xl font-semibold text-gray-900">${total.toFixed(2)}</span>
                </div>
                <Link state={{ total }} to="/user/payment/checkout" className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        </>
      )}

      {/* <Elements stripe={stripePromise}>
        <UserCheckout total={total} />
      </Elements> */}
    </div>
  );
};

export default CartPage;