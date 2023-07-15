SELECT 'CREATE DATABASE "demoup-db"'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'demoup-db')\gexec

\connect 'demoup-db';

SELECT current_database();

CREATE TABLE IF NOT EXISTS assets (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    fileFormat VARCHAR(50),
    size VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description TEXT
);

CREATE TABLE IF NOT EXISTS assets_categories (
    id SERIAL PRIMARY KEY,
    assetId INTEGER REFERENCES assets(id),
    categoryId INTEGER REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS collections (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description TEXT
);

CREATE TABLE IF NOT EXISTS collections_categories (
    id SERIAL PRIMARY KEY,
    collectionId INTEGER REFERENCES collections(id),
    categoryId INTEGER REFERENCES categories(id)
);