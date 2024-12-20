import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  validateStatus: function (status) {
    return status >= 200 && status < 500;
  },
  withCredentials: false,
});

// Add request interceptor for logging and token
api.interceptors.request.use(
  (config) => {
    // Log request details
    console.log('API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      data: config.data,
      headers: config.headers
    });

    // Add auth token if available
    const token = localStorage.getItem('jakarta_park_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      // Also add token to default headers to ensure it persists
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    // Check if the route requires authentication
    const publicPaths = [
      '/auth/login',
      '/auth/register',
      '/parks',
      '/parks/search',
      '/',
      '/about',
      '/information'
    ];
    const isPublicPath = publicPaths.some(path => config.url?.includes(path));
    const isPublicMethod = config.method === 'get';
    const isPublicRoute = isPublicPath && isPublicMethod;

    // Only redirect to login for non-public routes when not authenticated
    if (!token && !isPublicRoute && !window.location.pathname.startsWith('/login')) {
      window.location.href = '/login';
      return Promise.reject(new Error('Authentication required'));
    }

    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for logging and error handling
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', {
      url: response.config.url,
      status: response.status,
      data: response.data,
    });

    // Check if the response has the expected structure
    if (!response.data || (response.status !== 204 && typeof response.data.status === 'undefined')) {
      console.warn('Invalid response format:', response);
      throw new Error('Invalid response format from server');
    }

    // Check if the response indicates an error
    if (response.data.status === 'error') {
      console.warn('Server returned error:', response.data);
      throw new Error(response.data.message || 'Server error');
    }

    return response;
  },
  (error) => {
    // Handle network errors
    if (!error.response) {
      console.error('Network Error:', error.message);
      return Promise.reject(new Error('Network error. Please check your connection.'));
    }

    // Handle 401 Unauthorized
    if (error.response.status === 401) {
      console.warn('Authentication Error:', error.response);
      localStorage.removeItem('jakarta_park_token');
      localStorage.removeItem('jakarta_park_user');
      window.location.href = '/login';
      return Promise.reject(new Error('Authentication failed. Please login again.'));
    }

    // Handle 403 Forbidden
    if (error.response.status === 403) {
      console.warn('Authorization Error:', error.response);
      return Promise.reject(new Error('You do not have permission to perform this action.'));
    }

    // Handle 404 Not Found
    if (error.response.status === 404) {
      console.warn('Resource Not Found:', error.response);
      return Promise.reject(new Error('The requested resource was not found.'));
    }

    // Handle 422 Validation Error
    if (error.response.status === 422) {
      console.warn('Validation Error:', error.response);
      return Promise.reject(new Error(error.response.data.message || 'Validation failed.'));
    }

    // Handle 500 Server Error
    if (error.response.status >= 500) {
      console.error('Server Error:', error.response);
      return Promise.reject(new Error('An unexpected error occurred. Please try again later.'));
    }

    // Log other errors
    console.error('API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
      response: error.response?.data,
    });

    return Promise.reject(error);
  }
);

export default api;
