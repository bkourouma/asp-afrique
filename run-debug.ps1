# Script PowerShell pour exécuter les tests de débogage de la page de login
# Utilisation: .\run-debug.ps1 -Option basic|advanced|scenarios|all

param(
    [ValidateSet('basic', 'advanced', 'scenarios', 'all')]
    [string]$Option = 'all'
)

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "🔍 Débogage de la Page de Login" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Vérifier si Node.js est installé
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js n'est pas installé ou n'est pas dans le PATH" -ForegroundColor Red
    exit 1
}

# Vérifier si les fichiers de script existent
$scripts = @{
    'basic' = 'debug-login.js'
    'advanced' = 'debug-login-advanced.js'
    'scenarios' = 'debug-login-scenarios.js'
}

foreach ($script in $scripts.Values) {
    if (-not (Test-Path $script)) {
        Write-Host "❌ Fichier non trouvé: $script" -ForegroundColor Red
        exit 1
    }
}

# Fonction pour exécuter un script
function Run-DebugScript {
    param(
        [string]$ScriptName,
        [string]$Description
    )
    
    Write-Host "🚀 $Description..." -ForegroundColor Green
    Write-Host ""
    
    & node $ScriptName
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "⚠️  Le script s'est terminé avec le code: $LASTEXITCODE" -ForegroundColor Yellow
    }
    
    Write-Host ""
}

# Exécuter les scripts selon l'option
switch ($Option) {
    'basic' {
        Run-DebugScript -ScriptName 'debug-login.js' -Description 'Lancement du débogage basique'
    }
    'advanced' {
        Run-DebugScript -ScriptName 'debug-login-advanced.js' -Description 'Lancement du débogage avancé'
    }
    'scenarios' {
        Run-DebugScript -ScriptName 'debug-login-scenarios.js' -Description 'Lancement des tests de scénarios'
    }
    'all' {
        Write-Host "Exécution de tous les tests..." -ForegroundColor Cyan
        Write-Host ""
        
        Write-Host "--- Test 1: Débogage Basique ---" -ForegroundColor Yellow
        Run-DebugScript -ScriptName 'debug-login.js' -Description 'Débogage basique'
        
        Write-Host "--- Test 2: Débogage Avancé ---" -ForegroundColor Yellow
        Run-DebugScript -ScriptName 'debug-login-advanced.js' -Description 'Débogage avancé'
        
        Write-Host "--- Test 3: Tests de Scénarios ---" -ForegroundColor Yellow
        Run-DebugScript -ScriptName 'debug-login-scenarios.js' -Description 'Tests de scénarios'
        
        Write-Host "✅ Tous les tests sont terminés!" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "📊 Rapports générés:" -ForegroundColor Cyan
Write-Host "   - debug-report.json" -ForegroundColor Gray
Write-Host "   - debug-report-advanced.json" -ForegroundColor Gray
Write-Host "   - debug-report-scenarios.json" -ForegroundColor Gray
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Afficher les fichiers générés
if (Test-Path 'debug-report.json') {
    Write-Host "✅ debug-report.json généré" -ForegroundColor Green
}
if (Test-Path 'debug-report-advanced.json') {
    Write-Host "✅ debug-report-advanced.json généré" -ForegroundColor Green
}
if (Test-Path 'debug-report-scenarios.json') {
    Write-Host "✅ debug-report-scenarios.json généré" -ForegroundColor Green
}

Write-Host ""

