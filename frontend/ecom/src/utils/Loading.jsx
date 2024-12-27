import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingPage = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#f4f4f4',
            }}
        >
            {/* Loading Spinner */}
            <CircularProgress size={60} thickness={4} />

            {/* Optional Text Below Spinner */}
            <Typography
                variant="h6"
                sx={{ mt: 2, color: 'text.secondary', fontWeight: 'medium' }}
            >
                Loading, please wait...
            </Typography>
        </Box>
    );
};

export default LoadingPage;
