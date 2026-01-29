# Deploy API URL Fix - Remove Duplicate /api

## Issue
Admin formations page shows 0 formations because it's calling `/api/api/v1/formations` (404) instead of `/api/v1/formations`.

## Fix Applied
- Updated `apps/web/src/lib/api-client.ts` to normalize `NEXT_PUBLIC_API_URL` by removing trailing `/api`
- Fix committed and pushed to branch: `004-tech-videotheque-system`

## Deployment Steps

### SSH into Server
```bash
ssh -i C:/Users/HP/.ssh/id_ed25519 root@147.93.44.169
# Enter passphrase when prompted: XmKq8BaZ29Ycrnpf9DtmNaiHAQwRNV2syzDTYaX5jBM
```

### Navigate to Project Directory
```bash
# Find the project directory (check common locations)
cd /var/www/asp-afrique || cd ~/asp-afrique || cd /root/asp-afrique

# Verify you're in the right place
pwd
ls -la
```

### Pull Latest Changes
```bash
git pull origin 004-tech-videotheque-system
```

### Rebuild Next.js Application
```bash
cd apps/web

# Install dependencies (if needed)
pnpm install

# Build the application
pnpm build
```

### Restart Application
```bash
# Check PM2 processes
pm2 list

# Restart the Next.js app
pm2 restart asp-afrique-web

# Or restart all
pm2 restart all

# Check logs to verify
pm2 logs asp-afrique-web --lines 50
```

### Verify Fix
1. Clear browser cache
2. Visit: https://asp-afrique.com/admin/formations
3. Check browser console - should see `/api/v1/formations` (not `/api/api/v1/formations`)
4. Formations should load correctly

## Alternative: Single Command Deployment
```bash
ssh -i C:/Users/HP/.ssh/id_ed25519 root@147.93.44.169 "cd /var/www/asp-afrique && git pull origin 004-tech-videotheque-system && cd apps/web && pnpm install && pnpm build && pm2 restart asp-afrique-web"
```

## Troubleshooting
- If build fails: Check Node.js version (`node -v`) - should be 18+
- If PM2 restart fails: Check PM2 app name with `pm2 list`
- If still not working: Clear Next.js cache: `rm -rf apps/web/.next` then rebuild






