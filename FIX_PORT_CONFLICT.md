# 🔧 Fix Port 3003 Conflict

## Problem

Your API (`asp-afrique-api`) is trying to use port 3003, but it's already in use by another application (likely `gamr-site`).

**Error**: `listen EADDRINUSE: address already in use 0.0.0.0:3003`

## Solution: Use a Different Port

We'll change the API port to 3004 (or another available port).

---

## Quick Fix Steps

### Step 1: Check What's Using Port 3003

```bash
# Check what process is using port 3003
sudo lsof -i :3003

# Or check with netstat
sudo netstat -tulpn | grep 3003

# Check PM2 processes
pm2 list
```

### Step 2: Change API Port to 3004

#### Option A: Update Environment Variable in ecosystem.config.js

```bash
cd /var/www/asp-afrique
nano ecosystem.config.js
```

**Change this line (line 16):**

```javascript
// OLD:
API_PORT: '3003',

// NEW:
API_PORT: '3004',
```

**Save**: `Ctrl+X`, then `Y`, then `Enter`

#### Option B: Update Environment Variable in apps/api/.env

```bash
cd /var/www/asp-afrique/apps/api
nano .env
```

**Change this line:**

```env
# OLD:
API_PORT=3003

# NEW:
API_PORT=3004
```

**Save**: `Ctrl+X`, then `Y`, then `Enter`

### Step 3: Stop and Restart PM2

```bash
# Stop the failing API
pm2 stop asp-afrique-api

# Delete it from PM2
pm2 delete asp-afrique-api

# Restart with updated config
cd /var/www/asp-afrique
pm2 start ecosystem.config.js

# Check status
pm2 status
```

### Step 4: Verify API is Running

```bash
# Check if port 3004 is listening
sudo netstat -tulpn | grep 3004

# Test API endpoint
curl http://localhost:3004

# Check PM2 logs
pm2 logs asp-afrique-api --lines 20
```

### Step 5: Update Nginx Configuration (if already configured)

If you've already set up Nginx, update it to use port 3004:

```bash
sudo nano /etc/nginx/sites-available/your-domain.com
```

**Find this line (around line 65):**

```nginx
# OLD:
proxy_pass http://127.0.0.1:3003;

# NEW:
proxy_pass http://127.0.0.1:3004;
```

**Save and reload Nginx:**

```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## Alternative: Check Available Ports

If you want to see what ports are available:

```bash
# Check all listening ports
sudo netstat -tulpn | grep LISTEN

# Common ports in use:
# - 80: HTTP (Nginx)
# - 443: HTTPS (Nginx)
# - 3000: Your web app (asp-afrique-web)
# - 3001: imhotepformation-app
# - 3003: gamr-site (already in use)
# - 3004: Available (recommended)
# - 3005: Available
```

---

## Complete Updated ecosystem.config.js

Here's the updated section for the API:

```javascript
{
  name: 'asp-afrique-api',
  script: 'node',
  args: 'dist/index.js',
  instances: 1,
  exec_mode: 'fork',
  cwd: './apps/api',
  env: {
    NODE_ENV: 'production',
    API_PORT: '3004',  // Changed from 3003 to 3004
    DATABASE_URL: 'postgresql://aspci_user:VotreMotDePasseSecurise123!@localhost:5432/aspci_afrique_db',
    NEXTAUTH_SECRET: 'your-secret-key-change-in-production-please-change-this',
    API_HOST: '0.0.0.0',
    CORS_ORIGIN: 'http://localhost:3000'
  },
  // ... rest of config
}
```

---

## Verification Commands

After fixing, verify everything works:

```bash
# 1. Check PM2 status
pm2 status

# Both apps should show "online" (green)

# 2. Test web app
curl -I http://localhost:3000
# Should return: HTTP/1.1 200 OK

# 3. Test API
curl -I http://localhost:3004
# Should return: HTTP/1.1 200 OK or similar

# 4. Check ports
sudo netstat -tulpn | grep -E '3000|3004'
# Should show both ports listening

# 5. Check PM2 logs
pm2 logs asp-afrique-api --lines 10
# Should show: ✅ Server running at http://0.0.0.0:3004
```

---

## Summary

✅ **Problem**: Port 3003 is already in use  
✅ **Solution**: Change API port to 3004  
✅ **Update**: ecosystem.config.js and apps/api/.env  
✅ **Restart**: PM2 with updated config  
✅ **Verify**: Both apps running correctly  

---

**Quick Command Sequence:**

```bash
# 1. Update ecosystem.config.js
cd /var/www/asp-afrique
nano ecosystem.config.js
# Change API_PORT: '3003' to API_PORT: '3004'

# 2. Update .env (optional but recommended)
cd apps/api
nano .env
# Change API_PORT=3003 to API_PORT=3004

# 3. Restart PM2
cd /var/www/asp-afrique
pm2 delete asp-afrique-api
pm2 start ecosystem.config.js

# 4. Verify
pm2 status
curl http://localhost:3004
```

---

**Done!** Your API should now be running on port 3004 without conflicts.







