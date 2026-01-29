# 🔄 AspCIWeb - Update Guide

## 📋 Overview

This guide explains how to update your `asp-afrique.com` application on the VPS after initial deployment.

**VPS Details:**
- **IP:** 147.93.44.169
- **Application Path:** `/var/www/asp-afrique`
- **Domain:** `asp-afrique.com`
- **PM2 Apps:** `asp-afrique-web`, `asp-afrique-api`

---

## 🚀 Quick Update Process

### Standard Update (No Database Changes)

```bash
# 1. Connect to VPS
ssh root@147.93.44.169

# 2. Navigate to application directory
cd /var/www/asp-afrique

# 3. Pull latest changes
git pull origin main  # or your branch name

# 4. Install dependencies (if package.json changed)
pnpm install

# 5. Generate Prisma client (if database schema changed)
cd packages/db
pnpm prisma generate
cd ../..

# 6. Build application
pnpm build

# 7. Restart PM2 applications
pm2 restart all

# 8. Verify status
pm2 status
```

---

## 📝 Detailed Update Steps

### Step 1: Connect to VPS

```bash
ssh root@147.93.44.169
# Enter password when prompted
```

### Step 2: Navigate to Application Directory

```bash
cd /var/www/asp-afrique
```

### Step 3: Check Current Status

```bash
# Check PM2 status
pm2 status

# Check git status
git status

# View recent commits
git log --oneline -5
```

### Step 4: Backup Current Version (Recommended)

```bash
# Create a backup branch/tag
git tag backup-$(date +%Y%m%d-%H%M%S)
git push origin --tags

# Or create a backup of the current state
cp -r /var/www/asp-afrique /var/www/asp-afrique.backup.$(date +%Y%m%d)
```

### Step 5: Pull Latest Changes

```bash
# Pull from repository
git pull origin main  # or your branch name (e.g., master, develop)

# If you get merge conflicts, resolve them:
# git stash
# git pull origin main
# git stash pop
```

### Step 6: Install Dependencies

```bash
# Install/update dependencies (if package.json changed)
pnpm install

# If you see errors, try:
# rm -rf node_modules
# pnpm install
```

### Step 7: Update Database (If Needed)

```bash
# Check if database migrations are needed
cd packages/db

# Generate Prisma client (if schema changed)
pnpm prisma generate

# Run migrations (if new migrations exist)
pnpm prisma migrate deploy

# Return to root
cd ../..
```

### Step 8: Build Application

```bash
# Build for production
pnpm build

# Verify build succeeded
ls -la apps/web/.next
ls -la apps/api/dist
```

### Step 9: Restart PM2 Applications

```bash
# Restart all applications
pm2 restart all

# Or restart individually
pm2 restart asp-afrique-web
pm2 restart asp-afrique-api

# Check status
pm2 status

# View logs to verify everything is working
pm2 logs --lines 50
```

### Step 10: Verify Update

```bash
# Test HTTPS access
curl -I https://asp-afrique.com

# Should return: HTTP/2 200 OK

# Test API endpoint
curl https://asp-afrique.com/api/v1/auth

# Check PM2 status
pm2 status

# Both apps should show "online" (green)
```

---

## 🔧 Update Scenarios

### Scenario 1: Code Update Only (No Database Changes)

```bash
cd /var/www/asp-afrique
git pull origin main
pnpm install
pnpm build
pm2 restart all
pm2 status
```

### Scenario 2: Code + Database Schema Update

```bash
cd /var/www/asp-afrique
git pull origin main
pnpm install
cd packages/db
pnpm prisma generate
pnpm prisma migrate deploy
cd ../..
pnpm build
pm2 restart all
pm2 status
```

### Scenario 3: Environment Variables Update

```bash
cd /var/www/asp-afrique

# Edit environment files
nano apps/api/.env
nano apps/web/.env.local
nano packages/db/.env

# Restart PM2 to load new environment variables
pm2 restart all

# Verify
pm2 status
pm2 logs --lines 20
```

### Scenario 4: Nginx Configuration Update

```bash
# Edit nginx config
sudo nano /etc/nginx/sites-available/asp-afrique.com

# Test configuration
sudo nginx -t

# If test passes, reload nginx
sudo systemctl reload nginx

# Verify
curl -I https://asp-afrique.com
```

---

## 🔄 Rollback Procedure

If something goes wrong, rollback to previous version:

### Option 1: Git Rollback

```bash
cd /var/www/asp-afrique

# View recent commits
git log --oneline -10

# Rollback to previous commit
git reset --hard HEAD~1  # or specific commit hash

# Rebuild and restart
pnpm build
pm2 restart all
```

### Option 2: Restore from Backup

```bash
# Stop PM2 apps
pm2 stop all

# Restore from backup
rm -rf /var/www/asp-afrique
cp -r /var/www/asp-afrique.backup.DATE /var/www/asp-afrique

# Restart
cd /var/www/asp-afrique
pm2 restart all
```

### Option 3: Restore from Git Tag

```bash
cd /var/www/asp-afrique

# List tags
git tag

# Checkout backup tag
git checkout backup-YYYYMMDD-HHMMSS

# Rebuild and restart
pnpm build
pm2 restart all
```

