import React from 'react'
import UserlayoutHeader from './UserlayoutHeader'
import UserlayoutFooter from './UserlayoutFooter'
import { Link, Outlet } from 'react-router-dom'
import { Box } from '@mui/material';
import Sidebar from './UserSidebar';
import { FiShoppingCart, FiUser } from 'react-icons/fi';

function UserLayout() {
    return (
        <>
            <header className="sticky top-0 px-56 z-50 w-full border-b bg-indigo-50 backdrop-blur supports-[backdrop-filter]:bg-indigo-50/60">
                <div className="container flex h-16 items-center">
                    {/* Logo Section */}
                    <Link to="/user/products" className="mr-6 flex items-center space-x-2">
                        <span className="text-xl font-bold">GrocerGo</span>
                    </Link>

                    {/* Navigation Links */}
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        {/* <Link to="/user/products" className="transition-colors hover:text-foreground/80">
                            Products
                        </Link> */}
                        <Link to="/user/categories" className="transition-colors hover:text-foreground/80">
                            Categories
                        </Link>
                        <Link to="/user/deals" className="transition-colors hover:text-foreground/80">
                            Deals
                        </Link>
                    </nav>

                    {/* Search and Profile Section */}
                    <div className="ml-auto flex items-center space-x-4">
                        {/* <form className="hidden lg:block">
                            <input
                                type="search"
                                placeholder="Search products..."
                                className="w-[300px] px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:ring-offset-1"
                            />
                        </form> */}
                        <div>
                            <button
                                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300"
                                aria-label="Profile"
                            >
                                <FiShoppingCart className="h-5 w-5" />
                            </button>
                        </div>
                        <div>
                            <button
                                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300"
                                aria-label="Profile"
                            >
                                <FiUser className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <Box >
                <Outlet />

            </Box>
        </>
    );
}

export default UserLayout
