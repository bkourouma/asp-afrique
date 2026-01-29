# 🔧 Fix Nginx Config for Images and NextAuth

## Issues

1. **Images 404**: `/images/*` not loading - need to proxy to Next.js (port 3000)
2. **NextAuth 404**: `/api/auth/*` routes returning 404 - need to proxy to Next.js (port 3000), not API (port 3004)

## Solution

Update nginx config to:
1. Add `/images` location block → proxy to Next.js (port 3000)
2. Add `/api/auth` location block → proxy to Next.js (port 3000) BEFORE the general `/api` block
3. Keep general `/api` block → proxy to Fastify API (port 3004)

**Important**: Order matters in nginx! More specific matches must come first.

---

## Updated Nginx Config

Run these commands on your VPS:

```bash
# Edit nginx config
sudo nano /etc/nginx/sites-available/asp-afrique.com
```

**Replace the entire file with this** (includes both HTTP and HTTPS blocks):

```nginx
# NGINX Configuration for asp-afrique.com
# This file is isolated and does not affect other applications on the server

# HTTP Server - Redirect to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name asp-afrique.com www.asp-afrique.com;

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
    server_name asp-afrique.com www.asp-afrique.com;

    # SSL Configuration (updated by Certbot)
    ssl_certificate /etc/letsencrypt/live/asp-afrique.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/asp-afrique.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Logging
    access_log /var/log/nginx/asp-afrique-access.log;
    error_log /var/log/nginx/asp-afrique-error.log;

    # Max upload size (for file uploads)
    client_max_body_size 100M;

    # Static images (served by Next.js from public folder)
    # MUST come before general location blocks
    location /images {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Cache images
        proxy_cache_valid 200 1h;
        add_header Cache-Control "public, max-age=3600";
    }

    # NextAuth API routes (handled by Next.js)
    # MUST come before general /api block
    location /api/auth {
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
    # All other /api/* routes go to Fastify API
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

    # Static files caching (_next/static)
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

    # Frontend - Next.js Application (port 3000)
    # This must be LAST (catch-all)
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

    # Deny access to hidden files
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
}
```

**Save**: `Ctrl+X`, then `Y`, then `Enter`

---

## Test and Reload

```bash
# Test nginx configuration
sudo nginx -t

# Should show: nginx: configuration file /etc/nginx/nginx.conf test is successful

# Reload nginx
sudo systemctl reload nginx
```

---

## Verify Fixes

```bash
# Test images
curl -I https://asp-afrique.com/images/Logo_ASPCI.jpg
# Should return: HTTP/2 200 OK

# Test NextAuth
curl -I https://asp-afrique.com/api/auth/session
# Should return: HTTP/2 200 OK (or appropriate response)

# Test API v1 routes (should still go to Fastify API)
curl -I https://asp-afrique.com/api/v1/auth
# Should return: HTTP/2 200 OK or appropriate response
```

---

## Test in Browser

1. **Clear browser cache** (Ctrl+Shift+Delete)
2. **Visit:** `https://asp-afrique.com` (use HTTPS!)
3. **Check:**
   - ✅ Images load correctly
   - ✅ No 404 errors in console
   - ✅ NextAuth works (no errors in console)
   - ✅ Site shows secure padlock 🔒

---

## Quick Reference

**Location Block Order** (most specific to least specific):
1. `/images` → Next.js (port 3000)
2. `/api/auth` → Next.js (port 3000)
3. `/api` → Fastify API (port 3004)
4. `/_next/static` → Next.js (port 3000)
5. `/uploads` → Fastify API (port 3004)
6. `/` → Next.js (port 3000) - catch-all

**Why order matters:**
- Nginx processes location blocks in order
- More specific matches (like `/api/auth`) must come before general matches (like `/api`)
- The first matching location block is used

---

**After applying this fix, all images and NextAuth routes should work correctly!**







