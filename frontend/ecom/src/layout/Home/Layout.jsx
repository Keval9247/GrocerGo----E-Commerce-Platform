import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  const location = useLocation();
  const verifyPath = location.pathname.includes('login') || location.pathname.includes('signup') || location.pathname.includes('user');

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
