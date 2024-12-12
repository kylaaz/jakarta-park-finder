import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    // Add timeout and retry logic
    timeout: 10000,
    validateStatus: function (status) {
        return status >= 200 && status < 500; // Accept all responses to handle them in the service
    }
});

// Add response interceptor for logging
api.interceptors.response.use(
    response => {
        console.log('API Response:', {
            url: response.config.url,
            status: response.status,
            data: response.data
        });
        return response;
    },
    error => {
        console.error('API Error:', {
            url: error.config?.url,
            message: error.message,
            response: error.response?.data
        });
        return Promise.reject(error);
    }
);

export default api;
