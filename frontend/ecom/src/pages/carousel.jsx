import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const features = [
    { title: "Fast & Reliable Shipping", description: "Enjoy swift delivery services with same-day or next-day shipping options.", icon: "/images/discount.png" },
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
        autoplaySpeed: 3000,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        centerMode: true,
        pauseOnHover: true,
        responsive: [
            { breakpoint: 1280, settings: { slidesToShow: 3 } },
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 640, settings: { slidesToShow: 1 } },
        ],
    };

    return (
        <section id="whygrocergo" className="bg-[#f6f7fc] py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-14">
                    Why Choose <span className="text-indigo-600">GrocerGo</span>
                </h2>
                <Slider {...settings}>
                    {features.map((feature, index) => (
                        <div key={index} className="px-4">
                            <div className="bg-white rounded-3xl p-6 h-[300px] flex flex-col items-center justify-between text-center">
                                <div className="w-24 h-24 flex items-center justify-center mb-6">
                                    <img
                                        src={feature.icon}
                                        alt={feature.title}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <div className="flex-grow flex flex-col justify-start">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                                    <p className="text-sm text-gray-600 px-2">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
};

export default WhyChooseUs;
