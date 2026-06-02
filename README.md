# 🎮 Web Scraper App - Full Stack Game Discovery Platform

A modern full-stack web application for discovering, searching, and managing games using data fetched from external APIs. Built with **Angular**, **Express.js**, **MongoDB**, and **Bootstrap**, the application provides a secure and responsive platform for game enthusiasts to maintain their personal game collections.

---

## 📌 Overview

The Web Scraper App enables users to:

* Discover games from external gaming APIs.
* Search and filter games efficiently.
* Save games into personalized collections.
* Manage game statuses such as Wishlist, Playing, Completed, and Archived.
* Access their collection securely through JWT-based authentication.

The application follows a modern client-server architecture with a RESTful API backend and a responsive Angular frontend.

---

# 🏗️ System Architecture

```text
┌─────────────────────┐
│      Angular UI     │
│   Bootstrap Frontend│
└──────────┬──────────┘
           │ REST API
           ▼
┌─────────────────────┐
│    Express Server   │
│ Authentication API  │
│ Scraper Services    │
│ Business Logic      │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│      MongoDB        │
│ User Collections    │
│ Saved Games         │
└─────────────────────┘
           │
           ▼
┌─────────────────────┐
│ External Game APIs  │
│  AnkerGames.net API │
└─────────────────────┘
```

---

# ✨ Key Features

## 🔐 Secure Authentication

* JWT-based user authentication
* Secure login and registration
* Password hashing using bcryptjs
* Protected routes and API endpoints
* Session expiration management

## 🎮 Game Discovery

* Retrieve game data from external APIs
* Advanced search functionality
* Category-based filtering
* Detailed game information pages

## 📚 Personal Game Collection

Users can organize games into:

* Wishlist
* Currently Playing
* Completed
* Archived

Additional features:

* Personal ratings
* Notes and comments
* Collection management

## 📱 Responsive Design

* Mobile-first design approach
* Bootstrap 5 integration
* Chrome browser optimization
* Responsive cards and layouts
* Smooth UI transitions

---

# 📂 Project Structure

```text
web-scraper-app/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── services/
│   │   ├── utils/
│   │   └── server.js
│   │
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   ├── models/
│   │   │   ├── app.module.ts
│   │   │   └── app-routing.module.ts
│   │
│   ├── assets/
│   ├── index.html
│   ├── main.ts
│   ├── package.json
│   └── README.md
│
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

# 🛠️ Technology Stack

## Frontend

| Technology     | Purpose              |
| -------------- | -------------------- |
| Angular 16     | Frontend Framework   |
| TypeScript     | Type Safety          |
| RxJS           | Reactive Programming |
| Bootstrap 5    | Responsive UI Design |
| Angular Router | Client-side Routing  |

---

## Backend

| Technology         | Purpose             |
| ------------------ | ------------------- |
| Node.js            | Runtime Environment |
| Express.js         | Web Framework       |
| JWT                | Authentication      |
| bcryptjs           | Password Encryption |
| Axios              | API Requests        |
| Cheerio            | Web Scraping        |
| Helmet             | Security Headers    |
| Express Rate Limit | Request Limiting    |

---

## Database

| Technology | Purpose        |
| ---------- | -------------- |
| MongoDB    | NoSQL Database |
| Mongoose   | ODM Layer      |

---

# 🚀 Installation Guide

## Prerequisites

Before starting, ensure you have:

* Node.js v16 or later
* npm
* MongoDB
* Git

---

## Step 1: Clone Repository

```bash
git clone https://github.com/yourusername/web-scraper-app.git

cd web-scraper-app
```

---

## Step 2: Install Dependencies

```bash
npm run install-all
```

---

## Step 3: Configure Environment Variables

Create a `.env` file using:

```bash
cp .env.example .env
```

Update the values:

```env
NODE_ENV=development
PORT=3000

MONGODB_URI=mongodb://localhost:27017/web-scraper

JWT_SECRET=your-super-secure-secret-key
JWT_EXPIRE=7d

ANGULAR_API_URL=http://localhost:3000/api

ANKERGAMES_API_URL=https://api.ankergames.net
SCRAPER_TIMEOUT=5000
SCRAPER_RETRY_ATTEMPTS=3
```

---

## Step 4: Configure MongoDB

### Local MongoDB

```bash
mongod
```

Or

```powershell
net start MongoDB
```

### MongoDB Atlas

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/web-scraper
```

---

## Step 5: Run Application

### Backend

```bash
cd backend

npm run dev
```

Backend URL:

```text
http://localhost:3000
```

### Frontend

```bash
cd frontend

npm start
```

