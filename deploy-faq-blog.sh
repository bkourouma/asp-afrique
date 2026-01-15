#!/bin/bash

# Script to deploy FAQ and Blog updates to production
# Run this on the server: bash deploy-faq-blog.sh

set -e

APP_DIR="/var/www/asp-afrique"
GIT_BRANCH="004-tech-videotheque-system"

echo "🚀 Starting FAQ and Blog deployment..."

cd "$APP_DIR"

echo "📥 Pulling latest changes from git..."
git pull origin "$GIT_BRANCH"

echo "📦 Installing dependencies..."
pnpm install --frozen-lockfile

echo "🔧 Generating Prisma client..."
cd packages/db
pnpm prisma generate

echo "🗄️ Running database migrations..."
pnpm prisma migrate deploy

echo "🌱 Seeding FAQs and Blog Articles..."
pnpm db:seed

echo "🏗️ Building application..."
cd ../..
pnpm build

echo "🔄 Restarting PM2 processes..."
pm2 restart ecosystem.config.js
pm2 save

echo "✅ Deployment completed!"
echo "📊 Checking PM2 status..."
pm2 status

echo "🎉 FAQ and Blog deployment finished!"


