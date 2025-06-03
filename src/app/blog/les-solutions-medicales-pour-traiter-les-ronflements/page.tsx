'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';

export default function SolutionsRonflementsPage() {
  const { t } = useTranslation();

  return (
    <article className="mx-auto px-4 md:px-8 py-12 bg-gradient-to-b from-blue-50 via-white to-blue-100 rounded-2xl shadow-xl">
      {/* Back Link */}
      <Link
        href="/blog"
        className="inline-flex items-center text-blue-700 hover:text-blue-900 font-semibold mb-10 transition-colors duration-200"
      >
        <ArrowLeft size={18} className="mr-2" />
        Retour aux articles
      </Link>

      {/* Header */}
      <header className="mb-12">
        <div className="flex flex-wrap items-center gap-3 text-sm text-blue-700 mb-4">
          <span className="bg-blue-200 text-blue-900 px-4 py-1 rounded-full text-xs font-semibold tracking-wide shadow">
            CPAP & Apnée du Sommeil
          </span>
          <span className="text-blue-400">•</span>
          <time dateTime="2025-02-21" className="italic">21 février 2025</time> 
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4 leading-tight drop-shadow-lg">
          CPAP Tunisie : Solutions Complètes pour l'Apnée du Sommeil et les Ronflements
        </h1>
        <p className="text-blue-800 text-lg md:text-xl max-w-3xl">
          Découvrez nos équipements CPAP, BiPAP et concentrateurs d'oxygène en Tunisie. Solutions professionnelles pour traiter l'apnée du sommeil avec vente, location et service technique expert.
        </p>
      </header>

      {/* Featured Image */}
      <div className="relative w-full h-72 md:h-96 mb-12 rounded-xl overflow-hidden shadow-lg border-4 border-blue-200">
        <Image
          src="/catalogue photo/ApneesDuSommeil-scaled.jpg"
          alt="CPAP Tunisie - Appareils pour apnée du sommeil Elite Medical Services"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 1024px"
        />
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-none prose-blue prose-headings:text-blue-900 prose-strong:text-blue-800 prose-li:marker:text-blue-400 prose-blockquote:border-blue-200 prose-blockquote:text-blue-700 space-y-8">
        
        <h2 className="mt-0 text-blue-700 font-semibold">Comprendre l'Apnée du Sommeil en Tunisie</h2>

        <p className='text-blue-800'>
          L'apnée du sommeil affecte des milliers de Tunisiens chaque année, perturbant la qualité du sommeil et impactant 
          la santé cardiovasculaire. Chez Elite Medical Services, nous proposons des solutions CPAP complètes adaptées 
          aux besoins spécifiques de nos patients tunisiens.
        </p>

        <blockquote>
          <p className='text-blue-800'>
            <strong>Statistiques Tunisie :</strong> Plus de 15% des adultes tunisiens souffrent de troubles respiratoires 
            du sommeil, avec une prévalence croissante liée au mode de vie moderne.
          </p>
        </blockquote>

        <h3 className='text-blue-700 font-semibold'>Types d'Apnée du Sommeil et Solutions CPAP</h3>

        <h4 className='text-blue-700 font-semibold'>1. Apnée Obstructive du Sommeil (SAOS) - Solution CPAP</h4>

        <p className='text-blue-800'>
          L'apnée obstructive représente 90% des cas d'apnée du sommeil en Tunisie. Elle se caractérise par des 
          obstructions répétées des voies respiratoires supérieures pendant le sommeil.
        </p>

        <p className='text-blue-800'><strong>Symptômes principaux :</strong></p>
        <ul className='text-blue-800'>
          <li>Ronflement intense et régulier</li>
          <li>Pauses respiratoires observées par le conjoint</li>
          <li>Somnolence diurne excessive</li>
          <li>Maux de tête matinaux fréquents</li>
          <li>Fatigue chronique et irritabilité</li>
        </ul>

        <p className='text-blue-800'><strong>Solution recommandée :</strong> Traitement CPAP (Continuous Positive Airway Pressure) avec nos appareils ResMed et Yuwell disponibles chez Elite Medical Services.</p>

        <h4 className='text-blue-700 font-semibold'>2. Apnée Centrale du Sommeil - Solution BiPAP</h4>

        <p className='text-blue-800'>
          L'apnée centrale nécessite souvent des appareils BiPAP plus sophistiqués, disponibles en vente et location 
          dans notre centre médical tunisien.
        </p>

        <p className='text-blue-800'><strong>Caractéristiques :</strong></p>
        <ul className='text-blue-800'>
          <li>Interruptions respiratoires sans obstruction physique</li>
          <li>Problème de signalisation neurologique</li>
          <li>Réveils fréquents sans ronflement</li>
          <li>Difficultés de concentration diurne</li>
        </ul>

        <div className="flex flex-col md:flex-row gap-8 items-center bg-blue-50 rounded-xl p-6 shadow mt-8 mb-8">
          <div className="flex-1">
            <h4 className="text-blue-800 font-bold text-lg mb-2">Témoignage Client - Tunis</h4>
            <p className="text-blue-700">
              "Grâce à Elite Medical Services, j'ai trouvé l'appareil CPAP parfait. Le service technique est excellent 
              et la livraison en Tunisie très rapide. Ma qualité de sommeil s'est considérablement améliorée."
              <br />
              <span className="text-blue-600 font-medium">— Ahmed M., 52 ans, La Marsa</span>
            </p>
          </div>
          <Image
            src="/catalogue photo/troubleres.png"
            alt="Diagnostic apnée du sommeil Tunisie"
            width={180}
            height={120}
            className="object-cover rounded-lg shadow border-2 border-blue-200"
          />
        </div>

        <h2 className='text-blue-700 font-semibold'>Nos Solutions CPAP Professionnelles en Tunisie</h2>

        <p className='text-blue-800'>
          Elite Medical Services propose la gamme complète d'équipements respiratoires pour le traitement de l'apnée 
          du sommeil en Tunisie, avec service technique expert et garantie constructeur.
        </p>

        <h3 className='text-blue-700 font-semibold'>1. Appareils CPAP Auto - Vente et Location Tunisie</h3>

        <p className='text-blue-800'>
          Nos appareils CPAP Auto (Auto-PPC) ajustent automatiquement la pression selon vos besoins respiratoires 
          tout au long de la nuit. Disponibles des marques ResMed et Yuwell.
        </p>

        <p className='text-blue-800'><strong>Avantages de nos CPAP Auto :</strong></p>
        <ul className='text-blue-800'>
          <li>Ajustement automatique de la pression thérapeutique</li>
          <li>Confort optimal pendant le sommeil</li>
          <li>Données de compliance téléchargeables</li>
          <li>Technologie silencieuse de dernière génération</li>
          <li>Service après-vente en Tunisie</li>
        </ul>

        <h3 className='text-blue-700 font-semibold'>2. Appareils BiPAP - Ventilation Non Invasive (VNI)</h3>

        <p className='text-blue-800'>
          Nos appareils BiPAP délivrent deux niveaux de pression distincts (inspiration/expiration), 
          particulièrement adaptés aux cas complexes d'apnée du sommeil et aux patients BPCO.
        </p>

        <p className='text-blue-800'><strong>Applications cliniques :</strong></p>
        <ul className='text-blue-800'>
          <li>Apnée du sommeil sévère résistante au CPAP</li>
          <li>Insuffisance respiratoire chronique</li>
          <li>Maladies neuromusculaires</li>
          <li>Support ventilatoire domiciliaire</li>
        </ul>

        <h3 className='text-blue-700 font-semibold'>3. Masques CPAP et Accessoires - Large Choix Tunisie</h3>

        <p className='text-blue-800'>
          Le confort du masque CPAP est crucial pour l'observance thérapeutique. Nous proposons tous types de 
          masques : nasaux, bucco-nasaux, et coussins nasaux des meilleures marques.
        </p>

        <p className='text-blue-800'><strong>Types de masques disponibles :</strong></p>
        <ul className='text-blue-800'>
          <li><strong>Masques nasaux</strong> : Pour respiration nasale exclusive</li>
          <li><strong>Masques complets</strong> : Couvrent nez et bouche</li>
          <li><strong>Coussins nasaux</strong> : Discrets et légers</li>
          <li><strong>Masques pédiatriques</strong> : Spécialement conçus pour enfants</li>
        </ul>

        <h3 className='text-blue-700 font-semibold'>4. Concentrateurs d'Oxygène - Vente et Location</h3>

        <p className='text-blue-800'>
          Complément thérapeutique souvent nécessaire, nos concentrateurs d'oxygène Yuwell (5L et 10L) 
          assurent une oxygénothérapie domiciliaire fiable en Tunisie.
        </p>

        <p className='text-blue-800'><strong>Gamme concentrateurs disponibles :</strong></p>
        <ul className='text-blue-800'>
          <li>Concentrateur 5L fixe et portable</li>
          <li>Concentrateur 10L haute performance</li>
          <li>Accessoires : tubulure, lunettes nasales, humidificateurs</li>
          <li>Service technique et maintenance inclus</li>
        </ul>

        <div className="rounded-lg bg-blue-100 border-l-4 border-blue-400 p-6 my-8">
          <h4 className="text-blue-900 font-bold mb-2">Service Elite Medical Services</h4>
          <ul className="text-blue-800 space-y-1">
            <li>✓ Livraison rapide dans toute la Tunisie</li>
            <li>✓ Installation et formation à domicile</li>
            <li>✓ Service technique expert certifié</li>
            <li>✓ Suivi thérapeutique personnalisé</li>
            <li>✓ Garantie constructeur et SAV local</li>
          </ul>
        </div>

        <h2 className='text-blue-700 font-semibold'>Diagnostic et Prise en Charge Médicale</h2>

        <h3 className='text-blue-700 font-semibold'>Polygraphie du Sommeil en Tunisie</h3>

        <p className='text-blue-800'>
          Le diagnostic précis de l'apnée du sommeil nécessite une polygraphie ventilatoire ou une polysomnographie 
          complète. Ces examens déterminent le type et la sévérité des troubles respiratoires nocturnes.
        </p>

        <p className='text-blue-800'><strong>Paramètres évalués :</strong></p>
        <ul className='text-blue-800'>
          <li>Index d'Apnée-Hypopnée (IAH)</li>
          <li>Saturations en oxygène nocturnes</li>
          <li>Architecture du sommeil</li>
          <li>Position et ronflements</li>
          <li>Rythme cardiaque et respiratoire</li>
        </ul>

        <h3 className='text-blue-700 font-semibold'>Prescription et Titration CPAP</h3>

        <p className='text-blue-800'>
          Suite au diagnostic, la prescription médicale détermine les paramètres thérapeutiques optimaux. 
          Nos techniciens Elite Medical Services assurent le réglage précis de votre appareil CPAP selon 
          l'ordonnance médicale.
        </p>

        <h2 className='text-blue-700 font-semibold'>Prix CPAP Tunisie - Options Vente et Location</h2>

        <p className='text-blue-800'>
          Elite Medical Services propose des solutions financières flexibles pour l'acquisition d'équipements 
          CPAP en Tunisie, adaptées aux budgets individuels et aux remboursements d'assurance.
        </p>

        <p className='text-blue-800'><strong>Options disponibles :</strong></p>
        <ul className='text-blue-800'>
          <li><strong>Vente directe</strong> : Appareils CPAP neufs avec garantie complète</li>
          <li><strong>Location longue durée</strong> : Solution économique avec maintenance incluse</li>
          <li><strong>Location courte durée</strong> : Pour tests thérapeutiques ou voyages</li>
          <li><strong>Reprise ancien matériel</strong> : Échange et mise à niveau possible</li>
        </ul>

        <h3 className='text-blue-700 font-semibold'>Suivi Thérapeutique et Compliance</h3>

        <p className='text-blue-800'>
          L'efficacité du traitement CPAP dépend de l'observance thérapeutique. Nos équipes assurent un 
          suivi régulier de vos données de compliance et ajustent les paramètres si nécessaire.
        </p>

        <p className='text-blue-800'><strong>Services de suivi inclus :</strong></p>
        <ul className='text-blue-800'>
          <li>Analyse mensuelle des données de l'appareil</li>
          <li>Contrôles téléphoniques réguliers</li>
          <li>Ajustements paramétriques à distance</li>
          <li>Remplacement préventif des consommables</li>
          <li>Formation continue à l'utilisation</li>
        </ul>

        <h2 className='text-blue-700 font-semibold'>Mesures Complémentaires et Hygiène de Vie</h2>

        <p className='text-blue-800'>
          Le traitement CPAP s'accompagne souvent de modifications du mode de vie pour optimiser 
          l'efficacité thérapeutique et améliorer la qualité du sommeil.
        </p>

        <p className='text-blue-800'><strong>Recommandations d'hygiène de vie :</strong></p>
        <ul className='text-blue-800'>
          <li><strong>Contrôle du poids</strong> : Réduction de 10% du poids corporel améliore significativement l'IAH</li>
          <li><strong>Position de sommeil</strong> : Éviter le décubitus dorsal strict</li>
          <li><strong>Hygiène respiratoire</strong> : Traitement des rhinites et obstructions nasales</li>
          <li><strong>Évitement des sédatifs</strong> : Alcool et somnifères aggravent l'apnée</li>
          <li><strong>Activité physique régulière</strong> : Améliore la qualité du sommeil</li>
        </ul>

        <h3 className='text-blue-700 font-semibold'>Maintenance et Entretien des Équipements</h3>

        <p className='text-blue-800'>
          La longévité et l'efficacité de votre matériel CPAP dépendent d'un entretien régulier. 
          Elite Medical Services fournit tous les consommables et assure la maintenance préventive.
        </p>

        <p className='text-blue-800'><strong>Programme de maintenance :</strong></p>
        <ul className='text-blue-800'>
          <li>Remplacement des filtres (mensuel)</li>
          <li>Nettoyage et désinfection des circuits</li>
          <li>Contrôle des masques et harnais</li>
          <li>Vérification des performances techniques</li>
          <li>Mise à jour logicielle des appareils</li>
        </ul>

        <div className="rounded-lg bg-blue-50 border-l-4 border-blue-400 p-6 my-8">
          <h4 className="text-blue-800 font-bold mb-2">Contactez Elite Medical Services</h4>
          <p className="text-blue-700">
            Pour un devis personnalisé CPAP en Tunisie ou une consultation technique, 
            contactez nos experts. Livraison rapide et service après-vente garanti dans toute la Tunisie.
          </p>
        </div>

        <h3 className='text-blue-700 font-semibold'>Conclusion</h3>

        <p className='text-blue-800'>
          L'apnée du sommeil nécessite une prise en charge médicale sérieuse et des équipements fiables. 
          Elite Medical Services vous accompagne dans toutes les étapes de votre traitement CPAP en Tunisie, 
          de la prescription initiale au suivi thérapeutique à long terme.
        </p>

        <p className='text-blue-800'>
          Nos solutions complètes (CPAP, BiPAP, concentrateurs d'oxygène) et notre expertise technique 
          garantissent l'efficacité de votre traitement et l'amélioration durable de votre qualité de vie. 
          Faites confiance au leader des équipements médicaux respiratoires en Tunisie.
        </p>
      </div>
    </article>
  );
}