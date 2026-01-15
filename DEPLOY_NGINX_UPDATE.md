# 🚀 Deploy Nginx Configuration Update

## Summary

The nginx configuration has been updated locally and committed to git. Now we need to deploy it to the server.

## Steps to Deploy

### Step 1: Copy Files to Server

From your local machine:

```bash
cd D:\APP\VERSIONS_ANGE\asp-afrique

# Copy nginx config
scp nginx/asp-afrique.com.conf deployer@147.93.44.169:/tmp/asp-afrique.com.conf

# Copy deployment script
scp deploy-nginx-config.sh deployer@147.93.44.169:~/
```

### Step 2: SSH into Server and Deploy

```bash
# SSH into server
ssh deployer@147.93.44.169

# Make script executable
chmod +x ~/deploy-nginx-config.sh

# Run deployment script
~/deploy-nginx-config.sh
```

The script will:
- ✅ Backup current nginx config
- ✅ Copy new configuration
- ✅ Test nginx configuration
- ✅ Reload nginx
- ✅ Check SSL certificate status

### Step 3: Update SSL Certificate (if needed)

If the SSL certificate doesn't include `aspsecurityconsulting.com`, run:

```bash
sudo certbot --nginx -d asp-afrique.com -d www.asp-afrique.com -d aspsecurityconsulting.com -d www.aspsecurityconsulting.com --expand
```

Follow the prompts:
- Enter email: `info@asp-afrique.com`
- Agree to terms: `Y`
- Choose redirect: `2` (Redirect HTTP to HTTPS)

### Step 4: Verify

Test both domains:

```bash
# Test from server
curl -I https://asp-afrique.com
curl -I https://aspsecurityconsulting.com

# Or test in browser
# https://asp-afrique.com ✅
# https://aspsecurityconsulting.com ✅
```

## Quick One-Liner (Alternative)

If you prefer to do it manually:

```bash
# SSH and run commands
ssh deployer@147.93.44.169

# Backup
sudo cp /etc/nginx/sites-available/asp-afrique.com /etc/nginx/sites-available/asp-afrique.com.backup

# Copy new config
sudo cp /tmp/asp-afrique.com.conf /etc/nginx/sites-available/asp-afrique.com

# Test and reload
sudo nginx -t && sudo systemctl reload nginx

# Update SSL (if needed)
sudo certbot --nginx -d asp-afrique.com -d www.asp-afrique.com -d aspsecurityconsulting.com -d www.aspsecurityconsulting.com --expand
```

## What Changed

The nginx configuration now includes:
- `asp-afrique.com`
- `www.asp-afrique.com`
- `aspsecurityconsulting.com` ✨ (NEW)
- `www.aspsecurityconsulting.com` ✨ (NEW)

All four domains will serve the same Next.js application.

## Troubleshooting

### If nginx test fails:
```bash
sudo nginx -t
# Check error message and fix issues
```

### If SSL update fails:
- Ensure DNS is pointing `aspsecurityconsulting.com` to `147.93.44.169`
- Wait for DNS propagation (10-30 minutes)
- Try again

### If domain still doesn't work:
```bash
# Check nginx logs
sudo tail -f /var/log/nginx/asp-afrique-error.log

# Check if nginx is running
sudo systemctl status nginx
```


