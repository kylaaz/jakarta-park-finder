import api from './api';

const repairedParkService = {
  getAllRepairs: async () => {
    try {
      const response = await api.get('/repaired-parks');
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
        throw new Error(error.response.data?.message || 'Failed to fetch repaired parks data');
      } else if (error.request) {
        // Request made but no response
        throw new Error('No response from server. Please check your connection.');
      } else {
        // Request setup error
        throw new Error('Failed to make request: ' + error.message);
      }
    }
  },

  getRepairById: async (id) => {
    try {
      const response = await api.get(`/repaired-parks/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createRepair: async (repairData) => {
    try {
      console.log('Creating repair with data:', repairData);

      const formData = new FormData();
      
      // Add required fields
      formData.append('damaged_park_id', repairData.damaged_park_id);
      formData.append('repair_description', repairData.repair_description);
      
      // Add image if exists
      if (repairData.images) {
        formData.append('images', repairData.images);
      }

      // Log the FormData contents
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      const response = await api.post('/repaired-parks', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Server response:', response);

      if (!response.data || response.data.status !== 'success') {
        throw new Error(response.data?.message || 'Failed to create repair record');
      }

      return response.data;
    } catch (error) {
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers
      });
      
      // Throw a more detailed error message
      throw new Error(
        error.response?.data?.message || 
        error.message || 
        'Failed to create repair record'
      );
    }
  },

  updateRepair: async (id, repairData) => {
    try {
      const formData = new FormData();
      Object.keys(repairData).forEach(key => {
        if (key === 'images' && repairData[key]) {
          formData.append(key, repairData[key]);
        } else {
          formData.append(key, repairData[key]);
        }
      });

      const response = await api.put(`/repaired-parks/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteRepair: async (id) => {
    try {
      const response = await api.delete(`/repaired-parks/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default repairedParkService;
