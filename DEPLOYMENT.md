# Deployment Guide - Web Scraper App

Complete guide to deploy the Web Scraper application to a live URL for production use.

## Table of Contents
1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Backend Deployment](#backend-deployment)
3. [Frontend Deployment](#frontend-deployment)
4. [Full Stack Deployment](#full-stack-deployment)
5. [Custom Domain Setup](#custom-domain-setup)
6. [SSL/HTTPS Configuration](#ssl-https-configuration)
7. [Monitoring & Maintenance](#monitoring--maintenance)

## Pre-Deployment Checklist

### Environment Setup
```bash
# 1. Update .env for production
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/web-scraper
JWT_SECRET=generate-a-strong-secret-key-32-chars-minimum
JWT_EXPIRE=7d
ANGULAR_API_URL=https://your-live-domain.com/api

# 2. Build frontend for production
cd frontend
npm run build
# Output: dist/web-scraper-frontend/

# 3. Build backend if needed
cd backend
npm run build
```

### Security Verification
- [ ] JWT_SECRET is 32+ characters
- [ ] Node_ENV set to 'production'
- [ ] CORS configured for production domain only
- [ ] Sensitive data removed from code
- [ ] HTTPS/SSL enabled
- [ ] Rate limiting configured
- [ ] Database backups enabled
- [ ] Error logging configured

## Backend Deployment

### Option 1: Heroku (Recommended for Beginners)

**Prerequisites:**
- Heroku account (free)
- Heroku CLI installed

**Step 1: Create Heroku App**
```bash
# Login to Heroku
heroku login

# Create new app
heroku create web-scraper-backend

# Check app
heroku apps:info
```

**Step 2: Configure Environment Variables**
```bash
# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-strong-secret-here
heroku config:set MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/web-scraper

# Verify
heroku config
```

**Step 3: Connect to GitHub**
```bash
# Enable automatic deployments
# Dashboard → Deploy → GitHub Connect → Select Repository → Enable Auto Deploys
```

**Step 4: Add MongoDB Atlas**
```bash
# Create free MongoDB Atlas cluster
# 1. Go to https://www.mongodb.com/cloud/atlas
# 2. Create free account
# 3. Create M0 cluster (free tier)
# 4. Whitelist Heroku IP (0.0.0.0/0 for simplicity)
# 5. Generate connection string
# 6. Update MONGODB_URI in Heroku config

# Deploy
git push heroku main
```

**Monitor Logs:**
```bash
heroku logs --tail
```

### Option 2: Railway.app

**Step 1: Create Project**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Create project
railway init

# Link project
railway link
```

**Step 2: Configure Environment**
```bash
# Set environment variables in Dashboard
# Or via CLI:
railway variables set NODE_ENV production
railway variables set JWT_SECRET your-secret
```

**Step 3: Deploy**
```bash
railway up
```

**Get Public URL:**
```bash
railway status
# Your API will be available at: https://web-scraper-backend-production.up.railway.app
```

### Option 3: DigitalOcean App Platform

**Step 1: Create App Spec**
```yaml
# app.yaml
name: web-scraper-backend
services:
- name: api
  github:
    repo: your-username/web-scraper-app
    branch: main
  build_command: cd backend && npm install
  run_command: cd backend && npm start
  http_port: 3000
  envs:
  - key: NODE_ENV
    value: production
  - key: MONGODB_URI
    scope: RUN_AND_BUILD_TIME
    value: ${DB.MASTER_URL}

databases:
- name: mongodb
  engine: MONGODB
  version: "5"
```

**Step 2: Deploy via CLI**
```bash
# Install doctl
# https://docs.digitalocean.com/reference/doctl/

doctl apps create --spec app.yaml
doctl apps deploy {APP_ID}
```

### Option 4: AWS Elastic Beanstalk

**Step 1: Install EB CLI**
```bash
pip install awsebcli
```

**Step 2: Initialize & Deploy**
```bash
cd backend

# Initialize
eb init -p node.js-16 web-scraper-backend --region us-east-1

# Create environment
eb create web-scraper-production

# Set environment variables
eb setenv NODE_ENV=production JWT_SECRET=your-secret MONGODB_URI=your-uri

# Deploy
eb deploy
```

**Step 3: Get Public URL**
```bash
eb open
# Your app URL will be shown
```

### Option 5: Self-Hosted (VPS/Cloud Server)

**Prerequisites:**
- Ubuntu/CentOS VPS
- Node.js, npm, MongoDB installed
- SSH access

**Step 1: Connect via SSH**
```bash
ssh root@your-server-ip
```

**Step 2: Install Dependencies**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install MongoDB
curl -fsSL https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

**Step 3: Clone & Setup Application**
```bash
# Clone repository
cd /opt
sudo git clone https://github.com/your-username/web-scraper-app.git
cd web-scraper-app

# Install dependencies
npm run install-all

# Create .env
sudo cp .env.example .env
sudo nano .env  # Edit with your settings
```

**Step 4: Setup PM2 Process Manager**
```bash
# Install PM2 globally
sudo npm install -g pm2

# Create ecosystem.config.js
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'web-scraper-backend',
    script: './backend/src/server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
EOF

# Start application
pm2 start ecosystem.config.js
pm2 save
pm2 startup

# Monitor
pm2 logs
```

**Step 5: Setup Nginx Reverse Proxy**
```bash
# Install Nginx
sudo apt install -y nginx

# Create Nginx config
sudo tee /etc/nginx/sites-available/web-scraper << EOF
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Enable site
sudo ln -s /etc/nginx/sites-available/web-scraper /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

**Step 6: Setup SSL with Let's Encrypt**
```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Generate certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal enabled by default
sudo systemctl enable certbot.timer
```

## Frontend Deployment

### Option 1: Vercel (Recommended for Angular)

**Step 1: Install Vercel CLI**
```bash
npm install -g vercel
```

**Step 2: Deploy**
```bash
cd frontend

# First deployment
vercel --prod

# Or link to git repo and auto-deploy
# https://vercel.com/import

# Future deployments
vercel --prod
```

**Step 3: Configure Domain**
```bash
# In Vercel Dashboard:
# 1. Project Settings → Domains
# 2. Add your custom domain
# 3. Update DNS records (CNAME to Vercel)
```

### Option 2: Netlify

**Step 1: Connect Git Repository**
```bash
# 1. Go to https://netlify.com
# 2. Click "New site from Git"
# 3. Select your repository
# 4. Configure build:
#    Build command: npm run build
#    Publish directory: dist/web-scraper-frontend
```

**Step 2: Deploy**
```bash
# Automatic deployment on push
# Manual deployment:
netlify deploy --prod --dir=frontend/dist
```

### Option 3: Firebase Hosting

**Step 1: Install Firebase CLI**
```bash
npm install -g firebase-tools
firebase login
```

**Step 2: Initialize Firebase**
```bash
cd frontend

firebase init hosting
# Select your Firebase project
# Build directory: dist/web-scraper-frontend
# Configure as SPA: Yes
```

**Step 3: Deploy**
```bash
npm run build
firebase deploy
```

### Option 4: GitHub Pages (Free)

**Step 1: Configure Angular Build**
```bash
# Update frontend/package.json:
"build": "ng build --configuration production --base-href=/web-scraper-app/"
```

**Step 2: Build & Deploy**
```bash
cd frontend
npm run build

# Deploy using gh-pages or manual push to gh-pages branch
npm install -g gh-pages
gh-pages -d dist
```

### Option 5: Self-Hosted (Same VPS as Backend)

**Step 1: Build Angular App**
```bash
cd frontend
npm run build
# Output: dist/web-scraper-frontend/
```

**Step 2: Configure Nginx**
```bash
# Update /etc/nginx/sites-available/web-scraper:
server {
    listen 80;
    server_name your-domain.com;
    
    # Frontend
    location / {
        root /opt/web-scraper-app/frontend/dist/web-scraper-frontend;
        try_files $uri $uri/ /index.html;
    }
    
    # Backend API proxy
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Step 3: Restart Nginx**
```bash
sudo systemctl restart nginx
```

## Full Stack Deployment (Single Server)

### Complete VPS Setup

**Script: deploy.sh**
```bash
#!/bin/bash

# Update system
sudo apt update && sudo apt upgrade -y

# Install dependencies
sudo apt install -y nodejs npm nginx git mongodb-org curl

# Start services
sudo systemctl start mongodb
sudo systemctl enable mongodb

# Clone repo
cd /opt
sudo git clone https://github.com/your-username/web-scraper-app.git
cd web-scraper-app

# Install dependencies
sudo npm run install-all

# Build frontend
cd frontend && npm run build && cd ..

# Setup environment
sudo cp .env.example .env
# Edit .env with production values

# Setup PM2
sudo npm install -g pm2
pm2 start ecosystem.config.js
pm2 save

# Setup Nginx (see above)
# Setup SSL (see above)

echo "Deployment complete!"
```

**Deploy:**
```bash
# Make script executable
chmod +x deploy.sh

# Run script
./deploy.sh
```

## Custom Domain Setup

### Using Namecheap, GoDaddy, etc.

**Step 1: Point Domain to Server**
```
For Heroku/Vercel/Firebase: CNAME to their domain
For Self-Hosted VPS: A record to your server IP
```

**Step 2: Update Environment Variables**
```env
# Backend
ANGULAR_API_URL=https://your-domain.com/api

# Frontend
API_URL=https://your-domain.com/api
```

**Step 3: Redeploy**
```bash
git push  # Trigger automatic deployment
```

## SSL/HTTPS Configuration

### Automatic (Recommended)

**Using Certbot + Let's Encrypt:**
```bash
sudo apt install -y certbot python3-certbot-nginx

# For single domain
sudo certbot --nginx -d your-domain.com

# For multiple domains
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Verify auto-renewal
sudo certbot renew --dry-run
```

### Manual Renewal
```bash
sudo certbot renew
```

### Check Certificate
```bash
sudo certbot certificates
```

## Monitoring & Maintenance

### Health Check
```bash
# Check if backend is running
curl https://your-domain.com/api/health

# Should return:
# {"status":"OK","timestamp":"2024-05-15T..."}
```

### Logs

**Backend Logs (PM2):**
```bash
pm2 logs
pm2 logs web-scraper-backend
```

**Nginx Logs:**
```bash
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

**MongoDB Logs:**
```bash
sudo tail -f /var/log/mongodb/mongod.log
```

### Performance Monitoring

**Using PM2 Plus:**
```bash
pm2 plus
```

**Using Heroku Metrics:**
```bash
heroku metrics -p
```

### Backup & Restore MongoDB

**Backup:**
```bash
mongodump --uri "mongodb+srv://user:pass@cluster.mongodb.net/web-scraper" --out backup/
```

**Restore:**
```bash
mongorestore --uri "mongodb+srv://user:pass@cluster.mongodb.net/web-scraper" backup/
```

### Database Maintenance

**Clear Old Sessions:**
```bash
db.sessions.deleteMany({ createdAt: { $lt: new Date(Date.now() - 30*24*60*60*1000) } })
```

## Troubleshooting Deployment Issues

### 504 Gateway Timeout
- Check if backend is running: `pm2 status`
- Check backend logs: `pm2 logs`
- Restart backend: `pm2 restart all`

### CORS Issues
- Verify ANGULAR_API_URL matches backend domain
- Check CORS configuration in backend
- Check if API endpoint is accessible

### MongoDB Connection Failed
- Verify MongoDB is running
- Check connection string
- Whitelist server IP in MongoDB Atlas

### SSL Certificate Error
- Verify domain is properly pointing to server
- Check Nginx configuration
- Renew certificate: `sudo certbot renew`

### High Memory Usage
- Check for memory leaks: `pm2 monit`
- Restart application: `pm2 restart all`
- Add more RAM or optimize code

## Performance Optimization

### Frontend
```bash
# Enable gzip compression
# Already configured in Nginx

# Lazy load images
# Consider implementing Angular lazy loading

# Minify assets
npm run build  # Production build already minifies
```

### Backend
```bash
# Enable caching
# Configure Redis for session storage

# Use PM2 cluster mode
# Already configured in ecosystem.config.js

# Monitor performance
pm2 monit
```

### Database
```bash
# Create indexes
db.users.createIndex({ email: 1 })
db.games.createIndex({ title: "text" })

# Monitor slow queries
db.setProfilingLevel(1, { slowms: 100 })
```

## Auto-Scaling (Advanced)

### Kubernetes Deployment

**Create Dockerfile for backend:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN cd backend && npm install
EXPOSE 3000
CMD ["node", "backend/src/server.js"]
```

**Deploy to Kubernetes:**
```bash
kubectl apply -f deployment.yaml
kubectl autoscale deployment web-scraper --min=2 --max=10
```

---

**Deployment Complete! Your app is now live at: https://your-domain.com** 🚀
