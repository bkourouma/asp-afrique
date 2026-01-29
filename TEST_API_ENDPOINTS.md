# 🧪 Test API Endpoints

## API Route Structure

The API has:
- `/health` - Health check (root level)
- `/api/v1/*` - API v1 routes

## Nginx Configuration

Nginx proxies `/api` to port 3004, so:
- Browser requests: `http://asp-afrique.com/api/v1/auth`
- Nginx proxies to: `http://127.0.0.1:3004/api/v1/auth`
- API receives: `/api/v1/auth` ✅

But for health check:
- Browser requests: `http://asp-afrique.com/api/health`
- Nginx proxies to: `http://127.0.0.1:3004/api/health`
- API receives: `/api/health` ❌ (API only has `/health`)

## Test Commands

### Test Health Endpoint Directly

```bash
# Test health endpoint directly on port 3004 (bypassing nginx)
curl http://localhost:3004/health

# Should return: {"status":"ok","timestamp":"..."}
```

### Test API v1 Endpoints (through nginx)

```bash
# Test API v1 endpoint (should work through nginx)
curl http://asp-afrique.com/api/v1/auth

# Or test uploads endpoint
curl http://asp-afrique.com/api/v1/upload
```

### Test Web App

```bash
# Test web app (should work)
curl -I http://asp-afrique.com

# Should return: HTTP/1.1 200 OK
```

---

## Optional: Add Health Endpoint to Nginx

If you want `/api/health` to work through nginx, you can add a specific location block:

```nginx
# Health check endpoint (direct access)
location /api/health {
    proxy_pass http://127.0.0.1:3004/health;
    proxy_set_header Host $host;
}
```

But this is optional - the main API endpoints work fine through `/api/v1/*`.







