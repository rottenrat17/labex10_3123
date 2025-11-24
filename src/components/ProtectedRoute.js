import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

// This component protects routes - only logged in users can access them
const ProtectedRoute = ({ children }) => {
  // Check if user is authenticated by subscribing to Redux state (5 - Subscribe)
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    // Send user back to login if they're not authenticated
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

