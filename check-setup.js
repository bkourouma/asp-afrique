#!/usr/bin/env node

/**
 * Script de vérification de la configuration
 * Vérifie que tous les fichiers et dépendances sont en place
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class SetupChecker {
  constructor() {
    this.checks = [];
    this.passed = 0;
    this.failed = 0;
  }

  log(level, message, details = null) {
    const prefix = {
      'INFO': '📋',
      'SUCCESS': '✅',
      'ERROR': '❌',
      'WARNING': '⚠️',
      'DEBUG': '🔍'
    }[level] || '•';
    
    console.log(`${prefix} [${level}] ${message}`);
    if (details) {
      console.log(`   ${details}`);
    }
  }

  checkFile(filePath, description) {
    const fullPath = path.join(__dirname, filePath);
    const exists = fs.existsSync(fullPath);
    
    if (exists) {
      this.log('SUCCESS', `${description}: ${filePath}`);
      this.passed++;
    } else {
      this.log('ERROR', `${description} manquant: ${filePath}`);
      this.failed++;
    }

    this.checks.push({
      type: 'file',
      name: description,
      path: filePath,
      status: exists ? 'PASS' : 'FAIL'
    });

    return exists;
  }

  checkDirectory(dirPath, description) {
    const fullPath = path.join(__dirname, dirPath);
    const exists = fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory();
    
    if (exists) {
      this.log('SUCCESS', `${description}: ${dirPath}`);
      this.passed++;
    } else {
      this.log('ERROR', `${description} manquant: ${dirPath}`);
      this.failed++;
    }

    this.checks.push({
      type: 'directory',
      name: description,
      path: dirPath,
      status: exists ? 'PASS' : 'FAIL'
    });

    return exists;
  }

  checkCommand(command, description) {
    try {
      execSync(`${command} --version`, { stdio: 'pipe' });
      this.log('SUCCESS', `${description} installé`);
      this.passed++;
      this.checks.push({
        type: 'command',
        name: description,
        command,
        status: 'PASS'
      });
      return true;
    } catch (error) {
      this.log('ERROR', `${description} non trouvé`, `Commande: ${command}`);
      this.failed++;
      this.checks.push({
        type: 'command',
        name: description,
        command,
        status: 'FAIL'
      });
      return false;
    }
  }

  checkPackage(packageName, description) {
    try {
      require.resolve(packageName);
      this.log('SUCCESS', `${description} installé`);
      this.passed++;
      this.checks.push({
        type: 'package',
        name: description,
        package: packageName,
        status: 'PASS'
      });
      return true;
    } catch (error) {
      this.log('ERROR', `${description} non trouvé`, `Package: ${packageName}`);
      this.failed++;
      this.checks.push({
        type: 'package',
        name: description,
        package: packageName,
        status: 'FAIL'
      });
      return false;
    }
  }

  async run() {
    console.log('\n' + '='.repeat(70));
    console.log('🔍 VÉRIFICATION DE LA CONFIGURATION');
    console.log('='.repeat(70) + '\n');

    // Vérifier les fichiers de script
    console.log('📋 Vérification des fichiers de script...\n');
    this.checkFile('debug-login.js', 'Script débogage basique');
    this.checkFile('debug-login-advanced.js', 'Script débogage avancé');
    this.checkFile('debug-login-scenarios.js', 'Script tests scénarios');
    this.checkFile('debug-all.js', 'Script exécution complète');
    this.checkFile('generate-debug-report.js', 'Script rapport HTML');
    this.checkFile('test-login.js', 'Script test simple');

    // Vérifier les fichiers de configuration
    console.log('\n📋 Vérification des fichiers de configuration...\n');
    this.checkFile('debug-config.json', 'Fichier de configuration');
    this.checkFile('run-debug.bat', 'Lanceur Windows (Batch)');
    this.checkFile('run-debug.ps1', 'Lanceur Windows (PowerShell)');

    // Vérifier la documentation
    console.log('\n📋 Vérification de la documentation...\n');
    this.checkFile('DEBUG_LOGIN_README.md', 'Guide complet');
    this.checkFile('QUICK_START.md', 'Guide rapide');
    this.checkFile('DEBUG_INDEX.md', 'Index');

    // Vérifier les répertoires
    console.log('\n📋 Vérification des répertoires...\n');
    this.checkDirectory('apps/web', 'Application web');
    this.checkDirectory('apps/api', 'API');
    this.checkDirectory('packages/db', 'Base de données');
    this.checkDirectory('node_modules', 'Dépendances');

    // Vérifier les commandes
    console.log('\n📋 Vérification des commandes...\n');
    this.checkCommand('node', 'Node.js');
    this.checkCommand('npm', 'npm');
    this.checkCommand('pnpm', 'pnpm');

    // Vérifier les packages
    console.log('\n📋 Vérification des packages...\n');
    this.checkPackage('puppeteer', 'Puppeteer');

    // Vérifier la configuration de l'application
    console.log('\n📋 Vérification de la configuration de l\'application...\n');
    const webEnvPath = path.join(__dirname, 'apps/web/.env.local');
    if (fs.existsSync(webEnvPath)) {
      this.log('SUCCESS', 'Fichier .env.local trouvé');
      this.passed++;
    } else {
      this.log('WARNING', 'Fichier .env.local non trouvé', 'Créez-le à partir de .env.example');
    }

    // Résumé
    console.log('\n' + '='.repeat(70));
    console.log('📊 RÉSUMÉ');
    console.log('='.repeat(70));
    console.log(`✅ Réussis: ${this.passed}`);
    console.log(`❌ Échoués: ${this.failed}`);
    console.log('='.repeat(70) + '\n');

    if (this.failed === 0) {
      console.log('🎉 Tout est configuré correctement!\n');
      console.log('Prochaines étapes:');
      console.log('1. Démarrez l\'application: cd apps/web && pnpm dev');
      console.log('2. Lancez le débogage: node debug-login-scenarios.js');
      console.log('3. Consultez les rapports générés\n');
      return 0;
    } else {
      console.log('⚠️  Certains éléments manquent. Veuillez les installer.\n');
      return 1;
    }
  }
}

// Lancer la vérification
const checker = new SetupChecker();
checker.run().then(code => process.exit(code)).catch(error => {
  console.error('❌ Erreur lors de la vérification:', error.message);
  process.exit(1);
});

