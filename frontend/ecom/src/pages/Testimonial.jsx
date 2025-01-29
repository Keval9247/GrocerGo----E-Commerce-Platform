import React from "react";

const testimonials = [
    {
        name: "Jane Doe",
        location: "New York, USA",
        comment:
            "Amazing quality and fast delivery! The loyalty program is a great bonus. I’m thrilled with my purchase and will definitely shop here again.",
        rating: 5,
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        purchased: "Classic Leather Bag",
    },
    {
        name: "John Smith",
        location: "London, UK",
        comment:
            "Excellent customer service and great prices. The secure payment system gave me peace of mind. Highly recommend this store for everyone!",
        rating: 4,
        image: "https://randomuser.me/api/portraits/men/47.jpg",
        purchased: "Wireless Headphones",
    },
    {
        name: "Emily Carter",
        location: "Sydney, Australia",
        comment:
            "A seamless shopping experience with outstanding product quality. Love the fast shipping and easy returns policy!",
        rating: 5,
        image: "https://randomuser.me/api/portraits/women/50.jpg",
        purchased: "Smartwatch",
    }
];

const TestimonialSection = () => {
    return (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="container mx-auto">
                <h2 className="relative text-4xl font-extrabold text-center text-[#36454F] mb-12">
                    Hear from Our Happy Customers
                    <div className="absolute left-[20%] right-0 mx-auto h-[3px] bg-[#A555F7] w-[16%] mt-3"></div>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 pt-20">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 relative"
                        >
                            <div className="absolute top-[-30px] left-[50%] transform translate-x-[-50%]">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-20 h-20 rounded-full border-4 border-indigo-600 shadow-lg"
                                />
                            </div>
                            <div className="mt-16 text-center">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {testimonial.name}
                                </h3>
                                <p className="text-sm text-gray-500 italic">{testimonial.location}</p>
                                <div className="flex justify-center mt-2">
                                    {Array.from({ length: testimonial.rating }).map((_, idx) => (
                                        <span key={idx} className="text-yellow-400 text-xl">
                                            ★
                                        </span>
                                    ))}
                                    {Array.from({ length: 5 - testimonial.rating }).map((_, idx) => (
                                        <span key={idx} className="text-gray-300 text-xl">
                                            ★
                                        </span>
                                    ))}
                                </div>
                                <p className="text-gray-600 mt-4">{testimonial.comment}</p>
                                <div className="mt-6 text-sm bg-indigo-50 py-2 px-4 rounded-lg text-indigo-600 font-semibold">
                                    Recently Purchased: {testimonial.purchased}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;
