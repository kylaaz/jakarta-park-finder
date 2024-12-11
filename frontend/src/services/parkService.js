import api from './api';

export const getParkList = async() => {
    try {
        console.log('Fetching parks from:', api.defaults.baseURL);
        const response = await api.get('/parks');
        console.log('Response:', response);
        return response.data.data; // Sesuaikan dengan struktur response backend
    } catch (error) {
        console.error('Error fetching parks:', error);
        throw error;
    }
};

export const getParkById = async(id) => {
    try {
        const response = await api.get(`/parks/${id}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching park details:', error);
        throw error;
    }
};

export const createPark = async(parkData) => {
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
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        console.error('Park creation error:', error);
        throw error;
    }
};
