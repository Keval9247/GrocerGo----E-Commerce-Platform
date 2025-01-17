import React, { useEffect, useState } from 'react';
import { CheckCircle, ShoppingBag, Home } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { handlePaymentSuccess } from '../apis/payment/paymentApi';
import { useSelector } from 'react-redux';

const SuccessPage = () => {

    const user = useSelector((state) => state.authReducer.user);
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const [orderId, setOrderId] = useState('');

    useEffect(() => {
        if (sessionId) {
            const fetchHandleSuccess = async () => {
                try {
                    const response = await handlePaymentSuccess(sessionId);
                    setOrderId(response.orderId);
                } catch (error) {
                    console.error("Error updating order status:", error);
                }
            };
            fetchHandleSuccess();
        }
    }, [sessionId]);



    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
                <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
                <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
                <p className="text-gray-600 mb-6">
                    Thank you for your purchase. Your order has been successfully processed.
                </p>
                <p className='font-semibold mb-5'>Your OrderId is : <span>{orderId ? orderId : "order id not found."}</span></p>
                <div className="flex flex-col space-y-4">
                    <a
                        href={`/user/orders/${user.id}`}
                        className="flex items-center justify-center bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
                    >
                        <ShoppingBag className="w-5 h-5 mr-2" />
                        View Order Details
                    </a>
                    <a
                        href="/"
                        className="flex items-center justify-center bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors"
                    >
                        <Home className="w-5 h-5 mr-2" />
                        Continue Shopping
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SuccessPage;