 get# 🚀 AspCIWeb - Complete VPS Deployment Guide

## 📋 Overview

This guide will help you deploy your AspCIWeb application to your Hostinger VPS (147.93.44.169) and point it to your domain.

**Important**: This is a multi-site VPS setup. Multiple sites can use port 80 simultaneously - Nginx routes requests by domain name (`server_name`). This is standard practice and completely safe. Each site has its own unique `server_name`, so there's no conflict.

---

## 🎯 Prerequisites Checklist

Before starting, ensure you have:

- [ ] SSH access to VPS (147.93.44.169)
- [ ] Your domain registered on Hostinger
- [ ] Node.js 18+ installed on VPS
- [ ] PostgreSQL installed and configured
- [ ] pnpm installed globally
- [ ] PM2 installed globally
- [ ] Nginx installed and configured
- [ ] Git installed on VPS

---

## ⚠️ CRITICAL WARNINGS

**🚨 VPS MULTI-SITES**: This VPS hosts multiple applications:
- `engage-360.net` (uses port 80)
- `agents.engage-360.net` (uses port 80)
- `chat.engage-360.net` (uses port 80)
- `imhotepformation.engage-360.net` (uses port 80)
- `bmi.engage-360.net` (uses port 80)

**Note**: All these sites share port 80, but Nginx routes by `server_name` (domain name), so there's no conflict. Your `asp-afrique.com` will also use port 80 safely.

**DO NOT:**
- ❌ Modify existing Nginx configurations
- ❌ Change ports used by other applications
- ❌ Touch existing site configurations

**WILL DO:**
- ✅ Create separate Nginx config file for your domain
- ✅ Use port 80 for HTTP (shared with other sites - Nginx routes by domain)
- ✅ Use port 443 for HTTPS (shared with other sites - Nginx routes by domain)
- ✅ Use dedicated internal ports (3000 for web, 3004 for API)
- ✅ Isolate your application completely

---

## 📝 STEP-BY-STEP GUIDE

### **STEP 1: Test Application Locally on VPS with PM2**

First, we need to ensure the app works locally on the VPS before configuring Nginx.

#### 1.1 Connect to VPS

```bash
ssh root@147.93.44.169
# Enter password when prompted
```

#### 1.2 Navigate to Your Application Directory

```bash
# Check if app is already deployed
cd /var/www
ls -la

# If app exists, navigate to it (adjust path if different)
cd asp-afrique  # or whatever your app folder is named

# If app doesn't exist yet, we'll clone it in Step 2
```

#### 1.3 Verify Application Structure

```bash
# Check if you're in the right directory
ls -la

# Should see:
# - apps/
# - packages/
# - ecosystem.config.js
# - package.json
```

#### 1.4 Install Dependencies (if not already done)

```bash
# Install all dependencies
pnpm install

# Generate Prisma client
cd packages/db
pnpm prisma generate
cd ../..
```

#### 1.5 Build the Application

```bash
# Build for production
pnpm build

# Verify build succeeded
ls -la apps/web/.next
ls -la apps/api/dist
```

#### 1.6 Configure Environment Variables

**For API** (`apps/api/.env`):

```bash
cd apps/api
nano .env
```

Add these variables (adjust values as needed):

```env
# Database
DATABASE_URL="postgresql://aspci_user:YourSecurePassword123!@localhost:5432/aspci_afrique_db"

# API Configuration
PORT=3003
API_HOST=0.0.0.0
CORS_ORIGIN=http://localhost:3000

# JWT Configuration
NEXTAUTH_SECRET="GenerateAStrongRandomSecretKey32+CharactersLong"

# Environment
NODE_ENV=production

# SMTP Configuration (if using email)
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-email@your-domain.com
SMTP_PASS=YourEmailPassword
SMTP_FROM=your-email@your-domain.com
```

**For Web** (`apps/web/.env.local`):

```bash
cd ../web
nano .env.local
```

Add these variables:

```env
# Database
DATABASE_URL="postgresql://aspci_user:YourSecurePassword123!@localhost:5432/aspci_afrique_db"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="SameSecretAsAPIAbove"

# API URL (for local testing)
NEXT_PUBLIC_API_URL="http://localhost:3003"

# Environment
NODE_ENV=production
```

