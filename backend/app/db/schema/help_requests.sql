CREATE TYPE REQUEST_STATUS AS ENUM ('active', 'completed', 'closed', 'agreed');
CREATE TYPE OFFER_STATUS AS ENUM ('accepted', 'declined', 'active');

CREATE TABLE help_requests (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author_id INT REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    help_type_id INT REFERENCES help_types(id) ON DELETE CASCADE NOT NULL,
    description VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    req_date TIMESTAMPTZ NOT NULL,
    status REQUEST_STATUS DEFAULT 'active' NOT NULL
);