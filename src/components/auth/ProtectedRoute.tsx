import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, profile, loading, effectiveRole, isSuperAdmin } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // SuperAdmin can access everything
  if (isSuperAdmin) {
    return <>{children}</>;
  }

  const role = effectiveRole || profile?.role;

  if (allowedRoles && role && !allowedRoles.includes(role)) {
    // Redirect to appropriate dashboard based on actual role
    if (role === 'screen_owner') return <Navigate to="/screen-owner" replace />;
    if (role === 'advertiser') return <Navigate to="/advertiser" replace />;
    if (role === 'admin') return <Navigate to="/admin" replace />;
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