Frontend URL:

```text
http://localhost:4200
```

### Start Both

```bash
npm start
```

---

# 🔌 REST API Documentation

---

## Authentication Endpoints

### Register User

```http
POST /api/auth/register
```

Request:

```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "firstName": "John",
  "lastName": "Doe"
}
```

Response:

```json
{
  "token": "jwt_token",
  "user": {}
}
```

---

### Login User

```http
POST /api/auth/login
```

Request:

```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

Response:

```json
{
  "token": "jwt_token",
  "user": {}
}
```

---

### Get User Profile

```http
GET /api/auth/profile
```

Headers:

```http
Authorization: Bearer <token>
```

---

# 🎮 Game Endpoints

---

### Get Games

```http
GET /api/scraper/games
```

Example:

```http
/api/scraper/games?page=1&limit=20&category=Action
```

---

### Get Game Details

```http
GET /api/scraper/games/:id
```

---

### Save Game

```http
POST /api/scraper/save
```

Request:

```json
{
  "gameId": "123",
  "status": "wishlist",
  "rating": 5,
  "notes": "Interesting game"
}
```

---

### Get Saved Games

```http
GET /api/scraper/saved
```

---

### Delete Saved Game

```http
DELETE /api/scraper/saved/:id
```

---

# 🔒 Security Features

## Backend Security

* JWT Authentication
* Password Hashing
* Input Validation
* Helmet Security Headers
* CORS Protection
* XSS Prevention
* Rate Limiting
* Secure API Design

---

## Frontend Security

* Route Guards
* Form Validation
* Secure Authentication Flow
* Automatic Token Handling
* Protected Components

---

## Database Security

* Schema Validation
* Unique Constraints
* Password Encryption
* Role-Based Authorization

---

# 🎨 User Interface Features

* Responsive Bootstrap Grid
* Professional Dark Navbar
* Interactive Game Cards
* Loading Indicators
* Error Notifications
* Hover Animations
* Sticky Navigation
* Mobile-Friendly Design

---

# 🧪 Testing

## Backend Tests

```bash
cd backend

npm test
```

---

## Frontend Tests

```bash
cd frontend

npm test
```

---

## Integration Tests

```bash
npm run test:integration
```

---

# 🌐 Deployment Guide

---

## Backend Deployment

### Heroku

```bash
git push heroku main
```

### Railway

```bash
railway up
```

### DigitalOcean

```bash
doctl apps create
```

### AWS

```bash
eb init
eb create
eb deploy
```

---

## Frontend Deployment

### Vercel

```bash
vercel --prod
```

### Netlify

```bash
netlify deploy --prod
```

### Firebase Hosting

```bash
firebase deploy
```

### GitHub Pages

```bash
ng build --prod --base-href="/repo-name/"
```

---

# ✅ Production Checklist

* [ ] Enable Production Mode
* [ ] Configure Production Database
* [ ] Use Strong JWT Secret
* [ ] Enable HTTPS
* [ ] Configure CORS
* [ ] Install SSL Certificate
* [ ] Setup Backups
* [ ] Configure Logging
* [ ] Enable Monitoring
* [ ] Test APIs
* [ ] Perform Load Testing
* [ ] Configure CDN

---

# 🔧 Troubleshooting

## Port Already In Use

```bash
netstat -ano | findstr :3000

taskkill /PID <PID> /F
```

---

## MongoDB Connection Issues

```bash
mongosh
```

Verify:

```env
MONGODB_URI
```

---

## Dependency Issues

```bash
rm -rf node_modules

rm package-lock.json

npm install
```

---

# 🚀 Future Enhancements

* Email Verification
* Password Reset
* OAuth Authentication
* Real-Time Notifications
* Admin Dashboard
* Elasticsearch Search
* User Reviews
* Follow System
* CSV Export
* Mobile Application
* GraphQL Support
* Docker Containers

---

# 📖 Additional Documentation

```text
/backend/README.md
/frontend/README.md
/docs/API.md
/docs/DEPLOYMENT.md
```

---

# 📄 License

MIT License

This project is open-source and available for both personal and commercial use.

---

# 👨‍💻 Author
Muhammad Faizan Iqbal (2502141)
Muhammad Awais Sajjad (2502099)
Muhammad Khaleeq Waqar (2502131)
Developed as a modern full-stack web application using Angular, Express.js, MongoDB, and Bootstrap.

---

## ⭐ Happy Coding!

If you found this project useful, consider giving it a star and contributing to future improvements.

**Built with ❤️ using Angular, Express.js, MongoDB & Bootstrap**
