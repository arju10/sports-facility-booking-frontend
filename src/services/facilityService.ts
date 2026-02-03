import api from '@/lib/api';

export interface Facility {
  _id: string;
  name: string;
  description: string;
  pricePerHour: number;
  location: string;
  image: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FacilityResponse {
  success: boolean;
  message: string;
  data: Facility;
}

export interface FacilitiesResponse {
  success: boolean;
  message: string;
  data: Facility[];
}

export interface CreateFacilityData {
  name: string;
  description: string;
  pricePerHour: number;
  location: string;
  image: string;
}

export interface UpdateFacilityData extends Partial<CreateFacilityData> {}

export interface AvailabilitySlot {
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export interface AvailabilityResponse {
  success: boolean;
  message: string;
  data: AvailabilitySlot[];
}

const facilityService = {
  // Get all facilities
  async getAllFacilities(): Promise<Facility[]> {
    const response = await api.get<FacilitiesResponse>('/facility');
    return response.data.data;
  },

  // Get single facility by ID
  async getFacilityById(id: string): Promise<Facility> {
    const response = await api.get<FacilityResponse>(`/facility/${id}`);
    return response.data.data;
  },

  // Create new facility (Admin only)
  async createFacility(data: CreateFacilityData): Promise<Facility> {
    const response = await api.post<FacilityResponse>('/facility', data);
    return response.data.data;
  },

  // Update facility (Admin only)
  async updateFacility(id: string, data: UpdateFacilityData): Promise<Facility> {
    const response = await api.put<FacilityResponse>(`/facility/${id}`, data);
    return response.data.data;
  },

  // Delete facility - Soft delete (Admin only)
  async deleteFacility(id: string): Promise<FacilityResponse> {
    const response = await api.delete<FacilityResponse>(`/facility/${id}`);
    return response.data;
  },

  // Check availability for a facility on a specific date
  async checkAvailability(facilityId: string, date: string): Promise<AvailabilitySlot[]> {
    const response = await api.get<AvailabilityResponse>(
      `/check-availability?date=${date}&facility=${facilityId}`
    );
    return response.data.data;
  },
};

export default facilityService;
