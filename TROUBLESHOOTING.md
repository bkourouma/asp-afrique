# 🔧 Guide de Dépannage

## 🚨 Problèmes Courants et Solutions

### 1. "Cannot reach localhost:3000"

**Symptôme:**
```
❌ Error: connect ECONNREFUSED 127.0.0.1:3000
```

**Causes Possibles:**
- L'application n'est pas en cours d'exécution
- L'application s'est arrêtée
- Le port 3000 est utilisé par une autre application

**Solutions:**

**Solution 1: Démarrer l'application**
```bash
cd apps/web
pnpm dev
```

**Solution 2: Vérifier si le port est utilisé**
```bash
# Windows
netstat -ano | findstr :3000

# Linux/Mac
lsof -i :3000
```

**Solution 3: Tuer le processus qui utilise le port**
```bash
# Windows
taskkill /PID <PID> /F

# Linux/Mac
kill -9 <PID>
```

**Solution 4: Utiliser un port différent**
```bash
cd apps/web
pnpm dev -- -p 3001
```

---

### 2. "Element not found"

**Symptôme:**
```
❌ Error: No element found for selector 'input[type="email"]'
```

**Causes Possibles:**
- Les sélecteurs CSS ne correspondent pas
- La page n'a pas fini de charger
- Les éléments sont cachés ou supprimés

**Solutions:**

**Solution 1: Vérifier les sélecteurs**
```bash
# Ouvrir la page dans le navigateur et inspecter les éléments
# Vérifier que les sélecteurs correspondent
```

**Solution 2: Mettre à jour debug-config.json**
```json
{
  "selectors": {
    "emailInput": "input[name=\"email\"]",
    "passwordInput": "input[name=\"password\"]",
    "submitButton": "button[type=\"submit\"]"
  }
}
```

**Solution 3: Augmenter le timeout**
```javascript
await page.waitForSelector('input[type="email"]', { timeout: 10000 });
```

**Solution 4: Vérifier que la page a chargé**
```bash
# Ajouter des logs pour vérifier le chargement
console.log('Page URL:', page.url());
console.log('Page title:', await page.title());
```

---

### 3. "Timeout waiting for navigation"

**Symptôme:**
```
❌ Error: Timeout waiting for navigation
```

**Causes Possibles:**
- La page met trop de temps à charger
- La connexion réseau est lente
- Le serveur ne répond pas

**Solutions:**

**Solution 1: Augmenter le timeout**
```javascript
await page.goto('http://localhost:3000/login', { 
  waitUntil: 'networkidle2',
  timeout: 60000  // 60 secondes au lieu de 30
});
```

**Solution 2: Utiliser un waitUntil différent**
```javascript
// Au lieu de 'networkidle2'
await page.goto('http://localhost:3000/login', { 
  waitUntil: 'domcontentloaded'  // Plus rapide
});
```

**Solution 3: Vérifier la connexion réseau**
```bash
# Vérifier que vous pouvez accéder à l'URL
curl http://localhost:3000/login
```

**Solution 4: Vérifier les logs du serveur**
```bash
# Vérifier que le serveur n'a pas d'erreurs
# Regarder la console où vous avez lancé 'pnpm dev'
```

---

### 4. "Invalid credentials"

**Symptôme:**
```
❌ [ERROR] Connexion échouée ou redirection inattendue
```

**Causes Possibles:**
- L'utilisateur n'existe pas dans la base de données
- Le mot de passe est incorrect
- La base de données n'est pas accessible

**Solutions:**

**Solution 1: Vérifier que l'utilisateur existe**
```bash
# Vérifier dans la base de données
# Ou consulter les logs du serveur
```

**Solution 2: Réinitialiser la base de données**
```bash
cd packages/db
pnpm db:reset
pnpm db:seed
```

**Solution 3: Vérifier les identifiants**
```bash
# Vérifier dans debug-config.json
# Email: admin@aspc-ci.org
# Mot de passe: Admin123!
```

**Solution 4: Vérifier la connexion à la base de données**
```bash
# Vérifier que PostgreSQL est en cours d'exécution
# Vérifier que DATABASE_URL est correct dans .env.local
```

---

### 5. "Puppeteer not found"

**Symptôme:**
```
❌ Error: Cannot find module 'puppeteer'
```

**Causes Possibles:**
- Puppeteer n'est pas installé
- Les dépendances n'ont pas été installées

**Solutions:**

**Solution 1: Installer les dépendances**
```bash
pnpm install
```

**Solution 2: Installer Puppeteer spécifiquement**
```bash
pnpm add puppeteer
```

**Solution 3: Vérifier l'installation**
```bash
node -e "console.log(require('puppeteer').executablePath())"
```

---

### 6. "No reports generated"

**Symptôme:**
```
⚠️  Aucun rapport trouvé
```

**Causes Possibles:**
- Les scripts n'ont pas été exécutés
- Les scripts ont échoué
- Les rapports n'ont pas été générés

**Solutions:**

**Solution 1: Vérifier que les scripts existent**
```bash
ls -la debug-*.js
```

**Solution 2: Exécuter les scripts manuellement**
```bash
node debug-login-scenarios.js
```

**Solution 3: Vérifier les erreurs**
```bash
# Regarder la console pour les erreurs
# Vérifier que l'application est en cours d'exécution
```

**Solution 4: Vérifier les permissions**
```bash
# Vérifier que vous avez les permissions d'écriture
# Vérifier que le répertoire n'est pas protégé
```

---

### 7. "Browser crashed"

**Symptôme:**
```
❌ Error: Browser crashed
```

**Causes Possibles:**
- Manque de mémoire
- Problème avec le système
- Conflit avec d'autres processus

