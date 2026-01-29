# 🔍 Check Nginx Configuration

## Current Status
- ✅ DNS is configured: `asp-afrique.com` → `147.93.44.169`
- ❓ No HTTPS block found
- ❓ But HTTP is redirecting to HTTPS

Let's check what's in the nginx config:

---

## Commands to Run

```bash
# 1. Check the full nginx config
sudo cat /etc/nginx/sites-available/asp-afrique.com

# 2. Check if there's a redirect in the HTTP block
sudo grep -A 5 "location /" /etc/nginx/sites-available/asp-afrique.com

# 3. Check if there's a default redirect somewhere
sudo grep -r "return 301" /etc/nginx/sites-available/asp-afrique.com

# 4. Check what Certbot certificates exist
sudo certbot certificates
```

---

## Expected Results

If the config is correct, you should see:
- HTTP server block with `proxy_pass http://127.0.0.1:3000` (not redirect)
- No HTTPS server block

If you see a redirect, we need to remove it and set up the site to serve HTTP first, then install SSL.







