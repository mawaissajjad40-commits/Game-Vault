# Frontend Setup Instructions

## Prerequisites
- Node.js v16+
- npm or yarn
- Angular CLI 16+

## Installation

```bash
cd frontend
npm install
```

## Running the Application

### Development Mode
```bash
npm start
```
The application will automatically open at `http://localhost:4200`

### Build for Production
```bash
npm run build
```

## Features

- **Authentication**: Secure login/register with JWT
- **Responsive Design**: Bootstrap 5 responsive grid system
- **Game Browsing**: Search and filter games by category
- **Game Details**: View detailed information about each game
- **Saved Games**: Save and manage your game collection
- **User Profile**: Manage your account information
- **Chrome Optimized**: Fully tested and optimized for Chrome browser

## File Structure

```
src/
├── app/
│   ├── components/          # Reusable components
│   │   ├── navbar/
│   │   ├── login/
│   │   ├── register/
│   │   ├── games-list/
│   │   ├── game-detail/
│   │   ├── saved-games/
│   │   └── profile/
│   ├── services/            # HTTP and business logic
│   │   ├── auth.service.ts
│   │   ├── game.service.ts
│   │   ├── auth.interceptor.ts
│   │   └── auth.guard.ts
│   ├── models/              # TypeScript interfaces
│   │   ├── auth.model.ts
│   │   └── game.model.ts
│   ├── app.module.ts
│   ├── app-routing.module.ts
│   └── app.component.*
├── assets/                  # Static files
│   └── images/
├── index.html               # Main HTML file
├── main.ts                  # Entry point
└── styles.css               # Global styles
```

## Authentication Flow

1. **Register**: User creates account with validation
2. **Login**: User receives JWT token
3. **Token Storage**: Token stored in localStorage
4. **API Requests**: Token sent in Authorization header
5. **Route Guards**: Protected routes require authentication

## API Integration

Frontend communicates with backend at `http://localhost:3000/api`

### Endpoints Used
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile
- `GET /api/scraper/games` - List all games
- `GET /api/scraper/games/:id` - Game details
- `POST /api/scraper/save` - Save game
- `GET /api/scraper/saved` - Get saved games
- `DELETE /api/scraper/saved/:id` - Remove saved game

## Responsive Design

The UI uses Bootstrap 5 grid system:
- **Mobile**: col-sm-12
- **Tablet**: col-md-6
- **Desktop**: col-lg-4

All components are fully responsive and tested on Chrome.

## Environment Configuration

For production deployment, update API URL in [game.service.ts](src/app/services/game.service.ts):

```typescript
private apiUrl = 'https://your-production-api.com/api';
```

## Testing

Run unit tests:
```bash
npm test
```

## Deployment

### Angular Build
```bash
ng build --prod
```

### Firebase Hosting
```bash
firebase deploy
```

### Vercel
```bash
vercel
```

### GitHub Pages
```bash
ng build --prod --base-href="/your-repo/"
```

## Chrome Optimization Tips

- Lazy load images
- Minify CSS/JS
- Use service workers for PWA
- Optimize bundle size
- Enable gzip compression

## Troubleshooting

### CORS Error
- Ensure backend CORS is configured correctly
- Check API URL in service

### Authentication Failed
- Verify JWT token in localStorage
- Check token expiration
- Clear browser cache

### Build Errors
- Clear node_modules: `rm -rf node_modules && npm install`
- Update Angular CLI: `npm install -g @angular/cli@16`

## Performance

- Bundle size optimized for production
- Lazy loading on routes
- OnPush change detection
- Unsubscribe from observables (RxJS)
