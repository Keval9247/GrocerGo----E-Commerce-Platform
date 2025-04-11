import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Box,
    Typography,
    Button,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/system';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const StyledButton = styled(Button)(({ theme }) => ({
    fontWeight: 'bold',
    borderRadius: '25px',
    transition: 'all 0.3s ease',
    textTransform: 'capitalize',
    fontSize: '16px',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '0%',
        height: '2px',
        backgroundColor: '#4F46E5',
        transition: 'width 0.3s ease',
    },
    '&:hover:after': {
        width: '100%',
    },
}));

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleScrollOrNavigate = () => {
        if (location.pathname === '/') {
            const element = document.getElementById('whygrocergo');
            if (element) {
                element.scrollIntoView({ top: 500, behavior: 'smooth' });
            }
        } else {
            navigate('/');
            setTimeout(() => {
                window.scrollTo({ top: 3200, behavior: 'smooth' });
            }, 1000);
        }
        setDrawerOpen(false);
    };

    const navLinks = [
        { label: 'Why GrocerGo', action: handleScrollOrNavigate },
        { label: 'Contact', path: '/contact' },
        { label: 'FAQs', path: '/faqs' },
    ];

    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(2px)',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    zIndex: 1000,
                    padding: { xs: '0.5rem 1rem', md: '0.5rem 2rem' },
                    fontFamily: 'Poppins, sans-serif',
                    color: '#4F46E5',
                }}
            >
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                            src="/images/logonew.png"
                            alt="GrocerGo Logo"
                            style={{ height: '60px', marginRight: '10px' }}
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <Box
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            alignItems: 'center',
                            gap: '2rem',
                        }}
                    >
                        {navLinks.map((link, index) =>
                            link.path ? (
                                <StyledButton
                                    key={index}
                                    onClick={() => navigate(link.path)}
                                    sx={{ color: '#847c94' }}
                                >
                                    {link.label}
                                </StyledButton>
                            ) : (
                                <StyledButton
                                    key={index}
                                    onClick={link.action}
                                    sx={{ color: '#847c94' }}
                                >
                                    {link.label}
                                </StyledButton>
                            )
                        )}
                    </Box>

                    {/* Auth Buttons (Desktop) */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: '1rem' }}>
                        <Button
                            variant="outlined"
                            sx={{
                                borderColor: '#4F46E5',
                                color: '#4F46E5',
                                '&:hover': { backgroundColor: '#4F46E5', color: '#fff' },
                            }}
                            component={Link}
                            to="/login"
                        >
                            Login
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#4F46E5',
                                color: '#fff',
                                '&:hover': {
                                    backgroundColor: '#3C3AEB',
                                },
                            }}
                            component={Link}
                            to="/signup"
                        >
                            Sign Up
                        </Button>
                    </Box>

                    {/* Mobile Menu Icon */}
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={() => setDrawerOpen(true)}
                        sx={{ display: { xs: 'flex', md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Mobile Drawer */}
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                <Box sx={{ width: 250, padding: 2 }}>
                    <Box display="flex" justifyContent="flex-end">
                        <IconButton onClick={() => setDrawerOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <List>
                        {navLinks.map((link, index) => (
                            <ListItem key={index} disablePadding>
                                <ListItemButton
                                    onClick={() =>
                                        link.path ? navigate(link.path) : link.action()
                                    }
                                >
                                    <ListItemText primary={link.label} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="/login">
                                <ListItemText primary="Login" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="/signup">
                                <ListItemText primary="Sign Up" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </>
    );
};

export default Header;
