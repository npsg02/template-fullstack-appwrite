'use client';

import React, { useState } from 'react';
import { LocationFormData } from '@/types/wherebuy';
import Input from './Input';
import Button from './Button';

interface LocationFormProps {
  onSubmit: (data: LocationFormData) => Promise<void>;
  onCancel?: () => void;
  initialData?: LocationFormData;
}

export default function LocationForm({ onSubmit, onCancel, initialData }: LocationFormProps) {
  const [formData, setFormData] = useState<LocationFormData>(initialData || {
    productName: '',
    description: '',
    price: 0,
    currency: 'VND',
    latitude: 0,
    longitude: 0,
    address: '',
    contactInfo: '',
    contactType: 'both',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'latitude' || name === 'longitude' 
        ? parseFloat(value) || 0 
        : value
    }));
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }));
        },
        (error) => {
          setError('Unable to get your location: ' + error.message);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await onSubmit(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save location');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <Input
        label="Product Name"
        name="productName"
        value={formData.productName}
        onChange={handleChange}
        required
        placeholder="e.g., Fresh Bananas"
      />

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Describe the product and any additional details..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Price"
          name="price"
          type="number"
          step="0.01"
          value={formData.price}
          onChange={handleChange}
          required
          placeholder="0.00"
        />

        <div>
          <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
            Currency
          </label>
          <select
            id="currency"
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="VND">VND</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
      </div>

      <Input
        label="Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        required
        placeholder="Full address"
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Latitude"
          name="latitude"
          type="number"
          step="any"
          value={formData.latitude}
          onChange={handleChange}
          required
          placeholder="0.000000"
        />

        <Input
          label="Longitude"
          name="longitude"
          type="number"
          step="any"
          value={formData.longitude}
          onChange={handleChange}
          required
          placeholder="0.000000"
        />
      </div>

      <Button
        type="button"
        variant="secondary"
        onClick={getCurrentLocation}
        className="w-full"
      >
        📍 Use Current Location
      </Button>

      <Input
        label="Contact Info"
        name="contactInfo"
        value={formData.contactInfo}
        onChange={handleChange}
        required
        placeholder="Phone number, email, or website"
      />

      <div>
        <label htmlFor="contactType" className="block text-sm font-medium text-gray-700 mb-1">
          Contact Type
        </label>
        <select
          id="contactType"
          name="contactType"
          value={formData.contactType}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="online">Online Only</option>
          <option value="offline">Offline Only (Physical Store)</option>
          <option value="both">Both Online & Offline</option>
        </select>
      </div>

      <div className="flex gap-4 pt-4">
        <Button
          type="submit"
          variant="primary"
          disabled={loading}
          className="flex-1"
        >
          {loading ? 'Saving...' : initialData ? 'Update Location' : 'Add Location'}
        </Button>
        
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
