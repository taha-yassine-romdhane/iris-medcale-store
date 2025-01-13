import type { Metadata } from "next";
import { Suspense } from 'react';
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { extractRouterConfig } from 'uploadthing/server';
import { ourFileRouter } from '@/app/api/uploadthing/core';
import { CartProvider } from '@/hooks/useCart';
import { FilterProvider } from '@/contexts/FilterContext';
import Navbar from '@/components/Navbar';
import FooterClient from '@/components/client/FooterClient';
import { Providers } from '@/components/Providers';
import './globals.css';

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
    "accessoires CPAP"
  ],
  authors: [
    {
      name: "Matériel Médical Pro",
      url: "https://materiel-medical.tn",
    },
  ],
  creator: "Matériel Médical Pro",
  publisher: "Matériel Médical Pro",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  classification: 'Équipements Médicaux Professionnels',
  other: {
    'revisit-after': '7 days',
    'msapplication-TileColor': '#2563eb',
  },
};

// Loading fallback components
function NavbarFallback() {
  return <div className="h-24 bg-white shadow animate-pulse" />;
}

function MainFallback() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-pulse">
        <div className="h-32 w-32 bg-blue-200 rounded-full" />
      </div>
    </div>
  );
}

function FooterFallback() {
  return <div className="h-64 bg-gray-100 animate-pulse" />;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <Providers>
          <CartProvider>
            <FilterProvider>
            {/* Ensure NextSSRPlugin is used in a Client Component */}
            <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
            
            {/* Wrap Navbar in Suspense */}
            <Suspense fallback={<NavbarFallback />}>
              <Navbar />
            </Suspense>

            {/* Wrap main content in Suspense */}
            <Suspense fallback={<MainFallback />}>
              <main>{children}</main>
            </Suspense>

            {/* Wrap Footer in Suspense */}
            <Suspense fallback={<FooterFallback />}>
              <FooterClient />
            </Suspense>
          </FilterProvider>
        </CartProvider>
        </Providers>
      </body>
    </html>
  );
}