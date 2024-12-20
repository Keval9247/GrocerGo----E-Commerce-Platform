import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Card, CardContent, Typography, useTheme } from "@mui/material";

const features = [
    {
        title: "Exclusive Products",
        description:
            "Discover a wide selection of unique, high-quality products carefully curated just for you. From exclusive designer pieces to hard-to-find items, we bring you options that stand out.",
        icon: "/images/discount.png",
    },
    {
        title: "Fast & Reliable Shipping",
        description:
            "Experience swift and dependable delivery services. With same-day or next-day shipping options available, your orders are always on time, no matter where you are.",
        icon: "/images/fast.png",
    },
    {
        title: "Secure Payments",
        description:
            "Shop with peace of mind using our highly secure, encrypted payment options. We accept multiple payment methods, including credit cards, ensuring a seamless checkout experience.",
        icon: "/images/payment.png",
    },
    {
        title: "24/7 Customer Support",
        description:
            "Have questions or concerns? Our dedicated support team is available around the clock to assist you via chat, email, or phone. Your satisfaction is our top priority.",
        icon: "/images/24-7.png",
    },
    {
        title: "Hassle-Free Returns",
        description:
            "Not satisfied with your purchase? Enjoy a seamless return process with no hidden charges. We make refunds and exchanges quick and easy.",
        icon: "/images/returns.png",
    },
    {
        title: "Loyalty Rewards Program",
        description:
            "Earn points on every purchase and redeem them for discounts on future orders. Sign up today and start enjoying exclusive member perks.",
        icon: "/images/loyalty.png",
    },
];

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "5px",
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                centerMode: false,
                centerPadding: "0px",
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: false,
                centerPadding: "0px",
            },
        },
    ],
};

const WhyChooseUs = () => {
    const theme = useTheme();

    return (
        <Box sx={{ py: 5, bgcolor: "background.default" }}>
            <Box sx={{ textAlign: "center", mb: 4 }}>
                <Typography variant="h4" color="text.primary" fontWeight="bold">
                    Why Choose Us?
                </Typography>
            </Box>
            <Box sx={{ px: 3 }}>
                <Slider {...settings}>
                    {features.map((feature, index) => (
                        <Box key={index} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Card
                                sx={{
                                    width: 350,
                                    height: 280,
                                    bgcolor: theme.palette.background.paper,
                                    boxShadow: 3,
                                    p: 2,
                                    borderRadius: 2,
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        boxShadow: 6,
                                    },
                                }}
                            >
                                <Box
                                    component="img"
                                    src={feature.icon}
                                    alt={feature.title}
                                    sx={{
                                        width: 64,
                                        height: 64,
                                        mx: "auto",
                                        mb: 2,
                                    }}
                                />
                                <CardContent>
                                    <Typography
                                        variant="h6"
                                        textAlign="center"
                                        color="primary"
                                        fontWeight="bold"
                                        mb={1}
                                    >
                                        {feature.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        textAlign="center"
                                        color="text.secondary"
                                    >
                                        {feature.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Box>
                    ))}
                </Slider>
            </Box>
        </Box>
    );
};

export default WhyChooseUs;
