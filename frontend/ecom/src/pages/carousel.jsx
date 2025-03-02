import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const features = [
    { title: "Exclusive Products", description: "Discover unique, high-quality products curated just for you.", icon: "/images/discount.png" },
    { title: "Fast & Reliable Shipping", description: "Enjoy swift delivery services with same-day or next-day shipping options.", icon: "/images/fast.png" },
    { title: "Secure Payments", description: "Shop with peace of mind using our secure payment methods.", icon: "/images/payment.png" },
    { title: "24/7 Customer Support", description: "Our dedicated support team is here to assist you anytime.", icon: "/images/24-7.png" },
    { title: "Hassle-Free Returns", description: "Not satisfied? Enjoy a seamless return process with no hidden charges.", icon: "/images/returns.png" },
    { title: "Loyalty Rewards Program", description: "Earn points on every purchase and redeem them for discounts.", icon: "/images/loyalty.png" },
    { title: "Best Price Guarantee", description: "We offer competitive pricing and match any competitor’s price.", icon: "/images/lowprice.jpeg" },
    { title: "Authentic Reviews", description: "Read real customer feedback before making a purchase.", icon: "/images/reviews.jpeg" },
    { title: "Eco-Friendly Packaging", description: "We use sustainable materials for minimal environmental impact.", icon: "/images/eco.png" },
    { title: "Exclusive Member Deals", description: "Join our VIP club for special discounts and early access.", icon: "/images/vip.jpeg" },
];

const WhyChooseUs = () => {
    const settings = {
        infinite: true,
        speed: 800,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        pauseOnHover: false,
        fade: false,
        centerMode: true,
        focusOnSelect: true,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } },
        ],
    };

    return (
        <>
            <div className="bg-[#928DEE] py-10">
                <div className="w-[90%] mx-auto px-4">
                    <Slider {...settings} className="overflow-visible">
                        {features.map((feature, index) => (
                            <div key={index} className="p-7">
                                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center min-h-full transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                                    <img src={feature.icon} alt={feature.title} className="w-16 h-16 mb-3" />
                                    <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
                                    <p className="text-gray-600 text-sm mt-2">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </>
    );
};

export default WhyChooseUs;
