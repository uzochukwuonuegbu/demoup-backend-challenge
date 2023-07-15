import { getDbClient } from './getDbClient';

const client = getDbClient();

async function createSchema() {
  try {
    await client.connect();

    // Define your schema creation queries here
    const schemaQueries = [
      'CREATE TABLE IF NOT EXISTS assets (id SERIAL PRIMARY KEY, title VARCHAR(255), description TEXT, fileFormat VARCHAR(50), size VARCHAR(50))',
      'CREATE TABLE IF NOT EXISTS assets_categories (id SERIAL PRIMARY KEY, assetId INTEGER REFERENCES assets(id), categoryId INTEGER REFERENCES categories(id))',
      'CREATE TABLE IF NOT EXISTS collections (id SERIAL PRIMARY KEY, name VARCHAR(255), description TEXT)',
      'CREATE TABLE IF NOT EXISTS collections_categories (id SERIAL PRIMARY KEY, collectionId INTEGER REFERENCES collections(id), categoryId INTEGER REFERENCES categories(id))',
      'CREATE TABLE IF NOT EXISTS categories (id SERIAL PRIMARY KEY, name VARCHAR(255), description TEXT)'
    ];

    for (const query of schemaQueries) {
      await client.query(query);
      console.log('Executed query:', query);
    }

    console.log('Schema creation completed successfully!');
  } catch (error) {
    console.error('Error creating schema:', error);
  } finally {
    await client.end();
  }
}

createSchema();