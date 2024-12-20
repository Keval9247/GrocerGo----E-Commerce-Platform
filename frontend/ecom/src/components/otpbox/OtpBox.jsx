import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const OtpBox = () => {
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate(); // Use the `useNavigate` hook for navigation

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return;

        const newOtp = [...otp];
        newOtp[index] = element.value;

        setOtp(newOtp);

        // Move to the next input if the current one is filled
        if (element.value !== "" && element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    const verifyOtp = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post("http://localhost:4000/api/auth/verifyOtp", {
                otp: otp.join(""),
            });
            setIsLoading(false);
            return response.data;
        } catch (error) {
            setIsLoading(false);
            console.error("Error verifying OTP:", error);
            throw error;
        }
    };

    const handleSubmit = async () => {
        const enteredOtp = otp.join("");

        if (enteredOtp.length < 6) {
            setError("Please fill out all OTP fields.");
            return;
        }

        try {
            await verifyOtp();
            alert("OTP Verified!");
            setError("");
            navigate("/user"); // Redirect to user route
        } catch {
            setError("Invalid OTP. Please try again.");
        }
    };

    const handleResendOtp = async () => {
        try {
            setIsLoading(true);
            await axios.post("http://localhost:4000/api/auth/resend-otp", {
                email: localStorage.getItem("UserEmail"), // Replace with dynamic email if required
            });
            setIsLoading(false);
            alert("OTP resent to your email.");
        } catch (error) {
            setIsLoading(false);
            console.error("Error resending OTP:", error);
            setError("Failed to resend OTP. Please try again later.");
        }
    };

    return (
        <div className="flex items-center justify-center mt-20 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">Enter OTP</h2>
                <p className="text-gray-500 text-center mb-4">
                    We’ve sent a 6-digit code to your email. Please enter it below to verify your account.
                </p>
                <div className="flex justify-center space-x-2 mb-4">
                    {otp.map((data, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            value={data}
                            onChange={(e) => handleChange(e.target, index)}
                            onFocus={(e) => e.target.select()}
                            className="w-12 h-12 text-center text-xl border-2 border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    ))}
                </div>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full py-2 bg-blue-500 text-white rounded-md shadow-md hover:shadow-xl hover:bg-blue-600 disabled:bg-gray-400"
                >
                    {isLoading ? "Verifying..." : "Verify OTP"}
                </button>
                <p className="text-gray-500 text-sm text-center mt-4">
                    Didn’t receive the code?{" "}
                    <span
                        className="text-blue-500 cursor-pointer hover:underline"
                        onClick={handleResendOtp}
                    >
                        Resend OTP
                    </span>
                </p>
            </div>
        </div>
    );
};

export default OtpBox;
