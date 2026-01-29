# Server Git Commit Commands

## On the server, run these commands:

```bash
cd /var/www/asp-afrique

# Unstage everything first
git reset HEAD

# Remove node_modules from tracking if they were added
git rm -r --cached node_modules/ 2>/dev/null || true
git rm -r --cached packages/db/node_modules/ 2>/dev/null || true

# Stage only the source code changes (use quotes for paths with special chars)
git add apps/web/src/app/layout.tsx
git add "apps/web/src/app/(auth)/login/page.tsx"
git add apps/web/src/app/api/v1/auth/logout/route.ts
git add apps/web/src/app/api/v1/auth/refresh/route.ts
git add apps/web/src/app/api/v1/me/route.ts
git add "apps/web/src/app/api/v1/videos/[id]/route.ts"
git add "apps/web/src/app/api/v1/videos/[id]/view/route.ts"
git add "apps/web/src/app/api/v1/videos/slug/[slug]/route.ts"
git add "apps/web/src/app/blog/[slug]/page.tsx"
git add apps/web/src/lib/auth/config.ts
git add apps/web/src/lib/auth/jwt.ts
git add apps/web/src/lib/audit.ts
git add apps/web/next.config.ts
git add apps/api/src/routes/contact.ts
git add apps/api/src/index.ts

# Check what will be committed
git status

# Commit with descriptive message
git commit -m "fix: Next.js 15 compatibility and build errors

- Wrap useSearchParams in Suspense boundary
- Fix cookies() to await cookies() in Next.js 15
- Replace request.ip with header extraction
- Fix dynamic route params to be Promise
- Change Geist fonts to Inter
- Fix import paths from @packages/db to @/lib/prisma
- Add ESLint ignoreDuringBuilds config
- Fix logging calls in contact route"

# Push to GitHub
git push origin 004-tech-videotheque-system
```

## Alternative: Use git add with wildcards

If quoting doesn't work, you can also use:

```bash
git add apps/web/src/app/layout.tsx
git add 'apps/web/src/app/(auth)/login/page.tsx'
git add apps/web/src/app/api/v1/auth/logout/route.ts
git add apps/web/src/app/api/v1/auth/refresh/route.ts
git add apps/web/src/app/api/v1/me/route.ts
git add 'apps/web/src/app/api/v1/videos/[id]/route.ts'
git add 'apps/web/src/app/api/v1/videos/[id]/view/route.ts'
git add 'apps/web/src/app/api/v1/videos/slug/[slug]/route.ts'
git add 'apps/web/src/app/blog/[slug]/page.tsx'
git add apps/web/src/lib/auth/config.ts
git add apps/web/src/lib/auth/jwt.ts
git add apps/web/src/lib/audit.ts
git add apps/web/next.config.ts
git add apps/api/src/routes/contact.ts
git add apps/api/src/index.ts
```

