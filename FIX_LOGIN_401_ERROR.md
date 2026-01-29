# 🔧 Correction de l'erreur 401 lors de la connexion

## ❌ Problème

Vous recevez une erreur **401 (Unauthorized)** lors de la tentative de connexion :
```
POST http://localhost:3000/api/auth/callback/credentials 401 (Unauthorized)
Login result: {error: 'CredentialsSignin', status: 401, ok: false, url: null}
```

## 🔍 Cause

L'erreur 401 indique que NextAuth ne peut pas authentifier l'utilisateur. Les causes possibles sont :

1. **L'API backend n'est pas démarrée** (cause la plus fréquente)
2. L'API backend n'est pas accessible sur le port attendu (3002 en développement, 3004 en production)
3. Les identifiants sont incorrects
4. La base de données n'est pas accessible
5. L'utilisateur admin n'existe pas dans la base de données

## ✅ Solution étape par étape

### Étape 1 : Vérifier que l'API backend est démarrée

**En développement :**

Ouvrez un **nouveau terminal** et exécutez :

```powershell
# Naviguer vers le dossier API
cd apps/api

# Démarrer l'API
pnpm dev
```

L'API devrait démarrer sur le port **3002** et afficher :
```
✅ Server running at http://0.0.0.0:3002
```

**En production :**

Vérifiez que l'API est démarrée avec PM2 :
```bash
pm2 status
pm2 logs asp-afrique-api
```

### Étape 2 : Vérifier l'accessibilité de l'API

Exécutez le script de diagnostic :

```powershell
cd apps/web
node check-auth-setup.js
```

Ce script va :
- Vérifier la configuration
- Tester la connexion à l'API
- Vous indiquer exactement quel est le problème

### Étape 3 : Vérifier les identifiants par défaut

Les identifiants par défaut sont :
- **Email** : `admin@aspc-ci.org`
- **Mot de passe** : `Admin123!`

### Étape 4 : Créer l'utilisateur admin si nécessaire

Si l'utilisateur admin n'existe pas dans la base de données, créez-le :

```powershell
# Depuis la racine du projet
cd packages/db
pnpm db:seed
```

Ou exécutez directement le script de création :

```powershell
node create-admin-direct.js
```

### Étape 5 : Vérifier les logs

**Logs du serveur Next.js :**

Dans le terminal où Next.js est démarré, vous devriez voir des logs détaillés :
```
🔐 Attempting authentication: { apiUrl: '...', email: '...', nodeEnv: '...' }
📡 Auth API response: { status: ..., statusText: '...', ok: ... }
```

Si vous voyez :
- `❌ Auth error: { error: 'connect ECONNREFUSED ...' }` → L'API n'est pas démarrée
- `❌ Auth failed: { status: 401, ... }` → Les identifiants sont incorrects
- `✅ Auth successful: { userId: '...', ... }` → L'authentification fonctionne

## 🚀 Démarrage complet de l'application

Pour démarrer l'application complète (frontend + backend) :

### Option 1 : Scripts de démarrage

```powershell
# Démarrer frontend et backend ensemble
.\start-frontend-backend.ps1
```

### Option 2 : Terminaux séparés

**Terminal 1 - Backend API :**
```powershell
cd apps/api
pnpm dev
```

**Terminal 2 - Frontend Next.js :**
```powershell
cd apps/web
pnpm dev
```

## 🔍 Diagnostic avancé

### Vérifier que le port 3002 est libre

```powershell
netstat -ano | findstr :3002
```

Si le port est utilisé, soit :
- Arrêtez le processus qui l'utilise
- Changez le port dans `apps/api/.env` (variable `API_PORT`)

### Vérifier la configuration de l'API

Vérifiez le fichier `apps/api/.env` :
```env
API_PORT=3002
DATABASE_URL=postgresql://...
```

### Vérifier la configuration NextAuth

Vérifiez le fichier `apps/web/.env.local` :
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=votre-secret-key
```

## 📝 Améliorations apportées

1. ✅ **Logs détaillés** dans `apps/web/src/lib/auth/config.ts`
   - Affiche l'URL de l'API utilisée
   - Affiche le statut de la réponse
   - Affiche les erreurs détaillées

2. ✅ **Messages d'erreur améliorés** dans la page de login
   - Message plus clair pour l'erreur CredentialsSignin
   - Indique que l'API backend doit être démarrée

3. ✅ **Script de diagnostic** (`apps/web/check-auth-setup.js`)
   - Teste automatiquement la connexion à l'API
   - Vérifie la configuration
   - Donne des solutions spécifiques

## 🎯 Checklist de résolution

- [ ] L'API backend est démarrée sur le port 3002 (ou 3004 en production)
- [ ] Le script de diagnostic confirme que l'API est accessible
- [ ] Les identifiants utilisés sont corrects (`admin@aspc-ci.org` / `Admin123!`)
- [ ] L'utilisateur admin existe dans la base de données
- [ ] Les logs du serveur Next.js montrent des tentatives de connexion
- [ ] La base de données est accessible et fonctionnelle

## 💡 Prochaines étapes

Une fois l'API démarrée et accessible :

1. Réessayez de vous connecter avec les identifiants par défaut
2. Vérifiez les logs dans le terminal du serveur Next.js
3. Si l'erreur persiste, vérifiez les logs de l'API backend

## 📞 Support

Si le problème persiste après avoir suivi ces étapes :

1. Exécutez le script de diagnostic : `node apps/web/check-auth-setup.js`
2. Copiez les logs du serveur Next.js et de l'API backend
3. Vérifiez que tous les services sont démarrés correctement

---

**Dernière mise à jour** : Après correction de l'erreur 401
