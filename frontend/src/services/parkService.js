import api from './api';

const parkService = {
  getParkList: async () => {
    try {
      const response = await api.get('/parks');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getParkById: async (id) => {
    try {
      const response = await api.get(`/parks/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAllParks: async () => {
    try {
      const response = await api.get('/parks');
      if (!response.data || !response.data.data) {
        throw new Error('Invalid response format from server');
      }
      return response.data;
    } catch (error) {
      if (error.response) {
        // Server responded with error
        throw new Error(error.response.data?.message || 'Failed to fetch parks data');
      } else if (error.request) {
        // Request made but no response
        throw new Error('No response from server. Please check your connection.');
      } else {
        // Request setup error
        throw new Error('Failed to make request: ' + error.message);
      }
    }
  },

  createPark: async (parkData) => {
    try {
      const formData = new FormData();
      Object.keys(parkData).forEach(key => {
        if (key === 'facilities' && Array.isArray(parkData[key])) {
          // Convert array to JSON string to preserve array structure
          formData.append(key, JSON.stringify(parkData[key]));
        } else if (key === 'images' && parkData[key]) {
          formData.append(key, parkData[key]);
        } else {
          formData.append(key, parkData[key]);
        }
      });

      const response = await api.post('/parks', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updatePark: async (parkId, parkData) => {
    try {
      const formData = new FormData();
      Object.keys(parkData).forEach(key => {
        if (key === 'facilities' && Array.isArray(parkData[key])) {
          // Convert array to JSON string to preserve array structure
          formData.append(key, JSON.stringify(parkData[key]));
        } else if (key === 'images' && parkData[key]) {
          formData.append(key, parkData[key]);
        } else {
          formData.append(key, parkData[key]);
        }
      });

      const response = await api.put(`/parks/${parkId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deletePark: async (parkId) => {
    try {
      const response = await api.delete(`/parks/${parkId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  searchParks: async (query) => {
    try {
      const response = await api.get(`/parks/search?query=${query}`);
      if (!response.data || !response.data.data) {
        throw new Error('Invalid response format from server');
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default parkService;
