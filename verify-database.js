const { PrismaClient } = require('@prisma/client');

async function verifyDatabase() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔍 Vérification de la base de données...\n');
    
    // Vérifier que la table videos existe
    const videoCount = await prisma.video.count();
    console.log(`✅ Table 'videos' créée avec succès`);
    console.log(`📊 Nombre de vidéos: ${videoCount}`);
    
    // Vérifier les autres tables
    const userCount = await prisma.user.count();
    const formationCount = await prisma.formation.count();
    const blogCount = await prisma.blogArticle.count();
    
    console.log(`\n📋 Résumé des tables:`);
    console.log(`   👥 Utilisateurs: ${userCount}`);
    console.log(`   🎓 Formations: ${formationCount}`);
    console.log(`   📝 Articles blog: ${blogCount}`);
    console.log(`   🎬 Vidéos: ${videoCount}`);
    
    console.log(`\n✅ Base de données prête !`);
    console.log(`\n🚀 Vous pouvez maintenant démarrer l'application:`);
    console.log(`   cd apps/web`);
    console.log(`   pnpm dev`);
    
  } catch (error) {
    console.error('❌ Erreur lors de la vérification:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

verifyDatabase();
