import { ID, Query } from 'appwrite';
import { databases } from '@/lib/appwrite';
import { Location, LocationFormData } from '@/types/wherebuy';

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '';
const LOCATIONS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_LOCATIONS_COLLECTION_ID || '';

export const wherebuyService = {
  async createLocation(data: LocationFormData, userId: string, userName: string): Promise<Location> {
    try {
      const now = new Date().toISOString();
      const response = await databases.createDocument(
        DATABASE_ID,
        LOCATIONS_COLLECTION_ID,
        ID.unique(),
        {
          ...data,
          userId,
          userName,
          createdAt: now,
        }
      );
      return response as unknown as Location;
    } catch (error) {
      console.error('Create location error:', error);
      throw error;
    }
  },

  async getLocations(limit: number = 50): Promise<Location[]> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        LOCATIONS_COLLECTION_ID,
        [
          Query.orderDesc('createdAt'),
          Query.limit(limit),
        ]
      );
      return response.documents as unknown as Location[];
    } catch (error) {
      console.error('Get locations error:', error);
      throw error;
    }
  },

  async searchLocationsByProduct(productName: string): Promise<Location[]> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        LOCATIONS_COLLECTION_ID,
        [
          Query.search('productName', productName),
          Query.orderDesc('createdAt'),
        ]
      );
      return response.documents as unknown as Location[];
    } catch (error) {
      console.error('Search locations error:', error);
      throw error;
    }
  },

  async getLocationsByUser(userId: string): Promise<Location[]> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        LOCATIONS_COLLECTION_ID,
        [
          Query.equal('userId', userId),
          Query.orderDesc('createdAt'),
        ]
      );
      return response.documents as unknown as Location[];
    } catch (error) {
      console.error('Get user locations error:', error);
      throw error;
    }
  },

  async getLocation(locationId: string): Promise<Location> {
    try {
      const response = await databases.getDocument(
        DATABASE_ID,
        LOCATIONS_COLLECTION_ID,
        locationId
      );
      return response as unknown as Location;
    } catch (error) {
      console.error('Get location error:', error);
      throw error;
    }
  },

  async updateLocation(locationId: string, data: Partial<LocationFormData>): Promise<Location> {
    try {
      const response = await databases.updateDocument(
        DATABASE_ID,
        LOCATIONS_COLLECTION_ID,
        locationId,
        {
          ...data,
          updatedAt: new Date().toISOString(),
        }
      );
      return response as unknown as Location;
    } catch (error) {
      console.error('Update location error:', error);
      throw error;
    }
  },

  async deleteLocation(locationId: string): Promise<void> {
    try {
      await databases.deleteDocument(
        DATABASE_ID,
        LOCATIONS_COLLECTION_ID,
        locationId
      );
    } catch (error) {
      console.error('Delete location error:', error);
      throw error;
    }
  },
};
