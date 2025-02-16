import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowIfSignedUp }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  console.log("🔒 ProtectedRoute Check:", { token, userRole });

  // ✅ If signed up but no token, allow access to signup pages
  if (!token && allowIfSignedUp) {
    console.warn("⚠️ No token found, but allowing access because user just signed up.");
    return children;
  }

  if (!token) {
    console.warn("🚨 Redirecting to login - No token found");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
