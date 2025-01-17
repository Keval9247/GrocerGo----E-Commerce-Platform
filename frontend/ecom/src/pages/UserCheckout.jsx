import React, { useState } from "react";
import { Link } from "react-router-dom";

// Load your Stripe publishable key
const stripePromise = import("@stripe/stripe-js").then((module) =>
    module.loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY)
);

const UserCheckout = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleCheckout = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:5858/api/user/payment/create-checkout-session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items: [
                        { name: "Product 1", description: "High-quality product", price: 20.99, quantity: 1 },
                        { name: "Product 2", description: "Another great product", price: 15.49, quantity: 2 },
                    ],
                }),
            });

            const { id } = await response.json();
            const stripe = await stripePromise;

            await stripe.redirectToCheckout({ sessionId: id });
        } catch (error) {
            console.error("Error:", error);
            setError("Unable to proceed with payment. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="max-w-lg w-full bg-white rounded-lg shadow-md p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Checkout</h1>

                {/* Order Summary */}
                <div className="mb-8 bg-gray-50 p-4 rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
                    <div className="flex justify-between py-2">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="text-gray-900 font-medium">$50.98</span>
                    </div>
                    <div className="flex justify-between py-2">
                        <span className="text-gray-600">Shipping</span>
                        <span className="text-gray-900 font-medium">Free</span>
                    </div>
                    <hr className="my-4 border-gray-200" />
                    <div className="flex justify-between text-lg font-semibold">
                        <span className="text-gray-900">Total</span>
                        <span className="text-gray-900">$50.98</span>
                    </div>
                </div>

                {/* Checkout Button */}
                {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
                <button
                    onClick={handleCheckout}
                    disabled={loading}
                    className={`w-full py-3 px-4 text-white font-medium rounded-lg transition ${loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
                        }`}
                >
                    {loading ? "Processing..." : "Proceed to Payment"}
                </button>

                {/* Back to Cart */}
                <div className="mt-6 text-center">
                    <Link
                        to="/user/cart"
                        className="text-indigo-600 hover:text-indigo-700 transition"
                    >
                        Back to Cart
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UserCheckout;
