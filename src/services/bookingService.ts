// import api from '@/lib/api';
// import { Facility } from './facilityService';
// import { User } from './authService';

// export interface Booking {
//   _id: string;
//   facility: Facility;
//   user: User;
//   date: string;
//   startTime: string;
//   endTime: string;
//   payableAmount: number;
//   isBooked: 'confirmed' | 'unconfirmed' | 'canceled';
// }

// export interface TimeSlot {
//   startTime: string;
//   endTime: string;
// }

// export interface AvailableSlots {
//   date: string;
//   availableSlots: TimeSlot[];
// }

// export interface CreateBookingData {
//   facility: string;
//   date: string;
//   startTime: string;
//   endTime: string;
// }

// const bookingService = {
//   async checkAvailability(params: {
//     date: string;
//     facility?: string;
//   }): Promise<{ success: boolean; data: AvailableSlots[] }> {
//     const response = await api.get('/bookings/check-availability', { params });
//     return response.data;
//   },

//   async createBooking(data: CreateBookingData): Promise<{ success: boolean; data: Booking }> {
//     const response = await api.post('/bookings', data);
//     return response.data;
//   },

//   async getAllBookings(params?: {
//     date?: string;
//     page?: number;
//     limit?: number;
//   }): Promise<{ success: boolean; data: Booking[]; meta?: any }> {
//     const response = await api.get('/bookings', { params });
//     return response.data;
//   },

//   async getUserBookings(): Promise<{ success: boolean; data: Booking[] }> {
//     const response = await api.get('/bookings/user');
//     return response.data;
//   },

//   async cancelBooking(id: string): Promise<{ success: boolean; data: Booking }> {
//     const response = await api.delete(`/bookings/${id}`);
//     return response.data;
//   },
// };

// export default bookingService;


import api from '@/lib/api';
import { Facility } from './facilityService';
import { User } from './authService';

export interface Booking {
  _id: string;
  facility: Facility;
  user: User;
  date: string;
  startTime: string;
  endTime: string;
  payableAmount: number;
  isBooked: 'confirmed' | 'unconfirmed' | 'canceled';
  createdAt?: string;
  updatedAt?: string;
}

export interface TimeSlot {
  startTime: string;
  endTime: string;
}

export interface AvailableSlots {
  date: string;
  availableSlots: TimeSlot[];
}

export interface CreateBookingData {
  facility: string;
  date: string;
  startTime: string;
  endTime: string;
}

const bookingService = {
  // Check availability
  async checkAvailability(params: {
    date: string;
    facility?: string;
  }): Promise<AvailableSlots[]> {
    const response = await api.get<{ success: boolean; data: AvailableSlots[] }>(
      '/bookings/check-availability',
      { params }
    );
    return response.data.data;
  },

  // Create booking
  async createBooking(data: CreateBookingData): Promise<Booking> {
    const response = await api.post<{ success: boolean; data: Booking }>('/bookings', data);
    return response.data.data;
  },

  // Get all bookings (Admin only)
  async getAllBookings(params?: {
    date?: string;
    page?: number;
    limit?: number;
  }): Promise<Booking[]> {
    const response = await api.get<{ success: boolean; data: Booking[] }>('/bookings', { params });
    return response.data.data;
  },

  // Get user bookings
  async getUserBookings(): Promise<Booking[]> {
    const response = await api.get<{ success: boolean; data: Booking[] }>('/bookings/user');
    return response.data.data;
  },

  // Cancel booking
  async cancelBooking(id: string): Promise<Booking> {
    const response = await api.delete<{ success: boolean; data: Booking }>(`/bookings/${id}`);
    return response.data.data;
  },
};

export default bookingService;