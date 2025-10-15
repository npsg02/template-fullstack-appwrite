#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Wherebuy Collection Initialization Script
 * 
 * This script automates the creation of the "locations" collection in Appwrite
 * for the Wherebuy module, including all attributes, indexes, and permissions.
 * 
 * Prerequisites:
 * - Appwrite account with a project created
 * - Environment variables set:
 *   - NEXT_PUBLIC_APPWRITE_ENDPOINT
 *   - NEXT_PUBLIC_APPWRITE_PROJECT_ID
 *   - APPWRITE_API_KEY (Server API key with Database permissions)
 *   - NEXT_PUBLIC_APPWRITE_DATABASE_ID (optional, will create if not provided)
 * 
 * Usage:
 *   npm run init-wherebuy
 */

import { Client, Databases, Permission, Role } from 'appwrite';

// Load environment variables
const ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const API_KEY = process.env.APPWRITE_API_KEY;
let DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;

// Validate required environment variables
if (!ENDPOINT || !PROJECT_ID || !API_KEY) {
  console.error('❌ Error: Missing required environment variables');
  console.error('Please set the following in your .env.local:');
  console.error('  - NEXT_PUBLIC_APPWRITE_ENDPOINT');
  console.error('  - NEXT_PUBLIC_APPWRITE_PROJECT_ID');
  console.error('  - APPWRITE_API_KEY (get this from Appwrite Console → Settings → API Keys)');
  process.exit(1);
}

// Initialize Appwrite client
const client = new Client()
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID)
  .setKey(API_KEY);

const databases = new Databases(client);

// Collection configuration
const COLLECTION_NAME = 'locations';

// Attribute definitions
const attributes = [
  { key: 'productName', type: 'string', size: 255, required: true, description: 'Name of the product being sold' },
  { key: 'description', type: 'string', size: 1000, required: true, description: 'Detailed description of the product' },
  { key: 'price', type: 'double', required: true, description: 'Price of the product' },
  { key: 'currency', type: 'string', size: 10, required: true, description: 'Currency code (VND, USD, EUR)' },
  { key: 'latitude', type: 'double', required: true, description: 'GPS latitude coordinate' },
  { key: 'longitude', type: 'double', required: true, description: 'GPS longitude coordinate' },
  { key: 'address', type: 'string', size: 500, required: true, description: 'Physical address of the location' },
  { key: 'contactInfo', type: 'string', size: 255, required: true, description: 'Contact information (phone, email, website)' },
  { key: 'contactType', type: 'string', size: 20, required: true, description: 'Type of contact: online, offline, or both' },
  { key: 'userId', type: 'string', size: 50, required: true, description: 'ID of the user who created the location' },
  { key: 'userName', type: 'string', size: 255, required: true, description: 'Name of the user who created the location' },
  { key: 'createdAt', type: 'string', size: 50, required: true, description: 'ISO timestamp of creation' },
  { key: 'updatedAt', type: 'string', size: 50, required: false, description: 'ISO timestamp of last update' },
];

// Index definitions
const indexes = [
  { key: 'productName_search', type: 'fulltext', attributes: ['productName'], description: 'Full-text search on product names' },
  { key: 'createdAt_desc', type: 'key', attributes: ['createdAt'], orders: ['DESC'], description: 'Sort by creation date descending' },
  { key: 'userId_index', type: 'key', attributes: ['userId'], description: 'Filter by user ID' },
];

async function createDatabase(): Promise<string> {
  try {
    console.log('📦 Creating database...');
    const database = await databases.create({
      databaseId: 'unique()',
      name: 'wherebuy-db',
      enabled: true
    });
    console.log(`✅ Database created: ${database.$id}`);
    return database.$id;
  } catch (error: any) {
    if (error.code === 409) {
      console.log('ℹ️  Database already exists, using existing one');
      // If database already exists, we need to get it from the user
      throw new Error('Database ID not provided and could not create new one. Please provide NEXT_PUBLIC_APPWRITE_DATABASE_ID');
    }
    throw error;
  }
}

async function createCollection(databaseId: string): Promise<string> {
  try {
    console.log(`\n📋 Creating collection "${COLLECTION_NAME}"...`);
    const collection = await databases.createCollection({
      databaseId: databaseId,
      collectionId: 'unique()',
      name: COLLECTION_NAME,
      permissions: [
        Permission.read(Role.any()),
        Permission.create(Role.users()),
      ],
      documentSecurity: false, // we'll handle permissions at app level
      enabled: true
    });
    console.log(`✅ Collection created: ${collection.$id}`);
    return collection.$id;
  } catch (error: any) {
    if (error.code === 409) {
      console.error('❌ Error: Collection already exists');
      console.error('Please delete the existing collection or use a different name');
    }
    throw error;
  }
}

