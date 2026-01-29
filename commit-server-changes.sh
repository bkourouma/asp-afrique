#!/bin/bash
# Script to commit only source code changes from server debugging

cd /var/www/asp-afrique || exit 1

echo "🔍 Checking modified source files..."

# Unstage everything first
git reset HEAD

# Remove node_modules from tracking if they were added
git rm -r --cached node_modules/ 2>/dev/null || true
git rm -r --cached packages/db/node_modules/ 2>/dev/null || true

# Add only source code files that were modified on server
echo "📝 Staging source code changes..."

# Web app fixes
git add apps/web/src/app/layout.tsx
git add apps/web/src/app/(auth)/login/page.tsx
git add apps/web/src/app/api/v1/auth/logout/route.ts
git add apps/web/src/app/api/v1/auth/refresh/route.ts
git add apps/web/src/app/api/v1/me/route.ts
git add apps/web/src/app/api/v1/videos/[id]/route.ts
git add apps/web/src/app/api/v1/videos/[id]/view/route.ts
git add apps/web/src/app/api/v1/videos/slug/[slug]/route.ts
git add apps/web/src/app/blog/[slug]/page.tsx
git add apps/web/src/lib/auth/config.ts
git add apps/web/src/lib/auth/jwt.ts
git add apps/web/src/lib/audit.ts
git add apps/web/next.config.ts

# API fixes
git add apps/api/src/routes/contact.ts
git add apps/api/src/routes/partners.ts.disabled 2>/dev/null || true
git add apps/api/src/index.ts

# Type fixes
git add apps/web/src/types/video.ts 2>/dev/null || true
git add apps/web/src/components/admin/videos/VideoDetailsModal.tsx 2>/dev/null || true
git add apps/web/src/components/admin/videos/VideoList.tsx 2>/dev/null || true
git add apps/web/src/app/videos/page.tsx 2>/dev/null || true

echo ""
echo "✅ Files staged. Review what will be committed:"
echo ""
git status --short

echo ""
echo "📋 Summary of changes:"
echo "  - Next.js 15 compatibility fixes (cookies, params, request.ip)"
echo "  - Font fixes (Geist -> Inter)"
echo "  - Import fixes (@packages/db -> @/lib/prisma)"
echo "  - ESLint config fix"
echo "  - Suspense boundary for useSearchParams"
echo ""
echo "Ready to commit? Run:"
echo "  git commit -m 'fix: Next.js 15 compatibility and build errors'"
echo "  git push origin 004-tech-videotheque-system"

