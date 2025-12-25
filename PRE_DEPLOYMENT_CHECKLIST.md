# ✅ Checklist Pré-Déploiement

## ⚠️ IMPORTANT : Vérifiez localement avant de push!

Cette checklist vous aide à éviter les erreurs de build sur le serveur.

## 🔧 Avant chaque push vers Git

### 1. Vérifications TypeScript

```bash
# Dans la racine du projet
pnpm --filter web exec tsc --noEmit
```

**Vérifiez :**
- [ ] Pas d'erreurs TypeScript
- [ ] Tous les types sont corrects
- [ ] Les imports sont valides

### 2. Build Local

```bash
# Build complet
pnpm build
```

**Vérifiez :**
- [ ] API build réussit (`apps/api` compile sans erreur)
- [ ] Web build réussit (`apps/web` compile sans erreur)
- [ ] Pas d'erreurs de compilation

### 3. Vérifications d'Imports

```bash
# Vérifier les imports incorrects
grep -r "@packages/db" apps/web/src --include="*.ts" --include="*.tsx"
```

**Corrections nécessaires :**
- ❌ `import { prisma } from '@packages/db'` dans `apps/web/src`
- ✅ `import { prisma } from '@/lib/prisma'` dans `apps/web/src`
- ✅ `import { prisma } from '@packages/db'` dans `apps/api/src` (correct)

### 4. Vérifications Next.js 15

**Routes API dynamiques :**
- [ ] Les `params` sont typés comme `Promise<{ id: string }>` (pas `{ id: string }`)
- [ ] Utilisation de `await params` avant d'accéder aux propriétés

**Cookies :**
- [ ] `cookies()` est awaité : `await cookies()`

**useParams :**
- [ ] Vérification null-safe : `params && params.slug` ou `params?.slug`

**IP Address :**
- [ ] Pas d'utilisation de `request.ip` (n'existe pas dans Next.js 15)
- [ ] Utilisation de headers : `request.headers.get('x-forwarded-for')`

### 5. Composants UI Manquants

**Vérifiez que tous les composants importés existent :**

```bash
# Liste des composants UI requis
ls apps/web/src/components/ui/
```

**Composants souvent manquants :**
- `separator.tsx` - Créer si utilisé, ou supprimer l'import

### 6. Types Video

**Vérifiez que le type `Video` inclut toutes les propriétés utilisées :**

```typescript
// Dans apps/web/src/types/video.ts
export interface Video {
  // ... autres propriétés
  status: VideoStatus
  level?: VideoLevel  // ← Important si utilisé
  // ...
}
```

### 7. Fonctions API

**Vérifiez que les fonctions API supportent les génériques TypeScript :**

```typescript
// Dans apps/web/src/lib/api-client.ts
export async function apiGet<T = any>(url: string, params?: Record<string, any>): Promise<T>
export async function apiPost<T = any>(url: string, data: any): Promise<T>
export async function apiPut<T = any>(url: string, data: any): Promise<T>
export async function apiDelete<T = any>(url: string): Promise<T>
```

### 8. Prisma dans Next.js

**Dans `apps/web/src` :**
- ✅ Utilisez `@/lib/prisma` (instance locale)
- ❌ N'utilisez PAS `@packages/db` directement

**Dans `apps/api/src` :**
- ✅ Utilisez `@packages/db` (correct pour le backend)

### 9. JWT Functions

**Vérifiez l'utilisation correcte :**
- `verifyRefreshToken(token)` - Retourne `JWTPayload | null` (synchronous)
- `validateRefreshToken(token, userId)` - Retourne `Promise<boolean>` (async, valide en DB)

### 10. ESLint Configuration

**Dans `next.config.ts` :**
- Optionnel : `eslint: { ignoreDuringBuilds: true }` pour éviter les erreurs ESLint pendant le build

## 🚀 Script Automatique

Utilisez le script de vérification :

```bash
# Rendre exécutable
chmod +x scripts/verify-build.sh

# Exécuter la vérification
./scripts/verify-build.sh
```

## 📋 Checklist Rapide

Avant chaque push :

- [ ] `pnpm build` réussit localement
- [ ] Pas d'imports `@packages/db` dans `apps/web/src`
- [ ] Tous les composants UI importés existent
- [ ] Les routes API utilisent `Promise<{ param }>` pour params
- [ ] `cookies()` est awaité
- [ ] `useParams()` vérifie null
- [ ] Pas d'utilisation de `request.ip`
- [ ] Les types incluent toutes les propriétés utilisées
- [ ] `apiGet<T>`, `apiPost<T>`, etc. supportent les génériques

## 🔧 Corrections Courantes

### Erreur : "Cannot find module '@packages/db'"

```bash
# Dans apps/web/src, remplacer par :
sed -i "s|from '@packages/db'|from '@/lib/prisma'|g" **/*.ts **/*.tsx
```

### Erreur : "Property 'ip' does not exist"

```typescript
// Remplacer :
ip: request.ip

// Par :
const forwarded = request.headers.get('x-forwarded-for')
const ip = forwarded ? forwarded.split(',')[0].trim() : request.headers.get('x-real-ip') || 'unknown'
ip: ip
```

### Erreur : "params is possibly 'null'"

```typescript
// Remplacer :
if (params.slug)

// Par :
if (params && params.slug)
// OU
if (params?.slug)
```

### Erreur : Route params type

```typescript
// Remplacer :
{ params }: { params: { id: string } }

// Par :
{ params }: { params: Promise<{ id: string }> }

// Et utiliser :
const { id } = await params
```

## ✅ Après la Checklist

Une fois toutes les vérifications passées :

```bash
# Commit
git add .
git commit -m "fix: corrections avant déploiement"

# Push
git push origin votre-branche

# Puis sur le serveur, simplement :
cd /var/www/asp-afrique
git pull
pnpm build  # Devrait fonctionner maintenant!
```

---

**Règle d'or : Si ça ne build pas localement, ça ne buildra pas sur le serveur!**

