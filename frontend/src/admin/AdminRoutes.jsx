import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ParkManagement from './pages/ParkManagement';
import UserManagement from './pages/UserManagement';
import ReportManagement from './pages/ReportManagement';
import RepairTracking from './pages/RepairTracking';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="parks" element={<ParkManagement />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="reports" element={<ReportManagement />} />
        <Route path="repairs" element={<RepairTracking />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;