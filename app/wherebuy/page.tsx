'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import ProtectedRoute from '@/components/ProtectedRoute';
import LocationCard from '@/components/LocationCard';
import LocationForm from '@/components/LocationForm';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Loading from '@/components/Loading';
import { Location, LocationFormData } from '@/types/wherebuy';
import { wherebuyService } from '@/services/wherebuy';

export default function WherebuyPage() {
  const { user } = useAuth();
  const [locations, setLocations] = useState<Location[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    loadLocations();
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = locations.filter(location =>
        location.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        location.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        location.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredLocations(filtered);
    } else {
      setFilteredLocations(locations);
    }
  }, [searchQuery, locations]);

  const loadLocations = async () => {
    try {
      setLoading(true);
      const data = await wherebuyService.getLocations(100);
      setLocations(data);
      setFilteredLocations(data);
    } catch (err) {
      setError('Failed to load locations');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddLocation = async (data: LocationFormData) => {
    if (!user) return;
    
    try {
      await wherebuyService.createLocation(data, user.$id, user.name);
      setShowForm(false);
      await loadLocations();
    } catch {
      throw new Error('Failed to add location');
    }
  };

  const handleDeleteLocation = async (locationId: string) => {
    if (!confirm('Are you sure you want to delete this location?')) return;
    
    try {
      await wherebuyService.deleteLocation(locationId);
      await loadLocations();
    } catch (err) {
      setError('Failed to delete location');
      console.error(err);
    }
  };

  const handleViewDetails = (location: Location) => {
    setSelectedLocation(location);
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center">
          <Loading />
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              🛒 Wherebuy
            </h1>
            <p className="text-lg text-gray-600">
              Find and share shopping locations with detailed product information
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {/* Action Bar */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search for products, locations, or addresses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button
                variant="primary"
                onClick={() => setShowForm(!showForm)}
                className="whitespace-nowrap"
              >
                {showForm ? '❌ Cancel' : '➕ Add Location'}
              </Button>
            </div>
          </div>

          {/* Add Location Form */}
          {showForm && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Add New Location
              </h2>
              <LocationForm
                onSubmit={handleAddLocation}
                onCancel={() => setShowForm(false)}
              />
            </div>
          )}

          {/* Location Details Modal */}
          {selectedLocation && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedLocation.productName}
                  </h2>
                  <Button
                    variant="secondary"
                    onClick={() => setSelectedLocation(null)}
                    className="text-sm px-3"
                  >
                    ✕
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-2xl font-bold text-green-600">
                      {selectedLocation.currency} {selectedLocation.price.toLocaleString()}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-700 mb-1">Description</h3>
                    <p className="text-gray-600">{selectedLocation.description}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-700 mb-1">📍 Address</h3>
                    <p className="text-gray-600">{selectedLocation.address}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-700 mb-1">📞 Contact Info</h3>
                    <p className="text-gray-600">{selectedLocation.contactInfo}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-700 mb-1">Contact Type</h3>
                    <p className="text-gray-600 capitalize">{selectedLocation.contactType}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-700 mb-1">Shared By</h3>
                    <p className="text-gray-600">{selectedLocation.userName}</p>
                  </div>

                  <div className="pt-4 flex gap-2">
                    {(selectedLocation.contactType === 'offline' || selectedLocation.contactType === 'both') && (
                      <Button
                        variant="primary"
                        onClick={() => {
                          const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${selectedLocation.latitude},${selectedLocation.longitude}`;
                          window.open(googleMapsUrl, '_blank');
                        }}
                        className="flex-1"
                      >
                        🗺️ Open in Google Maps
                      </Button>
                    )}
                    {user && selectedLocation.userId === user.$id && (
                      <Button
                        variant="danger"
                        onClick={() => {
                          handleDeleteLocation(selectedLocation.$id!);
                          setSelectedLocation(null);
                        }}
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results Summary */}
          <div className="mb-4">
            <p className="text-gray-600">
              {filteredLocations.length} {filteredLocations.length === 1 ? 'location' : 'locations'} found
              {searchQuery && ` for "${searchQuery}"`}
            </p>
          </div>

          {/* Locations Grid */}
          {filteredLocations.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-500 text-lg mb-4">
                {searchQuery ? 'No locations found matching your search' : 'No locations yet'}
              </p>
              {!searchQuery && (
                <p className="text-gray-400">
                  Be the first to add a location!
                </p>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLocations.map((location) => (
                <LocationCard
                  key={location.$id}
                  location={location}
                  onViewDetails={handleViewDetails}
                  onDelete={user && location.userId === user.$id ? handleDeleteLocation : undefined}
                  showActions={true}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
