import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import parkService from '../../services/parkService';
import damagedParkService from '../../services/damagedParkService';
import repairedParkService from '../../services/repairedParkService';
import authService from '../../services/authService';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    parks: 0,
    activeReports: 0,
    users: 0,
    repairs: 0
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  const fetchDashboardData = async (retry = 0) => {
    try {
      setLoading(true);
      setError(null);

      const fetchWithTimeout = async (promise, timeout = 5000) => {
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Request timed out')), timeout)
        );
        return Promise.race([promise, timeoutPromise]);
      };

      // Fetch all data with timeout
      const [parksRes, damagedParksRes, repairedParksRes, usersRes] = await Promise.all([
        fetchWithTimeout(parkService.getAllParks()),
        fetchWithTimeout(damagedParkService.getAllDamagedParks()),
        fetchWithTimeout(repairedParkService.getAllRepairs()),
        fetchWithTimeout(authService.getAllUsers())
      ]);

      // Validate responses
      if (!parksRes?.data || !damagedParksRes?.data || !repairedParksRes?.data || !usersRes?.data) {
        throw new Error('Invalid response data received');
      }

      // Count active damage reports
      const activeReports = damagedParksRes.data.filter(
        report => report.status === 'pending' || report.status === 'in_progress'
      ).length;

      // Update stats
      setStats({
        parks: Array.isArray(parksRes.data) ? parksRes.data.length : 0,
        activeReports,
        users: Array.isArray(usersRes.data) ? usersRes.data.length : 0,
        repairs: Array.isArray(repairedParksRes.data) ? repairedParksRes.data.length : 0
      });

      // Reset retry count on success
      setRetryCount(0);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      
      // Handle retry logic
      if (retry < maxRetries) {
        console.log(`Retrying... Attempt ${retry + 1} of ${maxRetries}`);
        setRetryCount(retry + 1);
        setTimeout(() => fetchDashboardData(retry + 1), 1000 * (retry + 1));
        return;
      }

      setError(
        err.message === 'Request timed out'
          ? 'Failed to load dashboard data: Request timed out. Please check your connection.'
          : err.message || 'Failed to load dashboard data. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setRetryCount(0);
    fetchDashboardData();
  };

  const dashboardStats = [
    { 
      title: 'Total Parks', 
      value: stats.parks, 
      color: 'bg-blue-500' 
    },
    { 
      title: 'Active Reports', 
      value: stats.activeReports, 
      color: 'bg-yellow-500' 
    },
    { 
      title: 'Users', 
      value: stats.users, 
      color: 'bg-green-500' 
    },
    { 
      title: 'Repairs', 
      value: stats.repairs, 
      color: 'bg-red-500' 
    }
  ];

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          {retryCount > 0 && (
            <p className="mt-4 text-gray-600 text-center">
              Retrying... Attempt {retryCount} of {maxRetries}
            </p>
          )}
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
          <button
            onClick={handleRetry}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Retry
          </button>
        </div>
      );
    }

    return (
      <>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={handleRetry}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center text-sm sm:text-base"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {dashboardStats.map((stat) => (
            <Card 
              key={stat.title}
              title={stat.title}
              value={stat.value}
              color={stat.color}
            />
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="p-4 sm:p-6 bg-white rounded-lg shadow">
      {renderContent()}
    </div>
  );
};

export default Dashboard;
