import api from '@/lib/api';

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'admin';
  address: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}

export interface AuthResponse {
  success: boolean;
  statusCode: number;
  message: string;
  token: string;
  data: User;
}

const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    
    if (response.data.success && response.data.token) {
      localStorage.setItem('token', response.data.token); // Changed
      localStorage.setItem('user', JSON.stringify(response.data.data));
    }
    
    return response.data;
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/signup', {
      ...data,
      role: 'user',
    });
    
    if (response.data.success && response.data.token) {
      localStorage.setItem('token', response.data.token); // Changed
      localStorage.setItem('user', JSON.stringify(response.data.data));
    }
    
    return response.data;
  },

  logout(): void {
    localStorage.removeItem('token'); // Changed
    localStorage.removeItem('user');
  },

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // Changed
  },

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  },

  getToken(): string | null {
    return localStorage.getItem('token'); // Changed
  },
};

export default authService;