# 🚀 Guide de Déploiement VPS - ASPCI Web Application

## 📋 Prérequis

- VPS avec accès SSH (root ou sudo)
- Node.js 18+ installé
- PostgreSQL installé et configuré
- pnpm installé globalement
- NGINX installé et configuré
- PM2 installé globalement (pour gérer les processus Node.js)
- Git installé sur le serveur
- Domaine `asp-afrique.com` pointant vers votre VPS

## ⚠️ ATTENTION CRITIQUE

**Vous avez déjà des applications sur les ports 80, 8090, 8070, etc.**

- **NE MODIFIEZ PAS** les configurations NGINX existantes
- **NE MODIFIEZ PAS** les ports utilisés par d'autres applications
- Cette application utilisera des ports **dédiés** (3000 pour frontend, 3002 pour API)
- Le domaine `asp-afrique.com` sera configuré dans un **nouveau fichier NGINX séparé**

## 📦 Étape 1: Préparation Locale (Git Push)

### 1.1 Vérifier l'état Git

```bash
cd D:\APP\AspCIWeb
git status
```

### 1.2 Ajouter les fichiers nécessaires

```bash
# Ajouter les fichiers de configuration
git add .gitignore
git add package.json package-lock.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json
git add apps/
git add packages/
git add scripts/
git add specs/
git add README.md
git add DEPLOYMENT_VPS_GUIDE.md
git add nginx/
git add ecosystem.config.js
git add .env.production.example
```

### 1.3 Commit et Push

```bash
# Commit les changements
git commit -m "feat: Add VPS deployment configuration and guide

- Add NGINX configuration for asp-afrique.com
- Add PM2 ecosystem configuration
- Add production environment templates
- Add comprehensive deployment guide"

# Push vers le repository distant
git push origin 004-tech-videotheque-system

# OU si vous êtes sur main:
# git push origin main
```

## 🖥️ Étape 2: Connexion au VPS

### 2.1 Se connecter au serveur

```bash
ssh root@147.93.44.169
# Utilisez le mot de passe fourni
```

### 2.2 Vérifier les prérequis

```bash
# Vérifier Node.js
node --version  # Doit être 18 ou supérieur

# Vérifier pnpm
pnpm --version

# Vérifier PostgreSQL
psql --version

# Vérifier NGINX
nginx -v

# Vérifier PM2
pm2 --version
```

### 2.3 Installer les prérequis manquants (si nécessaire)

```bash
# Installer pnpm
npm install -g pnpm

# Installer PM2
npm install -g pm2
```

## 🗄️ Étape 3: Configuration de la Base de Données

### 3.1 Créer la base de données PostgreSQL

```bash
# Se connecter à PostgreSQL
sudo -u postgres psql

# Créer la base de données
CREATE DATABASE aspci_afrique_db;

# Créer un utilisateur (remplacez le mot de passe)
CREATE USER aspci_user WITH PASSWORD 'VotreMotDePasseSecurise123!';

# Accorder les permissions
GRANT ALL PRIVILEGES ON DATABASE aspci_afrique_db TO aspci_user;

# Sortir de PostgreSQL
\q
```

### 3.2 Tester la connexion

```bash
# Tester la connexion
sudo -u postgres psql -d aspci_afrique_db -U aspci_user -h localhost
# Entrez le mot de passe que vous avez défini
```

## 📥 Étape 4: Cloner et Configurer l'Application

### 4.1 Choisir un répertoire de déploiement

```bash
# Créer un répertoire pour les applications (si n'existe pas)
mkdir -p /var/www

# Aller dans le répertoire
cd /var/www

# Cloner le repository
# ⚠️ IMPORTANT: GitHub nécessite un Personal Access Token ou SSH
# Voir DEPLOYMENT_GIT_AUTH.md pour les instructions détaillées

# Option 1: Avec Personal Access Token (recommandé pour déploiement rapide)
# git clone https://bkourouma:YOUR_TOKEN@github.com/bkourouma/asp-afrique.git asp-afrique

# Option 2: Avec SSH (plus sécurisé pour usage à long terme)
# git clone git@github.com:bkourouma/asp-afrique.git asp-afrique

# Option 3: Si repository public
git clone https://github.com/bkourouma/asp-afrique.git asp-afrique

cd asp-afrique
```

### 4.2 Installer les dépendances

```bash
# Installer toutes les dépendances
pnpm install

# Générer le client Prisma
cd packages/db
pnpm prisma generate
cd ../..
```

## ⚙️ Étape 5: Configuration des Variables d'Environnement

### 5.1 Configurer l'API Backend

