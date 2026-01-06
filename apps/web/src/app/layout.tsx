import type { Metadata } from "next";
import Script from "next/script";
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
      <head>
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window,document,"clarity","script","uwux5eq3fa");
            `,
          }}
        />
      </head>
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
