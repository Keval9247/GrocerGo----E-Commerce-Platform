import { AppBar, Toolbar, Typography } from '@mui/material';
import React from 'react';

function UserlayoutFooter() {
    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    top: 'auto',
                    bottom: '0',
                    backgroundColor: 'rgba(87, 62, 62, 0.9)',
                    color: 'whitesmoke',
                    zIndex: 1100, // Ensure footer stays at the bottom above content
                }}
            >
                <Toolbar style={{ justifyContent: 'center' }}>
                    <Typography variant="body1" style={{ textAlign: 'center' }}>
                        © 2024 GrocerGo pvt. ltd
                    </Typography>
                    <Typography variant="body2" style={{ marginLeft: 20 }}>
                        All rights reserved.
                    </Typography>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default UserlayoutFooter;
