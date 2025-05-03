
import React from 'react';
import AdminLogin from '@/components/AdminLogin';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';

const Admin = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <AdminLogin />;
};

export default Admin;
