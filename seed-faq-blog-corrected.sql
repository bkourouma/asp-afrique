-- SQL script to insert FAQs and Blog Articles into production database
-- Using correct table names: faq_items and blog_posts
-- Run with: sudo -u postgres psql -d aspci_afrique_db -f seed-faq-blog-corrected.sql

-- First, let's check what columns exist (uncomment to run)
-- \d faq_items
-- \d blog_posts

-- Insert FAQs into faq_items table
-- Note: Adjust column names based on your actual schema
-- Common column names: question, answer, category, status, created_at, updated_at

INSERT INTO faq_items (question, answer, category, status) VALUES
('Comment créer mon compte ?', 'Vous pouvez créer votre compte gratuitement et accéder à toutes les fonctionnalités pendant la période d''essai. Aucune carte bancaire n''est requise pour commencer.', 'Compte', 'Publié')
ON CONFLICT (question) DO NOTHING;

INSERT INTO faq_items (question, answer, category, status) VALUES
('Puis-je changer de plan plus tard ?', 'Oui, absolument ! Vous pouvez mettre à niveau ou rétrograder votre plan à tout moment selon vos besoins.', 'Tarifs', 'Publié')
ON CONFLICT (question) DO NOTHING;

INSERT INTO faq_items (question, answer, category, status) VALUES
('Mes données sont-elles sécurisées ?', 'Absolument. Nous utilisons des technologies de cryptage de niveau bancaire et nos serveurs sont hébergés de manière sécurisée.', 'Sécurité', 'Publié')
ON CONFLICT (question) DO NOTHING;

INSERT INTO faq_items (question, answer, category, status) VALUES
('Qui peut utiliser ImmoTopia ?', 'ImmoTopia est conçu pour les agences immobilières, syndics de copropriété, promoteurs, gestionnaires, propriétaires, locataires et copropriétaires. Chaque utilisateur accède uniquement aux fonctionnalités correspondant à son rôle.', 'Général', 'Publié')
ON CONFLICT (question) DO NOTHING;

INSERT INTO faq_items (question, answer, category, status) VALUES
('ImmoTopia est-il adapté au marché ivoirien ?', 'Oui. La plateforme est pensée pour les réalités locales : Mobile Money, fiscalité, gestion locative, copropriété et pratiques immobilières en Côte d''Ivoire.', 'Général', 'Publié')
ON CONFLICT (question) DO NOTHING;

INSERT INTO faq_items (question, answer, category, status) VALUES
('Proposez-vous une période d''essai ?', 'Oui, une période d''essai est disponible pour permettre aux agences et professionnels de tester les principales fonctionnalités avant de s''engager.', 'Tarifs', 'Publié')
ON CONFLICT (question) DO NOTHING;

INSERT INTO faq_items (question, answer, category, status) VALUES
('Dois-je installer un logiciel sur mon ordinateur ?', 'Non. ImmoTopia est une solution 100 % en ligne accessible depuis un navigateur web, sur ordinateur, tablette ou smartphone.', 'Technique', 'Publié')
ON CONFLICT (question) DO NOTHING;

INSERT INTO faq_items (question, answer, category, status) VALUES
('Puis-je utiliser ImmoTopia sur mobile ?', 'Oui. La plateforme est entièrement responsive et optimisée pour une utilisation sur mobile.', 'Technique', 'Publié')
ON CONFLICT (question) DO NOTHING;

INSERT INTO faq_items (question, answer, category, status) VALUES
('Mes locataires et copropriétaires peuvent-ils se connecter ?', 'Oui. Les locataires et copropriétaires disposent d''un espace sécurisé pour consulter leurs informations, payer en ligne, recevoir des annonces et déclarer des incidents.', 'Utilisateurs', 'Publié')
ON CONFLICT (question) DO NOTHING;

INSERT INTO faq_items (question, answer, category, status) VALUES
('Les paiements Mobile Money sont-ils intégrés ?', 'Oui. ImmoTopia permet les paiements via Mobile Money pour les loyers, charges de copropriété, appels de fonds et autres frais.', 'Paiements', 'Publié')
ON CONFLICT (question) DO NOTHING;

INSERT INTO faq_items (question, answer, category, status) VALUES
('Puis-je gérer plusieurs agences ou immeubles ?', 'Oui. ImmoTopia est multi-tenant et permet de gérer plusieurs agences, immeubles, résidences ou programmes immobiliers depuis une seule interface.', 'Gestion', 'Publié')
ON CONFLICT (question) DO NOTHING;

INSERT INTO faq_items (question, answer, category, status) VALUES
('Les annonces sont-elles publiées sur le portail public ?', 'Oui. Les annonces validées peuvent être publiées automatiquement sur le portail public ImmoTopia selon votre abonnement et vos paramètres.', 'Annonces', 'Publié')
ON CONFLICT (question) DO NOTHING;

INSERT INTO faq_items (question, answer, category, status) VALUES
('Puis-je importer mes données existantes ?', 'Oui. Des outils d''importation (Excel, CSV) et un accompagnement sont proposés pour migrer vos biens, clients et contrats existants.', 'Données', 'Publié')
ON CONFLICT (question) DO NOTHING;

INSERT INTO faq_items (question, answer, category, status) VALUES
('ImmoTopia intègre-t-il un CRM ?', 'Oui. Un CRM immobilier complet est inclus pour le suivi des prospects, clients, rendez-vous, interactions et opportunités.', 'CRM', 'Publié')
ON CONFLICT (question) DO NOTHING;

INSERT INTO faq_items (question, answer, category, status) VALUES
('Peut-on gérer la copropriété avec ImmoTopia ?', 'Oui. Un module syndic complet est intégré : lots, charges, assemblées générales, votes, paiements et communication.', 'Copropriété', 'Publié')
ON CONFLICT (question) DO NOTHING;

INSERT INTO faq_items (question, answer, category, status) VALUES
('Les documents sont-ils stockés de manière sécurisée ?', 'Oui. Tous les documents sont stockés de façon sécurisée avec sauvegardes régulières.', 'Sécurité', 'Publié')
ON CONFLICT (question) DO NOTHING;

INSERT INTO faq_items (question, answer, category, status) VALUES
('Puis-je définir des droits par utilisateur ?', 'Oui. Les rôles et permissions sont entièrement configurables selon les profils utilisateurs.', 'Sécurité', 'Publié')
ON CONFLICT (question) DO NOTHING;

INSERT INTO faq_items (question, answer, category, status) VALUES
('Proposez-vous des formations ?', 'Oui. Des formations, démonstrations et supports pédagogiques sont proposés pour une prise en main rapide.', 'Support', 'Publié')
ON CONFLICT (question) DO NOTHING;

INSERT INTO faq_items (question, answer, category, status) VALUES
('Existe-t-il un support client ?', 'Oui. Un support technique et fonctionnel est disponible pour accompagner les utilisateurs.', 'Support', 'Publié')
ON CONFLICT (question) DO NOTHING;

INSERT INTO faq_items (question, answer, category, status) VALUES
('ImmoTopia va-t-il évoluer dans le temps ?', 'Oui. La plateforme évolue en continu avec de nouvelles fonctionnalités basées sur les retours des utilisateurs.', 'Produit', 'Publié')
ON CONFLICT (question) DO NOTHING;

-- Display summary
SELECT 'FAQs inserted: ' || COUNT(*) FROM faq_items WHERE status = 'Publié';
