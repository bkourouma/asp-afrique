# 🔧 Fix Nginx Redirect - Install SSL Properly

## Problem

The nginx config is redirecting HTTP to HTTPS, but:
- No HTTPS server block exists
- No SSL certificate exists for `asp-afrique.com`

## Solution

1. Fix nginx config to serve HTTP content first
2. Install SSL certificate with Certbot
3. Certbot will automatically add HTTPS block and update redirect

---

## Step 1: Fix Nginx Config (Remove Redirect Temporarily)

Run this command on your VPS:

```bash
sudo tee /etc/nginx/sites-available/asp-afrique.com > /dev/null << 'EOF'
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
EOF
```

---

## Step 2: Test and Reload Nginx

```bash
# Test nginx configuration
sudo nginx -t

# Should show: nginx: configuration file /etc/nginx/nginx.conf test is successful

# Reload nginx
sudo systemctl reload nginx
```

---

## Step 3: Test HTTP Access

```bash
# Test HTTP access (should work now, no redirect)
curl -I http://asp-afrique.com

# Should return: HTTP/1.1 200 OK (not redirect)

# Test API
curl http://asp-afrique.com/api/health

# Should return: {"status":"ok","timestamp":"..."}
```

---

## Step 4: Install SSL Certificate

```bash
# Install Certbot (if not already installed)
sudo apt update
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate (this will automatically add HTTPS block and update redirect)
sudo certbot --nginx -d asp-afrique.com -d www.asp-afrique.com

# Follow the prompts:
# 1. Enter your email address
# 2. Agree to Terms of Service (Y)
# 3. Choose redirect option: 2 (Redirect HTTP to HTTPS)
```

---

## Step 5: Verify SSL Installation

```bash
# Check SSL certificate
sudo certbot certificates | grep asp-afrique

# Test HTTPS
curl -I https://asp-afrique.com

# Should return: HTTP/1.1 200 OK

# Test HTTP redirect
curl -I http://asp-afrique.com

# Should return: HTTP/1.1 301 Moved Permanently (redirect to HTTPS)
```

---

**Done!** Your site will be accessible via HTTPS with automatic HTTP to HTTPS redirect.







