# Script to add a YouTube video to the database

$apiUrl = "http://localhost:3000/api/v1/videos"

# Video data to add
$videoData = @{
    title = "Introduction a Docker - Tutoriel Complet"
    description = "Decouvrez Docker, la plateforme de containerisation revolutionnaire. Ce tutoriel complet vous guide a travers les concepts fondamentaux, l'installation, et les cas d'usage pratiques de Docker."
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

Write-Host "Adding YouTube video to database..." -ForegroundColor Cyan
Write-Host "API URL: $apiUrl" -ForegroundColor Gray
Write-Host ""

try {
    $response = Invoke-WebRequest -Uri $apiUrl `
        -Method POST `
        -ContentType "application/json" `
        -Body $videoData `
        -ErrorAction Stop

    $result = $response.Content | ConvertFrom-Json
    
    Write-Host "SUCCESS: Video added successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Video Details:" -ForegroundColor Cyan
    Write-Host "  ID: $($result.id)"
    Write-Host "  Title: $($result.title)"
    Write-Host "  Slug: $($result.slug)"
    Write-Host "  Type: $($result.type)"
    Write-Host "  Status: $($result.status)"
    Write-Host "  Category: $($result.category)"
    Write-Host "  Author: $($result.author)"
    Write-Host "  Duration: $($result.duration)"
    Write-Host "  Language: $($result.language)"
    Write-Host "  Level: $($result.level)"
    Write-Host "  Created: $($result.createdAt)"
    Write-Host ""
    Write-Host "You can now view the video at:" -ForegroundColor Yellow
    Write-Host "   http://localhost:3000/admin/videos" -ForegroundColor Blue
}
catch {
    Write-Host "ERROR: Failed to add video" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    
    if ($_.Exception.Response) {
        $errorContent = $_.Exception.Response.Content.ReadAsStream() | ForEach-Object { [System.IO.StreamReader]::new($_).ReadToEnd() }
        Write-Host "Error details:" -ForegroundColor Red
        Write-Host $errorContent -ForegroundColor Red
    }
}

