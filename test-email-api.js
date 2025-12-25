// Script de test pour l'API d'envoi d'emails
const API_BASE_URL = 'http://localhost:3002/api/v1/contact'

// Test de connexion SMTP
async function testSMTPConnection() {
  console.log('🔍 Test de connexion SMTP...')
  
  try {
    const response = await fetch(`${API_BASE_URL}/test-email`)
    const result = await response.json()
    
    if (result.success) {
      console.log('✅ Connexion SMTP réussie:', result.message)
      return true
    } else {
      console.log('❌ Échec de la connexion SMTP:', result.message)
      return false
    }
  } catch (error) {
    console.error('❌ Erreur lors du test SMTP:', error.message)
    return false
  }
}

// Test d'envoi de message de contact
async function testContactSubmission() {
  console.log('📧 Test d\'envoi de message de contact...')
  
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    phone: '+225 07 59 81 48 64',
    message: 'Ceci est un message de test pour vérifier le fonctionnement de l\'API d\'envoi d\'emails.'
  }
  
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    })
    
    const result = await response.json()
    
    if (response.ok && result.success) {
      console.log('✅ Message envoyé avec succès:', result.message)
      console.log('📊 Données sauvegardées:', result.data)
      return true
    } else {
      console.log('❌ Échec de l\'envoi du message:', result.message)
      if (result.errors) {
        console.log('🔍 Erreurs de validation:', result.errors)
      }
      return false
    }
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi du message:', error.message)
    return false
  }
}

// Test de validation des données
async function testDataValidation() {
  console.log('🔍 Test de validation des données...')
  
  const invalidData = {
    name: 'A', // Trop court
    email: 'invalid-email', // Format invalide
    phone: '123', // Format invalide
    message: 'Court' // Trop court
  }
  
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invalidData)
    })
    
    const result = await response.json()
    
    if (!response.ok && result.errors) {
      console.log('✅ Validation fonctionne correctement - erreurs détectées:')
      Object.entries(result.errors).forEach(([field, messages]) => {
        console.log(`  - ${field}: ${messages.join(', ')}`)
      })
      return true
    } else {
      console.log('❌ La validation n\'a pas fonctionné comme attendu')
      return false
    }
  } catch (error) {
    console.error('❌ Erreur lors du test de validation:', error.message)
    return false
  }
}

// Fonction principale de test
async function runTests() {
  console.log('🚀 Démarrage des tests de l\'API d\'envoi d\'emails\n')
  
  // Test 1: Connexion SMTP
  const smtpTest = await testSMTPConnection()
  console.log('')
  
  // Test 2: Validation des données
  const validationTest = await testDataValidation()
  console.log('')
  
  // Test 3: Envoi de message (seulement si SMTP fonctionne)
  let submissionTest = false
  if (smtpTest) {
    submissionTest = await testContactSubmission()
  } else {
    console.log('⏭️  Test d\'envoi de message ignoré (SMTP non fonctionnel)')
  }
  
  console.log('\n📊 Résumé des tests:')
  console.log(`  - Connexion SMTP: ${smtpTest ? '✅' : '❌'}`)
  console.log(`  - Validation des données: ${validationTest ? '✅' : '❌'}`)
  console.log(`  - Envoi de message: ${submissionTest ? '✅' : '❌'}`)
  
  const allTestsPassed = smtpTest && validationTest && submissionTest
  console.log(`\n🎯 Résultat global: ${allTestsPassed ? '✅ Tous les tests ont réussi' : '❌ Certains tests ont échoué'}`)
  
  if (!smtpTest) {
    console.log('\n💡 Pour résoudre les problèmes SMTP:')
    console.log('  1. Vérifiez que les variables d\'environnement sont correctement configurées')
    console.log('  2. Vérifiez les identifiants SMTP dans le fichier .env')
    console.log('  3. Assurez-vous que le serveur SMTP est accessible')
  }
}

// Exécuter les tests
runTests().catch(console.error)
