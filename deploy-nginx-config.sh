#!/bin/bash
# Deploy updated nginx configuration to server
# Run this script on the server as deployer user

set -e

echo "🚀 Deploying updated nginx configuration..."

# Step 1: Backup current config
echo "📦 Creating backup..."
sudo cp /etc/nginx/sites-available/asp-afrique.com /etc/nginx/sites-available/asp-afrique.com.backup.$(date +%Y%m%d_%H%M%S)
echo "✅ Backup created"

# Step 2: Copy new config
echo "📝 Copying new configuration..."
sudo cp /tmp/asp-afrique.com.conf /etc/nginx/sites-available/asp-afrique.com
echo "✅ Configuration copied"

# Step 3: Test nginx config
echo "🧪 Testing nginx configuration..."
if sudo nginx -t; then
    echo "✅ Nginx configuration test passed"
else
    echo "❌ Nginx configuration test failed!"
    echo "🔄 Restoring backup..."
    sudo cp /etc/nginx/sites-available/asp-afrique.com.backup.* /etc/nginx/sites-available/asp-afrique.com
    exit 1
fi

# Step 4: Reload nginx
echo "🔄 Reloading nginx..."
sudo systemctl reload nginx
echo "✅ Nginx reloaded successfully"

# Step 5: Check if SSL certificate needs update
echo "🔒 Checking SSL certificate..."
CERT_DOMAINS=$(sudo certbot certificates 2>/dev/null | grep -A 5 "asp-afrique.com" | grep "Domains:" || echo "")

if echo "$CERT_DOMAINS" | grep -q "aspsecurityconsulting.com"; then
    echo "✅ SSL certificate already includes aspsecurityconsulting.com"
else
    echo "⚠️  SSL certificate does not include aspsecurityconsulting.com"
    echo "📋 To update SSL certificate, run:"
    echo "   sudo certbot --nginx -d asp-afrique.com -d www.asp-afrique.com -d aspsecurityconsulting.com -d www.aspsecurityconsulting.com --expand"
fi

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🧪 Testing domains..."
curl -I https://asp-afrique.com 2>/dev/null | head -1 || echo "   ⚠️  Could not test asp-afrique.com"
curl -I https://aspsecurityconsulting.com 2>/dev/null | head -1 || echo "   ⚠️  Could not test aspsecurityconsulting.com (may need SSL update)"


