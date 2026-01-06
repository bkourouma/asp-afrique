#!/bin/bash
# ============================================
# Fix NextAuth routing for aspsecurityconsulting.com
# ============================================
# This script adds the /api/auth location block to Nginx
# so that NextAuth routes are directed to Next.js (port 3000)
# instead of the Fastify API (port 3004)
#
# Usage: sudo bash fix-nextauth-routing.sh
# ============================================

set -e

NGINX_CONF='/etc/nginx/sites-available/aspsecurityconsulting.com'

echo "🔧 Fixing NextAuth routing in Nginx..."

# Check if the configuration already exists
if grep -q 'location /api/auth' "$NGINX_CONF"; then
    echo '⚠️  La configuration /api/auth existe déjà dans le fichier Nginx'
    echo '📋 Vérification de la configuration actuelle...'
    sudo nginx -t
    exit 0
fi

echo "📝 Ajout de la configuration /api/auth..."

# Add the location block before the main location / block
sudo sed -i '/location \/ {/i\
    # NextAuth API routes - must go to Next.js on port 3000\
    location /api/auth {\
        proxy_pass http://127.0.0.1:3000;\
        proxy_http_version 1.1;\
        proxy_set_header Upgrade $http_upgrade;\
        proxy_set_header Connection "upgrade";\
        proxy_set_header Host $host;\
        proxy_set_header X-Real-IP $remote_addr;\
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\
        proxy_set_header X-Forwarded-Proto $scheme;\
        proxy_cache_bypass $http_upgrade;\
    }\
\
' "$NGINX_CONF"

echo "✅ Configuration ajoutée avec succès"
echo "🔍 Test de la configuration Nginx..."

sudo nginx -t

if [ $? -eq 0 ]; then
    echo "✅ Configuration Nginx valide"
    echo "🔄 Rechargement de Nginx..."
    sudo systemctl reload nginx
    echo "✅ Nginx rechargé avec succès"
    echo ""
    echo "🎉 NextAuth routing configuré !"
    echo "📝 Vous pouvez maintenant tester la connexion admin à:"
    echo "    https://aspsecurityconsulting.com/login"
else
    echo "❌ Erreur dans la configuration Nginx"
    echo "⚠️  Le fichier n'a pas été modifié correctement"
    exit 1
fi
