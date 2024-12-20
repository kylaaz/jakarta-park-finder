import React, { useState, useEffect } from 'react';
import parkService from '../../services/parkService';

const ParkManagement = () => {
  const [parks, setParks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPark, setSelectedPark] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    openhours: '',
    facilities: '',
    description: '',
    coordinates: '',
    images: null
  });

  useEffect(() => {
    fetchParks();
  }, []);

  const fetchParks = async () => {
    try {
      setLoading(true);
      const response = await parkService.getAllParks();
      setParks(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch parks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await parkService.searchParks(searchQuery);
      setParks(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to search parks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'images') {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleCreatePark = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const dataToSubmit = {
        ...formData,
        facilities: formData.facilities
          .split(',')
          .map(item => item.trim())
          .filter(item => item !== '')
      };
      await parkService.createPark(dataToSubmit);
      setShowCreateModal(false);
      setFormData({
        name: '',
        location: '',
        openhours: '',
        facilities: '',
        description: '',
        coordinates: '',
        images: null
      });
      fetchParks();
    } catch (err) {
      setError('Failed to create park');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePark = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const dataToSubmit = {
        ...formData,
        facilities: formData.facilities
          .split(',')
          .map(item => item.trim())
          .filter(item => item !== '')
      };
      await parkService.updatePark(selectedPark.id, dataToSubmit);
      setShowEditModal(false);
      setSelectedPark(null);
      fetchParks();
    } catch (err) {
      setError('Failed to update park');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePark = async (parkId) => {
    if (window.confirm('Are you sure you want to delete this park?')) {
      try {
        setLoading(true);
        await parkService.deletePark(parkId);
        fetchParks();
      } catch (err) {
        setError('Failed to delete park');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const openEditModal = (park) => {
    setSelectedPark(park);
    // Parse facilities if it's a string
    let parsedFacilities = '';
    try {
      if (typeof park.facilities === 'string') {
        const parsed = JSON.parse(park.facilities);
        parsedFacilities = Array.isArray(parsed) ? parsed.join(', ') : parsed;
      } else if (Array.isArray(park.facilities)) {
        parsedFacilities = park.facilities.join(', ');
      }
    } catch (err) {
      console.error('Error parsing facilities:', err);
      parsedFacilities = '';
    }

    setFormData({
      name: park.name || '',
      location: park.location || '',
      openhours: park.openhours || '',
      facilities: parsedFacilities,
      description: park.description || '',
      coordinates: park.coordinates || '',
      images: null
    });
    setShowEditModal(true);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Park Management</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Create New Park
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Search parks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-2 border rounded"
        />
        <button 
          onClick={handleSearch} 
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <span>{error}</span>
        </div>
      )}

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Open Hours</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {parks.map((park) => (
              <tr key={park.id}>
                <td className="px-6 py-4 whitespace-nowrap">{park.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{park.location}</td>
                <td className="px-6 py-4 whitespace-nowrap">{park.openhours}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => openEditModal(park)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeletePark(park.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Park Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setShowCreateModal(false)}></div>
            </div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Create New Park</h3>
                <form onSubmit={handleCreatePark}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Open Hours</label>
                    <input
                      type="text"
                      name="openhours"
                      value={formData.openhours}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Facilities (comma-separated)
                      <span className="ml-1 font-normal text-gray-500">e.g., Jogging Track, Playground, Gazebo</span>
                    </label>
                    <input
                      type="text"
                      name="facilities"
                      value={formData.facilities}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Coordinates</label>
                    <input
                      type="text"
                      name="coordinates"
                      value={formData.coordinates}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Image</label>
                    <input
                      type="file"
                      name="images"
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      accept="image/*"
                      required
                    />
                  </div>

                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Create Park
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCreateModal(false)}
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Park Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setShowEditModal(false)}></div>
            </div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Edit Park</h3>
                <form onSubmit={handleUpdatePark}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Open Hours</label>
                    <input
                      type="text"
                      name="openhours"
                      value={formData.openhours}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Facilities (comma-separated)
                      <span className="ml-1 font-normal text-gray-500">e.g., Jogging Track, Playground, Gazebo</span>
                    </label>
                    <input
                      type="text"
                      name="facilities"
                      value={formData.facilities}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Coordinates</label>
                    <input
                      type="text"
                      name="coordinates"
                      value={formData.coordinates}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">New Image (optional)</label>
                    <input
                      type="file"
                      name="images"
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      accept="image/*"
                    />
                  </div>

                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Update Park
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowEditModal(false)}
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParkManagement;
