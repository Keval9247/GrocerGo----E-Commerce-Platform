import { useCallback, useEffect, useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { EmptyState } from "./UserWishlist";
import { DeleteCartItem, GetCartItems, UpdateCartItemQuantity } from "../apis/products/Productapi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loading from "../utils/Loading";
import { Link, useNavigate } from "react-router-dom";
import { getCheckoutSession, payPalPayment, payPalSuccess } from "../apis/payment/paymentApi";
import { Tooltip } from "@mui/material";
import { clearCart, setTotalItems } from "../store/slice/ProductSlice";
import { UpdateCart } from "../store/thunks/productThunk";
import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import html2pdf from 'html2pdf.js';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [payPalOrderId, setPayPalOrderId] = useState(null);
  const [isInvoice, setIsInvoice] = useState(false);
  const user = useSelector((state) => state.authReducer.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      toast.error("Please log in to view your cart.");
      navigate(-1);
    }
  }, [user])

  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const response = await GetCartItems(user?.id);
      if (response?.cart?.items) {
        const totalItems = response?.cart?.items?.reduce((total, item) => total + item.quantity, 0)
        dispatch(setTotalItems(totalItems))
      }
      setCart(response?.cart?.items);
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

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedUpdateQuantity = useCallback(
    debounce(async (userId, productId, newQuantity) => {
      const data = { userId, productId, quantity: newQuantity }
      const response = await dispatch(UpdateCart(data));
      toast.success(response?.message || "Quantity updated successfully");
    }, 500),
    []
  )

  const handleUpdateQuantity = async (productId, change) => {
    try {
      const item = cart.find((item) => item.productId === productId);
      if (!item) {
        toast.error("Item not found in cart.");
        return;
      }

      const newQuantity = Math.max(1, Math.min(item.quantity + change, item.stock));

      setCart((prevCart) =>
        prevCart.map((item) =>
          item.productId === productId ? { ...item, quantity: newQuantity } : item
        )
      );

      debouncedUpdateQuantity(user?.id, productId, newQuantity);
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error(error.message || "Failed to update quantity");
    }
  };

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

  const handleCheckout = async (cart) => {
    try {
      const response = await getCheckoutSession(user?.id, cart)
      if (response.url) {
        window.location.href = response.url;
      }
      else {
        toast.error("Failed to create checkout session");
      }
    } catch (error) {
      console.error("🚀🚀 Your selected text is => error: ", error);
    }
  }

  const handlePayPalCheckout = async () => {
    try {
      const response = await payPalPayment({ userId: user?.id, items: cart, });
      if (response?.id) {
        setPayPalOrderId(response?.id);
        toast.success("Redirecting to PayPal payment...");
      } else {
        toast.error("Failed to initiate PayPal payment.");
      }
    } catch (error) {
      console.error("PayPal checkout error:", error);
      toast.error("Failed to initiate PayPal payment.");
    }
  };

  const handlePayPalSuccess = async (orderId) => {
    try {
      const response = await payPalSuccess(orderId);

      // Convert Blob to text if the response is a Blob
      const htmlContent = typeof response.data === 'object' && response.data instanceof Blob
        ? await response.data.text()
        : response.data;

      html2pdf()
        .from(htmlContent)
        .set({
          margin: 10,
          filename: `Invoice_${orderId}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        })
        .save()
        .then(() => {
          toast.success("Payment successful! Invoice is downloaded.");
          toast.info("Invoice is downloaded.");
          dispatch(clearCart());
          navigate(`/user/orders/${user.id}`);
        });
    } catch (error) {
      console.error("PayPal success error:", error);
      toast.error("Error handling PayPal payment.");
    }
  };

  const subtotal = cart?.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal; // Assuming shipping is free, so total = subtotal

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {!cart ? (
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
                {cart?.map((item) => (
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
                        <Tooltip title={`${item.quantity >= item.stock ? `Only ${item.stock} items left in stock!` : ""}`} placement="top">
                          <button
                            onClick={() => handleUpdateQuantity(item.productId, 1)}
                            className={`px-3 py-2 border rounded-lg ${item.quantity >= item.stock ? "bg-gray-200 cursor-not-allowed" : "bg-gray-100 hover:bg-gray-200"
                              } transition`}
                            disabled={item.quantity >= item.stock}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </Tooltip>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveFromCart(item.productId)}
                      className="text-white bg-red-500 rounded-lg p-1 hover:bg-red-600 transition self-start sm:self-center"
                    >
                      <Trash2 />
                    </button>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-1 bg-white rounded-xl shadow-sm p-6 sticky top-8 h-fit">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900 font-medium">${subtotal?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-900 font-medium">Free</span>
                  </div>
                </div>
                <hr className="my-6 border-gray-200" />
                <div className="flex justify-between mb-6">
                  <span className="text-xl font-semibold text-gray-900">Total</span>
                  <span className="text-xl font-semibold text-gray-900">${total?.toFixed(2)}</span>
                </div>
                <div className="w-full">
                  <button
                    type="button"
                    onClick={() => handleCheckout(cart)}
                    className="block w-full text-center py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Proceed to Checkout with Stripe
                  </button>
                  <div className="flex items-center my-6">
                    <hr className="flex-grow border-gray-300" />
                    <span className="px-4 text-gray-500 font-medium">OR</span>
                    <hr className="flex-grow border-gray-300" />
                  </div>

                </div>
                {payPalOrderId ? (
                  <PayPalButtons
                    createOrder={() => payPalOrderId}
                    onApprove={(data) => handlePayPalSuccess(data.orderID)}
                    onError={(error) => {
                      console.error("PayPal Button Error:", error);
                      toast.error("Failed to process PayPal payment.");
                    }}
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => handlePayPalCheckout(cart)}
                    className="block w-full text-center py-3 mt-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Pay with PayPal
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;