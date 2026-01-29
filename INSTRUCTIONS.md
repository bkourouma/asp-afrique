# 📋 Instructions - Suite de Débogage

## 🎯 Objectif

Déboguer la page de login avec Puppeteer et Chrome DevTools.

---

## ⚡ 3 Étapes pour Déboguer

### 1️⃣ Vérifier la Configuration
```bash
node check-setup.js
```

### 2️⃣ Démarrer l'Application
```bash
cd apps/web && pnpm dev
```

### 3️⃣ Lancer le Débogage
```bash
node debug-login-scenarios.js
```

---

## 📖 Fichiers à Lire

### Commencez par:
1. **[00_LIRE_MOI_D_ABORD.md](00_LIRE_MOI_D_ABORD.md)** - 2 min
2. **[INDEX.md](INDEX.md)** - 2 min
3. **[START_HERE.md](START_HERE.md)** - 2 min

### Puis consultez:
1. **[QUICK_START.md](QUICK_START.md)** - 5 min
2. **[README_DEBUG.md](README_DEBUG.md)** - 5 min
3. **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - 15 min

---

## 🛠️ Outils Disponibles

### Débogage Rapide
```bash
node debug-login-scenarios.js
```

### Débogage Complet
```bash
node debug-all.js
```

### Interface Interactive
```bash
.\start-debug.ps1
start-debug.bat
```

### Via npm
```bash
pnpm debug:scenarios
pnpm debug:all
pnpm debug:report
```

---

## 📊 Résultats

Vous verrez:
- ✅ Résumé en temps réel
- ✅ Rapport JSON détaillé
- ✅ 8 scénarios testés

---

## 💡 Conseils

1. Commencez par le débogage rapide
2. Consultez les rapports JSON
3. Générez un rapport HTML
4. Vérifiez les logs du serveur
5. Testez manuellement

---

## 🐛 Dépannage Rapide

### "Cannot reach localhost:3000"
```bash
cd apps/web && pnpm dev
```

### "Element not found"
Vérifiez les sélecteurs CSS dans `debug-config.json`

### "Invalid credentials"
```bash
cd packages/db && pnpm db:seed
```

---

## ✅ Checklist

- [ ] Lire 00_LIRE_MOI_D_ABORD.md
- [ ] Exécuter check-setup.js
- [ ] Démarrer l'application
- [ ] Exécuter debug-login-scenarios.js
- [ ] Consulter les résultats

---

## 🎉 Prêt?

```bash
node debug-login-scenarios.js
```

---

**Dernière mise à jour:** 2024-01-15

**Créé avec ❤️ pour faciliter le débogage de la page de login**

