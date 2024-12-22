import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Box, Card, CardContent, Typography, useTheme } from "@mui/material";

const features = [
    {
        title: "Exclusive Products",
        description:
            "Discover unique, high-quality products curated just for you. From designer pieces to rare finds, we bring you options that stand out.",
        icon: "/images/discount.png",
    },
    {
        title: "Fast & Reliable Shipping",
        description:
            "Enjoy swift delivery services with same-day or next-day shipping options. Your orders are always on time.",
        icon: "/images/fast.png",
    },
    {
        title: "Secure Payments",
        description:
            "Shop with peace of mind using our secure payment methods. We accept multiple payment options for a seamless experience.",
        icon: "/images/payment.png",
    },
    {
        title: "24/7 Customer Support",
        description:
            "Our dedicated support team is here to assist you anytime via chat, email, or phone. Your satisfaction is our priority.",
        icon: "/images/24-7.png",
    },
    {
        title: "Hassle-Free Returns",
        description:
            "Not satisfied? Enjoy a seamless return process with no hidden charges. Refunds and exchanges made easy.",
        icon: "/images/returns.png",
    },
    {
        title: "Loyalty Rewards Program",
        description:
            "Earn points on every purchase and redeem them for discounts. Join today to enjoy exclusive perks.",
        icon: "/images/loyalty.png",
    },
];

const WhyChooseUs = () => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                py: 6,
                backgroundColor: "#d2d0f8",
                height: "100%",
                // Applied box shadow here
                borderRadius: 3, // Optional: to smoothen corners
            }}
        >
            {/* Swiper Section */}
            <Box sx={{ px: { xs: 2, md: 6, display: "flex" } }}>
                <Swiper
                    slidesPerView={4}
                    grabCursor={true}
                    centeredSlides={true}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    breakpoints={{
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                    }}
                    modules={[Pagination]}
                    className="mySwiper p-10"
                >
                    {features.map((feature, index) => (
                        <SwiperSlide key={index} className="flex-shrink">
                            <Card
                                sx={{
                                    width: 320,
                                    height: 300,
                                    p: 2,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    textAlign: "center",
                                    bgcolor: theme.palette.background.paper,
                                    boxShadow: 3,
                                    borderRadius: 3,
                                    gap: 0,
                                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                    "&:hover": {
                                        transform: "scale(1.05)",
                                        boxShadow: 6,
                                    },
                                }}
                            >
                                {/* Icon */}
                                <Box
                                    component="img"
                                    src={feature.icon}
                                    alt={feature.title}
                                    sx={{
                                        width: 70,
                                        height: 70,
                                        mb: 2,
                                    }}
                                />

                                {/* Content */}
                                <CardContent sx={{ justifyContent: "space-between", display: "flex", flexDirection: "column" }}>
                                    <Typography variant="h6" fontWeight="bold" color="primary.main">
                                        {feature.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" mt={1}>
                                        {feature.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
        </Box>
    );
};

export default WhyChooseUs;
