// components/UserCheckout.jsx
import React, { useState } from "react";
import { CardElement, useStripe, useElements, Elements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { createPaymentIntent } from "../apis/payment/paymentApi";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY);

function UserCheckout() {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    console.log("🚀🚀 Your selected text is => location: ", location);
    const { total } = location.state || { total: 0 };
    console.log("🚀🚀 Your selected text is => total: ", total);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        setLoading(true);
        try {
            const response = await createPaymentIntent(total * 100); // Convert to cents

            const { error, paymentIntent } = await stripe.confirmCardPayment(response?.clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (error) {
                toast.error(error.message);
            } else if (paymentIntent.status === "succeeded") {
                toast.success("Payment successful!");
                // Redirect or perform any post-payment actions here
            }
        } catch (error) {
            console.error("Error processing payment:", error);
            toast.error("Payment failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <CardElement className="p-4 border rounded-lg" />
            <button
                type="submit"
                disabled={!stripe || loading}
                className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                {loading ? "Processing..." : "Pay Now"}
            </button>
        </form>
    );
}

export default UserCheckout;


export const CheckoutPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                    Checkout
                </h1>
                {/* Wrap UserCheckout in the Elements provider */}
                <Elements stripe={stripePromise}>
                    <UserCheckout />
                </Elements>
            </div>
        </div>
    );
};
