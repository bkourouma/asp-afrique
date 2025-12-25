# 🚀 Comment Démarrer l'Application

## 📋 Vue d'ensemble

L'application est une **monorepo** avec:
- **apps/web** - Application Next.js 15 (Frontend)
- **apps/api** - API Fastify (Backend)
- **packages/db** - Prisma (Base de données)

---

## ⚡ Démarrage Rapide

### Option 1: Démarrer Uniquement le Frontend (Recommandé pour déboguer)

```bash
cd apps/web
pnpm dev
```

L'application sera disponible à: **http://localhost:3000**

---

### Option 2: Démarrer le Projet Complet (Frontend + Backend)

```bash
# À la racine du projet
pnpm dev
```

Cela démarre:
- Frontend: **http://localhost:3000**
- Backend: **http://localhost:3001** (ou autre port)

---

## 📝 Étapes Détaillées

### 1️⃣ Vérifier les Prérequis

```bash
# Vérifier Node.js
node --version

# Vérifier pnpm
pnpm --version
```

**Versions requises:**
- Node.js: 18+
- pnpm: 10.14.0+

---

### 2️⃣ Installer les Dépendances

```bash
# À la racine du projet
pnpm install
```

---

### 3️⃣ Configurer la Base de Données

```bash
# Aller dans le dossier packages/db
cd packages/db

# Générer le client Prisma
pnpm prisma generate

# Créer/Migrer la base de données
pnpm prisma migrate dev

# Seeder la base de données (optionnel)
pnpm db:seed
```

---

### 4️⃣ Démarrer l'Application

#### Option A: Frontend Uniquement
```bash
cd apps/web
pnpm dev
```

#### Option B: Frontend + Backend
```bash
# À la racine
pnpm dev
```

---

## 🌐 Accéder à l'Application

Une fois démarrée, ouvrez votre navigateur:

```
http://localhost:3000
```

---

## 🔐 Identifiants de Test

**Email:** `admin@aspc-ci.org`
**Mot de passe:** `Admin123!`

---

## 📊 Vérifier que Tout Fonctionne

### 1. Vérifier la Configuration
```bash
node check-setup.js
```

### 2. Vérifier que le Frontend est Accessible
```bash
curl http://localhost:3000
```

### 3. Vérifier les Logs
Regardez la console pour les messages de démarrage.

---

## 🐛 Dépannage

### "Port 3000 déjà utilisé"
```bash
# Trouver le processus utilisant le port
netstat -ano | findstr :3000

# Tuer le processus (remplacer PID)
taskkill /PID <PID> /F

# Ou démarrer sur un autre port
cd apps/web
pnpm dev -- -p 3001
```

### "Module not found"
```bash
# Réinstaller les dépendances
pnpm install
pnpm install --recursive
```

### "Prisma client not found"
```bash
cd packages/db
pnpm prisma generate
```

### "Cannot connect to database"
```bash
# Vérifier la variable d'environnement DATABASE_URL
# Vérifier que la base de données est accessible
cd packages/db
pnpm prisma db push
```

---

## 📚 Fichiers de Configuration

### apps/web/.env.local
```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
DATABASE_URL=your-database-url
```

### apps/api/.env
```
DATABASE_URL=your-database-url
API_PORT=3001
```

---

## 🎯 Prochaines Étapes

Une fois l'application démarrée:

1. **Déboguer la page de login:**
   ```bash
   node debug-login-scenarios.js
   ```

2. **Générer un rapport:**
   ```bash
   node debug-all.js
   ```

3. **Consulter la documentation:**
   - [00_LIRE_MOI_D_ABORD.md](00_LIRE_MOI_D_ABORD.md)
   - [QUICK_START.md](QUICK_START.md)
   - [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

---

## 📖 Commandes Utiles

```bash
# Démarrer le frontend
cd apps/web && pnpm dev

# Démarrer le backend
cd apps/api && pnpm dev

# Démarrer tout
pnpm dev

# Arrêter l'application
Ctrl + C

# Vérifier les logs
pnpm dev --verbose

# Construire pour la production
cd apps/web && pnpm build

# Démarrer en production
cd apps/web && pnpm start
```

---

## ✅ Checklist de Démarrage

- [ ] Node.js 18+ installé
- [ ] pnpm 10.14.0+ installé
- [ ] Dépendances installées (`pnpm install`)
- [ ] Base de données configurée
- [ ] Frontend démarré (`pnpm dev`)
- [ ] Application accessible à http://localhost:3000
- [ ] Identifiants de test fonctionnent

---

## 🎉 Prêt?

```bash
cd apps/web && pnpm dev
```

---

**Dernière mise à jour:** 2024-01-15

**Créé avec ❤️ pour faciliter le démarrage de l'application**

