import api from '@/lib/api';
import { User } from './authService';

export interface UsersResponse {
  success: boolean;
  message: string;
  data: User[];
}

export interface UserResponse {
  success: boolean;
  message: string;
  data: User;
}

export interface CreateAdminData {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}

export interface UpdateUserData {
  name?: string;
  phone?: string;
  address?: string;
}

const userService = {
  // Get all users (Admin only)
  async getAllUsers(): Promise<User[]> {
    const response = await api.get<UsersResponse>('/users');
    return response.data.data;
  },

  // Get user by ID
  async getUserById(id: string): Promise<User> {
    const response = await api.get<UserResponse>(`/users/${id}`);
    return response.data.data;
  },

  // Create new admin (Admin only)
  async createAdmin(data: CreateAdminData): Promise<User> {
    const response = await api.post<UserResponse>('/auth/create-admin', {
      ...data,
      role: 'admin',
    });
    return response.data.data;
  },

  // Update user profile
  async updateProfile(id: string, data: UpdateUserData): Promise<User> {
    const response = await api.put<UserResponse>(`/users/${id}`, data);
    return response.data.data;
  },

  // Delete user (Admin only)
  async deleteUser(id: string): Promise<UserResponse> {
    const response = await api.delete<UserResponse>(`/users/${id}`);
    return response.data;
  },
};

export default userService;
