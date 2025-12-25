# 🚀 Instructions de Déploiement - ASP-AFRIQUE.COM

## 📋 Étapes Rapides

### 1️⃣ PUSH VERS GIT

Votre code a été commité avec succès! Maintenant, poussez vers votre repository:

```bash
# Le remote est déjà configuré: https://github.com/bkourouma/asp-afrique.git
# Poussez vers votre repository:
git push origin 004-tech-videotheque-system

# OU si vous êtes sur main:
# git push origin main
```

### 2️⃣ SUR LE VPS - Commandes Principales

#### Connexion SSH
```bash
ssh root@147.93.44.169
# Mot de passe: Password@Acc225
```

#### Vérification des Prérequis
```bash
# Vérifier Node.js
node --version  # Doit être 18+

# Vérifier pnpm
pnpm --version  # Si pas installé: npm install -g pnpm

# Vérifier PostgreSQL
psql --version  # Doit être installé

# Vérifier NGINX
nginx -v  # Doit être installé

# Installer PM2 si nécessaire
npm install -g pm2
```

### 3️⃣ Configuration PostgreSQL

```bash
# Se connecter à PostgreSQL
sudo -u postgres psql

# Dans PostgreSQL:
CREATE DATABASE aspci_afrique_db;
CREATE USER aspci_user WITH PASSWORD 'VotreMotDePasseSecurise123!';
GRANT ALL PRIVILEGES ON DATABASE aspci_afrique_db TO aspci_user;
\q
```

### 4️⃣ Cloner et Configurer l'Application

**⚠️ IMPORTANT: GitHub ne supporte plus l'authentification par mot de passe.**

Choisissez une des méthodes suivantes:

#### Option A: Utiliser un Personal Access Token (Recommandé)

1. **Créer un Personal Access Token sur GitHub:**
   - Allez sur https://github.com/settings/tokens
   - Cliquez sur "Generate new token (classic)"
   - Donnez un nom au token (ex: "asp-afrique-vps")
   - Cochez `repo` (accès complet au repository)
   - Cliquez "Generate token"
   - **COPIEZ le token** (vous ne le verrez plus jamais!)

2. **Cloner avec le token:**

```bash
# Créer le répertoire
mkdir -p /var/www
cd /var/www

# Cloner avec le token (remplacez YOUR_TOKEN par votre token)
git clone https://YOUR_TOKEN@github.com/bkourouma/asp-afrique.git asp-afrique

# OU mieux: utiliser le username + token
git clone https://bkourouma:YOUR_TOKEN@github.com/bkourouma/asp-afrique.git asp-afrique

cd asp-afrique

# Checkout de la branche correcte
git checkout 004-tech-videotheque-system
```

#### Option B: Utiliser SSH (Plus sécurisé)

1. **Générer une clé SSH sur le VPS:**

```bash
# Générer une clé SSH (si pas déjà fait)
ssh-keygen -t ed25519 -C "asp-afrique-vps" -f ~/.ssh/id_ed25519_asp

# Afficher la clé publique
cat ~/.ssh/id_ed25519_asp.pub
```

2. **Ajouter la clé SSH à GitHub:**
   - Copiez le contenu de `~/.ssh/id_ed25519_asp.pub`
   - Allez sur https://github.com/settings/keys
   - Cliquez "New SSH key"
   - Collez la clé et sauvegardez

3. **Cloner avec SSH:**

```bash
# Créer le répertoire
mkdir -p /var/www
cd /var/www

# Cloner avec SSH
git clone git@github.com:bkourouma/asp-afrique.git asp-afrique

cd asp-afrique

# Checkout de la branche correcte
git checkout 004-tech-videotheque-system
```

#### Option C: Si le repository est public

Si le repository est public, vous pouvez le cloner directement:

```bash
# Créer le répertoire
mkdir -p /var/www
cd /var/www

# Cloner (sans authentification pour repository public)
git clone https://github.com/bkourouma/asp-afrique.git asp-afrique

cd asp-afrique

# Checkout de la branche correcte
git checkout 004-tech-videotheque-system
```

# Installer les dépendances
pnpm install