---

## 📊 Monitoring After Update

### Check Application Status

```bash
# PM2 status
pm2 status

# PM2 logs
pm2 logs asp-afrique-web --lines 50
pm2 logs asp-afrique-api --lines 50

# Nginx logs
sudo tail -f /var/log/nginx/asp-afrique-access.log
sudo tail -f /var/log/nginx/asp-afrique-error.log
```

### Test Application Functionality

```bash
# Test HTTPS
curl -I https://asp-afrique.com

# Test API health
curl https://asp-afrique.com/api/v1/auth

# Test from browser
# Visit: https://asp-afrique.com
```

---

## ⚠️ Important Notes

### Before Updating

- [ ] Check what changed in the update (git log, changelog)
- [ ] Verify database migrations are safe (if any)
- [ ] Test in a development environment first (if possible)
- [ ] Create a backup or tag current version
- [ ] Notify users if there will be downtime

### During Update

- [ ] Monitor PM2 logs during restart
- [ ] Test critical functionality immediately after update
- [ ] Keep SSH session open until verified

### After Update

- [ ] Verify all services are running
- [ ] Test key functionality
- [ ] Monitor logs for errors
- [ ] Check error logs for 15-30 minutes

---

## 🐛 Troubleshooting Updates

### Build Fails

```bash
# Clean and rebuild
rm -rf node_modules
rm -rf apps/web/.next
rm -rf apps/api/dist
pnpm install
pnpm build
```

### Application Won't Start

```bash
# Check PM2 logs
pm2 logs --lines 100

# Check environment variables
pm2 env asp-afrique-web
pm2 env asp-afrique-api

# Restart with fresh environment
pm2 delete asp-afrique-web asp-afrique-api
cd /var/www/asp-afrique
pm2 start ecosystem.config.js
```

### Database Migration Errors

```bash
# Check migration status
cd /var/www/asp-afrique/packages/db
pnpm prisma migrate status

# Rollback migration (if needed)
# Check Prisma documentation for rollback procedures
```

### Nginx Errors

```bash
# Test nginx configuration
sudo nginx -t

# Check error logs
sudo tail -50 /var/log/nginx/error.log
sudo tail -50 /var/log/nginx/asp-afrique-error.log

# Reload nginx
sudo systemctl reload nginx
```

---

## 📅 Maintenance Schedule

### Regular Maintenance

**Weekly:**
- Check PM2 logs for errors
- Verify SSL certificate status
- Check disk space

**Monthly:**
- Review and update dependencies (if needed)
- Check for security updates
- Review error logs

**Quarterly:**
- Test backup/restore procedure
- Update Node.js/pnpm if needed
- Review and optimize performance

---

## 🔐 Security Updates

### Update Dependencies

```bash
cd /var/www/asp-afrique

# Check for outdated packages
pnpm outdated

# Update packages (be careful!)
pnpm update

# Review changes
git diff package.json

# Test thoroughly
pnpm build
pm2 restart all
```

### Update System Packages

```bash
# Update system packages
sudo apt update
sudo apt upgrade -y

# Restart services if needed
sudo systemctl restart nginx
pm2 restart all
```

---

## 📝 Update Checklist

Before updating, verify:

- [ ] Backup created or tag created
- [ ] Changes reviewed in git
- [ ] Dependencies checked
- [ ] Database migrations reviewed (if any)
- [ ] Environment variables checked (if changed)
- [ ] PM2 status checked (all apps online)
- [ ] Sufficient disk space available
- [ ] SSH session stable

After updating, verify:

- [ ] PM2 status: all apps online
- [ ] HTTPS accessible: `https://asp-afrique.com`
- [ ] HTTP redirects to HTTPS
- [ ] No errors in PM2 logs
- [ ] No errors in Nginx logs
- [ ] Key functionality works
- [ ] API endpoints respond correctly

---

## 🚨 Emergency Procedures

### Application Crashed

```bash
# Check PM2 status
pm2 status

# Restart all apps
pm2 restart all

# If still failing, check logs
pm2 logs --lines 100

# Rollback if necessary (see Rollback Procedure)
```

### Database Issues

```bash
# Check database connection
cd /var/www/asp-afrique/packages/db
pnpm prisma db pull

# Check PostgreSQL status
sudo systemctl status postgresql

# Restart PostgreSQL if needed
sudo systemctl restart postgresql
```

### SSL Certificate Expiring

```bash
# Check certificate expiration
sudo certbot certificates | grep asp-afrique

# Renew certificate
sudo certbot renew --dry-run

# If dry run succeeds, renew
sudo certbot renew

# Reload nginx
sudo systemctl reload nginx
```

---

## 📞 Quick Reference Commands

```bash
# Update application
cd /var/www/asp-afrique && git pull && pnpm install && pnpm build && pm2 restart all

# Check status
pm2 status && curl -I https://asp-afrique.com

# View logs
pm2 logs --lines 50

# Restart services
pm2 restart all && sudo systemctl reload nginx

# Check SSL certificate
sudo certbot certificates | grep asp-afrique
```

---

**Last Updated:** January 2025  
**Version:** 1.0.0  
**Domain:** asp-afrique.com  
**VPS:** 147.93.44.169







