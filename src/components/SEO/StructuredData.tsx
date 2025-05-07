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
    "@id": "https://www.elitemedicaleservices.tn/#organization",
    "name": "Elite Medical Services Tunisie",
    "url": "https://www.elitemedicaleservices.tn/",
    "logo": "https://www.elitemedicaleservices.tn/logo.png",
    "description": "Spécialiste en vente et location d'équipements médicaux CPAP, BiPAP, oxygénothérapie et accessoires en Tunisie.",
    "sameAs": [
      "https://www.facebook.com/profile.php?id=100058891157559",
      // Add more social profiles if you have them
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "11 RUE TAIEB MHIRI",
      "addressLocality": "Sousse",
      "postalCode": "4070",
      "addressCountry": "TN",
      "addressRegion": "Sousse"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 35.734867,
      "longitude": 10.5740649
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+21655820000",
        "contactType": "customer service",
        "areaServed": "TN",
        "availableLanguage": ["French", "Arabic"]
      },
      {
        "@type": "ContactPoint",
        "telephone": "+21655820000",
        "contactType": "sales",
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
    // Add more specific services related to your business
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Vente d'appareils CPAP en Tunisie",
          "description": "Large gamme d'appareils CPAP pour le traitement de l'apnée du sommeil."
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
    "name": "Elite Medical Services - Spécialiste Équipements Respiratoires",
    "description": "Fournisseur leader d'équipements médicaux respiratoires en Tunisie : CPAP, BiPAP, oxygénothérapie et accessoires pour l'apnée du sommeil",
    "priceRange": "€€-€€€",
    "hasMap": "https://www.google.com/maps?cid=VotreCIDGoogleMyBusiness", // Remplacez par votre vrai CID
    "currenciesAccepted": "TND",
    "paymentAccepted": "Espèces, Carte Bancaire, Paiement échelonné", // Ajout paiement échelonné
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
      "Appareils CPAP (ResMed, Philips)",
      "Machines BiPAP",
      "Concentrateurs d'oxygène",
      "Masques respiratoires (AirFit, DreamWear)",
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
    "@id": "https://www.elitemedicaleservices.tn/#website",
    "url": "https://www.elitemedicaleservices.tn/",
    "name": "Elite Medical Services - Équipements Médicaux en Tunisie",
    "description": "Spécialiste en CPAP, BiPAP et oxygénothérapie en Tunisie",
    "publisher": {
      "@id": "https://www.elitemedicaleservices.tn/#organization"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.elitemedicaleservices.tn/search?q={search_term_string}",
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
