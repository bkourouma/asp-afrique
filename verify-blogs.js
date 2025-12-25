const API_URL = 'http://localhost:3002/api/v1/blog';

async function verifyBlogs() {
  console.log('🔍 Vérification des blogs dans la base de données...');
  console.log('');
  
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    const blogs = await response.json();
    
    console.log(`✅ ${blogs.length} blog(s) trouvé(s) dans la base de données`);
    console.log('');
    
    if (blogs.length === 0) {
      console.log('❌ Aucun blog trouvé. Vérifiez que les blogs ont été créés.');
      return;
    }
    
    // Afficher la liste des blogs
    console.log('📋 Liste des blogs :');
    console.log('');
    
    blogs.forEach((blog, index) => {
      console.log(`${index + 1}. ${blog.title}`);
      console.log(`   📅 Publié le: ${new Date(blog.publishedAt).toLocaleDateString('fr-FR')}`);
      console.log(`   🏷️  Catégorie: ${blog.category}`);
      console.log(`   📝 Statut: ${blog.status}`);
      console.log(`   🔗 Slug: ${blog.slug}`);
      console.log(`   ⏱️  Temps de lecture: ${blog.readTime} min`);
      console.log('');
    });
    
    // Vérifier que nous avons bien 4 blogs
    if (blogs.length >= 4) {
      console.log('🎉 Parfait ! Vous avez au moins 4 blogs dans la base de données.');
    } else {
      console.log(`⚠️  Vous avez ${blogs.length} blog(s), mais l'objectif était d'en avoir 4.`);
    }
    
    console.log('');
    console.log('🌐 Vous pouvez maintenant :');
    console.log('   • Consulter la page admin: http://localhost:3000/admin/blog');
    console.log('   • Voir les blogs publics: http://localhost:3000/blog');
    console.log('');
    
    // Vérifier les catégories
    const categories = [...new Set(blogs.map(blog => blog.category))];
    console.log(`📂 Catégories disponibles: ${categories.join(', ')}`);
    
    // Vérifier les tags
    const allTags = blogs.flatMap(blog => blog.tags);
    const uniqueTags = [...new Set(allTags)];
    console.log(`🏷️  Tags disponibles: ${uniqueTags.join(', ')}`);
    
  } catch (error) {
    console.error('❌ Erreur lors de la vérification:', error.message);
    console.log('');
    console.log('💡 Vérifiez que :');
    console.log('   • Le serveur backend est démarré (port 3002)');
    console.log('   • La base de données est accessible');
    console.log('   • L\'API blog est bien configurée');
  }
}

// Exécuter la vérification
verifyBlogs();
