# PowerShell script to deploy SQL seed file to production
# Usage: .\deploy-sql.ps1

$server = "root@147.93.44.169"
$sqlFile = "seed-faq-blog.sql"
$remotePath = "/tmp/seed-faq-blog.sql"

Write-Host "📤 Sending SQL file to server..." -ForegroundColor Yellow

# Copy file to server using SCP
# Note: You'll need to enter password when prompted
scp $sqlFile "${server}:${remotePath}"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ File uploaded successfully!" -ForegroundColor Green
    Write-Host "`n🔧 Executing SQL script on server..." -ForegroundColor Yellow
    
    # Execute SQL script on server
    # Use -h localhost to force TCP/IP connection (password auth) instead of peer auth
    ssh $server "psql -h localhost -U aspci_user -d aspci_afrique_db -f $remotePath && echo '✅ SQL script executed successfully!' && rm $remotePath"
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n✅ Deployment completed successfully!" -ForegroundColor Green
    } else {
        Write-Host "`n❌ Error executing SQL script. Check the error above." -ForegroundColor Red
    }
} else {
    Write-Host "`n❌ Error uploading file. Check your SSH connection." -ForegroundColor Red
}

