import React, { useEffect, useState } from 'react';
import { XCircle, ShoppingCart, Home } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { handlePaymentCancel } from '../apis/payment/paymentApi';

const CancelPage = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const [orderId, setOrderId] = useState('');
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (sessionId) {
            setLoading(true);
            const fetchHandleCancel = async () => {
                try {
                    const response = await handlePaymentCancel(sessionId);
                    setOrderId(response.orderId);
                } catch (error) {
                    console.error("Error updating order status:", error);
                }
            };
            fetchHandleCancel();
            setLoading(false)
        }
    }, [sessionId]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
                <XCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
                <h1 className="text-2xl font-bold mb-4">Payment Cancelled</h1>
                <p className="text-gray-600 mb-6">
                    Your payment was not completed. Please review your payment details and try again. If you continue to experience issues, contact our support team.
                </p>
                <p className='font-semibold mb-5'>Your OrderId is : <span>{loading ? sessionId ? orderId : "Loading order ID..." : "Order not found. Please drop us email on olixlab.38@gmail.com."}</span></p>
                <div className="flex flex-col space-y-4">
                    <a
                        href="/user/cart"
                        className="flex items-center justify-center bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
                    >
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Retry Payment
                    </a>
                    <a
                        href="/"
                        className="flex items-center justify-center bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors"
                    >
                        <Home className="w-5 h-5 mr-2" />
                        Return to Home
                    </a>
                </div>
            </div>
        </div>
    );
};

export default CancelPage;