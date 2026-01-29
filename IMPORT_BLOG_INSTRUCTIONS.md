# Instructions d'importation des articles de blog

## Prérequis
- Accès SSH au serveur (deployer@147.93.44.169)
- Script d'importation: `import-blog-posts.ts`

## Étape 1: Copier le script sur le serveur

Depuis votre machine locale (dans le dossier du projet):

```bash
# Copier le script d'importation
scp import-blog-posts.ts deployer@147.93.44.169:/tmp/
```

## Étape 2: Exécuter le script sur le serveur

```bash
# Se connecter au serveur
ssh deployer@147.93.44.169

# Copier le script dans le dossier packages/db
cp /tmp/import-blog-posts.ts /opt/aspweb/packages/db/

# Exécuter le script
cd /opt/aspweb/packages/db
npx tsx import-blog-posts.ts
```

## Ce que fait le script

1. **Suppression des articles existants**
   - Supprime TOUS les articles de blog de la base de données

2. **Importation des nouveaux articles**
   - Crée 6 nouveaux articles de blog basés sur la recherche approfondie
   - Calcule automatiquement le temps de lecture
   - Définit la date de publication à maintenant

3. **Rapport d'importation**
   - Affiche le nombre d'articles créés
   - Affiche les erreurs éventuelles

## Articles importés

1. **Les 5 compétences essentielles d'un Agent de Protection Rapprochée en Afrique**
   - Catégorie: Formation
   - Tags: APR, protection rapprochée, carrière sécurité, formation

2. **Sûreté maritime au Port d'Abidjan : enjeux et solutions pour 2025**
   - Catégorie: Expertise sectorielle
   - Tags: sûreté maritime, port, ISPS Code, Abidjan, logistique

3. **Comment choisir une école de sécurité professionnelle en Côte d'Ivoire : 7 critères décisifs**
   - Catégorie: Guide
   - Tags: choix formation, école sécurité, critères, Côte d'Ivoire

4. **Protection des données personnelles en entreprise : ce que dit la loi ivoirienne**
   - Catégorie: Réglementation
   - Tags: RGPD, données personnelles, ARTCI, conformité, audit

5. **Sécurité minière en Afrique de l'Ouest : défis et bonnes pratiques**
   - Catégorie: Étude de cas
   - Tags: mines, sécurité industrielle, risques, formation

6. **Marché de l'emploi sécurité privée en Côte d'Ivoire : débouchés et perspectives 2025-2026**
   - Catégorie: Emploi & Carrière
   - Tags: emploi, carrière, salaire, débouchés, sécurité privée

## Résultat attendu

```
🗑️  Suppression de tous les articles existants...
============================================================

✅ 6 articles supprimés

📝 Importation des nouveaux articles...
============================================================

  ✅ Créé: Les 5 compétences essentielles d'un Agent de Protection Rapprochée en Afrique
  ✅ Créé: Sûreté maritime au Port d'Abidjan : enjeux et solutions pour 2025
  ✅ Créé: Comment choisir une école de sécurité professionnelle en Côte d'Ivoire : 7 critères décisifs
  ✅ Créé: Protection des données personnelles en entreprise : ce que dit la loi ivoirienne
  ✅ Créé: Sécurité minière en Afrique de l'Ouest : défis et bonnes pratiques
  ✅ Créé: Marché de l'emploi sécurité privée en Côte d'Ivoire : débouchés et perspectives 2025-2026

============================================================
📊 Résumé:
   - Articles créés: 6
   - Erreurs: 0
   - Total: 6
============================================================
✅ Importation terminée!
```

## Vérification après importation

```bash
# Vérifier le nombre d'articles
cd /opt/aspweb/packages/db
npx tsx -e "import {PrismaClient} from '@prisma/client'; const p=new PrismaClient(); p.blogArticle.count().then(c=>{console.log('Articles:',c);p.\$disconnect();})"
```

## Commande rapide (tout-en-un)

Depuis votre PC local:

```bash
# Dans le dossier D:\APP\VERSIONS_ANGE\asp-afrique

# 1. Upload le script
scp import-blog-posts.ts deployer@147.93.44.169:/tmp/

# 2. Exécuter via SSH
ssh deployer@147.93.44.169 "cp /tmp/import-blog-posts.ts /opt/aspweb/packages/db/ && cd /opt/aspweb/packages/db && npx tsx import-blog-posts.ts"
```

## En cas d'erreur

Si vous obtenez des erreurs:

1. **"Module not found"**: Assurez-vous d'être dans `/opt/aspweb/packages/db`
2. **"Connection error"**: Vérifiez que PostgreSQL fonctionne: `sudo systemctl status postgresql`
3. **Erreurs de contenu**: Vérifiez les logs pour identifier l'article problématique

## Nettoyage (optionnel)

Après l'importation réussie, vous pouvez supprimer le fichier temporaire:

```bash
ssh deployer@147.93.44.169 "rm /tmp/import-blog-posts.ts /opt/aspweb/packages/db/import-blog-posts.ts"
```

## Note importante

⚠️ **ATTENTION**: Ce script supprime TOUS les articles existants avant d'importer les nouveaux. Assurez-vous d'avoir sauvegardé toute donnée importante avant d'exécuter ce script.
