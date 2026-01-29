# 📸 Commands to Add Images to Git

## Current Situation

`.gitignore` has `public` which ignores the entire public folder. I've updated it to only ignore specific generated files.

---

## Commands to Run

### On Your Local Machine

```bash
# 1. Navigate to project directory
cd D:\APP\AspCIWeb

# 2. Verify .gitignore was updated (should NOT have 'public' line anymore)
# Check line 87 should now have specific ignores instead of just 'public'

# 3. Force add images (even if they were ignored before)
git add -f apps/web/public/images/

# 4. Verify images were added
git status

# Should show: apps/web/public/images/*.jpg, *.png, etc. as new files

# 5. Commit the images
git commit -m "Add static images to public folder"

# 6. Also commit the .gitignore update
git add .gitignore
git commit -m "Update .gitignore to track public/images while ignoring uploads"

# 7. Push to repository
git push origin 004-tech-videotheque-system
```

---

## Step-by-Step Breakdown

### Step 1: Update .gitignore (Already Done)

I've updated `.gitignore` to:
- ❌ Ignore: `public/uploads/` (user-generated content)
- ❌ Ignore: `public/.DS_Store`, `public/*.log`, `public/*.tmp` (system files)
- ✅ Track: `public/images/` (static assets)

### Step 2: Force Add Images

```bash
git add -f apps/web/public/images/
```

The `-f` flag forces git to add files even if they were previously ignored.

### Step 3: Verify

```bash
git status
```

You should see:
```
new file:   apps/web/public/images/BMI.png
new file:   apps/web/public/images/CGECI.png
new file:   apps/web/public/images/Logo_ASPCI.jpg
... (all other images)
```

### Step 4: Commit and Push

```bash
git commit -m "Add static images to public folder"
git push origin 004-tech-videotheque-system
```

---

## After Pushing: Pull on Server

### On the Server:

```bash
# 1. Resolve the ecosystem.config.js conflict first
nano /var/www/asp-afrique/ecosystem.config.js

# Keep the version with: API_PORT: '3004'
# Remove conflict markers (<<<<<<<, =======, >>>>>>>)
# Save: Ctrl+X, Y, Enter

# 2. Mark conflict as resolved
git add ecosystem.config.js

# 3. Pull latest changes (including images)
git pull origin 004-tech-videotheque-system

# 4. Verify images were pulled
ls -la /var/www/asp-afrique/apps/web/public/images/

# Should show all image files now!

# 5. Fix permissions
chmod -R 755 /var/www/asp-afrique/apps/web/public/images
chmod -R 644 /var/www/asp-afrique/apps/web/public/images/*

# 6. Test
curl -I http://localhost:3000/images/Logo_ASPCI.jpg
# Should return: HTTP/1.1 200 OK

# 7. Test via HTTPS
curl -I https://asp-afrique.com/images/Logo_ASPCI.jpg
# Should return: HTTP/2 200 OK
```

---

## Quick Command Summary

**On your local machine:**

```bash
cd D:\APP\AspCIWeb
git add -f apps/web/public/images/
git add .gitignore
git commit -m "Add static images and update .gitignore"
git push origin 004-tech-videotheque-system
```

**On the server:**

```bash
cd /var/www/asp-afrique
# Resolve conflict in ecosystem.config.js (keep port 3004)
git add ecosystem.config.js
git pull origin 004-tech-videotheque-system
ls -la apps/web/public/images/
chmod -R 755 apps/web/public/images
chmod -R 644 apps/web/public/images/*
```

---

**After these commands, images will be in git and available on the server!**







