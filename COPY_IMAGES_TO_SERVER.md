# 📸 Copy Images to Server

## Problem

Images folder doesn't exist on the server: `/var/www/asp-afrique/apps/web/public/images/`

The images exist locally but weren't copied to the server.

---

## Solution: Copy Images to Server

### Option 1: Using SCP (from your local machine)

```bash
# From your local machine (Windows PowerShell)
# Navigate to project directory
cd D:\APP\AspCIWeb

# Copy images folder to server
scp -r apps/web/public/images root@147.93.44.169:/var/www/asp-afrique/apps/web/public/

# You'll be prompted for password: Password@Acc225
```

### Option 2: Using Git (if images are in repository)

```bash
# On the server
cd /var/www/asp-afrique

# Pull latest changes (if images are in git)
git pull origin main  # or your branch name

# Verify images were copied
ls -la apps/web/public/images/
```

### Option 3: Create folder and copy manually (if images are elsewhere)

```bash
# On the server
# Create images directory
mkdir -p /var/www/asp-afrique/apps/web/public/images

# Copy images from your local machine using SCP
# Or upload via FTP/SFTP
# Or copy from another location on the server
```

---

## After Copying Images

### Step 1: Verify Images Exist

```bash
# Check images folder
ls -la /var/www/asp-afrique/apps/web/public/images/

# Check specific logo
ls -la /var/www/asp-afrique/apps/web/public/images/Logo_ASPCI.jpg

# Should show the file exists
```

### Step 2: Fix Permissions

```bash
# Set correct permissions
chmod -R 755 /var/www/asp-afrique/apps/web/public/images
chmod -R 644 /var/www/asp-afrique/apps/web/public/images/*

# Verify permissions
ls -la /var/www/asp-afrique/apps/web/public/images/
```

### Step 3: Test Direct Access

```bash
# Test if Next.js can serve the image
curl -I http://localhost:3000/images/Logo_ASPCI.jpg

# Should return: HTTP/1.1 200 OK
```

### Step 4: Restart PM2 (if needed)

```bash
# Restart web app
pm2 restart asp-afrique-web

# Check status
pm2 status
```

### Step 5: Test via HTTPS

```bash
# Test via nginx
curl -I https://asp-afrique.com/images/Logo_ASPCI.jpg

# Should return: HTTP/2 200 OK
```

---

## Required Images

Based on the errors, you need these images:

- `Logo_ASPCI.jpg`
- `BMI.png`
- `logo_tresorpay.png`
- `tresor-money.jpg`
- `Sodexam.jpg`
- `PASP.jpg`
- `PAA.png`
- `québec.jpg`
- `CTTA_LOGO_MED.jpg`
- `Unitas.png`
- `La cite.png`
- `FDFP.png`
- `CGECI.png`
- `SITARAIL.png`
- `COOPEC.png`
- `FIDRA.jpg`
- `SICOGI.png`
- `Section_Hero.jpg`

All should be in: `apps/web/public/images/`

---

## Quick Copy Command (from your local machine)

```powershell
# From Windows PowerShell
cd D:\APP\AspCIWeb

# Copy entire images folder
scp -r apps\web\public\images root@147.93.44.169:/var/www/asp-afrique/apps/web/public/

# Enter password when prompted: Password@Acc225
```

Or if you have Git access:

```bash
# On server
cd /var/www/asp-afrique
git pull origin main
ls -la apps/web/public/images/
```

---

**After copying images, they should load correctly!**