```bash
# Créer le fichier .env pour l'API
cd apps/api
nano .env
```

Copiez ce contenu (modifiez selon vos besoins):

```env
# Database
DATABASE_URL="postgresql://aspci_user:VotreMotDePasseSecurise123!@localhost:5432/aspci_afrique_db"

# API Configuration
API_PORT=3002
API_HOST=0.0.0.0
CORS_ORIGIN=https://asp-afrique.com

# JWT Configuration
NEXTAUTH_SECRET="GénerezUneCléSecrèteTrèsLongueEtAléatoirePourLaProduction123456789"

# SMTP Configuration (si vous utilisez l'envoi d'emails)
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=votre-email@asp-afrique.com
SMTP_PASS=VotreMotDePasseEmail
SMTP_FROM=votre-email@asp-afrique.com

# Environment
NODE_ENV=production
```

### 5.2 Configurer le Frontend Next.js

```bash
# Créer le fichier .env.local pour le frontend
cd ../web
nano .env.local
```

Copiez ce contenu:

```env
# Database (même URL que l'API)
DATABASE_URL="postgresql://aspci_user:VotreMotDePasseSecurise123!@localhost:5432/aspci_afrique_db"

# NextAuth Configuration
NEXTAUTH_URL="https://asp-afrique.com"
NEXTAUTH_SECRET="MêmeCléSecrèteQuePourLAPI123456789"

# API URL
NEXT_PUBLIC_API_URL="https://asp-afrique.com/api"

# Environment
NODE_ENV=production
```

### 5.3 Configurer la base de données Prisma

```bash
# Créer le fichier .env pour Prisma
cd ../../packages/db
nano .env
```

Copiez ce contenu (même DATABASE_URL):

```env
DATABASE_URL="postgresql://aspci_user:VotreMotDePasseSecurise123!@localhost:5432/aspci_afrique_db"
```

## 🗄️ Étape 6: Initialisation de la Base de Données

```bash
# Retourner dans packages/db
cd /var/www/asp-afrique/packages/db

# Exécuter les migrations
pnpm prisma migrate deploy

# Générer le client Prisma
pnpm prisma generate

# Seeder la base de données (optionnel - crée un admin par défaut)
pnpm db:seed
```

## 🏗️ Étape 7: Build de l'Application

```bash
# Retourner à la racine du projet
cd /var/www/asp-afrique

# Build de production
pnpm build

# Vérifier que le build a réussi
ls -la apps/web/.next
ls -la apps/api/dist
```

## 🔧 Étape 8: Configuration PM2

### 8.1 Vérifier le fichier ecosystem.config.js

Le fichier `ecosystem.config.js` devrait être à la racine du projet. Il contient:

```javascript
module.exports = {
  apps: [
    {
      name: 'asp-afrique-api',
      script: './apps/api/dist/index.js',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production'
      },
      error_file: './logs/api-error.log',
      out_file: './logs/api-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      watch: false
    },
    {
      name: 'asp-afrique-web',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3000',
      cwd: './apps/web',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: './logs/web-error.log',
      out_file: './logs/web-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      watch: false
    }
  ]
};
```

### 8.2 Créer le répertoire des logs

```bash
mkdir -p /var/www/asp-afrique/logs
```

### 8.3 Démarrer les applications avec PM2

```bash
cd /var/www/asp-afrique

# Démarrer les applications
pm2 start ecosystem.config.js

# Sauvegarder la configuration PM2 (pour redémarrage automatique)
pm2 save

# Configurer PM2 pour démarrer au boot du système
pm2 startup
# Suivez les instructions affichées
```

### 8.4 Vérifier le statut

```bash
# Vérifier que les applications tournent
pm2 status

# Vérifier les logs
pm2 logs

# Vérifier que les ports sont bien utilisés
netstat -tulpn | grep -E '3000|3002'
```

## 🌐 Étape 9: Configuration NGINX

### 9.1 Vérifier les configurations NGINX existantes

```bash
# Lister les configurations NGINX existantes
ls -la /etc/nginx/sites-available/
ls -la /etc/nginx/sites-enabled/

# NE MODIFIEZ AUCUN FICHIER EXISTANT
```

### 9.2 Créer la nouvelle configuration NGINX

```bash
# Créer le fichier de configuration pour asp-afrique.com
sudo nano /etc/nginx/sites-available/asp-afrique.com
```

Copiez le contenu du fichier `nginx/asp-afrique.com.conf` que nous avons créé (voir section suivante).

### 9.3 Activer la configuration

