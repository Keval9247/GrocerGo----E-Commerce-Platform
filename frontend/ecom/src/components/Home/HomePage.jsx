import { Box, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import WhyChooseUs from '../../pages/carousel';
import TestimonialSection from '../../pages/Testimonial';
import Loading from '../../utils/Loading';

function HomePage() {

    const navigate = useNavigate();
    const [subscribeEmail, setSubscribeEmail] = useState();
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch('/json/SampleProducts.json');
                const data = await response.json();
                setDisplayedProducts(data);
            } catch (error) {
                toast.error('Failed to fetch products.');
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);


    const validateEmail = (email) => {
        if (email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const isemailTrue = regex.test(email)
            console.log("🚀 ~ validateEmail ~ isemailTrue:", isemailTrue)
            const reposnse = isemailTrue ? setSubscribeEmail(email) : setSubscribeEmail('')
            console.log("🚀 ~ validateEmail ~ reposnse:", reposnse)
            return;
        }
    };

    useEffect(() => {
    }, [subscribeEmail]);

    const handleSubscribeNewsletter = async () => {
        if (subscribeEmail) {
            setLoading(true);
            try {
                await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/subscribe/`,
                    { email: subscribeEmail }
                );
                toast.success('Subscribed to newsletter successfully!');
                setSubscribeEmail('');
            } catch (error) {
                toast.error('Failed to subscribe to newsletter.');
                console.error('Error subscribing:', error);
            } finally {
                setLoading(false);
            }
        } else {
            toast.error('Invalid email format.');
        }
    };

    const handleLoadMore = () => {
        setLoading(true);
        setTimeout(() => {
            window.open('/user/products', '_blank');
            setLoading(false);
        }, 1000);
    };

    return (
        <>
            <div className="bg-gray-100 min-h-screen pt-20">
                <ToastContainer position="top-right" autoClose={2000} />
                {loading && <Loading />}

                {/* Hero Section */}
                <section className="w-full bg-gradient-to-br from-indigo-600 to-purple-500 text-white py-20 px-6">
                    <div className="container mx-auto flex flex-col lg:flex-row items-center">
                        {/* Left Content */}
                        <div className="lg:w-1/2">
                            <h1 className="text-5xl font-extrabold mb-6">
                                Discover Exclusive Deals
                            </h1>
                            <p className="text-lg mb-8 pr-4">
                                Explore our handpicked collections, limited-time discounts, and the latest trends in fashion, electronics, and more.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center sm:gap-4 gap-2">
                                <button
                                    onClick={() => window.open("/user/products", '_blank')}
                                    className="bg-white text-[#36454F] py-3 px-8 rounded-lg font-bold hover:bg-gray-200 transition"
                                >
                                    Start Shopping
                                </button>
                                <button
                                    onClick={() => navigate("/learn-more")}
                                    className="bg-transparent border-2 border-white py-3 px-8 rounded-lg font-bold hover:bg-white hover:text-[#36454F] transition"
                                >
                                    Learn More
                                </button>
                            </div>
                        </div>

                        {/* Right Content */}
                        <div className="lg:w-1/2 mt-10 lg:mt-0">
                            <img
                                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
                                alt="Hero Banner"
                                className="w-full h-auto rounded-lg shadow-lg"
                            />
                        </div>
                    </div>
                </section>



                {/* Latest Products Section */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto">
                        <h2 className="relative text-3xl font-bold text-center text-[#36454F] mb-12" >
                            Explore Our Products
                            <div className="absolute left-[8%] right-0 mx-auto h-[3px] bg-[#A555F7] w-[15%] top-full mt-2"></div>
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-between">
                            {displayedProducts.map((product, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition"
                                >
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-48 rounded-lg transition-transform duration-300 transform hover:scale-110"
                                    />
                                    <h3 className="text-lg font-bold text-gray-800 mt-4">
                                        {product.name}
                                    </h3>
                                    <p className="text-gray-600 mt-2">{product.description}</p>
                                    <p className="text-indigo-600 font-bold mt-2">
                                        $ {product.price.toFixed(2)}
                                    </p>
                                    <button
                                        className="bg-indigo-600 text-white py-2 mt-4 rounded-lg hover:bg-indigo-500 transition w-full"
                                        onClick={() => navigate('/login')}
                                    >
                                        View Details
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-12">
                            <button
                                className="bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-500 transition"
                                onClick={handleLoadMore}
                            >
                                Load More
                            </button>
                        </div>
                    </div>
                </section>
                <Box sx={{ textAlign: "center", padding: 4 }} className="bg-[#928dee] relative" >
                    <div className='absolute left-[65%] top-[50%]'>
                        <svg width="80%" height="20%" viewBox="0 0 198 98" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_d)">
                                <path d="M181.651 90.6222L178.049 77.9643L190.642 81.1245L181.651 90.6222Z" fill="#ffffff"></path>
                            </g>
                            <g filter="url(#filter1_d)">
                                <path d="M5.06821 23.7085C11.8577 18.4987 116.141 0.127073 128.03 4.71073C133.156 6.68695 137.191 8.74997 138.824 12.2559C139.832 14.4169 139.719 15.9896 138.524 18.1758C135.462 23.7804 118.221 24.8966 118.81 18.9659C119.2 15.0361 123.871 13.2048 128.18 11.4263C132.489 9.64789 155.225 5.01909 169.743 9.75353C178.057 12.4647 188.56 22.0095 190.583 28.9142C193.869 40.1238 186.85 71.5283 186.09 73.9658"
                                    stroke="#ffffff"
                                    stroke-width="2.53575"
                                    stroke-linecap="round"
                                    stroke-dasharray="5.07 5.07"
                                    shape-rendering="crispEdges">
                                </path>
                            </g>
                            <defs>
                                <filter id="filter0_d" x="174.668" y="77.9644" width="19.355" height="19.4198" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                    <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
                                    <feOffset dy="3.381"></feOffset>
                                    <feGaussianBlur stdDeviation="1.6905"></feGaussianBlur>
                                    <feComposite in2="hardAlpha" operator="out"></feComposite>
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"></feBlend>
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"></feBlend>
                                </filter>
                                <filter id="filter1_d" x="0.419781" y="2.71875" width="195.681" height="79.2777" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                    <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
                                    <feOffset dy="3.381"></feOffset>
                                    <feGaussianBlur stdDeviation="1.6905"></feGaussianBlur>
                                    <feComposite in2="hardAlpha" operator="out"></feComposite>
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"></feBlend>
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"></feBlend>
                                </filter>
                            </defs>
                        </svg>
                    </div>
                    <Typography variant="h4" fontWeight="bold" color="white" className='relative'>
                        Why Choose <span className="text-[#DCE0E4]">Us </span><span className="font-bold text-[50px] pl-4 ">?</span>
                        <div className="absolute left-[3%] right-0 mx-auto h-[3px] bg-[#ffffff] w-[12%] top-full mt-2"></div>
                    </Typography>
                </Box>
                <WhyChooseUs />

                {/* Testimonials Section */}
                <TestimonialSection />

                <section className="py-20 bg-gradient-to-br bg-[#6C69B0] text-white">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="relative text-4xl font-extrabold mb-6 text-center">
                            Stay Connected with Us
                            <div className="absolute left-[13%] right-0 mx-auto h-[3px] bg-[#ffffff] w-[20%] bottom-[-15px]"></div>
                        </h2>
                        <p className="text-lg mb-8 max-w-2xl mx-auto">
                            Subscribe to our newsletter to receive exclusive updates, offers, and the latest trends right in your inbox.
                        </p>
                        <div
                            // onSubmit={handleSubscribeNewsletter}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-3xl mx-auto"
                        >
                            <input
                                type="email"
                                value={subscribeEmail}
                                onChange={(e) => setSubscribeEmail(e.target.value)}
                                placeholder="Enter your email address"
                                required
                                className="px-6 py-3 rounded-lg w-full sm:w-auto text-gray-800 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                            />
                            <button
                                type="submit"
                                onClick={handleSubscribeNewsletter}
                                className="bg-white text-[#444261] px-8 py-3 rounded-lg font-bold shadow-md hover:bg-purple-100 transition transform hover:scale-105"
                            >
                                Subscribe
                            </button>
                        </div>
                        <p className="text-sm mt-4 text-gray-200">
                            We value your privacy. Your email will not be shared.
                        </p>
                    </div>
                </section>

            </div>
        </>
    )
}

export default HomePage