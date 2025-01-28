DROP TYPE IF EXISTS REQUEST_STATUS CASCADE;
DROP TYPE IF EXISTS OFFER_STATUS CASCADE;

CREATE TYPE REQUEST_STATUS AS ENUM ('active', 'completed', 'closed', 'agreed');
CREATE TYPE offer_status AS ENUM (
    'active',
    'accepted',
    'declined'
); 