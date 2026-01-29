# 🔧 Fix aspsecurityconsulting.com Domain

## Problem

- ✅ `https://asp-afrique.com/` works
- ❌ `https://aspsecurityconsulting.com/` doesn't work (points to same website but not configured)

## Root Cause

The nginx configuration only includes `asp-afrique.com` in the `server_name` directive. When a request comes for `aspsecurityconsulting.com`, nginx doesn't recognize it and doesn't route it to the application.

## Solution

We need to:
1. Add `aspsecurityconsulting.com` to the nginx `server_name` directive
2. Update the SSL certificate to include `aspsecurityconsulting.com`

---

## Quick Fix (Automated Script)

### Option 1: Run the automated script

```bash
# Copy script to server
scp -i ~/.ssh/id_ed25519 fix-aspsecurityconsulting-domain.sh deployer@147.93.44.169:~/

# SSH into server
ssh -i ~/.ssh/id_ed25519 deployer@147.93.44.169

# Make script executable and run
chmod +x ~/fix-aspsecurityconsulting-domain.sh
~/fix-aspsecurityconsulting-domain.sh
```

---

## Manual Fix Steps

### Step 1: SSH into Server

```bash
ssh -i ~/.ssh/id_ed25519 deployer@147.93.44.169
```

### Step 2: Backup Current Configuration

```bash
sudo cp /etc/nginx/sites-available/asp-afrique.com /etc/nginx/sites-available/asp-afrique.com.backup
```

### Step 3: Update Nginx Configuration

Edit the nginx config file:

```bash
sudo nano /etc/nginx/sites-available/asp-afrique.com
```

Find these two lines (they appear twice - once for HTTP, once for HTTPS):
```nginx
server_name asp-afrique.com www.asp-afrique.com;
```

Change them to:
```nginx
server_name asp-afrique.com www.asp-afrique.com aspsecurityconsulting.com www.aspsecurityconsulting.com;
```

**Important:** Update BOTH occurrences:
- Line ~8 (HTTP server block)
- Line ~25 (HTTPS server block)

Save and exit (Ctrl+X, then Y, then Enter).

### Step 4: Test and Reload Nginx

```bash
# Test configuration
sudo nginx -t

# If test passes, reload nginx
sudo systemctl reload nginx
```

### Step 5: Update SSL Certificate

Update the Let's Encrypt certificate to include the new domain:

```bash
sudo certbot --nginx -d asp-afrique.com -d www.asp-afrique.com -d aspsecurityconsulting.com -d www.aspsecurityconsulting.com --expand
```

**Note:** The `--expand` flag adds the new domains to the existing certificate.

Follow the prompts:
- Enter email if asked: `info@asp-afrique.com`
- Agree to terms: `Y`
- Choose redirect option: `2` (Redirect HTTP to HTTPS)

### Step 6: Verify

```bash
# Check nginx config
sudo nginx -T | grep -A 2 "server_name.*asp"

# Check SSL certificate
sudo certbot certificates

# Test domains (from server)
curl -I https://asp-afrique.com
curl -I https://aspsecurityconsulting.com
```

---

## Verification Checklist

After applying the fix, verify:

- [ ] Nginx configuration test passes (`sudo nginx -t`)
- [ ] Nginx reloaded successfully (`sudo systemctl status nginx`)
- [ ] SSL certificate includes both domains (`sudo certbot certificates`)
- [ ] `https://asp-afrique.com` still works
- [ ] `https://aspsecurityconsulting.com` now works
- [ ] `https://www.aspsecurityconsulting.com` works

---

## Troubleshooting

### If nginx test fails:

```bash
# Check for syntax errors
sudo nginx -t

# View error details
sudo tail -20 /var/log/nginx/error.log
```

### If SSL certificate update fails:

```bash
# Check DNS resolution
nslookup aspsecurityconsulting.com

# Should return: 147.93.44.169

# If DNS is not configured, configure it first in your domain registrar
```

### If domain still doesn't work:

1. **Check DNS:** Ensure `aspsecurityconsulting.com` points to `147.93.44.169`
2. **Check nginx logs:**
   ```bash
   sudo tail -f /var/log/nginx/asp-afrique-error.log
   ```
3. **Test from server:**
   ```bash
   curl -I https://aspsecurityconsulting.com -H "Host: aspsecurityconsulting.com"
   ```

---

## Expected Result

After the fix:
- ✅ `https://asp-afrique.com` → Works (already working)
- ✅ `https://www.asp-afrique.com` → Works (already working)
- ✅ `https://aspsecurityconsulting.com` → Works (newly fixed)
- ✅ `https://www.aspsecurityconsulting.com` → Works (newly fixed)

All four domains will serve the same Next.js application on port 3000.

---

## Files Modified

- `/etc/nginx/sites-available/asp-afrique.com` - Updated `server_name` directives
- SSL certificate - Expanded to include `aspsecurityconsulting.com`

---

## Notes

- Both domains point to the same application (port 3000)
- Both domains share the same SSL certificate
- The fix is non-destructive - `asp-afrique.com` continues to work
- No application restart needed - only nginx reload required

