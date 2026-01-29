/**
 * Script d'importation des données de formations et consulting en production
 *
 * Usage:
 * 1. Copier ce script sur le serveur: scp import-prod-data.ts deployer@147.93.44.169:/tmp/
 * 2. Copier les fichiers JSON: scp tests/*.json deployer@147.93.44.169:/tmp/
 * 3. Exécuter: cd /opt/aspweb/packages/db && npx tsx /tmp/import-prod-data.ts
 */

import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';
import { join } from 'path';

const prisma = new PrismaClient();

interface Formation {
  id?: string;
  title: string;
  slug: string;
  duration: string;
  description: string;
  objectives: string;
  syllabus?: string;
  imageUrl?: string;
  isActive: boolean;
  entity: string;
}

interface ConsultingService {
  id?: string;
  name: string;
  slug: string;
  description: string;
  targetSectors: string;
  ctaText: string;
  isActive: boolean;
  entity: string;
}

async function importFormations(filePath: string) {
  console.log('\n📚 Importation des formations...');

  const data = JSON.parse(readFileSync(filePath, 'utf-8'));
  const formations = data.formations as Formation[];

  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (const formation of formations) {
    try {
      // Vérifier si la formation existe déjà par slug
      const existing = await prisma.formation.findUnique({
        where: { slug: formation.slug }
      });

      // Préparer les données (sans l'ID pour éviter les conflits)
      const formationData = {
        title: formation.title,
        slug: formation.slug,
        duration: formation.duration,
        description: formation.description,
        objectives: formation.objectives,
        syllabus: formation.syllabus || '',
        imageUrl: formation.imageUrl || '',
        isActive: formation.isActive,
        entity: formation.entity
      };

      if (existing) {
        // Mettre à jour si existe
        await prisma.formation.update({
          where: { slug: formation.slug },
          data: formationData
        });
        updated++;
        console.log(`  ✅ Mis à jour: ${formation.title}`);
      } else {
        // Créer si n'existe pas
        await prisma.formation.create({
          data: formationData
        });
        created++;
        console.log(`  ➕ Créé: ${formation.title}`);
      }
    } catch (error) {
      skipped++;
      console.error(`  ❌ Erreur pour "${formation.title}":`, error instanceof Error ? error.message : 'Unknown error');
    }
  }

  console.log(`\n📊 Résumé Formations:`);
  console.log(`   - Créées: ${created}`);
  console.log(`   - Mises à jour: ${updated}`);
  console.log(`   - Ignorées (erreurs): ${skipped}`);
  console.log(`   - Total traité: ${formations.length}`);
}

async function importConsulting(filePath: string) {
  console.log('\n💼 Importation des services de consulting...');

  const data = JSON.parse(readFileSync(filePath, 'utf-8'));
  const services = data.consulting as ConsultingService[];

  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (const service of services) {
    try {
      // Vérifier si le service existe déjà par slug
      const existing = await prisma.consultingService.findUnique({
        where: { slug: service.slug }
      });

      // Préparer les données (sans l'ID pour éviter les conflits)
      const serviceData = {
        name: service.name,
        slug: service.slug,
        description: service.description,
        targetSectors: service.targetSectors,
        ctaText: service.ctaText,
        isActive: service.isActive,
        entity: service.entity
      };

      if (existing) {
        // Mettre à jour si existe
        await prisma.consultingService.update({
          where: { slug: service.slug },
          data: serviceData
        });
        updated++;
        console.log(`  ✅ Mis à jour: ${service.name}`);
      } else {
        // Créer si n'existe pas
        await prisma.consultingService.create({
          data: serviceData
        });
        created++;
        console.log(`  ➕ Créé: ${service.name}`);
      }
    } catch (error) {
      skipped++;
      console.error(`  ❌ Erreur pour "${service.name}":`, error instanceof Error ? error.message : 'Unknown error');
    }
  }

  console.log(`\n📊 Résumé Consulting:`);
  console.log(`   - Créés: ${created}`);
  console.log(`   - Mis à jour: ${updated}`);
  console.log(`   - Ignorés (erreurs): ${skipped}`);
  console.log(`   - Total traité: ${services.length}`);
}

async function main() {
  console.log('🚀 Démarrage de l\'importation des données...');
  console.log('=' .repeat(60));

  try {
    // Chemin des fichiers JSON (ajuster selon l'emplacement)
    const formationsPath = '/tmp/formations.json';
    const consultingPath = '/tmp/consulting.json';

    // Importer les formations
    await importFormations(formationsPath);

    // Importer les services de consulting
    await importConsulting(consultingPath);

    console.log('\n' + '='.repeat(60));
    console.log('✅ Importation terminée avec succès!');
    console.log('=' .repeat(60));

  } catch (error) {
    console.error('\n❌ Erreur lors de l\'importation:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Exécuter le script
main();
