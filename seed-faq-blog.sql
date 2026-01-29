-- SQL script to insert FAQs and Blog Articles into production database
-- Run with: psql -U aspci_user -d aspci_afrique_db -f seed-faq-blog.sql

-- First, ensure the faqs table exists (if migration hasn't been run yet)
-- This will be created by Prisma migration, but we add it here as backup
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'faqs') THEN
        CREATE TABLE faqs (
            id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
            question TEXT UNIQUE NOT NULL,
            answer TEXT NOT NULL,
            category TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'draft',
            "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        
        CREATE INDEX faqs_category_idx ON faqs(category);
        CREATE INDEX faqs_status_idx ON faqs(status);
        
        RAISE NOTICE 'Table faqs created';
    ELSE
        RAISE NOTICE 'Table faqs already exists';
    END IF;
END $$;

-- Insert FAQs (using ON CONFLICT to avoid duplicates)
INSERT INTO faqs (question, answer, category, status) VALUES
('Comment créer mon compte ?', 'Vous pouvez créer votre compte gratuitement et accéder à toutes les fonctionnalités pendant la période d''essai. Aucune carte bancaire n''est requise pour commencer.', 'Compte', 'Publié')
ON CONFLICT (question) DO NOTHING;

INSERT INTO faqs (question, answer, category, status) VALUES
('Puis-je changer de plan plus tard ?', 'Oui, absolument ! Vous pouvez mettre à niveau ou rétrograder votre plan à tout moment selon vos besoins.', 'Tarifs', 'Publié')
ON CONFLICT (question) DO NOTHING;

INSERT INTO faqs (question, answer, category, status) VALUES
('Mes données sont-elles sécurisées ?', 'Absolument. Nous utilisons des technologies de cryptage de niveau bancaire et nos serveurs sont hébergés de manière sécurisée.', 'Sécurité', 'Publié')
ON CONFLICT (question) DO NOTHING;

INSERT INTO faqs (question, answer, category, status) VALUES
('Qui peut utiliser ImmoTopia ?', 'ImmoTopia est conçu pour les agences immobilières, syndics de copropriété, promoteurs, gestionnaires, propriétaires, locataires et copropriétaires. Chaque utilisateur accède uniquement aux fonctionnalités correspondant à son rôle.', 'Général', 'Publié')
ON CONFLICT (question) DO NOTHING;

INSERT INTO faqs (question, answer, category, status) VALUES
('ImmoTopia est-il adapté au marché ivoirien ?', 'Oui. La plateforme est pensée pour les réalités locales : Mobile Money, fiscalité, gestion locative, copropriété et pratiques immobilières en Côte d''Ivoire.', 'Général', 'Publié')
ON CONFLICT (question) DO NOTHING;

INSERT INTO faqs (question, answer, category, status) VALUES
('Proposez-vous une période d''essai ?', 'Oui, une période d''essai est disponible pour permettre aux agences et professionnels de tester les principales fonctionnalités avant de s''engager.', 'Tarifs', 'Publié')
ON CONFLICT (question) DO NOTHING;

INSERT INTO faqs (question, answer, category, status) VALUES
('Dois-je installer un logiciel sur mon ordinateur ?', 'Non. ImmoTopia est une solution 100 % en ligne accessible depuis un navigateur web, sur ordinateur, tablette ou smartphone.', 'Technique', 'Publié')
ON CONFLICT (question) DO NOTHING;

INSERT INTO faqs (question, answer, category, status) VALUES
('Puis-je utiliser ImmoTopia sur mobile ?', 'Oui. La plateforme est entièrement responsive et optimisée pour une utilisation sur mobile.', 'Technique', 'Publié')
ON CONFLICT (question) DO NOTHING;

INSERT INTO faqs (question, answer, category, status) VALUES
('Mes locataires et copropriétaires peuvent-ils se connecter ?', 'Oui. Les locataires et copropriétaires disposent d''un espace sécurisé pour consulter leurs informations, payer en ligne, recevoir des annonces et déclarer des incidents.', 'Utilisateurs', 'Publié')
ON CONFLICT (question) DO NOTHING;

INSERT INTO faqs (question, answer, category, status) VALUES
('Les paiements Mobile Money sont-ils intégrés ?', 'Oui. ImmoTopia permet les paiements via Mobile Money pour les loyers, charges de copropriété, appels de fonds et autres frais.', 'Paiements', 'Publié')
ON CONFLICT (question) DO NOTHING;

INSERT INTO faqs (question, answer, category, status) VALUES
('Puis-je gérer plusieurs agences ou immeubles ?', 'Oui. ImmoTopia est multi-tenant et permet de gérer plusieurs agences, immeubles, résidences ou programmes immobiliers depuis une seule interface.', 'Gestion', 'Publié')
ON CONFLICT (question) DO NOTHING;

INSERT INTO faqs (question, answer, category, status) VALUES
('Les annonces sont-elles publiées sur le portail public ?', 'Oui. Les annonces validées peuvent être publiées automatiquement sur le portail public ImmoTopia selon votre abonnement et vos paramètres.', 'Annonces', 'Publié')
ON CONFLICT (question) DO NOTHING;

INSERT INTO faqs (question, answer, category, status) VALUES
('Puis-je importer mes données existantes ?', 'Oui. Des outils d''importation (Excel, CSV) et un accompagnement sont proposés pour migrer vos biens, clients et contrats existants.', 'Données', 'Publié')
ON CONFLICT (question) DO NOTHING;

INSERT INTO faqs (question, answer, category, status) VALUES
('ImmoTopia intègre-t-il un CRM ?', 'Oui. Un CRM immobilier complet est inclus pour le suivi des prospects, clients, rendez-vous, interactions et opportunités.', 'CRM', 'Publié')
ON CONFLICT (question) DO NOTHING;

INSERT INTO faqs (question, answer, category, status) VALUES
('Peut-on gérer la copropriété avec ImmoTopia ?', 'Oui. Un module syndic complet est intégré : lots, charges, assemblées générales, votes, paiements et communication.', 'Copropriété', 'Publié')
ON CONFLICT (question) DO NOTHING;

INSERT INTO faqs (question, answer, category, status) VALUES
('Les documents sont-ils stockés de manière sécurisée ?', 'Oui. Tous les documents sont stockés de façon sécurisée avec sauvegardes régulières.', 'Sécurité', 'Publié')
ON CONFLICT (question) DO NOTHING;

INSERT INTO faqs (question, answer, category, status) VALUES
('Puis-je définir des droits par utilisateur ?', 'Oui. Les rôles et permissions sont entièrement configurables selon les profils utilisateurs.', 'Sécurité', 'Publié')
ON CONFLICT (question) DO NOTHING;

INSERT INTO faqs (question, answer, category, status) VALUES
('Proposez-vous des formations ?', 'Oui. Des formations, démonstrations et supports pédagogiques sont proposés pour une prise en main rapide.', 'Support', 'Publié')
ON CONFLICT (question) DO NOTHING;

INSERT INTO faqs (question, answer, category, status) VALUES
('Existe-t-il un support client ?', 'Oui. Un support technique et fonctionnel est disponible pour accompagner les utilisateurs.', 'Support', 'Publié')
ON CONFLICT (question) DO NOTHING;

INSERT INTO faqs (question, answer, category, status) VALUES
('ImmoTopia va-t-il évoluer dans le temps ?', 'Oui. La plateforme évolue en continu avec de nouvelles fonctionnalités basées sur les retours des utilisateurs.', 'Produit', 'Publié')
ON CONFLICT (question) DO NOTHING;

-- Insert Blog Articles
-- Calculate read time: ~200 words per minute
INSERT INTO blog_articles (id, title, slug, content, excerpt, category, tags, author, status, "publishedAt", "readTime", "createdAt", "updatedAt") VALUES
(
    gen_random_uuid()::text,
    'Pourquoi la digitalisation est devenue incontournable dans l''immobilier en Côte d''Ivoire',
    'digitalisation-immobilier-cote-ivoire',
    'Le secteur immobilier en Côte d''Ivoire connaît une croissance soutenue, portée par l''urbanisation, l''augmentation de la demande en logements et la structuration progressive du marché. Cependant, de nombreuses agences et gestionnaires continuent de fonctionner avec des outils manuels ou fragmentés, ce qui limite leur efficacité.

La digitalisation permet de centraliser toutes les informations liées aux biens, aux clients, aux contrats et aux paiements dans un seul système. Elle réduit considérablement les erreurs, améliore la traçabilité et facilite la prise de décision grâce à des tableaux de bord en temps réel.

Dans un contexte où les clients sont de plus en plus connectés, disposer d''outils numériques devient également un facteur de crédibilité. Les agences digitalisées inspirent plus de confiance, communiquent mieux et répondent plus rapidement aux demandes.

Enfin, la digitalisation prépare les acteurs immobiliers aux évolutions futures du marché : paiements en ligne, automatisation, intelligence artificielle et interconnexion avec d''autres services (banques, assurances, notaires). Elle n''est plus un luxe, mais une nécessité stratégique.',
    'La digitalisation permet de centraliser toutes les informations liées aux biens, aux clients, aux contrats et aux paiements dans un seul système.',
    'Transformation digitale',
    ARRAY['immobilier', 'digitalisation', 'Côte d''Ivoire', 'SaaS'],
    'ASPCI',
    'published',
    '2026-01-01'::timestamp,
    3,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO blog_articles (id, title, slug, content, excerpt, category, tags, author, status, "publishedAt", "readTime", "createdAt", "updatedAt") VALUES
(
    gen_random_uuid()::text,
    'Pourquoi un logiciel de gestion immobilière transforme le quotidien des agences',
    'logiciel-gestion-immobiliere-agences',
    'Gérer une agence immobilière implique de nombreuses tâches : suivi des biens, gestion des clients, perception des loyers, production de documents, reporting et communication. Sans outil adapté, ces tâches deviennent chronophages et sources d''erreurs.

Un logiciel de gestion immobilière centralise l''ensemble de ces opérations. Chaque bien dispose d''une fiche complète, chaque client d''un historique clair, et chaque transaction est tracée. Les équipes gagnent du temps et peuvent se concentrer sur des activités à forte valeur ajoutée comme la prospection et le conseil.

De plus, un ERP immobilier améliore la collaboration interne. Les agents, gestionnaires et comptables travaillent sur la même base de données, avec des droits adaptés à leurs rôles.

Enfin, le pilotage de l''activité devient plus simple grâce aux indicateurs clés : taux d''occupation, loyers encaissés, impayés, performance commerciale. L''agence gagne en professionnalisme et en rentabilité.',
    'Un logiciel de gestion immobilière centralise l''ensemble de ces opérations. Chaque bien dispose d''une fiche complète, chaque client d''un historique clair.',
    'Gestion immobilière',
    ARRAY['ERP immobilier', 'agence immobilière', 'gestion'],
    'ASPCI',
    'published',
    '2026-01-03'::timestamp,
    3,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO blog_articles (id, title, slug, content, excerpt, category, tags, author, status, "publishedAt", "readTime", "createdAt", "updatedAt") VALUES
(
    gen_random_uuid()::text,
    'Comment l''automatisation révolutionne la gestion locative',
    'gestion-locative-automatisation',
    'La gestion locative traditionnelle repose souvent sur des relances manuelles, des calculs approximatifs et une forte dépendance à l''humain. Cela entraîne des retards, des oublis et parfois des conflits avec les locataires.

L''automatisation permet de fiabiliser l''ensemble du processus. Les loyers sont générés automatiquement, les échéances sont connues à l''avance et les quittances sont produites sans intervention manuelle.

Les paiements en ligne, notamment via Mobile Money, réduisent les délais d''encaissement et améliorent la trésorerie. Les relances automatiques limitent les impayés tout en conservant une communication professionnelle.

Pour les gestionnaires, l''automatisation offre une vision claire du portefeuille locatif et permet de gérer un plus grand nombre de biens sans augmenter la charge de travail.',
    'L''automatisation permet de fiabiliser l''ensemble du processus. Les loyers sont générés automatiquement, les échéances sont connues à l''avance.',
    'Gestion locative',
    ARRAY['gestion locative', 'automatisation', 'loyers'],
    'ASPCI',
    'published',
    '2026-01-05'::timestamp,
    2,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO blog_articles (id, title, slug, content, excerpt, category, tags, author, status, "publishedAt", "readTime", "createdAt", "updatedAt") VALUES
(
    gen_random_uuid()::text,
    'Le paiement par Mobile Money : un levier majeur pour l''immobilier',
    'paiement-mobile-money-immobilier',
    'Le Mobile Money est devenu un moyen de paiement incontournable en Afrique de l''Ouest. Dans l''immobilier, il répond à un besoin crucial : faciliter et sécuriser le paiement des loyers et des charges.

Pour les locataires et copropriétaires, le paiement par Mobile Money offre simplicité et rapidité. Plus besoin de se déplacer ou de manipuler du cash. Les transactions sont traçables et les reçus sont générés automatiquement.

Pour les agences et syndics, ce mode de paiement améliore le taux de recouvrement et simplifie le rapprochement comptable. Les flux financiers sont centralisés et consultables en temps réel.

Intégrer le Mobile Money dans la gestion immobilière n''est plus une option, mais un avantage concurrentiel fort sur le marché ivoirien.',
    'Le Mobile Money est devenu un moyen de paiement incontournable en Afrique de l''Ouest. Dans l''immobilier, il répond à un besoin crucial.',
    'Paiements',
    ARRAY['Mobile Money', 'paiement en ligne', 'immobilier'],
    'ASPCI',
    'published',
    '2026-01-07'::timestamp,
    2,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO blog_articles (id, title, slug, content, excerpt, category, tags, author, status, "publishedAt", "readTime", "createdAt", "updatedAt") VALUES
(
    gen_random_uuid()::text,
    'L''intelligence artificielle, nouvel allié de l''immobilier en Afrique',
    'ia-dans-immobilier-afrique',
    'L''intelligence artificielle commence à transformer le secteur immobilier africain. Elle permet d''analyser de grandes quantités de données pour améliorer la prise de décision.

Dans la gestion immobilière, l''IA peut aider à mieux qualifier les prospects, recommander des biens pertinents et optimiser la visibilité des annonces. Elle contribue également à détecter des anomalies, comme des retards de paiement récurrents.

Pour les dirigeants, l''IA offre une vision prédictive : anticipation des impayés, estimation de la demande, analyse des performances.

À mesure que ces technologies deviennent accessibles, elles représentent une opportunité majeure pour professionnaliser et moderniser durablement le secteur immobilier en Afrique.',
    'L''intelligence artificielle commence à transformer le secteur immobilier africain. Elle permet d''analyser de grandes quantités de données.',
    'Innovation',
    ARRAY['IA', 'immobilier', 'Afrique'],
    'ASPCI',
    'published',
    '2026-01-09'::timestamp,
    2,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
)
ON CONFLICT (slug) DO NOTHING;

-- Display summary
SELECT 'FAQs inserted: ' || COUNT(*) FROM faqs WHERE status = 'Publié';
SELECT 'Blog articles inserted: ' || COUNT(*) FROM blog_articles WHERE status = 'published';

