import React from 'react';
import { Login } from '../../components';

function LoginLayout() {
    return (
        <>
            <a
                href="/"
                className="absolute right-0 top-0 flex justify-end items-center w-24 h-auto ml-auto mr-5 mt-4 md:w-40 md:mt-6"
            >
                <img src='/images/logonew.png' alt="GrocerGo Logo" className='mt-[-20px]' />
            </a>
            <div className="min-h-screen flex flex-col md:flex-row">
                {/* Left Side (Image & Welcome Text) */}
                <div className="relative md:w-1/2 flex items-center justify-center bg-white p-8 overflow-hidden">
                    <div className="absolute top-16 md:top-20 text-center">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-wide drop-shadow-lg">
                            <span className='text-indigo-600'>Hi</span>, Welcome Back! 👋
                        </h1>
                        <p className="text-sm font-extrabold mt-6 ml-10 text-[#414F56]">
                            Discover new ways to streamline your work and boost productivity.
                            Our platform offers unique features designed just for you.
                        </p>
                    </div>
                    <img
                        src="/images/login.png"
                        alt="Sign In"
                        className="max-w-[80%] h-auto mt-8 md:mt-16 object-contain"
                    />
                </div>

                {/* Right Side (Login Form) */}
                <div className="md:w-1/2 flex items-center justify-center bg-white p-8 h-full overflow-hidden">
                    <div className="w-full max-w-md">
                        <Login />
                    </div>
                </div>
            </div>
        </>

    );
}

export default LoginLayout;
