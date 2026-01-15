#!/bin/bash

# Bash script to deploy SQL seed file to production
# Usage: bash deploy-sql.sh

SERVER="root@147.93.44.169"
SQL_FILE="seed-faq-blog.sql"
REMOTE_PATH="/tmp/seed-faq-blog.sql"
DB_USER="aspci_user"
DB_NAME="aspci_afrique_db"

echo "📤 Sending SQL file to server..."
scp "$SQL_FILE" "${SERVER}:${REMOTE_PATH}"

if [ $? -eq 0 ]; then
    echo "✅ File uploaded successfully!"
    echo ""
    echo "🔧 Executing SQL script on server..."
    
    # Execute SQL script on server
    # Use -h localhost to force TCP/IP connection (password auth) instead of peer auth
    ssh "$SERVER" "psql -h localhost -U $DB_USER -d $DB_NAME -f $REMOTE_PATH && echo '✅ SQL script executed successfully!' && rm $REMOTE_PATH"
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Deployment completed successfully!"
    else
        echo ""
        echo "❌ Error executing SQL script. Check the error above."
        exit 1
    fi
else
    echo ""
    echo "❌ Error uploading file. Check your SSH connection."
    exit 1
fi

