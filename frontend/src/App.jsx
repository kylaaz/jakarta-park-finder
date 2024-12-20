import { Route, Routes, Navigate } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import AdminRoutes from './admin/AdminRoutes';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Pages
import HomePage from './view/pages/HomePage';
import AboutPage from './view/pages/AboutPage';
import InformationPage from './view/pages/InformationPage';
import NotificationsPage from './view/pages/NotificationsPage';
import ParkDetailPage from './view/pages/ParkDetailPage';
import AuthPage from './view/pages/AuthPage';
import DamageReportPage from './view/pages/DamageReportPage';
import UserProfilePage from './view/pages/UserProfilePage';

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        {/* Public Routes */}
        <Route index element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/information" element={<InformationPage />} />
        <Route path="/park/:id" element={<ParkDetailPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
        
        {/* Protected Routes */}
        <Route path="/notifications" element={
          <ProtectedRoute>
            <NotificationsPage />
          </ProtectedRoute>
        } />
        <Route path="/report-damage" element={
          <ProtectedRoute>
            <DamageReportPage />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <UserProfilePage />
          </ProtectedRoute>
        } />
        
        {/* Admin Routes - Protected with role */}
        <Route path="/admin/*" element={
          <ProtectedRoute requiredRole="admin">
            <AdminRoutes />
          </ProtectedRoute>
        } />
      </Route>

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
