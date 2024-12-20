"use client";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
import Footer from "./Footer";
import WhyChooseUs from "../../pages/carousel";
import TestimonialSection from "../../pages/Testimonial";
import axios from "axios";

const Layout = () => {
  const navigate = useNavigate();
  const [subscribeEmail, setSubscribeEmail] = useState();
  console.log("🚀 ~ Layout ~ subscribeEmail:", subscribeEmail)
  const [displayedProducts, setDisplayedProducts] = useState([]);

  useEffect(() => {
    const fetchproductsjson = (async () => {
      const response = await fetch('/json/SampleProducts.json');
      console.log("🚀 ~ fetchproductsjson ~ ̥:", response)
      const data = await response.json();
      setDisplayedProducts(data);
    })
    fetchproductsjson();
  }, [])


  const validateEmail = (email) => {
    if (email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isemailTrue = regex.test(email)
      console.log("🚀 ~ validateEmail ~ isemailTrue:", isemailTrue)
      const reposnse = isemailTrue ? setSubscribeEmail(email) : setSubscribeEmail('')
      console.log("🚀 ~ validateEmail ~ reposnse:", reposnse)
      return;
    }
  };

  useEffect(() => {
  }, [subscribeEmail]);

  const handleSubscribeNewsletter = async () => {
    if (subscribeEmail) {
      // console.log("🚀 ~ handleSubscribeNewsletter ~ subscribeEmail:", subscribeEmail)
      // if (validateEmail(subscribeEmail)) {
      console.log("🚀 ~ handleSubscribeNewsletter ~ subscribeEmail:", subscribeEmail)
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/subscribe/`,
        { email: subscribeEmail }
      );
      console.log(123, response);
      toast.success('Subscribed to newsletter successfully!');
      // location.reload();
    }
    else {
      toast.error("Invalid email format.");

    }
  }



  const handleLoadMore = () => {
    toast.info("Here are some sample of products..")
    // toast.success("More products loaded!");
  };

  return (
    <>
      <div className="bg-gray-100 min-h-screen pt-20">
        <Header />
        <ToastContainer position="top-right" autoClose={2000} />

        {/* Hero Section */}
        <section className="w-full bg-gradient-to-br from-indigo-600 to-purple-500 text-white py-20 px-6">
          <div className="container mx-auto flex flex-col lg:flex-row items-center">
            {/* Left Content */}
            <div className="lg:w-1/2">
              <h1 className="text-5xl font-extrabold mb-6">
                Discover Exclusive Deals
              </h1>
              <p className="text-lg mb-8 pr-4">
                Explore our handpicked collections, limited-time discounts, and the latest trends in fashion, electronics, and more.
              </p>
              <div className="flex flex-col sm:flex-row items-center sm:gap-4 gap-2">
                <button
                  onClick={() => navigate("/login")}
                  className="bg-white text-[#36454F] py-3 px-8 rounded-lg font-bold hover:bg-gray-200 transition"
                >
                  Start Shopping
                </button>
                <button
                  onClick={() => navigate("/learn-more")}
                  className="bg-transparent border-2 border-white py-3 px-8 rounded-lg font-bold hover:bg-white hover:text-[#36454F] transition"
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:w-1/2 mt-10 lg:mt-0">
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
                alt="Hero Banner"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>



        {/* Latest Products Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center text-[#36454F] mb-12">
              Explore Our Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-between">
              {displayedProducts.map((product, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 rounded-lg transition-transform duration-300 transform hover:scale-110"
                  />
                  <h3 className="text-lg font-bold text-gray-800 mt-4">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mt-2">{product.description}</p>
                  <p className="text-indigo-600 font-bold mt-2">
                    $ {product.price.toFixed(2)}
                  </p>
                  <button
                    className="bg-indigo-600 text-white py-2 mt-4 rounded-lg hover:bg-indigo-500 transition w-full"
                    onClick={() => navigate('/login')}
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <button
                className="bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-500 transition"
                onClick={handleLoadMore}
              >
                Load More
              </button>
            </div>
          </div>
        </section>
        <WhyChooseUs />

        {/* Blog Section */}
        {/* <section className="py-20 bg-[#9896d18c]">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center text-[#36454F] mb-12">
              From Our Blog
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition"
                >
                  <img
                    src={`https://via.placeholder.com/400x200?text=Blog+Image+${index +
                      1}`}
                    alt={`Blog ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    Blog Post Title {index + 1}
                  </h3>
                  <p className="text-gray-600">
                    Discover insights and trends in the ecommerce world.
                  </p>
                  <button
                    className="mt-4 text-indigo-600 hover:underline"
                    onClick={() => navigate(`/blog/${index + 1}`)}
                  >
                    Read More
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Testimonials Section */}
        <TestimonialSection />

        <section className="py-20 bg-gradient-to-br bg-[#6C69B0] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-extrabold mb-6">
              Stay Connected with Us
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter to receive exclusive updates, offers, and the latest trends right in your inbox.
            </p>
            <div
              // onSubmit={handleSubscribeNewsletter}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-3xl mx-auto"
            >
              <input
                type="email"
                value={subscribeEmail}
                onChange={(e) => setSubscribeEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="px-6 py-3 rounded-lg w-full sm:w-auto text-gray-800 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
              <button
                type="submit"
                onClick={handleSubscribeNewsletter}
                className="bg-white text-[#444261] px-8 py-3 rounded-lg font-bold shadow-md hover:bg-purple-100 transition transform hover:scale-105"
              >
                Subscribe
              </button>
            </div>
            <p className="text-sm mt-4 text-gray-200">
              We value your privacy. Your email will not be shared.
            </p>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
};

export default Layout;
