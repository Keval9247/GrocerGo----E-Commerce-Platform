import React from 'react'
import UserlayoutHeader from './UserlayoutHeader'
import UserlayoutFooter from './UserlayoutFooter'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material';
import Sidebar from './UserSidebar';

function UserLayout() {
    return (
        // <div className="min-h-screen flex flex-col bg-gray-400">
        //     <UserlayoutHeader /> {/* Header */}
        //     <div className="flex-grow">
        //         <Outlet /> {/* Child content */}
        //     </div>
        //     <UserlayoutFooter /> {/* Footer */}
        // </div>
        // return (
        // <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        //     {/* Sidebar */}
        //     {/* <Sidebar /> */}

        //     <Box sx={{ flexGrow: 1 }}>
        //         {/* Header */}
        //         {/* <UserlayoutHeader /> */}

        //         {/* Main Content */}
        //         <Box sx={{ padding: 3 }}>
        //             <Outlet />  {/* This will render the content of the specific dashboard page */}
        //         </Box>

        //         {/* Footer */}
        //         {/* <UserlayoutFooter /> */}
        //     </Box>
        // </Box>
        // //   );
        // );

        <Box >
            <Outlet />

        </Box>
    );
}

export default UserLayout