# Générer Prisma client
cd packages/db
pnpm prisma generate
cd ../..
```

### 5️⃣ Configuration des Variables d'Environnement

#### API Backend (`apps/api/.env`)
```bash
nano apps/api/.env
```

Contenu:
```env
DATABASE_URL="postgresql://aspci_user:VotreMotDePasseSecurise123!@localhost:5432/aspci_afrique_db"
API_PORT=3002
API_HOST=0.0.0.0
CORS_ORIGIN=https://asp-afrique.com
NEXTAUTH_SECRET="GénerezUneCléSecrète32+Caractères"
NODE_ENV=production
```

#### Frontend Next.js (`apps/web/.env.local`)
```bash
nano apps/web/.env.local
```

Contenu:
```env
DATABASE_URL="postgresql://aspci_user:VotreMotDePasseSecurise123!@localhost:5432/aspci_afrique_db"
NEXTAUTH_URL="https://asp-afrique.com"
NEXTAUTH_SECRET="MêmeCléSecrèteQueLAPI"
NEXT_PUBLIC_API_URL="https://asp-afrique.com/api"
NODE_ENV=production
```

#### Prisma DB (`packages/db/.env`)
```bash
nano packages/db/.env
```

Contenu:
```env
DATABASE_URL="postgresql://aspci_user:VotreMotDePasseSecurise123!@localhost:5432/aspci_afrique_db"
```

### 6️⃣ Initialisation Base de Données

```bash
cd /var/www/asp-afrique/packages/db

# Migrations
pnpm prisma migrate deploy

# Générer client
pnpm prisma generate

# Seeder (optionnel)
pnpm db:seed
```

### 7️⃣ Build de l'Application

```bash
cd /var/www/asp-afrique

# Build production
pnpm build
```

### 8️⃣ Configuration PM2

```bash
# Créer répertoire logs
mkdir -p /var/www/asp-afrique/logs

# Démarrer avec PM2
cd /var/www/asp-afrique
pm2 start ecosystem.config.js

# Sauvegarder configuration
pm2 save

# Configurer démarrage automatique
pm2 startup
# Suivez les instructions affichées
```

### 9️⃣ Configuration NGINX

```bash
# Copier la configuration NGINX
sudo cp /var/www/asp-afrique/nginx/asp-afrique.com.conf /etc/nginx/sites-available/asp-afrique.com

# Activer la configuration
sudo ln -s /etc/nginx/sites-available/asp-afrique.com /etc/nginx/sites-enabled/

# Tester la configuration
sudo nginx -t

# Si OK, recharger NGINX
sudo systemctl reload nginx
```

### 🔟 Configuration SSL (Let's Encrypt)

```bash
# Installer Certbot (si pas déjà fait)
sudo apt update
sudo apt install certbot python3-certbot-nginx

# Obtenir certificat SSL
sudo certbot --nginx -d asp-afrique.com -d www.asp-afrique.com

# Suivre les instructions interactives
```

### 1️⃣1️⃣ Vérifications Finales

```bash
# Vérifier PM2
pm2 status
pm2 logs

# Vérifier NGINX
sudo systemctl status nginx

# Vérifier les ports
sudo netstat -tulpn | grep -E '3000|3002|80|443'

# Tester dans le navigateur
# https://asp-afrique.com
```

## ⚠️ POINTS CRITIQUES

1. **NE MODIFIEZ PAS** les configurations NGINX existantes pour les autres applications
2. Cette application utilise les ports **3000** (frontend) et **3002** (API)
3. Le fichier NGINX pour `asp-afrique.com` est **isolé** et n'affecte pas les autres sites
4. Vérifiez que le domaine `asp-afrique.com` pointe bien vers votre VPS avant de continuer

## 📚 Documentation Complète

Pour plus de détails, consultez:
- `DEPLOYMENT_VPS_GUIDE.md` - Guide complet et détaillé

## 🔄 Commandes de Maintenance

```bash
# Redémarrer l'application
pm2 restart all

# Voir les logs
pm2 logs

# Mettre à jour l'application
cd /var/www/asp-afrique
git pull origin 004-tech-videotheque-system
pnpm install
pnpm build
pm2 restart all
```

## 🆘 Support

En cas de problème:
1. Vérifiez les logs: `pm2 logs`
2. Vérifiez NGINX: `sudo tail -f /var/log/nginx/error.log`
3. Vérifiez les services: `pm2 status`, `sudo systemctl status nginx`

---

**Date:** 2025-01-23  
**Domaine:** asp-afrique.com  
**Ports:** 3000 (web), 3002 (api)

