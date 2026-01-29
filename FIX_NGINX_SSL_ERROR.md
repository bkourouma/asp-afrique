# 🔧 Fix Nginx SSL Certificate Error

## Problem

Nginx is trying to load SSL certificates that don't exist yet:
```
cannot load certificate "/etc/letsencrypt/live/asp-afrique.com/fullchain.pem"
```

## Solution

Edit the nginx config file directly on the server to remove the HTTPS block until SSL is installed.

---

## Quick Fix Commands

Run these commands on your VPS:

```bash
# 1. Edit the nginx config file
sudo nano /etc/nginx/sites-available/asp-afrique.com
```

**In the file, find and DELETE the entire HTTPS server block** (lines starting with `# HTTPS Server Configuration` through the closing `}`).

**Keep ONLY the HTTP server block** (the one with `listen 80;`).

**Save**: `Ctrl+X`, then `Y`, then `Enter`

```bash
# 2. Test nginx configuration
sudo nginx -t

# Should show: nginx: configuration file /etc/nginx/nginx.conf test is successful

# 3. Reload nginx
sudo systemctl reload nginx

# 4. Test HTTP access
curl -I http://localhost -H "Host: asp-afrique.com"
```

---

## What the File Should Look Like

The file should have ONLY this (HTTP server block):

```nginx
# NGINX Configuration for asp-afrique.com
# This file is isolated and does not affect other applications on the server

# HTTP Server - Will be updated by Certbot to redirect to HTTPS after SSL installation
server {
    listen 80;
    listen [::]:80;
    server_name asp-afrique.com www.asp-afrique.com;

    # Allow Let's Encrypt challenges
    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }

    # Logging
    access_log /var/log/nginx/asp-afrique-access.log;
    error_log /var/log/nginx/asp-afrique-error.log;

    # Max upload size (for file uploads)
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

    # API Backend - Fastify API (port 3004)
    location /api {
        proxy_pass http://127.0.0.1:3004;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # CORS headers (if needed)
        add_header Access-Control-Allow-Origin $http_origin always;
        add_header Access-Control-Allow-Credentials true always;
        add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS" always;
        add_header Access-Control-Allow-Headers "Authorization, Content-Type, X-Requested-With" always;

        # Handle preflight requests
        if ($request_method = OPTIONS) {
            return 204;
        }

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

    # Upload directory (if serving files directly)
    location /uploads {
        proxy_pass http://127.0.0.1:3004;
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

# HTTPS Server Configuration will be added automatically by Certbot
# After running: sudo certbot --nginx -d asp-afrique.com -d www.asp-afrique.com
```

**NO HTTPS server block should exist yet!**

---

## Alternative: Quick Replace Method

If you prefer, you can replace the entire file content:

```bash
# Backup the current file
sudo cp /etc/nginx/sites-available/asp-afrique.com /etc/nginx/sites-available/asp-afrique.com.backup

# Create a new clean file (then copy the content above)
sudo nano /etc/nginx/sites-available/asp-afrique.com
# Delete everything and paste the clean HTTP-only version above
```

---

## After Fix

Once nginx test passes:

```bash
# Test nginx
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx

# Test HTTP access
curl -I http://localhost -H "Host: asp-afrique.com"
```

Then proceed to install SSL:

```bash
sudo certbot --nginx -d asp-afrique.com -d www.asp-afrique.com
```

Certbot will automatically add the HTTPS server block!