**For Prisma** (`packages/db/.env`):

```bash
cd ../../packages/db
nano .env
```

Add:

```env
DATABASE_URL="postgresql://aspci_user:YourSecurePassword123!@localhost:5432/aspci_afrique_db"
```

#### 1.7 Initialize Database

```bash
# Make sure you're in packages/db
cd /var/www/asp-afrique/packages/db

# Run migrations
pnpm prisma migrate deploy

# Generate Prisma client
pnpm prisma generate

# (Optional) Seed database
pnpm db:seed
```

#### 1.8 Create Logs Directory

```bash
cd /var/www/asp-afrique
mkdir -p logs
```

#### 1.9 Start Application with PM2

```bash
# Make sure you're in the project root
cd /var/www/asp-afrique

# Start with PM2
pm2 start ecosystem.config.js

# Check status
pm2 status

# View logs
pm2 logs

# Save PM2 configuration
pm2 save
```

**Expected Output:**

You should see both apps running:
- `asp-afrique-api` - status: online (green)
- `asp-afrique-web` - status: online (green)

#### 1.10 Test Local Access

```bash
# Test web app (port 3000)
curl -I http://localhost:3000

# Should return: HTTP/1.1 200 OK

# Test API (port 3003)
curl -I http://localhost:3003

# Should return: HTTP/1.1 200 OK or similar
```

#### 1.11 Verify Ports are Listening

```bash
# Check if ports are in use
netstat -tulpn | grep -E '3000|3003'

# Should show:
# tcp  0  0  0.0.0.0:3000  LISTEN  [PID]/node
# tcp  0  0  0.0.0.0:3003  LISTEN  [PID]/node
```

#### 1.12 Test from Browser (if you have access)

If you can access the VPS IP directly, test:
- `http://147.93.44.169:3000` - Should show your web app
- `http://147.93.44.169:3003` - Should show API response

**✅ If Step 1 is successful, proceed to Step 2!**

---

### **STEP 2: Configure DNS on Hostinger**

#### 2.1 Log into Hostinger Control Panel

1. Go to your Hostinger account
2. Navigate to **DNS Zone Editor** for your domain
3. Find your domain's DNS settings

#### 2.2 Add A Record

**For Root Domain:**

- **Type:** `A`
- **Name:** `@` (or leave blank, depending on Hostinger interface)
- **Points to:** `147.93.44.169`
- **TTL:** `3600` (default)

**For www Subdomain:**

- **Type:** `A`
- **Name:** `www`
- **Points to:** `147.93.44.169`
- **TTL:** `3600`

#### 2.3 Save DNS Changes

Click **Save** or **Update**

#### 2.4 Wait for DNS Propagation

- Wait **10-30 minutes** for DNS to propagate
- You can check propagation status: https://www.whatsmydns.net/

#### 2.5 Verify DNS Resolution

```bash
# From your local machine or VPS
nslookup your-domain.com

# Should return: 147.93.44.169
```

---

### **STEP 3: Configure Nginx**

#### 3.1 Check Existing Nginx Configurations

```bash
# List existing sites
ls -la /etc/nginx/sites-available/
ls -la /etc/nginx/sites-enabled/

# DO NOT MODIFY ANY EXISTING FILES
```

#### 3.2 Create Nginx Configuration for Your Domain

```bash
# Create new config file
sudo nano /etc/nginx/sites-available/your-domain.com
```

**Replace `your-domain.com` with your actual domain name.**

#### 3.3 Copy Configuration Content

Paste this configuration (adjust domain name):

