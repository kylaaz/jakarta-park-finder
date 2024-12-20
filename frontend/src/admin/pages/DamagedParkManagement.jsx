import React, { useState, useEffect } from 'react';
import damagedParkService from '../../services/damagedParkService';

const DamagedParkManagement = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await damagedParkService.getAllDamagedParks();
      console.log('Fetched reports:', response);
      setReports(response.data || []);
    } catch (err) {
      console.error('Error fetching damage reports:', err);
      setError('Failed to load damage reports');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (reportId, newStatus) => {
    try {
      setUpdateLoading(reportId);
      console.log('Updating status:', { reportId, newStatus });
      
      const token = localStorage.getItem('jakarta_park_token');
      console.log('Auth token:', token);

      const response = await damagedParkService.updateDamagedParkStatus(reportId, { status: newStatus });
      console.log('Update response:', response);

      setReports(reports.map(report => 
        report.id === reportId ? { ...report, status: newStatus } : report
      ));

      alert('Status updated successfully');
    } catch (err) {
      console.error('Error updating status:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to update status';
      alert(`Error: ${errorMessage}. Please try again.`);
      fetchReports();
    } finally {
      setUpdateLoading(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Damage Reports Management</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Park</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reporter</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reports.map((report) => (
              <tr key={report.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.park_name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.reporter_email}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{report.damage_description}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {report.imageUrl ? (
                    <img 
                      src={report.imageUrl} 
                      alt="Damage" 
                      className="w-20 h-20 object-cover rounded"
                      onClick={() => window.open(report.imageUrl, '_blank')}
                      style={{ cursor: 'pointer' }}
                    />
                  ) : (
                    <span className="text-gray-400">No image</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(report.status)}`}>
                    {report.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(report.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="relative">
                    <select
                      value={report.status}
                      onChange={(e) => handleStatusUpdate(report.id, e.target.value)}
                      disabled={updateLoading === report.id}
                      className={`appearance-none block w-40 px-3 py-2 rounded-lg border shadow-sm text-sm font-medium
                        ${updateLoading === report.id ? 'opacity-50 cursor-wait' : 'cursor-pointer hover:bg-gray-50'}
                        ${report.status === 'pending' ? 'border-yellow-300 bg-yellow-50 text-yellow-800' : ''}
                        ${report.status === 'in_progress' ? 'border-blue-300 bg-blue-50 text-blue-800' : ''}
                        ${report.status === 'completed' ? 'border-green-300 bg-green-50 text-green-800' : ''}
                        focus:outline-none focus:ring-2 focus:ring-offset-2
                        ${report.status === 'pending' ? 'focus:ring-yellow-500' : ''}
                        ${report.status === 'in_progress' ? 'focus:ring-blue-500' : ''}
                        ${report.status === 'completed' ? 'focus:ring-green-500' : ''}
                      `}
                    >
                      <option value="pending" className="bg-white text-yellow-800">Pending</option>
                      <option value="in_progress" className="bg-white text-blue-800">In Progress</option>
                      <option value="completed" className="bg-white text-green-800">Completed</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                      <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DamagedParkManagement;
