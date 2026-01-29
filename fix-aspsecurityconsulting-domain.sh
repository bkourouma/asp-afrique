#!/bin/bash
# Fix aspsecurityconsulting.com domain configuration
# This script updates nginx config and SSL certificate to include aspsecurityconsulting.com
# Run as: deployer user (with sudo access)

set -e

echo "🔧 Fixing aspsecurityconsulting.com domain configuration..."

# Step 1: Backup current nginx config
echo "📦 Backing up current nginx configuration..."
sudo cp /etc/nginx/sites-available/asp-afrique.com /etc/nginx/sites-available/asp-afrique.com.backup.$(date +%Y%m%d_%H%M%S)

# Step 2: Update nginx configuration to include aspsecurityconsulting.com
echo "📝 Updating nginx configuration..."
sudo sed -i 's/server_name asp-afrique.com www.asp-afrique.com;/server_name asp-afrique.com www.asp-afrique.com aspsecurityconsulting.com www.aspsecurityconsulting.com;/g' /etc/nginx/sites-available/asp-afrique.com

# Step 3: Test nginx configuration
echo "🧪 Testing nginx configuration..."
if sudo nginx -t; then
    echo "✅ Nginx configuration test passed"
else
    echo "❌ Nginx configuration test failed. Restoring backup..."
    sudo cp /etc/nginx/sites-available/asp-afrique.com.backup.* /etc/nginx/sites-available/asp-afrique.com
    exit 1
fi

# Step 4: Reload nginx
echo "🔄 Reloading nginx..."
sudo systemctl reload nginx
echo "✅ Nginx reloaded successfully"

# Step 5: Check if SSL certificate needs to be updated
echo "🔒 Checking SSL certificate..."
CERT_DOMAINS=$(sudo certbot certificates 2>/dev/null | grep -A 5 "asp-afrique.com" | grep "Domains:" || echo "")

if echo "$CERT_DOMAINS" | grep -q "aspsecurityconsulting.com"; then
    echo "✅ SSL certificate already includes aspsecurityconsulting.com"
else
    echo "⚠️  SSL certificate does not include aspsecurityconsulting.com"
    echo "📋 Updating SSL certificate to include aspsecurityconsulting.com..."
    
    # Update certificate to include new domain
    sudo certbot --nginx -d asp-afrique.com -d www.asp-afrique.com -d aspsecurityconsulting.com -d www.aspsecurityconsulting.com --expand --non-interactive --agree-tos --email info@asp-afrique.com || {
        echo "⚠️  Certificate update may require manual intervention"
        echo "💡 You may need to run manually:"
        echo "   sudo certbot --nginx -d asp-afrique.com -d www.asp-afrique.com -d aspsecurityconsulting.com -d www.aspsecurityconsulting.com --expand"
    }
fi

# Step 6: Verify configuration
echo "✅ Verification:"
echo "   - Nginx config updated with aspsecurityconsulting.com"
echo "   - Nginx reloaded"
echo ""
echo "🧪 Testing domains..."
echo "   Testing asp-afrique.com..."
curl -I https://asp-afrique.com 2>/dev/null | head -1 || echo "   ⚠️  Could not test (DNS may not be configured)"
echo "   Testing aspsecurityconsulting.com..."
curl -I https://aspsecurityconsulting.com 2>/dev/null | head -1 || echo "   ⚠️  Could not test (DNS may not be configured)"

echo ""
echo "✅ Configuration update complete!"
echo ""
echo "📝 Next steps:"
echo "   1. Verify DNS is pointing aspsecurityconsulting.com to 147.93.44.169"
echo "   2. Test https://aspsecurityconsulting.com in your browser"
echo "   3. If SSL certificate update failed, run manually:"
echo "      sudo certbot --nginx -d asp-afrique.com -d www.asp-afrique.com -d aspsecurityconsulting.com -d www.aspsecurityconsulting.com --expand"

