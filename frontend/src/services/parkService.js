import api from './api';

export const getParkList = async () => {
  try {
    console.log('Fetching parks from:', api.defaults.baseURL);
    const response = await api.get('/parks');
    console.log('Response:', response);

    if (response.data.status === 'success' && Array.isArray(response.data.data)) {
      // Transform the data to ensure all fields are properly formatted
      const parks = response.data.data.map((park) => ({
        ...park,
        facilities: typeof park.facilities === 'string' ? JSON.parse(park.facilities) : park.facilities || [],
        // Ensure imageUrl is a valid URL
        imageUrl: park.imageUrl && park.imageUrl.startsWith('http') ? park.imageUrl : null,
      }));
      return parks;
    } else {
      throw new Error('Invalid response format from server');
    }
  } catch (error) {
    console.error('Error fetching parks:', error);
    throw error;
  }
};

export const getParkById = async (id) => {
  try {
    const response = await api.get(`/parks/${id}`);
    if (response.data.status === 'success' && response.data.data) {
      const park = response.data.data;
      return {
        ...park,
        facilities: typeof park.facilities === 'string' ? JSON.parse(park.facilities) : park.facilities || [],
        // Ensure imageUrl is a valid URL
        imageUrl: park.imageUrl && park.imageUrl.startsWith('http') ? park.imageUrl : null,
      };
    } else {
      throw new Error('Failed to fetch park details');
    }
  } catch (error) {
    console.error('Error fetching park details:', error);
    throw error;
  }
};

export const createPark = async (parkData) => {
  const formData = new FormData();

  // Append text fields
  formData.append('name', parkData.name);
  formData.append('location', parkData.location);
  formData.append('description', parkData.description);
  formData.append('openhours', parkData.openhours);
  formData.append('coordinates', parkData.coordinates);

  // Append facilities as JSON
  formData.append('facilities', JSON.stringify(parkData.facilities));

  // Append image
  if (parkData.image) {
    formData.append('image', parkData.image);
  }

  try {
    const response = await api.post('/parks', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    if (response.data.status === 'success') {
      return response.data;
    } else {
      throw new Error('Failed to create park');
    }
  } catch (error) {
    console.error('Park creation error:', error);
    throw error;
  }
};
