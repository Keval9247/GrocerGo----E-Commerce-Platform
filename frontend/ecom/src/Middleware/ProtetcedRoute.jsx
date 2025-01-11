import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { ROLES } from '../Roles/roles'; // Assuming you have roles defined like ROLES.USER, ROLES.ADMIN, etc.
import { clearAuthentication } from '../store/slice/AuthSlice';

const ProtectedRoute = ({ allowedRoles }) => {
    const isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated);
    const role = useSelector((state) => state.authReducer.role);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     if (!isAuthenticated || !token) {
    //         dispatch(clearAuthentication());
    //         navigate('/login');
    //     }
    // }, [isAuthenticated, navigate]);

    // if (!isAuthenticated) {
    //     return null;
    // } else if (allowedRoles.includes(role)) {
    return <Outlet />;
    // } else {
    //     return <Navigate to="/login" replace />;
    // }
};

export default ProtectedRoute;
