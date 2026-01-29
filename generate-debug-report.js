const fs = require('fs');
const path = require('path');

/**
 * Script pour générer un rapport HTML interactif à partir des rapports JSON
 */

class ReportGenerator {
  constructor() {
    this.reports = {};
  }

  loadReports() {
    const reportFiles = [
      'debug-report.json',
      'debug-report-advanced.json',
      'debug-report-scenarios.json'
    ];

    reportFiles.forEach(file => {
      const filePath = path.join(__dirname, file);
      if (fs.existsSync(filePath)) {
        try {
          this.reports[file] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          console.log(`✅ Rapport chargé: ${file}`);
        } catch (error) {
          console.log(`⚠️  Erreur lors du chargement de ${file}: ${error.message}`);
        }
      }
    });
  }

  generateHTML() {
    const html = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rapport de Débogage - Page de Login</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            overflow: hidden;
        }

        header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px 20px;
            text-align: center;
        }

        header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
        }

        header p {
            font-size: 1.1em;
            opacity: 0.9;
        }

        .timestamp {
            font-size: 0.9em;
            opacity: 0.8;
            margin-top: 10px;
        }

        .content {
            padding: 40px;
        }

        .tabs {
            display: flex;
            gap: 10px;
            margin-bottom: 30px;
            border-bottom: 2px solid #e0e0e0;
            flex-wrap: wrap;
        }

        .tab-button {
            padding: 12px 24px;
            border: none;
            background: none;
            cursor: pointer;
            font-size: 1em;
            color: #666;
            border-bottom: 3px solid transparent;
            transition: all 0.3s ease;
        }

        .tab-button:hover {
            color: #667eea;
        }

        .tab-button.active {
            color: #667eea;
            border-bottom-color: #667eea;
        }

        .tab-content {
            display: none;
        }

        .tab-content.active {
            display: block;
        }

        .section {
            margin-bottom: 40px;
        }

        .section h2 {
            font-size: 1.8em;
            color: #333;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #667eea;
        }

        .section h3 {
            font-size: 1.3em;
            color: #555;
            margin-top: 20px;
            margin-bottom: 15px;
        }

        .summary-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }

        .summary-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
        }

        .summary-card .value {
            font-size: 2.5em;
            font-weight: bold;
            margin-bottom: 10px;
        }

        .summary-card .label {
            font-size: 0.9em;
            opacity: 0.9;
        }

        .status-badge {
            display: inline-block;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 0.85em;
            font-weight: bold;
            margin-right: 10px;
        }

        .status-badge.success {
            background: #d4edda;
            color: #155724;
        }

        .status-badge.error {
            background: #f8d7da;
            color: #721c24;
        }

        .status-badge.warning {
            background: #fff3cd;
            color: #856404;
        }

        .status-badge.info {
            background: #d1ecf1;
            color: #0c5460;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        table th {
            background: #f5f5f5;
            padding: 12px;
            text-align: left;
            font-weight: bold;
            color: #333;
            border-bottom: 2px solid #ddd;
        }

        table td {
            padding: 12px;
            border-bottom: 1px solid #eee;
        }

        table tr:hover {
            background: #f9f9f9;
        }

        .code-block {
            background: #f5f5f5;
            border-left: 4px solid #667eea;
            padding: 15px;
            margin: 15px 0;
            border-radius: 4px;
            overflow-x: auto;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
        }

        .error-list, .warning-list {
            list-style: none;
            margin: 15px 0;
        }

        .error-list li, .warning-list li {
            padding: 10px;
            margin-bottom: 10px;
            border-left: 4px solid #dc3545;
            background: #f8f9fa;
            border-radius: 4px;
        }

        .warning-list li {
            border-left-color: #ffc107;
        }

        .success-list li {
            border-left-color: #28a745;
        }

        .metric {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #eee;
        }

        .metric:last-child {
            border-bottom: none;
        }

        .metric-label {
            font-weight: bold;
            color: #555;
        }

        .metric-value {
            color: #667eea;
            font-weight: bold;
        }

        .footer {
            background: #f5f5f5;
            padding: 20px;
            text-align: center;
            color: #666;
            border-top: 1px solid #ddd;
        }

        .no-data {
            text-align: center;
            padding: 40px;
            color: #999;
        }

        @media (max-width: 768px) {
            .container {
                border-radius: 0;
            }

            header h1 {
                font-size: 1.8em;
            }

            .content {
                padding: 20px;
            }

            .summary-grid {
                grid-template-columns: 1fr;
            }

            .tabs {
                flex-direction: column;
            }

            .tab-button {
                border-bottom: none;
                border-left: 3px solid transparent;
                text-align: left;
            }

            .tab-button.active {
                border-left-color: #667eea;
                border-bottom: none;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>🔍 Rapport de Débogage</h1>
            <p>Page de Login - Analyse Complète</p>
            <div class="timestamp">${new Date().toLocaleString('fr-FR')}</div>
        </header>

        <div class="content">
            <div class="tabs">
                ${this.reports['debug-report.json'] ? '<button class="tab-button active" onclick="switchTab(\'basic\')">📋 Basique</button>' : ''}
                ${this.reports['debug-report-advanced.json'] ? '<button class="tab-button" onclick="switchTab(\'advanced\')">🔍 Avancé</button>' : ''}
                ${this.reports['debug-report-scenarios.json'] ? '<button class="tab-button" onclick="switchTab(\'scenarios\')">🧪 Scénarios</button>' : ''}
            </div>

            ${this.generateBasicTab()}
            ${this.generateAdvancedTab()}
            ${this.generateScenariosTab()}
        </div>

        <div class="footer">
            <p>Rapport généré le ${new Date().toLocaleString('fr-FR')}</p>
            <p>Fichiers source: debug-report*.json</p>
        </div>
    </div>

    <script>
        function switchTab(tabName) {
            // Masquer tous les onglets
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove('active');
            });
            document.querySelectorAll('.tab-button').forEach(btn => {
                btn.classList.remove('active');
            });

            // Afficher l'onglet sélectionné
            const tabId = 'tab-' + tabName;
            const tab = document.getElementById(tabId);
            if (tab) {
                tab.classList.add('active');
            }

            // Marquer le bouton comme actif
            event.target.classList.add('active');
        }
    </script>
