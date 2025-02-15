import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("userToken"); // Change this based on your auth logic

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
