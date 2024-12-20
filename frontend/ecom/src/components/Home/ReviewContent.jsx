import React from "react";
import image1 from "/images/image1.jpeg";
import image2 from "/images/image2.jpeg";
import image3 from "/images/image3.jpeg";
import image4 from "/images/image4.jpeg";
import ReviewCard from "./ReviewSlider";

function ReviewContent() {
    const reviews = [
        {
            id: "1",
            image: image1,
            text: "The best shopping experience ever. Fast delivery and amazing products!",
            name: "John Doe",
        },
        {
            id: "2",
            image: image2,
            text: "I love the personalized recommendations, I always find something I like!",
            name: "Jane Smith",
        },
        {
            id: "3",
            image: image3,
            text: "Great customer service and quick checkout. Highly recommend!",
            name: "Mark Johnson",
        },
        {
            id: "4",
            image: image4,
            text: "Amazing platform with great services!",
            name: "Cury Peter",
        },
    ];

    return (
        <div>
            <ReviewCard reviews={reviews} />
        </div>
    );
}

export default ReviewContent;
