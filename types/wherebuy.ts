export interface Location {
  $id?: string;
  productName: string;
  description: string;
  price: number;
  currency: string;
  latitude: number;
  longitude: number;
  address: string;
  contactInfo: string;
  contactType: 'online' | 'offline' | 'both';
  userId: string;
  userName: string;
  createdAt: string;
  updatedAt?: string;
}

export interface LocationFormData {
  productName: string;
  description: string;
  price: number;
  currency: string;
  latitude: number;
  longitude: number;
  address: string;
  contactInfo: string;
  contactType: 'online' | 'offline' | 'both';
}

export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}
