import { Metadata } from 'next';

// Centralized metadata configuration for better SEO management
export const getSiteMetadata = (): Metadata => {
  const siteUrl = 'https://www.irismedicaltunisie.com/';

  return {
    metadataBase: new URL(siteUrl),

    // Title optimized with location keywords for better local search ranking
    title: {
      default: "CPAP Tunisie - Vente & Location d'Appareils | Iris Medical",
      template: "%s | CPAP Tunisie - Iris Medical"
    },

    // Enhanced description with location-specific keywords and targeted services
    description: "Spécialiste CPAP en Tunisie ✓ Large choix d'appareils ✓ Service technique ✓ Livraison rapide ✓ Masques ResMed & Philips ✓ Meilleurs prix",

    // Expanded keywords with location-specific terms and common search phrases
    keywords: [
      'CPAP Tunisie',
      'Machine CPAP Tunisie',
      'Vente CPAP Tunisie',
      'Location CPAP Tunisie',
      'Prix CPAP Tunisie',
      'Appareil CPAP Tunisie',
      "BiPAP Tunisie",
      "apnée du sommeil Tunisie",
      "oxygénothérapie Tunis",
      "concentrateur oxygène Tunisie",
      "matériel médical Tunisie",
      "équipement médical Tunisie",
      "masques respiratoires Tunisie",
      "location matériel médical Tunis",
      "vente CPAP Tunisie",
      "équipement respiratoire Sousse",
      "accessoires CPAP Tunisie",
      "VNI Tunisie",
      "assistance respiratoire Tunisie",
      "appareil respiratoire Tunisie",
      "PPC apnée du sommeil",
      "traitement apnée sommeil",
      "location concentrateur oxygène",
      "vente CPAP Tunisie",
      "vente BiPAP Tunisie",
      "vente oxygénothérapie Tunisie",
      "vente concentrateur oxygène Tunisie",
      "vente masques respiratoires Tunisie",
      "vente accessoires CPAP Tunisie",
      "vente VNI Tunisie",
      "vente assistance respiratoire Tunisie",
      "vente appareil respiratoire Tunisie",
      "vente PPC apnée du sommeil Tunisie",
      "vente traitement apnée sommeil Tunisie",
      "vente location concentrateur oxygène Tunisie",
      "CPAP Tunisie prix",
      "CPAP Auto Tunisie",               
      "CPAP Auto ResMed Tunisie",        
      "meilleur CPAP Auto Tunisie",      
      "meilleur CPAP Tunisie",
      "achat CPAP Tunisie",
      "CPAP ResMed Tunisie",
      "CPAP Yuwell Tunisie",
      "Concentrateur Yuwell Tunisie",
      "Concentrateur Oxygen Yuwell Tunisie",
      "Concentrateur d'Oxygen Yuwell Tunisie",
      "Concentrateur d'Oxygen Yuwell",
      "VNI Yuwell Tunisie",
      "vente VNI Yuwell Tunisie",
      "location VNI Tunisie",
      "location VNI Yuwell Tunisie",
      "CPAP Yuwell Auto Tunisie",
      "Masque CPAP Yuwell Tunisie",
      "Masque CPAP",
      "VNI",
      "appareil respiratoire",
      "appareil de ventilation non invasive",
      "Masque CPAP Yuwell Auto Tunisie",
      "appareil pour apnée du sommeil",
      "solution apnée du sommeil",


      // BiPAP Keywords
      "BiPAP Tunisie prix",
      "location BiPAP Tunisie",
      "BiPAP vs CPAP Tunisie",
      "location VNI Tunisie",
      "polygraphie du someill Tunisie",
      "polygraphie du someill",
      "assistance respiratoire Tunisie",
      "assistance respiratoire",

      // Sleep Apnea Keywords
      "traitement apnée du sommeil Tunisie",
      "appareil apnée du sommeil prix",
      "test apnée du sommeil Tunisie",

      // Oxygen Therapy Keywords
      "concentrateur oxygène Tunisie prix",
      "location concentrateur oxygène Tunisie",
      "concentrateur oxygéne 5L",
      "concentrateur oxygéne 10L",
      "concentrateur oxygéne 10L portable",
      "concentrateur oxygéne 5L portable",
      "concentrateur oxygéne 5L Tunisie",
      "concentrateur oxygéne 10L Tunisie",
      "concentrateur oxygéne 10L portable Tunisie",
      "concentrateur oxygéne 5L portable Tunisie",
      "oxygénothérapie à domicile Tunisie",

      
      // vente Oxygen Therapy Keywords
      "vente concentrateur oxygène Tunisie",
      "location concentrateur oxygène Tunisie",
      "vente concentrateur oxygéne 5L",
      "vente concentrateur oxygéne 10L",
      "vente concentrateur oxygéne 10L portable",
      "vente concentrateur oxygéne 5L portable",
      "vente concentrateur oxygéne 5L Tunisie",
      "vente concentrateur oxygéne 10L Tunisie",
      "vente concentrateur oxygéne 10L portable Tunisie",
      "vente concentrateur oxygéne 5L portable Tunisie",
      "oxygénothérapie Tunisie",

        // location Oxygen Therapy Keywords
        "location concentrateur oxygène Tunisie",
        "location  concentrateur oxygéne 5L",
        "location  concentrateur oxygéne 10L",
        "location  concentrateur oxygéne 10L portable",
        "location  concentrateur oxygéne 5L portable",
        "location  concentrateur oxygéne 5L Tunisie",
        "location  concentrateur oxygéne 10L Tunisie",
        "location  concentrateur oxygéne 10L portable Tunisie",
        "location  concentrateur oxygéne 5L portable Tunisie",
        "oxygénothérapie Tunisie",

      // Medical Equipment Keywords
      "équipement médical Tunisie professionnel",
      "vente matériel médical Tunis",

      // Respiratory Equipment Keywords
      "masques CPAP Tunisie",
      "accessoires CPAP Auto Tunisie",    
      "accessoires respiratoires Tunisie",
      "équipement VNI Tunisie",

      // Location Services Keywords
      "location CPAP Auto Tunisie",
      "location CPAP Tunisie",
      "location BiPAP Tunis",
      "location appareil respiratoire Sousse",

      // Treatment Keywords
      "PPC traitement Tunisie",
      "solution apnée du sommeil",
      "assistance respiratoire à domicile",
    ],

    authors: [
      {
        name: "Iris Medical Tunisie",
        url: siteUrl,
      },
    ],

    creator: "Iris Medical",
    publisher: "Iris Medical Tunisie",

    // Improved classification with more specific categories
    classification: 'Équipements Médicaux, CPAP, Oxygénothérapie, Tunisie',

    // Enhanced formatDetection config
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },

    // Optimized OpenGraph data for better social media sharing
    openGraph: {
      type: "website",
      url: siteUrl,
      title: "Iris Medical - Expert en CPAP et Oxygénothérapie en Tunisie",
      description: "Spécialiste en équipements médicaux CPAP, BiPAP, concentrateurs d'oxygène et accessoires respiratoires en Tunisie. Vente et location pour professionnels et particuliers.",
      siteName: "Iris Medical Tunisie",
      images: [
        {
          url: `${siteUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: "Iris Medical - Équipements Médicaux en Tunisie",
        },
      ],
      locale: 'fr_TN',
    },

    // Twitter card for better social media presentation
    twitter: {
      card: 'summary_large_image',
      title: "Iris Medical - CPAP et Équipements Médicaux en Tunisie",
      description: "Expert en matériel médical CPAP, BiPAP et oxygénothérapie en Tunisie. Vente et location d'équipements respiratoires de qualité.",
      images: [`${siteUrl}/twitter-image.jpg`],
    },

    // Enhanced additional metadata
    other: {
      'revisit-after': '7 days',
      'msapplication-TileColor': '#2563eb',
      'google-site-verification': '9YJu7kIRsf-Qk0RLs3Kt8ujauYPEM3UJQ16f9v7bIr0',
      'facebook-domain-verification': '', // Add your Facebook verification code if available
      'geo.region': 'TN',
      'geo.placename': 'Tunisie',
    },

    // Canonical URL
    alternates: {
      canonical: siteUrl,
      languages: {
        'fr-TN': `${siteUrl}`,
        'ar-TN': `${siteUrl}`,
      },
    },

    // Robots directives
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-video-preview': -1,
        'max-snippet': -1,
      },
    },
  };
};

export default getSiteMetadata;
