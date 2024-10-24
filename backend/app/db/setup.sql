-- Drop existing databases if they exist
\c postgres

DROP DATABASE IF EXISTS goodneighbour_test;
DROP DATABASE IF EXISTS goodneighbour;

-- Create new databases
CREATE DATABASE goodneighbour_test;
CREATE DATABASE goodneighbour;

-- Connect to the goodneighbour_test database and set up ENUM type
-- Run the following commands in a new psql session for goodneighbour_test:
\c goodneighbour_test;

CREATE TYPE REQUEST_STATUS AS ENUM ('active', 'completed', 'closed', 'agreed');
CREATE TYPE OFFER_STATUS AS ENUM ('accepted', 'declined', 'active');

-- Connect to the goodneighbour database and set up ENUM type
-- Run the following commands in a new psql session for community:
\c goodneighbour;

CREATE TYPE REQUEST_STATUS AS ENUM ('active', 'completed', 'closed', 'agreed');
CREATE TYPE OFFER_STATUS AS ENUM ('accepted', 'declined', 'active');
