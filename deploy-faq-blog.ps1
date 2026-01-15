# PowerShell script to deploy FAQ and Blog to production
# Usage: .\deploy-faq-blog.ps1

$server = "root@147.93.44.169"
$commands = @"
cd /var/www/asp-afrique
git pull origin 004-tech-videotheque-system
cd packages/db
pnpm prisma generate
pnpm prisma migrate deploy
pnpm db:seed
cd ../..
pnpm build
pm2 restart ecosystem.config.js
pm2 save
pm2 status
"@

Write-Host "🚀 Deploying FAQ and Blog to production..." -ForegroundColor Green
Write-Host "Connecting to $server..." -ForegroundColor Yellow

# Note: You'll need to enter the password when prompted
ssh $server $commands

Write-Host "✅ Deployment completed!" -ForegroundColor Green


