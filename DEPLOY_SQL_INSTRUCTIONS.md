# 🚀 Deploy SQL Script to Production

## Authentication Issue Fix

If you get "Peer authentication failed", use one of these solutions:

### Solution 1: Use TCP/IP Connection (Recommended)
```bash
psql -h localhost -U aspci_user -d aspci_afrique_db -f /tmp/seed-faq-blog.sql
```
This will prompt for password and use TCP/IP authentication.

### Solution 2: Use PostgreSQL Superuser
```bash
sudo -u postgres psql -d aspci_afrique_db -f /tmp/seed-faq-blog.sql
```
This uses the postgres superuser (no password needed if sudo works).

### Solution 3: Use Password Environment Variable
```bash
# Get password from your .env file first, then:
PGPASSWORD='your_database_password' psql -h localhost -U aspci_user -d aspci_afrique_db -f /tmp/seed-faq-blog.sql
```

### Solution 4: Switch to postgres User
```bash
sudo su - postgres
psql -d aspci_afrique_db -f /tmp/seed-faq-blog.sql
exit
```

## Quick Deploy Steps

1. **Copy SQL file to server** (if not already there):
```bash
# From your local machine
scp seed-faq-blog.sql root@147.93.44.169:/tmp/
```

2. **SSH to server**:
```bash
ssh root@147.93.44.169
```

3. **Run the SQL script** (choose one method above):
```bash
# Most common - will prompt for password
psql -h localhost -U aspci_user -d aspci_afrique_db -f /tmp/seed-faq-blog.sql

# OR if you have sudo access
sudo -u postgres psql -d aspci_afrique_db -f /tmp/seed-faq-blog.sql
```

4. **Verify the data**:
```bash
psql -h localhost -U aspci_user -d aspci_afrique_db -c "SELECT COUNT(*) FROM faqs WHERE status = 'Publié';"
# Should return 20

psql -h localhost -U aspci_user -d aspci_afrique_db -c "SELECT COUNT(*) FROM blog_articles WHERE status = 'published';"
# Should return 5
```

## What the Script Does

- ✅ Creates `faqs` table if it doesn't exist
- ✅ Inserts 20 FAQs with status "Publié"
- ✅ Inserts 5 blog articles with status "published"
- ✅ Uses `ON CONFLICT DO NOTHING` to avoid duplicates
- ✅ Shows summary of inserted records


