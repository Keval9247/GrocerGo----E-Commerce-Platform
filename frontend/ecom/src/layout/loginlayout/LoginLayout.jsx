import React from 'react';
import { Login } from '../../components';

function LoginLayout() {
    return (
        <>
            {/* Logo (Top Right Corner) */}
            <a
                href="/"
                className="absolute top-4 right-4 md:top-6 md:right-6 w-24 md:w-40 z-10"
            >
                <img
                    src="/images/logonew.png"
                    alt="GrocerGo Logo"
                    className="w-full h-auto"
                />
            </a>

            <div className="min-h-screen flex flex-col md:flex-row bg-white relative">

                {/* Left Section - Hidden on Mobile */}
                <div className="hidden md:flex md:w-1/2 flex-col items-center justify-center p-8 bg-white text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-wide drop-shadow-lg mt-10">
                        <span className="text-indigo-600">Hi</span>, Welcome Back! 👋
                    </h1>
                    <p className="text-sm md:text-base font-medium mt-6 max-w-md text-[#414F56]">
                        Discover new ways to streamline your work and boost productivity.
                        Our platform offers unique features designed just for you.
                    </p>
                    <img
                        src="/images/login.png"
                        alt="Sign In"
                        className="max-w-[80%] h-auto mt-10 md:mt-16 object-contain"
                    />
                </div>

                {/* Right Section - Login Form */}
                <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 overflow-y-auto h-full">
                    <div className="w-full max-w-md">
                        <Login />
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginLayout;
