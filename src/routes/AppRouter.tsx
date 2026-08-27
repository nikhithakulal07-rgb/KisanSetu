import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';
import { LoginPage } from '../pages/auth/LoginPage';
import { FarmerLayout } from '../layouts/FarmerLayout';
import { OperatorLayout } from '../layouts/OperatorLayout';
import { AdminLayout } from '../layouts/AdminLayout';

// Farmer Pages
import { FarmerDashboard } from '../pages/farmer/FarmerDashboard';
import { FarmerCentres } from '../pages/farmer/FarmerCentres';
import { FarmerBooking } from '../pages/farmer/FarmerBooking';
import { FarmerBookingConfirmation } from '../pages/farmer/FarmerBookingConfirmation';
import { FarmerVirtualQueue } from '../pages/farmer/FarmerVirtualQueue';
import { FarmerProcurement } from '../pages/farmer/FarmerProcurement';
import { FarmerPayments } from '../pages/farmer/FarmerPayments';
import { FarmerNotifications } from '../pages/farmer/FarmerNotifications';
import { FarmerProfile } from '../pages/farmer/FarmerProfile';

// Operator Pages
import { OperatorDashboard } from '../pages/operator/OperatorDashboard';

// Admin Pages
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { AdminCentres } from '../pages/admin/AdminCentres';
import { AdminAnalytics } from '../pages/admin/AdminAnalytics';
import { AdminSimulationLab } from '../pages/admin/AdminSimulationLab';

export const AppRouter: React.FC = () => {
  const { role } = useAuth();

  const getDefaultRoute = () => {
    if (role === 'FARMER') return '/farmer/dashboard';
    if (role === 'PROCUREMENT_OPERATOR') return '/operator/dashboard';
    return '/admin/dashboard';
  };

  return (
    <Routes>
      {/* Root / Login */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Navigate to={getDefaultRoute()} replace />} />

      {/* Farmer Route Group */}
      <Route path="/farmer" element={<FarmerLayout />}>
        <Route index element={<Navigate to="/farmer/dashboard" replace />} />
        <Route path="dashboard" element={<FarmerDashboard />} />
        <Route path="centres" element={<FarmerCentres />} />
        <Route path="booking" element={<FarmerBooking />} />
        <Route path="booking/confirmation" element={<FarmerBookingConfirmation />} />
        <Route path="queue" element={<FarmerVirtualQueue />} />
        <Route path="procurement" element={<FarmerProcurement />} />
        <Route path="payments" element={<FarmerPayments />} />
        <Route path="notifications" element={<FarmerNotifications />} />
        <Route path="profile" element={<FarmerProfile />} />
      </Route>

      {/* Operator Route Group */}
      <Route path="/operator" element={<OperatorLayout />}>
        <Route index element={<Navigate to="/operator/dashboard" replace />} />
        <Route path="dashboard" element={<OperatorDashboard />} />
      </Route>

      {/* Admin Route Group */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="centres" element={<AdminCentres />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="simulation" element={<AdminSimulationLab />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to={getDefaultRoute()} replace />} />
    </Routes>
  );
};
