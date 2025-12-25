# 🔧 Resolve Git Conflict and Copy Images

## Step 1: Resolve Merge Conflict

### Option 1: Keep Your Changes (Port 3004)

```bash
# View the conflict
cat /var/www/asp-afrique/ecosystem.config.js

# You'll see conflict markers:
# <<<<<<< Updated upstream
# ... (from git)
# =======
# ... (your changes - port 3004)
# >>>>>>> Stashed changes

# Edit the file to keep port 3004
nano /var/www/asp-afrique/ecosystem.config.js
```

**Keep the version with `API_PORT: '3004'`** (your stashed changes).

Remove the conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`) and keep the correct version.

### Option 2: Quick Fix - Accept Your Version

```bash
# Accept your version (with port 3004)
git checkout --theirs ecosystem.config.js

# Edit to ensure port 3004
nano /var/www/asp-afrique/ecosystem.config.js

# Make sure it has: API_PORT: '3004'
# Save and exit
```

### Option 3: Manual Edit

```bash
# Edit the file
nano /var/www/asp-afrique/ecosystem.config.js

# Find the conflict section and keep:
# API_PORT: '3004',

# Remove conflict markers
# Save: Ctrl+X, Y, Enter
```

### After Resolving Conflict

```bash
# Mark conflict as resolved
git add ecosystem.config.js

# Verify no more conflicts
git status

# Should show: "working tree clean"
```

---

## Step 2: Copy Images to Server

Since images are not in git (`.gitignore` ignores `public`), copy them directly:

### From Your Local Machine (PowerShell):

```powershell
# Navigate to project directory
cd D:\APP\AspCIWeb

# Copy images folder to server
scp -r apps\web\public\images root@147.93.44.169:/var/www/asp-afrique/apps/web/public/

# Enter password: Password@Acc225
```

### Then on Server:

```bash
# Verify images were copied
ls -la /var/www/asp-afrique/apps/web/public/images/

# Should show all image files

# Fix permissions
chmod -R 755 /var/www/asp-afrique/apps/web/public/images
chmod -R 644 /var/www/asp-afrique/apps/web/public/images/*

# Test
curl -I http://localhost:3000/images/Logo_ASPCI.jpg
# Should return: HTTP/1.1 200 OK

# Test via HTTPS
curl -I https://asp-afrique.com/images/Logo_ASPCI.jpg
# Should return: HTTP/2 200 OK
```

---

## Quick Command Sequence

**On server:**
```bash
# 1. Resolve conflict (keep port 3004)
nano /var/www/asp-afrique/ecosystem.config.js
# Keep: API_PORT: '3004'
# Save

# 2. Mark resolved
git add ecosystem.config.js

# 3. Verify
git status
```

**From your local machine (PowerShell):**
```powershell
cd D:\APP\AspCIWeb
scp -r apps\web\public\images root@147.93.44.169:/var/www/asp-afrique/apps/web/public/
```

**Back on server:**
```bash
# 4. Verify images
ls -la /var/www/asp-afrique/apps/web/public/images/

# 5. Fix permissions
chmod -R 755 /var/www/asp-afrique/apps/web/public/images
chmod -R 644 /var/www/asp-afrique/apps/web/public/images/*

# 6. Test
curl -I https://asp-afrique.com/images/Logo_ASPCI.jpg
```

---

**After these steps, images should load correctly!**







