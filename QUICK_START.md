# 🚀 Guide de Démarrage Rapide - Débogage de la Page de Login

## ⚡ 5 Minutes pour Déboguer

### Étape 1: Démarrer l'Application
```bash
cd apps/web
pnpm dev
```
Attendez que l'application soit disponible sur `http://localhost:3000`

### Étape 2: Lancer le Débogage
Dans un autre terminal, à la racine du projet:

**Option A - Windows (Batch):**
```bash
run-debug.bat scenarios
```

**Option B - Windows (PowerShell):**
```powershell
.\run-debug.ps1 -Option scenarios
```

**Option C - Tous les systèmes (Node.js):**
```bash
node debug-login-scenarios.js
```

### Étape 3: Consulter les Résultats
Les rapports sont générés automatiquement:
- `debug-report-scenarios.json` - Résultats détaillés en JSON
- Console - Résumé en temps réel

### Étape 4: Générer un Rapport HTML (Optionnel)
```bash
node generate-debug-report.js
```
Ouvrez `debug-report.html` dans votre navigateur.

---

## 📊 Comprendre les Résultats

### ✅ Tout fonctionne
```
✅ [SUCCESS] Chargement de la page (1234ms)
✅ [SUCCESS] Présence des éléments du formulaire
✅ [SUCCESS] Soumission du formulaire vide
✅ [SUCCESS] Email invalide
✅ [SUCCESS] Boutons de démo (Demo Chips)
✅ [SUCCESS] Erreurs console
✅ [SUCCESS] Connexion avec mot de passe invalide
✅ [SUCCESS] Connexion avec identifiants valides
```

### ⚠️ Problèmes Détectés
```
❌ [ERROR] Champ email non trouvé
⚠️  [WARNING] Aucune validation côté client détectée
❌ [ERROR] Requête d'authentification échouée (status: 401)
```

---

## 🔧 Personnalisation

### Modifier les Identifiants
Éditez `debug-config.json`:
```json
{
  "credentials": {
    "email": "votre-email@example.com",
    "password": "votre-mot-de-passe"
  }
}
```

### Modifier les Sélecteurs CSS
Si les sélecteurs ne correspondent pas, éditez `debug-config.json`:
```json
{
  "selectors": {
    "emailInput": "input[name=\"email\"]",
    "passwordInput": "input[name=\"password\"]"
  }
}
```

### Activer les Captures d'Écran
Éditez `debug-config.json`:
```json
{
  "logging": {
    "captureScreenshots": true,
    "screenshotPath": "./screenshots"
  }
}
```

---

## 📋 Scripts Disponibles

| Script | Description | Commande |
|--------|-------------|----------|
| `debug-login.js` | Débogage basique | `node debug-login.js` |
| `debug-login-advanced.js` | Débogage avancé | `node debug-login-advanced.js` |
| `debug-login-scenarios.js` | Tests de scénarios | `node debug-login-scenarios.js` |
| `generate-debug-report.js` | Rapport HTML | `node generate-debug-report.js` |
| `test-login.js` | Test simple | `node test-login.js` |

---

## 🐛 Problèmes Courants

### "Cannot reach localhost:3000"
✅ **Solution:** Assurez-vous que l'application est en cours d'exécution:
```bash
cd apps/web
pnpm dev
```

### "Element not found"
✅ **Solution:** Vérifiez les sélecteurs CSS dans `debug-config.json`

### "Timeout waiting for navigation"
✅ **Solution:** Augmentez le timeout dans le script ou vérifiez la connexion réseau

### "Invalid credentials"
✅ **Solution:** Vérifiez que l'utilisateur existe dans la base de données:
```bash
cd packages/db
pnpm db:seed
```

---

## 📈 Interprétation des Rapports

### Rapport Basique (debug-report.json)
- **totalErrors**: Nombre d'erreurs détectées
- **totalNetworkRequests**: Nombre de requêtes réseau
- **totalConsoleMessages**: Messages console

### Rapport Avancé (debug-report-advanced.json)
- **domAnalysis**: Structure du DOM
- **networkAnalysis**: Détails des requêtes
- **storageAnalysis**: Cookies et storage
- **performanceAnalysis**: Métriques de performance

### Rapport Scénarios (debug-report-scenarios.json)
- **passed**: Nombre de scénarios réussis
- **failed**: Nombre de scénarios échoués
- **scenarios**: Détails de chaque scénario

---

## 🎯 Checklist de Débogage

- [ ] La page se charge sans erreur
- [ ] Tous les éléments du formulaire sont présents
- [ ] La validation côté client fonctionne
- [ ] Les messages d'erreur s'affichent correctement
- [ ] Les requêtes d'authentification sont envoyées
- [ ] La redirection fonctionne après connexion réussie
- [ ] Les erreurs de connexion s'affichent correctement
- [ ] Les boutons de démo remplissent le formulaire
- [ ] Pas d'erreurs console
- [ ] Les performances sont acceptables

---

## 💡 Conseils

1. **Utilisez le mode headless=false** pour voir ce qui se passe
2. **Consultez les rapports JSON** pour les détails
3. **Vérifiez les logs du serveur** en parallèle
4. **Testez manuellement** pour confirmer les résultats
5. **Générez un rapport HTML** pour une meilleure visualisation

---

## 📞 Besoin d'Aide?

1. Consultez `DEBUG_LOGIN_README.md` pour plus de détails
2. Vérifiez les rapports JSON générés
3. Inspectez manuellement la page avec les DevTools du navigateur
4. Vérifiez que la base de données est accessible

---

**Prêt à déboguer? Lancez:**
```bash
node debug-login-scenarios.js
```

