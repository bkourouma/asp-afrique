# 🔍 Débogage de la Page de Login

Suite complète d'outils pour déboguer la page de login avec **Puppeteer** et **Chrome DevTools**.

## 🚀 Démarrage en 3 Étapes

### 1️⃣ Vérifier la Configuration
```bash
node check-setup.js
```

### 2️⃣ Démarrer l'Application
```bash
cd apps/web
pnpm dev
```

### 3️⃣ Lancer le Débogage
```bash
node debug-login-scenarios.js
```

---

## 📖 Documentation

| Document | Description | Durée |
|----------|-------------|-------|
| **[QUICK_START.md](QUICK_START.md)** | Guide de démarrage rapide | 5 min |
| **[LOGIN_DEBUG_TOOLS.md](LOGIN_DEBUG_TOOLS.md)** | Fichier principal | 10 min |
| **[DEBUG_INDEX.md](DEBUG_INDEX.md)** | Index complet | 15 min |
| **[DEBUG_LOGIN_README.md](DEBUG_LOGIN_README.md)** | Guide détaillé | 20 min |
| **[TOOLS_SUMMARY.md](TOOLS_SUMMARY.md)** | Résumé des outils | 10 min |
| **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** | Guide de dépannage | 15 min |
| **[SETUP_COMPLETE.md](SETUP_COMPLETE.md)** | Configuration complète | 5 min |

---

## 🛠️ Outils Disponibles

### Scripts de Débogage

```bash
# Débogage rapide (recommandé)
node debug-login-scenarios.js

# Débogage complet
node debug-all.js

# Débogage basique
node debug-login.js

# Débogage avancé
node debug-login-advanced.js

# Rapport HTML
node generate-debug-report.js

# Test simple
node test-login.js
```

### Lanceurs Interactifs

```bash
# PowerShell
.\start-debug.ps1

# Batch
start-debug.bat
```

### Vérification

```bash
# Vérifier la configuration
node check-setup.js
```

---

## 📊 Rapports Générés

- `debug-report.json` - Rapport basique
- `debug-report-advanced.json` - Rapport avancé
- `debug-report-scenarios.json` - Résultats des tests
- `debug-master-report.json` - Rapport maître
- `debug-report.html` - Rapport HTML interactif

---

## 🎯 Cas d'Usage

### "Je veux déboguer rapidement"
```bash
node debug-login-scenarios.js
```

### "Je veux une analyse complète"
```bash
node debug-all.js
```

### "Je veux une interface interactive"
```bash
.\start-debug.ps1
```

### "Je veux déboguer manuellement"
```bash
node debug-login.js
```

---

## 📋 Scénarios Testés

1. ✅ Chargement de la page
2. ✅ Présence des éléments du formulaire
3. ✅ Soumission du formulaire vide
4. ✅ Email invalide
5. ✅ Boutons de démo (Demo Chips)
6. ✅ Erreurs console
7. ✅ Mot de passe invalide
8. ✅ Connexion avec identifiants valides

---

## 💡 Conseils

1. **Commencez par le débogage rapide**
2. **Consultez les rapports JSON** pour les détails
3. **Générez un rapport HTML** pour une meilleure visualisation
4. **Vérifiez les logs du serveur** en parallèle
5. **Testez manuellement** pour confirmer

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

**Pour plus:** Consultez [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

---

## 📚 Fichiers

### Scripts (6)
- `debug-login.js`
- `debug-login-advanced.js`
- `debug-login-scenarios.js`
- `debug-all.js`
- `generate-debug-report.js`
- `test-login.js`

### Lanceurs (4)
- `start-debug.ps1`
- `start-debug.bat`
- `run-debug.ps1`
- `run-debug.bat`

### Utilitaires (1)
- `check-setup.js`

### Configuration (1)
- `debug-config.json`

### Documentation (8)
- `README_DEBUG.md` (ce fichier)
- `QUICK_START.md`
- `LOGIN_DEBUG_TOOLS.md`
- `DEBUG_INDEX.md`
- `DEBUG_LOGIN_README.md`
- `TOOLS_SUMMARY.md`
- `TROUBLESHOOTING.md`
- `SETUP_COMPLETE.md`

---

## 🚀 Commandes npm

```bash
pnpm debug:check      # Vérifier la configuration
pnpm debug:basic      # Débogage basique
pnpm debug:advanced   # Débogage avancé
pnpm debug:scenarios  # Tests de scénarios
pnpm debug:all        # Tous les tests
pnpm debug:report     # Rapport HTML
pnpm debug:test       # Test simple
```

---

## ✅ Checklist

- [ ] Node.js installé
- [ ] Puppeteer installé
- [ ] Application en cours d'exécution
- [ ] Base de données accessible
- [ ] Utilisateur de test existe

---

## 🎉 Prêt à Déboguer?

```bash
node debug-login-scenarios.js
```

---

**Pour plus d'informations:** Consultez [QUICK_START.md](QUICK_START.md)

**Dernière mise à jour:** 2024-01-15

