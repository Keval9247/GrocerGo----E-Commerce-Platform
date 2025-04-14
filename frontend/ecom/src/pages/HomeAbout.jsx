import {
    CheckCircleIcon,
    Globe,
    HeartIcon,
    TruckIcon,
    UsersIcon,
    StarIcon,
    ShoppingCartIcon
} from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {

    const navigate = useNavigate();

    return (
        <div className="bg-gray-50 text-gray-800 mt-20">

            <section className="relative text-center py-24 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
                <div className="absolute inset-0 bg-black opacity-20" />
                <div className="relative z-10">
                    <h1 className="text-5xl font-bold mb-4">Our Story</h1>
                    <p className="text-xl max-w-2xl mx-auto mb-4">
                        Redefining the online shopping experience with quality, care, and style.
                    </p>
                    <p className="text-md max-w-xl mx-auto">
                        We’re passionate about building a sustainable and customer-first grocery experience.
                    </p>
                </div>
            </section>

            {/* Who We Are Section */}
            <section className="container mx-auto py-20 px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <img
                        src="https://img.freepik.com/premium-vector/concept-co-working-teamwork-illustration_145666-1283.jpg"
                        alt="Our Team"
                        className="rounded-xl shadow-xl hover:scale-105 transition duration-500"
                    />
                    <div>
                        <h2 className="text-4xl font-bold mb-4">Who We Are</h2>
                        <p className="text-gray-700 leading-relaxed">
                            At <strong>GrocerGo</strong>, we go beyond groceries. We bring convenience and care to your door.
                            Our team is driven by innovation, sustainability, and a customer-centric philosophy that shapes
                            every experience you have with us.
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Mission */}
            <section className="bg-white py-20">
                <div className="container mx-auto text-center px-4">
                    <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
                    <p className="text-gray-700 max-w-2xl mx-auto">
                        Empowering busy lives with simple, high-quality grocery shopping solutions. We strive to innovate,
                        support communities, and preserve our planet—all while delivering groceries you can trust.
                    </p>
                </div>
            </section>

            {/* Sustainability Section */}
            <section className="bg-white py-20 text-center">
                <Globe className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-4xl font-bold mb-4">Committed to Sustainability</h2>
                <p className="text-gray-700 max-w-2xl mx-auto">
                    We champion eco-friendly practices—from sourcing to packaging—to protect our planet and future generations.
                </p>
            </section>

            {/* Meet the Team */}
            <section className="bg-gray-100 py-20">
                <div className="container mx-auto text-center px-4">
                    <h2 className="text-4xl font-bold mb-12">Meet the Dream Team</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {["Alex", "Sara", "John"].map((name, idx) => (
                            <div key={idx} className="bg-white rounded-xl shadow-md p-6 hover:scale-105 transition duration-300">
                                <img
                                    src={`https://randomuser.me/api/portraits/${idx % 2 === 0 ? 'men' : 'women'}/${idx + 30}.jpg`}
                                    alt={name}
                                    className="w-24 h-24 rounded-full mx-auto mb-4"
                                />
                                <h4 className="text-xl font-semibold">{name}</h4>
                                <p className="text-gray-600 text-sm">Customer Success</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Customer Testimonials */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12">What Our Customers Say</h2>
                    <div className="grid md:grid-cols-2 gap-10">
                        {[
                            { name: "Emily R.", feedback: "Fantastic service and excellent quality every time!" },
                            { name: "James L.", feedback: "GrocerGo makes grocery shopping so effortless. Highly recommend!" }
                        ].map((testimonial, idx) => (
                            <div key={idx} className="bg-gray-100 p-8 rounded-xl shadow hover:shadow-lg transition duration-300">
                                <p className="text-gray-700 italic mb-4">“{testimonial.feedback}”</p>
                                <h4 className="font-semibold">— {testimonial.name}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="text-center py-20 bg-indigo-600 text-white">
                <h2 className="text-4xl font-bold mb-6">Join Our Community</h2>
                <p className="text-lg max-w-2xl mx-auto mb-8">
                    Experience the GrocerGo difference. Sign up today and make grocery shopping enjoyable again.
                </p>
                <button className="bg-white text-indigo-600 font-semibold py-3 px-8 rounded-full hover:bg-gray-100 transition"
                    onClick={() => navigate('/user/products?category=All')}
                >
                    Start Shopping
                </button>
            </section>

        </div>
    );
};

export default AboutUs;
