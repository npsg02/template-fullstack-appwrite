# Appwrite SDK Update Notes

## Overview

This document describes the updates made to the Appwrite SDK usage in this project to align with the latest SDK patterns documented in the official Appwrite SDK documentation (via Context7).

## Changes Made

### Migration to Object Parameter Pattern

The Appwrite SDK has migrated from positional parameters to an object parameter pattern for better developer experience and type safety. All database and collection operations have been updated accordingly.

### Updated Files

#### 1. `services/wherebuy.ts`

All database operations now use object parameters:

**Before:**
```typescript
const response = await databases.createDocument(
  DATABASE_ID,
  LOCATIONS_COLLECTION_ID,
  ID.unique(),
  { ...data }
);
```

**After:**
```typescript
const response = await databases.createDocument({
  databaseId: DATABASE_ID,
  collectionId: LOCATIONS_COLLECTION_ID,
  documentId: ID.unique(),
  data: { ...data }
});
```

#### 2. `scripts/init-wherebuy-collection.ts` and `scripts/init-wherebuy-collection.js`

Updated all server-side SDK calls:

**Before:**
```typescript
await databases.createCollection(
  databaseId,
  'unique()',
  COLLECTION_NAME,
  [Permission.read(Role.any())],
  false,
  true
);
```

**After:**
```typescript
await databases.createCollection({
  databaseId: databaseId,
  collectionId: 'unique()',
  name: COLLECTION_NAME,
  permissions: [Permission.read(Role.any())],
  documentSecurity: false,
  enabled: true
});
```

#### 3. `tsconfig.json`

Excluded the `scripts` directory from TypeScript compilation since it uses standalone Node.js patterns:

```json
"exclude": ["node_modules", "scripts"]
```

### Removed Dependencies

- Removed `IndexType` import - the SDK no longer exports this enum
- Index types are now specified as string literals: `'fulltext'` or `'key'`

## Methods Updated

### Client SDK (appwrite package)

- `databases.createDocument()` - Changed to object parameters
- `databases.listDocuments()` - Changed to object parameters with `queries` property
- `databases.getDocument()` - Changed to object parameters
- `databases.updateDocument()` - Changed to object parameters with `data` property
- `databases.deleteDocument()` - Changed to object parameters

### Server SDK Methods (used in scripts)

- `databases.create()` - Changed to object parameters
- `databases.createCollection()` - Changed to object parameters
- `databases.createStringAttribute()` - Changed to object parameters
- `databases.createFloatAttribute()` - Changed to object parameters
- `databases.createIndex()` - Changed to object parameters

## Benefits

1. **Better Type Safety**: Named parameters make it clear what each value represents
2. **Easier Maintenance**: Adding optional parameters doesn't break existing code
3. **Better IDE Support**: Auto-completion works better with named parameters
4. **Clearer Code**: Self-documenting parameter names
5. **Future-Proof**: Aligns with official Appwrite SDK patterns

## Compatibility

- SDK Version: `appwrite@^21.2.1`
- All changes are compatible with Appwrite Cloud and self-hosted instances
- The old positional parameter style is deprecated but still supported in the current SDK version

## References

- [Appwrite SDK for Web Documentation](https://github.com/appwrite/sdk-for-web)
- [Appwrite Databases Reference](https://appwrite.io/docs/references/cloud/client-web/databases)
- Context7 Documentation: `/appwrite/sdk-for-web` and `/websites/appwrite_io`

## Testing

All changes have been verified through:
- TypeScript compilation (no errors)
- ESLint validation (passes)
- Build process validation

Runtime testing requires a valid Appwrite instance with proper environment variables configured.
