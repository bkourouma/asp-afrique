# Feature Specification: Blog Administration System

**Feature Branch**: `003-blog-admin-system`  
**Created**: 2025-10-21  
**Status**: Draft  
**Input**: User description: "Créer un système de blog complet avec une interface d'administration pour gérer les articles, sans processus de validation, avec support d'images. Architecture Globale: Pages à Créer: 1. Page Blog Publique : /blog ou /actualites 2. Page Article Individuel : /blog/[id] 3. Page Admin : /admin/blog. 1. PAGE BLOG PUBLIQUE (/blog): Fonctionnalités - Affichage de tous les articles publiés - Grid responsive (3 colonnes desktop, 2 tablette, 1 mobile) - Carte article avec : Image de couverture, Titre, Extrait (150-200 caractères), Date de publication, Catégorie/Tags, Temps de lecture estimé, Bouton Lire la suite. Design: Cards avec effet glassmorphism, Hover effect : élévation + scale légère, Image avec overlay gradient au hover, Animation au scroll (fade-in + slide), Filtres par catégorie en haut, Barre de recherche. 2. PAGE ARTICLE INDIVIDUEL (/blog/[id]): Fonctionnalités - Affichage complet de l'article - Image hero en haut - Métadonnées (auteur, date, catégorie, temps de lecture) - Contenu avec mise en forme rich text - Navigation vers articles précédent/suivant - Bouton de partage (optionnel). Design: Layout centré (max-width: 800px), Typographie optimale pour la lecture, Images dans le contenu responsive, Table des matières fixe (optionnel), Breadcrumb navigation. 3. PAGE ADMINISTRATION (/admin/blog): Structure: Créer une interface avec 3 sections : 1. Liste des articles 2. Formulaire d'ajout/édition 3. Prévisualisation. Fonctionnalités Requises: A. Liste des Articles: Table avec colonnes : Miniature image, Titre, Catégorie, Date de création, Statut (Publié/Brouillon), Actions (Éditer, Supprimer). Recherche par titre, Filtre par catégorie/statut, Pagination (10-20 articles par page), Tri par date (plus récent en premier). B. Formulaire d'Ajout/Édition: Champs obligatoires : Titre (input text), Slug URL (généré automatiquement depuis le titre), Contenu (éditeur rich text), Image de couverture (upload), Extrait/Résumé (textarea, 200 caractères max), Catégorie (select ou input avec suggestions), Tags (input avec chips), Statut : Publié / Brouillon (toggle/select). Champs optionnels : Auteur (input text, par défaut ASPCI), Date de publication (date picker, par défaut aujourd'hui), Images supplémentaires pour le contenu. C. Éditeur Rich Text: Fonctionnalités minimales : Gras, Italique, Souligné, Titres (H2, H3, H4), Liste à puces / numérotée, Liens hypertexte, Insertion d'images (upload + URL), Citation/Blockquote, Code (optionnel). Éditeurs suggérés : Quill.js, TinyMCE, Tiptap, Draft.js, CKEditor. D. Upload d'Images: Fonctionnalités : Drag & drop, Click to browse, Prévisualisation avant upload, Formats acceptés : JPG, PNG, WebP, GIF, Taille max : 5MB, Compression automatique (optionnel), Stockage : Option 1 : Dossier /public/uploads/blog/, Option 2 : Base64 dans DB (petites images), Option 3 : Service cloud (Cloudinary, AWS S3). 4. BACKEND / STOCKAGE: Option A : Backend Simple (JSON Local), Option B : Base de Données SQL, Option C : CMS Headless (Strapi, Sanity, Contentful). 5. FONCTIONNALITÉS DÉTAILLÉES: Ajout d'Article: 1. Utilisateur clique Nouvel Article 2. Formulaire vide s'affiche 3. Rempli les champs + upload images 4. Clique Enregistrer en brouillon ou Publier 5. L'article apparaît immédiatement dans la liste 6. Si publié → visible sur /blog. Édition d'Article: 1. Clique Éditer sur un article 2. Formulaire pré-rempli avec données existantes 3. Modifie les champs souhaités 4. Clique Mettre à jour 5. Modifications visibles immédiatement. Suppression d'Article: 1. Clique Supprimer 2. Confirmation popup (Êtes-vous sûr ?) 3. Si oui → article supprimé définitivement 4. Disparaît de la liste et du blog public. 6. SÉCURITÉ ADMINISTRATION: Protection de la Page Admin: Options : 1. Mot de passe simple (localStorage) 2. Système login/password avec session 3. OAuth (Google, Microsoft) 4. JWT tokens. Minimum requis : Redirection vers login si non authentifié, Session qui persiste, Déconnexion. 7. CODE EXEMPLE - STRUCTURE: Stack Technologique Suggérée: Frontend : React + Next.js (ou Vue/Nuxt), TailwindCSS pour le style, Quill.js ou Tiptap pour l'éditeur, React Hook Form pour les formulaires, Axios pour les requêtes API. Backend : Next.js API Routes (simple), ou Node.js + Express, ou Strapi CMS. Base de données : SQLite (développement), PostgreSQL ou MySQL (production), ou Firebase/Supabase. 8. INSTRUCTIONS POUR CURSOR AI: Crée un système de blog complet avec : 1. Page publique /blog avec grid d'articles en cards 2. Page article individuel /blog/[slug] 3. Page admin /admin/blog avec : Liste des articles (tableau avec actions), Formulaire d'ajout/édition complet, Éditeur rich text (utilise Quill.js ou Tiptap), Upload d'images (drag & drop + preview), Boutons : Enregistrer brouillon / Publier / Supprimer. Stockage : Utilise [choisis : JSON local / SQLite / Supabase], Stocke les images dans /public/uploads/blog/. Pas de validation : Les articles publiés apparaissent immédiatement. Design : Style moderne cohérent avec le reste du site ASPCI (couleurs : #0A2540, #FF6B35, #00D9FF). Sécurité : Protège /admin/blog avec un système de login simple (mot de passe : aspci2025). Génère le code complet avec tous les fichiers nécessaires. 9. AMÉLIORATIONS OPTIONNELLES: Analytics : Nombre de vues par article, Commentaires (modérés ou non), SEO : Meta tags automatiques, Progressive Web App, Multilingue (FR/EN), Newsletter : Abonnement aux nouveaux articles, Système de tags avancé avec auto-complétion, Dashboard analytics pour l'admin, Galerie d'images médias réutilisables, Export/Import d'articles (JSON/Markdown)."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Published Articles (Priority: P1)

