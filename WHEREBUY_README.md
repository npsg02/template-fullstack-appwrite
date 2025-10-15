# Wherebuy Module

## Overview

Wherebuy is a location-based marketplace application that helps users find and share shopping locations with detailed product information. Users can mark locations where they buy products, add pricing details, and share with others. The app provides Google Maps integration for navigation to physical stores and contact information for online purchases.

## Features

- **Location Management**: Add, view, and delete shopping locations
- **Product Details**: Include product name, description, price, and currency
- **Contact Options**: Support for online, offline, or both purchase types
- **Search Functionality**: Find locations by product name, description, or address
- **Map Integration**: Navigate to physical stores using Google Maps
- **User Sharing**: See who shared each location
- **Geolocation**: Use current location to add new places

## Appwrite Setup

Before using the Wherebuy module, you need to configure Appwrite Database.

### Option A: Automated Setup (Recommended) 🚀

Use our initialization script to automatically create the database, collection, attributes, and indexes:

1. **Create an API Key** in Appwrite Console:
   - Go to **Settings** → **API Keys** → **Create API Key**
   - Enable Database scopes (databases, collections, attributes, indexes)
   - Copy the API key

2. **Add to `.env.local`**:
   ```env
   APPWRITE_API_KEY=your_server_api_key_here
   ```

3. **Run the script**:
   ```bash
   npm run init-wherebuy
   ```

4. **Update `.env.local`** with the Database ID and Collection ID from the script output

5. **Remove the API key** from `.env.local` after setup

See [scripts/README.md](./scripts/README.md) for detailed instructions.

### Option B: Manual Setup

If you prefer to set up manually, follow these steps:

### 1. Create a Database

1. Go to your Appwrite Console
2. Navigate to **Databases**
3. Click **Create Database**
4. Name it (e.g., "wherebuy-db")
5. Copy the Database ID

### 2. Create a Locations Collection

1. In your database, click **Create Collection**
2. Name it "locations"
3. Copy the Collection ID

### 3. Configure Collection Attributes

Add the following attributes to your "locations" collection:

| Attribute Name | Type   | Size | Required | Array | Default |
|---------------|--------|------|----------|-------|---------|
| productName   | String | 255  | Yes      | No    | -       |
| description   | String | 1000 | Yes      | No    | -       |
| price         | Double | -    | Yes      | No    | -       |
| currency      | String | 10   | Yes      | No    | -       |
| latitude      | Double | -    | Yes      | No    | -       |
| longitude     | Double | -    | Yes      | No    | -       |
| address       | String | 500  | Yes      | No    | -       |
| contactInfo   | String | 255  | Yes      | No    | -       |
| contactType   | String | 20   | Yes      | No    | -       |
| userId        | String | 50   | Yes      | No    | -       |
| userName      | String | 255  | Yes      | No    | -       |
| createdAt     | String | 50   | Yes      | No    | -       |
| updatedAt     | String | 50   | No       | No    | -       |

### 4. Configure Indexes (Optional but Recommended)

Add these indexes for better performance:

- **productName_search**: Type `fulltext`, Attribute `productName`
- **createdAt_desc**: Type `key`, Attribute `createdAt`, Order `DESC`
- **userId_index**: Type `key`, Attribute `userId`

### 5. Configure Permissions

Set collection permissions:

- **Create**: Any authenticated user
- **Read**: Any (to allow everyone to see locations)
- **Update**: Document Owner (users can only update their own locations)
- **Delete**: Document Owner (users can only delete their own locations)

To configure permissions:
1. Go to **Settings** tab of your collection
2. Add permission for **Create**: Role `users` (All Users)
3. Add permission for **Read**: Role `any`
4. For Update and Delete, the app handles this by checking userId

### 6. Update Environment Variables

Add the following to your `.env.local` file:

```env
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id_here
NEXT_PUBLIC_APPWRITE_LOCATIONS_COLLECTION_ID=your_locations_collection_id_here
```

## Usage

### Accessing Wherebuy

1. Login or register an account
2. Click **Wherebuy** in the navigation bar
3. You'll see the Wherebuy page with existing locations

### Adding a Location

1. Click **Add Location** button
2. Fill in the form:
   - **Product Name**: What you're selling/buying (e.g., "Fresh Bananas")
   - **Description**: Details about the product
   - **Price**: The cost of the product
   - **Currency**: Select VND, USD, or EUR
   - **Address**: Physical address of the location
   - **Latitude/Longitude**: Click "Use Current Location" or enter manually
   - **Contact Info**: Phone, email, or website
   - **Contact Type**: Online, Offline, or Both
3. Click **Add Location** to save

### Searching for Locations

1. Use the search bar at the top
2. Type product name, description, or address
3. Results filter in real-time

### Viewing Location Details

1. Click **View Details** on any location card
2. See full information including:
   - Product details and price
   - Complete address
   - Contact information
   - Who shared the location
3. Click **Open in Google Maps** to navigate (for offline/both locations)

### Managing Your Locations

- You can only delete locations you created
- Click **Delete** button on your location cards or in the detail modal
- Confirm the deletion

## Google Maps Integration

The app integrates with Google Maps for navigation:

- When viewing a location with offline or both contact types, you can click "Navigate" or "Open in Google Maps"
- This opens Google Maps in a new tab with the location coordinates
- Users can then get directions from their current location

## Technical Details

### File Structure

```
├── app/wherebuy/
│   └── page.tsx           # Main Wherebuy page
├── components/
│   ├── LocationCard.tsx   # Location display card
│   └── LocationForm.tsx   # Form for adding locations
├── services/
│   └── wherebuy.ts        # Wherebuy service layer
└── types/
    └── wherebuy.ts        # TypeScript types
```

### Key Components

- **WherebuyPage**: Main page with search, add, and list functionality
- **LocationCard**: Displays location information in a card format
- **LocationForm**: Form for adding/editing locations with geolocation support

### Service Methods

- `createLocation()`: Add a new location
- `getLocations()`: Fetch all locations
- `searchLocationsByProduct()`: Search locations by product name
- `getLocationsByUser()`: Get locations by a specific user
- `getLocation()`: Get a single location by ID
- `updateLocation()`: Update a location
- `deleteLocation()`: Delete a location

## Browser Permissions

The app requests the following browser permissions:

- **Geolocation**: To use "Use Current Location" feature when adding locations
- Users can deny this permission and manually enter coordinates

## Troubleshooting

### "Failed to load locations" error
- Check that your Database ID and Collection ID are correct in `.env.local`
- Verify Appwrite is running and accessible
- Check collection permissions

### "Invalid endpoint URL" error
- Verify `NEXT_PUBLIC_APPWRITE_ENDPOINT` is set correctly

### Geolocation not working
- Ensure your browser supports geolocation
- Check that you've granted location permissions
- HTTPS is required for geolocation in most browsers

### Can't delete other users' locations
- This is by design for security
- Only the user who created a location can delete it

## Future Enhancements

Potential features to add:

- Map view with pins for all locations
- Filtering by price range and distance
- User ratings and reviews
- Photo uploads for locations
- Categories for products
- Nearby locations based on user's current position
- Real-time updates when new locations are added