```nginx
# NGINX Configuration for your-domain.com
# This file is isolated and does not affect other applications

# HTTP Server - Redirect to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name your-domain.com www.your-domain.com;

    # Allow Let's Encrypt challenges
    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }

    # Redirect all HTTP to HTTPS
    location / {
        return 301 https://$server_name$request_uri;
    }
}

# HTTPS Server Configuration
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name your-domain.com www.your-domain.com;

    # SSL Configuration (will be updated by Certbot)
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Logging
    access_log /var/log/nginx/your-domain-access.log;
    error_log /var/log/nginx/your-domain-error.log;

    # Max upload size
    client_max_body_size 100M;

    # Frontend - Next.js Application (port 3000)
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # API Backend - Fastify API (port 3003)
    location /api {
        proxy_pass http://127.0.0.1:3003;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Timeouts for API
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Static files caching
    location /_next/static {
        proxy_pass http://127.0.0.1:3000;
        proxy_cache_valid 200 60m;
        add_header Cache-Control "public, max-age=3600, immutable";
    }

    # Upload directory
    location /uploads {
        proxy_pass http://127.0.0.1:3003;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Allow larger uploads
        client_max_body_size 500M;
    }

    # Deny access to hidden files
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
}
```

**Important:** Replace `your-domain.com` with your actual domain name in all places.

**Save:** `Ctrl+X`, then `Y`, then `Enter`

#### 3.4 Enable the Site

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/your-domain.com /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Expected output:
# nginx: configuration file /etc/nginx/nginx.conf test is successful
```

#### 3.5 Reload Nginx

```bash
# If test is successful, reload Nginx
sudo systemctl reload nginx

# Check Nginx status
sudo systemctl status nginx
```

---

### **STEP 4: Update Environment Variables for Production**

Now update your environment variables to use your actual domain.

#### 4.1 Update API Environment Variables

```bash
cd /var/www/asp-afrique/apps/api
nano .env
```

**Update these values:**

```env
# Change CORS_ORIGIN to your actual domain
CORS_ORIGIN=https://your-domain.com

# Keep other values the same
```

#### 4.2 Update Web Environment Variables

```bash
cd ../web
nano .env.local
```

**Update these values:**

```env
# Change NEXTAUTH_URL to your actual domain
NEXTAUTH_URL="https://your-domain.com"

# Change API URL to your actual domain
NEXT_PUBLIC_API_URL="https://your-domain.com/api"

# Keep other values the same
```

#### 4.3 Restart PM2 Applications

```bash
# Restart all apps to load new environment variables
pm2 restart all

# Check status
pm2 status

# View logs to ensure everything is working
pm2 logs --lines 50
```

---

### **STEP 5: Install SSL Certificate**

#### 5.1 Install Certbot (if not already installed)

```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx -y
```

#### 5.2 Obtain SSL Certificate

```bash
# Replace with your actual domain
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Follow the prompts:
# 1. Enter your email address
# 2. Agree to Terms of Service (Y)
# 3. Choose redirect option: 2 (Redirect HTTP to HTTPS)
```

**Wait 2-3 minutes** for certificate installation.

#### 5.3 Test Certificate Renewal

```bash
# Test automatic renewal
sudo certbot renew --dry-run
```

#### 5.4 Verify SSL Installation

```bash
# Check SSL certificate
sudo certbot certificates

# Should show your domain with valid certificate
```

---

### **STEP 6: Final Verification**

#### 6.1 Test HTTP Access

```bash
# From VPS
curl -I http://your-domain.com

# Should redirect to HTTPS
```

#### 6.2 Test HTTPS Access

```bash
# From VPS
curl -I https://your-domain.com

# Should return: HTTP/1.1 200 OK
```

#### 6.3 Check PM2 Status

```bash
pm2 status

# Both apps should show "online" (green)
```

#### 6.4 Check Nginx Status

```bash
sudo systemctl status nginx

# Should show "active (running)"
```

#### 6.5 Test from Browser

Visit these URLs in your browser:

- ✅ `https://your-domain.com/` - Should load your app
- ✅ `https://your-domain.com/api` - Should show API response
- ✅ `https://www.your-domain.com/` - Should also work

#### 6.6 Verify Other Sites Still Work

Make sure existing sites are not affected:

- ✅ `https://engage-360.net`
- ✅ `https://agents.engage-360.net`
- ✅ `https://chat.engage-360.net`
- ✅ `https://bmi.engage-360.net`

---

## 🔧 Useful Commands for Maintenance

### View Logs

```bash
# PM2 logs
pm2 logs asp-afrique-web --lines 50
pm2 logs asp-afrique-api --lines 50

# Nginx logs
sudo tail -f /var/log/nginx/your-domain-access.log
sudo tail -f /var/log/nginx/your-domain-error.log
```

