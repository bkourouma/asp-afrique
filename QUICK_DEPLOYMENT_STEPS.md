# 🚀 Étapes Rapides de Déploiement - Sur le VPS

## ✅ Ce qui est déjà fait

1. ✅ Base de données PostgreSQL créée (`aspci_afrique_db`)
2. ✅ Utilisateur PostgreSQL créé (`aspci_user`)
3. ✅ Repository cloné avec succès

## 📍 Où vous en êtes

Vous êtes actuellement dans `/var/www` après le clonage.

## 🎯 Prochaines Étapes Immédiates

### Étape 1: Entrer dans le répertoire et vérifier la branche

```bash
# Vous êtes dans /var/www, entrez dans asp-afrique
cd asp-afrique

# Vérifier que vous êtes dans le bon répertoire
pwd  # Devrait afficher: /var/www/asp-afrique

# Vérifier les branches disponibles
git branch -a

# Checkout de la branche de déploiement
git checkout 004-tech-videotheque-system

# Vérifier que vous êtes sur la bonne branche
git branch
# Vous devriez voir un * devant 004-tech-videotheque-system
```

### Étape 2: Installer les dépendances

```bash
# Installer pnpm si pas déjà fait
npm install -g pnpm

# Installer toutes les dépendances
pnpm install
```

### Étape 3: Générer Prisma Client

```bash
# Aller dans le package db
cd packages/db

# Générer le client Prisma
pnpm prisma generate

# Retourner à la racine
cd ../..
```

### Étape 4: Configuration des Variables d'Environnement

#### Configurer l'API Backend

```bash
# Créer le fichier .env pour l'API
cd apps/api
nano .env
```

Copiez ce contenu (modifiez le mot de passe si vous l'avez changé):

```env
DATABASE_URL="postgresql://aspci_user:VotreMotDePasseSecurise123!@localhost:5432/aspci_afrique_db"
API_PORT=3002
API_HOST=0.0.0.0
CORS_ORIGIN=https://asp-afrique.com
NEXTAUTH_SECRET="GénerezUneCléSecrète32+CaractèresAvecOpenSSL"
NODE_ENV=production
```

Générez un secret sécurisé:

```bash
# Sur le VPS, générez un secret
openssl rand -base64 32
# Copiez le résultat et utilisez-le pour NEXTAUTH_SECRET dans tous les fichiers .env
```

#### Configurer le Frontend Next.js

```bash
# Aller dans le répertoire web
cd ../web
nano .env.local
```

Contenu (utilisez le même NEXTAUTH_SECRET que l'API):

```env
DATABASE_URL="postgresql://aspci_user:VotreMotDePasseSecurise123!@localhost:5432/aspci_afrique_db"
NEXTAUTH_URL="https://asp-afrique.com"
NEXTAUTH_SECRET="MêmeCléSecrèteQuePourLAPI"
NEXT_PUBLIC_API_URL="https://asp-afrique.com/api"
NODE_ENV=production
```

#### Configurer Prisma DB

```bash
# Aller dans packages/db
cd ../../packages/db
nano .env
```

Contenu:

```env
DATABASE_URL="postgresql://aspci_user:VotreMotDePasseSecurise123!@localhost:5432/aspci_afrique_db"
```

### Étape 5: Initialiser la Base de Données

```bash
# Vous êtes dans packages/db
# Exécuter les migrations
pnpm prisma migrate deploy

# Générer le client Prisma (si pas déjà fait)
pnpm prisma generate

# Seeder la base de données (optionnel - crée un admin)
pnpm db:seed
# OU si ça ne marche pas:
# npx prisma db seed
```

### Étape 6: Build de l'Application

```bash
# Retourner à la racine du projet
cd /var/www/asp-afrique

# Build de production
pnpm build
```

### Étape 7: Configurer PM2

```bash
# Créer le répertoire des logs
mkdir -p /var/www/asp-afrique/logs

# Démarrer les applications avec PM2
cd /var/www/asp-afrique
pm2 start ecosystem.config.js

# Vérifier que tout tourne
pm2 status

# Sauvegarder la configuration PM2
pm2 save

# Configurer le démarrage automatique au boot
pm2 startup
# Suivez les instructions affichées
```

### Étape 8: Configuration NGINX

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

### Étape 9: Configuration SSL (Let's Encrypt)

```bash
# Installer Certbot (si pas déjà fait)
sudo apt update
sudo apt install certbot python3-certbot-nginx -y

# Obtenir le certificat SSL
sudo certbot --nginx -d asp-afrique.com -d www.asp-afrique.com

# Suivre les instructions interactives
```

### Étape 10: Vérifications Finales

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

## 🔄 Commandes Utiles

```bash
# Voir les logs PM2
pm2 logs

# Redémarrer les applications
pm2 restart all

# Arrêter les applications
pm2 stop all

# Voir les logs NGINX
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/asp-afrique-access.log
```

## 🆘 En cas de Problème

### Erreur "not a git repository"

**Solution:** Assurez-vous d'être dans `/var/www/asp-afrique`:

```bash
cd /var/www/asp-afrique
```

### Erreur Prisma

```bash
# Réinstaller Prisma
cd packages/db
pnpm install
pnpm prisma generate
```

### Erreur PM2

```bash
# Arrêter PM2
pm2 stop all
pm2 delete all

# Redémarrer
pm2 start ecosystem.config.js
```

### Erreur NGINX

```bash
# Vérifier la configuration
sudo nginx -t

# Voir les erreurs
sudo tail -f /var/log/nginx/error.log
```

---

**Date:** 2025-01-23  
**Répertoire:** `/var/www/asp-afrique`  
**Domaine:** `asp-afrique.com`

