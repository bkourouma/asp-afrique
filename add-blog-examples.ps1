# Script PowerShell pour ajouter des blogs d'exemple
# Ce script execute le script Node.js qui ajoute 4 blogs dans la base de donnees

Write-Host "Ajout de blogs d'exemple dans la base de donnees..." -ForegroundColor Green
Write-Host ""

# Verifier si Node.js est installe
try {
    $nodeVersion = node --version
    Write-Host "Node.js detecte: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "Node.js n'est pas installe ou pas dans le PATH" -ForegroundColor Red
    Write-Host "Veuillez installer Node.js depuis https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Verifier si le fichier de script existe
if (-not (Test-Path "add-blog-examples.js")) {
    Write-Host "Le fichier add-blog-examples.js n'existe pas" -ForegroundColor Red
    exit 1
}

Write-Host "Execution du script d'ajout de blogs..." -ForegroundColor Cyan
Write-Host ""

# Executer le script Node.js
try {
    node add-blog-examples.js
    
    Write-Host ""
    Write-Host "Script termine !" -ForegroundColor Green
    Write-Host "Vous pouvez maintenant consulter la page admin:" -ForegroundColor Cyan
    Write-Host "   http://localhost:3000/admin/blog" -ForegroundColor White
    Write-Host ""
    Write-Host "Si vous ne voyez pas les blogs, verifiez que:" -ForegroundColor Yellow
    Write-Host "   - Le serveur backend est demarre (port 3001)" -ForegroundColor Yellow
    Write-Host "   - Le serveur frontend est demarre (port 3000)" -ForegroundColor Yellow
    Write-Host "   - La base de donnees est accessible" -ForegroundColor Yellow
    
} catch {
    Write-Host "Erreur lors de l'execution du script:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

Write-Host ""
Write-Host "Appuyez sur une touche pour continuer..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