As a visitor to the ASPCI website, I want to browse published blog articles so that I can stay informed about security training and consulting topics.

**Why this priority**: This is the primary user-facing functionality that delivers immediate value to website visitors and supports ASPCI's content marketing goals.

**Independent Test**: Can be fully tested by navigating to /blog and viewing article cards with images, titles, and excerpts.

**Acceptance Scenarios**:

1. **Given** I am on the /blog page, **When** I load the page, **Then** I see a responsive grid of published articles (3 columns on desktop, 2 on tablet, 1 on mobile)
2. **Given** I am viewing article cards, **When** I hover over a card, **Then** I see glassmorphism effects with elevation and scale changes
3. **Given** I am on the blog page, **When** I scroll down, **Then** I see fade-in animations on article cards
4. **Given** I am on the blog page, **When** I use the search bar, **Then** articles are filtered by title content
5. **Given** I am on the blog page, **When** I click a category filter, **Then** only articles from that category are displayed

---

### User Story 2 - Read Individual Article (Priority: P1)

As a visitor to the ASPCI website, I want to read a complete blog article so that I can get detailed information about security topics.

**Why this priority**: This completes the core reading experience and is essential for content consumption.

**Independent Test**: Can be fully tested by clicking "Read more" on any article card and viewing the full article content.

**Acceptance Scenarios**:

1. **Given** I click "Read more" on an article card, **When** I navigate to /blog/[slug], **Then** I see the full article with hero image, metadata, and rich text content
2. **Given** I am reading an article, **When** I view the layout, **Then** content is centered with max-width 800px and optimal typography for reading
3. **Given** I am reading an article, **When** I scroll, **Then** I see navigation to previous/next articles
4. **Given** I am reading an article, **When** I view images in content, **Then** they are responsive and properly sized
5. **Given** I am reading an article, **When** I view metadata, **Then** I see author, publication date, category, and estimated read time

---

### User Story 3 - Administer Blog Articles (Priority: P2)

As an ASPCI administrator, I want to manage blog articles through a dedicated interface so that I can create, edit, and publish content efficiently.

**Why this priority**: This enables content creation and management, which is essential for maintaining fresh blog content.

**Independent Test**: Can be fully tested by accessing /admin/blog and performing CRUD operations on articles.

**Acceptance Scenarios**:

1. **Given** I am authenticated as admin, **When** I access /admin/blog, **Then** I see a table listing all articles with thumbnails, titles, categories, dates, and status
2. **Given** I am on the admin page, **When** I click "New Article", **Then** a form opens with fields for title, content, image upload, and metadata
3. **Given** I am editing an article, **When** I fill the form and click "Save Draft", **Then** the article is saved with draft status and appears in the article list
4. **Given** I have a draft article, **When** I click "Publish", **Then** the article status changes to published and becomes visible on the public blog
5. **Given** I am viewing the article list, **When** I click "Edit" on an article, **Then** the form pre-populates with existing article data
6. **Given** I am editing an article, **When** I upload a cover image via drag & drop, **Then** I see a preview and the image is stored in /public/uploads/blog/
7. **Given** I am creating an article, **When** I use the rich text editor, **Then** I can format text with bold, italic, headings, lists, and insert images
8. **Given** I am viewing the article list, **When** I click "Delete" on an article, **Then** I see a confirmation dialog and the article is permanently removed

