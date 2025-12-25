# Feature Specification: Tech Videotheque System

**Feature Branch**: `004-tech-videotheque-system`
**Created**: 2025-10-22
**Status**: Draft
**Input**: User description: "Prompt pour Créer une Vidéothèque Tech avec Administration Objectif Créer un système de vidéothèque technique complet avec une interface d'administration pour gérer les vidéos (upload direct ou liens YouTube), sans processus de validation. Architecture Globale Pages à Créer 1. Page Vidéothèque Publique : /videos ou /mediatheque 2. Page Vidéo Individuelle : /videos/[id] 3. Page Admin : /admin/videos ________________________________________ 1. PAGE VIDÉOTHÈQUE PUBLIQUE (/videos) Fonctionnalités • Affichage de toutes les vidéos publiées • Grid responsive (3 colonnes desktop, 2 tablette, 1 mobile) • Carte vidéo avec : o Thumbnail/Miniature de la vidéo o Icône play overlay o Titre o Description courte (100-150 caractères) o Durée de la vidéo o Date d'ajout o Catégorie/Tags techniques o Source (YouTube, Upload, ou Autre) Design • Cards avec effet glassmorphism • Hover effect : * Élévation + scale légère * Play button animation * Prévisualisation animée du thumbnail (optionnel) • Overlay gradient sur le thumbnail • Badge pour la source (YouTube, Upload) • Animation au scroll (fade-in + slide) • Filtres par catégorie/type en haut • Barre de recherche • Tri : Plus récent, Plus vu, Durée ________________________________________ 2. PAGE VIDÉO INDIVIDUELLE (/videos/[id]) Fonctionnalités • Lecteur vidéo responsive : o YouTube embed si lien YouTube o HTML5 video player si upload direct o Contrôles personnalisés (play, pause, volume, fullscreen) • Métadonnées sous la vidéo : o Titre o Date de publication o Catégorie o Durée o Source • Description complète • Tags cliquables • Vidéos suggérées (même catégorie) • Téléchargement (si upload direct) Design • Layout responsive : * Video player 16:9 ratio * Max-width: 1200px centré • Player controls modernes • Section description repliable • Sidebar avec vidéos similaires • Breadcrumb navigation • Dark mode friendly ________________________________________ 3. PAGE ADMINISTRATION (/admin/videos) Structure Créer une interface avec 3 sections : 1. Liste des vidéos 2. Formulaire d'ajout/édition 3. Prévisualisation du player Fonctionnalités Requises A. Liste des Vidéos • Table/Grid avec : * Thumbnail miniature * Titre * Type (YouTube / Upload) * Catégorie * Durée * Date d'ajout * Statut (Publié/Brouillon) * Actions (Éditer, Supprimer) • Recherche par titre • Filtre par catégorie/statut/source • Pagination (12-20 vidéos par page) • Tri par date (plus récent en premier) • Vue grid ou liste (toggle) B. Formulaire d'Ajout/Édition Champs obligatoires : TYPE DE VIDÉO (Sélection radio/toggle) : • 📺 Lien YouTube • 📤 Upload Direct • 🔗 URL Vidéo Externe (Vimeo, Dailymotion, etc.) Si YOUTUBE : • URL YouTube (input text) * Auto-détection de l'ID * Validation du format * Récupération automatique du thumbnail * Récupération automatique de la durée (si possible) Si UPLOAD DIRECT : • Fichier vidéo (drag & drop upload) * Formats : MP4, WebM, MOV, AVI * Taille max : 500MB (configurable) * Barre de progression upload * Génération automatique de thumbnail • Thumbnail personnalisé (upload optionnel) Si URL EXTERNE : • URL de la vidéo (input text) • Thumbnail (upload obligatoire) • Durée manuelle (input time) CHAMPS COMMUNS : • Titre (input text, max 100 caractères) • Slug URL (généré automatiquement) • Description courte (textarea, 150 caractères max) • Description complète (textarea ou éditeur simple) • Catégorie (select ou input avec suggestions) * Tutoriels * Formations * Conférences * Démonstrations * Webinaires * Interviews * Autre • Tags techniques (input avec chips) * Exemples : cybersécurité, IA, réseau, cloud, etc. • Durée (auto ou manuelle : format MM:SS ou HH:MM:SS) • Statut : Publié / Brouillon (toggle) • Langue (select : FR, EN, Autre) Champs optionnels : • Auteur/Intervenant (input text) • Date de l'événement (si conférence/webinaire) • Niveau (Débutant, Intermédiaire, Avancé) • Transcription/Sous-titres (upload fichier .srt/.vtt) • Ressources liées (liens vers docs, slides, etc.) C. Preview du Player • Aperçu temps réel du rendu • Test du player vidéo • Vérification du thumbnail • Responsive preview (desktop/tablet/mobile) D. Upload de Vidéos Fonctionnalités : • Drag & drop zone • Click to browse • Prévisualisation avant upload • Barre de progression (pourcentage + vitesse) • Upload en arrière-plan (possibilité de naviguer) • Reprise upload en cas d'interruption (optionnel) • Compression/Optimisation automatique (optionnel) • Formats acceptés : MP4, WebM, MOV, AVI, MKV • Taille max recommandée : 500MB • Génération automatique de plusieurs thumbnails au choix Stockage : • Option 1 : Dossier /public/uploads/videos/ • Option 2 : CDN externe (Cloudinary Video, Bunny CDN) ________________________________________ 4. BACKEND / STOCKAGE Option A : Base de Données SQL CREATE TABLE videos ( id INT PRIMARY KEY AUTO_INCREMENT, title VARCHAR(255) NOT NULL, slug VARCHAR(255) UNIQUE NOT NULL, description TEXT, description_short VARCHAR(200), type ENUM('youtube', 'upload', 'external') NOT NULL, video_url VARCHAR(500), video_id VARCHAR(100), video_file VARCHAR(500), thumbnail VARCHAR(500), duration VARCHAR(20), duration_seconds INT, category VARCHAR(100), tags JSON, author VARCHAR(100), language VARCHAR(10) DEFAULT 'FR', level ENUM('Débutant', 'Intermédiaire', 'Avancé'), status ENUM('published', 'draft') DEFAULT 'draft', views INT DEFAULT 0, subtitles VARCHAR(500), resources JSON, published_at TIMESTAMP, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, INDEX idx_category (category), INDEX idx_status (status), INDEX idx_type (type) ); 5. FONCTIONNALITÉS DÉTAILLÉES Ajout de Vidéo YouTube 1. Utilisateur clique \"Nouvelle Vidéo\" 2. Sélectionne \"Lien YouTube\" 3. Colle l'URL YouTube 4. Le système : • Extrait l'ID de la vidéo • Récupère automatiquement le thumbnail • Détecte la durée (via API YouTube optionnel) 5. Rempli titre, description, catégorie, tags 6. Clique \"Publier\" ou \"Enregistrer brouillon\" 7. La vidéo apparaît dans la liste Ajout de Vidéo par Upload 1. Utilisateur clique \"Nouvelle Vidéo\" 2. Sélectionne \"Upload Direct\" 3. Drag & drop du fichier vidéo 4. Le système : • Upload avec barre de progression • Génère plusieurs thumbnails au choix • Extrait la durée automatiquement • Compresse si nécessaire (optionnel) 5. Sélectionne le thumbnail préféré ou upload custom 6. Rempli les métadonnées 7. Clique \"Publier\" 8. Vidéo traitée et disponible Édition de Vidéo 1. Clique \"Éditer\" sur une vidéo 2. Formulaire pré-rempli avec données existantes 3. Peut changer : • Titre, description • Thumbnail (re-upload) • Catégorie, tags • Statut publié/brouillon • Mais PAS le type de vidéo (YouTube/Upload) 4. Clique \"Mettre à jour\" 5. Modifications visibles immédiatement Suppression de Vidéo 1. Clique \"Supprimer\" 2. Confirmation popup (\"Supprimer définitivement ?\") 3. Si upload direct : Supprimer aussi les fichiers ? • Vidéo • Thumbnail • Sous-titres 4. Si oui → tout est supprimé 5. Disparaît de la liste et de la page publique ________________________________________ 6. PLAYER VIDÉO Pour YouTube // Utilise YouTube iFrame API <iframe src=\"https://www.youtube.com/embed/VIDEO_ID\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope\" allowfullscreen ></iframe> Options : • Contrôles YouTube natifs • Autoplay optionnel • Quality selector • Speed controls Pour Vidéos Uploadées // HTML5 Video Player Personnalisé Fonctionnalités : • Play/Pause • Timeline/Seekbar • Volume control • Fullscreen • Speed control (0.5x à 2x) • Picture-in-Picture • Keyboard shortcuts • Quality selector (si plusieurs versions) • Sous-titres (si fichier .vtt fourni) Librairies suggérées : • Video.js (le plus populaire) • Plyr (moderne et léger) • MediaElement.js • Vidstack (nouveau, très performant) ________________________________________ 7. SÉCURITÉ ADMINISTRATION Sécurité Upload • Validation côté serveur : * Type MIME correct * Extension autorisée * Taille max respectée * Pas de scripts malveillants ________________________________________ 8. CODE EXEMPLE - STRUCTURE Stack Technologique Suggérée Frontend : • React + Next.js (ou Vue/Nuxt) • TailwindCSS pour le style • Video.js ou Plyr pour le player • React Hook Form pour les formulaires • React Dropzone pour l'upload • Axios pour les requêtes API • SWR ou React Query pour le cache Backend : • Next.js API Routes • ou Node.js + Express • Multer pour upload de fichiers • FFmpeg pour traitement vidéo (thumbnail, compression) Base de données : • PostgreSQL (recommandé pour grandes vidéos) • MySQL • ou Supabase (avec storage intégré) Stockage Vidéos : • Développement : Local /public/uploads/ • Production : * AWS S3 + CloudFront CDN * Cloudflare Stream * Bunny CDN * Mux (spécialisé vidéo) ________________________________________ 9. INSTRUCTIONS POUR CURSOR AI Crée un système de vidéothèque tech complet avec : 1. Page publique /videos avec grid de vidéos en cards 2. Page vidéo individuelle /videos/[slug] avec player responsive 3. Page admin /admin/videos avec : o Liste des vidéos (grid/table avec thumbnails et actions) o Formulaire d'ajout/édition complet o Support DOUBLE :  Liens YouTube (avec auto-extraction du thumbnail)  Upload direct de vidéos (drag & drop + progress bar) o Champs : Titre, Description, Catégorie, Tags, Durée, Thumbnail o Génération automatique de thumbnails pour uploads o Boutons : Enregistrer brouillon / Publier / Supprimer Players : • YouTube : iFrame embed standard • Upload : Video.js ou Plyr avec contrôles custom Stockage : • Métadonnées : [choisis : JSON local / PostgreSQL / Supabase] • Vidéos uploadées : /public/uploads/videos/ • Thumbnails : /public/uploads/thumbnails/ Pas de validation : Les vidéos publiées apparaissent immédiatement. Design : Style moderne tech cohérent avec ASPCI (couleurs : #0A2540, #FF6B35, #00D9FF) • Cards avec thumbnail + play overlay • Animations smooth • Dark mode friendly Sécurité : • Protège /admin/videos avec login (mot de passe : \"aspci2025\") • Validation upload (type, taille max 500MB) Génère le code complet avec tous les fichiers nécessaires. ________________________________________ 10. AMÉLIORATIONS OPTIONNELLES • 📊 Analytics : o Temps de visionnage moyen o Taux de complétion o Statistiques par catégorie • 🎬 Playlists : o Création de playlists thématiques o Lecture continue • 💬 Commentaires : o Système de commentaires avec modération o Réactions (like/dislike) • 🔍 SEO : o Meta tags avec Open Graph o Schema.org VideoObject o Sitemap vidéos • 📱 PWA : o Mode offline avec cache o Installation app mobile • 🌍 Multilingue : o Sous-titres multi-langues o Interface FR/EN • 📧 Notifications : o Email lors de nouvelles vidéos o Abonnement par catégorie • 🏷️ Tags Avancés : o Auto-complétion o Suggestions basées sur le contenu • 📈 Dashboard Admin : o Stats globales o Videos les plus vues o Graphiques de vues • 🎨 Personnalisation Player : o Couleurs brand o Logo watermark o Intro/Outro automatique • 📑 Import/Export : o Import batch depuis YouTube playlist o Export métadonnées (JSON/CSV) • 🔄 Transcoding : o Génération multi-qualités (360p, 720p, 1080p) o Format adaptatif (HLS, DASH) • 🎯 Chapitres : o Timeline avec markers o Navigation par chapitre • 📚 Bibliothèque Média : o Gestion centralisée des vidéos o Tags, dossiers, recherche avancée • 🔐 Contrôle d'Accès : o Vidéos privées/publiques o Accès par token o Watermarking dynamique ________________________________________ 11. EXEMPLES DE CATÉGORIES TECH Catégories suggérées : • 🎓 Tutoriels & Formations • 🔒 Cybersécurité • ☁️ Cloud Computing • 🤖 Intelligence Artificielle • 🌐 Réseaux & Infrastructure • 💻 Développement Web • 📱 Applications Mobiles • 🗄️ Bases de Données • 🐧 Linux & Open Source • 🎤 Conférences & Webinaires • 🔧 DevOps & CI/CD • 📊 Data Science & Analytics • 🎮 Démonstrations Produits • 👥 Interviews Experts"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Browse Public Videotheque (Priority: P1)

