# Backend Setup Instructions

## Prerequisites
- Node.js v16+ 
- MongoDB running locally or Atlas connection
- npm or yarn

## Installation

```bash
cd backend
npm install
```

## Environment Variables

Create `.env` file in backend root:
```
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/web-scraper
JWT_SECRET=your-super-secret-key-here-use-something-long-and-secure
JWT_EXPIRE=7d
ANGULAR_API_URL=http://localhost:4200
ANKERGAMES_API_URL=https://api.ankergames.net
SCRAPER_TIMEOUT=5000
SCRAPER_RETRY_ATTEMPTS=3
```

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get current user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Games/Scraper
- `GET /api/scraper/games` - Get all games with pagination
- `GET /api/scraper/games/:id` - Get game details
- `POST /api/scraper/scrape` - Trigger scraping (admin only)
- `POST /api/scraper/save` - Save game to collection (protected)
- `GET /api/scraper/saved` - Get user's saved games (protected)
- `DELETE /api/scraper/saved/:id` - Remove saved game (protected)

### Health Check
- `GET /api/health` - Server health status

## Testing API with Postman

1. Register a user at `POST /api/auth/register`
2. Login at `POST /api/auth/login`
3. Copy the token from login response
4. Add to Authorization header: `Bearer {token}`
5. Test protected routes

## MongoDB Setup

### Local Development
```bash
# Start MongoDB locally (Windows)
mongod

# Or use MongoDB Compass UI
```

### Cloud (Atlas)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/web-scraper?retryWrites=true&w=majority
```

## Database Models

### User
- username (unique, required)
- email (unique, required)
- password (hashed, required)
- firstName, lastName
- role (user/admin)
- isActive
- timestamps

### Game
- title, description
- externalId, sourceUrl, imageUrl
- category, rating, downloads
- price, currency
- tags, metadata
- source (ankergames)

### SavedGame
- userId, gameId references
- status (wishlist/playing/completed/archived)
- rating, notes
- timestamps

## Troubleshooting

### MongoDB Connection Error
- Check MongoDB is running: `net start MongoDB` (Windows)
- Verify MONGODB_URI in .env
- Check firewall settings

### CORS Error
- Update ANGULAR_API_URL in .env to frontend URL
- Ensure frontend is running on correct port

### JWT Errors
- Check JWT_SECRET length (at least 32 characters recommended)
- Verify token format: `Bearer {token}`

## Docker Setup (Optional)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

Build: `docker build -t web-scraper-backend .`
Run: `docker run -p 3000:3000 web-scraper-backend`