---

### Edge Cases

- What happens when no articles are published? (Show empty state message)
- How does system handle very long article titles? (Truncate with ellipsis in cards)
- What happens when cover image fails to load? (Show placeholder image)
- How does system handle articles with no category assigned? (Show "Uncategorized")
- What happens when admin uploads image larger than 5MB? (Show error message)
- How does system handle concurrent admin sessions? (Last save wins)
- What happens when slug URL conflicts with existing article? (Auto-increment with number)

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display published articles in a responsive grid layout (3 columns desktop, 2 tablet, 1 mobile)
- **FR-002**: System MUST show article cards with cover image, title, excerpt (150-200 chars), publication date, category, tags, and estimated read time
- **FR-003**: System MUST provide glassmorphism card effects with hover animations (elevation + scale)
- **FR-004**: System MUST implement fade-in scroll animations for article cards
- **FR-005**: System MUST provide search functionality filtering articles by title content
- **FR-006**: System MUST allow category-based filtering of articles
- **FR-007**: System MUST display individual articles with hero image, metadata, and rich text content in centered layout (max 800px)
- **FR-008**: System MUST provide navigation between previous/next articles
- **FR-009**: System MUST make images in article content responsive
- **FR-010**: System MUST protect /admin/blog with authentication (password: "aspci2025")
- **FR-011**: System MUST display article list table with thumbnail, title, category, creation date, status, and action buttons
- **FR-012**: System MUST provide search and filtering in admin article list (by title, category, status)
- **FR-013**: System MUST implement pagination in admin list (10-20 articles per page)
- **FR-014**: System MUST provide form for article creation/editing with required fields: title, slug (auto-generated), content (rich text), cover image, excerpt, category, tags, status
- **FR-015**: System MUST support drag & drop image upload with preview (JPG, PNG, WebP, GIF, max 5MB)
- **FR-016**: System MUST store uploaded images in /public/uploads/blog/ directory
- **FR-017**: System MUST provide rich text editor with formatting: bold, italic, underline, headings (H2-H4), lists, links, image insertion, blockquotes
- **FR-018**: System MUST allow saving articles as draft or published status
- **FR-019**: System MUST immediately show published articles on public blog without validation workflow
- **FR-020**: System MUST provide confirmation dialog for article deletion
- **FR-021**: System MUST persist admin authentication session
- **FR-022**: System MUST redirect unauthenticated users from admin pages to login

### Key Entities *(include if feature involves data)*

- **Article**: Represents a blog post with attributes: id, title, slug, content (HTML), excerpt, coverImage, category, tags (array), author, publishedAt, status, readTime
- **Category**: Represents article categories with attributes: id, name, slug, description
- **Tag**: Represents article tags with attributes: id, name, slug
- **Admin User**: Represents authenticated administrators with attributes: id, username, passwordHash, lastLogin

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Visitors can browse and read published articles without any loading delays over 2 seconds
- **SC-002**: Article cards display properly on all device sizes (desktop, tablet, mobile) with responsive grid
- **SC-003**: Admin users can create a new article with rich text content and image upload in under 5 minutes
- **SC-004**: Published articles appear immediately on the public blog without any approval delays
- **SC-005**: Image uploads complete successfully for files up to 5MB within 10 seconds
- **SC-006**: Admin interface loads article list with 50 articles in under 3 seconds
- **SC-007**: 95% of article creation attempts result in successful publication
- **SC-008**: Search functionality returns relevant results within 1 second for up to 100 articles
- **SC-009**: Authentication system prevents unauthorized access to admin functions with 100% effectiveness
- **SC-010**: Article editing preserves all formatting and content integrity during save operations

## Assumptions

- Articles will be written in French (primary language for ASPCI content)
- Average article length will be 800-1500 words
- Maximum of 100 articles expected initially, growing to 500 within first year
- Admin users will be limited to ASPCI staff (no external contributors initially)
- Images will be optimized before upload (no automatic compression required)
- No multi-author support needed initially (all articles attributed to "ASPCI")
- Categories will be predefined by ASPCI (Formation, Consulting, Sécurité, etc.)
- No comment system required initially
- Basic authentication sufficient (password-based, no advanced security needed)