As a visitor, I want to browse all published videos in an attractive grid layout so that I can discover technical content easily.

**Why this priority**: This is the core user experience - without the ability to browse videos, the entire system has no value. It's the primary entry point for users.

**Independent Test**: Can be fully tested by navigating to /videos page and verifying video cards display with thumbnails, titles, and metadata. Delivers immediate value by allowing content discovery.

**Acceptance Scenarios**:

1. **Given** no videos exist, **When** I visit /videos, **Then** I see an empty state message
2. **Given** videos exist, **When** I visit /videos, **Then** I see a responsive grid (3 columns desktop, 2 tablet, 1 mobile) with video cards
3. **Given** a video card, **When** I hover over it, **Then** I see play button animation and slight elevation
4. **Given** video cards, **When** I scroll, **Then** I see smooth fade-in animations
5. **Given** the page, **When** I use search bar, **Then** videos filter by title/description
6. **Given** the page, **When** I use category filter, **Then** videos filter by selected category
7. **Given** the page, **When** I use sort options, **Then** videos reorder (recent, viewed, duration)

---

### User Story 2 - Watch Individual Video (Priority: P1)

As a visitor, I want to watch a specific video with full controls so that I can consume technical content effectively.

**Why this priority**: Equal priority to browsing - once users find content, they need to consume it. Both are essential for basic functionality.

