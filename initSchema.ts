import { getDbClient } from './getDbClient';

const client = getDbClient();

async function createSchema() {
  try {
    await client.connect();

    // Define your schema creation queries here
    const schemaQueries = [
      'CREATE TABLE IF NOT EXISTS auth (id VARCHAR(255) PRIMARY KEY, email VARCHAR(255), password TEXT, created_at TIMESTAMP, updated_at TIMESTAMP)',
      'CREATE TABLE IF NOT EXISTS categories (id VARCHAR(255) PRIMARY KEY, name VARCHAR(255), description TEXT, created_at TIMESTAMP, updated_at TIMESTAMP)',
      'CREATE TABLE IF NOT EXISTS collections (id VARCHAR(255) PRIMARY KEY, name VARCHAR(255), description TEXT, created_at TIMESTAMP, updated_at TIMESTAMP)',
      'CREATE TABLE IF NOT EXISTS assets (id VARCHAR(255) PRIMARY KEY, title VARCHAR(255), description TEXT, url TEXT, collection_id VARCHAR(255) REFERENCES collections(id) on delete cascade, created_at TIMESTAMP, updated_at TIMESTAMP)',
      'CREATE TABLE IF NOT EXISTS assets_categories (id VARCHAR(255) PRIMARY KEY, asset_id VARCHAR(255) REFERENCES assets(id) on delete cascade, category_id VARCHAR(255) REFERENCES categories(id) on delete cascade, created_at TIMESTAMP, updated_at TIMESTAMP)',
      'CREATE TABLE IF NOT EXISTS collections_categories (id VARCHAR(255) PRIMARY KEY, collection_id VARCHAR(255) REFERENCES collections(id) on delete cascade, category_id VARCHAR(255) REFERENCES categories(id), created_at TIMESTAMP, updated_at TIMESTAMP)',
    ];

    for (const query of schemaQueries) {
      const res = await client.query(query);
      console.log('Executed query:', query, res);
    }

    console.log('Schema creation completed successfully!');
  } catch (error) {
    console.error('Error creating schema:', error);
  } finally {
    await client.end();
  }
}

createSchema();