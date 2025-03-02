import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import "react-toastify/dist/ReactToastify.css";

const Footer = () => {
    const navigate = useNavigate();
    const footerContent = {
        products: [
            { name: 'Explore Products', link: '/user/products?category=All' },
            { name: "Men's Fashion", link: '/user/products?category=Fashion' },
            { name: "Women's Fashion", link: '/user/products?category=Fashion' },
            { name: 'Kids Wear', link: '/user/products?category=Fashion' },
            { name: 'Shoes & Bags', link: '/user/products?category=All' },
            { name: 'Accessories', link: '/user/products?category=All' },
        ],
        company: [
            { name: 'About Us', link: '/about' },
            { name: 'Blog', link: '#' },
            { name: 'FAQ', link: '#' },
            { name: 'Contact Us', link: '#' },
        ],
        legal: [
            { name: 'Terms of Service', link: '/' },
            { name: 'Privacy Policy', link: '/privacy-policy' },
            { name: 'Licenses', link: 'https://foodlicenseportal.org/' },
        ],
    };

    return (
        <>
            <footer className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-gray-400 py-14">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="space-y-6">
                            <img
                                src='/images/logonew.png'
                                alt="GrocerGo Logo"
                                className="w-24 cursor-pointer hover:scale-105 transition-transform duration-300"
                                onClick={() => navigate('/')}
                            />
                            <p className="text-gray-100 font-bold text-2xl">GrocerGo</p>
                        </div>

                        {Object.entries(footerContent).map(([title, items], index) => (
                            <div key={index} className="space-y-4">
                                <h5 className="text-lg font-semibold text-gray-100 uppercase">{title}</h5>
                                <ul className="space-y-2">
                                    {items.map((item, idx) => (
                                        <li key={idx}>
                                            <span
                                                onClick={() => navigate(item.link)}
                                                className="cursor-pointer text-gray-400 hover:text-white transition duration-300"
                                            >
                                                {item.name}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-gray-700 my-8"></div>

                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex space-x-6 mt-6 md:mt-0">
                            {[faFacebook, faInstagram, faTwitter, faLinkedin].map((icon, idx) => (
                                <a key={idx} href="#" className="text-gray-400 hover:text-white transition-transform transform hover:scale-125 duration-300">
                                    <FontAwesomeIcon icon={icon} size="lg" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="text-center mt-8 text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} <span className="font-semibold text-gray-300">GrocerGo</span>. All rights reserved.
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
