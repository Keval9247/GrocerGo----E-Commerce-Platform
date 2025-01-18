import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from '/Grocer Go.png';
import TOSfile from '../../../public/htmlcontent/pdf/TOS.html';
import { SubscribeLetter } from '../../store/thunks/subscribe/subscribeThunk';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const Footer = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [privacy, setPrivacy] = useState(false);
    const [privacyData, setPrivacyData] = useState(null);
    const [subscribeEmail, setSubscribeEmail] = useState();

    useEffect(() => {
        fetch('../../../public/htmlcontent/pdf/TOS.html')
            .then((res) => res.text())
            .then((data) => setPrivacyData(data))
            .catch((error) => console.error('Error:', error));
    }, []);

    const handlePrint = () => {
        const printWindow = window.open(TOSfile);
        if (printWindow) {
            printWindow.focus();
            printWindow.print();
        }
    };

    const handlePrivacy = () => {
        setPrivacy(true);
    };

    const validateEmail = (email) => {
        if (email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const isemailTrue = regex.test(email)
            const reposnse = isemailTrue ? setSubscribeEmail(email) : setSubscribeEmail('')
            return;
        }
    };

    useEffect(() => {
    }, [subscribeEmail]);

    const handleSubscribeNewsletter = async () => {
        if (subscribeEmail) {
            if (validateEmail(subscribeEmail)) {
                const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/subscribe/`,
                    { email: subscribeEmail }
                );
                toast.success('Subscribed to newsletter successfully!');
                location.reload();
            }
            else {
                toast.error("Invalid email format.");
            }
        }
    }

    // Footer dynamic sections
    const footerContent = {
        products: [
            { name: 'Explore Products', link: '/user/products' },
            { name: "Men's Fashion", link: '/user/products' },
            { name: "Women's Fashion", link: '/user/products' },
            { name: 'Kids Wear', link: '/user/products' },
            { name: 'Shoes & Bags', link: '/user/products' },
            { name: 'Accessories', link: '/user/products' },
        ],
        company: [
            { name: 'About Us', link: '/about' },
            { name: 'Blog', link: '#' },
            { name: 'FAQ', link: '#' },
            { name: 'Contact Us', link: '#' },
        ],
        techUsed: [
            { name: 'MongoDB', link: 'https://www.mongodb.com/' },
            { name: 'ExpressJs', link: 'https://www.expressjs.com/' },
            { name: 'ReactJs', link: 'https://www.reactjs.org/' },
            { name: 'NodeJs', link: 'https://www.nodejs.org/' },
        ],
        legal: [
            { name: 'Terms of Service', action: handlePrint },
            { name: 'Privacy Policy', action: handlePrivacy },
            { name: 'Licenses', link: 'https://foodlicenseportal.org/' },
        ],
    };

    return (
        <>
            <ToastContainer position='top-right' />
            <footer className="w-full bg-gray-900 text-gray-400 py-10">
                <div className="container mx-auto px-4">
                    {/* Grid Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">

                        {/* Logo & Newsletter Section */}
                        <div className="space-y-4">
                            <img
                                src={logo}
                                alt="GrocerGo Logo"
                                className="w-20 cursor-pointer mb-4"
                                onClick={() => navigate('/')}
                            />
                            <p className="text-gray-100 font-bold text-xl">GrocerGo</p>
                        </div>

                        {/* Products Section */}
                        <div className="space-y-4 pl-20">
                            <h5 className="text-lg font-bold text-gray-100">Products</h5>
                            <ul className="space-y-2">
                                {footerContent.products.map((item, index) => (
                                    <li key={index}>
                                        <a
                                            href={item.link}
                                            className="text-gray-400 hover:text-gray-200 transition"
                                        >
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Company Section */}
                        <div className="space-y-4">
                            <h5 className="text-lg font-bold text-gray-100">Company</h5>
                            <ul className="space-y-2">
                                {footerContent.company.map((item, index) => (
                                    <li key={index}>
                                        <a
                                            href={item.link}
                                            className="text-gray-400 hover:text-gray-200 transition"
                                        >
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Tech Used Section */}
                        <div className="space-y-4">
                            <h5 className="text-lg font-bold text-gray-100">Tech Stack</h5>
                            <ul className="space-y-2">
                                {footerContent.techUsed.map((item, index) => (
                                    <li key={index}>
                                        <a
                                            href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-400 hover:text-gray-200 transition"
                                        >
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-700 my-6"></div>

                    {/* Legal Links and Social Icons */}
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        {/* Legal Links */}
                        <div className="flex space-x-6">
                            {footerContent.legal.map((item, index) => (
                                <a
                                    key={index}
                                    onClick={item.action ? item.action : undefined}
                                    href={item.link || '#'}
                                    className="text-gray-400 hover:text-gray-200 cursor-pointer"
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>

                        {/* Social Icons */}
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <a href="#" className="text-gray-400 hover:text-gray-200 transition">
                                <FontAwesomeIcon icon={faFacebook} size="lg" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gray-200 transition">
                                <FontAwesomeIcon icon={faInstagram} size="lg" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gray-200 transition">
                                <FontAwesomeIcon icon={faTwitter} size="lg" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gray-200 transition">
                                <FontAwesomeIcon icon={faLinkedin} size="lg" />
                            </a>
                        </div>
                    </div>

                    {/* Privacy Modal */}
                    <div
                        className={`fixed top-1/2 left-1/2 w-4/5 max-w-lg max-h-full transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg overflow-auto z-50 transition-all duration-500 ${privacy ? 'opacity-100 visible' : 'opacity-0 invisible'
                            }`}
                    >
                        <h2 className="text-lg font-bold mb-4">Privacy Policy</h2>
                        {/* <div dangerouslySetInnerHTML={{ __html: privacyData }} className="text-sm text-gray-600" /> */}
                        <button
                            onClick={() => setPrivacy(false)}
                            className="mt-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition duration-300"
                        >
                            Close
                        </button>
                    </div>

                    {/* Footer Bottom */}
                    <div className="text-center mt-6 text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} GrocerGo. All rights reserved.
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
