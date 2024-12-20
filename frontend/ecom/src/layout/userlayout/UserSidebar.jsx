import React from 'react';
import { Drawer, List, ListItem, ListItemText, Divider, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Sidebar = () => {
    return (
        <Drawer
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                },
            }}
            variant="permanent"
            anchor="left"
        >
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <List>
                    <ListItem button component={Link} to="/">
                        <DashboardIcon sx={{ mr: 2 }} />
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    <ListItem button component={Link} to="/orders">
                        <ShoppingCartIcon sx={{ mr: 2 }} />
                        <ListItemText primary="Orders" />
                    </ListItem>
                    <ListItem button component={Link} to="/settings">
                        <SettingsIcon sx={{ mr: 2 }} />
                        <ListItemText primary="Settings" />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button>
                        <ExitToAppIcon sx={{ mr: 2 }} />
                        <ListItemText primary="Logout" />
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    );
};

export default Sidebar;
