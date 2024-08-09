import React from 'react';
import { Route, Redirect, Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../services/context/AuthContext';
 
const ProtectedRoutes = () => {
    const { isAuthenticated } = useAuth();
  
    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
  };
  
  export default ProtectedRoutes;