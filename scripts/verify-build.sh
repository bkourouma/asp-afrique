#!/bin/bash
# Script de vérification locale avant push vers le serveur
# Usage: ./scripts/verify-build.sh

set -e

echo "🔍 Vérification locale avant déploiement..."
echo ""

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

ERRORS=0

# 1. Vérifier TypeScript
echo "1️⃣  Vérification TypeScript..."
if pnpm --filter web exec tsc --noEmit; then
    echo -e "${GREEN}✓ TypeScript OK${NC}"
else
    echo -e "${RED}✗ Erreurs TypeScript${NC}"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# 2. Build API
echo "2️⃣  Build API..."
if pnpm --filter api run build; then
    echo -e "${GREEN}✓ API Build OK${NC}"
else
    echo -e "${RED}✗ Erreurs API Build${NC}"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# 3. Build Web
echo "3️⃣  Build Web..."
if pnpm --filter web run build; then
    echo -e "${GREEN}✓ Web Build OK${NC}"
else
    echo -e "${RED}✗ Erreurs Web Build${NC}"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# 4. Vérifier les imports @packages/db dans apps/web
echo "4️⃣  Vérification des imports incorrects..."
if grep -r "@packages/db" apps/web/src --include="*.ts" --include="*.tsx" | grep -v node_modules; then
    echo -e "${RED}✗ Trouvé des imports @packages/db dans apps/web${NC}"
    echo "   Ils doivent être remplacés par @/lib/prisma"
    ERRORS=$((ERRORS + 1))
else
    echo -e "${GREEN}✓ Pas d'imports @packages/db incorrects${NC}"
fi
echo ""

# 5. Vérifier les fichiers manquants
echo "5️⃣  Vérification des composants UI manquants..."
MISSING_COMPONENTS=()

if [ ! -f "apps/web/src/components/ui/separator.tsx" ]; then
    if grep -r "from.*separator" apps/web/src --include="*.tsx" --include="*.ts" | grep -v node_modules; then
        MISSING_COMPONENTS+=("separator")
    fi
fi

if [ ${#MISSING_COMPONENTS[@]} -gt 0 ]; then
    echo -e "${YELLOW}⚠ Composants manquants: ${MISSING_COMPONENTS[*]}${NC}"
else
    echo -e "${GREEN}✓ Tous les composants UI présents${NC}"
fi
echo ""

# 6. Vérifier les variables d'environnement
echo "6️⃣  Vérification des fichiers .env..."
if [ ! -f "apps/api/.env.example" ]; then
    echo -e "${YELLOW}⚠ apps/api/.env.example manquant${NC}"
fi
if [ ! -f "apps/web/.env.example" ]; then
    echo -e "${YELLOW}⚠ apps/web/.env.example manquant${NC}"
fi
if [ ! -f "packages/db/.env.example" ]; then
    echo -e "${YELLOW}⚠ packages/db/.env.example manquant${NC}"
fi
echo ""

# Résumé
echo "═══════════════════════════════════════"
if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✅ Toutes les vérifications sont passées!${NC}"
    echo "Vous pouvez maintenant push vers git et déployer."
    exit 0
else
    echo -e "${RED}❌ $ERRORS erreur(s) trouvée(s)${NC}"
    echo "Corrigez les erreurs avant de push."
    exit 1
fi

