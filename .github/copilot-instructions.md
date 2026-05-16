# Web Scraper App - Development Guidelines

## Project Structure

This is a full-stack application with:
- **Backend**: Node.js/Express with MongoDB
- **Frontend**: Angular with Bootstrap
- **Data Source**: AnkerGames.net API

## Key Features

1. **Responsive Design**: Bootstrap + CSS for all devices, Chrome optimized
2. **Secure Login**: JWT-based authentication with input validation
3. **Database**: MongoDB with Mongoose ODM
4. **Web Scraping**: Fetch data from AnkerGames.net API
5. **Deployment Ready**: Environment variables configured

## Development Workflow

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

### Full Stack
```bash
npm install-all
npm start
```

## Environment Variables

Copy `.env.example` to `.env` and update values:
- `MONGODB_URI`: Local or cloud MongoDB connection
- `JWT_SECRET`: Strong secret key for tokens
- `PORT`: Backend port (default: 3000)
- `ANGULAR_API_URL`: Backend API URL

## Database Setup

MongoDB required:
- Local: `mongodb://localhost:27017/web-scraper`
- Cloud: MongoDB Atlas connection string

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Scraping
- `GET /api/scraper/games` - Fetch games from AnkerGames
- `GET /api/scraper/games/:id` - Get game details
- `POST /api/scraper/refresh` - Refresh game data

## Deployment

See DEPLOYMENT.md for hosting instructions.
