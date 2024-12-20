import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import Login from '../../components/auth/Login';
import Register from '../../components/auth/Register';
import { useAuth } from '../../context/AuthContext';

const AuthPage = () => {
  const [selectedTab, setSelectedTab] = useState('login');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    // Check if we have a return URL in the location state
    const returnUrl = location.state?.from?.pathname || '/';
    
    if (isAuthenticated() && user) {
      // Only redirect if coming from a protected route
      if (location.state?.from) {
        if (user.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate(returnUrl);
        }
      }
    }
    setLoading(false);
  }, [user, isAuthenticated, navigate, location]);

  // Show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  const handleLoginSuccess = (userData) => {
    const returnUrl = location.state?.from?.pathname;
    if (userData.role === 'admin') {
      navigate('/admin/dashboard');
    } else if (returnUrl) {
      navigate(returnUrl);
    } else {
      navigate('/');
    }
  };

  const handleRegisterSuccess = () => {
    setSelectedTab('login');
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg border border-green-100">
        {/* Tabs */}
        <div className="flex justify-center space-x-4 border-b">
          <button
            className={`pb-2 px-4 transition-colors ${
              selectedTab === 'login'
                ? 'border-b-2 border-green-600 text-green-600 font-medium'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setSelectedTab('login')}
          >
            Login
          </button>
          <button
            className={`pb-2 px-4 transition-colors ${
              selectedTab === 'register'
                ? 'border-b-2 border-green-600 text-green-600 font-medium'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setSelectedTab('register')}
          >
            Register
          </button>
        </div>

        {/* Content */}
        <div className="mt-8">
          {selectedTab === 'login' ? (
            <Login 
              setSelectedTab={setSelectedTab} 
              onLoginSuccess={handleLoginSuccess}
            />
          ) : (
            <Register onSuccess={setSelectedTab} />
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          By signing in, you agree to our{' '}
          <a href="/terms" className="text-green-600 hover:text-green-500">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/privacy" className="text-green-600 hover:text-green-500">
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
