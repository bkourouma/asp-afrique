# 🎬 Vidéothèque Technique ASPCI

## 🚀 Démarrage Rapide

### Option 1: Script Automatique (Recommandé)
```bash
# Double-cliquez sur le fichier
start-videotheque.bat
```

### Option 2: Commandes Manuelles
```bash
# 1. Installer les dépendances
pnpm install

# 2. Générer le client Prisma
cd packages/db
npx prisma generate
cd ../..

# 3. Démarrer l'application
cd apps/web
pnpm dev
```

## 📋 Fonctionnalités Implémentées

### ✅ Pages Créées
- **Page Publique** : `/videos` - Grid responsive avec filtres
- **Page Vidéo** : `/videos/[slug]` - Lecteur vidéo individuel
- **Page Admin** : `/admin/videos` - Gestion complète des vidéos

### ✅ Types de Vidéos Supportés
1. **📺 YouTube** - Intégration avec auto-extraction des métadonnées
2. **📤 Upload Direct** - Drag & drop avec génération de thumbnails
3. **🔗 URL Externe** - Vimeo, Dailymotion, etc.

### ✅ Fonctionnalités Admin
- ✅ Liste des vidéos (grid/table avec thumbnails)
- ✅ Formulaire d'ajout/édition complet
- ✅ Upload avec barre de progression
- ✅ Génération automatique de thumbnails
- ✅ Filtres et recherche avancée
- ✅ Gestion des catégories et tags
- ✅ Statuts (Brouillon/Publié)
- ✅ Aperçu en temps réel

### ✅ Players Vidéo
- ✅ **YouTube** : iFrame embed avec contrôles natifs
- ✅ **HTML5** : Player personnalisé avec contrôles avancés
- ✅ **Externe** : Redirection vers la plateforme

### ✅ Design & UX
- ✅ Cards avec effet glassmorphism
- ✅ Hover effects et animations
- ✅ Responsive (3 colonnes desktop, 2 tablette, 1 mobile)
- ✅ Dark mode friendly
- ✅ Couleurs ASPCI (#0A2540, #FF6B35, #00D9FF)

## 🗄️ Base de Données

### Schéma Video
```sql
- id, title, slug, description
- type (YOUTUBE/UPLOAD/EXTERNAL)
- videoUrl, videoId, videoFile, thumbnail
- duration, durationSeconds
- category, tags[], author, language
- level (DEBUTANT/INTERMEDIAIRE/AVANCE)
- status (DRAFT/PUBLISHED)
- views, subtitles, resources
- publishedAt, createdAt, updatedAt
```

### Catégories Disponibles
- Tutoriels & Formations
- Cybersécurité
- Cloud Computing
- Intelligence Artificielle
- Réseaux & Infrastructure
- Développement Web
- Applications Mobiles
- Bases de Données
- Linux & Open Source
- Conférences & Webinaires
- DevOps & CI/CD
- Data Science & Analytics
- Démonstrations Produits
- Interviews Experts

## 🔧 Configuration

### Variables d'Environnement
```env
DATABASE_URL="postgresql://user:password@localhost:5432/aspci"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### Stockage des Fichiers
- **Vidéos** : `/public/uploads/videos/`
- **Thumbnails** : `/public/uploads/thumbnails/`
- **Taille max** : 500MB
- **Formats** : MP4, WebM, MOV, AVI, MKV

## 🎯 URLs Importantes

### Public
- **Vidéothèque** : http://localhost:3000/videos
- **Vidéo individuelle** : http://localhost:3000/videos/[slug]

### Administration
- **Dashboard** : http://localhost:3000/admin
- **Gestion vidéos** : http://localhost:3000/admin/videos
- **Mot de passe** : `aspci2025`

## 🚀 Utilisation

### 1. Ajouter une Vidéo YouTube
1. Aller sur `/admin/videos`
2. Cliquer "Nouvelle vidéo"
3. Sélectionner "YouTube"
4. Coller l'URL YouTube
5. Remplir les métadonnées
6. Cliquer "Publier"

### 2. Uploader une Vidéo
1. Aller sur `/admin/videos`
2. Cliquer "Nouvelle vidéo"
3. Sélectionner "Upload Direct"
4. Glisser-déposer le fichier
5. Sélectionner une miniature
6. Remplir les informations
7. Cliquer "Publier"

### 3. Ajouter une Vidéo Externe
1. Aller sur `/admin/videos`
2. Cliquer "Nouvelle vidéo"
3. Sélectionner "URL Externe"
4. Coller l'URL (Vimeo, Dailymotion, etc.)
5. Ajouter une miniature
6. Remplir les informations
7. Cliquer "Publier"

## 📊 Statistiques Dashboard

Le dashboard affiche maintenant :
- Nombre total de vidéos
- Vidéos publiées vs brouillons
- Total des vues
- Accès rapide à la gestion

## 🔒 Sécurité

- ✅ Authentification admin requise
- ✅ Validation des fichiers uploadés
- ✅ Protection contre les injections
- ✅ Limitation de taille des fichiers
- ✅ Types MIME vérifiés

## 🎨 Personnalisation

### Couleurs ASPCI
```css
--primary: #0A2540
--secondary: #FF6B35
--accent: #00D9FF
```

### Styles
- Cards avec glassmorphism
- Animations smooth
- Hover effects
- Responsive design
- Dark mode support

## 🐛 Dépannage

### Problème Prisma
```bash
# Arrêter l'application
# Supprimer node_modules
rm -rf node_modules
# Réinstaller
pnpm install
# Régénérer Prisma
cd packages/db && npx prisma generate
```

### Problème Upload
- Vérifier les permissions du dossier `/public/uploads/`
- Vérifier la taille max (500MB)
- Vérifier le format du fichier

### Problème YouTube
- Vérifier que l'URL est valide
- L'API YouTube Data v3 est optionnelle (mode mock activé)

## 📈 Améliorations Futures

- [ ] API YouTube Data v3 réelle
- [ ] Compression vidéo automatique
- [ ] Sous-titres multi-langues
- [ ] Analytics avancées
- [ ] Playlists
- [ ] Commentaires
- [ ] PWA support
- [ ] CDN intégration

## 🎉 Félicitations !

Votre vidéothèque technique ASPCI est maintenant opérationnelle ! 

**Prochaines étapes :**
1. Créer votre premier compte admin
2. Ajouter vos premières vidéos
3. Personnaliser les catégories
4. Configurer le stockage en production

---

*Développé avec ❤️ pour ASPCI*
