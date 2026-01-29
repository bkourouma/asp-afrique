const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

/**
 * Script de débogage AVANCÉ pour la page de login
 * Utilise les DevTools Protocol pour:
 * - Inspection DOM détaillée
 * - Analyse des styles CSS
 * - Capture des événements
 * - Analyse des requêtes API
 * - Inspection des cookies et storage
 */

class AdvancedLoginDebugger {
  constructor() {
    this.report = {
      timestamp: new Date().toISOString(),
      pageInfo: {},
      domAnalysis: {},
      networkAnalysis: {},
      storageAnalysis: {},
      performanceAnalysis: {},
      issues: []
    };
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

  async analyzeDOM(page) {
    this.log('INFO', 'Analyse du DOM...');

    const domInfo = await page.evaluate(() => {
      const analysis = {
        title: document.title,
        url: window.location.href,
        forms: [],
        inputs: [],
        buttons: [],
        errors: [],
        alerts: []
      };

      // Analyser les formulaires
      document.querySelectorAll('form').forEach((form, idx) => {
        analysis.forms.push({
          id: form.id,
          name: form.name,
          method: form.method,
          action: form.action,
          inputs: Array.from(form.querySelectorAll('input')).map(inp => ({
            id: inp.id,
            name: inp.name,
            type: inp.type,
            required: inp.required,
            disabled: inp.disabled,
            value: inp.value
          }))
        });
      });

      // Analyser tous les inputs
      document.querySelectorAll('input').forEach(inp => {
        analysis.inputs.push({
          id: inp.id,
          name: inp.name,
          type: inp.type,
          placeholder: inp.placeholder,
          required: inp.required,
          disabled: inp.disabled,
          className: inp.className,
          value: inp.value
        });
      });

      // Analyser les boutons
      document.querySelectorAll('button').forEach(btn => {
        analysis.buttons.push({
          id: btn.id,
          type: btn.type,
          text: btn.textContent.trim(),
          disabled: btn.disabled,
          className: btn.className
        });
      });

      // Analyser les messages d'erreur
      document.querySelectorAll('.text-red-600, [role="alert"]').forEach(el => {
        analysis.errors.push({
          text: el.textContent.trim(),
          className: el.className,
          role: el.getAttribute('role')
        });
      });

      // Analyser les alertes
      document.querySelectorAll('[role="alert"]').forEach(el => {
        analysis.alerts.push({
          text: el.textContent.trim(),
          className: el.className
        });
      });

      return analysis;
    });

    this.report.domAnalysis = domInfo;
    this.log('SUCCESS', 'Analyse DOM complétée');
    this.log('DEBUG', `Formulaires trouvés: ${domInfo.forms.length}`);
    this.log('DEBUG', `Inputs trouvés: ${domInfo.inputs.length}`);
    this.log('DEBUG', `Boutons trouvés: ${domInfo.buttons.length}`);

    return domInfo;
  }

  async analyzeNetwork(page) {
    this.log('INFO', 'Analyse du réseau...');

    const networkInfo = {
      requests: [],
      authRequests: [],
      failedRequests: [],
      slowRequests: []
    };

    // Capturer les requêtes
    const client = await page.target().createCDPSession();
    
    await client.send('Network.enable');
    
    const requestsMap = new Map();

    client.on('Network.requestWillBeSent', (params) => {
      requestsMap.set(params.requestId, {
        url: params.request.url,
        method: params.request.method,
        headers: params.request.headers,
        timestamp: params.wallTime
      });
    });

    client.on('Network.responseReceived', (params) => {
      const req = requestsMap.get(params.requestId);
      if (req) {
        req.status = params.response.status;
        req.statusText = params.response.statusText;
        req.headers = params.response.headers;
        req.mimeType = params.response.mimeType;
      }
    });

    // Attendre un peu pour capturer les requêtes
    await page.waitForTimeout(1000);

    requestsMap.forEach(req => {
      networkInfo.requests.push(req);

      if (req.url.includes('auth') || req.url.includes('signin') || req.url.includes('credentials')) {
        networkInfo.authRequests.push(req);
      }

      if (req.status && req.status >= 400) {
        networkInfo.failedRequests.push(req);
      }
    });

    this.report.networkAnalysis = networkInfo;
    this.log('SUCCESS', 'Analyse réseau complétée');
    this.log('DEBUG', `Requêtes totales: ${networkInfo.requests.length}`);
    this.log('DEBUG', `Requêtes d'auth: ${networkInfo.authRequests.length}`);
    this.log('DEBUG', `Requêtes échouées: ${networkInfo.failedRequests.length}`);

    return networkInfo;
  }

  async analyzeStorage(page) {
    this.log('INFO', 'Analyse du stockage...');

    const storageInfo = await page.evaluate(() => {
      return {
        localStorage: Object.keys(localStorage).map(key => ({
          key,
          value: localStorage.getItem(key)
        })),
        sessionStorage: Object.keys(sessionStorage).map(key => ({
          key,
          value: sessionStorage.getItem(key)
        })),
        cookies: document.cookie
      };
    });

    this.report.storageAnalysis = storageInfo;
    this.log('SUCCESS', 'Analyse du stockage complétée');
    this.log('DEBUG', `LocalStorage items: ${storageInfo.localStorage.length}`);
    this.log('DEBUG', `SessionStorage items: ${storageInfo.sessionStorage.length}`);

    return storageInfo;
  }

  async analyzePerformance(page) {
    this.log('INFO', 'Analyse des performances...');

    const perfData = await page.evaluate(() => {
      const perfEntries = performance.getEntriesByType('navigation')[0];
      const paintEntries = performance.getEntriesByType('paint');
      
      return {
        navigationTiming: {
          domContentLoaded: perfEntries?.domContentLoadedEventEnd - perfEntries?.domContentLoadedEventStart,
          loadComplete: perfEntries?.loadEventEnd - perfEntries?.loadEventStart,
          domInteractive: perfEntries?.domInteractive - perfEntries?.fetchStart,
          firstPaint: paintEntries.find(e => e.name === 'first-paint')?.startTime,
          firstContentfulPaint: paintEntries.find(e => e.name === 'first-contentful-paint')?.startTime
        },
        memory: {
          jsHeapSizeLimit: performance.memory?.jsHeapSizeLimit,
          totalJSHeapSize: performance.memory?.totalJSHeapSize,
          usedJSHeapSize: performance.memory?.usedJSHeapSize
        }
      };
    });

    this.report.performanceAnalysis = perfData;
    this.log('SUCCESS', 'Analyse des performances complétée');
    this.log('DEBUG', `DOMContentLoaded: ${perfData.navigationTiming.domContentLoaded}ms`);
    this.log('DEBUG', `First Contentful Paint: ${perfData.navigationTiming.firstContentfulPaint}ms`);

    return perfData;
  }

  async testFormValidation(page) {
    this.log('INFO', 'Test de validation du formulaire...');

    // Test 1: Soumettre le formulaire vide
    this.log('DEBUG', 'Test 1: Soumission avec formulaire vide');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(500);

    let errors = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.text-red-600')).map(el => el.textContent.trim());
    });

