const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

/**
 * Script de débogage avancé pour la page de login
 * Utilise Puppeteer avec chrome-devtools pour capturer:
 * - Les erreurs console
 * - Les requêtes réseau
 * - Les réponses API
 * - Les performances
 * - Les erreurs de validation
 */

class LoginDebugger {
  constructor() {
    this.logs = [];
    this.networkRequests = [];
    this.consoleMessages = [];
    this.errors = [];
    this.performanceMetrics = {};
  }

  log(level, message, data = null) {
    const timestamp = new Date().toISOString();
    const logEntry = { timestamp, level, message, data };
    this.logs.push(logEntry);
    
    const prefix = {
      'INFO': '📋',
      'SUCCESS': '✅',
      'ERROR': '❌',
      'WARNING': '⚠️',
      'DEBUG': '🔍'
    }[level] || '•';
    
    console.log(`${prefix} [${level}] ${message}`, data ? JSON.stringify(data, null, 2) : '');
  }

  async captureNetworkRequests(page) {
    page.on('request', request => {
      const req = {
        url: request.url(),
        method: request.method(),
        resourceType: request.resourceType(),
        timestamp: new Date().toISOString()
      };
      this.networkRequests.push(req);
    });

    page.on('response', response => {
      const req = this.networkRequests.find(r => r.url === response.url());
      if (req) {
        req.status = response.status();
        req.statusText = response.statusText();
      }
    });
  }

  async captureConsoleMessages(page) {
    page.on('console', msg => {
      const entry = {
        type: msg.type(),
        text: msg.text(),
        location: msg.location(),
        timestamp: new Date().toISOString()
      };
      this.consoleMessages.push(entry);
      
      if (msg.type() === 'error') {
        this.errors.push(entry);
        this.log('ERROR', `Console Error: ${msg.text()}`, msg.location());
      } else if (msg.type() === 'warning') {
        this.log('WARNING', `Console Warning: ${msg.text()}`);
      }
    });

    page.on('pageerror', error => {
      const entry = {
        type: 'pageerror',
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
      };
      this.errors.push(entry);
      this.log('ERROR', `Page Error: ${error.message}`, error.stack);
    });
  }

  async capturePerformance(page) {
    const metrics = await page.metrics();
    this.performanceMetrics = {
      JSHeapUsedSize: metrics.JSHeapUsedSize,
      JSHeapTotalSize: metrics.JSHeapTotalSize,
      DevToolsCommandsCount: metrics.DevToolsCommandsCount,
      Timestamp: metrics.Timestamp
    };
  }

  async inspectLoginForm(page) {
    this.log('INFO', 'Inspection du formulaire de login...');
    
    try {
      // Vérifier les éléments du formulaire
      const emailInput = await page.$('input[type="email"]');
      const passwordInput = await page.$('input[type="password"]');
      const submitButton = await page.$('button[type="submit"]');

      if (!emailInput) {
        this.log('ERROR', 'Champ email non trouvé');
      } else {
        this.log('SUCCESS', 'Champ email trouvé');
      }

      if (!passwordInput) {
        this.log('ERROR', 'Champ password non trouvé');
      } else {
        this.log('SUCCESS', 'Champ password trouvé');
      }

      if (!submitButton) {
        this.log('ERROR', 'Bouton submit non trouvé');
      } else {
        this.log('SUCCESS', 'Bouton submit trouvé');
      }

      // Vérifier les messages d'erreur
      const errorMessages = await page.$$('.text-red-600');
      if (errorMessages.length > 0) {
        this.log('WARNING', `${errorMessages.length} message(s) d'erreur détecté(s)`);
        for (let i = 0; i < errorMessages.length; i++) {
          const text = await page.evaluate(el => el.textContent, errorMessages[i]);
          this.log('DEBUG', `Erreur ${i + 1}: ${text}`);
        }
      }

      // Vérifier les alertes
      const alerts = await page.$$('[role="alert"]');
      if (alerts.length > 0) {
        this.log('WARNING', `${alerts.length} alerte(s) détectée(s)`);
        for (let i = 0; i < alerts.length; i++) {
          const text = await page.evaluate(el => el.textContent, alerts[i]);
          this.log('DEBUG', `Alerte ${i + 1}: ${text}`);
        }
      }

      return { emailInput, passwordInput, submitButton };
    } catch (error) {
      this.log('ERROR', 'Erreur lors de l\'inspection du formulaire', error.message);
      throw error;
    }
  }

