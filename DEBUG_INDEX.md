# 🔍 Index Complet - Débogage de la Page de Login

## 📚 Documentation

### 🚀 Pour Commencer
- **[QUICK_START.md](QUICK_START.md)** - Guide de démarrage rapide (5 minutes)
- **[DEBUG_LOGIN_README.md](DEBUG_LOGIN_README.md)** - Guide complet et détaillé

### 📋 Fichiers de Configuration
- **[debug-config.json](debug-config.json)** - Configuration des tests

---

## 🛠️ Scripts Disponibles

### 1. **debug-login.js** - Débogage Basique
Capture les informations essentielles sur la page de login.

**Utilisation:**
```bash
node debug-login.js
```

**Sortie:**
- `debug-report.json` - Rapport JSON
- Console - Affichage en temps réel
- Navigateur - Inspection manuelle

**Capture:**
- ✅ Erreurs console
- ✅ Requêtes réseau
- ✅ Réponses API
- ✅ Performances
- ✅ Erreurs de validation

---

### 2. **debug-login-advanced.js** - Débogage Avancé
Analyse détaillée du DOM, réseau, stockage et performances.

**Utilisation:**
```bash
node debug-login-advanced.js
```

**Sortie:**
- `debug-report-advanced.json` - Rapport détaillé
- Console - Affichage en temps réel

**Capture:**
- 🔍 Analyse complète du DOM
- 🔍 Analyse des styles CSS
- 🔍 Inspection des événements
- 🔍 Analyse des requêtes API
- 🔍 Inspection des cookies et storage
- 🔍 Analyse des performances

---

### 3. **debug-login-scenarios.js** - Tests de Scénarios
Tests automatisés de différents scénarios de connexion.

**Utilisation:**
```bash
node debug-login-scenarios.js
```

**Sortie:**
- `debug-report-scenarios.json` - Résultats des tests
- Console - Résumé des tests

**Scénarios Testés:**
1. Chargement de la page
2. Présence des éléments du formulaire
3. Soumission du formulaire vide
4. Email invalide
5. Boutons de démo (Demo Chips)
6. Erreurs console
7. Mot de passe invalide
8. Connexion avec identifiants valides

---

### 4. **debug-all.js** - Exécution Complète
Exécute tous les tests et génère un rapport maître.

**Utilisation:**
```bash
node debug-all.js
```

**Exécute:**
1. Débogage basique
2. Débogage avancé
3. Tests de scénarios
4. Génération du rapport HTML

**Sortie:**
- `debug-master-report.json` - Rapport maître
- Tous les rapports individuels
- `debug-report.html` - Rapport HTML interactif

---

### 5. **generate-debug-report.js** - Rapport HTML
Génère un rapport HTML interactif à partir des rapports JSON.

**Utilisation:**
```bash
node generate-debug-report.js
```

**Sortie:**
- `debug-report.html` - Rapport HTML interactif

---

### 6. **test-login.js** - Test Simple (Existant)
Script simple pour tester le flux de connexion complet.

**Utilisation:**
```bash
node test-login.js
```

---

## 🚀 Lanceurs

### Windows (Batch)
```bash
run-debug.bat [option]
```

**Options:**
- `basic` - Débogage basique
- `advanced` - Débogage avancé
- `scenarios` - Tests de scénarios
- `all` - Tous les tests

**Exemple:**
```bash
run-debug.bat scenarios
```

### Windows (PowerShell)
```powershell
.\run-debug.ps1 -Option [basic|advanced|scenarios|all]
```

**Exemple:**
```powershell
.\run-debug.ps1 -Option scenarios
```

---

## 📊 Rapports Générés

### debug-report.json
Rapport basique avec:
- Résumé des erreurs
- Requêtes réseau
- Messages console
- Métriques de performance

### debug-report-advanced.json
Rapport avancé avec:
- Analyse DOM complète
- Analyse réseau détaillée
- Inspection du stockage
- Analyse des performances
- Problèmes détectés

