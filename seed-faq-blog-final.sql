-- SQL script to insert FAQs and Blog Articles into production database
-- Using correct table names: faq_items and blog_posts
-- Run with: sudo -u postgres psql -d aspci_afrique_db -f seed-faq-blog-final.sql

-- Insert FAQs into faq_items table
-- Columns: id, question, answer, category, "order", locale, status, "createdAt", "updatedAt", "deletedAt"
INSERT INTO faq_items (id, question, answer, category, "order", locale, status, "createdAt", "updatedAt") VALUES
(gen_random_uuid()::text, 'Comment créer mon compte ?', 'Vous pouvez créer votre compte gratuitement et accéder à toutes les fonctionnalités pendant la période d''essai. Aucune carte bancaire n''est requise pour commencer.', 'Compte', 1, 'fr', 'Publié', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (question) DO NOTHING;

INSERT INTO faq_items (id, question, answer, category, "order", locale, status, "createdAt", "updatedAt") VALUES
(gen_random_uuid()::text, 'Puis-je changer de plan plus tard ?', 'Oui, absolument ! Vous pouvez mettre à niveau ou rétrograder votre plan à tout moment selon vos besoins.', 'Tarifs', 2, 'fr', 'Publié', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (question) DO NOTHING;

INSERT INTO faq_items (id, question, answer, category, "order", locale, status, "createdAt", "updatedAt") VALUES
(gen_random_uuid()::text, 'Mes données sont-elles sécurisées ?', 'Absolument. Nous utilisons des technologies de cryptage de niveau bancaire et nos serveurs sont hébergés de manière sécurisée.', 'Sécurité', 3, 'fr', 'Publié', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (question) DO NOTHING;

INSERT INTO faq_items (id, question, answer, category, "order", locale, status, "createdAt", "updatedAt") VALUES
(gen_random_uuid()::text, 'Qui peut utiliser ImmoTopia ?', 'ImmoTopia est conçu pour les agences immobilières, syndics de copropriété, promoteurs, gestionnaires, propriétaires, locataires et copropriétaires. Chaque utilisateur accède uniquement aux fonctionnalités correspondant à son rôle.', 'Général', 4, 'fr', 'Publié', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (question) DO NOTHING;

INSERT INTO faq_items (id, question, answer, category, "order", locale, status, "createdAt", "updatedAt") VALUES
(gen_random_uuid()::text, 'ImmoTopia est-il adapté au marché ivoirien ?', 'Oui. La plateforme est pensée pour les réalités locales : Mobile Money, fiscalité, gestion locative, copropriété et pratiques immobilières en Côte d''Ivoire.', 'Général', 5, 'fr', 'Publié', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (question) DO NOTHING;

INSERT INTO faq_items (id, question, answer, category, "order", locale, status, "createdAt", "updatedAt") VALUES
(gen_random_uuid()::text, 'Proposez-vous une période d''essai ?', 'Oui, une période d''essai est disponible pour permettre aux agences et professionnels de tester les principales fonctionnalités avant de s''engager.', 'Tarifs', 6, 'fr', 'Publié', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (question) DO NOTHING;

INSERT INTO faq_items (id, question, answer, category, "order", locale, status, "createdAt", "updatedAt") VALUES
(gen_random_uuid()::text, 'Dois-je installer un logiciel sur mon ordinateur ?', 'Non. ImmoTopia est une solution 100 % en ligne accessible depuis un navigateur web, sur ordinateur, tablette ou smartphone.', 'Technique', 7, 'fr', 'Publié', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (question) DO NOTHING;

INSERT INTO faq_items (id, question, answer, category, "order", locale, status, "createdAt", "updatedAt") VALUES
(gen_random_uuid()::text, 'Puis-je utiliser ImmoTopia sur mobile ?', 'Oui. La plateforme est entièrement responsive et optimisée pour une utilisation sur mobile.', 'Technique', 8, 'fr', 'Publié', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (question) DO NOTHING;

INSERT INTO faq_items (id, question, answer, category, "order", locale, status, "createdAt", "updatedAt") VALUES
(gen_random_uuid()::text, 'Mes locataires et copropriétaires peuvent-ils se connecter ?', 'Oui. Les locataires et copropriétaires disposent d''un espace sécurisé pour consulter leurs informations, payer en ligne, recevoir des annonces et déclarer des incidents.', 'Utilisateurs', 9, 'fr', 'Publié', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (question) DO NOTHING;

INSERT INTO faq_items (id, question, answer, category, "order", locale, status, "createdAt", "updatedAt") VALUES
(gen_random_uuid()::text, 'Les paiements Mobile Money sont-ils intégrés ?', 'Oui. ImmoTopia permet les paiements via Mobile Money pour les loyers, charges de copropriété, appels de fonds et autres frais.', 'Paiements', 10, 'fr', 'Publié', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (question) DO NOTHING;

INSERT INTO faq_items (id, question, answer, category, "order", locale, status, "createdAt", "updatedAt") VALUES
(gen_random_uuid()::text, 'Puis-je gérer plusieurs agences ou immeubles ?', 'Oui. ImmoTopia est multi-tenant et permet de gérer plusieurs agences, immeubles, résidences ou programmes immobiliers depuis une seule interface.', 'Gestion', 11, 'fr', 'Publié', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (question) DO NOTHING;

INSERT INTO faq_items (id, question, answer, category, "order", locale, status, "createdAt", "updatedAt") VALUES
(gen_random_uuid()::text, 'Les annonces sont-elles publiées sur le portail public ?', 'Oui. Les annonces validées peuvent être publiées automatiquement sur le portail public ImmoTopia selon votre abonnement et vos paramètres.', 'Annonces', 12, 'fr', 'Publié', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (question) DO NOTHING;

INSERT INTO faq_items (id, question, answer, category, "order", locale, status, "createdAt", "updatedAt") VALUES
(gen_random_uuid()::text, 'Puis-je importer mes données existantes ?', 'Oui. Des outils d''importation (Excel, CSV) et un accompagnement sont proposés pour migrer vos biens, clients et contrats existants.', 'Données', 13, 'fr', 'Publié', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (question) DO NOTHING;

INSERT INTO faq_items (id, question, answer, category, "order", locale, status, "createdAt", "updatedAt") VALUES
(gen_random_uuid()::text, 'ImmoTopia intègre-t-il un CRM ?', 'Oui. Un CRM immobilier complet est inclus pour le suivi des prospects, clients, rendez-vous, interactions et opportunités.', 'CRM', 14, 'fr', 'Publié', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (question) DO NOTHING;

INSERT INTO faq_items (id, question, answer, category, "order", locale, status, "createdAt", "updatedAt") VALUES
(gen_random_uuid()::text, 'Peut-on gérer la copropriété avec ImmoTopia ?', 'Oui. Un module syndic complet est intégré : lots, charges, assemblées générales, votes, paiements et communication.', 'Copropriété', 15, 'fr', 'Publié', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (question) DO NOTHING;

INSERT INTO faq_items (id, question, answer, category, "order", locale, status, "createdAt", "updatedAt") VALUES
(gen_random_uuid()::text, 'Les documents sont-ils stockés de manière sécurisée ?', 'Oui. Tous les documents sont stockés de façon sécurisée avec sauvegardes régulières.', 'Sécurité', 16, 'fr', 'Publié', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (question) DO NOTHING;

INSERT INTO faq_items (id, question, answer, category, "order", locale, status, "createdAt", "updatedAt") VALUES
(gen_random_uuid()::text, 'Puis-je définir des droits par utilisateur ?', 'Oui. Les rôles et permissions sont entièrement configurables selon les profils utilisateurs.', 'Sécurité', 17, 'fr', 'Publié', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (question) DO NOTHING;

INSERT INTO faq_items (id, question, answer, category, "order", locale, status, "createdAt", "updatedAt") VALUES
(gen_random_uuid()::text, 'Proposez-vous des formations ?', 'Oui. Des formations, démonstrations et supports pédagogiques sont proposés pour une prise en main rapide.', 'Support', 18, 'fr', 'Publié', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (question) DO NOTHING;

INSERT INTO faq_items (id, question, answer, category, "order", locale, status, "createdAt", "updatedAt") VALUES
(gen_random_uuid()::text, 'Existe-t-il un support client ?', 'Oui. Un support technique et fonctionnel est disponible pour accompagner les utilisateurs.', 'Support', 19, 'fr', 'Publié', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (question) DO NOTHING;

INSERT INTO faq_items (id, question, answer, category, "order", locale, status, "createdAt", "updatedAt") VALUES
(gen_random_uuid()::text, 'ImmoTopia va-t-il évoluer dans le temps ?', 'Oui. La plateforme évolue en continu avec de nouvelles fonctionnalités basées sur les retours des utilisateurs.', 'Produit', 20, 'fr', 'Publié', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (question) DO NOTHING;

-- Insert Blog Categories first (if they don't exist)
INSERT INTO blog_categories (id, name, slug, description, locale, "createdAt", "updatedAt") VALUES
(gen_random_uuid()::text, 'Transformation digitale', 'transformation-digitale', 'Articles sur la digitalisation dans l''immobilier', 'fr', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (slug, locale) DO NOTHING;

INSERT INTO blog_categories (id, name, slug, description, locale, "createdAt", "updatedAt") VALUES
(gen_random_uuid()::text, 'Gestion immobilière', 'gestion-immobiliere', 'Conseils et outils pour la gestion immobilière', 'fr', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (slug, locale) DO NOTHING;

INSERT INTO blog_categories (id, name, slug, description, locale, "createdAt", "updatedAt") VALUES
(gen_random_uuid()::text, 'Gestion locative', 'gestion-locative', 'Articles sur la gestion locative', 'fr', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (slug, locale) DO NOTHING;

INSERT INTO blog_categories (id, name, slug, description, locale, "createdAt", "updatedAt") VALUES
(gen_random_uuid()::text, 'Paiements', 'paiements', 'Solutions de paiement pour l''immobilier', 'fr', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (slug, locale) DO NOTHING;

INSERT INTO blog_categories (id, name, slug, description, locale, "createdAt", "updatedAt") VALUES
(gen_random_uuid()::text, 'Innovation', 'innovation', 'Innovations technologiques dans l''immobilier', 'fr', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (slug, locale) DO NOTHING;

-- Insert Blog Tags
-- Note: You'll need to use actual tag IDs in blog_post_tags later
DO $$
DECLARE
    tag_digitalisation_id TEXT;
    tag_immobilier_id TEXT;
    tag_cote_ivoire_id TEXT;
    tag_saas_id TEXT;
    tag_erp_id TEXT;
    tag_agence_id TEXT;
    tag_gestion_id TEXT;
    tag_automatisation_id TEXT;
    tag_loyers_id TEXT;
    tag_mobile_money_id TEXT;
    tag_paiement_id TEXT;
    tag_ia_id TEXT;
    tag_afrique_id TEXT;
BEGIN
    -- Insert tags and get their IDs
    INSERT INTO blog_tags (id, name, slug, locale, "createdAt") VALUES
    (gen_random_uuid()::text, 'digitalisation', 'digitalisation', 'fr', CURRENT_TIMESTAMP)
    ON CONFLICT (slug, locale) DO NOTHING RETURNING id INTO tag_digitalisation_id;
    
    INSERT INTO blog_tags (id, name, slug, locale, "createdAt") VALUES
    (gen_random_uuid()::text, 'immobilier', 'immobilier', 'fr', CURRENT_TIMESTAMP)
    ON CONFLICT (slug, locale) DO NOTHING RETURNING id INTO tag_immobilier_id;
    
    -- Continue with other tags...
END $$;

-- Insert Blog Posts
-- Get category IDs first
DO $$
DECLARE
    cat_digitalisation_id TEXT;
    cat_gestion_id TEXT;
    cat_locative_id TEXT;
    cat_paiements_id TEXT;
    cat_innovation_id TEXT;
    post1_id TEXT;
    post2_id TEXT;
    post3_id TEXT;
    post4_id TEXT;
    post5_id TEXT;
BEGIN
    -- Get category IDs
    SELECT id INTO cat_digitalisation_id FROM blog_categories WHERE slug = 'transformation-digitale' AND locale = 'fr' LIMIT 1;
    SELECT id INTO cat_gestion_id FROM blog_categories WHERE slug = 'gestion-immobiliere' AND locale = 'fr' LIMIT 1;
    SELECT id INTO cat_locative_id FROM blog_categories WHERE slug = 'gestion-locative' AND locale = 'fr' LIMIT 1;
    SELECT id INTO cat_paiements_id FROM blog_categories WHERE slug = 'paiements' AND locale = 'fr' LIMIT 1;
    SELECT id INTO cat_innovation_id FROM blog_categories WHERE slug = 'innovation' AND locale = 'fr' LIMIT 1;
    
    -- Insert Blog Post 1
    INSERT INTO blog_posts (
        id, title, slug, description, content, status, "publishedAt", "categoryId", author, 
        "seoTitle", "seoDescription", locale, "readingTime", "createdAt", "updatedAt"
    ) VALUES (
        gen_random_uuid()::text,
        'Pourquoi la digitalisation est devenue incontournable dans l''immobilier en Côte d''Ivoire',
        'digitalisation-immobilier-cote-ivoire',
        'La digitalisation permet de centraliser toutes les informations liées aux biens, aux clients, aux contrats et aux paiements dans un seul système.',
        'Le secteur immobilier en Côte d''Ivoire connaît une croissance soutenue, portée par l''urbanisation, l''augmentation de la demande en logements et la structuration progressive du marché. Cependant, de nombreuses agences et gestionnaires continuent de fonctionner avec des outils manuels ou fragmentés, ce qui limite leur efficacité.

La digitalisation permet de centraliser toutes les informations liées aux biens, aux clients, aux contrats et aux paiements dans un seul système. Elle réduit considérablement les erreurs, améliore la traçabilité et facilite la prise de décision grâce à des tableaux de bord en temps réel.

Dans un contexte où les clients sont de plus en plus connectés, disposer d''outils numériques devient également un facteur de crédibilité. Les agences digitalisées inspirent plus de confiance, communiquent mieux et répondent plus rapidement aux demandes.

Enfin, la digitalisation prépare les acteurs immobiliers aux évolutions futures du marché : paiements en ligne, automatisation, intelligence artificielle et interconnexion avec d''autres services (banques, assurances, notaires). Elle n''est plus un luxe, mais une nécessité stratégique.',
        'published',
        '2026-01-01'::timestamp,
        cat_digitalisation_id,
        'ASPCI',
        'Digitalisation Immobilier Côte d''Ivoire | ImmoTopia',
        'Découvrez pourquoi la digitalisation est devenue incontournable dans le secteur immobilier ivoirien et comment elle transforme la gestion immobilière.',
        'fr',
        3,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ) ON CONFLICT (slug, locale) DO NOTHING RETURNING id INTO post1_id;
    
    -- Insert Blog Post 2
    INSERT INTO blog_posts (
        id, title, slug, description, content, status, "publishedAt", "categoryId", author,
        "seoTitle", "seoDescription", locale, "readingTime", "createdAt", "updatedAt"
    ) VALUES (
        gen_random_uuid()::text,
        'Pourquoi un logiciel de gestion immobilière transforme le quotidien des agences',
        'logiciel-gestion-immobiliere-agences',
        'Un logiciel de gestion immobilière centralise l''ensemble de ces opérations. Chaque bien dispose d''une fiche complète, chaque client d''un historique clair.',
        'Gérer une agence immobilière implique de nombreuses tâches : suivi des biens, gestion des clients, perception des loyers, production de documents, reporting et communication. Sans outil adapté, ces tâches deviennent chronophages et sources d''erreurs.

Un logiciel de gestion immobilière centralise l''ensemble de ces opérations. Chaque bien dispose d''une fiche complète, chaque client d''un historique clair, et chaque transaction est tracée. Les équipes gagnent du temps et peuvent se concentrer sur des activités à forte valeur ajoutée comme la prospection et le conseil.

De plus, un ERP immobilier améliore la collaboration interne. Les agents, gestionnaires et comptables travaillent sur la même base de données, avec des droits adaptés à leurs rôles.

Enfin, le pilotage de l''activité devient plus simple grâce aux indicateurs clés : taux d''occupation, loyers encaissés, impayés, performance commerciale. L''agence gagne en professionnalisme et en rentabilité.',
        'published',
        '2026-01-03'::timestamp,
        cat_gestion_id,
        'ASPCI',
        'Logiciel Gestion Immobilière | ERP Immobilier',
        'Découvrez comment un logiciel de gestion immobilière transforme le quotidien des agences et améliore leur rentabilité.',
        'fr',
        3,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ) ON CONFLICT (slug, locale) DO NOTHING RETURNING id INTO post2_id;
    
    -- Insert Blog Post 3
    INSERT INTO blog_posts (
        id, title, slug, description, content, status, "publishedAt", "categoryId", author,
        "seoTitle", "seoDescription", locale, "readingTime", "createdAt", "updatedAt"
    ) VALUES (
        gen_random_uuid()::text,
        'Comment l''automatisation révolutionne la gestion locative',
        'gestion-locative-automatisation',
        'L''automatisation permet de fiabiliser l''ensemble du processus. Les loyers sont générés automatiquement, les échéances sont connues à l''avance.',
        'La gestion locative traditionnelle repose souvent sur des relances manuelles, des calculs approximatifs et une forte dépendance à l''humain. Cela entraîne des retards, des oublis et parfois des conflits avec les locataires.

L''automatisation permet de fiabiliser l''ensemble du processus. Les loyers sont générés automatiquement, les échéances sont connues à l''avance et les quittances sont produites sans intervention manuelle.

Les paiements en ligne, notamment via Mobile Money, réduisent les délais d''encaissement et améliorent la trésorerie. Les relances automatiques limitent les impayés tout en conservant une communication professionnelle.

Pour les gestionnaires, l''automatisation offre une vision claire du portefeuille locatif et permet de gérer un plus grand nombre de biens sans augmenter la charge de travail.',
        'published',
        '2026-01-05'::timestamp,
        cat_locative_id,
        'ASPCI',
        'Automatisation Gestion Locative | ImmoTopia',
        'Découvrez comment l''automatisation révolutionne la gestion locative et améliore l''efficacité des gestionnaires.',
        'fr',
        2,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ) ON CONFLICT (slug, locale) DO NOTHING RETURNING id INTO post3_id;
    
    -- Insert Blog Post 4
    INSERT INTO blog_posts (
        id, title, slug, description, content, status, "publishedAt", "categoryId", author,
        "seoTitle", "seoDescription", locale, "readingTime", "createdAt", "updatedAt"
    ) VALUES (
        gen_random_uuid()::text,
        'Le paiement par Mobile Money : un levier majeur pour l''immobilier',
        'paiement-mobile-money-immobilier',
        'Le Mobile Money est devenu un moyen de paiement incontournable en Afrique de l''Ouest. Dans l''immobilier, il répond à un besoin crucial.',
        'Le Mobile Money est devenu un moyen de paiement incontournable en Afrique de l''Ouest. Dans l''immobilier, il répond à un besoin crucial : faciliter et sécuriser le paiement des loyers et des charges.

Pour les locataires et copropriétaires, le paiement par Mobile Money offre simplicité et rapidité. Plus besoin de se déplacer ou de manipuler du cash. Les transactions sont traçables et les reçus sont générés automatiquement.

Pour les agences et syndics, ce mode de paiement améliore le taux de recouvrement et simplifie le rapprochement comptable. Les flux financiers sont centralisés et consultables en temps réel.

Intégrer le Mobile Money dans la gestion immobilière n''est plus une option, mais un avantage concurrentiel fort sur le marché ivoirien.',
        'published',
        '2026-01-07'::timestamp,
        cat_paiements_id,
        'ASPCI',
        'Paiement Mobile Money Immobilier | ImmoTopia',
        'Découvrez comment le paiement par Mobile Money est devenu un levier majeur pour l''immobilier en Côte d''Ivoire.',
        'fr',
        2,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ) ON CONFLICT (slug, locale) DO NOTHING RETURNING id INTO post4_id;
    
    -- Insert Blog Post 5
    INSERT INTO blog_posts (
        id, title, slug, description, content, status, "publishedAt", "categoryId", author,
        "seoTitle", "seoDescription", locale, "readingTime", "createdAt", "updatedAt"
    ) VALUES (
        gen_random_uuid()::text,
        'L''intelligence artificielle, nouvel allié de l''immobilier en Afrique',
        'ia-dans-immobilier-afrique',
        'L''intelligence artificielle commence à transformer le secteur immobilier africain. Elle permet d''analyser de grandes quantités de données.',
        'L''intelligence artificielle commence à transformer le secteur immobilier africain. Elle permet d''analyser de grandes quantités de données pour améliorer la prise de décision.

Dans la gestion immobilière, l''IA peut aider à mieux qualifier les prospects, recommander des biens pertinents et optimiser la visibilité des annonces. Elle contribue également à détecter des anomalies, comme des retards de paiement récurrents.

Pour les dirigeants, l''IA offre une vision prédictive : anticipation des impayés, estimation de la demande, analyse des performances.

À mesure que ces technologies deviennent accessibles, elles représentent une opportunité majeure pour professionnaliser et moderniser durablement le secteur immobilier en Afrique.',
        'published',
        '2026-01-09'::timestamp,
        cat_innovation_id,
        'ASPCI',
        'IA Immobilier Afrique | Intelligence Artificielle',
        'Découvrez comment l''intelligence artificielle transforme le secteur immobilier africain.',
        'fr',
        2,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ) ON CONFLICT (slug, locale) DO NOTHING RETURNING id INTO post5_id;
END $$;

-- Display summary
SELECT 'FAQs inserted: ' || COUNT(*) FROM faq_items WHERE status = 'Publié';
SELECT 'Blog posts inserted: ' || COUNT(*) FROM blog_posts WHERE status = 'published';


