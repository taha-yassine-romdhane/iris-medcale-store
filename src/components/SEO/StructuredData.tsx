import React from 'react';

interface StructuredDataProps {
  type?: 'organization' | 'localBusiness' | 'product' | 'breadcrumb' | 'faq';
  // eslint-disable-next-line
  data?: any;
}

// Enhanced structured data with multiple schemas for better SEO
export const StructuredData: React.FC<StructuredDataProps> = ({
  type = 'localBusiness',
  data = {}
}) => {
  // Base organization data
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": "https://www.irismedicaltunisie.com/#organization",
    "name": "Iris Medical Tunisie",
    "url": "https://www.irismedicaltunisie.com/",
    "logo": "https://www.irismedicaltunisie.com/logo_iris.png",
    "description": "Spécialiste en vente et location d'équipements médicaux CPAP, BiPAP, oxygénothérapie et accessoires en Tunisie.",
    "sameAs": [
      "https://www.facebook.com/IrisMedTn",
      // Add more social profiles if you have them
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rue Yasser Arafet Immeuble Mahdi appartement 201 4054 , Sousse",
      "addressLocality": "Sousse",
      "postalCode": "4054",
      "addressCountry": "TN",
      "addressRegion": "Sousse"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "35.734867",
      "longitude": "10.5740649"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+216 73 820 320",
        "contactType": "customer service",
        "areaServed": "TN",
        "availableLanguage": ["French", "Arabic"]
      }
    ],
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"],
        "opens": "09:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Samedi"],
        "opens": "09:00",
        "closes": "13:00"
      }
    ],
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Vente et location de machines CPAP",
          "description": "Solutions CPAP pour l'apnée du sommeil en Tunisie"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Location de concentrateurs d'oxygène en Tunisie",
          "description": "Service de location de concentrateurs d'oxygène pour l'oxygénothérapie à domicile."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Vente de masques et accessoires CPAP en Tunisie",
          "description": "Masques nasaux, naso-buccaux et accessoires pour appareils CPAP et BiPAP."
        }
      }
    ]
  };

  // Données locales pour entreprise médicale (optimisé pour la Tunisie francophone)
  const localBusinessData = {
    ...organizationData,
    "@type": "MedicalBusiness",
    "name": "Iris Medical - Spécialiste Équipements Respiratoires",
    "description": "Fournisseur leader d'équipements médicaux respiratoires en Tunisie : CPAP, BiPAP, oxygénothérapie et accessoires pour l'apnée du sommeil",
    "priceRange": "",
    "hasMap": "", // Remplacez par votre vrai CID
    "currenciesAccepted": "TND",
    "paymentAccepted": "Espèces, CNAM et assurances , cheques et virement bancaire , traites de paiement", // Ajout paiement échelonné
    "openingHours": "Mo-Fr 08:00-18:00, Sa 09:00-13:00",
    "areaServed": {
      "@type": "Country",
      "name": "Tunisie",
      // Ajout des principales villes desservies
      "sameAs": [
        "https://fr.wikipedia.org/wiki/Tunisie",
        "https://fr.wikipedia.org/wiki/Tunis",
        "https://fr.wikipedia.org/wiki/Sousse"
      ]
    },
    // Spécialités médicales (termes utilisés par les patients)
    "medicalSpecialty": [
      "Traitement de l'apnée du sommeil",
      "Thérapie respiratoire",
      "Oxygénothérapie"
    ],
    // Équipements médicaux (avec marques connues)
    "medicalEquipment": [
      "Appareils CPAP (ResMed, Yuwell)",
      "Machines BiPAP",
      "Concentrateurs d'oxygène",
      "Masques respiratoires (AirFit, Yuwell)",
      "Ventilateurs médicaux"
    ],
    // Services supplémentaires (important pour le référencement local)
    "services": [
      "Location d'équipements médicaux",
      "Maintenance et réparation CPAP",
      "Livraison à domicile",
      "Formation à l'utilisation des appareils",
      "Service après-vente 24/7"
    ]
  };

  // Medical website schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.irismedicaltunisie.com/#website",
    "url": "https://www.irismedicaltunisie.com/",
    "name": "Iris Medical - Équipements Médicaux en Tunisie",
    "description": "Spécialiste en CPAP, BiPAP et oxygénothérapie en Tunisie",
    "publisher": {
      "@id": "https://www.irismedicaltunisie.com/#organization"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.irismedicaltunisie.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  // Choose the appropriate schema based on type
  let schemaData;

  switch (type) {
    case 'organization':
      schemaData = organizationData;
      break;
    case 'localBusiness':
      schemaData = localBusinessData;
      break;
    case 'product':
      // For product pages
      schemaData = {
        "@context": "https://schema.org",
        "@type": "Product",
        ...data
      };
      break;
    case 'breadcrumb':
      // For navigation breadcrumbs
      schemaData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        ...data
      };
      break;
    case 'faq':
      // For FAQ sections
      schemaData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        ...data
      };
      break;
    default:
      schemaData = localBusinessData;
  }

  // Combine with website schema
  const fullStructuredData = [schemaData, websiteSchema];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(fullStructuredData) }}
    />
  );
};

export default StructuredData;