**Independent Test**: Can be fully tested by clicking any video card and verifying the video plays correctly. Delivers immediate value by enabling content consumption.

**Acceptance Scenarios**:

1. **Given** a YouTube video, **When** I click its card, **Then** I'm taken to /videos/[slug] with embedded YouTube player
2. **Given** an uploaded video, **When** I click its card, **Then** I'm taken to /videos/[slug] with HTML5 video player
3. **Given** a video page, **When** the video loads, **Then** I see title, description, metadata, and related videos
4. **Given** a video player, **When** I interact with controls, **Then** play/pause/volume/fullscreen work correctly
5. **Given** an uploaded video, **When** I look for download option, **Then** I see download button (if available)
6. **Given** video metadata, **When** I click tags, **Then** I'm taken to filtered video list
7. **Given** the page, **When** I view on mobile, **Then** player and layout are responsive

---

### User Story 3 - Admin Video Management (Priority: P2)

As an administrator, I want to manage videos through a comprehensive interface so that I can add, edit, and organize content efficiently.

**Why this priority**: This enables content creation and management, which is essential for the system to have content. Lower priority than consumption features.

**Independent Test**: Can be fully tested by logging into /admin/videos and verifying CRUD operations work. Delivers value by enabling content management workflow.

**Acceptance Scenarios**:

