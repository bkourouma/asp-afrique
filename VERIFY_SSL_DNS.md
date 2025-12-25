# 🔍 Verify SSL Certificate and DNS Status

## Current Status

HTTP requests are redirecting to HTTPS (301), which means:
- Either Certbot already ran and configured SSL
- Or there's a default redirect

Let's check what's actually configured.

---

## Step 1: Check if SSL Certificate Exists

```bash
# Check if SSL certificate exists
sudo certbot certificates

# If certificate exists, you'll see:
# Certificate Name: asp-afrique.com
# Domains: asp-afrique.com www.asp-afrique.com
# Expiry Date: ...
```

---

## Step 2: Check DNS Configuration

```bash
# Check if DNS is configured
nslookup asp-afrique.com

# Should return: 147.93.44.169
# If it doesn't return the correct IP, DNS is not configured yet
```

---

## Step 3: Test HTTPS Access

```bash
# Test HTTPS access (if DNS is configured)
curl -I https://asp-afrique.com

# If DNS is not configured yet, you can test locally:
curl -I https://localhost -H "Host: asp-afrique.com" -k
# (The -k flag ignores SSL certificate errors for testing)
```

---

## Step 4: Check Nginx Config for HTTPS Block

```bash
# Check if HTTPS block exists in nginx config
sudo grep -A 5 "listen 443" /etc/nginx/sites-available/asp-afrique.com

# If output shows HTTPS server block, SSL is configured
# If no output, HTTPS block doesn't exist yet
```

---

## Next Steps Based on Results

### If SSL Certificate Exists:
- ✅ SSL is already installed
- Test HTTPS access
- If DNS is configured, visit `https://asp-afrique.com` in browser

### If SSL Certificate Doesn't Exist:
- Need to install SSL certificate
- But first, DNS must be configured
- DNS must point `asp-afrique.com` to `147.93.44.169`

### If DNS is Not Configured:
1. Configure DNS on Hostinger first
2. Wait for DNS propagation (10-30 minutes)
3. Then install SSL certificate

---

## Quick Command Sequence

```bash
# 1. Check SSL certificates
sudo certbot certificates

# 2. Check DNS
nslookup asp-afrique.com

# 3. Check nginx config
sudo cat /etc/nginx/sites-available/asp-afrique.com | grep -A 10 "listen 443"

# 4. Test HTTPS (if DNS is ready)
curl -I https://asp-afrique.com
```

---

Run these commands and share the results so we can determine the next steps!







