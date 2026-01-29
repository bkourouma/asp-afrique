# Instructions d'importation des données en production

## Prérequis
- Accès SSH au serveur (deployer@147.93.44.169)
- Fichiers JSON: `tests/formations.json` et `tests/consulting.json`
- Script d'importation: `import-prod-data.ts`

## Étape 1: Copier les fichiers sur le serveur

Depuis votre machine locale (dans le dossier du projet):

```bash
# Copier le script d'importation
scp import-prod-data.ts deployer@147.93.44.169:/tmp/

# Copier les fichiers JSON
scp tests/formations.json deployer@147.93.44.169:/tmp/
scp tests/consulting.json deployer@147.93.44.169:/tmp/
```

## Étape 2: Exécuter le script sur le serveur

```bash
# Se connecter au serveur
ssh deployer@147.93.44.169

# Exécuter le script depuis le dossier packages/db (où Prisma est configuré)
cd /opt/aspweb/packages/db
npx tsx /tmp/import-prod-data.ts
```

## Ce que fait le script

1. **Lecture des fichiers JSON**
   - Lit `formations.json` et `consulting.json` depuis `/tmp/`

2. **Vérification des doublons**
   - Vérifie si chaque enregistrement existe déjà (par slug)
   - Si existe: met à jour les données
   - Si n'existe pas: crée un nouvel enregistrement

3. **Rapport d'importation**
   - Affiche le nombre d'enregistrements créés, mis à jour et ignorés
   - Affiche les erreurs éventuelles

## Résultat attendu

```
🚀 Démarrage de l'importation des données...
============================================================

📚 Importation des formations...
  ➕ Créé: NIVEAU I : AGENT DE SECURITE PROFESSIONNEL
  ➕ Créé: NIVEAU II : AGENT D'INTERVENTION
  ...

📊 Résumé Formations:
   - Créées: 8
   - Mises à jour: 0
   - Ignorées (erreurs): 0
   - Total traité: 8

💼 Importation des services de consulting...
  ➕ Créé: GESTION EN SECURITE - Politique de Sécurité
  ➕ Créé: GESTION EN SECURITE - Cellule de Sécurité
  ...

📊 Résumé Consulting:
   - Créés: 19
   - Mis à jour: 0
   - Ignorés (erreurs): 0
   - Total traité: 19

============================================================
✅ Importation terminée avec succès!
============================================================
```

## Vérification après importation

```bash
# Vérifier les formations
cd /opt/aspweb/packages/db
npx tsx -e "import {PrismaClient} from '@prisma/client'; const p=new PrismaClient(); p.formation.count().then(c=>console.log('Formations:',c))"

# Vérifier les services consulting
npx tsx -e "import {PrismaClient} from '@prisma/client'; const p=new PrismaClient(); p.consultingService.count().then(c=>console.log('Consulting:',c))"
```

## Commandes rapides (tout-en-un)

Depuis votre PC local:

```bash
# Dans le dossier D:\APP\VERSIONS_ANGE\asp-afrique

# 1. Upload tout
scp import-prod-data.ts tests/formations.json tests/consulting.json deployer@147.93.44.169:/tmp/

# 2. Exécuter via SSH
ssh deployer@147.93.44.169 "cd /opt/aspweb/packages/db && npx tsx /tmp/import-prod-data.ts"
```

## En cas d'erreur

Si vous obtenez des erreurs:

1. **"Module not found"**: Assurez-vous d'être dans `/opt/aspweb/packages/db`
2. **"File not found"**: Vérifiez que les fichiers JSON sont bien dans `/tmp/`
3. **"Unique constraint"**: Normal si les données existent déjà, elles seront mises à jour
4. **"Connection error"**: Vérifiez que PostgreSQL fonctionne: `sudo systemctl status postgresql`

## Nettoyage (optionnel)

Après l'importation réussie, vous pouvez supprimer les fichiers temporaires:

```bash
ssh deployer@147.93.44.169 "rm /tmp/import-prod-data.ts /tmp/formations.json /tmp/consulting.json"
```