1. **Given** I'm logged in as admin, **When** I visit /admin/videos, **Then** I see video list with thumbnails and actions
2. **Given** video list, **When** I click "New Video", **Then** I see form with video type selection (YouTube/Upload/External)
3. **Given** YouTube form, **When** I paste URL, **Then** thumbnail and duration auto-populate
4. **Given** upload form, **When** I drag-drop video file, **Then** upload progress shows and thumbnail generates
5. **Given** video form, **When** I fill metadata and publish, **Then** video appears in public list immediately
6. **Given** existing video, **When** I click edit, **Then** form pre-populates with current data
7. **Given** video in list, **When** I click delete, **Then** confirmation dialog appears and video is removed
8. **Given** video list, **When** I search/filter/sort, **Then** results update correctly

---

### User Story 4 - Admin Authentication (Priority: P2)

As an administrator, I want secure access to the admin interface so that only authorized users can manage content.

**Why this priority**: Security is critical for admin functions. Same priority as management since both are needed for admin workflow.

**Independent Test**: Can be fully tested by attempting access to /admin/videos without/with correct credentials. Delivers value by protecting content management.

**Acceptance Scenarios**:

1. **Given** I'm not logged in, **When** I visit /admin/videos, **Then** I'm redirected to login
2. **Given** login form, **When** I enter correct password, **Then** I'm granted access to admin
3. **Given** I'm logged in, **When** I navigate admin pages, **Then** I stay authenticated
4. **Given** I'm logged in, **When** I log out, **Then** I'm redirected to public site

