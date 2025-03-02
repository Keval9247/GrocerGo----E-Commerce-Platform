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
import UserWishlist from "./pages/UserWishlist";
import CheckoutSuccessPage from "./pages/CheckoutSuccessPage";
import CheckoutCancelPage from "./pages/CheckoutCancelPage";
import UserOrders from "./pages/UserOrders";
import PrivacyPolicy from "./pages/PrivacyPlicyPage";

export const CartContent = createContext();

function App() {

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginLayout />} />
          <Route path="/signup" element={<SignupLayout />} />
          <Route path="/forgot-password" element={<ForgotLayout />} />
          <Route path="/contact" element={<UserContact />} />
          <Route path="/about" element={<HomeAbout />} />
          <Route path="/learn-more" element={<LearnMore />} />
          <Route path="/faqs" element={<FAQ />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          <Route element={<UserLayout />}>
            <Route path="/user/categories" element={<Categories />} />
            <Route path="/user/products" element={<ProductsPage />} />
            <Route path="/user/products/:id" element={<ProductsDetails />} />
            <Route
              path="/user"
              element={<ProtectedRoute allowedRoles={[ROLES.USER]} />}
            >
              <Route path="cart" element={<Cart />} />
              <Route path="orders/:userId" element={<UserOrders />} />
              <Route path="ayment/success" element={<CheckoutSuccessPage />} />
              <Route path="payment/cancel" element={<CheckoutCancelPage />} />
              <Route path="wish-list" element={<UserWishlist />} />
              <Route path="profile/:id" element={<UserProfile />} />
              <Route path="settings" element={<UserSettings />} />
            </Route>
            <Route path="/contact" element={<UserContact />} />
          </Route>
        </Route>

        <Route
          path="/admin"
          element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]} />}
        >
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

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