### Restart Applications

```bash
# Restart all PM2 apps
pm2 restart all

# Restart specific app
pm2 restart asp-afrique-web
pm2 restart asp-afrique-api
```

### Update Application

```bash
cd /var/www/asp-afrique

# Pull latest changes
git pull origin main  # or your branch name

# Install dependencies
pnpm install

# Generate Prisma client
cd packages/db
pnpm prisma generate
cd ../..

# Run migrations (if any)
cd packages/db
pnpm prisma migrate deploy
cd ../..

# Rebuild
pnpm build

# Restart PM2
pm2 restart all
```

### Check Resource Usage

```bash
# PM2 monitoring
pm2 monit

# System resources
htop
```

---

## 🆘 Troubleshooting

### Application Not Starting

```bash
# Check PM2 logs
pm2 logs --lines 100

# Check if ports are free
sudo lsof -i :3000
sudo lsof -i :3003

# Restart PM2
pm2 restart all
```

### Database Connection Error

```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Test database connection
psql -h localhost -U aspci_user -d aspci_afrique_db

# Check database exists
sudo -u postgres psql -l
```

### Nginx Errors

```bash
# Test configuration
sudo nginx -t

# Check error logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/your-domain-error.log
```

### Domain Not Loading

```bash
# Check DNS resolution
nslookup your-domain.com

# Check Nginx configuration
sudo nginx -T | grep -A 20 "your-domain.com"

# Check if Nginx is listening
sudo netstat -tulpn | grep nginx
```

### SSL Certificate Issues

```bash
# Check certificate status
sudo certbot certificates

# Renew certificate manually
sudo certbot renew --force-renewal

# Check certificate expiration
sudo certbot certificates | grep Expiry
```

---

## ✅ Post-Deployment Checklist

After deployment, verify:

- [ ] DNS resolves to correct IP (147.93.44.169)
- [ ] Domain loads via HTTP (redirects to HTTPS)
- [ ] SSL certificate installed and valid
- [ ] Domain loads via HTTPS with padlock 🔒
- [ ] All pages work correctly
- [ ] API endpoints respond correctly
- [ ] Forms submit properly
- [ ] Images display correctly
- [ ] PM2 apps show "online" status
- [ ] No errors in logs
- [ ] Other VPS sites still work
- [ ] Database connections working
- [ ] Authentication working

---

## 📊 Quick Reference: Complete Setup Commands

If you need to do a complete setup from scratch:

```bash
# 1. Connect to VPS
ssh root@147.93.44.169

# 2. Navigate to app directory
cd /var/www/asp-afrique

# 3. Install dependencies
pnpm install

# 4. Generate Prisma client
cd packages/db && pnpm prisma generate && cd ../..

# 5. Run migrations
cd packages/db && pnpm prisma migrate deploy && cd ../..

# 6. Build application
pnpm build

# 7. Create logs directory
mkdir -p logs

# 8. Start with PM2
pm2 start ecosystem.config.js
pm2 save

# 9. Configure Nginx
sudo nano /etc/nginx/sites-available/your-domain.com
# (Paste configuration from Step 3.3)

# 10. Enable site
sudo ln -s /etc/nginx/sites-available/your-domain.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# 11. Install SSL
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# 12. Verify
curl -I https://your-domain.com
pm2 status
```

---

## 🎉 Success!

Once complete, your AspCIWeb application will be:

- ✅ **Accessible**: `https://your-domain.com`
- ✅ **SSL Secure**: Valid certificate
- ✅ **Isolated**: No impact on other sites
- ✅ **Production Ready**: PM2 managed, auto-restart enabled

---

## 📞 Need Help?

If you encounter issues:

1. Check PM2 logs: `pm2 logs`
2. Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
3. Verify DNS: https://www.whatsmydns.net/
4. Test SSL: https://www.ssllabs.com/ssltest/
5. Check PM2 status: `pm2 status`
6. Verify Nginx status: `sudo systemctl status nginx`

---

**Created**: January 2025  
**Version**: 1.0.0  
**VPS**: 147.93.44.169  
**Multi-Site**: Yes - Isolated Configuration

