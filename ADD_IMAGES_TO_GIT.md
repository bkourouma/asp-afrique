# 📸 Add Images to Git

## Current Situation

`.gitignore` has `public` on line 87, which means the entire `public` folder is ignored.

However, for Next.js projects, the `public` folder (especially static images) **should** be tracked in git.

---

## Solution: Update .gitignore and Add Images

### Step 1: Update .gitignore

Edit `.gitignore` to allow `public/images` while still ignoring generated files:

```bash
# On your local machine
cd D:\APP\AspCIWeb

# Edit .gitignore
notepad .gitignore
# Or use your preferred editor
```

**Find line 87** that says:
```
public
```

**Replace it with:**
```
# Public folder - ignore generated files but track static assets
public/uploads/
public/.DS_Store
public/*.log
```

This way:
- ✅ `public/images/` will be tracked
- ❌ `public/uploads/` will be ignored (user-generated content)
- ❌ Other generated files in public will be ignored

### Step 2: Force Add Images to Git

```bash
# On your local machine
cd D:\APP\AspCIWeb

# Force add images (even though they were ignored before)
git add -f apps/web/public/images/

# Verify files were added
git status

# Should show: apps/web/public/images/ as new files
```

### Step 3: Commit and Push

```bash
# Commit the images
git commit -m "Add static images to public folder"

# Push to repository
git push origin 004-tech-videotheque-system

# Or if you're on main/master:
# git push origin main
```

### Step 4: Pull on Server

```bash
# On the server
cd /var/www/asp-afrique

# Resolve the ecosystem.config.js conflict first (if not done)
nano ecosystem.config.js
# Keep: API_PORT: '3004'
# Mark as resolved:
git add ecosystem.config.js

# Pull latest changes (including images)
git pull origin 004-tech-videotheque-system

# Verify images were pulled
ls -la apps/web/public/images/

# Should show all image files
```

---

## Alternative: Quick Fix (Keep public ignored but force add images)

If you want to keep `public` ignored but still track images:

```bash
# On your local machine
cd D:\APP\AspCIWeb

# Force add images (bypasses .gitignore)
git add -f apps/web/public/images/

# Check status
git status

# Commit
git commit -m "Add static images to public folder"

# Push
git push origin 004-tech-videotheque-system
```

**Note**: This will work, but future images added to `public/images/` will also need `-f` flag.

---

## Recommended: Update .gitignore Properly

The best approach is to update `.gitignore` to be more specific:

### Update .gitignore

**Remove or comment out:**
```
public
```

**Add instead:**
```
# Public folder - ignore generated content but track static assets
public/uploads/
public/.DS_Store
public/*.log
public/*.tmp
```

This way:
- ✅ `public/images/` is tracked
- ✅ `public/` folder structure is tracked
- ❌ Only user-generated or temporary files are ignored

---

## Complete Command Sequence

**On your local machine:**

```bash
cd D:\APP\AspCIWeb

# 1. Update .gitignore (remove 'public' line, add specific ignores)
# Edit .gitignore file

# 2. Force add images
git add -f apps/web/public/images/

# 3. Verify
git status

# 4. Commit
git commit -m "Add static images to public folder and update .gitignore"

# 5. Push
git push origin 004-tech-videotheque-system
```

**On the server:**

```bash
cd /var/www/asp-afrique

# 1. Resolve conflict first
nano ecosystem.config.js
# Keep: API_PORT: '3004'
git add ecosystem.config.js

# 2. Pull changes
git pull origin 004-tech-videotheque-system

# 3. Verify images
ls -la apps/web/public/images/

# 4. Fix permissions
chmod -R 755 apps/web/public/images
chmod -R 644 apps/web/public/images/*

# 5. Test
curl -I http://localhost:3000/images/Logo_ASPCI.jpg
```

---

## Quick Reference: .gitignore Update

**Current (line 87):**
```
public
```

**Should be:**
```
# Public folder - ignore generated files but track static assets
public/uploads/
public/.DS_Store
public/*.log
```

**Or if you want to track everything in public:**
```
# Remove 'public' line entirely
# Only ignore specific generated files:
public/uploads/
public/.DS_Store
```

---

**After updating .gitignore and pushing, images will be tracked in git and available on the server!**







