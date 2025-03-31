// PrivateRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const authToken = localStorage.getItem('authToken');  // Checking if the token exists in localStorage

  // If token exists, render child components; otherwise, redirect to login
  return authToken ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default PrivateRoute;