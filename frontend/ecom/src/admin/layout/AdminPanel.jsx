import React, { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { FiBox, FiShoppingBag, FiHome, FiUsers, FiMenu, FiX, FiBarChart2, FiUser, } from "react-icons/fi";
import { ToastContainer } from "react-toastify";

const AdminPanel = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [activeLink, setActiveLink] = useState("dashboard");
    const navigate = useNavigate();
    const profileSelection = useRef();

    const username = JSON.parse(localStorage.getItem("UserEmail"))?.name || "Admin";
    const profileImage = null;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileSelection.current && !profileSelection.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleNavigation = (route, linkName) => {
        setActiveLink(linkName);
        navigate(route);
    };

    const handleProfile = () => {
        navigate("/admin/profile");
    };

    const handleSettings = () => {
        navigate("/admin/settings");
    };

    const handleLogout = () => {
        console.log("Logout clicked");
        localStorage.removeItem("token");
        localStorage.removeItem("UserEmail");
        navigate("/login");
    };

    const generateBreadcrumbs = () => {
        const pathnames = location.pathname.split("/").filter((x) => x);

        return (
            <nav className="flex bg-transparent p-3 rounded-lg mb-4" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <li className="inline-flex items-center">
                        <button
                            onClick={() => navigate("/admin")}
                            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
                        >
                            <FiHome className="w-4 h-4 mr-2" />
                            Home
                        </button>
                    </li>
                    {pathnames.map((value, index) => {
                        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                        const isLast = index === pathnames.length - 1;
                        return isLast ? (
                            <li key={index} className="flex items-center">
                                <svg
                                    className="w-3 h-3 text-gray-400 mx-1 rtl:rotate-180"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 6 10"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 9 4-4-4-4"
                                    />
                                </svg>
                                <span className="text-sm font-medium text-gray-500">
                                    {value.charAt(0).toUpperCase() + value.slice(1)}
                                </span>
                            </li>
                        ) : (
                            <li key={index} className="flex items-center">
                                <svg
                                    className="w-3 h-3 text-gray-400 mx-1 rtl:rotate-180"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 6 10"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 9 4-4-4-4"
                                    />
                                </svg>
                                <button
                                    onClick={() => navigate(routeTo)}
                                    className="text-sm font-medium text-gray-700 hover:text-blue-600"
                                >
                                    {value.charAt(0).toUpperCase() + value.slice(1)}
                                </button>
                            </li>
                        );
                    })}
                </ol>
            </nav>
        );
    };

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 bg-white shadow-lg transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
                    } md:translate-x-0 md:static z-50 w-64 transition-transform`}
            >
                <div className="p-4">
                    <h1 className="text-xl font-bold text-gray-800 mb-6">
                        <span className="font-semibold text-[#4132A2]">GrocerGo</span> <br />System Administration
                    </h1>
                    <nav className="space-y-4">
                        <button
                            className={`flex items-center space-x-3 p-2 w-full rounded-lg ${activeLink === "dashboard"
                                ? "bg-blue-50 text-blue-600 font-medium"
                                : "text-gray-600 hover:bg-gray-100"
                                }`}
                            onClick={() => handleNavigation("/admin", "dashboard")}
                        >
                            <FiHome size={20} />
                            <span>Dashboard</span>
                        </button>
                        <button
                            className={`flex items-center space-x-3 p-2 w-full rounded-lg ${activeLink === "products"
                                ? "bg-blue-50 text-blue-600 font-medium"
                                : "text-gray-600 hover:bg-gray-100"
                                }`}
                            onClick={() => handleNavigation("/admin/products", "products")}
                        >
                            <FiBox size={20} />
                            <span>Products</span>
                        </button>
                        <button
                            className={`flex items-center space-x-3 p-2 w-full rounded-lg ${activeLink === "orders"
                                ? "bg-blue-50 text-blue-600 font-medium"
                                : "text-gray-600 hover:bg-gray-100"
                                }`}
                            onClick={() => handleNavigation("/admin/orders", "orders")}
                        >
                            <FiShoppingBag size={20} />
                            <span>Orders</span>
                        </button>
                        <button
                            className={`flex items-center space-x-3 p-2 w-full rounded-lg ${activeLink === "users"
                                ? "bg-blue-50 text-blue-600 font-medium"
                                : "text-gray-600 hover:bg-gray-100"
                                }`}
                            onClick={() => handleNavigation("/admin/users", "users")}
                        >
                            <FiUsers size={20} />
                            <span>Users</span>
                        </button>
                        <button
                            className={`flex items-center space-x-3 p-2 w-full rounded-lg ${activeLink === "analytics"
                                ? "bg-blue-50 text-blue-600 font-medium"
                                : "text-gray-600 hover:bg-gray-100"
                                }`}
                            onClick={() => handleNavigation("/admin/analytics", "analytics")}
                        >
                            <FiBarChart2 size={20} />
                            <span>Analytics</span>
                        </button>
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Navbar */}
                <header className="bg-white shadow-md px-4 py-5 flex justify-between items-center">
                    {/* Left Section: Menu Toggle and Greeting */}
                    <div className="flex items-center">
                        <button
                            className="md:hidden text-gray-700 mr-4 focus:outline-none"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? (
                                <FiX size={24} className="text-gray-700" />
                            ) : (
                                <FiMenu size={24} className="text-gray-700" />
                            )}
                        </button>
                        <h1 className="text-lg font-semibold text-gray-800">
                            Hello, <span className="text-blue-600">{username}</span> 👋
                        </h1>
                    </div>

                    {/* Right Section: Profile and Logout */}
                    <div className="relative" ref={profileSelection}>
                        <button
                            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            {profileImage ? (
                                <img
                                    src={profileImage}
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                            ) : (
                                <FiUser size={24} className="text-gray-700" />
                            )}
                            <span className="hidden md:block text-gray-600 font-medium">{username}</span>
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                                <ul className="py-3 px-3 text-center">
                                    <li
                                        className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 cursor-pointer rounded-lg items-center"
                                        onClick={handleProfile}
                                    >
                                        View Profile
                                    </li>
                                    <li
                                        className="px-4 py-2 mt-1 text-sm text-gray-600 hover:bg-gray-100 cursor-pointer rounded-lg"
                                        onClick={handleSettings}
                                    >
                                        Settings
                                    </li>
                                    <li
                                        className="border-t px-4 mt-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 cursor-pointer rounded-lg"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </header>

                {generateBreadcrumbs()}
                <ToastContainer />
                {/* Dynamic Content */}
                <main className="flex-grow p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminPanel;
