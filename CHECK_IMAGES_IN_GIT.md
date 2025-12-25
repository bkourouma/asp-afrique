# 🔍 Check if Images are in Git Repository

## How to Check

### Method 1: Check on Server (After Git Pull)

```bash
# Check if images folder exists after git pull
ls -la /var/www/asp-afrique/apps/web/public/images/

# If folder exists and has files, images are in git
# If folder doesn't exist or is empty, images are NOT in git
```

### Method 2: Check Git Repository

```bash
# On server, check if images are tracked by git
cd /var/www/asp-afrique
git ls-files | grep "public/images"

# If output shows image files, they're in git
# If no output, they're NOT in git
```

### Method 3: Check Local Repository

```bash
# On your local machine
git ls-files apps/web/public/images/

# Or check git status
git status apps/web/public/images/
```

---

## If Images Are NOT in Git

If images are not tracked by git, you need to copy them manually:

### Option 1: Add Images to Git (Recommended for Future)

```bash
# On your local machine
cd D:\APP\AspCIWeb

# Add images to git
git add apps/web/public/images/

# Commit
git commit -m "Add images to public folder"

# Push
git push origin 004-tech-videotheque-system

# Then on server, pull
git pull
```

### Option 2: Copy Images Directly (Faster)

```bash
# From your local machine (PowerShell)
cd D:\APP\AspCIWeb
scp -r apps\web\public\images root@147.93.44.169:/var/www/asp-afrique/apps/web/public/

# Enter password: Password@Acc225
```

---

## Quick Check Commands

Run these on your VPS:

```bash
# 1. Check if images folder exists
ls -la /var/www/asp-afrique/apps/web/public/images/

# 2. Check if images are tracked by git
git ls-files | grep "public/images"

# 3. If images don't exist, copy them (see Option 2 above)
```

---

**After checking, you'll know if you need to copy images manually or if they're already there from git pull!**







