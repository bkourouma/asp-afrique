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
  title: "Site Officiel Asp Sécurité",
  description: "ASPCI - Académie de la Sécurité Professionnelle de Côte d'Ivoire. Excellence en formation et conseil en sécurité depuis 2001.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${inter.variable} antialiased`}
      >
        <Providers>
          <GlobalPreloader />
          {children}
        </Providers>
      </body>
    </html>
  );
}
