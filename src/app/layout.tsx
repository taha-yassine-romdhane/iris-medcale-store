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
import StructuredData from '@/components/SEO/StructuredData';
import { getSiteMetadata } from '@/components/SEO/SiteMetadata';
import './globals.css';

// Use our enhanced metadata from the SEO component
export const metadata: Metadata = getSiteMetadata();

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
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* Google Site Verification */}
        <meta name="google-site-verification" content="UtU39-ipWVaxllm5GhD5WRnE18EuRC2uUkqyC50Rujk" />
        
        {/* Canonical URLs are now set dynamically in each page */}
        
        {/* Enhanced Structured Data for improved SEO */}
        <StructuredData type="localBusiness" />
        
        {/* The following meta tags are important for search engines focusing on Tunisia */}
        <meta name="geo.region" content="TN" />
        <meta name="geo.placename" content="Tunisie" />
        <meta name="geo.position" content="36.8;10.1" />
        <meta name="ICBM" content="36.8, 10.1" />
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
