# 🔧 Fix HTTPS and Images Issues

## Issues Identified

1. **"Non sécurisé" (Not Secure)** - Site is being accessed via HTTP instead of HTTPS
2. **Logo not showing** - Image `/images/Logo_ASPCI.jpg` not loading

---

## Issue 1: HTTPS Not Working

### Problem

The browser shows "Non sécurisé" which means you're accessing the site via HTTP instead of HTTPS.

### Solution

**Always use HTTPS:**
- ✅ Use: `https://asp-afrique.com`
- ❌ Don't use: `http://asp-afrique.com`

**The redirect should work, but to ensure HTTPS is properly configured:**

```bash
# Check if HTTPS server block exists
sudo cat /etc/nginx/sites-available/asp-afrique.com | grep -A 5 "listen 443"

# If no output, HTTPS block is missing - run Certbot
sudo certbot --nginx -d asp-afrique.com -d www.asp-afrique.com

# Verify HTTPS works
curl -I https://asp-afrique.com
# Should return: HTTP/2 200 OK
```

**For users:** Always bookmark and access: `https://asp-afrique.com` (with the `s` in `https`)

---

## Issue 2: Images Not Loading

### Problem

Logo image `/images/Logo_ASPCI.jpg` is not loading even though the file exists.

### Solution

**Step 1: Verify images exist on server**

```bash
# Check if images folder exists
ls -la /var/www/asp-afrique/apps/web/public/images/

# Check if logo file exists
ls -la /var/www/asp-afrique/apps/web/public/images/Logo_ASPCI.jpg
```

**Step 2: Test image access**

```bash
# Test if image is accessible via HTTPS
curl -I https://asp-afrique.com/images/Logo_ASPCI.jpg

# Should return: HTTP/2 200 OK
```

**Step 3: Check nginx config for images**

The nginx config should proxy `/images` requests to Next.js. Since Next.js serves files from the `public` folder, images should work automatically. However, let's verify:

```bash
# Check nginx config
sudo cat /etc/nginx/sites-available/asp-afrique.com | grep -A 5 "location /"
```

**Step 4: If images still don't load, add explicit images location**

Edit nginx config:

```bash
sudo nano /etc/nginx/sites-available/asp-afrique.com
```

Inside the HTTPS server block, add this after the `/api` location block:

```nginx
    # Static images (served by Next.js from public folder)
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
```

**Step 5: Test and reload nginx**

```bash
# Test nginx config
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx

# Test image access
curl -I https://asp-afrique.com/images/Logo_ASPCI.jpg
# Should return: HTTP/2 200 OK
```

**Step 6: Restart PM2 (if needed)**

```bash
# Restart web app to ensure static files are served correctly
pm2 restart asp-afrique-web

# Check status
pm2 status
```

---

## Complete Fix Steps

### Step 1: Verify HTTPS Configuration

```bash
# Check SSL certificate
sudo certbot certificates | grep asp-afrique

# Check HTTPS server block exists
sudo cat /etc/nginx/sites-available/asp-afrique.com | grep "listen 443"

# Test HTTPS
curl -I https://asp-afrique.com
```

### Step 2: Verify Images Exist

```bash
# Check images folder
ls -la /var/www/asp-afrique/apps/web/public/images/

# Check logo file
ls -la /var/www/asp-afrique/apps/web/public/images/Logo_ASPCI.jpg

# Verify file permissions
chmod 644 /var/www/asp-afrique/apps/web/public/images/*
```

### Step 3: Update Nginx Config (if needed)

```bash
# Edit nginx config
sudo nano /etc/nginx/sites-available/asp-afrique.com
```

Add the `/images` location block inside the HTTPS server block (after the `/api` block and before the closing `}`):

```nginx
    # Static images
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
```

### Step 4: Test and Reload

```bash
# Test nginx config
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx

# Restart PM2
pm2 restart asp-afrique-web

# Test image access
curl -I https://asp-afrique.com/images/Logo_ASPCI.jpg
```

### Step 5: Test in Browser

1. **Clear browser cache** (Ctrl+Shift+Delete)
2. **Visit:** `https://asp-afrique.com` (use HTTPS!)
3. **Check:**
   - ✅ Padlock icon shows (secure)
   - ✅ Logo displays correctly
   - ✅ Other images load

---

## Troubleshooting

### Images still not loading

```bash
# Check if Next.js is serving static files
curl https://asp-afrique.com/images/Logo_ASPCI.jpg

# Check nginx error logs
sudo tail -50 /var/log/nginx/asp-afrique-error.log

# Check PM2 logs
pm2 logs asp-afrique-web --lines 50

# Verify file permissions
ls -la /var/www/asp-afrique/apps/web/public/images/Logo_ASPCI.jpg
```

### HTTPS redirect not working

```bash
# Check HTTP server block has redirect
sudo grep -A 3 "location /" /etc/nginx/sites-available/asp-afrique.com | head -10

# Should show:
# location / {
#     return 301 https://$server_name$request_uri;
# }

# If not, edit nginx config and add redirect
sudo nano /etc/nginx/sites-available/asp-afrique.com
```

### Mixed Content Warnings

If you see mixed content warnings (some resources loading over HTTP):
- Make sure all image URLs use HTTPS or relative paths
- Check browser console for mixed content errors
- Update any hardcoded HTTP URLs in code to HTTPS

---

## Quick Fix Commands

```bash
# 1. Check HTTPS config
sudo certbot certificates | grep asp-afrique
curl -I https://asp-afrique.com

# 2. Check images exist
ls -la /var/www/asp-afrique/apps/web/public/images/Logo_ASPCI.jpg

# 3. Test image access
curl -I https://asp-afrique.com/images/Logo_ASPCI.jpg

# 4. If images don't load, add location block to nginx config
# (See Step 3 above)

# 5. Reload services
sudo nginx -t && sudo systemctl reload nginx
pm2 restart asp-afrique-web

# 6. Test again
curl -I https://asp-afrique.com/images/Logo_ASPCI.jpg
```

---

## Important Notes

1. **Always use HTTPS:** Bookmark and access `https://asp-afrique.com` (not HTTP)
2. **Clear browser cache:** After fixes, clear cache to see changes
3. **File permissions:** Ensure images have read permissions (644)
4. **Next.js static files:** Files in `public/images/` are served at `/images/` automatically

---

**Remember:** The most common issue is accessing via HTTP instead of HTTPS. Always use `https://asp-afrique.com`!
