# Upload SQL File to Server

## Option 1: Copy File Content (Recommended)

1. Copy the entire content of `seed-faq-blog.sql` below
2. On the server, create the file:
```bash
nano /tmp/seed-faq-blog.sql
# Paste the content, then Ctrl+X, Y, Enter to save
```

3. Then run:
```bash
sudo -u postgres psql -d aspci_afrique_db -f /tmp/seed-faq-blog.sql
```

## Option 2: Use SCP from Local Machine

From your local Windows machine (PowerShell):
```powershell
cd D:\APP\VERSIONS_ANGE\asp-afrique
scp seed-faq-blog.sql root@147.93.44.169:/tmp/
```

Then on server:
```bash
sudo -u postgres psql -d aspci_afrique_db -f /tmp/seed-faq-blog.sql
```

## Option 3: Create File Directly on Server

SSH to server and run:
```bash
cat > /tmp/seed-faq-blog.sql << 'EOF'
[paste the SQL content here]
EOF
```

Then execute:
```bash
sudo -u postgres psql -d aspci_afrique_db -f /tmp/seed-faq-blog.sql
```


