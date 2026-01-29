# 🔍 Guide de Débogage de la Page de Login

Ce guide explique comment utiliser les scripts de débogage pour analyser et tester la page de login avec Puppeteer et chrome-devtools.

## 📋 Scripts Disponibles

### 1. **debug-login.js** - Débogage Basique
Script de débogage standard qui capture:
- ✅ Erreurs console
- ✅ Requêtes réseau
- ✅ Réponses API
- ✅ Performances
- ✅ Erreurs de validation

**Utilisation:**
```bash
node debug-login.js
```

**Sortie:**
- Rapport JSON: `debug-report.json`
- Affichage en temps réel dans la console
- Navigateur ouvert pour inspection manuelle

---

### 2. **debug-login-advanced.js** - Débogage Avancé
Script avancé avec inspection détaillée:
- 🔍 Analyse complète du DOM
- 🔍 Analyse des styles CSS
- 🔍 Inspection des événements
- 🔍 Analyse des requêtes API
- 🔍 Inspection des cookies et storage
- 🔍 Analyse des performances

**Utilisation:**
```bash
node debug-login-advanced.js
```

**Sortie:**
- Rapport JSON détaillé: `debug-report-advanced.json`
- Analyse DOM complète
- Analyse réseau détaillée
- Analyse du stockage (localStorage, sessionStorage, cookies)

---

### 3. **debug-login-scenarios.js** - Tests de Scénarios
Script de test automatisé qui teste différents scénarios:
- 📝 Chargement de la page
- 📝 Présence des éléments du formulaire
- 📝 Soumission du formulaire vide
- 📝 Email invalide
- 📝 Boutons de démo (Demo Chips)
- 📝 Erreurs console
- 📝 Mot de passe invalide
- 📝 Connexion avec identifiants valides

**Utilisation:**
```bash
node debug-login-scenarios.js
```

**Sortie:**
- Rapport JSON des scénarios: `debug-report-scenarios.json`
- Résumé des tests dans la console
- Détails de chaque scénario

---

### 4. **test-login.js** - Test Simple (Existant)
Script simple pour tester le flux de connexion complet.

**Utilisation:**
```bash
node test-login.js
```

---

## 🚀 Démarrage Rapide

### Prérequis
1. L'application doit être en cours d'exécution sur `http://localhost:3000`
2. Puppeteer doit être installé (déjà fait)

### Étapes

1. **Démarrer l'application:**
```bash
cd apps/web
pnpm dev
```

2. **Dans un autre terminal, lancer le débogage:**
```bash
# Débogage basique
node debug-login.js

# OU débogage avancé
node debug-login-advanced.js

# OU tests de scénarios
node debug-login-scenarios.js
```

---

## 📊 Interprétation des Rapports

### debug-report.json
```json
{
  "timestamp": "2024-01-15T10:30:00.000Z",
  "summary": {
    "totalLogs": 25,
    "totalErrors": 2,
    "totalNetworkRequests": 15,
    "totalConsoleMessages": 5
  },
  "errors": [...],
  "networkRequests": [...],
  "consoleMessages": [...],
  "performanceMetrics": {...},
  "logs": [...]
}
```

**À vérifier:**
- ✅ `totalErrors` - Doit être 0 ou minimal
- ✅ `totalNetworkRequests` - Vérifier les requêtes d'authentification
- ✅ `performanceMetrics` - Vérifier la mémoire utilisée

### debug-report-advanced.json
```json
{
  "timestamp": "2024-01-15T10:30:00.000Z",
  "pageInfo": {...},
  "domAnalysis": {
    "forms": [...],
    "inputs": [...],
    "buttons": [...],
    "errors": [...],
    "alerts": [...]
  },
  "networkAnalysis": {
    "requests": [...],
    "authRequests": [...],
    "failedRequests": [...]
  },
  "storageAnalysis": {
    "localStorage": [...],
    "sessionStorage": [...],
    "cookies": "..."
  },
  "performanceAnalysis": {...},
  "issues": [...]
}
```

**À vérifier:**
- ✅ `domAnalysis.forms` - Au moins 1 formulaire
- ✅ `domAnalysis.inputs` - Au moins 2 inputs (email, password)
- ✅ `networkAnalysis.authRequests` - Vérifier les requêtes d'auth
- ✅ `issues` - Liste des problèmes détectés

