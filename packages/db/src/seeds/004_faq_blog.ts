import { prisma } from '../index'

// Fonction pour calculer le temps de lecture
function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export async function seedFaqsAndBlog() {
  console.log('🌱 Seeding FAQs and Blog Articles...')

  // Seed FAQs
  const faqs = [
    {
      question: "Comment créer mon compte ?",
      status: "Publié",
      answer: "Vous pouvez créer votre compte gratuitement et accéder à toutes les fonctionnalités pendant la période d'essai. Aucune carte bancaire n'est requise pour commencer.",
      category: "Compte"
    },
    {
      question: "Puis-je changer de plan plus tard ?",
      status: "Publié",
      answer: "Oui, absolument ! Vous pouvez mettre à niveau ou rétrograder votre plan à tout moment selon vos besoins.",
      category: "Tarifs"
    },
    {
      question: "Mes données sont-elles sécurisées ?",
      status: "Publié",
      answer: "Absolument. Nous utilisons des technologies de cryptage de niveau bancaire et nos serveurs sont hébergés de manière sécurisée.",
      category: "Sécurité"
    },
    {
      question: "Qui peut utiliser ImmoTopia ?",
      status: "Publié",
      answer: "ImmoTopia est conçu pour les agences immobilières, syndics de copropriété, promoteurs, gestionnaires, propriétaires, locataires et copropriétaires. Chaque utilisateur accède uniquement aux fonctionnalités correspondant à son rôle.",
      category: "Général"
    },
    {
      question: "ImmoTopia est-il adapté au marché ivoirien ?",
      status: "Publié",
      answer: "Oui. La plateforme est pensée pour les réalités locales : Mobile Money, fiscalité, gestion locative, copropriété et pratiques immobilières en Côte d'Ivoire.",
      category: "Général"
    },
    {
      question: "Proposez-vous une période d'essai ?",
      status: "Publié",
      answer: "Oui, une période d'essai est disponible pour permettre aux agences et professionnels de tester les principales fonctionnalités avant de s'engager.",
      category: "Tarifs"
    },
    {
      question: "Dois-je installer un logiciel sur mon ordinateur ?",
      status: "Publié",
      answer: "Non. ImmoTopia est une solution 100 % en ligne accessible depuis un navigateur web, sur ordinateur, tablette ou smartphone.",
      category: "Technique"
    },
    {
      question: "Puis-je utiliser ImmoTopia sur mobile ?",
      status: "Publié",
      answer: "Oui. La plateforme est entièrement responsive et optimisée pour une utilisation sur mobile.",
      category: "Technique"
    },
    {
      question: "Mes locataires et copropriétaires peuvent-ils se connecter ?",
      status: "Publié",
      answer: "Oui. Les locataires et copropriétaires disposent d'un espace sécurisé pour consulter leurs informations, payer en ligne, recevoir des annonces et déclarer des incidents.",
      category: "Utilisateurs"
    },
    {
      question: "Les paiements Mobile Money sont-ils intégrés ?",
      status: "Publié",
      answer: "Oui. ImmoTopia permet les paiements via Mobile Money pour les loyers, charges de copropriété, appels de fonds et autres frais.",
      category: "Paiements"
    },
    {
      question: "Puis-je gérer plusieurs agences ou immeubles ?",
      status: "Publié",
      answer: "Oui. ImmoTopia est multi-tenant et permet de gérer plusieurs agences, immeubles, résidences ou programmes immobiliers depuis une seule interface.",
      category: "Gestion"
    },
    {
      question: "Les annonces sont-elles publiées sur le portail public ?",
      status: "Publié",
      answer: "Oui. Les annonces validées peuvent être publiées automatiquement sur le portail public ImmoTopia selon votre abonnement et vos paramètres.",
      category: "Annonces"
    },
    {
      question: "Puis-je importer mes données existantes ?",
      status: "Publié",
      answer: "Oui. Des outils d'importation (Excel, CSV) et un accompagnement sont proposés pour migrer vos biens, clients et contrats existants.",
      category: "Données"
    },
    {
      question: "ImmoTopia intègre-t-il un CRM ?",
      status: "Publié",
      answer: "Oui. Un CRM immobilier complet est inclus pour le suivi des prospects, clients, rendez-vous, interactions et opportunités.",
      category: "CRM"
    },
    {
      question: "Peut-on gérer la copropriété avec ImmoTopia ?",
      status: "Publié",
      answer: "Oui. Un module syndic complet est intégré : lots, charges, assemblées générales, votes, paiements et communication.",
      category: "Copropriété"
    },
    {
      question: "Les documents sont-ils stockés de manière sécurisée ?",
      status: "Publié",
      answer: "Oui. Tous les documents sont stockés de façon sécurisée avec sauvegardes régulières.",
      category: "Sécurité"
    },
    {
      question: "Puis-je définir des droits par utilisateur ?",
      status: "Publié",
      answer: "Oui. Les rôles et permissions sont entièrement configurables selon les profils utilisateurs.",
      category: "Sécurité"
    },
    {
      question: "Proposez-vous des formations ?",
      status: "Publié",
      answer: "Oui. Des formations, démonstrations et supports pédagogiques sont proposés pour une prise en main rapide.",
      category: "Support"
    },
    {
      question: "Existe-t-il un support client ?",
      status: "Publié",
      answer: "Oui. Un support technique et fonctionnel est disponible pour accompagner les utilisateurs.",
      category: "Support"
    },
    {
      question: "ImmoTopia va-t-il évoluer dans le temps ?",
      status: "Publié",
      answer: "Oui. La plateforme évolue en continu avec de nouvelles fonctionnalités basées sur les retours des utilisateurs.",
      category: "Produit"
    }
  ]

  for (const faq of faqs) {
    await prisma.faq.upsert({
      where: { question: faq.question },
      update: {},
      create: faq,
    })
    console.log(`  ✅ FAQ: ${faq.question.substring(0, 50)}...`)
  }

  console.log(`✅ Seeded ${faqs.length} FAQs`)

  // Seed Blog Articles
  const blogArticles = [
    {
      slug: "digitalisation-immobilier-cote-ivoire",
      title: "Pourquoi la digitalisation est devenue incontournable dans l'immobilier en Côte d'Ivoire",
      category: "Transformation digitale",
      tags: ["immobilier", "digitalisation", "Côte d'Ivoire", "SaaS"],
      status: "published",
      published_at: "2026-01-01",
      content: "Le secteur immobilier en Côte d'Ivoire connaît une croissance soutenue, portée par l'urbanisation, l'augmentation de la demande en logements et la structuration progressive du marché. Cependant, de nombreuses agences et gestionnaires continuent de fonctionner avec des outils manuels ou fragmentés, ce qui limite leur efficacité.\n\nLa digitalisation permet de centraliser toutes les informations liées aux biens, aux clients, aux contrats et aux paiements dans un seul système. Elle réduit considérablement les erreurs, améliore la traçabilité et facilite la prise de décision grâce à des tableaux de bord en temps réel.\n\nDans un contexte où les clients sont de plus en plus connectés, disposer d'outils numériques devient également un facteur de crédibilité. Les agences digitalisées inspirent plus de confiance, communiquent mieux et répondent plus rapidement aux demandes.\n\nEnfin, la digitalisation prépare les acteurs immobiliers aux évolutions futures du marché : paiements en ligne, automatisation, intelligence artificielle et interconnexion avec d'autres services (banques, assurances, notaires). Elle n'est plus un luxe, mais une nécessité stratégique.",
      excerpt: "La digitalisation permet de centraliser toutes les informations liées aux biens, aux clients, aux contrats et aux paiements dans un seul système."
    },
    {
      slug: "logiciel-gestion-immobiliere-agences",
      title: "Pourquoi un logiciel de gestion immobilière transforme le quotidien des agences",
      category: "Gestion immobilière",
      tags: ["ERP immobilier", "agence immobilière", "gestion"],
      status: "published",
      published_at: "2026-01-03",
      content: "Gérer une agence immobilière implique de nombreuses tâches : suivi des biens, gestion des clients, perception des loyers, production de documents, reporting et communication. Sans outil adapté, ces tâches deviennent chronophages et sources d'erreurs.\n\nUn logiciel de gestion immobilière centralise l'ensemble de ces opérations. Chaque bien dispose d'une fiche complète, chaque client d'un historique clair, et chaque transaction est tracée. Les équipes gagnent du temps et peuvent se concentrer sur des activités à forte valeur ajoutée comme la prospection et le conseil.\n\nDe plus, un ERP immobilier améliore la collaboration interne. Les agents, gestionnaires et comptables travaillent sur la même base de données, avec des droits adaptés à leurs rôles.\n\nEnfin, le pilotage de l'activité devient plus simple grâce aux indicateurs clés : taux d'occupation, loyers encaissés, impayés, performance commerciale. L'agence gagne en professionnalisme et en rentabilité.",
      excerpt: "Un logiciel de gestion immobilière centralise l'ensemble de ces opérations. Chaque bien dispose d'une fiche complète, chaque client d'un historique clair."
    },
    {
      slug: "gestion-locative-automatisation",
      title: "Comment l'automatisation révolutionne la gestion locative",
      category: "Gestion locative",
      tags: ["gestion locative", "automatisation", "loyers"],
      status: "published",
      published_at: "2026-01-05",
      content: "La gestion locative traditionnelle repose souvent sur des relances manuelles, des calculs approximatifs et une forte dépendance à l'humain. Cela entraîne des retards, des oublis et parfois des conflits avec les locataires.\n\nL'automatisation permet de fiabiliser l'ensemble du processus. Les loyers sont générés automatiquement, les échéances sont connues à l'avance et les quittances sont produites sans intervention manuelle.\n\nLes paiements en ligne, notamment via Mobile Money, réduisent les délais d'encaissement et améliorent la trésorerie. Les relances automatiques limitent les impayés tout en conservant une communication professionnelle.\n\nPour les gestionnaires, l'automatisation offre une vision claire du portefeuille locatif et permet de gérer un plus grand nombre de biens sans augmenter la charge de travail.",
      excerpt: "L'automatisation permet de fiabiliser l'ensemble du processus. Les loyers sont générés automatiquement, les échéances sont connues à l'avance."
    },
    {
      slug: "paiement-mobile-money-immobilier",
      title: "Le paiement par Mobile Money : un levier majeur pour l'immobilier",
      category: "Paiements",
      tags: ["Mobile Money", "paiement en ligne", "immobilier"],
      status: "published",
      published_at: "2026-01-07",
      content: "Le Mobile Money est devenu un moyen de paiement incontournable en Afrique de l'Ouest. Dans l'immobilier, il répond à un besoin crucial : faciliter et sécuriser le paiement des loyers et des charges.\n\nPour les locataires et copropriétaires, le paiement par Mobile Money offre simplicité et rapidité. Plus besoin de se déplacer ou de manipuler du cash. Les transactions sont traçables et les reçus sont générés automatiquement.\n\nPour les agences et syndics, ce mode de paiement améliore le taux de recouvrement et simplifie le rapprochement comptable. Les flux financiers sont centralisés et consultables en temps réel.\n\nIntégrer le Mobile Money dans la gestion immobilière n'est plus une option, mais un avantage concurrentiel fort sur le marché ivoirien.",
      excerpt: "Le Mobile Money est devenu un moyen de paiement incontournable en Afrique de l'Ouest. Dans l'immobilier, il répond à un besoin crucial."
    },
    {
      slug: "ia-dans-immobilier-afrique",
      title: "L'intelligence artificielle, nouvel allié de l'immobilier en Afrique",
      category: "Innovation",
      tags: ["IA", "immobilier", "Afrique"],
      status: "published",
      published_at: "2026-01-09",
      content: "L'intelligence artificielle commence à transformer le secteur immobilier africain. Elle permet d'analyser de grandes quantités de données pour améliorer la prise de décision.\n\nDans la gestion immobilière, l'IA peut aider à mieux qualifier les prospects, recommander des biens pertinents et optimiser la visibilité des annonces. Elle contribue également à détecter des anomalies, comme des retards de paiement récurrents.\n\nPour les dirigeants, l'IA offre une vision prédictive : anticipation des impayés, estimation de la demande, analyse des performances.\n\nÀ mesure que ces technologies deviennent accessibles, elles représentent une opportunité majeure pour professionnaliser et moderniser durablement le secteur immobilier en Afrique.",
      excerpt: "L'intelligence artificielle commence à transformer le secteur immobilier africain. Elle permet d'analyser de grandes quantités de données."
    }
  ]

  for (const article of blogArticles) {
    const readTime = calculateReadTime(article.content)
    const excerpt = article.excerpt || article.content.substring(0, 200)
    
    await prisma.blogArticle.upsert({
      where: { slug: article.slug },
      update: {},
      create: {
        title: article.title,
        slug: article.slug,
        content: article.content,
        excerpt: excerpt,
        category: article.category,
        tags: article.tags,
        author: "ASPCI",
        status: article.status,
        publishedAt: new Date(article.published_at),
        readTime: readTime,
      },
    })
    console.log(`  ✅ Blog: ${article.title.substring(0, 50)}...`)
  }

  console.log(`✅ Seeded ${blogArticles.length} blog articles`)
}