    if (errors.length > 0) {
      this.log('SUCCESS', 'Validation côté client détectée');
      this.log('DEBUG', `Erreurs: ${errors.join(', ')}`);
    } else {
      this.log('WARNING', 'Aucune validation côté client détectée');
      this.report.issues.push('Pas de validation côté client visible');
    }

    // Test 2: Email invalide
    this.log('DEBUG', 'Test 2: Email invalide');
    await page.type('input[type="email"]', 'invalid-email', { delay: 50 });
    await page.click('button[type="submit"]');
    await page.waitForTimeout(500);

    errors = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.text-red-600')).map(el => el.textContent.trim());
    });

    if (errors.length > 0) {
      this.log('SUCCESS', 'Validation email détectée');
    }

    // Nettoyer
    await page.evaluate(() => {
      document.querySelectorAll('input').forEach(inp => inp.value = '');
    });
  }

  async generateReport() {
    const reportPath = path.join(__dirname, 'debug-report-advanced.json');
    fs.writeFileSync(reportPath, JSON.stringify(this.report, null, 2));
    this.log('SUCCESS', `Rapport avancé généré: ${reportPath}`);

    return this.report;
  }

  async run() {
    let browser;
    try {
      this.log('INFO', '🚀 Démarrage du débogage AVANCÉ...');

      browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: [
          '--start-maximized',
          '--disable-blink-features=AutomationControlled'
        ]
      });

      const page = await browser.newPage();

      // Navigation
      this.log('INFO', 'Navigation vers http://localhost:3000/login...');
      await page.goto('http://localhost:3000/login', { 
        waitUntil: 'networkidle2',
        timeout: 30000 
      });
      this.log('SUCCESS', 'Page chargée');

      // Analyses
      await this.analyzeDOM(page);
      await this.analyzeNetwork(page);
      await this.analyzeStorage(page);
      await this.analyzePerformance(page);
      await this.testFormValidation(page);

      // Générer le rapport
      await this.generateReport();

      this.log('SUCCESS', '✅ Débogage avancé terminé');

      // Afficher le résumé
      console.log('\n' + '='.repeat(60));
      console.log('📊 RÉSUMÉ AVANCÉ');
      console.log('='.repeat(60));
      console.log(`Formulaires: ${this.report.domAnalysis.forms.length}`);
      console.log(`Inputs: ${this.report.domAnalysis.inputs.length}`);
      console.log(`Boutons: ${this.report.domAnalysis.buttons.length}`);
      console.log(`Requêtes réseau: ${this.report.networkAnalysis.requests.length}`);
      console.log(`Requêtes d'auth: ${this.report.networkAnalysis.authRequests.length}`);
      console.log(`Problèmes détectés: ${this.report.issues.length}`);
      console.log('='.repeat(60) + '\n');

      this.log('INFO', 'Navigateur ouvert pour inspection. Fermez-le manuellement.');

    } catch (error) {
      this.log('ERROR', 'Erreur fatale', error.message);
      console.error(error);
    }
  }
}

// Lancer le débogage avancé
const debugger = new AdvancedLoginDebugger();
debugger.run().catch(console.error);