  async testLoginFlow(page, email, password) {
    this.log('INFO', `Test de connexion avec: ${email}`);
    
    try {
      // Remplir le formulaire
      await page.type('input[type="email"]', email, { delay: 50 });
      this.log('SUCCESS', 'Email saisi');

      await page.type('input[type="password"]', password, { delay: 50 });
      this.log('SUCCESS', 'Mot de passe saisi');

      // Capturer les requêtes avant le submit
      const requestsBeforeSubmit = this.networkRequests.length;

      // Cliquer sur le bouton de connexion
      await page.click('button[type="submit"]');
      this.log('SUCCESS', 'Bouton de connexion cliqué');

      // Attendre les requêtes réseau
      await page.waitForTimeout(2000);

      const newRequests = this.networkRequests.slice(requestsBeforeSubmit);
      this.log('INFO', `${newRequests.length} nouvelle(s) requête(s) réseau détectée(s)`);

      // Afficher les requêtes d'authentification
      const authRequests = newRequests.filter(r => r.url.includes('auth') || r.url.includes('signin'));
      if (authRequests.length > 0) {
        this.log('DEBUG', 'Requêtes d\'authentification:', authRequests);
      }

      // Vérifier les erreurs après le submit
      await page.waitForTimeout(1000);
      const errorMessages = await page.$$('.text-red-600');
      if (errorMessages.length > 0) {
        this.log('WARNING', 'Erreurs de validation détectées après submit');
        for (let i = 0; i < errorMessages.length; i++) {
          const text = await page.evaluate(el => el.textContent, errorMessages[i]);
          this.log('DEBUG', `Erreur: ${text}`);
        }
      }

      // Vérifier les alertes
      const alerts = await page.$$('[role="alert"]');
      if (alerts.length > 0) {
        for (let i = 0; i < alerts.length; i++) {
          const text = await page.evaluate(el => el.textContent, alerts[i]);
          this.log('WARNING', `Alerte: ${text}`);
        }
      }

    } catch (error) {
      this.log('ERROR', 'Erreur lors du test de connexion', error.message);
      throw error;
    }
  }

  async generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalLogs: this.logs.length,
        totalErrors: this.errors.length,
        totalNetworkRequests: this.networkRequests.length,
        totalConsoleMessages: this.consoleMessages.length
      },
      errors: this.errors,
      networkRequests: this.networkRequests,
      consoleMessages: this.consoleMessages,
      performanceMetrics: this.performanceMetrics,
      logs: this.logs
    };

    const reportPath = path.join(__dirname, 'debug-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    this.log('SUCCESS', `Rapport généré: ${reportPath}`);

    return report;
  }

  async run() {
    let browser;
    try {
      this.log('INFO', '🚀 Démarrage du débogage de la page de login...');

      browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: [
          '--start-maximized',
          '--disable-blink-features=AutomationControlled',
          '--disable-dev-shm-usage'
        ]
      });

      const page = await browser.newPage();

      // Configuration des listeners
      await this.captureNetworkRequests(page);
      await this.captureConsoleMessages(page);

      // Navigation vers la page de login
      this.log('INFO', 'Navigation vers http://localhost:3000/login...');
      try {
        await page.goto('http://localhost:3000/login', { 
          waitUntil: 'networkidle2',
          timeout: 30000 
        });
        this.log('SUCCESS', 'Page chargée avec succès');
      } catch (error) {
        this.log('ERROR', 'Erreur lors du chargement de la page', error.message);
        throw error;
      }

      // Capturer les performances
      await this.capturePerformance(page);

      // Inspecter le formulaire
      await this.inspectLoginForm(page);

      // Attendre un peu pour voir la page
      await page.waitForTimeout(2000);

      // Tester le flux de connexion
      await this.testLoginFlow(page, 'admin@aspc-ci.org', 'Admin123!');

      // Attendre pour voir le résultat
      await page.waitForTimeout(3000);

      // Générer le rapport
      const report = await this.generateReport();

      this.log('SUCCESS', '✅ Débogage terminé avec succès');
      
      // Afficher un résumé
      console.log('\n' + '='.repeat(60));
      console.log('📊 RÉSUMÉ DU DÉBOGAGE');
      console.log('='.repeat(60));
      console.log(`Total d'erreurs: ${report.summary.totalErrors}`);
      console.log(`Requêtes réseau: ${report.summary.totalNetworkRequests}`);
      console.log(`Messages console: ${report.summary.totalConsoleMessages}`);
      console.log('='.repeat(60) + '\n');

      // Garder le navigateur ouvert pour inspection manuelle
      this.log('INFO', 'Navigateur ouvert pour inspection. Fermez-le manuellement pour terminer.');
      
    } catch (error) {
      this.log('ERROR', 'Erreur fatale', error.message);
      console.error(error);
    }
  }
}

// Lancer le débogage
const debugger = new LoginDebugger();
debugger.run().catch(console.error);

