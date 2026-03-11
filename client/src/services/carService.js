import api from './api';

export const carService = {
  // Get all cars with filtering
  getCars: async (filters = {}) => {
    try {
      // Clean undefined or empty filters
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v != null && v !== '')
      );
      
      const queryParams = new URLSearchParams(cleanFilters).toString();
      const response = await api.get(`/cars?${queryParams}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch cars';
    }
  },

  // Get car by ID
  getCarById: async (id) => {
    try {
      const response = await api.get(`/cars/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch car details';
    }
  }
};
