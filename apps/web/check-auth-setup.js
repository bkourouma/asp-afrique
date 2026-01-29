/**
 * Script de diagnostic pour l'authentification
 * Vérifie si l'API backend est accessible et si la configuration est correcte
 */

const http = require('http');

console.log('🔍 Diagnostic de l\'authentification\n');
console.log('='.repeat(50));

// 1. Vérifier les variables d'environnement
console.log('\n📋 Variables d\'environnement:');
console.log('NODE_ENV:', process.env.NODE_ENV || 'non défini');
console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET ? '✅ Défini' : '❌ Non défini');
console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL || 'non défini');

// 2. Déterminer l'URL de l'API
const isProduction = process.env.NODE_ENV === 'production';
const API_URL = isProduction ? 'http://127.0.0.1:3004' : 'http://127.0.0.1:3004';
const API_ENDPOINT = `${API_URL}/api/v1/auth/login`;

console.log('\n🌐 Configuration API:');
console.log('Mode:', isProduction ? 'Production' : 'Développement');
console.log('URL API:', API_URL);
console.log('Endpoint:', API_ENDPOINT);

// 3. Tester la connexion à l'API
console.log('\n🔌 Test de connexion à l\'API...');

const testData = JSON.stringify({
  email: 'admin@aspc-ci.org',
  password: 'Admin123!'
});

const options = {
  hostname: '127.0.0.1',
  port: isProduction ? 3004 : 3004,
  path: '/api/v1/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(testData)
  },
  timeout: 5000
};

const req = http.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('\n📡 Réponse de l\'API:');
    console.log('Status:', res.statusCode);
    console.log('Status Text:', res.statusMessage);
    
    if (res.statusCode === 200) {
      console.log('✅ API accessible et fonctionnelle!');
      try {
        const json = JSON.parse(data);
        console.log('User ID:', json.user?.id);
        console.log('Email:', json.user?.email);
      } catch (e) {
        console.log('Réponse:', data);
      }
    } else if (res.statusCode === 401) {
      console.log('⚠️  API accessible mais credentials invalides');
      console.log('Réponse:', data);
    } else {
      console.log('❌ Erreur API:', data);
    }
    
    console.log('\n' + '='.repeat(50));
    console.log('\n💡 Solutions possibles:');
    console.log('1. Vérifiez que l\'API backend est démarrée:');
    console.log('   cd apps/api && pnpm dev');
    console.log('\n2. Vérifiez les identifiants par défaut:');
    console.log('   Email: admin@aspc-ci.org');
    console.log('   Password: Admin123!');
    console.log('\n3. Vérifiez que la base de données est accessible');
    console.log('4. Vérifiez les logs du serveur Next.js pour plus de détails');
  });
});

req.on('error', (error) => {
  console.log('\n❌ Erreur de connexion:');
  console.log('Message:', error.message);
  console.log('Code:', error.code);
  
  if (error.code === 'ECONNREFUSED') {
    console.log('\n💡 L\'API backend n\'est pas démarrée!');
    console.log('Démarrez l\'API avec:');
    console.log('  cd apps/api');
    console.log('  pnpm dev');
  } else if (error.code === 'ETIMEDOUT') {
    console.log('\n💡 Timeout - l\'API ne répond pas');
  }
  
  console.log('\n' + '='.repeat(50));
});

req.on('timeout', () => {
  console.log('\n⏱️  Timeout - l\'API ne répond pas dans les 5 secondes');
  req.destroy();
});

req.write(testData);
req.end();
