import React from 'react';
import SignUp from '../../pages/Signup';
import Footer from '../Home/Footer';
import Header from '../Home/Header';

function SignupLayout() {
    return (
        <>
            {/* Optional Header */}
            {/* <Header /> */}

            <div className="min-h-screen flex flex-col md:flex-row overflow-none">
                <a href="/" className='absolute right-0 flex justify-end items-center w-24 h-auto ml-auto mr-5 mt-4 md:w-40 md:mt-6'>
                <img src='/images/logonew.png' alt="GrocerGo Logo" className='mt-[-20px]' />

                </a>

                {/* Left Side (Image & Welcome Text) */}
                <div className="relative md:w-1/2 flex items-center justify-center bg-white p-8 overflow-hidden">
                    <div className="absolute top-16 md:top-20 text-center">
                        <h1 className="text-3xl md:text-4xl font-bold text-indigo-800 tracking-wider drop-shadow-lg">
                            Join GrocerGo Today!  🚀
                        </h1>
                        <i><p className="text-sm font-extrabold mt-6 ml-10 text-[#414F56]">
                            Embark on a new shopping journey with us! Sign up now to unlock exclusive features, personalized deals, and a smooth, enjoyable experience. Get ready to elevate your shopping with GrocerGo!
                        </p></i>
                    </div>
                    <img
                        src="/images/signup.png"
                        alt="Sign Up"
                        className="max-w-full h-auto mt-8 md:mt-16 object-contain"
                    />
                </div>

                {/* Right Side (Signup Form) */}
                <div className="md:w-1/2 flex items-center justify-center bg-white p-8 overflow-y-auto h-full">
                    <div className="w-full mx-auto max-w-md">
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
