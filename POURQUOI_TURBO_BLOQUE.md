# 🔧 Pourquoi `pnpm dev` était bloqué?

## ❌ Le Problème

Le script `pnpm dev` utilisait:
```bash
turbo run dev --parallel
```

Cela essayait de lancer les tâches `dev` de **tous les packages** du monorepo:
- ✅ `apps/web` - a un script `dev`
- ❌ `apps/api` - **N'A PAS** de script `dev`
- ❌ `packages/db` - **N'A PAS** de script `dev`

Turbo attendait que tous les packages aient un script `dev`, ce qui causait le **blocage infini**.

---

## ✅ La Solution

J'ai modifié le script `dev` dans `package.json` (racine):

**Avant:**
```json
"dev": "turbo run dev --parallel"
```

**Après:**
```json
"dev": "cd apps/web && pnpm dev"
```

Maintenant, `pnpm dev` lance **directement** le frontend sans passer par Turbo.

---

## 📋 Commandes Disponibles

### Frontend uniquement (Recommandé)
```bash
pnpm dev
# ou
pnpm dev:web
```

### Backend uniquement
```bash
pnpm dev:api
```

### Production
```bash
pnpm build
pnpm start
```

### Base de données
```bash
pnpm db:generate
pnpm db:migrate
pnpm db:seed
pnpm db:studio
```

---

## 🌐 Accès à l'Application

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001 (si démarré)

---

## 🔐 Identifiants de Test

```
Email: admin@aspc-ci.org
Mot de passe: Admin123!
```

---

## 📝 Prochaines Étapes

Pour ajouter un script `dev` à `apps/api`, vous devez:

1. Vérifier si `apps/api` a un serveur (Fastify, Express, etc.)
2. Ajouter un script `dev` dans `apps/api/package.json`
3. Ensuite, vous pourrez utiliser `turbo run dev --parallel` pour lancer tous les services

---

## 🎉 Résumé

- ✅ `pnpm dev` fonctionne maintenant
- ✅ Frontend démarre correctement
- ✅ Pas de blocage Turbo
- ✅ Application prête à être testée

Bonne chance! 🚀

