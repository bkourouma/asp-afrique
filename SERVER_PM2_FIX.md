# Server PM2 Fix Instructions

The API build is using cache, so the dist folder might not exist. Here's how to fix it:

## Option 1: Force rebuild without cache (Recommended)

```bash
cd /var/www/asp-afrique

# Clean build cache and rebuild
pnpm build --force

# Or rebuild just the API
cd apps/api
pnpm build
cd ../..

# Now start PM2
pm2 start ecosystem.config.js
```

## Option 2: Use tsx to run TypeScript directly (No build needed)

If you prefer to run TypeScript directly without building:

```bash
cd /var/www/asp-afrique

# Update ecosystem.config.js to use tsx
# Change the API script from:
#   script: './apps/api/dist/index.js',
# To:
#   script: 'tsx',
#   args: 'apps/api/src/index.ts',

# Then start PM2
pm2 start ecosystem.config.js
```

## Option 3: Check if dist exists and build if needed

```bash
cd /var/www/asp-afrique

# Check if dist exists
ls -la apps/api/dist/

# If it doesn't exist, build it
cd apps/api
pnpm build
cd ../..

# Start PM2
pm2 start ecosystem.config.js
```

## Option 4: Use pnpm start script

```bash
cd /var/www/asp-afrique

# Start API using pnpm start (which will build first if needed)
cd apps/api
pnpm start &
cd ../..

# Start web using PM2
pm2 start ecosystem.config.js --only asp-afrique-web
```







