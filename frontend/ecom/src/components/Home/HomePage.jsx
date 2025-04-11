import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ArrowUpRight } from 'lucide-react';
import Slider from 'react-slick';
import { useAuth0 } from '@auth0/auth0-react';

import WhyChooseUs from '../../pages/carousel';
import TestimonialSection from '../../pages/Testimonial';
import Loading from '../../utils/Loading';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HomePage() {
    const navigate = useNavigate();
    const [subscribeEmail, setSubscribeEmail] = useState('');
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth0();

    const heroImages = [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        "https://images.unsplash.com/photo-1525904097878-94fb15835963",
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        autoplay: true,
        autoplaySpeed: 2500,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch('/json/SampleProducts.json');
                const data = await response.json();
                setDisplayedProducts(data);
            } catch (error) {
                toast.error('Failed to fetch products.');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleSubscribeNewsletter = async () => {
        if (subscribeEmail) {
            setLoading(true);
            try {
                await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/subscribe/`, { email: subscribeEmail });
                toast.success('Subscribed successfully!');
                setSubscribeEmail('');
            } catch (error) {
                toast.error('Failed to subscribe.');
            } finally {
                setLoading(false);
            }
        } else {
            toast.error('Please enter a valid email.');
        }
    };

    const handleLoadMore = () => {
        setLoading(true);
        setTimeout(() => {
            window.open('/user/products?category=All', '_blank');
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="bg-gray-50 min-h-screen pt-20">
            {loading && <Loading />}

            {/* Hero Section */}
            <section className="relative w-full">
                <Slider {...settings}>
                    {heroImages.map((img, i) => (
                        <div key={i}>
                            <img src={img} alt="Hero" className="w-full h-[90vh] object-cover" />
                        </div>
                    ))}
                </Slider>
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center px-4 text-white">
                    <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
                        Elevate Your Shopping Experience
                    </h1>
                    <p className="text-base sm:text-lg max-w-2xl mb-6">
                        Discover curated collections, exclusive member deals, and faster delivery – all in one place.
                    </p>
                    <div className="flex gap-4 flex-wrap justify-center">
                        <button
                            className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-indigo-500 transition"
                            onClick={() => navigate('/user/products?category=All')}
                        >
                            Shop Now <ArrowUpRight />
                        </button>
                        <button
                            className="bg-white text-indigo-700 px-6 py-3 rounded-full font-semibold border border-indigo-500 hover:bg-indigo-50"
                            onClick={() => navigate('/learn-more')}
                        >
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            {/* Products */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {displayedProducts.map((product, index) => (
                            <div key={index} className="bg-white rounded-xl overflow-hidden shadow group transition-transform hover:scale-105">
                                <img src={product.image} alt={product.name} className="h-48 w-full object-cover" />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                                    <p className="text-sm text-gray-500 mt-1">{product.description}</p>
                                    <div className="mt-3 flex justify-between items-center">
                                        <span className="text-indigo-600 font-bold">$ {product.price.toFixed(2)}</span>
                                        <button
                                            className="text-sm text-white bg-indigo-500 px-4 py-1 rounded-full hover:bg-indigo-600"
                                            onClick={() => navigate('/login')}
                                        >
                                            View
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-10">
                        <button
                            className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-500"
                            onClick={handleLoadMore}
                        >
                            Load More
                        </button>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <WhyChooseUs />

            {/* Testimonials */}
            <TestimonialSection />

            {/* Newsletter */}
            <section className="bg-white py-20 px-4 border-t">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-extrabold text-gray-800">Stay Updated</h2>
                    <p className="text-gray-600 mt-2 mb-6">
                        Subscribe to our newsletter and never miss a deal or product update.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <input
                            type="email"
                            value={subscribeEmail}
                            onChange={(e) => setSubscribeEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="px-4 py-3 rounded-full border border-gray-300 w-full sm:w-auto focus:ring-2 focus:ring-indigo-300"
                        />
                        <button
                            onClick={handleSubscribeNewsletter}
                            className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-500"
                        >
                            Subscribe
                        </button>
                    </div>
                    <p className="text-xs text-gray-400 mt-3">
                        Your privacy is safe with us. We don’t share your email.
                    </p>
                </div>
            </section>
        </div>
    );
}

export default HomePage;
