import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ParkManagement from './pages/ParkManagement';
import UserManagement from './pages/UserManagement';
import DamagedParkManagement from './pages/DamagedParkManagement';
import RepairedParkManagement from './pages/RepairedParkManagement';

const AdminRoutes = () => {
  const AdminLayout = () => (
    <ProtectedRoute requiredRole="admin">
      <Layout>
        <Routes>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="parks" element={<ParkManagement />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="damaged-parks" element={<DamagedParkManagement />} />
          <Route path="repaired-parks" element={<RepairedParkManagement />} />
          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </Layout>
    </ProtectedRoute>
  );

  return (
    <Routes>
      <Route path="/*" element={<AdminLayout />} />
    </Routes>
  );
};

export default AdminRoutes;
