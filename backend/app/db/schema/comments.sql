
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    author_id INT REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    help_request_id INT REFERENCES help_requests(id) ON DELETE CASCADE NOT NULL,
    parent_id INT REFERENCES comments(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    description VARCHAR(255) 
);