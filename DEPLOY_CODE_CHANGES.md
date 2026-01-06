# 🚀 Deploy Code Changes to Server

## Problem

The server has the old version because:
1. Changes were committed to `main` branch locally
2. Server is on `004-tech-videotheque-system` branch
3. Git push failed due to permissions
4. Code needs to be manually copied and rebuilt

## Solution: Manual Deployment

### Step 1: Copy Changed Files to Server

From your local machine:

```bash
cd D:\APP\VERSIONS_ANGE\asp-afrique

# Copy changed files
scp apps/web/src/app/layout.tsx deployer@147.93.44.169:/tmp/layout.tsx
scp apps/web/package.json deployer@147.93.44.169:/tmp/package.json
scp deploy-code-changes.sh deployer@147.93.44.169:~/
```

### Step 2: SSH and Deploy

```bash
# SSH into server
ssh deployer@147.93.44.169

# Make script executable
chmod +x ~/deploy-code-changes.sh

# Run deployment
~/deploy-code-changes.sh
```

### Alternative: Manual Steps

If you prefer to do it manually:

```bash
# SSH into server
ssh deployer@147.93.44.169

# Copy files
cp /tmp/layout.tsx /opt/aspweb/apps/web/src/app/layout.tsx
cp /tmp/package.json /opt/aspweb/apps/web/package.json

# Install dependencies (if package.json changed)
cd /opt/aspweb/apps/web
npm install

# Build application
npm run build

# Restart PM2
pm2 restart asp-afrique-web
```

## What Changed

Based on git status, these files were modified:
- `apps/web/src/app/layout.tsx` - Layout component
- `apps/web/package.json` - Dependencies
- `nginx/asp-afrique.com.conf` - Nginx config (already deployed)
- `pnpm-lock.yaml` - Lock file

## Verification

After deployment, verify:

```bash
# Check PM2 status
pm2 status asp-afrique-web

# Check application logs
pm2 logs asp-afrique-web --lines 20

# Test locally
curl http://localhost:3000

# Test from browser
# https://asp-afrique.com
# https://aspsecurityconsulting.com
```

## Troubleshooting

### Build fails:
```bash
# Check Node version
node --version

# Check npm version
npm --version

# Clear Next.js cache
cd /opt/aspweb/apps/web
rm -rf .next
npm run build
```

### Application doesn't start:
```bash
# Check PM2 logs
pm2 logs asp-afrique-web --err

# Check if port is in use
ss -lntp | grep :3000

# Restart PM2
pm2 restart asp-afrique-web
```

## Future: Fix Git Workflow

To avoid this in the future:

1. **Push to correct branch:**
   ```bash
   git checkout 004-tech-videotheque-system
   git merge main
   git push origin 004-tech-videotheque-system
   ```

2. **Or set up proper git permissions** so pushes work automatically

3. **Or use a deployment script** that pulls from git and rebuilds

