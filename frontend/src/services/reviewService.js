import api from './api';

export const getReviewsByParkId = async (parkId) => {
  try {
    console.log('Fetching reviews for park:', parkId);
    const response = await api.get(`/parks/${parkId}/reviews`);
    console.log('Raw reviews response:', response);

    if (response.data && response.data.status === 'success') {
      const reviews = response.data.data;
      console.log('Parsed reviews:', reviews);
      return reviews;
    }
    console.log('No reviews found or invalid response format');
    return [];
  } catch (error) {
    console.error('Error fetching reviews:', error);
    console.error('Error details:', error.response?.data || error.message);
    return [];
  }
};
