import type { Metadata } from "next";
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { extractRouterConfig } from 'uploadthing/server';
import { ourFileRouter } from '@/app/api/uploadthing/core';
import { CartProvider } from '@/hooks/useCart';
import { FilterProvider } from '@/contexts/FilterContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <CartProvider>
          <FilterProvider>
            <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
            <Navbar />
            <main>{children}</main>
            <Footer />
          </FilterProvider>
        </CartProvider>
      </body>
    </html>
  );
}