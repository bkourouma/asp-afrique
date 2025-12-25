# ✅ Réponse: Comment Démarrer l'Application

## ⚡ Réponse Rapide (30 secondes)

```bash
cd apps/web
pnpm dev
```

Puis ouvrez: **http://localhost:3000**

---

## 🎯 Trois Options

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

```bash
# Vérifier Node.js (doit être 18+)
node --version

# Vérifier pnpm (doit être 10.14.0+)
pnpm --version

# Installer les dépendances (si première fois)
pnpm install
```

---

## 🌐 Accès

```
Frontend: http://localhost:3000
Backend: http://localhost:3001 (si démarré)
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

## 📚 Documentation

- **[START_APPLICATION.md](START_APPLICATION.md)** - Guide complet
- **[HOW_TO_START.md](HOW_TO_START.md)** - Guide détaillé
- **[QUICK_START_APP.md](QUICK_START_APP.md)** - Démarrage rapide

---

## ✅ Checklist

- [ ] Node.js 18+ installé
- [ ] pnpm installé
- [ ] Dépendances installées
- [ ] Frontend démarré
- [ ] Application accessible

---

## 🎉 Prêt?

```bash
cd apps/web && pnpm dev
```

---

**Dernière mise à jour:** 2024-01-15

