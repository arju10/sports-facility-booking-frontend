// import api from '@/lib/api';

// export interface User {
//   _id: string;
//   name: string;
//   email: string;
//   phone: string;
//   role: 'user' | 'admin';
//   address: string;
// }

// export interface LoginCredentials {
//   email: string;
//   password: string;
// }

// export interface RegisterData {
//   name: string;
//   email: string;
//   password: string;
//   phone: string;
//   address: string;
// }

// export interface AuthResponse {
//   success: boolean;
//   statusCode: number; 
//   message: string;
//   token: string;
//   data: User;
// }

// const authService = {
//   // Login user
//   async login(credentials: LoginCredentials): Promise<AuthResponse> {
//     const response = await api.post<AuthResponse>('/auth/login', credentials);
    
//     if (response.data.success && response.data.token) {
//       localStorage.setItem('token', response.data.token);
//       localStorage.setItem('user', JSON.stringify(response.data.data));
//     }
    
//     return response.data;
//   },

//   // Register new user
//   async register(data: RegisterData): Promise<AuthResponse> {
//     const response = await api.post<AuthResponse>('/auth/signup', {
//       ...data,
//       role: 'user', // Default role
//     });
    
//     if (response.data.success && response.data.token) {
//       localStorage.setItem('token', response.data.token);
//       localStorage.setItem('user', JSON.stringify(response.data.data));
//     }
    
//     return response.data;
//   },

//   // Logout user
//   logout(): void {
//     localStorage.removeItem('token');
//     localStorage.removeItem('refreshToken');
//     localStorage.removeItem('user');
//   },

//   // Get current user from localStorage
//   getCurrentUser(): User | null {
//     const userStr = localStorage.getItem('user');
//     if (userStr) {
//       try {
//         return JSON.parse(userStr);
//       } catch {
//         return null;
//       }
//     }
//     return null;
//   },

//   // Check if user is authenticated
//   isAuthenticated(): boolean {
//     return !!localStorage.getItem('token');
//   },

//   // Check if user is admin
//   isAdmin(): boolean {
//     const user = this.getCurrentUser();
//     return user?.role === 'admin';
//   },

//   // Get token
//   getToken(): string | null {
//     return localStorage.getItem('token');
//   },
// };

// export default authService;



// import api from '@/lib/api';

// export interface User {
//   _id: string;
//   name: string;
//   email: string;
//   phone: string;
//   role: 'user' | 'admin';
//   address: string;
// }

// export interface LoginCredentials {
//   email: string;
//   password: string;
// }

// export interface RegisterData {
//   name: string;
//   email: string;
//   password: string;
//   phone: string;
//   address: string;
// }

// export interface AuthResponse {
//   success: boolean;
//   statusCode: number;
//   message: string;
//   token: string;
//   data: User;
// }

// const authService = {
//   async login(credentials: LoginCredentials): Promise<AuthResponse> {
//     const response = await api.post<AuthResponse>('/auth/login', credentials);
    
//     if (response.data.success && response.data.token) {
//       localStorage.setItem('token', response.data.token); // Changed
//       localStorage.setItem('user', JSON.stringify(response.data.data));
//     }
    
//     return response.data;
//   },

//   async register(data: RegisterData): Promise<AuthResponse> {
//     const response = await api.post<AuthResponse>('/auth/signup', {
//       ...data,
//       role: 'user',
//     });
    
//     if (response.data.success && response.data.token) {
//       localStorage.setItem('token', response.data.token); // Changed
//       localStorage.setItem('user', JSON.stringify(response.data.data));
//     }
    
//     return response.data;
//   },

//   logout(): void {
//     localStorage.removeItem('token'); // Changed
//     localStorage.removeItem('user');
//   },

//   getCurrentUser(): User | null {
//     const userStr = localStorage.getItem('user');
//     if (userStr) {
//       try {
//         return JSON.parse(userStr);
//       } catch {
//         return null;
//       }
//     }
//     return null;
//   },

//   isAuthenticated(): boolean {
//     return !!localStorage.getItem('token'); // Changed
//   },

//   isAdmin(): boolean {
//     const user = this.getCurrentUser();
//     return user?.role === 'admin';
//   },

//   getToken(): string | null {
//     return localStorage.getItem('token'); // Changed
//   },
// };

// export default authService;




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
  role?: 'user' | 'admin'; // Optional, defaults to 'user' on backend
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
    console.log('🔐 Logging in...', { email: credentials.email });
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    
    if (response.data.success && response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data));
      console.log('✅ Login successful, role:', response.data.data.role);
    }
    
    return response.data;
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    console.log('📝 Registering...', { 
      email: data.email, 
      role: data.role || 'user' 
    });
    
    const response = await api.post<AuthResponse>('/auth/signup', {
      ...data,
      role: data.role || 'user', // Ensure role is sent
    });
    
    if (response.data.success && response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data));
      console.log('✅ Signup successful, role:', response.data.data.role);
    }
    
    return response.data;
  },

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log('👋 Logged out');
  },

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        console.log('👤 Current user:', { email: user.email, role: user.role });
        return user;
      } catch {
        return null;
      }
    }
    return null;
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  },

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },
};

export default authService;