async function createAttributes(databaseId: string, collectionId: string): Promise<void> {
  console.log('\n🔧 Creating attributes...');
  
  for (const attr of attributes) {
    try {
      if (attr.type === 'string') {
        await databases.createStringAttribute({
          databaseId: databaseId,
          collectionId: collectionId,
          key: attr.key,
          size: attr.size!,
          required: attr.required
        });
      } else if (attr.type === 'double') {
        await databases.createFloatAttribute({
          databaseId: databaseId,
          collectionId: collectionId,
          key: attr.key,
          required: attr.required
        });
      }
      console.log(`  ✓ Created attribute: ${attr.key} (${attr.type})`);
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error: any) {
      if (error.code === 409) {
        console.log(`  ℹ️  Attribute already exists: ${attr.key}`);
      } else {
        console.error(`  ❌ Error creating attribute ${attr.key}:`, error.message);
      }
    }
  }
  
  // Wait for all attributes to be available
  console.log('\n⏳ Waiting for attributes to be ready...');
  await new Promise(resolve => setTimeout(resolve, 5000));
}

async function createIndexes(databaseId: string, collectionId: string): Promise<void> {
  console.log('\n📊 Creating indexes...');
  
  for (const index of indexes) {
    try {
      await databases.createIndex({
        databaseId: databaseId,
        collectionId: collectionId,
        key: index.key,
        type: index.type,
        attributes: index.attributes,
        orders: index.orders
      });
      console.log(`  ✓ Created index: ${index.key} (${index.type})`);
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error: any) {
      if (error.code === 409) {
        console.log(`  ℹ️  Index already exists: ${index.key}`);
      } else {
        console.error(`  ❌ Error creating index ${index.key}:`, error.message);
      }
    }
  }
}

async function displaySummary(databaseId: string, collectionId: string): Promise<void> {
  console.log('\n' + '='.repeat(60));
  console.log('🎉 Wherebuy Collection Initialization Complete!');
  console.log('='.repeat(60));
  console.log('\n📋 Collection Details:');
  console.log(`  Database ID:    ${databaseId}`);
  console.log(`  Collection ID:  ${collectionId}`);
  console.log(`  Attributes:     ${attributes.length} created`);
  console.log(`  Indexes:        ${indexes.length} created`);
  
  console.log('\n📝 Next Steps:');
  console.log('1. Update your .env.local file with:');
  console.log(`   NEXT_PUBLIC_APPWRITE_DATABASE_ID="${databaseId}"`);
  console.log(`   NEXT_PUBLIC_APPWRITE_LOCATIONS_COLLECTION_ID="${collectionId}"`);
  console.log('\n2. Restart your development server:');
  console.log('   npm run dev');
  console.log('\n3. Navigate to /wherebuy in your application');
  console.log('\n4. Start adding and sharing locations! 🛒📍');
  console.log('\n' + '='.repeat(60));
}

async function main() {
  console.log('🚀 Wherebuy Collection Initialization Script');
  console.log('='.repeat(60));
  
  try {
    // Step 1: Ensure database exists
    if (!DATABASE_ID) {
      console.log('⚠️  No DATABASE_ID provided, creating new database...');
      DATABASE_ID = await createDatabase();
    } else {
      console.log(`✅ Using existing database: ${DATABASE_ID}`);
    }
    
    // Step 2: Create collection
    const collectionId = await createCollection(DATABASE_ID);
    
    // Step 3: Create attributes
    await createAttributes(DATABASE_ID, collectionId);
    
    // Step 4: Create indexes
    await createIndexes(DATABASE_ID, collectionId);
    
    // Step 5: Display summary
    await displaySummary(DATABASE_ID, collectionId);
    
    console.log('\n✅ All done! The Wherebuy collection is ready to use.\n');
    process.exit(0);
  } catch (error: any) {
    console.error('\n❌ Error during initialization:', error.message);
    console.error('\nPlease check:');
    console.error('  1. Your Appwrite endpoint and project ID are correct');
    console.error('  2. Your API key has Database permissions');
    console.error('  3. The collection does not already exist');
    console.error('\nFor more help, see WHEREBUY_README.md\n');
    process.exit(1);
  }
}

// Run the script
main();
