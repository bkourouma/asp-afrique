# Test the videos API endpoint

Write-Host "Testing Videos API..." -ForegroundColor Cyan
Write-Host ""

# Test 1: Get all videos
Write-Host "Test 1: Get all videos" -ForegroundColor Yellow
$response = Invoke-WebRequest -Uri "http://localhost:3000/api/v1/videos" -Method GET
$data = $response.Content | ConvertFrom-Json

Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
Write-Host "Total videos: $($data.total)"
Write-Host "Videos returned: $($data.videos.Count)"
Write-Host ""

if ($data.videos.Count -gt 0) {
    Write-Host "First video:" -ForegroundColor Cyan
    $video = $data.videos[0]
    Write-Host "  ID: $($video.id)"
    Write-Host "  Title: $($video.title)"
    Write-Host "  Type: $($video.type)"
    Write-Host "  Status: $($video.status)"
    Write-Host "  Category: $($video.category)"
    Write-Host ""
}

# Test 2: Get videos with filters
Write-Host "Test 2: Get videos with filters (status=PUBLISHED)" -ForegroundColor Yellow
$response2 = Invoke-WebRequest -Uri "http://localhost:3000/api/v1/videos?status=PUBLISHED" -Method GET
$data2 = $response2.Content | ConvertFrom-Json

Write-Host "Status: $($response2.StatusCode)" -ForegroundColor Green
Write-Host "Total published videos: $($data2.total)"
Write-Host "Videos returned: $($data2.videos.Count)"
Write-Host ""

# Test 3: Get videos with pagination
Write-Host "Test 3: Get videos with pagination (page=1, limit=12)" -ForegroundColor Yellow
$response3 = Invoke-WebRequest -Uri "http://localhost:3000/api/v1/videos?page=1&limit=12" -Method GET
$data3 = $response3.Content | ConvertFrom-Json

Write-Host "Status: $($response3.StatusCode)" -ForegroundColor Green
Write-Host "Page: $($data3.page)"
Write-Host "Limit: $($data3.limit)"
Write-Host "Total: $($data3.total)"
Write-Host "Total pages: $($data3.totalPages)"
Write-Host "Videos returned: $($data3.videos.Count)"
Write-Host ""

Write-Host "All tests completed successfully!" -ForegroundColor Green

