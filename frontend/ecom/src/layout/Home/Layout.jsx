"use client";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
import Footer from "./Footer";
import WhyChooseUs from "../../pages/carousel";
import TestimonialSection from "../../pages/Testimonial";
import axios from "axios";
import { Box, Typography } from "@mui/material";

const Layout = ({ childern }) => {
  const location = useLocation();
  const verifyPath = location.pathname.includes('login') || location.pathname.includes('signup');

  return (
    <>
      {!verifyPath && <Header />}
      <main>
        <Outlet />
      </main>
      {!verifyPath && <Footer />}
    </>
  );
};

export default Layout;
