# Complete API test script

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "COMPLETE API TEST FOR VIDEOS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Test 1: Direct API call
Write-Host "Test 1: Direct API call to /api/v1/videos" -ForegroundColor Yellow
Write-Host "URL: http://localhost:3000/api/v1/videos" -ForegroundColor Gray
Write-Host ""

try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/api/v1/videos" `
        -Method GET `
        -Headers @{"Accept" = "application/json"} `
        -ErrorAction Stop
    
    Write-Host "Status Code: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Content-Type: $($response.Headers['Content-Type'])" -ForegroundColor Green
    Write-Host ""
    
    $data = $response.Content | ConvertFrom-Json
    
    Write-Host "Response Data:" -ForegroundColor Cyan
    Write-Host "  Total: $($data.total)"
    Write-Host "  Page: $($data.page)"
    Write-Host "  Limit: $($data.limit)"
    Write-Host "  Total Pages: $($data.totalPages)"
    Write-Host "  Videos Count: $($data.videos.Count)"
    Write-Host ""
    
    if ($data.videos.Count -gt 0) {
        Write-Host "Videos found:" -ForegroundColor Green
        $data.videos | ForEach-Object {
            Write-Host "  - $($_.title)" -ForegroundColor Green
            Write-Host "    ID: $($_.id)"
            Write-Host "    Type: $($_.type)"
            Write-Host "    Status: $($_.status)"
            Write-Host ""
        }
    } else {
        Write-Host "No videos found!" -ForegroundColor Red
    }
}
catch {
    Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
}

# Test 2: With query parameters
Write-Host "Test 2: API call with query parameters" -ForegroundColor Yellow
Write-Host "URL: http://localhost:3000/api/v1/videos?page=1&limit=12&sortBy=createdAt&sortOrder=desc" -ForegroundColor Gray
Write-Host ""

try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/api/v1/videos?page=1&limit=12&sortBy=createdAt&sortOrder=desc" `
        -Method GET `
        -Headers @{"Accept" = "application/json"} `
        -ErrorAction Stop
    
    Write-Host "Status Code: $($response.StatusCode)" -ForegroundColor Green
    $data = $response.Content | ConvertFrom-Json
    
    Write-Host "Response Data:" -ForegroundColor Cyan
    Write-Host "  Total: $($data.total)"
    Write-Host "  Videos Count: $($data.videos.Count)"
    Write-Host ""
    
    if ($data.videos.Count -gt 0) {
        Write-Host "Videos found:" -ForegroundColor Green
        $data.videos | ForEach-Object {
            Write-Host "  - $($_.title)" -ForegroundColor Green
        }
    } else {
        Write-Host "No videos found!" -ForegroundColor Red
    }
}
catch {
    Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
}

# Test 3: Check database directly
Write-Host ""
Write-Host "Test 3: Check database with Prisma" -ForegroundColor Yellow
Write-Host ""

$prismaScript = @"
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const count = await prisma.video.count();
    console.log('Total videos in database:', count);
    
    const videos = await prisma.video.findMany({
      select: {
        id: true,
        title: true,
        type: true,
        status: true,
        category: true
      }
    });
    
    if (videos.length > 0) {
      console.log('\nVideos in database:');
      videos.forEach((v, i) => {
        console.log(\`\${i + 1}. \${v.title} (Type: \${v.type}, Status: \${v.status})\`);
      });
    } else {
      console.log('No videos in database');
    }
  } catch (error) {
    console.error('Database error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
"@

$scriptPath = "prisma-check.js"
Set-Content -Path $scriptPath -Value $prismaScript -Encoding UTF8

try {
    $output = & node $scriptPath 2>&1
    Write-Host $output -ForegroundColor Cyan
}
catch {
    Write-Host "ERROR running Prisma check: $($_.Exception.Message)" -ForegroundColor Red
}
finally {
    Remove-Item $scriptPath -Force -ErrorAction SilentlyContinue
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "TEST COMPLETE" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

