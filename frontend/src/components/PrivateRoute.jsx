import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute() {
  const token = localStorage.getItem('token'); // o usa cookies

  return token ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute;
