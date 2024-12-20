import api from './api';

const damagedParkService = {
  getAllDamagedParks: async () => {
    try {
      const response = await api.get('/damaged-parks');
      if (!response.data || !response.data.data) {
        throw new Error('Invalid response format from server');
      }
      return {
        data: Array.isArray(response.data.data) ? response.data.data : [],
        status: response.data.status,
        message: response.data.message
      };
    } catch (error) {
      if (error.response) {
        // Server responded with error
        throw new Error(error.response.data?.message || 'Failed to fetch damaged parks data');
      } else if (error.request) {
        // Request made but no response
        throw new Error('No response from server. Please check your connection.');
      } else {
        // Request setup error
        throw new Error('Failed to make request: ' + error.message);
      }
    }
  },

  getDamagedParkById: async (id) => {
    try {
      const response = await api.get(`/damaged-parks/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createDamagedPark: async (damageData) => {
    try {
      const formData = new FormData();
      
      // Add basic data
      formData.append('park_id', damageData.park_id);
      formData.append('damage_description', damageData.damage_description);
      
      // Add image if exists
      if (damageData.images) {
        formData.append('images', damageData.images);
      }

      const response = await api.post('/damaged-parks/report', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response.data || response.data.status !== 'success') {
        throw new Error(response.data?.message || 'Failed to submit damage report');
      }

      return response.data;
    } catch (error) {
      console.error('Error creating damage report:', error.response || error);
      throw new Error(
        error.response?.data?.message || 
        error.message || 
        'Failed to submit damage report'
      );
    }
  },

  updateDamagedParkStatus: async (id, statusData) => {
    try {
      const response = await api.put(`/damaged-parks/${id}`, statusData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteDamagedPark: async (id) => {
    try {
      const response = await api.delete(`/damaged-parks/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get damage reports by park ID
  getDamagedParksByParkId: async (parkId) => {
    try {
      const response = await api.get(`/damaged-parks/park/${parkId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get damage reports by user ID
  getDamagedParksByUserId: async (userId) => {
    try {
      const response = await api.get(`/damaged-parks/user/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getMyDamagedParks: async () => {
    try {
      const response = await api.get('/damaged-parks/my-reports');
      if (!response.data || !response.data.data) {
        throw new Error('Invalid response format from server');
      }
      return {
        data: Array.isArray(response.data.data) ? response.data.data : [],
        status: response.data.status,
        message: response.data.message
      };
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data?.message || 'Failed to fetch your damage reports');
      } else if (error.request) {
        throw new Error('No response from server. Please check your connection.');
      } else {
        throw new Error('Failed to make request: ' + error.message);
      }
    }
  },
};

export default damagedParkService;
