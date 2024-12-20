import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  // First check authentication for all protected routes
  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Then check for user data
  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  // Check role requirements
  if (requiredRole && user.role !== requiredRole) {
    toast.error('You do not have permission to access this page');
    return <Navigate to="/" replace />;
  }

  // Check if this is an admin route
  if (location.pathname.startsWith('/admin') && user.role !== 'admin') {
    toast.error('Only administrators can access this area');
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