**Solutions:**

**Solution 1: Fermer les autres applications**
```bash
# Fermer les navigateurs et autres applications
# Libérer de la mémoire
```

**Solution 2: Utiliser le mode headless**
```javascript
const browser = await puppeteer.launch({
  headless: true  // Au lieu de false
});
```

**Solution 3: Augmenter la mémoire disponible**
```bash
# Vérifier la mémoire disponible
# Fermer les applications inutiles
```

**Solution 4: Utiliser des arguments de lancement**
```javascript
const browser = await puppeteer.launch({
  args: [
    '--disable-dev-shm-usage',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check'
  ]
});
```

---

### 8. "Form validation not working"

**Symptôme:**
```
⚠️  Aucune validation côté client détectée
```

**Causes Possibles:**
- La validation n'est pas implémentée
- La validation est côté serveur uniquement
- Les messages d'erreur ne s'affichent pas

**Solutions:**

**Solution 1: Vérifier le code du formulaire**
```bash
# Vérifier apps/web/src/app/(auth)/login/page.tsx
# Vérifier que la validation est implémentée
```

**Solution 2: Vérifier les sélecteurs des messages d'erreur**
```javascript
// Vérifier que les messages d'erreur utilisent la bonne classe
const errors = await page.$$('.text-red-600');
```

**Solution 3: Ajouter une validation côté client**
```javascript
// Si la validation n'existe pas, l'ajouter
// Utiliser react-hook-form ou zod
```

---

### 9. "Network requests failing"

**Symptôme:**
```
❌ Requêtes échouées: 401, 403, 500
```

**Causes Possibles:**
- L'API n'est pas accessible
- L'authentification échoue
- Le serveur a une erreur

**Solutions:**

**Solution 1: Vérifier que l'API est en cours d'exécution**
```bash
# Vérifier que le serveur API est en cours d'exécution
# Vérifier les logs du serveur
```

**Solution 2: Vérifier les logs du serveur**
```bash
# Regarder la console du serveur pour les erreurs
# Vérifier les logs de la base de données
```

**Solution 3: Tester l'API manuellement**
```bash
# Utiliser curl ou Postman
curl -X POST http://localhost:3001/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@aspc-ci.org","password":"Admin123!"}'
```

**Solution 4: Vérifier la configuration CORS**
```bash
# Vérifier que CORS est configuré correctement
# Vérifier que les headers sont corrects
```

---

### 10. "Performance issues"

**Symptôme:**
```
⚠️  Temps de chargement: 5000ms (> 3000ms)
```

**Causes Possibles:**
- La page est trop lourde
- Le serveur est lent
- La connexion réseau est lente

**Solutions:**

**Solution 1: Vérifier les performances du serveur**
```bash
# Vérifier les logs du serveur
# Vérifier l'utilisation CPU et mémoire
```

**Solution 2: Optimiser la page**
```bash
# Vérifier les assets (CSS, JS, images)
# Minifier les fichiers
# Utiliser la compression gzip
```

**Solution 3: Vérifier la connexion réseau**
```bash
# Vérifier la vitesse de la connexion
# Utiliser un VPN si nécessaire
```

**Solution 4: Utiliser le cache**
```bash
# Vérifier que le cache est configuré
# Vérifier les headers de cache
```

---

## 🔍 Débogage Avancé

### Activer les logs détaillés

**Dans debug-login.js:**
```javascript
page.on('console', msg => {
  console.log('PAGE LOG:', msg.text());
});

page.on('pageerror', error => {
  console.log('PAGE ERROR:', error);
});
```

### Capturer des captures d'écran

**Ajouter au script:**
```javascript
await page.screenshot({ path: 'screenshot.png' });
```

### Inspecter le DOM

**Ajouter au script:**
```javascript
const html = await page.content();
console.log(html);
```

### Vérifier les cookies

**Ajouter au script:**
```javascript
const cookies = await page.cookies();
console.log('Cookies:', cookies);
```

### Vérifier le localStorage

**Ajouter au script:**
```javascript
const storage = await page.evaluate(() => {
  return Object.entries(localStorage).map(([key, value]) => ({
    key,
    value
  }));
});
console.log('LocalStorage:', storage);
```

---

## 📋 Checklist de Dépannage

- [ ] L'application est-elle en cours d'exécution?
- [ ] Pouvez-vous accéder à http://localhost:3000 dans le navigateur?
- [ ] Les dépendances sont-elles installées?
- [ ] Puppeteer est-il installé?
- [ ] La base de données est-elle accessible?
- [ ] L'utilisateur de test existe-t-il?
- [ ] Les sélecteurs CSS sont-ils corrects?
- [ ] Y a-t-il des erreurs console?
- [ ] Y a-t-il des erreurs serveur?
- [ ] La mémoire est-elle suffisante?

---

## 🆘 Besoin d'Aide?

1. **Consultez la documentation:**
   - [DEBUG_INDEX.md](DEBUG_INDEX.md)
   - [DEBUG_LOGIN_README.md](DEBUG_LOGIN_README.md)
   - [QUICK_START.md](QUICK_START.md)

2. **Vérifiez les rapports:**
   - `debug-report.json`
   - `debug-report-advanced.json`
   - `debug-report-scenarios.json`

3. **Vérifiez les logs:**
   - Console du script
   - Logs du serveur
   - Logs de la base de données

4. **Testez manuellement:**
   - Ouvrez la page dans le navigateur
   - Utilisez les DevTools
   - Testez le formulaire

5. **Contactez le support:**
   - Consultez les ressources en ligne
   - Vérifiez les issues GitHub
   - Demandez de l'aide

---

**Dernière mise à jour:** 2024-01-15

