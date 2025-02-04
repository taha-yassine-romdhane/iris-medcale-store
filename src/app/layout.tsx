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
  metadataBase: new URL('https://www.elitemedicaleservices.tn/'),
  title: {
    default: "Elite Medical Services - Vente et Location d'Équipements Médicaux",
    template: "%s | Elite Medical Services"
  },
  description: "Expert en matériel médical : CPAP, BiPAP, oxygénothérapie, masques et accessoires. Vente et location d'équipements médicaux de haute qualité pour professionnels et particuliers.",
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
      name: "Elite Medical Services",
      url: "https://www.elitemedicaleservices.tn/",
    },
  ],
  creator: "Elite Medical Services",
  publisher: "Elite Medical Services",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  classification: 'Équipements Médicaux',
  openGraph: {
    type: "website",
    url: "https://www.elitemedicaleservices.tn/",
    title: "Elite Medical Services - Vente et Location d'Équipements Médicaux",
    description: "Expert en matériel médical professionnel : CPAP, BiPAP, oxygénothérapie, masques et accessoires.",
    siteName: "Elite Medical Services",
    images: [
      {
        url: "https://www.elitemedicaleservices.tn/og-image.jpg", // Replace with actual OG image URL
        width: 1200,
        height: 630,
        alt: "Elite Medical Services",
      },
    ],
  },
  other: {
    'revisit-after': '7 days',
    'msapplication-TileColor': '#2563eb',
    'google-site-verification': 'google8f86c4dbcb3b593a.html', // 👈 Add your Google Verification Code
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        {/* Google Site Verification */}
        <meta name="google-site-verification" content="google8f86c4dbcb3b593a.html" />

        {/* Structured Data for Google */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalBusiness",
          "name": "Elite Medical Services",
          "url": "https://www.elitemedicaleservices.tn/",
          "logo": "https://www.elitemedicaleservices.tn/logo.png",
          "description": "Vente et location d'équipements médicaux : CPAP, BiPAP, oxygénothérapie et accessoires médicaux.",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "11 RUE TAIEB MHIRI",
            "addressLocality": "Sousse",
            "postalCode": "4070",
            "addressCountry": "TN"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+21655820000",
            "contactType": "customer service"
          }
        }) }} />
      </head>
      <body>
        <Providers>
          <CartProvider>
            <FilterProvider>
              <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />

              <div className="w-full h-screen">
                <Suspense fallback={<NavbarFallback />}>
                  <Navbar />
                </Suspense>

                <Suspense fallback={<MainFallback />}>
                  <>{children}</>
                </Suspense>

                <Suspense fallback={<FooterFallback />}>
                  <FooterClient />
                </Suspense>
              </div>
            </FilterProvider>
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}
