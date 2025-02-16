import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowIfSignedUp }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  console.log("🔒 ProtectedRoute Check:", { token, userRole });

  if (!token) {
    console.warn("🚨 Redirecting to login - No token found");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
