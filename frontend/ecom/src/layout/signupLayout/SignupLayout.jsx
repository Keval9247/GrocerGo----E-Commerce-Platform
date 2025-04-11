import React from 'react';
import SignUp from '../../pages/Signup';

function SignupLayout() {
    return (
        <>
            {/* Optional Header */}
            {/* <Header /> */}

            <div className="min-h-screen flex flex-col md:flex-row bg-white relative">

                {/* Logo (Top Right Corner) */}
                <a href="/" className="absolute top-4 right-4 md:top-6 md:right-6 w-24 md:w-40 z-10">
                    <img src="/images/logonew.png" alt="GrocerGo Logo" className="w-full h-auto" />
                </a>

                {/* Left Section - Hidden on mobile */}
                <div className="hidden md:flex md:w-1/2 flex-col justify-center items-center text-center p-8 bg-white">
                    <h1 className="text-3xl md:text-4xl font-bold text-indigo-800 tracking-wide drop-shadow-md mt-16 md:mt-0">
                        Join GrocerGo Today! 🚀
                    </h1>
                    <p className="mt-6 text-sm md:text-base font-medium text-gray-700 max-w-md">
                        Embark on a new shopping journey with us! Sign up now to unlock exclusive features, personalized deals, and a smooth, enjoyable experience. Get ready to elevate your shopping with GrocerGo!
                    </p>
                    <img
                        src="/images/signup.png"
                        alt="Sign Up Illustration"
                        className="max-w-full h-auto mt-10 md:mt-16 object-contain px-6"
                    />
                </div>

                {/* Right Section (Signup Form) */}
                <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 overflow-y-auto h-full">
                    <div className="w-full max-w-md">
                        <SignUp />
                    </div>
                </div>
            </div>

            {/* Optional Footer */}
            {/* <Footer /> */}
        </>
    );
}

export default SignupLayout;
