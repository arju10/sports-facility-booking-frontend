// import api from '@/lib/api';

// export interface Facility {
//   _id: string;
//   name: string;
//   description: string;
//   pricePerHour: number;
//   location: string;
//   image?: string;
//   isDeleted: boolean;
// }

// export interface FacilityResponse {
//   success: boolean;
//   statusCode: number;
//   message: string;
//   data: Facility[];
//   meta?: {
//     page: number;
//     limit: number;
//     total: number;
//     totalPages: number;
//   };
// }

// const facilityService = {
//   async getAllFacilities(params?: {
//     searchTerm?: string;
//     page?: number;
//     limit?: number;
//     sort?: string;
//   }): Promise<FacilityResponse> {
//     const response = await api.get<FacilityResponse>('/facility', { params });
//     return response.data;
//   },

//   async getFacilityById(id: string): Promise<{ success: boolean; data: Facility }> {
//     const response = await api.get(`/facility/${id}`);
//     return response.data;
//   },

//   async createFacility(data: {
//     name: string;
//     description: string;
//     pricePerHour: number;
//     location: string;
//     image?: string;
//   }): Promise<{ success: boolean; data: Facility }> {
//     const response = await api.post('/facility', data);
//     return response.data;
//   },

//   async updateFacility(
//     id: string,
//     data: Partial<{
//       name: string;
//       description: string;
//       pricePerHour: number;
//       location: string;
//       image?: string;
//     }>
//   ): Promise<{ success: boolean; data: Facility }> {
//     const response = await api.put(`/facility/${id}`, data);
//     return response.data;
//   },

//   async deleteFacility(id: string): Promise<void> {
//     await api.delete(`/facility/${id}`);
//   },
// };

// export default facilityService;

import api from '@/lib/api';

export interface Facility {
  _id: string;
  name: string;
  description: string;
  pricePerHour: number;
  location: string;
  image?: string;
  isDeleted: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface FacilityResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Facility[];
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface CreateFacilityData {
  name: string;
  description: string;
  pricePerHour: number;
  location: string;
  image?: File | string; // Support both file upload and URL
}

const facilityService = {
  // Get all facilities
  async getAllFacilities(params?: {
    searchTerm?: string;
    page?: number;
    limit?: number;
    sort?: string;
  }): Promise<Facility[]> {
    const response = await api.get<FacilityResponse>('/facility', { params });
    return response.data.data;
  },

  // Get facility by ID
  async getFacilityById(id: string): Promise<Facility> {
    const response = await api.get<{ success: boolean; data: Facility }>(`/facility/${id}`);
    return response.data.data;
  },

  // Create facility with image upload
  async createFacility(data: CreateFacilityData): Promise<Facility> {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('pricePerHour', data.pricePerHour.toString());
    formData.append('location', data.location);
    
    if (data.image) {
      if (data.image instanceof File) {
        formData.append('image', data.image);
      } else {
        formData.append('image', data.image); // URL string
      }
    }

    const response = await api.post<{ success: boolean; data: Facility }>(
      '/facility',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data.data;
  },

  // Update facility
  async updateFacility(id: string, data: Partial<CreateFacilityData>): Promise<Facility> {
    const formData = new FormData();
    
    if (data.name) formData.append('name', data.name);
    if (data.description) formData.append('description', data.description);
    if (data.pricePerHour) formData.append('pricePerHour', data.pricePerHour.toString());
    if (data.location) formData.append('location', data.location);
    if (data.image) {
      if (data.image instanceof File) {
        formData.append('image', data.image);
      } else {
        formData.append('image', data.image);
      }
    }

    const response = await api.put<{ success: boolean; data: Facility }>(
      `/facility/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data.data;
  },

  // Delete facility
  async deleteFacility(id: string): Promise<void> {
    await api.delete(`/facility/${id}`);
  },
};

export default facilityService;