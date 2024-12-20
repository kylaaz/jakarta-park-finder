import api from './api';

const damageReportService = {
  submitReport: async (reportData) => {
    try {
      const response = await api.post('/damaged-parks/report', reportData);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error submitting damage report:', error.response || error);
      throw new Error(
        error.response?.data?.message || 
        error.message || 
        'Failed to submit damage report'
      );
    }
  },

  getMyReports: async () => {
    try {
      const response = await api.get('/damaged-parks/my-reports');
      return {
        success: true,
        data: response.data.data || []
      };
    } catch (error) {
      console.error('Error fetching my reports:', error.response || error);
      throw new Error(
        error.response?.data?.message || 
        error.message || 
        'Failed to fetch reports'
      );
    }
  }
};

export default damageReportService;
