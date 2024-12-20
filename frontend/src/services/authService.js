import api from './api';

const TOKEN_KEY = 'jakarta_park_token';
const USER_KEY = 'jakarta_park_user';

const authService = {
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      console.log('Registration response:', response.data);
      
      if (response.data.status === 'success') {
        return { 
          success: true,
          data: response.data.data
        };
      }
      
      throw new Error(response.data.message || 'Registration failed');
    } catch (error) {
      console.error('Registration error:', error.response || error);
      throw new Error(
        error.response?.data?.message || 
        error.message || 
        'An error occurred during registration'
      );
    }
  },

  getAllUsers: async () => {
    try {
      const response = await api.get('/auth/users');
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
        throw new Error(error.response.data?.message || 'Failed to fetch users data');
      } else if (error.request) {
        // Request made but no response
        throw new Error('No response from server. Please check your connection.');
      } else {
        // Request setup error
        throw new Error('Failed to make request: ' + error.message);
      }
    }
  },

  login: async (email, password) => {
    try {
      console.log('Attempting login with:', { email });
      const response = await api.post('/auth/login', { email, password });
      console.log('Login response:', response.data);
      
      if (response.data.status === 'success') {
        const { token, ...userData } = response.data.data;
        console.log('Login successful, user data:', userData);
        
        // Store token and user data
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(USER_KEY, JSON.stringify(userData));
        
        // Add token to axios default headers
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        return { success: true, data: userData };
      }
      
      console.log('Login failed:', response.data);
      return { 
        success: false, 
        error: response.data.message || 'Invalid credentials' 
      };
    } catch (error) {
      console.error('Login error:', error.response || error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      };
    }
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    delete api.defaults.headers.common['Authorization'];
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  },

  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },

  isAuthenticated: () => {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  updateUser: async (userId, userData) => {
    try {
      const response = await api.put(`/auth/users/${userId}`, userData);
      if (!response.data) {
        throw new Error('Invalid response format from server');
      }
      return {
        success: true,
        data: response.data.data,
        message: response.data.message
      };
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data?.message || 'Failed to update user');
      } else if (error.request) {
        throw new Error('No response from server. Please check your connection.');
      } else {
        throw new Error('Failed to make request: ' + error.message);
      }
    }
  },

  deleteUser: async (userId) => {
    try {
      const response = await api.delete(`/auth/users/${userId}`);
      if (!response.data) {
        throw new Error('Invalid response format from server');
      }
      return {
        success: true,
        message: response.data.message
      };
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data?.message || 'Failed to delete user');
      } else if (error.request) {
        throw new Error('No response from server. Please check your connection.');
      } else {
        throw new Error('Failed to make request: ' + error.message);
      }
    }
  },

  updateProfile: async (profileData) => {
    try {
      const response = await api.put('/auth/profile', profileData);
      
      if (response.data.status === 'success') {
        // Update stored user data
        const currentUser = JSON.parse(localStorage.getItem(USER_KEY) || '{}');
        const updatedUser = { ...currentUser, ...response.data.data };
        localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
        
        return {
          success: true,
          data: response.data.data,
          message: response.data.message
        };
      }
      
      throw new Error(response.data.message || 'Failed to update profile');
    } catch (error) {
      console.error('Profile update error:', error.response || error);
      throw new Error(
        error.response?.data?.message || 
        error.message || 
        'Failed to update profile'
      );
    }
  }
};

export default authService;
