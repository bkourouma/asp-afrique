import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@aspci.com" },
    update: {},
    create: {
      id: uuidv4(),
      email: "admin@aspci.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("✅ Admin user created:", admin.email);

  // Seed programs
  const programs = [
    {
      title: "Certificat de Qualification Professionnelle (CQP) Agent de Sécurité",
      duration: 120,
      outcomes: "Formation complète aux métiers de la sécurité privée",
      syllabus: "Réglementation, techniques d'intervention, premiers secours",
    },
    {
      title: "Certificat de Qualification Professionnelle (CQP) Agent de Sécurité Privée",
      duration: 140,
      outcomes: "Compétences avancées en sécurité privée",
      syllabus: "Sécurité des biens et des personnes, gestion des risques",
    },
    {
      title: "Certificat de Qualification Professionnelle (CQP) Agent de Sécurité Spécialisé",
      duration: 160,
      outcomes: "Spécialisation en sécurité de haut niveau",
      syllabus: "Protection rapprochée, sécurité événementielle",
    },
    {
      title: "Certificat de Qualification Professionnelle (CQP) Agent de Prévention et de Recherche",
      duration: 180,
      outcomes: "Maîtrise des techniques d'investigation",
      syllabus: "Enquêtes, surveillance, analyse de risques",
    },
    {
      title: "Certificat de Qualification Professionnelle (CQP) Agent d'Accueil et d'Information",
      duration: 100,
      outcomes: "Excellence dans l'accueil et l'information",
      syllabus: "Communication, gestion des flux, service client",
    },
    {
      title: "Certificat de Qualification Professionnelle (CQP) Agent d'Intervention et de Protection",
      duration: 200,
      outcomes: "Intervention professionnelle en situations critiques",
      syllabus: "Techniques d'intervention, gestion de crise",
    },
  ];

  for (const program of programs) {
    await prisma.program.upsert({
      where: { title: program.title },
      update: {},
      create: program,
    });
  }

  console.log("✅ Programs seeded");

  // Seed consulting services
  const services = [
    {
      name: "Gestion des Risques et Conformité (GAMR)",
      description: "Audit et conseil en gestion des risques pour entreprises",
      sectors: "Banques, Ports, Entreprises",
      cta: "Demander un audit GAMR",
    },
    {
      name: "Sécurité des Installations Portuaires (ISPS)",
      description: "Mise en conformité ISPS Code pour installations portuaires",
      sectors: "Ports, Terminaux, Infrastructures maritimes",
      cta: "Obtenir la certification ISPS",
    },
  ];

  for (const service of services) {
    await prisma.consultingService.upsert({
      where: { name: service.name },
      update: {},
      create: service,
    });
  }

  console.log("✅ Consulting services seeded");

  // Seed partnerships
  const partnerships = [
    { label: "Organisation Maritime Internationale (OMI)", link: "https://www.imo.org" },
    { label: "Ministère de la Sécurité de Côte d'Ivoire", link: "https://www.securite.gouv.ci" },
    { label: "FDFP - Fédération des Entreprises de Formation Professionnelle", link: "https://www.fdfp.ci" },
  ];

  for (const partnership of partnerships) {
    await prisma.partnership.upsert({
      where: { label: partnership.label },
      update: {},
      create: partnership,
    });
  }

  console.log("✅ Partnerships seeded");

  // Seed pages
  const pages = [
    {
      slug: "home",
      title: "Accueil",
      content: "<h1>Bienvenue à l'ASPCI</h1><p>Académie de la Sécurité Professionnelle de Côte d'Ivoire</p>",
    },
    {
      slug: "formations",
      title: "Formations",
      content: "<h1>Nos Formations</h1><p>Découvrez nos programmes de certification</p>",
    },
    {
      slug: "consulting",
      title: "Conseil",
      content: "<h1>Services de Conseil</h1><p>GAMR et ISPS Code</p>",
    },
    {
      slug: "partenaires-accreditations",
      title: "Partenaires & Accréditations",
      content: "<h1>Partenaires & Accréditations</h1><p>Nos reconnaissances internationales</p>",
    },
    {
      slug: "a-propos",
      title: "À Propos",
      content: "<h1>À Propos de l'ASPCI</h1><p>Notre mission et vision</p>",
    },
    {
      slug: "faq",
      title: "FAQ",
      content: "<h1>Questions Fréquentes</h1><p>Réponses à vos questions</p>",
    },
    {
      slug: "contact",
      title: "Contact",
      content: "<h1>Contactez-nous</h1><p>Informations de contact</p>",
    },
  ];

  for (const page of pages) {
    await prisma.page.upsert({
      where: { slug: page.slug },
      update: {},
      create: page,
    });
  }

  console.log("✅ Pages seeded");

  // Seed global settings
  const settings = [
    { key: "org_name", value: "Académie de la Sécurité Professionnelle de Côte d'Ivoire" },
    { key: "org_address", value: "Abidjan, Côte d'Ivoire" },
    { key: "org_phone", value: "+225 XX XX XX XX" },
    { key: "org_whatsapp", value: "+225 XX XX XX XX" },
    { key: "org_email", value: "contact@aspci.com" },
    { key: "seo_title", value: "ASPCI - Formation et Certification en Sécurité" },
    { key: "seo_description", value: "Formation professionnelle en sécurité maritime et terrestre, certification RSO (IMO), GAMR et ISPS Code" },
  ];

  for (const setting of settings) {
    await prisma.globalSetting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
  }

  console.log("✅ Global settings seeded");
  console.log("🎉 Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });