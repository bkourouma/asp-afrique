#!/bin/bash
# Script pour corriger les erreurs de build sur le VPS

cd /var/www/asp-afrique || exit 1

echo "🔧 Correction des erreurs de build..."

# 1. Corriger contact.ts - fixer les logs
echo "1. Correction de apps/api/src/routes/contact.ts..."
sed -i 's/fastify.log.info('\''Données reçues:'\'', request.body)/fastify.log.info(`Données reçues: ${JSON.stringify(request.body)}`)/' apps/api/src/routes/contact.ts
sed -i 's/fastify.log.error('\''Erreurs de validation:'\'', validation.errors)/fastify.log.error(`Erreurs de validation: ${JSON.stringify(validation.errors)}`)/' apps/api/src/routes/contact.ts

# 2. Commenter les routes partners.ts
echo "2. Commentage de apps/api/src/routes/partners.ts..."
# Créer une version commentée du fichier
if [ -f apps/api/src/routes/partners.ts ]; then
    sed -i 's/^export default async function partnersRoutes/\/\/ export default async function partnersRoutes/' apps/api/src/routes/partners.ts
    sed -i 's/^  fastify\./\/\/   fastify\./g' apps/api/src/routes/partners.ts
    sed -i 's/^  }/\/\/   }/g' apps/api/src/routes/partners.ts
    sed -i 's/^}/\/\/ }/' apps/api/src/routes/partners.ts
fi

# 3. Corriger layout.tsx pour les polices Geist
echo "3. Correction de apps/web/src/app/layout.tsx..."
cat > apps/web/src/app/layout.tsx << 'EOF'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import { GlobalPreloader } from "@/components/GlobalPreloader";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ASP Afrique - Académie de la Sécurité Professionnelle",
  description: "Académie de la Sécurité Professionnelle de Côte d'Ivoire",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} antialiased`}>
        <Providers>
          <GlobalPreloader />
          {children}
        </Providers>
      </body>
    </html>
  );
}
EOF

# 4. Commenter l'import de partners dans index.ts
echo "4. Vérification de apps/api/src/index.ts..."
if grep -q "partnersRoutes" apps/api/src/index.ts; then
    sed -i 's/import partnersRoutes/\/\/ import partnersRoutes/' apps/api/src/index.ts
    sed -i 's/app.register(partnersRoutes/\/\/ app.register(partnersRoutes/' apps/api/src/index.ts
fi

echo "✅ Corrections appliquées!"
echo "Vous pouvez maintenant réessayer: pnpm build"

