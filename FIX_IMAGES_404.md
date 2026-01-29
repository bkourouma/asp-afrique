# 🔧 Fix Images 404 - Next.js Not Serving Static Files

## Problem

Images are reaching Next.js (we see Next.js headers), but Next.js returns 404. This means:
- ✅ Nginx is proxying correctly to Next.js
- ❌ Next.js can't find the images in the `public` folder

## Solution

Check if images exist on the server and verify Next.js can serve them.

---

## Step 1: Verify Images Exist on Server

```bash
# Check if images folder exists
ls -la /var/www/asp-afrique/apps/web/public/images/

# Check specific logo file
ls -la /var/www/asp-afrique/apps/web/public/images/Logo_ASPCI.jpg

# List all images
ls -la /var/www/asp-afrique/apps/web/public/images/*.jpg
ls -la /var/www/asp-afrique/apps/web/public/images/*.png
```

---

## Step 2: Check File Permissions

```bash
# Check permissions on public folder
ls -ld /var/www/asp-afrique/apps/web/public
ls -ld /var/www/asp-afrique/apps/web/public/images

# Should show: drwxr-xr-x (755 for directories)

# Fix permissions if needed
chmod -R 755 /var/www/asp-afrique/apps/web/public
chmod -R 644 /var/www/asp-afrique/apps/web/public/images/*
```

---

## Step 3: Test Direct Access to Next.js

```bash
# Test if Next.js can serve the image directly (bypassing nginx)
curl -I http://localhost:3000/images/Logo_ASPCI.jpg

# Should return: HTTP/1.1 200 OK

# If this works, nginx config is the issue
# If this doesn't work, Next.js can't find the files
```

---

## Step 4: Check Next.js Build

```bash
# Verify Next.js build includes public folder
ls -la /var/www/asp-afrique/apps/web/.next

# Check if public folder is symlinked or copied
ls -la /var/www/asp-afrique/apps/web/.next/static
```

---

## Step 5: Restart PM2

```bash
# Restart Next.js app
pm2 restart asp-afrique-web

# Check logs for errors
pm2 logs asp-afrique-web --lines 50
```

---

## Step 6: Verify Nginx Config

```bash
# Check if /images location block exists
sudo grep -A 10 "location /images" /etc/nginx/sites-available/asp-afrique.com

# Should show:
# location /images {
#     proxy_pass http://127.0.0.1:3000;
#     ...
# }
```

---

## Common Issues

### Issue 1: Images Not in Public Folder

If images don't exist:

```bash
# Check where images are
find /var/www/asp-afrique -name "Logo_ASPCI.jpg"

# If found elsewhere, copy to public folder
cp /path/to/images/* /var/www/asp-afrique/apps/web/public/images/

# Fix permissions
chmod -R 644 /var/www/asp-afrique/apps/web/public/images/*
```

### Issue 2: Next.js Not Serving Static Files

Next.js should automatically serve files from `public/` folder. If it's not:

```bash
# Check Next.js config
cat /var/www/asp-afrique/apps/web/next.config.ts

# Restart PM2
pm2 restart asp-afrique-web

# Check PM2 logs
pm2 logs asp-afrique-web --lines 50
```

### Issue 3: Case Sensitivity

Linux is case-sensitive! Check if filename matches exactly:

```bash
# Check exact filename
ls -la /var/www/asp-afrique/apps/web/public/images/ | grep -i logo

# The code might be looking for: Logo_ASPCI.jpg
# But file might be: logo_aspci.jpg or LOGO_ASPCI.JPG
```

---

## Quick Fix Commands

```bash
# 1. Verify images exist
ls -la /var/www/asp-afrique/apps/web/public/images/Logo_ASPCI.jpg

# 2. Check permissions
chmod -R 755 /var/www/asp-afrique/apps/web/public
chmod -R 644 /var/www/asp-afrique/apps/web/public/images/*

# 3. Test direct access
curl -I http://localhost:3000/images/Logo_ASPCI.jpg

# 4. Restart PM2
pm2 restart asp-afrique-web

# 5. Test via nginx
curl -I https://asp-afrique.com/images/Logo_ASPCI.jpg
```

---

**Run these commands and share the results so we can identify the exact issue!**







