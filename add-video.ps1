# Script pour ajouter une vidéo YouTube à la base de données
# Usage: .\add-video.ps1

$apiUrl = "http://localhost:3000/api/v1/videos"

# Données de la vidéo YouTube à ajouter
$videoData = @{
    title = "Introduction à Docker - Tutoriel Complet"
    description = "Découvrez Docker, la plateforme de containerisation révolutionnaire. Ce tutoriel complet vous guide à travers les concepts fondamentaux, l'installation, et les cas d'usage pratiques de Docker."
    descriptionShort = "Apprenez Docker et la containerisation en 30 minutes"
    type = "YOUTUBE"
    videoId = "3c-iBn73dRM"
    videoUrl = "https://www.youtube.com/watch?v=3c-iBn73dRM"
    thumbnail = "https://img.youtube.com/vi/3c-iBn73dRM/maxresdefault.jpg"
    duration = "30:45"
    durationSeconds = 1845
    category = "DevOps & CI/CD"
    tags = @("docker", "containerization", "devops", "tutorial")
    author = "Tech Academy"
    language = "FR"
    level = "DEBUTANT"
    status = "PUBLISHED"
} | ConvertTo-Json

Write-Host "📹 Ajout d'une vidéo YouTube à la base de données..." -ForegroundColor Cyan
Write-Host "URL API: $apiUrl" -ForegroundColor Gray
Write-Host ""

try {
    $response = Invoke-WebRequest -Uri $apiUrl `
        -Method POST `
        -ContentType "application/json" `
        -Body $videoData `
        -ErrorAction Stop

    $result = $response.Content | ConvertFrom-Json
    
    Write-Host "✅ Vidéo ajoutée avec succès!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Détails de la vidéo:" -ForegroundColor Cyan
    Write-Host "  ID: $($result.id)"
    Write-Host "  Titre: $($result.title)"
    Write-Host "  Slug: $($result.slug)"
    Write-Host "  Type: $($result.type)"
    Write-Host "  Statut: $($result.status)"
    Write-Host "  Catégorie: $($result.category)"
    Write-Host "  Auteur: $($result.author)"
    Write-Host "  Durée: $($result.duration)"
    Write-Host "  Langue: $($result.language)"
    Write-Host "  Niveau: $($result.level)"
    Write-Host "  Créée le: $($result.createdAt)"
    Write-Host ""
    Write-Host "🎬 Vous pouvez maintenant voir la vidéo sur:" -ForegroundColor Yellow
    Write-Host "   http://localhost:3000/admin/videos" -ForegroundColor Blue
}
catch {
    Write-Host "Error adding video:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red

    if ($_.Exception.Response) {
        $errorContent = $_.Exception.Response.Content.ReadAsStream() | ForEach-Object { [System.IO.StreamReader]::new($_).ReadToEnd() }
        Write-Host "Error details:" -ForegroundColor Red
        Write-Host $errorContent -ForegroundColor Red
    }
}

