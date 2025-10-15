import React from 'react';
import { Location } from '@/types/wherebuy';
import Button from './Button';

interface LocationCardProps {
  location: Location;
  onViewDetails?: (location: Location) => void;
  onDelete?: (locationId: string) => void;
  showActions?: boolean;
}

export default function LocationCard({ 
  location, 
  onViewDetails, 
  onDelete,
  showActions = true 
}: LocationCardProps) {
  const handleNavigate = () => {
    if (location.contactType === 'offline' || location.contactType === 'both') {
      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`;
      window.open(googleMapsUrl, '_blank');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-900">{location.productName}</h3>
        <span className="text-lg font-bold text-green-600">
          {location.currency} {location.price.toLocaleString()}
        </span>
      </div>
      
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{location.description}</p>
      
      <div className="space-y-2 mb-3">
        <div className="flex items-center text-sm text-gray-700">
          <span className="mr-2">📍</span>
          <span className="truncate">{location.address}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-700">
          <span className="mr-2">
            {location.contactType === 'online' ? '🌐' : location.contactType === 'offline' ? '🏪' : '🔄'}
          </span>
          <span>{location.contactType === 'online' ? 'Online' : location.contactType === 'offline' ? 'Offline' : 'Both'}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-700">
          <span className="mr-2">📞</span>
          <span className="truncate">{location.contactInfo}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-500">
          <span className="mr-2">👤</span>
          <span>Shared by {location.userName}</span>
        </div>
      </div>
      
      {showActions && (
        <div className="flex gap-2 mt-4">
          {onViewDetails && (
            <Button 
              variant="primary" 
              onClick={() => onViewDetails(location)}
              className="flex-1 text-sm"
            >
              View Details
            </Button>
          )}
          
          {(location.contactType === 'offline' || location.contactType === 'both') && (
            <Button 
              variant="secondary" 
              onClick={handleNavigate}
              className="flex-1 text-sm"
            >
              Navigate
            </Button>
          )}
          
          {onDelete && (
            <Button 
              variant="danger" 
              onClick={() => onDelete(location.$id!)}
              className="text-sm px-3"
            >
              Delete
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
