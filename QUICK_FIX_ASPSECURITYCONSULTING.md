# 🚀 Quick Fix for aspsecurityconsulting.com

## One-Line Commands

### Copy script and run it:

```bash
scp -i ~/.ssh/id_ed25519 fix-aspsecurityconsulting-domain.sh deployer@147.93.44.169:~/ && ssh -i ~/.ssh/id_ed25519 deployer@147.93.44.169 "chmod +x ~/fix-aspsecurityconsulting-domain.sh && ~/fix-aspsecurityconsulting-domain.sh"
```

### Or SSH and run manually:

```bash
# 1. SSH into server
ssh -i ~/.ssh/id_ed25519 deployer@147.93.44.169

# 2. Update nginx config (both server_name lines)
sudo sed -i 's/server_name asp-afrique.com www.asp-afrique.com;/server_name asp-afrique.com www.asp-afrique.com aspsecurityconsulting.com www.aspsecurityconsulting.com;/g' /etc/nginx/sites-available/asp-afrique.com

# 3. Test and reload
sudo nginx -t && sudo systemctl reload nginx

# 4. Update SSL certificate
sudo certbot --nginx -d asp-afrique.com -d www.asp-afrique.com -d aspsecurityconsulting.com -d www.aspsecurityconsulting.com --expand --non-interactive --agree-tos --email info@asp-afrique.com
```

That's it! Both domains will work after this.