---

### Edge Cases

- What happens when YouTube video is deleted/private?
- How does system handle corrupted video files during upload?
- What happens when video file exceeds size limit?
- How does system handle invalid YouTube URLs?
- What happens when thumbnail generation fails?
- How does system handle videos with no category/tags?
- What happens when admin tries to edit video type?
- How does system handle concurrent video uploads?
- What happens when video metadata is incomplete?
- How does system handle videos with very long titles/descriptions?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display published videos in a responsive grid layout (3 columns desktop, 2 tablet, 1 mobile)
- **FR-002**: System MUST show video cards with thumbnail, play overlay, title, short description, duration, date, category, and source badge
- **FR-003**: System MUST provide hover effects on video cards (elevation, play animation, optional thumbnail preview)
- **FR-004**: System MUST implement scroll-triggered fade-in animations for video cards
- **FR-005**: System MUST provide search functionality filtering videos by title/description
- **FR-006**: System MUST provide category/type filters for videos
- **FR-007**: System MUST provide sorting options (recent, most viewed, duration)
- **FR-008**: System MUST display individual videos with responsive player (YouTube embed or HTML5 video)
- **FR-009**: System MUST show complete video metadata (title, publication date, category, duration, source)
- **FR-010**: System MUST display full video description and clickable tags
- **FR-011**: System MUST show related videos from same category in sidebar
- **FR-012**: System MUST provide download option for uploaded videos
- **FR-013**: System MUST provide admin authentication with password protection
- **FR-014**: System MUST display video management interface with grid/table view toggle
- **FR-015**: System MUST show video thumbnails, titles, types, categories, durations, dates, and status in admin list
- **FR-016**: System MUST provide search and filtering in admin video list
- **FR-017**: System MUST implement pagination (12-20 videos per page) in admin list
- **FR-018**: System MUST provide form with video type selection (YouTube/Upload/External URL)
- **FR-019**: System MUST auto-extract YouTube video ID and fetch thumbnail/duration when URL provided
- **FR-020**: System MUST validate YouTube URL format
- **FR-021**: System MUST provide drag-and-drop video upload with progress bar
- **FR-022**: System MUST support video formats (MP4, WebM, MOV, AVI, MKV) up to 500MB
- **FR-023**: System MUST generate thumbnails automatically for uploaded videos
- **FR-024**: System MUST allow custom thumbnail upload as alternative
- **FR-025**: System MUST provide required fields: title, short description, full description, category, tags, duration, status, language
- **FR-026**: System MUST auto-generate URL slug from title
- **FR-027**: System MUST provide optional fields: author, event date, level, subtitles, related resources
- **FR-028**: System MUST provide real-time preview of video player and thumbnail
- **FR-029**: System MUST support responsive preview (desktop/tablet/mobile)
- **FR-030**: System MUST allow editing all fields except video type
- **FR-031**: System MUST provide confirmation dialog for video deletion
- **FR-032**: System MUST delete associated files (video, thumbnail, subtitles) when uploaded video is deleted
- **FR-033**: System MUST validate file types and sizes on server side
- **FR-034**: System MUST prevent malicious file uploads
- **FR-035**: System MUST store videos in /public/uploads/videos/ directory
- **FR-036**: System MUST store thumbnails in /public/uploads/thumbnails/ directory
- **FR-037**: System MUST use YouTube iframe API for YouTube videos with standard controls
- **FR-038**: System MUST use HTML5 video player with custom controls for uploaded videos
- **FR-039**: System MUST support play/pause, timeline, volume, fullscreen controls
- **FR-040**: System MUST support speed control (0.5x to 2x) and picture-in-picture
- **FR-041**: System MUST support keyboard shortcuts for video playback
- **FR-042**: System MUST display subtitles if .vtt files are provided
- **FR-043**: System MUST publish videos immediately without validation workflow
- **FR-044**: System MUST allow saving videos as drafts
- **FR-045**: System MUST use ASPCI brand colors (#0A2540, #FF6B35, #00D9FF) and glassmorphism effects
- **FR-046**: System MUST support dark mode
- **FR-047**: System MUST be fully responsive across all screen sizes

### Key Entities *(include if feature involves data)*

- **Video**: Represents a video content item with attributes: id, title, slug, descriptions, type (youtube/upload/external), URLs/files, thumbnail, duration, category, tags, author, language, level, status, views, subtitles, resources, timestamps
- **Category**: Represents video categories (Tutoriels, Cybersécurité, Cloud Computing, etc.) with relationships to videos
- **Tag**: Represents technical tags (cybersécurité, IA, réseau, cloud, etc.) with many-to-many relationship to videos
- **Admin User**: Represents authenticated administrators with access to management functions

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can browse videos in under 3 seconds on standard broadband connection
- **SC-002**: Video pages load and start playing within 5 seconds
- **SC-003**: Admin can add a YouTube video in under 2 minutes from URL paste to publish
- **SC-004**: Admin can upload and publish a video file in under 5 minutes
- **SC-005**: System supports 1000 concurrent video streams without quality degradation
- **SC-006**: 95% of video uploads complete successfully without interruption
- **SC-007**: 90% of users find desired content through search/filter within 30 seconds
- **SC-008**: Video cards display correctly on all screen sizes (mobile to 4K desktop)
- **SC-009**: Admin interface loads video list in under 2 seconds with 100+ videos
- **SC-010**: 99% of published videos remain accessible and playable over time
- **SC-011**: Users complete video viewing sessions 85% of the time without technical issues
- **SC-012**: Admin can manage 50 videos per hour through CRUD operations

