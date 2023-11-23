import React from 'react';
import { Navigate } from 'react-router-dom';

function PublicRoute(props) {
  // Check if a token exists in local storage
  if (localStorage.getItem('token')) {
    // If a token exists, redirect to the admin page
    return <Navigate to="/admin" />;
  } else {
    // If no token exists, render the children (public content)
    return props.children;
  }
}

export default PublicRoute;
