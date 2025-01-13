// App.js

import "./App.css";
import React, { createContext, useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import UserLayout from "./layout/userlayout/Userlayout";
import ProtectedRoute from "./Middleware/ProtetcedRoute";
import { ROLES } from "./Roles/roles";
import Layout from "./layout/Home/Layout";
import ProductsDetails from "./pages/ProductsDetails";
import Cart from "./pages/Cart";
import ContactUs from "./pages/ContactUs";
import ForgotPassword from "./pages/ForgotPassword";
import LoginLayout from "./layout/loginlayout/LoginLayout";
import SignupLayout from "./layout/signupLayout/SignupLayout";
import ForgotLayout from "./layout/forgotPass/ForgotLayout";
import HomeAbout from "./pages/HomeAbout";
import FAQ from "./pages/FAQ";
import LearnMore from "./pages/LearnMore";
import HomePage from "./components/Home/HomePage";
import AdminPanel from "./admin/layout/AdminPanel";
import Dashboard from "./admin/pages/Dashboard";
import OrderManagement from "./admin/pages/OrderManagement";
import ProductManagement from "./admin/pages/ProductManagement";
import UserManagement from "./admin/pages/UserManagement";
import Analytics from "./admin/pages/Analytics";
import AdminProfile from "./admin/pages/AdminProfile";
import AdminSettings from "./admin/pages/AdminSettings";
import AddProduct from "./admin/pages/products/AddProduct";
import EditProduct from "./admin/pages/products/EditProduct";
import Categories from "./components/Home/Category";
import ProductsPage from "./pages/Products";
import UserProfile from "./pages/UserProfile";
import UserSettings from "./pages/UserSettings";
import UserContact from "./pages/UserContact";
import NotFoundPage from "./pages/ErorrPage";
import Deals from "./pages/Deals";
import "react-toastify/dist/ReactToastify.css";
import UserWishlist from "./pages/UserWishlist";
import UserCheckout, { CheckoutPage } from "./pages/UserCheckout";

export const CartContent = createContext();

function App() {
  // const isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated);
  // const role = useSelector((state) => state.authReducer.role);
  // const navigate = useNavigate();
  // const [cartdata, setCartData] = useState()

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     if (role === ROLES.ADMIN) {
  //       navigate('/admin');
  //     } else if (role === ROLES.USER) {
  //       navigate('/user');
  //     }
  //   }
  // }, [isAuthenticated, role, navigate]);

  return (
    <>
      {/* <CartContent.Provider value={{ cartdata, setCartData }}> */}
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginLayout />} />
          <Route path="/signup" element={<SignupLayout />} />
          <Route path="/forgot-password" element={<ForgotLayout />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<HomeAbout />} />
          <Route path="/learn-more" element={<LearnMore />} />
          <Route path="/FAQ" element={<FAQ />} />

          <Route element={<UserLayout />}>
            <Route path="/user/categories" element={<Categories />} />
            <Route path="/user/deals" element={<Deals />} />
            <Route path="/user/products" element={<ProductsPage />} />
            <Route path="/user/products/:id" element={<ProductsDetails />} />
            <Route path="/user/cart" element={<Cart />} />
            <Route path="/user/wish-list" element={<UserWishlist />} />
            <Route path="/user/profile/:id" element={<UserProfile />} />
            <Route path="/user/settings" element={<UserSettings />} />
            <Route path="/user/contact" element={<UserContact />} />
            <Route path="/user/payment/checkout" element={<CheckoutPage />} />

          </Route>
        </Route>

        <Route
          path="/admin"
          element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]} />}
        >
          {/* <Route element={<AdminLayout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="solution" element={<Solution />} />
          </Route> */}
          <Route element={<AdminPanel />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="products/create-product" element={<AddProduct />} />
            <Route path="products/edit-product/:id" element={<EditProduct />} />
            <Route path="orders" element={<OrderManagement />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Route>

        <Route
          path="/user/products"
          element={<ProtectedRoute allowedRoles={[ROLES.USER]} />}
        >
          <Route element={<UserLayout />}>
            {/* Nested routes for Home */}
            <Route index element={<ProductsPage />} />
            {/* <Route path="categories/:id" element={<CategoryDetail />} /> */}
            {/* <Route path="home1" element={<Home1 />} />
            <Route path="home2" element={<Home2 />} />
            <Route path="home3" element={<Home3 />} /> */}
            {/* <Route path='about' element={<About />} /> */}
            {/* <Route path="contact" element={<Contact />} /> */}
            {/* <Route path="products-list" element={<ProductUser />} /> */}
            {/* <Route path="products-list/:_id" element={<ProductsDetails />} /> */}
            {/* <Route path="services" element={<Services />} /> */}
            {/* <Route path="authority" element={<Authority />} /> */}
            {/* <Route path='payment/:_id' element={<Payment />} /> */}
            {/* <Route path='payment/success' element={<PaymentSuccessPage />} /> */}
            {/* <Route path='cart' element={<Cart />} /> */}

            {/* <Route path='contact-us' element={<ContactUs />} /> */}
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {/* </CartContent.Provider> */}
    </>
  );
}

export default App;
