# GoodNeighbour

A community-focused web application that connects people who need help with those who can provide it. Built with React, Node.js, Express, and PostgreSQL. Features an interactive map to visualize and coordinate help requests in your local area.

## Features

- 🤝 Create and Manage Help Requests
- 🗺️ Interactive Map Integration
- 👥 User Authentication
- 📍 Location-Based Services
- 🔍 Advanced Filtering and Sorting
- 📱 Responsive Design
- 💬 Real-time Comments and Discussions
- 🎯 Help Type Categorization
- 📍 Distance-Based Filtering
- 🤝 Help Offer Management

### User Capabilities

- Create and manage help requests
- Offer help to others
- Filter requests by distance and type
- Comment on help requests
- View requests on an interactive map
- Update profile and preferences
- Manage help offers and requests
- Set help radius preferences

## Live Demo

The application is currently deployed at:

Frontend: https://Glawall.github.io/GoodNeighbour/

Note: Initial load might take a minute as it's hosted on a free service.

User: Any email in the ddevelpment user database file e.g Cuthbert_Wilkinson47@gmail.com (password: password123)

## Setting Up for Local Development

### Prerequisites

1. Node.js (LTS version)
2. PostgreSQL
3. Git
4. Google Maps API key

### Backend Setup

1. Clone the repository and navigate to the backend folder:

```bash
git clone [your-repo-url]
cd GoodNeighbour/backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file:

```env
PGDATABASE=good_neighbour
JWT_SECRET=your_jwt_secret
```

4. Set up the database:

```bash
npm run setup-dbs
npm run seed
```

5. Start the development server:

```bash
npm run dev
```

### Frontend Setup

1. Navigate to the frontend folder:

```bash
cd ../GoodNeighbour
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env.development`:

```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
VITE_API_URL=http://localhost:8003
```

4. Start the development server:

```bash
npm run dev
```

## API Endpoints

### Auth

- `POST /api/auth/login` - User login

### Help Requests

- `GET /api/help-requests` - Get all help requests
- `GET /api/help-requests/:id` - Get help request by ID
- `POST /api/help-requests` - Create new help request
- `PATCH /api/help-requests/:id` - Update help request
- `DELETE /api/help-requests/:id` - Delete help request

### Help Offers

- `GET /api/users/:user_id/help-offers` - Get user's help offers
- `POST /api/users/:user_id/help-offers` - Create help offer
- `PATCH /api/help-requests/:help_request_id/help-offers/:helper_id` - Update help offer
- `DELETE /api/help-requests/:help_request_id/help-offers/:helper_id` - Delete help offer

### Users

- `GET /api/users/:user_id` - Get user by ID
- `POST /api/users` - Create new user
- `PATCH /api/users/:user_id` - Update user
- `DELETE /api/users/:user_id` - Delete user

### Help Types

- `GET /api/help-types` - Get all help types
- `GET /api/help-types/:help_type_id` - Get help type by ID

## Tech Stack

### Frontend

- React 18
- React Router v6
- Axios
- Google Maps API
- Vite

### Backend

- Node.js
- Express
- PostgreSQL
- JWT Authentication

## License

This project is licensed under the MIT License - see the LICENSE file for details.
