import { create } from 'zustand';

export const useBookingStore = create((set) => ({
  bookingData: {
    car: null,
    startDate: null,
    endDate: null,
    pickupLocation: '',
    returnLocation: '',
    totalDays: 0,
    totalPrice: 0,
    driverLicense: '',
  },
  
  setBookingData: (data) => set((state) => ({ 
    bookingData: { ...state.bookingData, ...data } 
  })),
  
  resetBooking: () => set({
    bookingData: {
      car: null,
      startDate: null,
      endDate: null,
      pickupLocation: '',
      returnLocation: '',
      totalDays: 0,
      totalPrice: 0,
      driverLicense: '',
    }
  })
}));
