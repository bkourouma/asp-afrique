# 🚀 Deploy FAQ and Blog to Production

## Quick Deployment Commands

SSH to your server and run these commands:

```bash
# 1. Connect to server
ssh root@147.93.44.169

# 2. Navigate to project directory
cd /var/www/asp-afrique

# 3. Pull latest changes
git pull origin 004-tech-videotheque-system

# 4. Install dependencies (if needed)
pnpm install --frozen-lockfile

# 5. Generate Prisma client with new FAQ model
cd packages/db
pnpm prisma generate

# 6. Run database migration to create FAQ table
pnpm prisma migrate deploy

# 7. Seed FAQs and Blog Articles
pnpm db:seed

# 8. Build the application
cd ../..
pnpm build

# 9. Restart PM2 processes
pm2 restart ecosystem.config.js
pm2 save

# 10. Verify deployment
pm2 status
```

## Or Use the Deployment Script

```bash
# On the server, after pulling latest changes:
cd /var/www/asp-afrique
chmod +x deploy-faq-blog.sh
./deploy-faq-blog.sh
```

## What This Does

1. ✅ Pulls the latest code with FAQ model and seed script
2. ✅ Generates Prisma client with the new FAQ model
3. ✅ Creates the `faqs` table in the database
4. ✅ Seeds 20 FAQs with status "Publié"
5. ✅ Seeds 5 blog articles with status "published"
6. ✅ Rebuilds the application
7. ✅ Restarts the services

## Verification

After deployment, verify the data:

```bash
# Check if FAQs were created
psql -U your_db_user -d your_db_name -c "SELECT COUNT(*) FROM faqs;"
# Should return 20

# Check if blog articles were created
psql -U your_db_user -d your_db_name -c "SELECT COUNT(*) FROM blog_articles WHERE status = 'published';"
# Should return 5
```

Or check via API:
- `GET /api/v1/faq` - Should return 20 FAQs
- `GET /api/v1/blog` - Should return 5 published articles


