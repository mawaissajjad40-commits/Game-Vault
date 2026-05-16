# Quick Start Guide - Web Scraper App

Get your full-stack application running in 5 minutes!

## 📦 Prerequisites
- Node.js 16+ (download from nodejs.org)
- MongoDB local or MongoDB Atlas account
- Git (optional, for version control)

## ⚡ 5-Minute Setup

### Step 1: Extract & Navigate (30 seconds)
```bash
cd web-scraper-app
```

### Step 2: Install Dependencies (2 minutes)
```bash
npm run install-all
```

### Step 3: Configure Environment (1 minute)
```bash
# Copy template
copy .env.example .env

# Edit .env with these values:
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/web-scraper
JWT_SECRET=dev-secret-key-change-in-production
JWT_EXPIRE=7d
ANGULAR_API_URL=http://localhost:3000/api
ANKERGAMES_API_URL=https://api.ankergames.net
SCRAPER_TIMEOUT=5000
SCRAPER_RETRY_ATTEMPTS=3
```

### Step 4: Start MongoDB (1 minute)
```bash
# If installed locally:
mongod

# Or use MongoDB Atlas (cloud):
# Update MONGODB_URI in .env with your Atlas connection string
```

### Step 5: Start the App (1 minute)

**Option A: Both servers together**
```bash
npm start
```

**Option B: Separate terminals**

Terminal 1:
```bash
cd backend
npm run dev
```

Terminal 2:
```bash
cd frontend
npm start
```

## ✅ Verify It's Working

1. **Backend**: Visit `http://localhost:3000/api/health`
   - Should show: `{"status":"OK",...}`

2. **Frontend**: Visit `http://localhost:4200`
   - Should see the Game Hub interface

3. **Register a User**:
   - Click "Register"
   - Fill in details (password: min 8 chars, uppercase, lowercase, number)
   - Click "Create Account"

4. **Browse Games**:
   - After login, go to "Browse Games"
   - See list of games with search/filter

5. **Save a Game**:
   - Click on a game
   - Add rating and notes
   - Click "Save to Collection"

## 🌐 Access URLs

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:4200 | User Interface |
| Backend API | http://localhost:3000/api | Server API |
| API Health | http://localhost:3000/api/health | Check server status |
| MongoDB | localhost:27017 | Database (local only) |

## 📝 Default Test Account

```
Email: test@example.com
Password: Test123456
```

Create via registration page or manually in MongoDB

## 🔑 API Examples

### Register
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "SecurePass123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

### Get Games
```bash
curl http://localhost:3000/api/scraper/games?page=1&limit=20
```

## 📂 Project Structure

```
web-scraper-app/
├── backend/          # Express server
│   └── src/
│       ├── server.js (start here)
│       ├── models/   (Database schemas)
│       ├── routes/   (API endpoints)
│       └── controllers/ (Business logic)
├── frontend/         # Angular app
│   └── src/
│       ├── main.ts (entry point)
│       ├── app/
│       │   ├── components/ (UI pages)
│       │   ├── services/   (API calls)
│       │   └── models/     (Types)
├── .env             # Configuration
└── README.md        # Full documentation
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :3000

# Kill the process
taskkill /PID {PID} /F
```

### MongoDB Connection Error
```bash
# Start MongoDB (Windows)
net start MongoDB

# Or run mongod manually
mongod
```

### Dependencies Install Failed
```bash
rm -rf node_modules package-lock.json
npm run install-all
```

### CORS Error
- Check backend is running on port 3000
- Check `ANGULAR_API_URL` in .env matches backend URL

## 📚 Project Features

✅ **Authentication**: Secure JWT login/register
✅ **Game Management**: Search, filter, save games
✅ **Responsive UI**: Mobile-friendly Bootstrap 5
✅ **Web Scraping**: Fetch data from AnkerGames API
✅ **Database**: MongoDB with validation
✅ **Validation**: Strict input validation on frontend & backend
✅ **Error Handling**: User-friendly error messages
✅ **Styling**: Professional dark theme with animations

## 🚀 Next Steps

1. **Explore the Code**
   - Backend: `backend/src/server.js`
   - Frontend: `frontend/src/app/app.component.ts`

2. **Test All Features**
   - Register account
   - Browse games
   - Save to collection
   - View profile

3. **Make Customizations**
   - Change colors in component CSS files
   - Add more game categories
   - Modify API endpoints

4. **Deploy to Production**
   - See [DEPLOYMENT.md](./DEPLOYMENT.md)
   - Use Heroku, Vercel, or AWS

## 📞 Common Commands

```bash
# Start everything
npm start

# Start backend only
cd backend && npm run dev

# Start frontend only
cd frontend && npm start

# Build for production
npm run build

# Run tests
npm test

# Check backend health
curl http://localhost:3000/api/health

# View backend logs
cd backend && npm run dev
```

## 🎯 Features to Try

1. **User Registration**
   - Strong password required (8+ chars, uppercase, lowercase, number)
   - Email validation
   - Duplicate username/email checks

2. **Game Browsing**
   - Pagination (20 games per page)
   - Category filtering
   - Text search
   - Star ratings

3. **Game Details**
   - Full game information
   - Add to collection
   - Save ratings and notes

4. **User Collection**
   - Filter by status (Wishlist, Playing, Completed, Archived)
   - View all saved games
   - Remove games

5. **Profile Management**
   - View account info
   - Update name
   - Logout

## 💾 MongoDB Setup

### Local Installation
```bash
# Windows: Download from mongodb.com/try/download/community
# Mac: brew install mongodb-community
# Linux: sudo apt install mongodb

mongod  # Start server
```

### MongoDB Atlas (Cloud)
```
1. Go to mongodb.com/cloud/atlas
2. Create free M0 cluster
3. Create database user
4. Get connection string
5. Replace MONGODB_URI in .env
```

## 🔒 Security Notes

For Production:
- Change JWT_SECRET to 32+ character string
- Set NODE_ENV=production
- Use HTTPS/SSL
- Update CORS to your domain
- Enable rate limiting
- Use environment variables for all secrets
- Enable database backups

## 📖 Full Documentation

- [README.md](./README.md) - Complete project overview
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide
- [backend/README.md](./backend/README.md) - Backend documentation
- [frontend/README.md](./frontend/README.md) - Frontend documentation

## 🎓 Learning Resources

- [Angular Documentation](https://angular.io/docs)
- [Express Guide](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Bootstrap 5](https://getbootstrap.com/)
- [JWT Guide](https://jwt.io/)

---

**You're all set! 🎉**

Start exploring the app at: **http://localhost:4200**

Questions? Check the full README.md or DEPLOYMENT.md
