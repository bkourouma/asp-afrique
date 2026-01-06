# Server Applications Documentation

**Server:** srv917891 (147.93.44.169)  
**OS:** Ubuntu 22.04 LTS  
**Last Updated:** January 5, 2026  
**Verification Script:** `verify_after_update.sh`

---

## 📊 Summary

| Status | Count | Applications |
|--------|-------|--------------|
| ✅ Active | 5 | GAMR Site, ASP Afrique Web, ASP Afrique API, ImhotepFormation, GAMR Platform |
| ⏸️ Inactive | 3 | GAMR Digitale Backend, AI Agent Platform, Engage-360 Website |

---

## ✅ Active Applications

### 1. GAMR Site

**Application ID:** `gamr-site`  
**Display Name:** GAMR Site  
**Status:** ✅ Active  
**Type:** PM2 Process  
**Website:** [https://www.gestionrisques.com/](https://www.gestionrisques.com/)

#### Technical Details

- **Port:** 3022
- **PM2 Process Name:** `gestionrisques`
- **Application Directory:** `/opt/gamr`
- **Process Manager:** PM2 (fork mode)
- **Framework:** Next.js (based on process name "next-server")

#### Domains

- `gestionrisques.com` (primary)
- `gamr.engage-360.net` (subdomain)

#### Nginx Configuration

- **Config File:** `/etc/nginx/sites-available/gestionrisques.com`
- **Enabled:** Yes (symlinked in `/etc/nginx/sites-enabled/`)
- **SSL Certificate:** Present (Let's Encrypt)

#### Verification Status

- ✅ Port 3022 listening
- ✅ PM2 process online
- ✅ HTTP localhost:3022 responding
- ✅ HTTPS gestionrisques.com working
- ✅ HTTPS gamr.engage-360.net working

#### Health Check

```bash
# Check PM2 status
pm2 list | grep gestionrisques

# Check port
ss -lntp | grep :3022

# Test HTTP
curl http://localhost:3022

# Test HTTPS
curl https://gestionrisques.com
```

---

### 2. ASP Afrique Web

**Application ID:** `asp-afrique-web`  
**Display Name:** ASP Afrique Web  
**Status:** ✅ Active  
**Type:** Next.js Application (PM2)  
**Website:** [https://asp-afrique.com](https://asp-afrique.com)

#### Technical Details

- **Port:** 3000
- **PM2 Process Name:** `asp-afrique-web`
- **Application Directory:** `/var/www/asp-afrique/apps/web` (or `/opt/aspweb/apps/web`)
- **Process Manager:** PM2 (fork mode)
- **Framework:** Next.js
- **Node Version:** 20.19.6

#### Domains

- `asp-afrique.com` (primary)
- `www.asp-afrique.com` (www subdomain)

#### Nginx Configuration

- **Config File:** `/etc/nginx/sites-available/asp-afrique.com`
- **Enabled:** Yes (symlinked in `/etc/nginx/sites-enabled/`)
- **SSL Certificate:** Present (Let's Encrypt)
  - **Certificate Path:** `/etc/letsencrypt/live/asp-afrique.com/fullchain.pem`
  - **Private Key:** `/etc/letsencrypt/live/asp-afrique.com/privkey.pem`
  - **Expiry:** March 14, 2026 (67 days valid)
  - **Domains Covered:** asp-afrique.com, www.asp-afrique.com

#### Verification Status

- ✅ Port 3000 listening
- ✅ PM2 process online
- ✅ HTTP localhost:3000 responding
- ✅ HTTPS asp-afrique.com working
- ✅ HTTPS www.asp-afrique.com working

#### Health Check

```bash
# Check PM2 status
pm2 list | grep asp-afrique-web

# Check port
ss -lntp | grep :3000

# Test HTTP
curl http://localhost:3000

# Test HTTPS
curl https://asp-afrique.com
```

---

### 3. ASP Afrique API

**Application ID:** `asp-afrique-api`  
**Display Name:** ASP Afrique API  
**Status:** ✅ Active  
**Type:** Fastify/Node.js API (PM2)  
**Website:** [https://asp-afrique.com/api](https://asp-afrique.com/api)

#### Technical Details

- **Port:** 3004
- **PM2 Process Name:** `asp-afrique-api`
- **Application Directory:** `/opt/aspweb/apps/api`
- **Process Manager:** PM2 (fork mode)
- **Framework:** Fastify (TypeScript with tsx)
- **Node Version:** 20.19.6
- **Script:** `node_modules/.bin/tsx src/index.ts`
- **Logs:**
  - **Error Log:** `/opt/aspweb/logs/api-error.log`
  - **Output Log:** `/opt/aspweb/logs/api-out.log`

#### Domains

- `asp-afrique.com` (shared with web app)
- `www.asp-afrique.com` (shared with web app)

#### API Endpoints

- **Health Check:** `GET /health` (returns 200)
- **Root:** `GET /` (returns 404 - expected for API)
- **Swagger:** `GET /api/swagger.json` (returns 404)

#### Database

- **Status:** ⚠️ Database connection issues
- **Error:** Authentication failed for user `aspci_user` at `localhost`
- **Impact:** Server starts without database (degraded mode)

#### Nginx Configuration

- **Config File:** `/etc/nginx/sites-available/asp-afrique.com`
- **Proxy:** API requests proxied through Nginx to port 3004
- **SSL Certificate:** Same as web app (asp-afrique.com certificate)

#### Verification Status

- ✅ Port 3004 listening
- ✅ PM2 process online
- ✅ HTTP localhost:3004/health responding (200)
- ✅ HTTP localhost:3004 responding (404 acceptable)
- ✅ HTTPS asp-afrique.com working
- ✅ HTTPS www.asp-afrique.com working

#### Health Check

```bash
# Check PM2 status
pm2 describe asp-afrique-api

# Check port
ss -lntp | grep :3004

# Test health endpoint
curl http://localhost:3004/health

# View logs
pm2 logs asp-afrique-api --lines 50
```

#### Known Issues

- ⚠️ Database authentication failing (check DATABASE_URL in .env)
- ⚠️ Some API routes return 404 (may be expected based on route configuration)

---

### 4. ImhotepFormation

**Application ID:** `imhotepformation`  
**Display Name:** ImhotepFormation  
**Status:** ✅ Active  
**Type:** Node.js Application (PM2)  
**Website:** [https://imhotepformation.engage-360.net](https://imhotepformation.engage-360.net)

#### Technical Details

- **Port:** 3001
- **PM2 Process Name:** `imhotepformation-app`
- **Application Directory:** `/opt/imhotepformation`
- **Entry Point:** `/opt/imhotepformation/server/server.js`
- **Process Manager:** PM2 (fork mode)
- **Framework:** Node.js/Express (likely)

#### Domains

- `imhotepformation.engage-360.net` (primary)

#### Nginx Configuration

- **Config File:** `/etc/nginx/sites-available/imhotepformation.engage-360.net`
- **Enabled:** Yes (symlinked in `/etc/nginx/sites-enabled/`)
- **SSL Certificate:** Present (Let's Encrypt)

#### Verification Status

- ✅ Port 3001 listening
- ✅ PM2 process online
- ✅ HTTP localhost:3001 responding
- ✅ HTTPS imhotepformation.engage-360.net working

#### Health Check

```bash
# Check PM2 status
pm2 list | grep imhotepformation

# Check port
ss -lntp | grep :3001

# Test HTTP
curl http://localhost:3001

# Test HTTPS
curl https://imhotepformation.engage-360.net
```

---

### 5. GAMR Platform

**Application ID:** `gamr-platform`  
**Display Name:** GAMR Platform  
**Status:** ✅ Active  
**Type:** Node.js Application  
**Note:** Not managed by PM2 (runs as standalone process)

#### Technical Details

- **Port:** 3002
- **PM2 Process Name:** None (not in PM2)
- **Application Directory:** `/var/www/i` (inferred from process path)
- **Process:** `node /var/www/i` (PID varies)
- **Framework:** Node.js/Express or Fastify (API-like, returns JSON)

#### Domains

- **None configured** (no public domain)
- **Note:** `platform.gamr.engage-360.net` does not exist (DNS not configured)

#### API Endpoints

- **Health Check:** `GET /health` (returns 200)
- **Root:** `GET /` (returns 404 with JSON error message)

#### Verification Status

- ✅ Port 3002 listening
- ✅ HTTP localhost:3002/health responding (200)
- ✅ HTTP localhost:3002 responding (404 acceptable for API)
- ⚠️ No domain configured (internal service only)

#### Health Check

```bash
# Check port
ss -lntp | grep :3002

# Check process
ps aux | grep "node /var/www/i"

# Test health endpoint
curl http://localhost:3002/health

# Test root
curl http://localhost:3002
```

#### Notes

- Service is running but not managed by PM2
- No public domain configured
- Appears to be an internal API service
- May need to be added to PM2 for better process management

---

## ⏸️ Inactive Applications

### 6. GAMR Digitale Backend

**Application ID:** `gamrdigital`  
**Display Name:** GAMR Digitale Backend  
**Status:** ⏸️ Inactive (Service Down)  
**Type:** PM2 Process (Expected)

#### Technical Details

- **Port:** 3005 (not listening)
- **PM2 Process Name:** `gamrdigital` (not running)
- **Application Directory:** `/var/www/gamrdigital`
- **Expected Status:** Inactive

#### Domains

- `gamrdigitale.engage-360.net` (domain exists, but service is down)

#### Nginx Configuration

- **Config File:** `/etc/nginx/sites-available/gamrdigitale.engage-360.net`
- **Enabled:** Yes (symlinked in `/etc/nginx/sites-enabled/`)
- **SSL Certificate:** Present (Let's Encrypt)
  - **Expiry:** March 8, 2026 (62 days valid)

#### Current Status

- ❌ Port 3005 not listening
- ❌ PM2 process not running
- ❌ Service appears to be down
- ✅ Nginx config exists
- ✅ SSL certificate valid

#### Troubleshooting

```bash
# Check if process should be running
pm2 list | grep gamrdigital

# Check if port is in use
ss -lntp | grep :3005

# Check application directory
ls -la /var/www/gamrdigital

# Check for PM2 ecosystem file
find /var/www/gamrdigital -name "ecosystem.config.js" -o -name "pm2.config.js"
```

#### Notes

- Service is marked as inactive in verification script
- Nginx configuration exists but service is not running
- May need to be restarted or investigated

---

### 7. AI Agent Platform

**Application ID:** `ai-agent-platform`  
**Display Name:** AI Agent Platform  
**Status:** ⏸️ Inactive (Not Implemented)  
**Type:** PM2 Process (Expected)

#### Technical Details

- **Port:** 8092 (not listening)
- **PM2 Process Name:** Not configured (TODO)
- **Application Directory:** `/opt/ai-agent-platform`
- **Expected Status:** Inactive

#### Domains

- `ai.engage-360.net` (expected, but not configured)

#### Current Status

- ❌ Port 8092 not listening
- ❌ PM2 process not configured
- ❌ Service not implemented
- ⚠️ Marked as TODO in documentation

#### Notes

- Service is planned but not yet implemented
- Directory may or may not exist
- No Nginx configuration found

---

### 8. Engage-360 Website

**Application ID:** `engage-360-website`  
**Display Name:** Engage-360 Website  
**Status:** ⏸️ Inactive (Not Implemented)  
**Type:** PM2 Process (Expected)

#### Technical Details

- **Port:** 8000 (not listening)
- **PM2 Process Name:** Not configured (TODO)
- **Application Directory:** Not specified
- **Expected Status:** Inactive

#### Domains

- `engage-360.net` (expected, but service not running)

#### Current Status

- ❌ Port 8000 not listening
- ❌ PM2 process not configured
- ❌ Service not implemented
- ⚠️ Marked as TODO in documentation

#### Notes

- Service is planned but not yet implemented
- No application directory specified
- No Nginx configuration found

---

## 🔧 System Information

### Process Management

**PM2 Processes (Active):**
```
┌────┬────────────────────┬──────────┬──────┬───────────┬──────────┬──────────┐
│ id │ name               │ mode     │ ↺    │ status    │ cpu      │ memory   │
├────┼────────────────────┼──────────┼──────┼───────────┼──────────┼──────────┤
│ 1  │ asp-afrique-api    │ fork     │ 0    │ online    │ 0%       │ 62.5mb   │
│ 2  │ asp-afrique-web    │ fork     │ 0    │ online    │ 0%       │ 195.9mb  │
│ 3  │ gestionrisques    │ fork     │ 0    │ online    │ 0%       │ 61.3mb   │
│ 4  │ imhotepformation-… │ fork     │ 0    │ online    │ 0%       │ 111.6mb  │
│ 0  │ immotopia-api      │ fork     │ 11   │ online    │ 0%       │ 84.9mb   │
└────┴────────────────────┴──────────┴──────┴───────────┴──────────┴──────────┘
```

**Note:** `immotopia-api` is also running but not in the verification script inventory.

### Port Allocation

| Port | Application | Status |
|------|-------------|--------|
| 3000 | ASP Afrique Web | ✅ Active |
| 3001 | ImhotepFormation | ✅ Active |
| 3002 | GAMR Platform | ✅ Active |
| 3004 | ASP Afrique API | ✅ Active |
| 3005 | GAMR Digitale Backend | ⏸️ Inactive |
| 3022 | GAMR Site | ✅ Active |
| 8000 | Engage-360 Website | ⏸️ Inactive |
| 8092 | AI Agent Platform | ⏸️ Inactive |

### Nginx Sites Enabled

```
/etc/nginx/sites-enabled/
├── asp-afrique.com
├── default
├── gamrdigitale.engage-360.net
├── gestionrisques.com
├── imhotepformation.engage-360.net
└── immo-annonces-new
```

### SSL Certificates

**Active Certificates:**
- `asp-afrique.com` (covers asp-afrique.com, www.asp-afrique.com)
- `gamrdigitale.engage-360.net`
- `gestionrisques.com` (likely)
- `imhotepformation.engage-360.net` (likely)

**Certificate Management:**
- **Tool:** Let's Encrypt (Certbot)
- **Certificate Path:** `/etc/letsencrypt/live/`
- **Auto-renewal:** Configured (typically)

---

## 📝 Verification Script

**Script Location:** `~/verify_after_update.sh`  
**Purpose:** Post-update verification of all applications  
**Last Run:** All active services passing (24 PASS, 0 FAIL, 3 SKIPPED)

### Usage

```bash
# Run verification
./verify_after_update.sh

# Expected output for healthy system:
# PASS: 24
# FAIL: 0
# SKIPPED: 3
```

### What It Checks

1. **Nginx:**
   - Configuration syntax (`nginx -t`)
   - Service status (`systemctl is-active nginx`)

2. **Ports:**
   - Listening status (`ss -lntp`)

3. **PM2 Processes:**
   - Process online status (`pm2 list`)

4. **HTTP Endpoints:**
   - Local port checks (`curl http://localhost:PORT`)
   - Health endpoints for APIs (`/health`)
   - HTTPS domain checks (`curl https://domain`)

5. **Docker Containers:**
   - Container running status (`docker ps`)

---

## 🚀 Maintenance Commands

### PM2 Management

```bash
# List all processes
pm2 list

# View logs
pm2 logs <process-name>

# Restart a process
pm2 restart <process-name>

# Stop a process
pm2 stop <process-name>

# Save PM2 configuration
pm2 save

# Monitor processes
pm2 monit
```

### Nginx Management

```bash
# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx

# Check status
sudo systemctl status nginx

# View error logs
sudo tail -f /var/log/nginx/error.log
```

### Port Checking

```bash
# Check all listening ports
ss -lntp

# Check specific port
ss -lntp | grep :3000

# Find process using port
sudo lsof -i :3000
```

### SSL Certificate Management

```bash
# List certificates
sudo certbot certificates

# Renew certificates
sudo certbot renew

# Check certificate expiry
sudo certbot certificates | grep -A 5 "Expiry"
```

---

## 🔍 Troubleshooting

### Service Not Responding

1. **Check if process is running:**
   ```bash
   pm2 list
   ps aux | grep <process-name>
   ```

2. **Check if port is listening:**
   ```bash
   ss -lntp | grep :<port>
   ```

3. **Check application logs:**
   ```bash
   pm2 logs <process-name>
   tail -f /var/log/nginx/error.log
   ```

4. **Check Nginx configuration:**
   ```bash
   sudo nginx -t
   ```

### Database Connection Issues

**ASP Afrique API** has database authentication issues:
- Check `DATABASE_URL` in `/opt/aspweb/apps/api/.env`
- Verify PostgreSQL is running: `sudo systemctl status postgresql`
- Check database credentials and permissions

### Domain Not Resolving

- Check DNS records
- Verify Nginx configuration exists
- Check SSL certificate is valid
- Test with `curl -v https://domain.com`

---

## 📊 Application Dependencies

### Node.js
- **Version:** 20.19.6 (for ASP Afrique API)
- **Location:** `/usr/bin/node`

### PM2
- **Version:** Latest (check with `pm2 --version`)
- **Startup:** Configured (`pm2 startup`)

### Nginx
- **Version:** Check with `nginx -v`
- **Status:** Active and running

### Docker
- **Status:** Installed but no containers currently running
- **Note:** GAMR Platform was incorrectly identified as Docker, but is actually Node.js

---

## 🔐 Security Notes

1. **SSH Access:** Key-based authentication (deployer user)
2. **Firewall:** Check with `sudo ufw status`
3. **SSL/TLS:** All active domains have valid Let's Encrypt certificates
4. **Process Isolation:** PM2 processes run as deployer user
5. **Logs:** Application logs stored in `/opt/aspweb/logs/` and PM2 default locations

---

## 📅 Last Updated

- **Documentation:** January 5, 2026
- **Verification Script:** January 5, 2026
- **Server Status:** All active services operational

---

## 📞 Support Information

**Server:** srv917891 (147.93.44.169)  
**SSH User:** deployer  
**SSH Key:** `~/.ssh/id_ed25519`  
**OS:** Ubuntu 22.04 LTS

---

*This documentation is maintained based on the verification script inventory and server diagnostics. Update this file when applications are added, removed, or reconfigured.*

