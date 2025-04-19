import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8 flex justify-center items-center mt-20 ">
            <div className="max-w-[1200px] w-full bg-white/80 backdrop-blur-md p-10 rounded-2xl shadow-2xl border border-gray-200">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">Privacy Policy</h1>
                <p className="text-gray-500 text-center text-sm mb-6">Last Updated: 02-03-2025, 13:59 PM</p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Information We Collect</h2>
                    <p className="text-gray-600 mb-4">We may collect the following types of information:</p>
                    <ul className="list-disc pl-5 text-gray-600 space-y-2">
                        <li className="hover:text-blue-600 transition">Name</li>
                        <li className="hover:text-blue-600 transition">Email Address</li>
                        <li className="hover:text-blue-600 transition">Phone Number</li>
                        <li className="hover:text-blue-600 transition">Shipping Address</li>
                        <li className="hover:text-blue-600 transition">Billing Address</li>
                        <li className="hover:text-blue-600 transition">Payment Information (e.g., credit card details)</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. How We Use Your Information</h2>
                    <p className="text-gray-600 mb-4">We use the information we collect for the following purposes:</p>
                    <ul className="list-disc pl-5 text-gray-600 space-y-2">
                        <li className="hover:text-blue-600 transition">To process and deliver your orders.</li>
                        <li className="hover:text-blue-600 transition">To improve our services and website functionality.</li>
                        <li className="hover:text-blue-600 transition">To communicate with you about your orders and promotions.</li>
                        <li className="hover:text-blue-600 transition">To ensure the security of your data.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. How We Protect Your Information</h2>
                    <ul className="list-disc pl-5 text-gray-600 space-y-2">
                        <li className="hover:text-blue-600 transition">Encryption of sensitive information.</li>
                        <li className="hover:text-blue-600 transition">Access control to limit who can view your data.</li>
                        <li className="hover:text-blue-600 transition">Regular security audits.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Sharing Your Information</h2>
                    <p className="text-gray-600 mb-4">
                        We do not sell, trade, or rent your personal information to third parties. However, we may share your information with:
                    </p>
                    <ul className="list-disc pl-5 text-gray-600 space-y-2">
                        <li className="hover:text-blue-600 transition">Service providers who assist us in operating our website.</li>
                        <li className="hover:text-blue-600 transition">Legal authorities when required by law.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Cookies and Tracking Technologies</h2>
                    <p className="text-gray-600">
                        We use cookies to enhance your experience. You can disable cookies in your browser settings, but this may affect functionality.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Your Rights</h2>
                    <ul className="list-disc pl-5 text-gray-600 space-y-2">
                        <li className="hover:text-blue-600 transition">Access your personal information.</li>
                        <li className="hover:text-blue-600 transition">Request corrections to your information.</li>
                        <li className="hover:text-blue-600 transition">Request deletion of your information.</li>
                        <li className="hover:text-blue-600 transition">Opt-out of promotional communications.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Third-Party Links</h2>
                    <p className="text-gray-600">
                        Our website may contain links to third-party websites. We are not responsible for their privacy practices.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Children's Privacy</h2>
                    <p className="text-gray-600">
                        Our website is not intended for children under 13. We do not knowingly collect personal information from children.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Changes to This Privacy Policy</h2>
                    <p className="text-gray-600">
                        We may update this Privacy Policy from time to time. Any changes will be posted on this page.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Governing Law</h2>
                    <p className="text-gray-600">This Privacy Policy is governed by the laws of Gujarat, India.</p>
                </section>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
