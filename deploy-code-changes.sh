#!/bin/bash
# Deploy code changes to server
# This script copies changed files and rebuilds the application

set -e

echo "🚀 Deploying code changes to server..."

# Step 1: Copy changed files
echo "📦 Copying changed files..."

# Copy layout.tsx if it exists
if [ -f "/tmp/layout.tsx" ]; then
    echo "   Copying layout.tsx..."
    cp /tmp/layout.tsx /opt/aspweb/apps/web/src/app/layout.tsx
    echo "   ✅ layout.tsx copied"
fi

# Copy package.json if changed
if [ -f "/tmp/package.json" ]; then
    echo "   Copying package.json..."
    cp /tmp/package.json /opt/aspweb/apps/web/package.json
    echo "   ✅ package.json copied"
fi

# Step 2: Install dependencies if package.json changed
if [ -f "/tmp/package.json" ]; then
    echo "📥 Installing dependencies..."
    cd /opt/aspweb/apps/web
    npm install
    echo "   ✅ Dependencies installed"
fi

# Step 3: Build Next.js application
echo "🔨 Building Next.js application..."
cd /opt/aspweb/apps/web
npm run build
echo "   ✅ Build complete"

# Step 4: Restart PM2 process
echo "🔄 Restarting application..."
pm2 restart asp-afrique-web
echo "   ✅ Application restarted"

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🧪 Testing application..."
sleep 2
curl -I http://localhost:3000 2>/dev/null | head -1 || echo "   ⚠️  Application may still be starting"

