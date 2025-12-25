# 🚀 Comment Démarrer l'Application

## ⚡ Démarrage Rapide (30 secondes)

### Étape 1: Ouvrir le Terminal
```bash
cd c:\APPLICATIONS\AspCIWeb
```

### Étape 2: Démarrer l'Application
```bash
cd apps/web
pnpm dev
```

### Étape 3: Ouvrir le Navigateur
```
http://localhost:3000
```

**C'est tout!** ✅

---

## 🎯 Trois Options de Démarrage

### Option 1: Interface Interactive (Recommandé)

**Windows Batch:**
```bash
start-app.bat
```

**Windows PowerShell:**
```bash
.\start-app.ps1
```

Puis choisissez une option dans le menu.

---

### Option 2: Frontend Uniquement

```bash
cd apps/web
pnpm dev
```

Accès: **http://localhost:3000**

---

### Option 3: Frontend + Backend

```bash
pnpm dev
```

Accès:
- Frontend: **http://localhost:3000**
- Backend: **http://localhost:3001**

---

## 🔐 Se Connecter

**Email:** `admin@aspc-ci.org`
**Mot de passe:** `Admin123!`

---

## 📋 Prérequis

Avant de démarrer, vérifiez:

```bash
# Vérifier Node.js
node --version
# Doit être 18+

# Vérifier pnpm
pnpm --version
# Doit être 10.14.0+
```

---

## 📦 Installation des Dépendances

Si c'est la première fois:

```bash
# À la racine du projet
pnpm install
```

---

## 🌐 Accès à l'Application

Une fois démarrée, ouvrez votre navigateur:

```
http://localhost:3000
```

---

## 🐛 Dépannage Rapide

### "Port 3000 déjà utilisé"
```bash
cd apps/web
pnpm dev -- -p 3001
```

### "pnpm: command not found"
```bash
npm install -g pnpm
```

### "Module not found"
```bash
pnpm install
```

---

## 📚 Documentation Complète

- **[HOW_TO_START.md](HOW_TO_START.md)** - Guide complet
- **[QUICK_START_APP.md](QUICK_START_APP.md)** - Démarrage rapide
- **[APP_START_GUIDE.txt](APP_START_GUIDE.txt)** - Guide texte

---

## ✅ Checklist

- [ ] Node.js 18+ installé
- [ ] pnpm installé
- [ ] Dépendances installées (`pnpm install`)
- [ ] Frontend démarré (`cd apps/web && pnpm dev`)
- [ ] Application accessible (`http://localhost:3000`)
- [ ] Connexion fonctionnelle

---

## 🎉 Prêt?

```bash
cd apps/web && pnpm dev
```

---

**Dernière mise à jour:** 2024-01-15

**Créé avec ❤️ pour faciliter le démarrage de l'application**

