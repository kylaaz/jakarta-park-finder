import api from './api';

const reviewService = {
  getReviewsByParkId: async (parkId) => {
    try {
      const response = await api.get(`/parks/${parkId}/reviews`);
      return {
        data: response.data.data || []
      };
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
  },

  createReview: async (parkId, reviewData) => {
    try {
      const response = await api.post(`/parks/${parkId}/reviews`, reviewData);
      return response.data;
    } catch (error) {
      console.error('Error creating review:', error);
      throw error;
    }
  },

  updateReview: async (reviewId, reviewData) => {
    try {
      const response = await api.put(`/reviews/${reviewId}`, reviewData);
      return response.data;
    } catch (error) {
      console.error('Error updating review:', error);
      throw error;
    }
  },

  deleteReview: async (reviewId) => {
    try {
      const response = await api.delete(`/reviews/${reviewId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting review:', error);
      throw error;
    }
  },

  getUserReviews: async (userId) => {
    try {
      const response = await api.get(`/users/${userId}/reviews`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user reviews:', error);
      throw error;
    }
  }
};

export default reviewService;
