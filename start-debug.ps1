# Script PowerShell pour démarrer rapidement le débogage
# Utilisation: .\start-debug.ps1

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║          🔍 DÉBOGAGE DE LA PAGE DE LOGIN                       ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Vérifier si Node.js est installé
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js n'est pas installé ou n'est pas dans le PATH" -ForegroundColor Red
    exit 1
}

# Vérifier la configuration
Write-Host "📋 Vérification de la configuration..." -ForegroundColor Yellow
& node check-setup.js

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║          🚀 SÉLECTIONNEZ UNE OPTION                            ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""
Write-Host "1️⃣  Débogage Rapide (Scénarios)" -ForegroundColor Green
Write-Host "   └─ Tests automatisés de 8 scénarios"
Write-Host ""
Write-Host "2️⃣  Débogage Complet (Tous les tests)" -ForegroundColor Green
Write-Host "   └─ Basique + Avancé + Scénarios + Rapport HTML"
Write-Host ""
Write-Host "3️⃣  Débogage Basique" -ForegroundColor Green
Write-Host "   └─ Erreurs, réseau, console, performances"
Write-Host ""
Write-Host "4️⃣  Débogage Avancé" -ForegroundColor Green
Write-Host "   └─ DOM, réseau, storage, performances"
Write-Host ""
Write-Host "5️⃣  Générer Rapport HTML" -ForegroundColor Green
Write-Host "   └─ À partir des rapports JSON existants"
Write-Host ""
Write-Host "0️⃣  Quitter" -ForegroundColor Red
Write-Host ""

$choice = Read-Host "Choisissez une option (0-5)"

Write-Host ""

switch ($choice) {
    "1" {
        Write-Host "🚀 Lancement du débogage rapide..." -ForegroundColor Green
        Write-Host ""
        & node debug-login-scenarios.js
    }
    "2" {
        Write-Host "🚀 Lancement du débogage complet..." -ForegroundColor Green
        Write-Host ""
        & node debug-all.js
    }
    "3" {
        Write-Host "🚀 Lancement du débogage basique..." -ForegroundColor Green
        Write-Host ""
        & node debug-login.js
    }
    "4" {
        Write-Host "🚀 Lancement du débogage avancé..." -ForegroundColor Green
        Write-Host ""
        & node debug-login-advanced.js
    }
    "5" {
        Write-Host "🚀 Génération du rapport HTML..." -ForegroundColor Green
        Write-Host ""
        & node generate-debug-report.js
        Write-Host ""
        Write-Host "✅ Rapport généré: debug-report.html" -ForegroundColor Green
        Write-Host ""
        $openReport = Read-Host "Ouvrir le rapport dans le navigateur? (o/n)"
        if ($openReport -eq "o" -or $openReport -eq "O") {
            Start-Process "debug-report.html"
        }
    }
    "0" {
        Write-Host "👋 Au revoir!" -ForegroundColor Yellow
        exit 0
    }
    default {
        Write-Host "❌ Option invalide" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║          📊 DÉBOGAGE TERMINÉ                                   ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 Rapports générés:" -ForegroundColor Yellow
Write-Host "   ✅ debug-report.json" -ForegroundColor Gray
Write-Host "   ✅ debug-report-advanced.json" -ForegroundColor Gray
Write-Host "   ✅ debug-report-scenarios.json" -ForegroundColor Gray
Write-Host "   ✅ debug-report.html" -ForegroundColor Gray
Write-Host ""
Write-Host "📚 Documentation:" -ForegroundColor Yellow
Write-Host "   📖 DEBUG_INDEX.md" -ForegroundColor Gray
Write-Host "   📖 DEBUG_LOGIN_README.md" -ForegroundColor Gray
Write-Host "   📖 QUICK_START.md" -ForegroundColor Gray
Write-Host "   📖 TROUBLESHOOTING.md" -ForegroundColor Gray
Write-Host ""

