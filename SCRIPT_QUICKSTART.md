# Wherebuy Initialization Script - Quick Start

## What Was Added

An automated TypeScript/JavaScript script that initializes the Appwrite collection for Wherebuy in seconds!

### Files Added:
- `scripts/init-wherebuy-collection.js` - Main Node.js script
- `scripts/init-wherebuy-collection.ts` - TypeScript reference version
- `scripts/README.md` - Comprehensive documentation

### Files Modified:
- `package.json` - Added `init-wherebuy` script command and `dotenv` dependency
- `.env.example` - Added `APPWRITE_API_KEY` comment
- `WHEREBUY_README.md` - Added automated setup instructions

## Quick Start

### 1. Get Your API Key
1. Go to Appwrite Console → Settings → API Keys
2. Create API Key with Database permissions
3. Copy the key

### 2. Add to Environment
```bash
# Add to .env.local
APPWRITE_API_KEY=your_server_api_key_here
```

### 3. Run the Script
```bash
npm run init-wherebuy
```

### 4. Update Environment
Copy the Database ID and Collection ID from the script output to `.env.local`:
```env
NEXT_PUBLIC_APPWRITE_DATABASE_ID="abc123"
NEXT_PUBLIC_APPWRITE_LOCATIONS_COLLECTION_ID="xyz789"
```

### 5. Clean Up
Remove the API key from `.env.local` after setup.

### 6. Start Using!
```bash
npm run dev
```

Navigate to `/wherebuy` and start adding locations! 🛒📍

## What It Does

The script automates everything from the manual setup guide:

✅ Creates database (optional)
✅ Creates "locations" collection
✅ Adds 13 attributes:
  - productName (String, 255)
  - description (String, 1000)
  - price (Double)
  - currency (String, 10)
  - latitude (Double)
  - longitude (Double)
  - address (String, 500)
  - contactInfo (String, 255)
  - contactType (String, 20)
  - userId (String, 50)
  - userName (String, 255)
  - createdAt (String, 50)
  - updatedAt (String, 50)

✅ Creates 3 indexes:
  - productName_search (Fulltext)
  - createdAt_desc (Key, DESC)
  - userId_index (Key)

✅ Configures permissions:
  - Read: Any (public)
  - Create: Authenticated users

## Benefits

**Before:** 15-20 minutes of manual setup in Appwrite Console
**After:** 30 seconds with one command! ⚡

**Manual Setup:**
- Create database manually
- Create collection manually
- Add 13 attributes one by one
- Configure types and sizes for each
- Create 3 indexes
- Set up permissions

**Automated:**
```bash
npm run init-wherebuy
```
Done! 🎉

## Error Handling

The script includes:
- Environment variable validation
- API key permission checks
- Duplicate handling (won't fail if items exist)
- Clear error messages
- Recovery suggestions

## Example Output

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
  ...

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
```

## Documentation

See [scripts/README.md](./scripts/README.md) for:
- Detailed prerequisites
- Step-by-step instructions
- Troubleshooting guide
- What gets created
- Manual setup alternative

## Commit

Added in commit: `b17a598`

## Next Steps

After running the script:
1. ✅ Remove API key from `.env.local`
2. ✅ Restart dev server
3. ✅ Test the Wherebuy module
4. ✅ Share locations with your community!

---

**Time saved:** ~15-20 minutes per setup! ⚡
**User experience:** Much better! 🎉
**Errors avoided:** Manual entry mistakes eliminated! ✅
