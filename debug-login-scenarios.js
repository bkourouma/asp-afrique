const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

/**
 * Script de test de scénarios de connexion
 * Teste différents scénarios et génère des rapports détaillés
 */

class LoginScenarioTester {
  constructor() {
    this.results = [];
    this.browser = null;
  }

  log(level, message, data = null) {
    const prefix = {
      'INFO': '📋',
      'SUCCESS': '✅',
      'ERROR': '❌',
      'WARNING': '⚠️',
      'DEBUG': '🔍'
    }[level] || '•';
    
    console.log(`${prefix} [${level}] ${message}`, data ? JSON.stringify(data, null, 2) : '');
  }

  async testScenario(name, testFn) {
    this.log('INFO', `\n🧪 Scénario: ${name}`);
    console.log('-'.repeat(60));

    const result = {
      name,
      startTime: new Date(),
      status: 'PENDING',
      errors: [],
      warnings: [],
      data: {}
    };

    try {
      await testFn(result);
      result.status = 'PASSED';
      this.log('SUCCESS', `✅ Scénario réussi: ${name}`);
    } catch (error) {
      result.status = 'FAILED';
      result.errors.push(error.message);
      this.log('ERROR', `❌ Scénario échoué: ${name}`, error.message);
    }

    result.endTime = new Date();
    result.duration = result.endTime - result.startTime;
    this.results.push(result);

    return result;
  }

  async scenario_PageLoad() {
    return this.testScenario('Chargement de la page', async (result) => {
      const page = await this.browser.newPage();
      
      const startTime = Date.now();
      await page.goto('http://localhost:3000/login', { 
        waitUntil: 'networkidle2',
        timeout: 30000 
      });
      const loadTime = Date.now() - startTime;

      result.data.loadTime = loadTime;
      this.log('DEBUG', `Temps de chargement: ${loadTime}ms`);

      const title = await page.title();
      result.data.title = title;
      this.log('DEBUG', `Titre de la page: ${title}`);

      await page.close();
    });
  }

  async scenario_FormElements() {
    return this.testScenario('Présence des éléments du formulaire', async (result) => {
      const page = await this.browser.newPage();
      await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle2' });

      const elements = await page.evaluate(() => {
        return {
          emailInput: !!document.querySelector('input[type="email"]'),
          passwordInput: !!document.querySelector('input[type="password"]'),
          submitButton: !!document.querySelector('button[type="submit"]'),
          form: !!document.querySelector('form')
        };
      });

      result.data = elements;

      if (!elements.emailInput) throw new Error('Email input not found');
      if (!elements.passwordInput) throw new Error('Password input not found');
      if (!elements.submitButton) throw new Error('Submit button not found');

      this.log('DEBUG', 'Tous les éléments du formulaire sont présents');
      await page.close();
    });
  }

