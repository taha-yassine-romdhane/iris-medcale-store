import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Delete existing records
  await prisma.media.deleteMany();
  await prisma.review.deleteMany();
  await prisma.category.deleteMany();

  // Create categories
  const cpapCategory = await prisma.category.create({
    data: {
      name: 'CPAP',
      description: 'Machines CPAP pour le traitement de l\'apnée du sommeil',
    },
  });

  const accessoiresCategory = await prisma.category.create({
    data: {
      name: 'accessoires',
      description: 'Accessoires pour machines CPAP',
    },
  });

  const oxygenCategory = await prisma.category.create({
    data: {
      name: 'Oxygen',
      description: 'Équipements et accessoires d\'oxygénothérapie',
    },
  });

  const bipapCategory = await prisma.category.create({
    data: {
      name: 'BIPAP-VNI',
      description: 'Ventilation Non Invasive et BIPAP',
    },
  });

  const aerosolCategory = await prisma.category.create({
    data: {
      name: 'Aerosoltherapie',
      description: 'Équipements pour l\'aérosolthérapie',
    },
  });

  const aspirateurCategory = await prisma.category.create({
    data: {
      name: 'Aspirateur Therapie',
      description: 'Aspirateurs thérapeutiques et accessoires',
    },
  });

  const litCategory = await prisma.category.create({
    data: {
      name: 'Lit',
      description: 'Lits médicalisés et accessoires',
    },
  });

  // Create CPAP products with media
  const cpapProducts = [
    {
      name: 'CPAP Auto Prisma Smart',
      brand: 'Löwenstein',
      type: 'Auto-pilotée',
      description: 'Machine à PPC auto-pilotée avec technologie avancée pour un traitement optimal de l\'apnée du sommeil.',
      features: [
        'Ajustement automatique de la pression',
        'Écran couleur intuitif',
        'Connexion sans fil',
        'Humidificateur intégré'
      ],
      category: 'cpap',
      media: [
        {
          url: '/SITE DE VENTE ET LOCATION 1/1)CPAP-PPC/1)CPAP AUTO-PILOTEE/CPAP AUTO PILOTEE LOWENSTEIN/cpap lowenstein smart.jpg',
          type: 'image',
          alt: 'CPAP Auto Prisma Smart - Vue principale',
          order: 1
        }
      ]
    },
    {
      name: 'AirSense 10 AutoSet',
      brand: 'ResMed',
      type: 'Auto-pilotée',
      description: 'La nouvelle génération de CPAP auto-pilotée avec des fonctionnalités intelligentes.',
      features: [
        'Technologie AutoRamp',
        'Détection des événements respiratoires',
        'Application myAir',
        'Design compact'
      ],
      category: 'cpap',
      media: [
        {
          url: '/SITE DE VENTE ET LOCATION 1/1)CPAP-PPC/1)CPAP AUTO-PILOTEE/CPAP AUTO PILOTEE RESMED/cpap resmed airsense 10 autoset.jpg',
          type: 'image',
          alt: 'AirSense 10 AutoSet - Vue principale',
          order: 1
        },
        {
          url: '/SITE DE VENTE ET LOCATION 1/1)CPAP-PPC/1)CPAP AUTO-PILOTEE/CPAP AUTO PILOTEE RESMED/ResMed - Apprenez à utiliser votre équipement ResMed.mp4',
          type: 'video',
          alt: 'Guide d\'utilisation AirSense 10 AutoSet',
          order: 2
        }
      ]
    },
    {
      name: 'YH-550',
      brand: 'Yuwell',
      type: 'Auto-pilotée',
      description: 'CPAP auto-pilotée fiable avec un excellent rapport qualité-prix.',
      features: [
        'Système auto-adaptatif',
        'Écran LCD',
        'Mode confort',
        'Ultra silencieux'
      ],
      category: 'cpap',
      media: [
        {
          url: '/SITE DE VENTE ET LOCATION 1/1)CPAP-PPC/1)CPAP AUTO-PILOTEE/CPAP AUTO PILOTEE YUWELL/cpap yuwell yh-550.jpg',
          type: 'image',
          alt: 'YH-550 - Vue principale',
          order: 1
        },
        {
          url: '/SITE DE VENTE ET LOCATION 1/1)CPAP-PPC/1)CPAP AUTO-PILOTEE/CPAP AUTO PILOTEE YUWELL/CPAP YH-550.mp4',
          type: 'video',
          alt: 'Présentation YH-550',
          order: 2
        },
        {
          url: '/SITE DE VENTE ET LOCATION 1/1)CPAP-PPC/1)CPAP AUTO-PILOTEE/CPAP AUTO PILOTEE YUWELL/GAMME CPAP YUWELL.mp4',
          type: 'video',
          alt: 'Présentation de la gamme Yuwell',
          order: 3
        }
      ]
    },
    {
      name: 'Prisma Smart Basic',
      brand: 'Löwenstein',
      type: 'Fixe',
      description: 'CPAP à pression fixe avec des fonctionnalités essentielles pour un traitement efficace.',
      features: [
        'Pression constante',
        'Interface simple',
        'Compact et léger',
        'Filtre hypoallergénique'
      ],
      category: 'cpap',
      media: [
        {
          url: '/SITE DE VENTE ET LOCATION 1/1)CPAP-PPC/2)CPAP FIXE/CPAP FIXE LOVENSTEIN/cpap lowenstein prisma soft.jpg',
          type: 'image',
          alt: 'Prisma Smart Basic - Vue principale',
          order: 1
        }
      ]
    },
    {
      name: 'AirSense 10 Elite',
      brand: 'ResMed',
      type: 'Fixe',
      description: 'CPAP fixe de qualité supérieure avec technologie éprouvée.',
      features: [
        'Technologie EPR',
        'Données détaillées',
        'Humidificateur intégré',
        'Fonctionnement silencieux'
      ],
      category: 'cpap',
      media: [
        {
          url: '/SITE DE VENTE ET LOCATION 1/1)CPAP-PPC/2)CPAP FIXE/CPAP FIXE RESMED/cpap resmed airsense 10 elite.jpg',
          type: 'image',
          alt: 'AirSense 10 Elite - Vue principale',
          order: 1
        }
      ]
    },
    {
      name: 'YH-350',
      brand: 'Yuwell',
      type: 'Fixe',
      description: 'CPAP fixe abordable avec toutes les fonctionnalités essentielles.',
      features: [
        'Pression stable',
        'Facile à utiliser',
        'Compact',
        'Économique'
      ],
      category: 'cpap',
      media: [
        {
          url: '/SITE DE VENTE ET LOCATION 1/1)CPAP-PPC/2)CPAP FIXE/CPAP FIXE YUWELL/cpap yuwell yh-350.jpg',
          type: 'image',
          alt: 'YH-350 - Vue principale',
          order: 1
        }
      ]
    }
  ];

  // Create Accessory products
  const accessoryProducts = [
    // Filters
    {   
      name: 'Filtre Standard Löwenstein',
      brand: 'Löwenstein',
      type: 'Filtre',
      description: 'Filtre standard pour machines CPAP Löwenstein, garantissant une filtration optimale de l\'air.',
      features: [
        'Filtration haute efficacité',
        'Compatible avec tous les modèles Löwenstein',
        'Durée de vie : 3 mois',
        'Facile à remplacer'
      ],
      category: 'accessoires',
      subCategory: 'FILTRE',
      media: [
        {
          url: '/SITE DE VENTE ET LOCATION 1/1)CPAP-PPC/3)ACECCESSOIRE CPAP/FILTRE/FILTRE LOWENSTEIN/filtre lowenstein.jpg',
          type: 'image',
          alt: 'Filtre Löwenstein',
          order: 1
        }
      ]
    },
    {
      name: 'Filtre ResMed AirSense',
      brand: 'ResMed',
      type: 'Filtre',
      description: 'Filtre hypoallergénique pour machines CPAP ResMed AirSense.',
      features: [
        'Filtration hypoallergénique',
        'Compatible AirSense 10 et 11',
        'Pack de 2 filtres',
        'Protection contre les allergènes'
      ],
      category: 'accessoires',
      subCategory: 'FILTRE',
      media: [
        {
          url: '/SITE DE VENTE ET LOCATION 1/1)CPAP-PPC/3)ACECCESSOIRE CPAP/FILTRE/FILTRE RESMED/filtre resmed.jpg',
          type: 'image',
          alt: 'Filtre ResMed',
          order: 1
        }
      ]
    },
    {
      name: 'Filtre Yuwell',
      brand: 'Yuwell',
      type: 'Filtre',
      description: 'Filtre de rechange pour machines CPAP Yuwell.',
      features: [
        'Filtration efficace',
        'Compatible avec modèles Yuwell',
        'Installation facile',
        'Matériaux de qualité'
      ],
      category: 'accessoires',
      subCategory: 'FILTRE',
      media: [
        {
          url: '/SITE DE VENTE ET LOCATION 1/1)CPAP-PPC/3)ACECCESSOIRE CPAP/FILTRE/FILTRE YUWELL/filtre yuwell.jpg',
          type: 'image',
          alt: 'Filtre Yuwell',
          order: 1
        }
      ]
    },
    // Tuyaus
    {
      name: 'Tuyau Chauffant ClimateLineAir',
      brand: 'ResMed',
      type: 'Tuyau',
      description: 'Tuyau chauffant pour un confort optimal et une réduction de la condensation.',
      features: [
        'Chauffage intégré',
        'Contrôle automatique de la température',
        'Compatible avec AirSense',
        'Longueur : 2m'
      ],
      category: 'accessoires',
      subCategory: 'TUYAU-CIRCUIT',
      media: [
        {
          url: '/SITE DE VENTE ET LOCATION 1/1)CPAP-PPC/3)ACECCESSOIRE CPAP/TUYAU-CIRCUIT/TUYAU-CIRCUIT CHAUFFANT/TUYAU-CIRCUIT CHAUFFANT.png',
          type: 'image',
          alt: 'Tuyau Chauffant',
          order: 1
        }
      ]
    },
    {
      name: 'Tuyau Standard 15mm',
      brand: 'Universel',
      type: 'Tuyau',
      description: 'Tuyau standard 15mm compatible avec la plupart des machines CPAP.',
      features: [
        'Diamètre : 15mm',
        'Longueur : 1.8m',
        'Compatible toutes marques',
        'Léger et flexible'
      ],
      category: 'accessoires',
      subCategory: 'TUYAU-STANDARD',
      media: [
        {
          url: '/SITE DE VENTE ET LOCATION 1/1)CPAP-PPC/3)ACECCESSOIRE CPAP/TUYAU-CIRCUIT/TUYEAU STANDARD 15/tuyea 15mm.jpg',
          type: 'image',
          alt: 'Tuyau Standard 15mm',
          order: 1
        }
      ]
    },
    {
      name: 'Tuyau Standard 22mm',
      brand: 'Universel',
      type: 'Tuyau',
      description: 'Tuyau standard 22mm pour un débit d\'air optimal.',
      features: [
        'Diamètre : 22mm',
        'Longueur : 1.8m',
        'Débit d\'air optimisé',
        'Haute durabilité'
      ],
      category: 'accessoires',
      subCategory: 'TUYAU-STANDARD',
      media: [
        {
          url: '/SITE DE VENTE ET LOCATION 1/1)CPAP-PPC/3)ACECCESSOIRE CPAP/TUYAU-CIRCUIT/TUYEAU STANDARD 22MM/tuyeau22MM.jpg',
          type: 'image',
          alt: 'Tuyau Standard 22mm',
          order: 1
        }
      ]
    },
    // Humidifiers
    {
      name: 'Humidificateur Löwenstein Prisma',
      brand: 'Löwenstein',
      type: 'Humidificateur',
      description: 'Humidificateur chauffant pour machines CPAP Löwenstein Prisma.',
      features: [
        'Réservoir grande capacité',
        'Contrôle précis de l\'humidité',
        'Facile à nettoyer',
        'Installation simple'
      ],
      category: 'accessoires',
      subCategory: 'HUMIDIFICATEUR',
      media: [
        {
          url: '/SITE DE VENTE ET LOCATION 1/1)CPAP-PPC/3)ACECCESSOIRE CPAP/HUMIDIFICATEUR/HUMIDIFICATEUR LOWENSTEIN/humidificateur lowenstein.jpg',
          type: 'image',
          alt: 'Humidificateur Löwenstein',
          order: 1
        }
      ]
    },
    {
      name: 'Humidificateur ResMed HumidAir',
      brand: 'ResMed',
      type: 'Humidificateur',
      description: 'Humidificateur intégré pour machines CPAP ResMed AirSense.',
      features: [
        'Technologie HumidAir',
        'Réservoir lavable',
        'Ajustement automatique',
        'Design compact'
      ],
      category: 'accessoires',
      subCategory: 'HUMIDIFICATEUR',
      media: [
        {
          url: '/SITE DE VENTE ET LOCATION 1/1)CPAP-PPC/3)ACECCESSOIRE CPAP/HUMIDIFICATEUR/HUMIDIFICATEUR RESMED/humidificateur resmed.jpg',
          type: 'image',
          alt: 'Humidificateur ResMed',
          order: 1
        }
      ]
    },
    {
      name: 'Humidificateur Yuwell',
      brand: 'Yuwell',
      type: 'Humidificateur',
      description: 'Humidificateur pour machines CPAP Yuwell.',
      features: [
        'Capacité optimale',
        'Fonctionnement silencieux',
        'Nettoyage facile',
        'Design ergonomique'
      ],
      category: 'accessoires',
      subCategory: 'HUMIDIFICATEUR',
      media: [
        {
          url: '/SITE DE VENTE ET LOCATION 1/1)CPAP-PPC/3)ACECCESSOIRE CPAP/HUMIDIFICATEUR/HUMIDIFICATEUR YUWELL/humidificateur yuwell.jpg',
          type: 'image',
          alt: 'Humidificateur Yuwell',
          order: 1
        }
      ]
    },
    // Power Supplies
    {
      name: 'Alimentation Löwenstein',
      brand: 'Löwenstein',
      type: 'Alimentation',
      description: 'Bloc d\'alimentation officiel pour machines CPAP Löwenstein.',
      features: [
        'Tension stable',
        'Protection contre les surtensions',
        'Compatible tous modèles Löwenstein',
        'Longue durée de vie'
      ],
      category: 'accessoires',
      subCategory: 'ALIMENTATION',
      media: [
        {
          url: '/SITE DE VENTE ET LOCATION 1/1)CPAP-PPC/3)ACECCESSOIRE CPAP/ALIMENTATION/ALIMENTATION LOWENSTEIN/alimentation lowenstein.jpg',
          type: 'image',
          alt: 'Alimentation Löwenstein',
          order: 1
        }
      ]
    },
    {
      name: 'Alimentation ResMed',
      brand: 'ResMed',
      type: 'Alimentation',
      description: 'Adaptateur secteur original pour appareils CPAP ResMed.',
      features: [
        'Certification officielle ResMed',
        'Protection thermique',
        'Câble détachable',
        'Voyant LED'
      ],
      category: 'accessoires',
      subCategory: 'ALIMENTATION',
      media: [
        {
          url: '/SITE DE VENTE ET LOCATION 1/1)CPAP-PPC/3)ACECCESSOIRE CPAP/ALIMENTATION/ALIMENTATION RESMED/alimentation resmed.jpg',
          type: 'image',
          alt: 'Alimentation ResMed',
          order: 1
        }
      ]
    },
    {
      name: 'Alimentation Yuwell',
      brand: 'Yuwell',
      type: 'Alimentation',
      description: 'Bloc d\'alimentation pour machines CPAP Yuwell.',
      features: [
        'Tension stable',
        'Compact et léger',
        'Protection intégrée',
        'Garantie constructeur'
      ],
      category: 'accessoires',
      subCategory: 'ALIMENTATION',
      media: [
        {
          url: '/SITE DE VENTE ET LOCATION 1/1)CPAP-PPC/3)ACECCESSOIRE CPAP/ALIMENTATION/ALIMENTATION YUWELL/alimentation yuwell.jpg',
          type: 'image',
          alt: 'Alimentation Yuwell',
          order: 1
        }
      ]
    },
    // SD Cards
    {
      name: 'Carte SD Löwenstein',
      brand: 'Löwenstein',
      type: 'Carte SD',
      description: 'Carte SD haute performance pour machines CPAP Löwenstein.',
      features: [
        'Stockage sécurisé',
        'Compatible Prisma',
        'Lecture rapide',
        'Pré-formatée'
      ],
      category: 'accessoires',
      subCategory: 'CARTE SD',
      media: [
        {
          url: '/SITE DE VENTE ET LOCATION 1/1)CPAP-PPC/3)ACECCESSOIRE CPAP/CARTE SD/CARTE SD LOWENSTEIN/carte sd lowenstein.jpg',
          type: 'image',
          alt: 'Carte SD Löwenstein',
          order: 1
        }
      ]
    },
    {
      name: 'Carte SD ResMed',
      brand: 'ResMed',
      type: 'Carte SD',
      description: 'Carte SD officielle pour appareils CPAP ResMed.',
      features: [
        'Compatible AirSense',
        'Capacité optimisée',
        'Données cryptées',
        'Format propriétaire'
      ],
      category: 'accessoires',
      subCategory: 'CARTE SD',
      media: [
        {
          url: '/SITE DE VENTE ET LOCATION 1/1)CPAP-PPC/3)ACECCESSOIRE CPAP/CARTE SD/CARTE SD RESMED/carte sd resmed.jpg',
          type: 'image',
          alt: 'Carte SD ResMed',
          order: 1
        }
      ]
    },
    {
      name: 'Carte SD Yuwell',
      brand: 'Yuwell',
      type: 'Carte SD',
      description: 'Carte SD pour l\'enregistrement des données CPAP Yuwell.',
      features: [
        'Stockage fiable',
        'Format compatible',
        'Installation facile',
        'Suivi des données'
      ],
      category: 'accessoires',
      subCategory: 'CARTE SD',
      media: [
        {
          url: '/SITE DE VENTE ET LOCATION 1/1)CPAP-PPC/3)ACECCESSOIRE CPAP/CARTE SD/CARTE SD YUWELL/carte sd yuwell.jpg',
          type: 'image',
          alt: 'Carte SD Yuwell',
          order: 1
        }
      ]
    },
    // Mask Harness
    {
      name: 'Harnais de Masque Universel',
      brand: 'Universel',
      type: 'Harnais',
      description: 'Harnais de masque CPAP confortable et ajustable.',
      features: [
        'Matériau doux',
        'Ajustement universel',
        'Sangles réglables',
        'Lavable en machine'
      ],
      category: 'accessoires',
      subCategory: 'HARNAIS MASQUE',
      media: [
        {
          url: '/SITE DE VENTE ET LOCATION 1/1)CPAP-PPC/3)ACECCESSOIRE CPAP/HARNAIS MASQUE/harnais masque.jpg',
          type: 'image',
          alt: 'Harnais de Masque',
          order: 1
        }
      ]
    }
  ];

  // Add mask products
  const maskProducts = [
    // Facial Masks - Resmed
    {
      name: 'Masque Facial AirFit F30',
      brand: 'Resmed',
      type: 'Masque Facial',
      description: 'Masque facial avec connexion supérieure pour plus de liberté de mouvement',
      features: [
        'Design minimaliste',
        'Connexion au tube sur le dessus',
        'Coussin ultra-doux',
        'Harnais magnétique'
      ],
      category: 'accessoires',
      media: [
        {
          url: '/SITE DE VENTE ET LOCATION 1/2)MASQUE/1)MASQUE FACIAL/MASQUE RESMED FACIAL/masque resmed airfit f30.png',
          type: 'image',
          alt: 'Masque Facial AirFit F30i',
          order: 1
        },
        {
          url: '/SITE DE VENTE ET LOCATION 1/2)MASQUE/1)MASQUE FACIAL/MASQUE RESMED FACIAL/Fitting tips F30.mp4',
          type: 'video',
          alt: 'Masque Facial AirFit F30i',
          order: 2
        }
      ]
    },
    {
      name: 'Masque Facial AirFit F20',
      brand: 'Resmed',
      type: 'Masque Facial',
      description: 'Masque facial complet avec coussin InfinitySeal',
      features: [
        'Technologie InfinitySeal',
        'Cadre flexible',
        'Vision dégagée',
        'Clips magnétiques'
      ],
      category: 'accessoires',
      media: [
        {
          url: '/SITE DE VENTE ET LOCATION 1/2)MASQUE/1)MASQUE FACIAL/MASQUE RESMED FACIAL/masque resmed airfit f20.jpg',
          type: 'image',
          alt: 'Masque Facial AirFit F20',
          order: 1
        },
        {
          url: '/SITE DE VENTE ET LOCATION 1/2)MASQUE/1)MASQUE FACIAL/MASQUE RESMED FACIAL/AirFit F20 Full Face mask.mp4',
          type: 'video',
          alt: 'Masque Facial AirFit F20',
          order: 2
        }
      ]
    },
    // Facial Masks - Yuwell
    {
      name: 'Masque Facial Yuwell YF-01',
      brand: 'Yuwell',
      type: 'Masque Facial',
      description: 'Masque facial complet avec coussin en silicone',
      features: [
        'Silicone médicale',
        'Harnais ajustable',
        'Design ergonomique',
        'Léger et confortable'
      ],
      category: 'accessoires',
      media: [
        {
          url: '/SITE DE VENTE ET LOCATION 1/2)MASQUE/1)MASQUE FACIAL/MASQUE YUWELL FACIAL/masque yuwell YF-01.jpg',
          type: 'image',
          alt: 'Masque Facial Yuwell',
          order: 1
        }
      ]
    },
    {
      name: 'Masque Facial Yuwell YF-02',
      brand: 'Yuwell',
      type: 'Masque Facial',
      description: 'Masque facial confortable et pratique',
      features: [
        'Silicone douce',
        'Harnais ajustable',
        'Design ergonomique',
        'Léger et confortable'
      ],
      category: 'accessoires',
      media: [
        {
          url: '/SITE DE VENTE ET LOCATION 1/2)MASQUE/1)MASQUE FACIAL/MASQUE YUWELL FACIAL/masque yuwell YF-02.jpg',
          type: 'image',
          alt: 'Masque Facial Yuwell',
          order: 1
        }
      ]
    },
    // Nasal Masks - Resmed
    {
      name: 'Masque Nasal AirFit N30i',
      brand: 'Resmed',
      type: 'Masque Nasal',
      description: 'Masque nasal avec connexion supérieure pour plus de confort',
      features: [
        'Design compact',
        'Tube en position haute',
        'Coussin auto-ajustable',
        'Harnais QuickFit'
      ],
      category: 'accessoires',
      media: [
        {
          url: '/SITE DE VENTE ET LOCATION 1/2)MASQUE/2)MASQUE NASAL/MASQUE NASAL RESMED/masque resmed airfit n20.jpg',
          type: 'image',
          alt: 'Masque Nasal AirFit N30i',
          order: 1
        },
        {
          url: '/SITE DE VENTE ET LOCATION 1/2)MASQUE/2)MASQUE NASAL/MASQUE NASAL RESMED/AirFit N20 Nasal mask_ How to fit your mask.mp4',
          type: 'video',
          alt: 'Masque Nasal AirFit N30i',
          order: 2
        }
      ]
    },
    // Nasal Masks - Yuwell
    {
      name: 'Masque Nasal Yuwell YN-02',
      brand: 'Yuwell',
      type: 'Masque Nasal',
      description: 'Masque nasal légère et confortable',
      features: [
        'Design minimaliste',
        'Silicone douce',
        'Système de fixation stable',
        'Respiration naturelle'
      ],
      category: 'accessoires',
      media: [
        {
          url: '/SITE DE VENTE ET LOCATION 1/2)MASQUE/2)MASQUE NASAL/MASQUE NASAL YUWELL/masque yuwell YN-02.png',
          type: 'image',
          alt: 'Masque Nasal Yuwell YN-02',
          order: 1
        }
      ]
    },
    {
      name: 'Masque Nasal Yuwell YN-03',
      brand: 'Yuwell',
      type: 'Masque Nasal',
      description: 'Masque nasal confortable et pratique',
      features: [
        'Design ergonomique',
        'Silicone douce',
        'Harnais ajustable',
        'Respiration naturelle'
      ],
      category: 'accessoires',
      media: [
        {
          url: '/SITE DE VENTE ET LOCATION 1/2)MASQUE/2)MASQUE NASAL/MASQUE NASAL YUWELL/masque yuwell YN-03.jpg',
          type: 'image',
          alt: 'Masque Nasal Yuwell YN-03',
          order: 1
        }
      ]
    },
    // Narinaire Masks - Resmed
    {
      name: 'Masque Narinaire AirFit P10',
      brand: 'Resmed',
      type: 'Masque Narinaire',
      description: 'Masque narinaire ultra-léger et silencieux',
      features: [
        'Ultra-léger',
        'QuietAir technology',
        'Harnais ajustable',
        'Design minimaliste'
      ],
      category: 'accessoires',
      media: [
        {
          url: '/SITE DE VENTE ET LOCATION 1/2)MASQUE/3)MASQUE NARINAIRE/MASQUE NARINAIRE RESMED/masque resmed p10.jpg',
          type: 'image',
          alt: 'Masque Narinaire AirFit P10',
          order: 1
        },
        {
          url: '/SITE DE VENTE ET LOCATION 1/2)MASQUE/3)MASQUE NARINAIRE/MASQUE NARINAIRE RESMED/ResMed - Présentation du masque narinaire AirFit™ P10.mp4',
          type: 'video',
          alt: 'Masque Narinaire AirFit P10',
          order: 2
        }
      ]
    },
    // Narinaire Masks - Yuwell
    {
      name: 'Masque Narinaire Yuwell',
      brand: 'Yuwell',
      type: 'Masque Narinaire',
      description: 'Masque narinaire compact et confortable',
      features: [
        'Design ergonomique',
        'Silicone douce',
        'Léger et discret',
        'Installation facile'
      ],
      category: 'accessoires',
      media: [
        {
          url: '/SITE DE VENTE ET LOCATION 1/2)MASQUE/3)MASQUE NARINAIRE/MASQUE NARINAIRE YUWELL/masque  p10.jpg',
          type: 'image',
          alt: 'Masque Narinaire Yuwell',
          order: 1
        }
      ]
    },
    // Masque Sans Fuite - Yuwell
    {
      name: 'Masque Sans Fuite Yuwell',
      brand: 'Yuwell',
      type: 'Masque Sans Fuite',
      description: 'Masque facial sans fuite pour une therapie optimale',
      features: [
        'Système anti-fuite',
        'Joint étanche',
        'Confort optimal',
        'Compatible ventilation'
      ],
      category: 'accessoires',
      media: [
        {
          url: '/SITE DE VENTE ET LOCATION 1/2)MASQUE/4)MASQUE SANS FUITE/masque sans fuite yuwell.jpg',
          type: 'image',
          alt: 'Masque Sans Fuite Yuwell',
          order: 1
        }
      ]
    }
  ];

  // oxygen products array with all products
  const oxygenProducts = [
    {
      name: 'Concentrateur d\'oxygène Yuwell 7F-5',
      brand: 'Yuwell',
      type: 'Concentrateur',
      description: 'Concentrateur d\'oxygène fixe pour l\'oxygénothérapie à domicile',
      features: [
        'Débit jusqu\'à 5L/min',
        'Faible niveau sonore',
        'Écran LCD',
        'Alarmes intégrées'
      ],
      category: 'oxygen',
      media: [
        {
          url: '/SITE DE VENTE ET LOCATION 1/3)OXYGENE/CONCENTRATEUR D\'OXYGENE/OXYGENE YUWELL/concentrateur d\'oxygene 7F-5.png',
          type: 'image',
          alt: 'Concentrateur d\'oxygène Yuwell',
          order: 1
        }
      ]
    },
    {
      name: 'Concentrateur d\'oxygène Yuwell 8F-5',
      brand: 'Yuwell',
      type: 'Concentrateur',
      description: 'Concentrateur d\'oxygène fixe pour l\'oxygénothérapie à domicile',
      features: [
        'Débit jusqu\'à 5L/min ',
        'Faible niveau sonore',
        'Écran LCD',
        'Alarmes intégrées'
      ],
      category: 'oxygen',
      media: [
        {
          url: '/SITE DE VENTE ET LOCATION 1/3)OXYGENE/CONCENTRATEUR D\'OXYGENE/OXYGENE YUWELL/concentrateur d\'oxygene 8F-5A.jpg',
          type: 'image',
          alt: 'Concentrateur d\'oxygène Yuwell',
          order: 1
        },
        {
          url: '/SITE DE VENTE ET LOCATION 1/3)OXYGENE/CONCENTRATEUR D\'OXYGENE/OXYGENE YUWELL/8F-5A Oxygen concentrator Operation Video.mp4',
          type: 'video',
          alt: 'Concentrateur d\'oxygène Yuwell',
          order: 2
        },
        {
          url: '/SITE DE VENTE ET LOCATION 1/3)OXYGENE/CONCENTRATEUR D\'OXYGENE/OXYGENE YUWELL/CONCENTRATEUR INTRODUCTION-8F-5.mp4',
          type: 'video',
          alt: 'Concentrateur d\'oxygène Yuwell',
          order: 3
        },
      ]
    },
    {
      name: 'Concentrateur d\'oxygène Yuwell7F-10',
      brand: 'Yuwell',
      type: 'Concentrateur',
      description: 'Concentrateur d\'oxygène fixe pour l\'oxygénothérapie à domicile',
      features: [
        'Débit jusqu\'à 10L/min',
        'Faible niveau sonore',
        'Écran LCD',
        'Alarmes intégrées'
      ],
      category: 'oxygen',
      media: [
        {
          url: '/SITE DE VENTE ET LOCATION 1/3)OXYGENE/CONCENTRATEUR D\'OXYGENE/OXYGENE YUWELL/concentrateur d\'oxygene 7F-10.jpg',
          type: 'image',
          alt: 'Concentrateur d\'oxygène Yuwell',
          order: 1
        },
        {
          url: '/SITE DE VENTE ET LOCATION 1/3)OXYGENE/CONCENTRATEUR D\'OXYGENE/OXYGENE YUWELL/7F-10 Oxygen concentrator Operation Video.mp4',
          type: 'video',
          alt: 'Concentrateur d\'oxygène Yuwell',
          order: 2
        },
      ]
    },
    {
      name: 'Concentrateur d\'oxygène Yuwell 8F-10',
      brand: 'Yuwell',
      type: 'Concentrateur',
      description: 'Concentrateur d\'oxygène fixe pour l\'oxygénothérapie à domicile',
      features: [
        'Débit jusqu\'à 10L/min',
        'Faible niveau sonore',
        'Écran LCD',
        'Alarmes intégrées'
      ],
      category: 'oxygen',
      media: [
        {
          url: '/SITE DE VENTE ET LOCATION 1/3)OXYGENE/CONCENTRATEUR D\'OXYGENE/OXYGENE YUWELL/concentrateur d\'oxygene 8F-10.jpg',
          type: 'image',
          alt: 'Concentrateur d\'oxygène Yuwell',
          order: 1
        },
      ]
    },
    {
      name: 'Concentrateur d\'oxygène DeVilbiss',
      brand: 'DeVilbiss',
      type: 'Concentrateur',
      description: 'Concentrateur d\'oxygène fixe DeVilbiss pour usage médical',
      features: [
        'Technologie OSD®',
        'Maintenance réduite',
        'Systèm  de filtration avancé',
        'Design compact'
      ],
      category: 'oxygen',
      media: [
        {
          url: '/SITE DE VENTE ET LOCATION 1/3)OXYGENE/CONCENTRATEUR D\'OXYGENE/OXYGENE DEVILBISS/CONCENTRATEUR DEVILBISS 5L 525 KS.png',
          type: 'image',
          alt: 'Concentrateur d\'oxygène DeVilbiss',
          order: 1
        }
      ]
    },
    {
      name: 'Concentrateur d\'oxygène Portable Spirit 3',
      brand: 'Spirit',
      type: 'Concentrateur Portable',
      description: 'Concentrateur d\'oxygène portable compact pour une mobilité optimale',
      features: [
        'Débit jusqu\'à 3L/min',
        'Ultra-portable',
        'Batterie longue durée',
        'Silencieux'
      ],
      category: 'oxygen',
      media: [
        {
          url: '/SITE DE VENTE ET LOCATION 1/3)OXYGENE/OXYGENE PORTABLE/concentrateur d\'oxygene portable spirit 3.jpg',
          type: 'image',
          alt: 'Concentrateur d\'oxygène Portable Spirit 3',
          order: 1
        }
      ]
    },
    {
      name: 'Concentrateur d\'oxygène Portable Spirit 6',
      brand: 'Spirit',
      type: 'Concentrateur Portable',
      description: 'Concentrateur d\'oxygène portable haute capacité',
      features: [
        'Débit jusqu\'à 6L/min',
        'Idéal pour les voyages',
        'Mode economie d\'energie',
        'Interface intuitive'
      ],
      category: 'oxygen',
      media: [
        {
          url: '/SITE DE VENTE ET LOCATION 1/3)OXYGENE/OXYGENE PORTABLE/concentrateur d\'oxygene portable spirit 6.png',
          type: 'image',
          alt: 'Concentrateur d\'oxygène Portable Spirit 6',
          order: 1
        }
      ]
    }
  ];

  // Add oxygen accessories
  const oxygenAccessories = [
    {
      name: 'Barboteur pour Oxygène',
      brand: 'Medical',
      type: 'Accessoire',
      description: 'Barboteur pour humidification de l\'oxygène',
      features: [
        'Compatible avec tous les concentrateurs',
        'Facile à nettoyer',
        'Graduation visible',
        'Matériau médical'
      ],
      category: 'oxygen',
      media: [
        {
          url: '/SITE DE VENTE ET LOCATION 1/3)OXYGENE/ACCESSOIRES OXYGENE/BARBOTEUR/barboteur.jpg',
          type: 'image',
          alt: 'Barboteur pour Oxygène',
          order: 1
        }
      ]
    },
    {
      name: 'Lunettes à Oxygène',
      brand: 'Medical',
      type: 'Accessoire',
      description: 'Lunettes nasales pour l\'administration d\'oxygène',
      features: [
        'Confortable',
        'Ajustable',
        'Usage unique',
        'Tubulure souple'
      ],
      category: 'oxygen',
      media: [
        {
          url: '/SITE DE VENTE ET LOCATION 1/3)OXYGENE/ACCESSOIRES OXYGENE/LUNETTE D\'OXYGENE/lunette d\'oxygene.jpg',
          type: 'image',
          alt: 'Lunettes à Oxygène',
          order: 1
        }
      ]
    },
    {
      name: 'Masque à Haute Concentration',
      brand: 'Medical',
      type: 'Accessoire',
      description: 'Masque à oxygène haute concentration avec réservoir',
      features: [
        'Haute concentration en O2',
        'Avec réservoir',
        'Élastique ajustable',
        'Usage unique'
      ],
      category: 'oxygen',
      media: [
        {
          url: '/SITE DE VENTE ET LOCATION 1/3)OXYGENE/ACCESSOIRES OXYGENE/MASQUE A HAUTE CONCENTRATION/masque a haute concentration.jpg',
          type: 'image',
          alt: 'Masque à Haute Concentration',
          order: 1
        }
      ]
    }
  ];

  // Update BIPAP products with all models
  const bipapProducts = [
    {
      name: 'BIPAP Resmed AirCurve 10',
      brand: 'Resmed',
      type: 'Machine',
      description: 'Appareil de ventilation non invasive bi-niveau',
      features: [
        'Modes VAuto et S',
        'Technologie Easy-Breathe',
        'Humidificateur intégré',
        'Connexion sans fil'
      ],
      category: 'bipap',
      media: [
        {
          url: '/SITE DE VENTE ET LOCATION 1/4)BIPAP-VNI/VNI RESMED/vni resmed aircurve 10.jpg',
          type: 'image',
          alt: 'BIPAP Resmed AirCurve 10',
          order: 1
        }
      ]
    },
    {
      name: 'BIPAP Resmed Lumis',
      brand: 'Resmed',
      type: 'Machine',
      description: 'Appareil de VNI avancé avec modes thérapeutiques intelligents',
      features: [
        'Technologie iVAPS',
        'Trigger automatique',
        'Écran couleur tactile',
        'Suivi des données en temps réel'
      ],
      category: 'bipap',
      media: [
        {
          url: '/SITE DE VENTE ET LOCATION 1/4)BIPAP-VNI/VNI RESMED/VNI RESMED LUMIS.png',
          type: 'image',
          alt: 'BIPAP Resmed Lumis',
          order: 1
        }
      ]
    },
    {
      name: 'BIPAP Resmed S9',
      brand: 'Resmed',
      type: 'Machine',
      description: 'Solution de VNI compacte et efficace',
      features: [
        'Design compact',
        'Interface intuitive',
        'Modes thérapeutiques multiples',
        'Faible niveau sonore'
      ],
      category: 'bipap',
      media: [
        {
          url: '/SITE DE VENTE ET LOCATION 1/4)BIPAP-VNI/VNI RESMED/VNI RESMED S9.jpg',
          type: 'image',
          alt: 'BIPAP Resmed S9',
          order: 1
        }
      ]
    }
  ];

  // Update aerosol products
  const aerosolProducts = [
    {
      name: 'Nébuliseur Rossmax',
      brand: 'Rossmax',
      type: 'Nebuliseur',
      description: 'Appareil d\'aérosolthérapie professionnel',
      features: [
        'Technologie de nébulisation avancée',
        'Utilisation silencieuse',
        'Kit complet inclus',
        'Design ergonomique'
      ],
      category: 'aerosol',
      media: [
        {
          url: '/SITE DE VENTE ET LOCATION 1/5)AEROSOLTHERAPIE/APPAREIL D\'AEROSOL/ROSS MAX/AEROSOLE ROSSMAX.jpg',
          type: 'image',
          alt: 'Nébuliseur Rossmax',
          order: 1
        }
      ]
    }
  ];

  // Update aspirateur products
  const aspirateurProducts = [
    {
      name: 'Aspirateur Chirurgical Yuwell',
      brand: 'Yuwell',
      type: 'Machine',
      description: 'Aspirateur chirurgical professionnel pour usage médical',
      features: [
        'Puissance d\'aspiration élevée',
        'Réglage précis du vide',
        'Bocal autoclavable',
        'Filtre antibactérien inclus'
      ],
      category: 'aspirateur',
      media: [
        {
          url: '/SITE DE VENTE ET LOCATION 1/6)ASPERATEUR THERAPIE/APPAREIL ASPIRATEUR/ASPERATEUR YUWELL/aspirateur.png',
          type: 'image',
          alt: 'Aspirateur Chirurgical Yuwell',
          order: 1
        }
      ]
    }
  ];

  // Add new lit products
  const litProducts = [
    {
      name: 'Lit Médicalisé Électrique',
      brand: 'Medical Bed',
      type: 'Lit Médicalisé',
      description: 'Lit médicalisé électrique avec télécommande pour le confort du patient',
      features: [
        'Réglage électrique de la hauteur',
        'Position Trendelenburg',
        'Barrières de sécurité',
        'Télécommande ergonomique'
      ],
      category: 'lit',
      media: [
        {
          url: '/SITE DE VENTE ET LOCATION 1/7)LIT/LIT.jpg',
          type: 'image',
          alt: 'Lit Médicalisé Électrique',
          order: 1
        }
      ]
    }
  ];

  // Create all products
  const allProducts = [
    ...cpapProducts,
    ...accessoryProducts,
    ...oxygenProducts,
    ...oxygenAccessories,
    ...bipapProducts,
    ...aerosolProducts,
    ...aspirateurProducts,
    ...litProducts,
    ...maskProducts
  ];

  for (const product of allProducts) {
    const { media, ...productData } = product;
    const createdProduct = await prisma.product.create({
      data: {
        ...productData,
        features: JSON.stringify(productData.features),
      },
    });

    // Create media entries for the product
    for (const mediaItem of media) {
      await prisma.media.create({
        data: {
          ...mediaItem,
          productId: createdProduct.id,
        },
      });
    }
  }

  console.log('Database has been seeded. 🌱');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
