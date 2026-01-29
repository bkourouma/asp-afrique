# 🎯 Guide d'Implémentation ASPCI avec Cursor

## 📋 État Actuel du Projet

✅ **Déjà en place :**
- Monorepo Turbo (frontend + backend séparés)
- Next.js 14+ (frontend)
- Express.js (backend)
- PostgreSQL + Prisma (base de données)
- JWT Authentication (middleware en place)
- Structure de dossiers organisée

❌ **À développer :**
- Pages publiques du site (accueil, formations, consulting, etc.)
- Back-office admin complet
- API REST endpoints
- Intégration front-back

---

## 🚀 Étapes d'Implémentation (Ordre Recommandé)

### **PHASE 1 : Backend API (Endpoints)**

#### Étape 1.1 : Modèles Prisma
**Fichier à créer/modifier :** `packages/db/prisma/schema.prisma`

Ajouter les modèles :
- `Formation` (id, title, duration, description, objectives, image)
- `Consulting` (id, title, description, icon)
- `Partner` (id, name, logo, description)
- `ContactMessage` (id, name, email, phone, message, createdAt)

**Commande :** `pnpm db:migrate`

---

#### Étape 1.2 : Routes API Backend
**Fichier :** `apps/api/src/routes/`

Créer les fichiers :
- `formations.ts` → GET /api/formations, POST, PUT, DELETE
- `consulting.ts` → GET /api/consulting, POST, PUT, DELETE
- `partners.ts` → GET /api/partners, POST, PUT, DELETE
- `contact.ts` → POST /api/contact

Chaque route doit :
- Utiliser le middleware JWT pour les routes protégées
- Valider les données entrantes
- Retourner des réponses JSON structurées

---

#### Étape 1.3 : Contrôleurs Backend
**Fichier :** `apps/api/src/controllers/`

Créer les fichiers :
- `formationController.ts`
- `consultingController.ts`
- `partnerController.ts`
- `contactController.ts`

Chaque contrôleur doit gérer la logique métier (CRUD).

---

### **PHASE 2 : Frontend Pages Publiques**

#### Étape 2.1 : Page d'Accueil
**Fichier :** `apps/web/src/app/page.tsx`

Sections :
- Hero avec logo ASPCI
- Programmes de formation (6 cartes)
- Partenaires (carrousel)
- CTA "Découvrir"
- Footer

**Couleurs :** Bleu nuit (#0b1a39), Doré (#cfa34b), Blanc

---

#### Étape 2.2 : Page Formations
**Fichier :** `apps/web/src/app/formations/page.tsx`

- Liste des 6 formations en cartes
- Chaque carte cliquable → `/formations/[id]`

**Fichier détail :** `apps/web/src/app/formations/[id]/page.tsx`
- Affiche détails complets
- Bouton "S'inscrire"

---

#### Étape 2.3 : Pages Supplémentaires
- `/consulting` → Services de conseil
- `/partenaires` → Logos + descriptions
- `/contact` → Formulaire + coordonnées + Google Map

---

### **PHASE 3 : Back-Office Admin**

#### Étape 3.1 : Layout Admin
**Fichier :** `apps/web/src/app/admin/layout.tsx`

- Menu latéral (Formations, Consulting, Partenaires, Messages)
- Protégé par JWT (middleware)
- Responsive design

---

#### Étape 3.2 : Dashboard Admin
**Fichier :** `apps/web/src/app/admin/dashboard/page.tsx`

- Statistiques (nombre de formations, messages, etc.)
- Graphiques simples

---

#### Étape 3.3 : Gestion des Formations
**Fichier :** `apps/web/src/app/admin/formations/page.tsx`

- Tableau avec liste des formations
- Boutons : Ajouter, Modifier, Supprimer
- Modal/formulaire pour CRUD

---

#### Étape 3.4 : Gestion des Autres Ressources
- `/admin/consulting` → CRUD services
- `/admin/partenaires` → CRUD partenaires
- `/admin/messages` → Affichage des messages de contact

---

### **PHASE 4 : Intégration Front-Back**

#### Étape 4.1 : API Client
**Fichier :** `apps/web/src/lib/api-client.ts`

Créer des fonctions :
- `getFormations()`, `getFormation(id)`, `createFormation()`, etc.
- `getConsulting()`, `createConsulting()`, etc.
- `getPartners()`, `createPartner()`, etc.
- `sendContactMessage()`

---

#### Étape 4.2 : Hooks React
**Fichier :** `apps/web/src/lib/hooks/`

Créer :
- `useFormations()` → Récupère les formations
- `useConsulting()` → Récupère les services
- `usePartners()` → Récupère les partenaires

---

### **PHASE 5 : Déploiement & Tests**

#### Étape 5.1 : Tests
- Tester chaque endpoint API avec Postman/Insomnia
- Tester chaque page frontend

#### Étape 5.2 : Déploiement
- Frontend → Vercel
- Backend → Render/Railway
- Base de données → Neon/Supabase

---

## 📝 Prompt à Coller dans Cursor

```
Tu es un développeur expert en React/Next.js et Node.js/Express.

Contexte :
- Projet monorepo Turbo avec frontend (Next.js) et backend (Express)
- PostgreSQL + Prisma + JWT Auth déjà en place
- Objectif : Développer le site complet ASPCI (public + admin)

Tâche : Implémente la PHASE 1 (Backend API)

Détails :
1. Ajoute les modèles Prisma (Formation, Consulting, Partner, ContactMessage)
2. Crée les routes API : /api/formations, /api/consulting, /api/partners, /api/contact
3. Crée les contrôleurs correspondants
4. Assure que les routes protégées utilisent le middleware JWT
5. Valide les données entrantes
6. Retourne des réponses JSON structurées

Après cette phase, je te demanderai la PHASE 2 (Frontend Pages).
```

---

## ✅ Checklist d'Implémentation

- [ ] PHASE 1 : Backend API complète
- [ ] PHASE 2 : Pages publiques (accueil, formations, consulting, partenaires, contact)
- [ ] PHASE 3 : Back-office admin (dashboard, CRUD)
- [ ] PHASE 4 : Intégration front-back
- [ ] PHASE 5 : Tests et déploiement

---

## 🔗 Ressources Utiles

- **Prisma Docs :** https://www.prisma.io/docs/
- **Next.js Docs :** https://nextjs.org/docs
- **Express Docs :** https://expressjs.com/
- **TailwindCSS :** https://tailwindcss.com/docs

---

**Prêt à commencer ? Copie le prompt ci-dessus et colle-le dans Cursor ! 🚀**

