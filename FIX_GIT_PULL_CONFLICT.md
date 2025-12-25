# 🔧 Fix Git Pull Conflict

## Problem

Git pull is failing because local changes to `ecosystem.config.js` would be overwritten.

## Solution

Stash your changes, pull, then reapply them.

---

## Step 1: Stash Local Changes

```bash
# Stash your local changes (saves them temporarily)
git stash

# Check stash
git stash list
```

---

## Step 2: Pull Latest Changes

```bash
# Pull latest changes (should include images)
git pull origin 004-tech-videotheque-system

# Or if that doesn't work:
git pull
```

---

## Step 3: Re-apply Your Changes

```bash
# Re-apply your stashed changes (port 3004 fix)
git stash pop

# If there are conflicts, you'll need to resolve them manually
# The important change is: API_PORT should be '3004'
```

---

## Step 4: Verify Images Copied

```bash
# Check if images folder exists now
ls -la /var/www/asp-afrique/apps/web/public/images/

# Should show all image files
```

---

## Alternative: Copy Images Directly (Faster)

If you just need the images and don't want to deal with git conflicts:

```bash
# Create images directory
mkdir -p /var/www/asp-afrique/apps/web/public/images

# Then copy images from your local machine using SCP
# (See COPY_IMAGES_TO_SERVER.md)
```

---

## Quick Fix Commands

```bash
# 1. Stash changes
git stash

# 2. Pull changes
git pull

# 3. Re-apply changes
git stash pop

# 4. Verify images
ls -la apps/web/public/images/

# 5. Fix permissions
chmod -R 755 apps/web/public/images
chmod -R 644 apps/web/public/images/*

# 6. Test
curl -I http://localhost:3000/images/Logo_ASPCI.jpg
```

---

**After pulling, images should be available!**







