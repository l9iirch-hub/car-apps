import { create } from 'zustand';

export const useCarStore = create((set) => ({
  cars: [],
  car: null,
  loading: false,
  error: null,
  page: 1,
  pages: 1,
  total: 0,
  
  setCarsData: (data) => set({ 
    cars: data.cars, 
    page: data.page, 
    pages: data.pages, 
    total: data.total,
    loading: false,
    error: null
  }),
  
  setCar: (car) => set({ car, loading: false, error: null }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error, loading: false }),
}));
