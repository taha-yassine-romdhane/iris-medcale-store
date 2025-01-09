import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from '@/hooks/useCart';
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#ffffff'
};

export const metadata: Metadata = {
  metadataBase: new URL('https://materiel-medical.tn'),
  title: {
    default: "Matériel Médical Pro - Vente et Location d'Équipements Médicaux",
    template: "%s | Matériel Médical Pro"
  },
  description: "Expert en matériel médical professionnel : CPAP, BiPAP, oxygénothérapie, masques et accessoires. Vente et location d'équipements médicaux de haute qualité pour professionnels et particuliers.",
  keywords: [
    "matériel médical",
    "équipement médical",
    "CPAP",
    "BiPAP",
    "apnée du sommeil",
    "oxygénothérapie",
    "masques respiratoires",
    "location matériel médical",
    "vente matériel médical",
    "équipement respiratoire",
    "accessoires CPAP",
    "traitement apnée sommeil",
    "matériel médical professionnel",
    "équipement santé",
    "aide respiratoire",
    "matériel médical à domicile"
  ],
  authors: [{ name: "Matériel Médical Pro" }],
  creator: "Matériel Médical Pro",
  publisher: "Matériel Médical Pro",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.votre-domaine.fr',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.votre-domaine.fr',
    siteName: 'Matériel Médical Pro',
    title: 'Matériel Médical Pro - Expert en Équipements Médicaux',
    description: 'Votre partenaire de confiance pour l\'achat et la location de matériel médical professionnel. Spécialistes en CPAP, BiPAP, et équipements respiratoires.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Matériel Médical Pro - Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Matériel Médical Pro - Expert en Équipements Médicaux',
    description: 'Votre partenaire de confiance pour l\'achat et la location de matériel médical professionnel. Spécialistes en CPAP, BiPAP, et équipements respiratoires.',
    images: ['/logo.png'],
    creator: '@votre_compte_twitter',
  },
  verification: {
    google: 'votre-code-verification-google',
  },
  category: 'Matériel Médical',
  classification: 'Équipements Médicaux Professionnels',
  other: {
    'revisit-after': '7 days',
    'msapplication-TileColor': '#2563eb',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <NextSSRPlugin
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
       <CartProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}