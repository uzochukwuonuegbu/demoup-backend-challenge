import { getDbClient } from './getDbClient';

const client = getDbClient();

async function createSchema() {
  try {
    await client.connect();

    // Define your schema creation queries here
    const schemaQueries = [
      'CREATE TABLE IF NOT EXISTS categories (id SERIAL PRIMARY KEY, name VARCHAR(255), description TEXT, created_at TIMESTAMP, updated_at TIMESTAMP)',
      'CREATE TABLE IF NOT EXISTS collections (id SERIAL PRIMARY KEY, name VARCHAR(255), description TEXT, created_at TIMESTAMP, updated_at TIMESTAMP)',
      'CREATE TABLE IF NOT EXISTS assets (id SERIAL PRIMARY KEY, title VARCHAR(255), description TEXT, file_format VARCHAR(50), size VARCHAR(50), collection_id INTEGER REFERENCES collections(id), created_at TIMESTAMP, updated_at TIMESTAMP)',
      'CREATE TABLE IF NOT EXISTS assets_categories (id SERIAL PRIMARY KEY, asset_id INTEGER REFERENCES assets(id), category_id INTEGER REFERENCES categories(id), created_at TIMESTAMP, updated_at TIMESTAMP)',
      'CREATE TABLE IF NOT EXISTS collections_categories (id SERIAL PRIMARY KEY, collection_id INTEGER REFERENCES collections(id), category_id INTEGER REFERENCES categories(id), created_at TIMESTAMP, updated_at TIMESTAMP)',
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