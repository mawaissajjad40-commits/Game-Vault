# Web Scraper App - Full Stack Application

A complete full-stack web application for discovering and managing games with data fetched from external APIs. Built with Angular, Express.js, MongoDB, and Bootstrap.

## 🎯 Features

- ✅ **Responsive Design**: Bootstrap 5 + CSS responsive layout
- ✅ **Chrome Optimized**: Fully tested and optimized for Chrome browser
- ✅ **Secure Login**: JWT-based authentication with strict input validation
- ✅ **Web Scraping**: Fetch data from AnkerGames.net API
- ✅ **Database**: MongoDB with Mongoose ODM
- ✅ **Game Management**: Search, filter, and save games
- ✅ **User Collection**: Manage wishlist, playing, completed, and archived games
- ✅ **Deployment Ready**: Environment variables configured for live deployment
- ✅ **RESTful API**: Express.js backend with comprehensive API
- ✅ **Modern Frontend**: Angular 16 with TypeScript and RxJS

## 📋 Project Structure

```
web-scraper-app/
├── backend/                  # Node.js/Express Server
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── controllers/     # Route handlers
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Custom middleware
│   │   ├── services/        # Business logic (scraping)
│   │   ├── utils/           # Utility functions
│   │   └── server.js        # Express app entry point
│   ├── package.json
│   └── README.md
│
├── frontend/                # Angular Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/  # UI components
│   │   │   ├── services/    # HTTP services
│   │   │   ├── models/      # TypeScript interfaces
│   │   │   ├── app.module.ts
│   │   │   └── app-routing.module.ts
│   │   ├── assets/          # Static files
│   │   ├── index.html
│   │   └── main.ts
│   ├── package.json
│   └── README.md
│
├── .env.example             # Environment variables template
├── .gitignore
├── package.json             # Root scripts
└── README.md                # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js v16+ and npm
- MongoDB (local or Atlas)
- Git

### 1. Clone and Setup
```bash
# Navigate to project
cd web-scraper-app

# Install all dependencies
npm run install-all

# Copy environment template
cp .env.example .env
```

### 2. Configure Environment Variables

Edit `.env` file:
```env
# Backend
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/web-scraper
JWT_SECRET=your-very-secure-secret-key-min-32-chars-here
JWT_EXPIRE=7d

# Frontend
ANGULAR_API_URL=http://localhost:3000/api

# Scraping
ANKERGAMES_API_URL=https://api.ankergames.net
SCRAPER_TIMEOUT=5000
SCRAPER_RETRY_ATTEMPTS=3
```

### 3. Setup MongoDB

**Local MongoDB:**
```bash
# Windows (PowerShell)
net start MongoDB

# Or start MongoDB manually
mongod
```

**Cloud MongoDB (Atlas):**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/web-scraper
```

### 4. Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Server runs on http://localhost:3000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
# App opens at http://localhost:4200
```

**Or Start Both Simultaneously:**
```bash
npm start
```

## 📝 API Documentation

### Authentication Endpoints

**Register User**
```
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "firstName": "John",
  "lastName": "Doe"
}

Response: { token, user }
```

**Login User**
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}

Response: { token, user }
```

**Get Profile**
```
GET /api/auth/profile
Authorization: Bearer {token}

Response: { user }
```

### Game/Scraper Endpoints

**Get All Games (Paginated)**
```
GET /api/scraper/games?page=1&limit=20&category=Action&search=minecraft

Response: { games: [], pagination: {} }
```

**Get Game Details**
```
GET /api/scraper/games/{id}

Response: { game }
```

**Save Game to Collection**
```
POST /api/scraper/save
Authorization: Bearer {token}
Content-Type: application/json

{
  "gameId": "...",
  "status": "wishlist",
  "rating": 4,
  "notes": "Looks fun"
}

Response: { savedGame }
```

**Get User's Saved Games**
```
GET /api/scraper/saved
Authorization: Bearer {token}

Response: { savedGames: [] }
```

**Remove Saved Game**
```
DELETE /api/scraper/saved/{id}
Authorization: Bearer {token}

Response: { message }
```

## 🔒 Security Features

### Backend
- ✅ JWT authentication with expiration
- ✅ Password hashing with bcryptjs
- ✅ Input validation (express-validator)
- ✅ Helmet for HTTP headers
- ✅ Rate limiting (15 req/15min default)
- ✅ CORS configuration
- ✅ SQL injection prevention
- ✅ XSS protection

### Frontend
- ✅ Token stored in localStorage
- ✅ HTTP interceptor for auth headers
- ✅ Route guards for protected pages
- ✅ Form validation on client side
- ✅ Secure password requirements

