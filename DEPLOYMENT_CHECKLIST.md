# 📋 AspCIWeb - Deployment Checklist

Use this checklist to track your deployment progress.

## 🔄 Pre-Deployment (Local)

- [ ] Code is committed and pushed to Git
- [ ] Application works locally
- [ ] Database migrations are ready
- [ ] Environment variables documented
- [ ] Build process tested locally

## 🖥️ Step 1: VPS Setup & Local Testing

### Connect to VPS
- [ ] SSH connection successful: `ssh root@147.93.44.169`
- [ ] Can access VPS terminal

### Prerequisites Check
- [ ] Node.js 18+ installed: `node --version`
- [ ] pnpm installed: `pnpm --version`
- [ ] PM2 installed: `pm2 --version`
- [ ] PostgreSQL installed: `psql --version`
- [ ] Nginx installed: `nginx -v`
- [ ] Git installed: `git --version`

### Application Setup
- [ ] Application directory created/cloned: `/var/www/asp-afrique`
- [ ] Dependencies installed: `pnpm install`
- [ ] Prisma client generated: `cd packages/db && pnpm prisma generate`
- [ ] Database created and configured
- [ ] Database migrations run: `pnpm prisma migrate deploy`
- [ ] Application built: `pnpm build`
- [ ] Build successful (checked `.next` and `dist` folders)

### Environment Variables
- [ ] `apps/api/.env` created and configured
- [ ] `apps/web/.env.local` created and configured
- [ ] `packages/db/.env` created and configured
- [ ] All secrets and passwords updated (not defaults)

### PM2 Testing
- [ ] Logs directory created: `mkdir -p logs`
- [ ] PM2 started: `pm2 start ecosystem.config.js`
- [ ] Both apps show "online" status: `pm2 status`
- [ ] Web app accessible: `curl http://localhost:3000`
- [ ] API accessible: `curl http://localhost:3003`
- [ ] PM2 configuration saved: `pm2 save`

**✅ If all checked, proceed to Step 2!**

---

## 🌐 Step 2: DNS Configuration

### Hostinger DNS Setup
- [ ] Logged into Hostinger control panel
- [ ] Navigated to DNS Zone Editor
- [ ] A Record added for root domain (`@` → `147.93.44.169`)
- [ ] A Record added for www subdomain (`www` → `147.93.44.169`)
- [ ] DNS changes saved
- [ ] Waited 10-30 minutes for propagation

### DNS Verification
- [ ] DNS resolution tested: `nslookup your-domain.com`
- [ ] Returns correct IP: `147.93.44.169`
- [ ] www subdomain resolves correctly

**✅ If all checked, proceed to Step 3!**

---

## 🔧 Step 3: Nginx Configuration

### Nginx Setup
- [ ] Existing sites checked: `ls /etc/nginx/sites-available/`
- [ ] No existing configs modified
- [ ] New config file created: `/etc/nginx/sites-available/your-domain.com`
- [ ] Configuration pasted (domain name replaced)
- [ ] Config file saved

### Nginx Activation
- [ ] Symbolic link created: `sudo ln -s /etc/nginx/sites-available/your-domain.com /etc/nginx/sites-enabled/`
- [ ] Configuration tested: `sudo nginx -t`
- [ ] Test successful (no errors)
- [ ] Nginx reloaded: `sudo systemctl reload nginx`
- [ ] Nginx status checked: `sudo systemctl status nginx`

### Environment Variables Updated
- [ ] `apps/api/.env` updated with production domain
- [ ] `apps/web/.env.local` updated with production domain
- [ ] PM2 restarted: `pm2 restart all`
- [ ] PM2 status verified: `pm2 status`

**✅ If all checked, proceed to Step 4!**

---

## 🔒 Step 4: SSL Certificate

### Certbot Installation
- [ ] Certbot installed: `sudo apt install certbot python3-certbot-nginx`
- [ ] Certbot version verified: `certbot --version`

### SSL Certificate
- [ ] Certificate obtained: `sudo certbot --nginx -d your-domain.com -d www.your-domain.com`
- [ ] Email address provided
- [ ] Terms agreed
- [ ] Redirect option selected (option 2)
- [ ] Certificate installation successful
- [ ] Certificate verified: `sudo certbot certificates`

### SSL Testing
- [ ] Renewal tested: `sudo certbot renew --dry-run`
- [ ] HTTPS accessible: `curl https://your-domain.com`
- [ ] SSL valid (padlock icon in browser)

**✅ If all checked, proceed to Step 5!**

---

## ✅ Step 5: Final Verification

### Application Access
- [ ] HTTP redirects to HTTPS: `curl -I http://your-domain.com`
- [ ] HTTPS loads: `curl -I https://your-domain.com`
- [ ] Web app loads in browser: `https://your-domain.com`
- [ ] API responds: `https://your-domain.com/api`
- [ ] www subdomain works: `https://www.your-domain.com`

### Service Status
- [ ] PM2 apps online: `pm2 status`
- [ ] Nginx running: `sudo systemctl status nginx`
- [ ] PostgreSQL running: `sudo systemctl status postgresql`
- [ ] Ports listening: `netstat -tulpn | grep -E '3000|3003'`

### Functionality Tests
- [ ] Home page loads
- [ ] Navigation works
- [ ] Forms submit correctly
- [ ] API endpoints respond
- [ ] Authentication works
- [ ] Images display correctly
- [ ] Database connections working

### Other Sites Verification
- [ ] `https://engage-360.net` still works
- [ ] `https://agents.engage-360.net` still works
- [ ] `https://chat.engage-360.net` still works
- [ ] `https://bmi.engage-360.net` still works
- [ ] No errors in other site logs

### Logs Check
- [ ] PM2 logs checked: `pm2 logs --lines 50`
- [ ] No critical errors in PM2 logs
- [ ] Nginx access log checked: `sudo tail /var/log/nginx/your-domain-access.log`
- [ ] Nginx error log checked: `sudo tail /var/log/nginx/your-domain-error.log`
- [ ] No critical errors in Nginx logs

---

## 🎉 Deployment Complete!

If all items are checked:

- ✅ Application is live at `https://your-domain.com`
- ✅ SSL certificate installed and valid
- ✅ All services running correctly
- ✅ Other sites unaffected
- ✅ Production ready

---

## 📝 Post-Deployment Notes

**Important Information to Document:**

- [ ] Domain name: `_________________`
- [ ] Database name: `_________________`
- [ ] Database user: `_________________`
- [ ] API port: `3003`
- [ ] Web port: `3000`
- [ ] PM2 app names: `asp-afrique-api`, `asp-afrique-web`
- [ ] Nginx config: `/etc/nginx/sites-available/your-domain.com`
- [ ] Application directory: `/var/www/asp-afrique`
- [ ] SSL certificate path: `/etc/letsencrypt/live/your-domain.com/`

---

## 🔄 Maintenance Commands Reference

### View Logs
```bash
pm2 logs asp-afrique-web --lines 50
pm2 logs asp-afrique-api --lines 50
sudo tail -f /var/log/nginx/your-domain-access.log
sudo tail -f /var/log/nginx/your-domain-error.log
```

### Restart Services
```bash
pm2 restart all
sudo systemctl reload nginx
```

### Update Application
```bash
cd /var/www/asp-afrique
git pull
pnpm install
cd packages/db && pnpm prisma generate && cd ../..
pnpm build
pm2 restart all
```

### Check Status
```bash
pm2 status
sudo systemctl status nginx
sudo systemctl status postgresql
```

---

**Last Updated**: January 2025  
**Guide Version**: 1.0.0







