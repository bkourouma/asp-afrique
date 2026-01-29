#!/usr/bin/env node

/**
 * Script maître pour exécuter tous les tests de débogage
 * et générer un rapport complet
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

class DebugMaster {
  constructor() {
    this.results = {
      timestamp: new Date().toISOString(),
      scripts: [],
      summary: {}
    };
  }

  log(level, message) {
    const prefix = {
      'INFO': '📋',
      'SUCCESS': '✅',
      'ERROR': '❌',
      'WARNING': '⚠️',
      'DEBUG': '🔍'
    }[level] || '•';
    
    console.log(`${prefix} [${level}] ${message}`);
  }

  async runScript(scriptName, description) {
    return new Promise((resolve) => {
      this.log('INFO', `Exécution: ${description}`);
      
      const startTime = Date.now();
      const process = spawn('node', [scriptName], {
        stdio: 'inherit',
        shell: true
      });

      process.on('close', (code) => {
        const duration = Date.now() - startTime;
        const result = {
          script: scriptName,
          description,
          status: code === 0 ? 'SUCCESS' : 'FAILED',
          exitCode: code,
          duration
        };

        this.results.scripts.push(result);

        if (code === 0) {
          this.log('SUCCESS', `${description} - Terminé (${duration}ms)`);
        } else {
          this.log('WARNING', `${description} - Terminé avec le code ${code}`);
        }

        resolve(result);
      });

      process.on('error', (error) => {
        this.log('ERROR', `Erreur lors de l'exécution de ${scriptName}: ${error.message}`);
        resolve({
          script: scriptName,
          description,
          status: 'ERROR',
          error: error.message
        });
      });
    });
  }

  async checkReports() {
    this.log('INFO', 'Vérification des rapports générés...');

    const reports = [
      'debug-report.json',
      'debug-report-advanced.json',
      'debug-report-scenarios.json'
    ];

    const reportStatus = {};
    reports.forEach(report => {
      const exists = fs.existsSync(path.join(__dirname, report));
      reportStatus[report] = exists ? 'FOUND' : 'MISSING';
      if (exists) {
        this.log('SUCCESS', `Rapport trouvé: ${report}`);
      } else {
        this.log('WARNING', `Rapport manquant: ${report}`);
      }
    });

    this.results.summary.reports = reportStatus;
  }

  async generateMasterReport() {
    this.log('INFO', 'Génération du rapport maître...');

    const reportPath = path.join(__dirname, 'debug-master-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));

    this.log('SUCCESS', `Rapport maître généré: ${reportPath}`);
  }

  printSummary() {
    console.log('\n' + '='.repeat(70));
    console.log('📊 RÉSUMÉ DE L\'EXÉCUTION');
    console.log('='.repeat(70));

    this.results.scripts.forEach((script, idx) => {
      const status = script.status === 'SUCCESS' ? '✅' : '❌';
      console.log(`${status} ${idx + 1}. ${script.description}`);
      console.log(`   Durée: ${script.duration}ms`);
      if (script.error) {
        console.log(`   Erreur: ${script.error}`);
      }
    });

    console.log('\n' + '='.repeat(70));
    console.log('📋 RAPPORTS GÉNÉRÉS');
    console.log('='.repeat(70));

    Object.entries(this.results.summary.reports || {}).forEach(([report, status]) => {
      const icon = status === 'FOUND' ? '✅' : '⚠️';
      console.log(`${icon} ${report}: ${status}`);
    });

    console.log('\n' + '='.repeat(70));
    console.log('🎯 PROCHAINES ÉTAPES');
    console.log('='.repeat(70));
    console.log('1. Consultez les rapports JSON pour les détails');
    console.log('2. Générez un rapport HTML: node generate-debug-report.js');
    console.log('3. Ouvrez debug-report.html dans votre navigateur');
    console.log('4. Consultez DEBUG_LOGIN_README.md pour plus d\'informations');
    console.log('='.repeat(70) + '\n');
  }

  async run() {
    console.log('\n' + '='.repeat(70));
    console.log('🔍 DÉBOGAGE COMPLET DE LA PAGE DE LOGIN');
    console.log('='.repeat(70) + '\n');

    try {
      // Exécuter les scripts de débogage
      await this.runScript('debug-login.js', 'Débogage Basique');
      await this.runScript('debug-login-advanced.js', 'Débogage Avancé');
      await this.runScript('debug-login-scenarios.js', 'Tests de Scénarios');

      // Vérifier les rapports
      await this.checkReports();

      // Générer le rapport maître
      await this.generateMasterReport();

      // Générer le rapport HTML
      this.log('INFO', 'Génération du rapport HTML...');
      await this.runScript('generate-debug-report.js', 'Rapport HTML');

      // Afficher le résumé
      this.printSummary();

      this.log('SUCCESS', '✅ Débogage complet terminé avec succès!');

    } catch (error) {
      this.log('ERROR', `Erreur fatale: ${error.message}`);
      console.error(error);
      process.exit(1);
    }
  }
}

// Lancer le débogage maître
const master = new DebugMaster();
master.run().catch(console.error);