</body>
</html>`;

    return html;
  }

  generateBasicTab() {
    const report = this.reports['debug-report.json'];
    if (!report) return '';

    const errorCount = report.summary?.totalErrors || 0;
    const requestCount = report.summary?.totalNetworkRequests || 0;
    const consoleCount = report.summary?.totalConsoleMessages || 0;

    return `
        <div id="tab-basic" class="tab-content active">
            <div class="section">
                <h2>📋 Rapport Basique</h2>
                
                <div class="summary-grid">
                    <div class="summary-card">
                        <div class="value">${errorCount}</div>
                        <div class="label">Erreurs</div>
                    </div>
                    <div class="summary-card">
                        <div class="value">${requestCount}</div>
                        <div class="label">Requêtes Réseau</div>
                    </div>
                    <div class="summary-card">
                        <div class="value">${consoleCount}</div>
                        <div class="label">Messages Console</div>
                    </div>
                </div>

                ${report.errors && report.errors.length > 0 ? `
                    <h3>❌ Erreurs Détectées</h3>
                    <ul class="error-list">
                        ${report.errors.map(err => `
                            <li>
                                <strong>${err.type || 'Erreur'}:</strong> ${err.message || err.text || JSON.stringify(err)}
                            </li>
                        `).join('')}
                    </ul>
                ` : '<p class="no-data">✅ Aucune erreur détectée</p>'}

                ${report.networkRequests && report.networkRequests.length > 0 ? `
                    <h3>🌐 Requêtes Réseau</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Méthode</th>
                                <th>URL</th>
                                <th>Type</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${report.networkRequests.slice(0, 20).map(req => `
                                <tr>
                                    <td><span class="status-badge info">${req.method}</span></td>
                                    <td style="word-break: break-all; font-size: 0.9em;">${req.url}</td>
                                    <td>${req.resourceType || '-'}</td>
                                    <td>
                                        ${req.status ? `<span class="status-badge ${req.status < 400 ? 'success' : 'error'}">${req.status}</span>` : '-'}
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                ` : ''}

                ${report.performanceMetrics ? `
                    <h3>⚡ Performances</h3>
                    <div class="code-block">
                        ${Object.entries(report.performanceMetrics).map(([key, value]) => `
                            <div class="metric">
                                <span class="metric-label">${key}:</span>
                                <span class="metric-value">${typeof value === 'number' ? value.toLocaleString() : value}</span>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        </div>
    `;
  }

  generateAdvancedTab() {
    const report = this.reports['debug-report-advanced.json'];
    if (!report) return '';

    const domAnalysis = report.domAnalysis || {};
    const networkAnalysis = report.networkAnalysis || {};
    const storageAnalysis = report.storageAnalysis || {};

    return `
        <div id="tab-advanced" class="tab-content">
            <div class="section">
                <h2>🔍 Rapport Avancé</h2>

                <h3>📄 Analyse DOM</h3>
                <div class="summary-grid">
                    <div class="summary-card">
                        <div class="value">${domAnalysis.forms?.length || 0}</div>
                        <div class="label">Formulaires</div>
                    </div>
                    <div class="summary-card">
                        <div class="value">${domAnalysis.inputs?.length || 0}</div>
                        <div class="label">Inputs</div>
                    </div>
                    <div class="summary-card">
                        <div class="value">${domAnalysis.buttons?.length || 0}</div>
                        <div class="label">Boutons</div>
                    </div>
                </div>

                ${domAnalysis.forms && domAnalysis.forms.length > 0 ? `
                    <h3>Formulaires</h3>
                    ${domAnalysis.forms.map((form, idx) => `
                        <div class="code-block">
                            <strong>Formulaire ${idx + 1}</strong><br>
                            ID: ${form.id || '-'}<br>
                            Méthode: ${form.method || '-'}<br>
                            Action: ${form.action || '-'}<br>
                            Inputs: ${form.inputs?.length || 0}
                        </div>
                    `).join('')}
                ` : ''}

                <h3>🌐 Analyse Réseau</h3>
                <div class="summary-grid">
                    <div class="summary-card">
                        <div class="value">${networkAnalysis.requests?.length || 0}</div>
                        <div class="label">Requêtes Totales</div>
                    </div>
                    <div class="summary-card">
                        <div class="value">${networkAnalysis.authRequests?.length || 0}</div>
                        <div class="label">Requêtes Auth</div>
                    </div>
                    <div class="summary-card">
                        <div class="value">${networkAnalysis.failedRequests?.length || 0}</div>
                        <div class="label">Requêtes Échouées</div>
                    </div>
                </div>

                ${networkAnalysis.failedRequests && networkAnalysis.failedRequests.length > 0 ? `
                    <h3>⚠️ Requêtes Échouées</h3>
                    <ul class="error-list">
                        ${networkAnalysis.failedRequests.map(req => `
                            <li>${req.method} ${req.url} - Status: ${req.status}</li>
                        `).join('')}
                    </ul>
                ` : ''}

                <h3>💾 Stockage</h3>
                <div class="code-block">
                    LocalStorage: ${storageAnalysis.localStorage?.length || 0} items<br>
                    SessionStorage: ${storageAnalysis.sessionStorage?.length || 0} items<br>
                    Cookies: ${storageAnalysis.cookies ? 'Présents' : 'Aucun'}
                </div>

                ${report.issues && report.issues.length > 0 ? `
                    <h3>🚨 Problèmes Détectés</h3>
                    <ul class="warning-list">
                        ${report.issues.map(issue => `<li>${issue}</li>`).join('')}
                    </ul>
                ` : '<p class="no-data">✅ Aucun problème détecté</p>'}
            </div>
        </div>
    `;
  }

  generateScenariosTab() {
    const report = this.reports['debug-report-scenarios.json'];
    if (!report) return '';

    const passed = report.passed || 0;
    const failed = report.failed || 0;
    const total = report.totalScenarios || 0;

    return `
        <div id="tab-scenarios" class="tab-content">
            <div class="section">
                <h2>🧪 Tests de Scénarios</h2>

                <div class="summary-grid">
                    <div class="summary-card">
                        <div class="value">${total}</div>
                        <div class="label">Scénarios Totaux</div>
                    </div>
                    <div class="summary-card">
                        <div class="value" style="color: #28a745;">${passed}</div>
                        <div class="label">Réussis</div>
                    </div>
                    <div class="summary-card">
                        <div class="value" style="color: #dc3545;">${failed}</div>
                        <div class="label">Échoués</div>
                    </div>
                </div>

                <h3>Résultats Détaillés</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Scénario</th>
                            <th>Statut</th>
                            <th>Durée</th>
                            <th>Détails</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${report.scenarios?.map(scenario => `
                            <tr>
                                <td><strong>${scenario.name}</strong></td>
                                <td>
                                    <span class="status-badge ${scenario.status === 'PASSED' ? 'success' : 'error'}">
                                        ${scenario.status === 'PASSED' ? '✅ Réussi' : '❌ Échoué'}
                                    </span>
                                </td>
                                <td>${scenario.duration}ms</td>
                                <td>
                                    ${scenario.errors?.length > 0 ? `<span class="status-badge error">${scenario.errors.length} erreur(s)</span>` : ''}
                                    ${scenario.warnings?.length > 0 ? `<span class="status-badge warning">${scenario.warnings.length} avertissement(s)</span>` : ''}
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>

                ${report.scenarios?.some(s => s.errors?.length > 0) ? `
                    <h3>❌ Erreurs par Scénario</h3>
                    ${report.scenarios.filter(s => s.errors?.length > 0).map(scenario => `
                        <div>
                            <h4>${scenario.name}</h4>
                            <ul class="error-list">
                                ${scenario.errors.map(err => `<li>${err}</li>`).join('')}
                            </ul>
                        </div>
                    `).join('')}
                ` : ''}

                ${report.scenarios?.some(s => s.warnings?.length > 0) ? `
                    <h3>⚠️ Avertissements par Scénario</h3>
                    ${report.scenarios.filter(s => s.warnings?.length > 0).map(scenario => `
                        <div>
                            <h4>${scenario.name}</h4>
                            <ul class="warning-list">
                                ${scenario.warnings.map(warn => `<li>${warn}</li>`).join('')}
                            </ul>
                        </div>
                    `).join('')}
                ` : ''}
            </div>
        </div>
    `;
  }

  generate() {
    this.loadReports();

    if (Object.keys(this.reports).length === 0) {
      console.log('❌ Aucun rapport trouvé. Exécutez d\'abord les scripts de débogage.');
      return;
    }

    const html = this.generateHTML();
    const outputPath = path.join(__dirname, 'debug-report.html');
    fs.writeFileSync(outputPath, html);

    console.log('✅ Rapport HTML généré: ' + outputPath);
    console.log('');
    console.log('Ouvrez le fichier dans votre navigateur pour voir le rapport interactif.');
  }
}

// Générer le rapport
const generator = new ReportGenerator();
generator.generate();

