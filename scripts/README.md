# Wherebuy Collection Initialization Script

This directory contains a script to automatically initialize the Appwrite database and collection for the Wherebuy module.

## What It Does

The `init-wherebuy-collection.js` script will:

1. ✅ Create a new database (if `DATABASE_ID` is not provided) or use an existing one
2. ✅ Create the "locations" collection with proper permissions
3. ✅ Add all 13 required attributes with correct types and sizes
4. ✅ Create 3 indexes for optimized queries
5. ✅ Display the Database ID and Collection ID for your `.env.local`

## Prerequisites

Before running the script, you need:

1. **Appwrite Account**: Sign up at [cloud.appwrite.io](https://cloud.appwrite.io) or have a self-hosted instance
2. **Appwrite Project**: Create a new project in the Appwrite Console
3. **API Key**: Generate a server-side API key with Database permissions

### Creating an API Key

1. Go to your Appwrite Console
2. Navigate to **Settings** → **API Keys**
3. Click **Create API Key**
4. Name it (e.g., "Database Setup")
5. Under **Scopes**, enable:
   - `databases.read`
   - `databases.write`
   - `collections.read`
   - `collections.write`
   - `attributes.read`
   - `attributes.write`
   - `indexes.read`
   - `indexes.write`
6. Click **Create**
7. Copy the API key (you won't see it again!)

## Setup

1. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Create `.env.local`** file in the root directory:
   ```bash
   cp .env.example .env.local
   ```

3. **Add required environment variables** to `.env.local`:
   ```env
   NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id_here
   APPWRITE_API_KEY=your_server_api_key_here
   
   # Optional: If you already have a database
   NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id_here
   ```

## Usage

Run the script with npm:

```bash
npm run init-wherebuy
```

### Example Output

```
🚀 Wherebuy Collection Initialization Script
============================================================
✅ Using existing database: 6789abcdef
📋 Creating collection "locations"...
✅ Collection created: 123456789abc

🔧 Creating attributes...
  ✓ Created attribute: productName (string)
  ✓ Created attribute: description (string)
  ✓ Created attribute: price (double)
  ✓ Created attribute: currency (string)
  ✓ Created attribute: latitude (double)
  ✓ Created attribute: longitude (double)
  ✓ Created attribute: address (string)
  ✓ Created attribute: contactInfo (string)
  ✓ Created attribute: contactType (string)
  ✓ Created attribute: userId (string)
  ✓ Created attribute: userName (string)
  ✓ Created attribute: createdAt (string)
  ✓ Created attribute: updatedAt (string)

⏳ Waiting for attributes to be ready...

📊 Creating indexes...
  ✓ Created index: productName_search (fulltext)
  ✓ Created index: createdAt_desc (key)
  ✓ Created index: userId_index (key)

============================================================
🎉 Wherebuy Collection Initialization Complete!
============================================================

📋 Collection Details:
  Database ID:    6789abcdef
  Collection ID:  123456789abc
  Attributes:     13 created
  Indexes:        3 created

📝 Next Steps:
1. Update your .env.local file with:
   NEXT_PUBLIC_APPWRITE_DATABASE_ID="6789abcdef"
   NEXT_PUBLIC_APPWRITE_LOCATIONS_COLLECTION_ID="123456789abc"

2. Restart your development server:
   npm run dev

3. Navigate to /wherebuy in your application

4. Start adding and sharing locations! 🛒📍

============================================================
✅ All done! The Wherebuy collection is ready to use.
```

## After Running the Script

1. **Update `.env.local`** with the Database ID and Collection ID shown in the output

2. **Remove the API key** from `.env.local` (it's only needed for this script):
   ```env
   # Remove this line after running the script:
   # APPWRITE_API_KEY=your_server_api_key_here
   ```

3. **Restart your development server**:
   ```bash
   npm run dev
   ```

4. **Test the Wherebuy module**:
   - Navigate to `http://localhost:3000`
   - Login or register
   - Click "Wherebuy" in the navigation
   - Try adding a location!

## What Gets Created

### Database (if not provided)
- **Name**: `wherebuy-db`
- **Status**: Enabled

### Collection
- **Name**: `locations`
- **Permissions**:
  - Read: Any (public)
  - Create: Authenticated users only
  - Update: Document owner only
  - Delete: Document owner only

### Attributes (13 total)

| Attribute | Type | Size | Required | Description |
|-----------|------|------|----------|-------------|
| productName | String | 255 | Yes | Name of the product |
| description | String | 1000 | Yes | Product description |
| price | Double | - | Yes | Product price |
| currency | String | 10 | Yes | Currency code |
| latitude | Double | - | Yes | GPS latitude |
| longitude | Double | - | Yes | GPS longitude |
| address | String | 500 | Yes | Physical address |
| contactInfo | String | 255 | Yes | Contact information |
| contactType | String | 20 | Yes | online/offline/both |
| userId | String | 50 | Yes | Creator's user ID |
| userName | String | 255 | Yes | Creator's name |
| createdAt | String | 50 | Yes | Creation timestamp |
| updatedAt | String | 50 | No | Update timestamp |

### Indexes (3 total)

| Index | Type | Attributes | Order | Purpose |
|-------|------|------------|-------|---------|
| productName_search | Fulltext | productName | - | Fast product search |
| createdAt_desc | Key | createdAt | DESC | Sort by date |
| userId_index | Key | userId | - | Filter by user |

## Troubleshooting

### Error: Missing required environment variables
- Make sure `.env.local` exists and has all required variables
- Check that variable names match exactly (case-sensitive)

### Error: Invalid API key
- Verify the API key is correct
- Make sure the API key has Database permissions
- Check that the key hasn't expired

### Error: Collection already exists
- The collection might already be created
- Check your Appwrite Console → Databases → Collections
- Either delete the existing collection or use it

### Error: Rate limiting
- The script includes delays to avoid rate limits
- If you still hit rate limits, wait a few minutes and try again

### Error: Network issues
- Check your internet connection
- Verify the Appwrite endpoint is correct
- Make sure Appwrite is accessible from your network

## Manual Setup Alternative

If you prefer to set up the collection manually, see the detailed instructions in [WHEREBUY_README.md](../WHEREBUY_README.md#3-configure-collection-attributes).

## Script Files

- **`init-wherebuy-collection.js`** - Main JavaScript script (Node.js)
- **`init-wherebuy-collection.ts`** - TypeScript version (for reference)

The JavaScript version is used by default because it runs directly with Node.js without compilation.

## Support

For more help:
- See [WHEREBUY_README.md](../WHEREBUY_README.md) for complete setup guide
- Check [IMPLEMENTATION_SUMMARY.md](../IMPLEMENTATION_SUMMARY.md) for technical details
- Visit [Appwrite Documentation](https://appwrite.io/docs)

---

**Note**: The `APPWRITE_API_KEY` is only needed for this initialization script. Do not commit it to version control or use it in your frontend application. After running the script, you can remove it from your `.env.local` file.