  async scenario_EmptyFormSubmit() {
    return this.testScenario('Soumission du formulaire vide', async (result) => {
      const page = await this.browser.newPage();
      await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle2' });

      // Cliquer sur le bouton sans remplir
      await page.click('button[type="submit"]');
      await page.waitForTimeout(1000);

      const errors = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.text-red-600')).map(el => el.textContent.trim());
      });

      result.data.errors = errors;
      this.log('DEBUG', `Erreurs détectées: ${errors.length}`);
      errors.forEach(err => this.log('DEBUG', `  - ${err}`));

      if (errors.length === 0) {
        result.warnings.push('Aucune validation côté client détectée');
      }

      await page.close();
    });
  }

  async scenario_InvalidEmail() {
    return this.testScenario('Email invalide', async (result) => {
      const page = await this.browser.newPage();
      await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle2' });

      await page.type('input[type="email"]', 'invalid-email', { delay: 50 });
      await page.click('button[type="submit"]');
      await page.waitForTimeout(1000);

      const errors = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.text-red-600')).map(el => el.textContent.trim());
      });

      result.data.errors = errors;
      this.log('DEBUG', `Erreurs détectées: ${errors.length}`);

      if (errors.length === 0) {
        result.warnings.push('Pas de validation email côté client');
      }

      await page.close();
    });
  }

  async scenario_ValidCredentials() {
    return this.testScenario('Connexion avec identifiants valides', async (result) => {
      const page = await this.browser.newPage();
      
      // Capturer les requêtes réseau
      const requests = [];
      page.on('request', req => {
        if (req.url().includes('auth') || req.url().includes('signin')) {
          requests.push({
            url: req.url(),
            method: req.method()
          });
        }
      });

      await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle2' });

      // Remplir le formulaire
      await page.type('input[type="email"]', 'admin@aspc-ci.org', { delay: 50 });
      await page.type('input[type="password"]', 'Admin123!', { delay: 50 });

      // Cliquer sur le bouton
      await page.click('button[type="submit"]');

      // Attendre les requêtes
      await page.waitForTimeout(2000);

      result.data.authRequests = requests;
      this.log('DEBUG', `Requêtes d'auth: ${requests.length}`);
      requests.forEach(req => this.log('DEBUG', `  - ${req.method} ${req.url}`));

      // Vérifier les erreurs
      const errors = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.text-red-600, [role="alert"]')).map(el => el.textContent.trim());
      });

      result.data.errors = errors;
      if (errors.length > 0) {
        this.log('WARNING', `Erreurs après connexion: ${errors.join(', ')}`);
      }

      // Vérifier la redirection
      const currentUrl = page.url();
      result.data.finalUrl = currentUrl;
      this.log('DEBUG', `URL finale: ${currentUrl}`);

      await page.close();
    });
  }

  async scenario_InvalidPassword() {
    return this.testScenario('Connexion avec mot de passe invalide', async (result) => {
      const page = await this.browser.newPage();
      await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle2' });

      await page.type('input[type="email"]', 'admin@aspc-ci.org', { delay: 50 });
      await page.type('input[type="password"]', 'WrongPassword123!', { delay: 50 });
      await page.click('button[type="submit"]');

      await page.waitForTimeout(2000);

      const errors = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.text-red-600, [role="alert"]')).map(el => el.textContent.trim());
      });

      result.data.errors = errors;
      this.log('DEBUG', `Erreurs détectées: ${errors.length}`);
      errors.forEach(err => this.log('DEBUG', `  - ${err}`));

      if (errors.length === 0) {
        result.warnings.push('Pas de message d\'erreur visible après échec de connexion');
      }

      await page.close();
    });
  }

  async scenario_DemoChips() {
    return this.testScenario('Boutons de démo (Demo Chips)', async (result) => {
      const page = await this.browser.newPage();
      await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle2' });

      const demoButtons = await page.$$('button:not([type="submit"])');
      result.data.demoButtonCount = demoButtons.length;
      this.log('DEBUG', `Boutons de démo trouvés: ${demoButtons.length}`);

      if (demoButtons.length > 0) {
        // Cliquer sur le premier bouton de démo
        await demoButtons[0].click();
        await page.waitForTimeout(500);

        const emailValue = await page.$eval('input[type="email"]', el => el.value);
        const passwordValue = await page.$eval('input[type="password"]', el => el.value);

        result.data.emailFilled = emailValue;
        result.data.passwordFilled = passwordValue;

        this.log('DEBUG', `Email rempli: ${emailValue}`);
        this.log('DEBUG', `Mot de passe rempli: ${passwordValue ? '***' : '(vide)'}`);

        if (!emailValue || !passwordValue) {
          result.warnings.push('Les champs n\'ont pas été remplis correctement par le bouton de démo');
        }
      } else {
        result.warnings.push('Aucun bouton de démo trouvé');
      }

      await page.close();
    });
  }

  async scenario_ConsoleErrors() {
    return this.testScenario('Erreurs console', async (result) => {
      const page = await this.browser.newPage();
      const consoleMessages = [];

      page.on('console', msg => {
        consoleMessages.push({
          type: msg.type(),
          text: msg.text()
        });
      });

      page.on('pageerror', error => {
        consoleMessages.push({
          type: 'error',
          text: error.message
        });
      });

      await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle2' });
      await page.waitForTimeout(1000);

      const errors = consoleMessages.filter(m => m.type === 'error');
      const warnings = consoleMessages.filter(m => m.type === 'warning');

      result.data.errors = errors;
      result.data.warnings = warnings;

      this.log('DEBUG', `Erreurs console: ${errors.length}`);
      errors.forEach(err => this.log('DEBUG', `  - ${err.text}`));

      this.log('DEBUG', `Avertissements console: ${warnings.length}`);
      warnings.forEach(warn => this.log('DEBUG', `  - ${warn.text}`));

      await page.close();
    });
  }

  async runAllScenarios() {
    this.log('INFO', '🚀 Démarrage des tests de scénarios...\n');

    this.browser = await puppeteer.launch({
      headless: true,
      args: ['--disable-dev-shm-usage']
    });

    try {
      await this.scenario_PageLoad();
      await this.scenario_FormElements();
      await this.scenario_EmptyFormSubmit();
      await this.scenario_InvalidEmail();
      await this.scenario_DemoChips();
      await this.scenario_ConsoleErrors();
      await this.scenario_InvalidPassword();
      await this.scenario_ValidCredentials();

      await this.generateReport();
      this.printSummary();

    } finally {
      await this.browser.close();
    }
  }

  async generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      totalScenarios: this.results.length,
      passed: this.results.filter(r => r.status === 'PASSED').length,
      failed: this.results.filter(r => r.status === 'FAILED').length,
      scenarios: this.results
    };

    const reportPath = path.join(__dirname, 'debug-report-scenarios.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    this.log('SUCCESS', `Rapport des scénarios généré: ${reportPath}`);
  }

  printSummary() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 RÉSUMÉ DES TESTS');
    console.log('='.repeat(60));
    console.log(`Total: ${this.results.length} scénarios`);
    console.log(`✅ Réussis: ${this.results.filter(r => r.status === 'PASSED').length}`);
    console.log(`❌ Échoués: ${this.results.filter(r => r.status === 'FAILED').length}`);
    console.log('='.repeat(60));

    console.log('\n📋 DÉTAILS:\n');
    this.results.forEach(result => {
      const status = result.status === 'PASSED' ? '✅' : '❌';
      console.log(`${status} ${result.name} (${result.duration}ms)`);
      if (result.errors.length > 0) {
        result.errors.forEach(err => console.log(`   ❌ ${err}`));
      }
      if (result.warnings.length > 0) {
        result.warnings.forEach(warn => console.log(`   ⚠️  ${warn}`));
      }
    });
    console.log('\n' + '='.repeat(60) + '\n');
  }
}

// Lancer les tests
const tester = new LoginScenarioTester();
tester.runAllScenarios().catch(console.error);

