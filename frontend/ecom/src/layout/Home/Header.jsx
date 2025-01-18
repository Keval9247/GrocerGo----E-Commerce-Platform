import React from 'react';
import { AppBar, Button, Toolbar, Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const StyledButton = styled(Button)(({ theme }) => ({
    fontWeight: 'bold',
    borderRadius: '25px',
    transition: 'all 0.3s ease',
    textTransform: 'capitalize',
    fontSize: '16px',
    // '&:hover': {
    //     transform: 'translateY(-2px)',
    //     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    // },
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

    return (
        <AppBar
            position="fixed"
            sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(2px)',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                zIndex: 1000,
                padding: '0.5rem 2rem',
            }}
        >
            <Toolbar
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                {/* Logo Section */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                            src='/Grocer Go.png'
                            alt="GrocerGo Logo"
                            style={{ height: '50px', marginRight: '10px' }}
                        />
                        <Typography
                            variant="h6"
                            sx={{
                                fontFamily: 'Coiny, cursive',
                                color: '#4F46E5',
                                fontSize: '20px',
                            }}
                        >
                            GrocerGo
                        </Typography>
                    </Link>
                </Box>

                {/* Navigation Links */}
                <Box sx={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <StyledButton
                        onClick={() => {
                            if (location.pathname === '/') { window.scrollTo({ top: 3250, behavior: 'smooth' }) }
                            else {
                                navigate('/')
                                setTimeout(() => {
                                    window.scrollTo({ top: 3250, behavior: 'smooth' })
                                }, 1000)
                            }
                        }}
                        sx={{ color: '#847c94' }}
                    >
                        Why GrocerGo
                    </StyledButton>
                    <StyledButton
                        onClick={() => navigate('/pricing')}
                        sx={{ color: '#847c94' }}
                    >
                        Pricing
                    </StyledButton>
                    <StyledButton
                        onClick={() => navigate('/contact')}
                        sx={{ color: '#847c94' }}
                    >
                        Contact
                    </StyledButton>
                    <StyledButton
                        onClick={() => navigate('/faqs')}
                        sx={{ color: '#847c94' }}
                    >
                        FAQs
                    </StyledButton>
                </Box>

                {/* Authentication Buttons */}
                <Box sx={{ display: 'flex', gap: '1rem' }}>
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
            </Toolbar>
        </AppBar>
    );
};

export default Header;
