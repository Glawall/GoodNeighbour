CREATE TABLE IF NOT EXISTS help_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(24) NOT NULL,
    description VARCHAR(255) 
);