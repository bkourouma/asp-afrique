import { prisma } from '../index'

export async function seedConsultingServices() {
  console.log('🌱 Seeding consulting services...')

  const consultingServices = [
    // A/ GESTION EN SECURITE - CABINET FORMATION ET GESTION EN SECURITE
    {
      name: "La Politique de Sécurité",
      slug: "politique-de-securite",
      description: "Document d'orientation stratégique et de référence, définissant les objectifs poursuivis en matière de sécurité et les moyens mis en œuvre pour les atteindre. Elle identifie leurs impacts sur la compétitivité de l'entreprise et l'atteinte du sentiment de sécurité que doit ressentir le personnel, les clients et les partenaires.",
      entity: "CABINET FORMATION ET GESTION EN SECURITE",
      targetSectors: "Entreprises, Industries, Institutions",
      ctaText: "Élaborer votre politique de sécurité",
      isActive: true
    },
    {
      name: "La Cellule de Sécurité",
      slug: "cellule-de-securite",
      description: "Répond à la nécessité pour l'entreprise de prendre en charge sa sécurité : concevoir, mettre en œuvre et suivre la politique de sécurité de l'entreprise avec l'appui du conseiller-expert. Ses membres identifiés au sein de l'entreprise ont une connaissance suffisante des activités de l'entreprise et des informations spécifiques qui devront être prises en compte.",
      entity: "CABINET FORMATION ET GESTION EN SECURITE",
      targetSectors: "Entreprises, Industries, Institutions",
      ctaText: "Mettre en place une cellule de sécurité",
      isActive: true
    },
    {
      name: "Évaluation de Sécurité",
      slug: "evaluation-de-securite",
      description: "Exercice d'ingénierie sécuritaire pour établir l'indice de sécurité d'une société ou d'une institution. Elle est basée sur la description analytique de la chaîne de production pour : répertorier les cibles potentielles, identifier les facteurs de risque, déterminer les scénarios possibles de menaces.",
      entity: "CABINET FORMATION ET GESTION EN SECURITE",
      targetSectors: "Entreprises, Industries, Institutions, Commerce",
      ctaText: "Demander une évaluation de sécurité",
      isActive: true
    },
    {
      name: "Plan de Sécurité",
      slug: "plan-de-securite",
      description: "Réponse aux recommandations de l'évaluation de sécurité. C'est un ensemble de mesures, de contre-mesures et de dispositifs de gestion et de contrôle des facteurs de risque, afin de réduire la vulnérabilité de l'entreprise ; et aussi de gérer les effets d'une menace potentielle.",
      entity: "CABINET FORMATION ET GESTION EN SECURITE",
      targetSectors: "Entreprises, Industries, Institutions",
      ctaText: "Élaborer votre plan de sécurité",
      isActive: true
    },
    {
      name: "Entraînement et Exercices de Sécurité",
      slug: "entrainement-exercices-securite",
      description: "Ils mettent à l'essai la compétence et l'efficacité du service de sécurité de l'entreprise à s'acquitter des responsabilités qui lui sont confiées pour tous les niveaux de sécurité. Ils permettent également de tester le dispositif mis en place tant pour la prévention, la surveillance que pour la protection.",
      entity: "CABINET FORMATION ET GESTION EN SECURITE",
      targetSectors: "Entreprises, Industries, Institutions",
      ctaText: "Organiser des exercices de sécurité",
      isActive: true
    },
    {
      name: "GAMRdigitale",
      slug: "gamrdigitale",
      description: "Plateforme intelligente de gestion de risques conçue pour aider les entreprises à cerner les menaces, identifier les facteurs de risques, évaluer les répercussions probables de tout incident potentiel et recommander des mesures de prévention, de surveillance et de protection. Elle automatise le calcul de l'indice de sécurité, donne une vision globale de l'état de la sécurité et facilite la prise de décision. Un tel outil peut s'avérer une aide précieuse pour la répartition des ressources, la planification d'urgence et la budgétisation.",
      entity: "CABINET FORMATION ET GESTION EN SECURITE",
      targetSectors: "Entreprises, Industries, Institutions",
      ctaText: "Découvrir GAMRdigitale",
      isActive: true
    },

    // B/ EXPERTISE EN SURETE MARITIME - EXPERTISE EN SURETE MARITIME (CODE ISPS)
    {
      name: "PSFA - Évaluation de Sûreté de l'Installation Portuaire",
      slug: "psfa-evaluation-surete-portuaire",
      description: "La première étape pour la mise en place du Code ISPS est de procéder à l'évaluation complète des risques au niveau de la sûreté et des opérations de l'installation portuaire (Port Facility Security Assessment). Cette évaluation permet d'identifier les vulnérabilités et de déterminer les mesures de sûreté appropriées.",
      entity: "EXPERTISE EN SURETE MARITIME (CODE ISPS)",
      targetSectors: "Ports, Terminaux maritimes, Installations portuaires",
      ctaText: "Réaliser une évaluation PSFA",
      isActive: true
    },
    {
      name: "PFSP - Plan de Sûreté de l'Installation Portuaire",
      slug: "pfsp-plan-surete-portuaire",
      description: "La première étape pour la mise en place du Code ISPS consiste à l'élaboration d'un plan de sûreté (Port Facility Security Plan) en vue de garantir l'application des mesures nécessaires pour protéger l'installation portuaire et les navires. Ce plan détaille les procédures et les mesures de sûreté à mettre en œuvre.",
      entity: "EXPERTISE EN SURETE MARITIME (CODE ISPS)",
      targetSectors: "Ports, Terminaux maritimes, Installations portuaires",
      ctaText: "Élaborer votre plan PFSP",
      isActive: true
    },
    {
      name: "Exercices et Entraînements ISPS",
      slug: "exercices-entrainements-isps",
      description: "Pour garantir l'efficacité de la mise en œuvre des dispositions du plan de sûreté de l'installation portuaire, des exercices devraient être organisés et porter sur les menaces pour la sûreté. Ces exercices permettent de tester les procédures, d'améliorer la coordination et d'assurer la préparation opérationnelle des équipes.",
      entity: "EXPERTISE EN SURETE MARITIME (CODE ISPS)",
      targetSectors: "Ports, Terminaux maritimes, Installations portuaires",
      ctaText: "Organiser des exercices ISPS",
      isActive: true
    },

    // C/ POLICE MUNICIPALE - ECOLE DE POLICE MUNICIPALE (ENPM)
    {
      name: "Conception de Systèmes Intégrés de Sécurité Urbaine",
      slug: "systemes-integres-securite-urbaine",
      description: "Étude complète pour la mise en place d'une Police municipale de proximité professionnelle. Elle comprend : l'identification et l'évaluation des facteurs de risque, la cartographie des risques, l'audit de la Police municipale existante, et l'élaboration d'un plan détaillé incluant le nombre de policiers nécessaires, les critères de recrutement, le plan de formation, les équipements requis, la structure organisationnelle, le plan opérationnel et les ressources d'autofinancement.",
      entity: "ECOLE DE POLICE MUNICIPALE (ENPM)",
      targetSectors: "Communes, Mairies, Collectivités territoriales",
      ctaText: "Concevoir votre système de sécurité urbaine",
      isActive: true
    }
  ]

  for (const service of consultingServices) {
    await prisma.consultingService.upsert({
      where: { slug: service.slug },
      update: {
        name: service.name,
        description: service.description,
        entity: service.entity,
        targetSectors: service.targetSectors,
        ctaText: service.ctaText,
        isActive: service.isActive
      },
      create: service
    })
    console.log(`  ✅ ${service.name}`)
  }

  console.log(`✅ Seeded ${consultingServices.length} consulting services`)
}