```bash
# Créer le lien symbolique
sudo ln -s /etc/nginx/sites-available/asp-afrique.com /etc/nginx/sites-enabled/

# Tester la configuration NGINX (IMPORTANT!)
sudo nginx -t

# Si le test réussit, recharger NGINX
sudo systemctl reload nginx
```

### 9.4 Vérifier que NGINX écoute sur le bon domaine

```bash
# Vérifier la configuration
sudo nginx -T | grep -A 20 "asp-afrique.com"
```

## 🔒 Étape 10: Configuration SSL (Let's Encrypt)

### 10.1 Installer Certbot (si pas déjà installé)

```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx
```

### 10.2 Obtenir le certificat SSL

```bash
# Obtenir et installer le certificat SSL
sudo certbot --nginx -d asp-afrique.com -d www.asp-afrique.com

# Suivez les instructions interactives
```

### 10.3 Vérifier le renouvellement automatique

```bash
# Tester le renouvellement
sudo certbot renew --dry-run
```

## ✅ Étape 11: Vérifications Finales

### 11.1 Vérifier que tout fonctionne

```bash
# Vérifier PM2
pm2 status

# Vérifier NGINX
sudo systemctl status nginx

# Vérifier PostgreSQL
sudo systemctl status postgresql

# Vérifier les ports
sudo netstat -tulpn | grep -E '80|443|3000|3002'
```

### 11.2 Tester l'application

1. Ouvrez votre navigateur et allez sur `https://asp-afrique.com`
2. Vérifiez que la page d'accueil s'affiche
3. Testez la connexion admin: `https://asp-afrique.com/admin`
4. Vérifiez les logs si nécessaire:

```bash
# Logs PM2
pm2 logs asp-afrique-web
pm2 logs asp-afrique-api

# Logs NGINX
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

## 🔄 Commandes Utiles pour la Maintenance

### Redémarrer les applications

```bash
# Redémarrer toutes les applications
pm2 restart all

# Redémarrer une application spécifique
pm2 restart asp-afrique-web
pm2 restart asp-afrique-api
```

### Voir les logs

```bash
# Logs en temps réel
pm2 logs

# Logs d'une application spécifique
pm2 logs asp-afrique-web --lines 100
```

### Mettre à jour l'application

```bash
cd /var/www/asp-afrique

# Récupérer les dernières modifications
git pull origin main  # ou votre branche

# Installer les nouvelles dépendances
pnpm install

# Générer Prisma client
cd packages/db
pnpm prisma generate
cd ../..

# Rebuild l'application
pnpm build

# Redémarrer avec PM2
pm2 restart all
```

### Vérifier l'utilisation des ressources

```bash
# Utilisation CPU et mémoire
pm2 monit

# Utilisation disque
df -h
```

## 🚨 Dépannage

### L'application ne démarre pas

```bash
# Vérifier les logs
pm2 logs --lines 50

# Vérifier que les ports sont libres
sudo lsof -i :3000
sudo lsof -i :3002

# Redémarrer PM2
pm2 restart all
```

### Erreur de connexion à la base de données

```bash
# Vérifier que PostgreSQL tourne
sudo systemctl status postgresql

# Tester la connexion
psql -h localhost -U aspci_user -d aspci_afrique_db
```

### Erreur NGINX

```bash
# Vérifier la configuration
sudo nginx -t

# Voir les erreurs
sudo tail -f /var/log/nginx/error.log
```

### Le domaine ne fonctionne pas

```bash
# Vérifier la configuration DNS
dig asp-afrique.com

# Vérifier que NGINX écoute
sudo netstat -tulpn | grep nginx
```

## 📝 Notes Importantes

1. **NE MODIFIEZ JAMAIS** les configurations NGINX des autres applications
2. Cette application utilise les ports **3000** (frontend) et **3002** (API)
3. Le domaine `asp-afrique.com` est isolé dans son propre fichier NGINX
4. Les variables d'environnement sont sensibles - ne les partagez jamais
5. Les logs sont stockés dans `/var/www/asp-afrique/logs/`
6. Utilisez PM2 pour gérer les processus - c'est plus fiable que `node` directement

## 📞 Support

Si vous rencontrez des problèmes:
1. Vérifiez les logs PM2: `pm2 logs`
2. Vérifiez les logs NGINX: `sudo tail -f /var/log/nginx/error.log`
3. Vérifiez les logs de l'application dans `/var/www/asp-afrique/logs/`
4. Vérifiez que tous les services tournent: `pm2 status`, `sudo systemctl status nginx`, `sudo systemctl status postgresql`

---

**Date de création:** 2025-01-23  
**Version:** 1.0  
**Domaine:** asp-afrique.com

