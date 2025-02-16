import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowIfSignedUp = false }) => {
    const isAuthenticated = localStorage.getItem("userToken");
    const isSignedUp = localStorage.getItem("userId"); // Check if user just signed up

    if (isAuthenticated || (allowIfSignedUp && isSignedUp)) {
        return children;
    }

    return <Navigate to="/login" />;
};

export default ProtectedRoute;
