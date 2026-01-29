# ASPCI Website - Académie de la Sécurité Professionnelle de Côte d'Ivoire

Une application web complète pour l'Académie de la Sécurité Professionnelle de Côte d'Ivoire (ASPCI), comprenant un site public et un panneau d'administration.

## 🚀 Fonctionnalités

### Site Public
- **Page d'accueil** : Présentation de l'académie avec programmes de formation
- **Formations** : Catalogue des 6 programmes de formation (AS, ASP, ASS, APR, AI, IS)
- **Services de consulting** : Présentation des services d'expertise
- **Partenaires** : Liste des partenaires et accréditations
- **Contact** : Formulaire de contact avec validation

### Administration
- **Authentification sécurisée** : Connexion admin avec JWT
- **Gestion des formations** : CRUD complet des programmes
- **Gestion des services** : Administration des offres de consulting
- **Gestion des partenaires** : CRUD des partenaires et accréditations
- **Messages de contact** : Consultation et gestion des demandes
- **Upload de fichiers** : Gestion sécurisée des images et documents

## 🛠️ Technologies

- **Backend** : Node.js + Fastify + TypeScript
- **Frontend** : Next.js 14 + React + TypeScript + TailwindCSS
- **Base de données** : PostgreSQL + Prisma ORM
- **Authentification** : JWT + NextAuth.js
- **UI Components** : Radix UI + TailwindCSS

## 📦 Installation

### Prérequis
- Node.js 18+
- PostgreSQL
- pnpm

### Configuration

1. **Cloner le repository**
   ```bash
   git clone https://github.com/bkourouma/asp-afrique.git
   cd asp-afrique
   ```

2. **Installer les dépendances**
   ```bash
   pnpm install
   ```

3. **Configuration de la base de données**
   ```bash
   # Créer une base PostgreSQL nommée 'aspc_ci_db'
   # Configurer les variables d'environnement dans packages/db/.env
   ```

4. **Initialiser la base de données**
   ```bash
   cd packages/db
   pnpm prisma generate
   pnpm db:seed
   ```

5. **Démarrer les applications**
   ```bash
   # Terminal 1: API Backend
   cd apps/api && pnpm dev

   # Terminal 2: Frontend Web
   cd apps/web && pnpm dev
   ```

## 🔧 Scripts Disponibles

```bash
# Développement
pnpm dev              # Démarrer toutes les applications
pnpm dev:web          # Frontend uniquement
pnpm dev:api          # API uniquement

# Base de données
pnpm db:generate      # Générer le client Prisma
pnpm db:migrate       # Appliquer les migrations
pnpm db:seed          # Alimenter la base avec des données de test
pnpm db:studio        # Interface graphique Prisma Studio

# Build
pnpm build            # Build de production
pnpm start            # Démarrer en production
```

## 📊 Accès Admin

- **URL** : http://localhost:3000/admin
- **Email** : admin@aspc-ci.org
- **Mot de passe** : Admin123!

## 🏗️ Architecture

```
AspCIWeb/
├── apps/
│   ├── api/                 # Backend Fastify
│   └── web/                 # Frontend Next.js
├── packages/
│   ├── db/                  # Base de données Prisma
│   └── ui/                  # Composants partagés (optionnel)
├── specs/                   # Spécifications et documentation
└── scripts/                 # Scripts utilitaires
```

## 📋 Programmes de Formation

1. **Agent de Sécurité Professionnel (AS)** - 360h
2. **Agent de Sécurité Portuaire (ASP)** - 360h
3. **Agent d'Intervention (ASS)** - 360h
4. **Agent de Protection Rapprochée (APR)** - 360h
5. **Agent d'Investigation (AI)** - 360h
6. **Ingénierie Sécuritaire (IS)** - 360h

## 🔒 Sécurité

- Authentification JWT pour l'administration
- Validation des données côté client et serveur
- Protection contre les attaques CSRF
- Gestion sécurisée des fichiers uploadés
- Audit logging des actions administrateur

## 🌐 Déploiement

Le projet est configuré pour un déploiement facile sur :
- Vercel (frontend)
- Railway/Heroku (backend + base de données)
- Netlify (frontend alternatif)

## 📞 Support

Pour toute question ou problème :
- **Email** : info@imhotepacademy.ci
- **Téléphone** : +225 07 59 81 48 64 / +225 07 08 97 78 23
- **Site web** : www.imhotepacademy.ci
- **Adresse** : 03 BP 987 Abidjan 03, Côte d'Ivoire

## 📄 Licence

Tous droits réservés © 2025 ASPCI