# 🚀 Deployment Steps for asp-afrique.com

## ✅ Step 1: COMPLETE - Apps Running Locally

- ✅ Web app: `http://localhost:3000` - Running
- ✅ API: `http://localhost:3004` - Running
- ✅ PM2: Both apps online

---

## 📋 Step 2: Configure DNS on Hostinger

### 2.1 Log into Hostinger

1. Go to https://www.hostinger.com
2. Log into your account
3. Navigate to your domain: `asp-afrique.com`
4. Go to **DNS Zone Editor** or **DNS Management**

### 2.2 Add A Records

**For Root Domain:**
- **Type:** `A`
- **Name:** `@` (or leave blank)
- **Points to:** `147.93.44.169`
- **TTL:** `3600` (default)

**For www Subdomain:**
- **Type:** `A`
- **Name:** `www`
- **Points to:** `147.93.44.169`
- **TTL:** `3600`

### 2.3 Save and Wait

1. Click **Save** or **Update**
2. Wait **10-30 minutes** for DNS propagation
3. Check propagation: https://www.whatsmydns.net/#A/asp-afrique.com

### 2.4 Verify DNS (from VPS)

```bash
# Test DNS resolution
nslookup asp-afrique.com

# Should return: 147.93.44.169
```

---

## 🔧 Step 3: Configure Nginx

### 3.1 Check Existing Configurations

```bash
# List existing sites (DO NOT MODIFY)
ls -la /etc/nginx/sites-available/
ls -la /etc/nginx/sites-enabled/

# Your nginx config is already ready at:
# /var/www/asp-afrique/nginx/asp-afrique.com.conf
```

### 3.2 Copy Nginx Configuration

```bash
# Copy the config file
sudo cp /var/www/asp-afrique/nginx/asp-afrique.com.conf /etc/nginx/sites-available/asp-afrique.com

# Verify the file was copied
ls -la /etc/nginx/sites-available/asp-afrique.com
```

### 3.3 Enable the Site

```bash
# Create symbolic link to enable the site
sudo ln -s /etc/nginx/sites-available/asp-afrique.com /etc/nginx/sites-enabled/

# Verify the link
ls -la /etc/nginx/sites-enabled/asp-afrique.com
```

### 3.4 Test Nginx Configuration

```bash
# Test configuration for syntax errors
sudo nginx -t

# Expected output:
# nginx: configuration file /etc/nginx/nginx.conf test is successful
```

### 3.5 Reload Nginx

```bash
# If test is successful, reload Nginx
sudo systemctl reload nginx

# Check Nginx status
sudo systemctl status nginx
```

---

## 🔒 Step 4: Install SSL Certificate

### 4.1 Install Certbot (if not already installed)

```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx -y
```

### 4.2 Obtain SSL Certificate

```bash
# Get SSL certificate for asp-afrique.com
sudo certbot --nginx -d asp-afrique.com -d www.asp-afrique.com

# Follow the prompts:
# 1. Enter your email address
# 2. Agree to Terms of Service (Y)
# 3. Choose redirect option: 2 (Redirect HTTP to HTTPS)
```

**Wait 2-3 minutes** for certificate installation.

### 4.3 Verify SSL Installation

```bash
# Check certificate status
sudo certbot certificates

# Should show asp-afrique.com with valid certificate

# Test certificate renewal
sudo certbot renew --dry-run
```

---

## ✅ Step 5: Final Verification

### 5.1 Test HTTP (should redirect to HTTPS)

```bash
# From VPS
curl -I http://asp-afrique.com

# Should redirect to HTTPS (301 redirect)
```

### 5.2 Test HTTPS

```bash
# From VPS
curl -I https://asp-afrique.com

# Should return: HTTP/1.1 200 OK
```

### 5.3 Test from Browser

Visit these URLs in your browser:

- ✅ `https://asp-afrique.com/` - Should load your app
- ✅ `https://asp-afrique.com/api/health` - Should show API health
- ✅ `https://www.asp-afrique.com/` - Should also work

### 5.4 Verify PM2 Status

```bash
pm2 status

# Both apps should show "online" (green):
# - asp-afrique-web
# - asp-afrique-api
```

### 5.5 Check Logs

```bash
# PM2 logs
pm2 logs asp-afrique-web --lines 20
pm2 logs asp-afrique-api --lines 20

# Nginx logs
sudo tail -f /var/log/nginx/asp-afrique-access.log
sudo tail -f /var/log/nginx/asp-afrique-error.log
```

### 5.6 Verify Other Sites Still Work

Make sure existing sites are not affected:

- ✅ `https://engage-360.net`
- ✅ `https://agents.engage-360.net`
- ✅ `https://chat.engage-360.net`
- ✅ `https://bmi.engage-360.net`

---

## 🎉 Success Checklist

After deployment, verify:

- [ ] DNS resolves to `147.93.44.169`
- [ ] HTTP redirects to HTTPS
- [ ] SSL certificate installed and valid
- [ ] `https://asp-afrique.com` loads with padlock 🔒
- [ ] `https://www.asp-afrique.com` works
- [ ] API endpoints respond correctly
- [ ] All pages work correctly
- [ ] PM2 apps show "online" status
- [ ] No errors in logs
- [ ] Other VPS sites still work

---

## 📝 Quick Reference Commands

### View Logs
```bash
pm2 logs asp-afrique-web --lines 50
pm2 logs asp-afrique-api --lines 50
sudo tail -f /var/log/nginx/asp-afrique-access.log
sudo tail -f /var/log/nginx/asp-afrique-error.log
```

### Restart Services
```bash
pm2 restart all
sudo systemctl reload nginx
```

### Check Status
```bash
pm2 status
sudo systemctl status nginx
sudo netstat -tulpn | grep -E '3000|3004'
```

---

## 🆘 Troubleshooting

### DNS Not Resolving

```bash
# Check DNS
nslookup asp-afrique.com

# Wait longer for propagation (up to 48 hours in some cases)
# Check: https://www.whatsmydns.net/#A/asp-afrique.com
```

### Nginx Errors

```bash
# Test configuration
sudo nginx -t

# Check error logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/asp-afrique-error.log
```

### SSL Certificate Issues

```bash
# Check certificate
sudo certbot certificates

# Renew certificate manually
sudo certbot --nginx -d asp-afrique.com --force-renewal
```

### Application Not Loading

```bash
# Check PM2 status
pm2 status

# Check PM2 logs
pm2 logs --lines 50

# Check if ports are listening
sudo netstat -tulpn | grep -E '3000|3004'
```

---

**Domain**: `asp-afrique.com`  
**VPS IP**: `147.93.44.169`  
**Web Port**: `3000`  
**API Port**: `3004`  
**Status**: Step 1 Complete ✅







