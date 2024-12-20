import React, { useState, useEffect } from 'react';
import repairedParkService from '../../services/repairedParkService';
import damagedParkService from '../../services/damagedParkService';

const RepairedParkManagement = () => {
  const [repairs, setRepairs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    damaged_park_id: '',
    repair_description: '',
    images: null
  });
  const [damagedParks, setDamagedParks] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    fetchRepairs();
    fetchDamagedParks();
  }, []);

  const fetchRepairs = async () => {
    try {
      setLoading(true);
      const response = await repairedParkService.getAllRepairs();
      console.log('Fetched repairs:', response);
      setRepairs(response.data);
    } catch (err) {
      console.error('Error fetching repair records:', err);
      setError('Failed to load repair records');
    } finally {
      setLoading(false);
    }
  };

  const fetchDamagedParks = async () => {
    try {
      const response = await damagedParkService.getAllDamagedParks();
      console.log('Fetched damaged parks:', response);
      setDamagedParks(response.data || []);
    } catch (err) {
      console.error('Error fetching damaged parks:', err);
      setError('Failed to load damaged parks');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'images') {
      setFormData(prev => ({
        ...prev,
        images: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    // Clear form error when user makes changes
    setFormError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setFormError(null);

      console.log('Submitting form data:', formData);
      const response = await repairedParkService.createRepair(formData);
      console.log('Create repair response:', response);

      setShowModal(false);
      setFormData({
        damaged_park_id: '',
        repair_description: '',
        images: null
      });
      fetchRepairs(); // Refresh the list
      alert('Repair record created successfully');
    } catch (err) {
      console.error('Error creating repair record:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to create repair record';
      setFormError(errorMessage);
      alert(`Error: ${errorMessage}. Please try again.`);
    } finally {
      setSubmitting(false);
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Repair Records Management</h1>
        <button
          onClick={() => {
            setFormError(null);
            setShowModal(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          Add Repair Record
        </button>
      </div>
      
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Add Repair Record</h2>
            {formError && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {formError}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Damaged Park
                </label>
                <select
                  name="damaged_park_id"
                  value={formData.damaged_park_id}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="">Select a damaged park</option>
                  {damagedParks.map(park => (
                    <option key={park.id} value={park.id}>
                      {park.park_name} - {park.damage_description}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Repair Description
                </label>
                <textarea
                  name="repair_description"
                  value={formData.repair_description}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  rows="3"
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Images (Optional)
                </label>
                <input
                  type="file"
                  name="images"
                  onChange={handleInputChange}
                  accept="image/*"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                  disabled={submitting}
                >
                  {submitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Damage Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Repair Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Repaired By</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Repair Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {repairs.map((repair) => (
              <tr key={repair.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{repair.id}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{repair.damage_description}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{repair.repair_description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{repair.repaired_by_email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(repair.repair_date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {repairs.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          <p>No repair records found</p>
        </div>
      )}
    </div>
  );
};

export default RepairedParkManagement;
