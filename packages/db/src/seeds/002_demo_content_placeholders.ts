import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function seedDemoContent() {
  console.log('🌱 Seeding demo content...')

  // Seed formations
  const formations = [
    {
      title: 'Agent de Sécurité Professionnel (AS)',
      slug: 'agent-securite-professionnel',
      duration: '360h',
      description: 'Formation complète aux métiers de la sécurité privée avec focus sur la prévention, la surveillance et l\'intervention.',
      objectives: 'Maîtriser les techniques de sécurité, connaître la législation, développer les compétences relationnelles.',
      syllabus: 'Module 1: Législation et réglementations\nModule 2: Techniques de surveillance\nModule 3: Gestion des conflits\nModule 4: Premiers secours\nModule 5: Sécurité incendie'
    },
    {
      title: 'Agent de Sécurité Portuaire (ASP)',
      slug: 'agent-securite-portuaire',
      duration: '360h',
      description: 'Spécialisation en sécurité portuaire et maritime selon les normes internationales ISPS Code.',
      objectives: 'Appliquer les normes ISPS, sécuriser les zones portuaires, gérer les accès sensibles.',
      syllabus: 'Module 1: Réglementation portuaire\nModule 2: ISPS Code\nModule 3: Contrôle d\'accès\nModule 4: Gestion des risques maritimes\nModule 5: Coordination avec autorités'
    },
    {
      title: 'Agent d\'Intervention (ASS)',
      slug: 'agent-intervention',
      duration: '360h',
      description: 'Formation spécialisée dans les opérations tactiques, les interventions d\'urgence et les patrouilles de sécurité.',
      objectives: 'Maîtriser les techniques d\'intervention, gérer les situations de crise, assurer la protection des biens et personnes.',
      syllabus: 'Module 1: Techniques d\'intervention\nModule 2: Armement et désarmement\nModule 3: Gestion de crise\nModule 4: Protection rapprochée\nModule 5: Protocoles d\'urgence'
    },
    {
      title: 'Agent de Protection Rapprochée (APR)',
      slug: 'agent-protection-rapprochee',
      duration: '360h',
      description: 'Formation spécialisée dans la protection des personnalités et la sécurité rapprochée des VIP.',
      objectives: 'Assurer la protection rapprochée, analyser les risques, planifier les déplacements sécurisés.',
      syllabus: 'Module 1: Analyse de risques\nModule 2: Protection rapprochée\nModule 3: Conduite sécurisée\nModule 4: Gestion des menaces\nModule 5: Protocoles VIP'
    },
    {
      title: 'Agent d\'Investigation (AI)',
      slug: 'agent-investigation',
      duration: '360h',
      description: 'Formation en investigation privée, renseignement et surveillance selon les normes légales.',
      objectives: 'Mener des investigations légales, collecter des informations, rédiger des rapports d\'enquête.',
      syllabus: 'Module 1: Méthodologie d\'investigation\nModule 2: Techniques de surveillance\nModule 3: Droit de l\'investigation\nModule 4: Rédaction de rapports\nModule 5: Outils informatiques'
    },
    {
      title: 'Ingénierie Sécuritaire (IS)',
      slug: 'ingenierie-securitaire',
      duration: '360h',
      description: 'Formation supérieure en stratégie de sécurité d\'entreprise et gestion des risques corporatifs.',
      objectives: 'Développer des stratégies de sécurité, évaluer les risques, mettre en place des plans de continuité.',
      syllabus: 'Module 1: Management de la sécurité\nModule 2: Analyse des risques\nModule 3: Systèmes de sécurité\nModule 4: Gestion de crise\nModule 5: Audit et conformité'
    }
  ]

  for (const formation of formations) {
    await prisma.formation.upsert({
      where: { slug: formation.slug },
      update: formation,
      create: formation
    })
  }

  // Note: Consulting services are now seeded in 003_consulting_services.ts
  // This section is kept for backward compatibility but will be overwritten by 003

  // Seed partners
  const partners = [
    {
      name: 'Organisation Maritime Internationale (OMI)',
      slug: 'organisation-maritime-internationale',
      websiteUrl: 'https://www.imo.org',
      description: 'Organisation spécialisée des Nations Unies compétente pour la sécurité maritime et la prévention de la pollution par les navires.'
    },
    {
      name: 'FDFP - Ministère de la Sécurité',
      slug: 'fdfp-ministere-securite',
      description: 'Fédération des Forces de Défense et de Protection de Côte d\'Ivoire, sous tutelle du Ministère de la Sécurité.'
    },
    {
      name: 'ACET - Centre de Formation',
      slug: 'acet-centre-formation',
      description: 'Centre d\'excellence pour la formation professionnelle en sécurité et protection civile.'
    },
    {
      name: 'UNITAS WORLD',
      slug: 'unitas-world',
      websiteUrl: 'https://www.unitasworld.com',
      description: 'Réseau international de formation et certification en sécurité privée.'
    },
    {
      name: 'IMQ - Institut Méditerranéen de Qualité',
      slug: 'imq-institut-mediterraneen',
      description: 'Organisme de certification et d\'inspection reconnu internationalement.'
    },
    {
      name: 'La Cité Collégiale',
      slug: 'cite-collegiale',
      description: 'Établissement d\'enseignement supérieur spécialisé dans les formations professionnelles.'
    }
  ]

  // Partners seeding disabled - Partner model not in Prisma schema
  // for (const partner of partners) {
  //   await prisma.partner.upsert({
  //     where: { slug: partner.slug },
  //     update: partner,
  //     create: partner
  //   })
  // }

  console.log('✅ Demo content seeded successfully')
}