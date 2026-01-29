# Server Clean Setup Instructions

## Step 1: Backup current directory (optional, but recommended)
```bash
cd /var/www
mv asp-afrique asp-afrique.backup
```

## Step 2: Clone fresh from GitHub
```bash
cd /var/www
git clone https://github.com/bkourouma/asp-afrique.git asp-afrique
cd asp-afrique
git checkout 004-tech-videotheque-system
```

## Step 3: Install dependencies
```bash
pnpm install
```

## Step 4: Generate Prisma client
```bash
cd packages/db
pnpm prisma generate
cd ../..
```

## Step 5: Setup environment variables
```bash
# Copy and edit environment files
cp packages/db/.env.example packages/db/.env  # Edit with your DB credentials
cp apps/api/.env.example apps/api/.env  # If exists
cp apps/web/.env.local.example apps/web/.env.local  # If exists
```

## Step 6: Run migrations
```bash
cd packages/db
pnpm prisma migrate deploy
cd ../..
```

## Step 7: Seed database (optional)
```bash
cd packages/db
pnpm db:seed
cd ../..
```

## Step 8: Build the application
```bash
pnpm build
```

## Step 9: Start with PM2 (if using PM2)
```bash
pm2 start ecosystem.config.js
# OR
pm2 start apps/web/package.json --name asp-afrique-web
pm2 start apps/api/package.json --name asp-afrique-api
```

## Alternative: Complete removal and fresh clone
If you want to completely remove everything first:

```bash
cd /var/www
rm -rf asp-afrique
git clone https://github.com/bkourouma/asp-afrique.git asp-afrique
cd asp-afrique
git checkout 004-tech-videotheque-system
pnpm install
cd packages/db && pnpm prisma generate && cd ../..
# Then continue with steps 5-9 above
```