### debug-report-scenarios.json
```json
{
  "timestamp": "2024-01-15T10:30:00.000Z",
  "totalScenarios": 8,
  "passed": 7,
  "failed": 1,
  "scenarios": [
    {
      "name": "Chargement de la page",
      "status": "PASSED",
      "duration": 1234,
      "errors": [],
      "warnings": [],
      "data": {...}
    },
    ...
  ]
}
```

**À vérifier:**
- ✅ `passed` - Doit être égal à `totalScenarios`
- ✅ `failed` - Doit être 0
- ✅ Chaque scénario doit avoir `status: "PASSED"`

---

## 🐛 Problèmes Courants et Solutions

### Problème: "Page not found" ou "Cannot reach localhost:3000"
**Solution:** Assurez-vous que l'application est en cours d'exécution:
```bash
cd apps/web
pnpm dev
```

### Problème: "Timeout waiting for navigation"
**Solution:** Augmentez le timeout dans le script:
```javascript
await page.goto('http://localhost:3000/login', { 
  waitUntil: 'networkidle2',
  timeout: 60000  // 60 secondes au lieu de 30
});
```

### Problème: "Element not found"
**Solution:** Vérifiez que les sélecteurs CSS correspondent:
```javascript
// Vérifier les sélecteurs disponibles
await page.evaluate(() => {
  console.log('Email input:', document.querySelector('input[type="email"]'));
  console.log('Password input:', document.querySelector('input[type="password"]'));
  console.log('Submit button:', document.querySelector('button[type="submit"]'));
});
```

### Problème: Erreurs de connexion
**Solution:** Vérifiez les identifiants dans le rapport:
- Email: `admin@aspc-ci.org`
- Mot de passe: `Admin123!`

Vérifiez aussi que la base de données est accessible et que l'utilisateur existe.

---

## 🔧 Personnalisation des Scripts

### Modifier les identifiants de test
Dans `debug-login.js` ou `debug-login-scenarios.js`:
```javascript
await this.testLoginFlow(page, 'votre-email@example.com', 'votre-mot-de-passe');
```

### Modifier les sélecteurs CSS
Si les sélecteurs ne correspondent pas:
```javascript
// Trouver les bons sélecteurs
const emailInput = await page.$('input[name="email"]');  // ou autre
const passwordInput = await page.$('input[name="password"]');  // ou autre
```

### Ajouter des captures d'écran
```javascript
await page.screenshot({ path: 'login-page.png' });
```

### Ajouter des délais
```javascript
await page.waitForTimeout(5000);  // Attendre 5 secondes
```

---

## 📈 Métriques de Performance

Les scripts capturent les métriques suivantes:

| Métrique | Description | Valeur Idéale |
|----------|-------------|----------------|
| `loadTime` | Temps de chargement de la page | < 3000ms |
| `domContentLoaded` | Temps jusqu'à DOMContentLoaded | < 2000ms |
| `firstContentfulPaint` | Temps du premier paint | < 1500ms |
| `JSHeapUsedSize` | Mémoire JS utilisée | < 50MB |

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

## 📝 Exemples de Sortie

### Sortie Réussie
```
✅ [SUCCESS] Page chargée avec succès
✅ [SUCCESS] Champ email trouvé
✅ [SUCCESS] Champ password trouvé
✅ [SUCCESS] Bouton submit trouvé
✅ [SUCCESS] Email saisi
✅ [SUCCESS] Mot de passe saisi
✅ [SUCCESS] Bouton de connexion cliqué
```

### Sortie avec Erreurs
```
❌ [ERROR] Champ email non trouvé
⚠️  [WARNING] Aucune validation côté client détectée
❌ [ERROR] Requête d'authentification échouée (status: 401)
```

---

## 🔗 Ressources Utiles

- [Puppeteer Documentation](https://pptr.dev/)
- [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [React Hook Form Documentation](https://react-hook-form.com/)

---

## 💡 Conseils

1. **Utilisez le mode headless=false** pour voir ce qui se passe en temps réel
2. **Ajoutez des captures d'écran** pour documenter les problèmes
3. **Vérifiez les logs du serveur** en parallèle
4. **Utilisez les DevTools du navigateur** pour inspecter manuellement
5. **Testez avec différents navigateurs** si possible

---

## 📞 Support

Si vous rencontrez des problèmes:
1. Vérifiez que l'application est en cours d'exécution
2. Consultez les rapports JSON générés
3. Vérifiez les logs du serveur
4. Essayez de naviguer manuellement vers la page de login
5. Vérifiez que la base de données est accessible

---

**Dernière mise à jour:** 2024-01-15

