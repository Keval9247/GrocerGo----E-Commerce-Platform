import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";           // Swiper core styles
import "swiper/css/pagination"; // Pagination styles
import "swiper/css/navigation"; // Navigation styles
import './review.module.css'
import { Autoplay, Pagination, Navigation } from "swiper/modules"; // Import directly from swiper

import back from '/images/backgroundreview.jpeg';

function ReviewCard({ reviews }) {
  const [reviewsAll, setReviews] = useState([]);

  useEffect(() => {
    if (Array.isArray(reviews)) {
      setReviews(reviews);
    }
  }, [reviews]);

  return (
    <section
      className="relative w-full bg-cover bg-center py-16 lg:py-20 px-4 sm:px-8 lg:px-12" // Full width and responsive padding
      style={{ backgroundImage: `url(${back})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div> {/* Dark overlay */}

      <div className="relative z-10 max-w-7xl mx-auto text-center"> {/* Max width container */}
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-8 lg:mb-12">What Our Customers Say</h3>

        {/* Swiper Slider */}
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={20}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          navigation
          loop={true}
          className="w-full" // Full-width swiper
        >
          {reviewsAll?.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="flex justify-center"> {/* Flex to center the content */}
                <div className="bg-white w-5/12 p-6 sm:p-8 lg:p-10 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 duration-300 max-w-xl lg:max-w-2xl mx-auto text-center">
                  <div className="flex justify-center mb-4 lg:mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-20 sm:w-24 lg:w-32 h-20 sm:h-24 lg:h-32 rounded-full shadow-lg object-cover"
                    />
                  </div>
                  <p className="text-gray-600 text-base sm:text-lg lg:text-xl italic mb-4">"{testimonial.text}"</p>
                  <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">- {testimonial.name}</h4>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default ReviewCard;
 