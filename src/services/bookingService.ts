import api from '@/lib/api';
import { Facility } from './facilityService';
import { User } from './authService';

export interface Booking {
  _id: string;
  date: string;
  startTime: string;
  endTime: string;
  user: User | string;
  facility: Facility | string;
  payableAmount: number;
  isBooked: 'confirmed' | 'unconfirmed' | 'canceled';
  createdAt: string;
  updatedAt: string;
}

export interface BookingResponse {
  success: boolean;
  message: string;
  data: Booking;
}

export interface BookingsResponse {
  success: boolean;
  message: string;
  data: Booking[];
}

export interface CreateBookingData {
  facility: string;
  date: string;
  startTime: string;
  endTime: string;
}

const bookingService = {
  // Create a new booking
  async createBooking(data: CreateBookingData): Promise<Booking> {
    const response = await api.post<BookingResponse>('/bookings', data);
    return response.data.data;
  },

  // Get all bookings (Admin only)
  async getAllBookings(): Promise<Booking[]> {
    const response = await api.get<BookingsResponse>('/bookings');
    return response.data.data;
  },

  // Get user's bookings
  async getUserBookings(): Promise<Booking[]> {
    const response = await api.get<BookingsResponse>('/bookings/user');
    return response.data.data;
  },

  // Get single booking by ID
  async getBookingById(id: string): Promise<Booking> {
    const response = await api.get<BookingResponse>(`/bookings/${id}`);
    return response.data.data;
  },

  // Cancel booking
  async cancelBooking(id: string): Promise<Booking> {
    const response = await api.delete<BookingResponse>(`/bookings/${id}`);
    return response.data.data;
  },

  // Initiate payment (SSLCommerz)
  async initiatePayment(bookingId: string): Promise<{ url: string }> {
    const response = await api.post<{ success: boolean; data: { url: string } }>(
      `/payment/initiate/${bookingId}`
    );
    return response.data.data;
  },

  // Verify payment
  async verifyPayment(transactionId: string): Promise<BookingResponse> {
    const response = await api.get<BookingResponse>(`/payment/verify/${transactionId}`);
    return response.data;
  },
};

export default bookingService;
