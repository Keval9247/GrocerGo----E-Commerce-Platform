// import React, { useState } from "react";
// import {
//     AppBar,
//     Toolbar,
//     Typography,
//     Button,
//     Drawer,
//     List,
//     ListItem,
//     ListItemText,
//     IconButton,
//     Badge,
//     InputBase,
//     Box,
//     Divider,
// } from "@mui/material";
// import { Link, useLocation } from "react-router-dom";
// import MenuIcon from "@mui/icons-material/Menu";
// import ExpandLess from "@mui/icons-material/ExpandLess";
// import ExpandMore from "@mui/icons-material/ExpandMore";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import SearchIcon from "@mui/icons-material/Search";
// import Logout from "../../pages/Logout";

// function UserlayoutHeader() {
//     const location = useLocation();
//     const [drawerOpen, setDrawerOpen] = useState(false);
//     const [activeMenu, setActiveMenu] = useState(null);

//     const navItems = [
//         { name: "Dashboard", slug: "/user/dashboard" },
//         { name: "Orders", slug: "/user/orders" },
//         { name: "Products", slug: "/user/products" },
//         { name: "Wishlist", slug: "/user/wishlist" },
//         { name: "Cart", slug: "/user/cart" },
//     ];

//     const sliderItems = [
//         {
//             name: "Home",
//             slug: "/user/",
//             menu: [
//                 { name: "Main Home", slug: "/user/home" },
//                 { name: "Featured", slug: "/user/featured" },
//                 { name: "Trending", slug: "/user/trending" },
//             ],
//         },
//         { name: "Shop", slug: "/user/shop" },
//         { name: "Offers", slug: "/user/offers" },
//         { name: "Contact Us", slug: "/user/contact" },
//     ];

//     const toggleDrawer = (open) => {
//         setDrawerOpen(open);
//     };

//     const handleMenuClick = (index) => {
//         setActiveMenu(activeMenu === index ? null : index);
//     };

//     return (
//         <>
//             {/* Header */}
//             <AppBar
//                 position="fixed"
//                 style={{
//                     backgroundColor: "#757575", // gray-500 color
//                     boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
//                 }}
//             >
//                 <Toolbar>
//                     <IconButton
//                         edge="start"
//                         color="inherit"
//                         aria-label="menu"
//                         onClick={() => toggleDrawer(true)}
//                     >
//                         <MenuIcon />
//                     </IconButton>

//                     <Typography
//                         variant="h6"
//                         sx={{
//                             flexGrow: 1,
//                             color: "#ffffff",
//                             fontWeight: "bold",
//                             textAlign: "center",
//                         }}
//                     >
//                         Grocer GO
//                     </Typography>

//                     {/* Search Bar */}
//                     <Box
//                         sx={{
//                             backgroundColor: "rgba(255, 255, 255, 0.15)",
//                             padding: "0.5rem",
//                             borderRadius: "8px",
//                             display: "flex",
//                             alignItems: "center",
//                             marginRight: "1rem",
//                         }}
//                     >
//                         <SearchIcon style={{ marginRight: "0.5rem", color: "#ffffff" }} />
//                         <InputBase
//                             placeholder="Search products..."
//                             style={{ color: "#ffffff" }}
//                         />
//                     </Box>

//                     {/* Cart */}
//                     <IconButton sx={{ color: "#ffffff" }} component={Link} to="/user/cart">
//                         <Badge badgeContent={3} color="secondary">
//                             <ShoppingCartIcon />
//                         </Badge>
//                     </IconButton>

//                     {/* Profile */}
//                     <IconButton sx={{ color: "#ffffff" }}>
//                         <AccountCircleIcon />
//                     </IconButton>

//                     {/* Logout */}
//                     <Logout />
//                 </Toolbar>
//             </AppBar>

//             {/* Side Drawer */}
//             <Drawer anchor="left" open={drawerOpen} onClose={() => toggleDrawer(false)}>
//                 <Box sx={{ width: 250 }} role="presentation" onClick={() => toggleDrawer(false)}>
//                     <Typography
//                         variant="h6"
//                         sx={{
//                             textAlign: "center",
//                             padding: "1rem",
//                             backgroundColor: "#757575", // gray-500 color
//                             color: "white",
//                         }}
//                     >
//                         Navigation
//                     </Typography>
//                     <Divider />
//                     <List>
//                         {sliderItems.map((item, index) => (
//                             <div key={item.name}>
//                                 <ListItem
//                                     button
//                                     component={Link}
//                                     to={item.slug}
//                                     onClick={() => handleMenuClick(index)}
//                                     sx={{
//                                         padding: "1rem",
//                                         backgroundColor: item.slug === location.pathname ? "#d1e3fc" : "transparent",
//                                         "&:hover": {
//                                             backgroundColor: "#e3f2fd",
//                                         },
//                                     }}
//                                 >
//                                     <ListItemText primary={item.name} />
//                                     {item.menu && (activeMenu === index ? <ExpandLess /> : <ExpandMore />)}
//                                 </ListItem>

//                                 {/* Submenu */}
//                                 {item.menu && activeMenu === index && (
//                                     <List sx={{ pl: 4 }}>
//                                         {item.menu.map((submenuItem) => (
//                                             <ListItem
//                                                 key={submenuItem.name}
//                                                 button
//                                                 component={Link}
//                                                 to={submenuItem.slug}
//                                                 sx={{
//                                                     padding: "0.8rem",
//                                                     backgroundColor:
//                                                         submenuItem.slug === location.pathname
//                                                             ? "#bbdefb"
//                                                             : "transparent",
//                                                     "&:hover": {
//                                                         backgroundColor: "#e1f5fe",
//                                                     },
//                                                 }}
//                                             >
//                                                 <ListItemText primary={submenuItem.name} />
//                                             </ListItem>
//                                         ))}
//                                     </List>
//                                 )}
//                             </div>
//                         ))}
//                     </List>
//                     <Divider />
//                     <List>
//                         {navItems.map((nav) => (
//                             <ListItem
//                                 button
//                                 component={Link}
//                                 to={nav.slug}
//                                 key={nav.name}
//                                 sx={{
//                                     padding: "1rem",
//                                     backgroundColor: nav.slug === location.pathname ? "#d1e3fc" : "transparent",
//                                     "&:hover": {
//                                         backgroundColor: "#e3f2fd",
//                                     },
//                                 }}
//                             >
//                                 <ListItemText primary={nav.name} />
//                             </ListItem>
//                         ))}
//                     </List>
//                 </Box>
//             </Drawer>
//         </>
//     );
// }

// export default UserlayoutHeader;


import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <AppBar position="sticky" sx={{ backgroundColor: '#2D3748' }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    eCommerce Dashboard
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button color="inherit" component={Link} to="/profile">
                        Profile
                    </Button>
                    <Button color="inherit" component={Link} to="/orders">
                        Orders
                    </Button>
                    <Button color="inherit">Logout</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