### Database
- ✅ Mongoose schema validation
- ✅ Unique indexes on email/username
- ✅ Role-based access control
- ✅ Password encryption

## 🎨 UI/UX Features

- **Responsive Bootstrap Grid**: Mobile-first design
- **Dark Theme Navigation**: Professional navbar
- **Card-based Layout**: Modern game grid
- **Smooth Animations**: Hover effects and transitions
- **Loading States**: User feedback spinners
- **Error Handling**: Alert messages and validation
- **Sticky Navbar**: Navigation always accessible
- **Sticky Game Card**: Save panel on details page

## 📦 Dependencies

### Backend
- express: Web framework
- mongoose: MongoDB ODM
- bcryptjs: Password hashing
- jsonwebtoken: JWT auth
- axios: HTTP requests (scraping)
- cheerio: HTML parsing
- cors: CORS middleware
- helmet: Security headers
- express-rate-limit: Rate limiting
- morgan: Logging

### Frontend
- @angular/core: Framework
- @angular/forms: Forms & validation
- @angular/router: Routing & guards
- rxjs: Reactive programming
- bootstrap: CSS framework
- typescript: Type safety

## 🌐 Deployment

### Backend Deployment Options

**Heroku**
```bash
git push heroku main
```

**Railway.app**
```bash
railway link
railway up
```

**DigitalOcean App Platform**
```bash
doctl apps create --spec app.yaml
```

**AWS EC2 / Elastic Beanstalk**
```bash
eb init
eb create web-scraper-env
eb deploy
```

### Frontend Deployment Options

**Vercel**
```bash
vercel --prod
```

**Netlify**
```bash
netlify deploy --prod --dir=frontend/dist
```

**Firebase Hosting**
```bash
firebase deploy
```

**GitHub Pages**
```bash
ng build --prod --base-href="/repo-name/"
```

### Full Stack Production Checklist

- [ ] Set NODE_ENV=production
- [ ] Update MongoDB to production URI
- [ ] Use strong JWT_SECRET (32+ characters)
- [ ] Enable HTTPS
- [ ] Configure CORS for production domain
- [ ] Setup SSL certificate
- [ ] Enable database backups
- [ ] Configure CDN for static assets
- [ ] Setup error tracking (Sentry)
- [ ] Enable logging (Winston/Morgan)
- [ ] Test all API endpoints
- [ ] Load test application
- [ ] Setup monitoring
- [ ] Configure email notifications
- [ ] Implement rate limiting properly

## 🧪 Testing

**Backend Unit Tests**
```bash
cd backend
npm test
```

**Frontend Unit Tests**
```bash
cd frontend
npm test
```

**Backend Integration Tests**
```bash
npm run test:integration
```

**API Testing with Postman**
- Import API collection from `/docs/postman-collection.json`
- Set environment variables
- Run test suite

## 📚 Documentation

- [Backend Documentation](./backend/README.md)
- [Frontend Documentation](./frontend/README.md)
- [API Documentation](./docs/API.md) - Create this file
- [Deployment Guide](./docs/DEPLOYMENT.md) - Create this file

## 🔧 Troubleshooting

### Backend Won't Start
```bash
# Check if port 3000 is in use
netstat -ano | findstr :3000

# Kill process on port 3000
taskkill /PID {PID} /F

# Check MongoDB connection
mongosh
```

### Frontend CORS Errors
- Ensure backend is running
- Check ANGULAR_API_URL in environment
- Verify CORS configuration in backend

### MongoDB Connection Failed
- Check MongoDB is running
- Verify MONGODB_URI in .env
- Check firewall settings
- Test connection: `mongosh mongodb://localhost:27017`

### Build Failures
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

## 📞 Support

For issues, questions, or suggestions:
1. Check existing issues
2. Review documentation
3. Create detailed issue report
4. Include error logs and environment info

## 📄 License

MIT License - Feel free to use for personal/commercial projects

## 🎯 Future Enhancements

- [ ] Email verification for registration
- [ ] Password reset functionality
- [ ] OAuth2 integration (Google, GitHub)
- [ ] WebSocket for real-time notifications
- [ ] Admin dashboard
- [ ] Advanced search with Elasticsearch
- [ ] Game reviews and ratings
- [ ] User following system
- [ ] Export game list to CSV
- [ ] Mobile app (React Native)
- [ ] GraphQL API
- [ ] Docker containerization

## 🔗 Useful Resources

- [Angular Documentation](https://angular.io/docs)
- [Express Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.3/)
- [JWT Documentation](https://jwt.io/)
- [Mongoose Documentation](https://mongoosejs.com/)

---

**Happy coding! 🚀**
#   d e p l o y  
 