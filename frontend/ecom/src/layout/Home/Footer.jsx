import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

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
            { name: 'FAQ', link: '/faqs' },
            { name: 'Contact Us', link: '#' },
        ],
        legal: [
            { name: 'Terms of Service', link: '/' },
            { name: 'Privacy Policy', link: '/privacy-policy' },
            { name: 'Licenses', link: 'https://foodlicenseportal.org/' },
        ],
    };

    return (
        <footer className="w-full bg-gray-900 text-gray-300 py-14">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
                    <div>
                        <h2 className="text-white text-3xl font-extrabold tracking-wide">GrocerGo</h2>
                        <p className="text-gray-400 mt-3 text-sm leading-relaxed">
                            Your trusted destination for fashion, accessories, and lifestyle products.
                            Experience seamless shopping with exclusive collections and great deals.
                        </p>
                    </div>

                    {Object.entries(footerContent).map(([title, items], index) => (
                        <div key={index}>
                            <h5 className="text-lg font-semibold text-white uppercase tracking-wide">{title}</h5>
                            <ul className="mt-4 space-y-3">
                                {items.map((item, idx) => (
                                    <li key={idx}>
                                        <span
                                            onClick={() => navigate(item.link)}
                                            className="cursor-pointer text-gray-400 hover:text-white transition-all duration-300 hover:tracking-wide hover:underline"
                                        >
                                            {item.name}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="border-t border-gray-700 my-10"></div>
                <div className="flex flex-col md:flex-row justify-between items-center">

                    <div className="flex space-x-6">
                        {[faFacebook, faInstagram, faTwitter, faLinkedin].map((icon, idx) => (
                            <a key={idx} href="#" className="text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-125 hover:rotate-6">
                                <FontAwesomeIcon icon={icon} size="lg" />
                            </a>
                        ))}
                    </div>
                    <div className="text-center mt-6 md:mt-0 text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} <span className="font-semibold text-white">GrocerGo</span>. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