### debug-report-scenarios.json
Résultats des tests avec:
- Statut de chaque scénario
- Durée d'exécution
- Erreurs et avertissements
- Données de test

### debug-master-report.json
Rapport maître avec:
- Résumé de l'exécution
- Statut de tous les scripts
- Rapports générés
- Timestamps

### debug-report.html
Rapport HTML interactif avec:
- Onglets pour chaque rapport
- Visualisation des données
- Graphiques et tableaux
- Design responsive

---

## 🎯 Flux de Débogage Recommandé

### Étape 1: Démarrer l'Application
```bash
cd apps/web
pnpm dev
```

### Étape 2: Lancer le Débogage Rapide
```bash
node debug-login-scenarios.js
```

### Étape 3: Consulter les Résultats
- Vérifier la console pour les résumés
- Consulter `debug-report-scenarios.json` pour les détails

### Étape 4: Débogage Approfondi (si nécessaire)
```bash
node debug-login-advanced.js
```

### Étape 5: Générer un Rapport HTML
```bash
node generate-debug-report.js
```

### Étape 6: Consulter le Rapport HTML
Ouvrez `debug-report.html` dans votre navigateur.

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
Éditez `debug-config.json`:
```json
{
  "selectors": {
    "emailInput": "input[name=\"email\"]",
    "passwordInput": "input[name=\"password\"]",
    "submitButton": "button[type=\"submit\"]"
  }
}
```

### Modifier l'URL de l'Application
Éditez `debug-config.json`:
```json
{
  "application": {
    "url": "http://localhost:3000",
    "loginPath": "/login"
  }
}
```

---

## 📈 Interprétation des Résultats

### ✅ Tout Fonctionne
- Tous les scénarios réussissent
- Aucune erreur console
- Pas de requêtes échouées
- Performances acceptables

### ⚠️ Avertissements
- Validation côté client manquante
- Messages d'erreur non visibles
- Boutons de démo non fonctionnels
- Performances dégradées

### ❌ Erreurs
- Éléments du formulaire manquants
- Erreurs console
- Requêtes échouées
- Redirection non fonctionnelle

---

## 🐛 Dépannage

### "Cannot reach localhost:3000"
```bash
cd apps/web
pnpm dev
```

### "Element not found"
Vérifiez les sélecteurs CSS dans `debug-config.json`

### "Timeout waiting for navigation"
Augmentez le timeout dans le script ou vérifiez la connexion réseau

### "Invalid credentials"
Vérifiez que l'utilisateur existe dans la base de données:
```bash
cd packages/db
pnpm db:seed
```

---

## 📋 Checklist de Débogage

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

## 🔗 Ressources Utiles

- [Puppeteer Documentation](https://pptr.dev/)
- [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [React Hook Form Documentation](https://react-hook-form.com/)

---

## 📞 Support

Si vous rencontrez des problèmes:
1. Consultez [QUICK_START.md](QUICK_START.md)
2. Consultez [DEBUG_LOGIN_README.md](DEBUG_LOGIN_README.md)
3. Vérifiez les rapports JSON générés
4. Vérifiez les logs du serveur
5. Essayez de naviguer manuellement vers la page de login

---

## 📝 Résumé des Fichiers

| Fichier | Description |
|---------|-------------|
| `debug-login.js` | Débogage basique |
| `debug-login-advanced.js` | Débogage avancé |
| `debug-login-scenarios.js` | Tests de scénarios |
| `debug-all.js` | Exécution complète |
| `generate-debug-report.js` | Rapport HTML |
| `test-login.js` | Test simple |
| `run-debug.bat` | Lanceur Windows (Batch) |
| `run-debug.ps1` | Lanceur Windows (PowerShell) |
| `debug-config.json` | Configuration |
| `DEBUG_LOGIN_README.md` | Guide complet |
| `QUICK_START.md` | Guide rapide |
| `DEBUG_INDEX.md` | Ce fichier |

---

**Dernière mise à jour:** 2024-01-15

**Prêt à déboguer? Commencez par:**
```bash
node debug-login-scenarios.js
```

