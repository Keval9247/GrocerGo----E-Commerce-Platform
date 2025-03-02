import React, { useState } from 'react';

const faqData = [
    {
        question: "How can I place an order?",
        answer: "You can place an order by browsing our products, adding items to your cart, and proceeding to checkout.",
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept credit/debit cards, PayPal, and other popular payment methods.",
    },
    {
        question: "How long does shipping take?",
        answer: "Shipping typically takes 3-5 business days, depending on your location.",
    },
    {
        question: "Can I return or exchange a product?",
        answer: "Yes, we offer a 30-day return policy. Please ensure the product is unused and in its original packaging.",
    },
    {
        question: "How do I track my order?",
        answer: "Once your order is shipped, you will receive a tracking number via email to monitor your shipment.",
    },
    {
        question: "Do you offer international shipping?",
        answer: "Yes, we ship internationally. Shipping costs and delivery times vary by country.",
    },
];
const FAQSection = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="py-40 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
                    Frequently Asked Questions
                </h2>
                <div className="max-w-3xl mx-auto space-y-4">
                    {faqData.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-md overflow-hidden"
                        >
                            <button
                                onClick={() => toggleAccordion(index)}
                                className="w-full flex justify-between items-center p-6 focus:outline-none"
                            >
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {faq.question}
                                </h3>
                                <span className="text-gray-500">
                                    {activeIndex === index ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 15l7-7 7 7"
                                            />
                                        </svg>
                                    )}
                                </span>
                            </button>
                            {activeIndex === index && (
                                <div className="px-6 pb-6">
                                    <p className="text-gray-600">{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;