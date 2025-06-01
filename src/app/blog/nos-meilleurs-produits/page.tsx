'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';

export default function NosMeilleursProduits() {
  const { t } = useTranslation();
  
  return (
    <article className=" mx-auto px-4 md:px-8 py-12 bg-gradient-to-b from-blue-50 via-white to-blue-100 rounded-2xl shadow-xl">
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
            Apnée du sommeil
          </span>
          <span className="text-blue-400">•</span>
          <time dateTime="2022-10-05" className="italic">05 octobre 2022</time>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4 leading-tight drop-shadow-lg">
          Nos meilleures solutions
        </h1>
        <p className="text-blue-800 text-lg md:text-xl max-w-2xl">
          Découvrez les équipements de référence pour traiter l’apnée du sommeil : innovation, confort et sécurité réunis pour améliorer votre quotidien.
        </p>
      </header>
      
      {/* Featured Image */}
      <div className="relative w-full h-72 md:h-96 mb-12 rounded-xl overflow-hidden shadow-lg border-4 border-blue-200">
        <Image
          src="/catalogue photo/Capture d'écran 2025-05-29 120308.png"
          alt="Nos meilleurs produits pour l'apnée du sommeil"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 1024px"
        />
      </div>
      
      {/* Content */}
      <div className="prose prose-lg max-w-none prose-blue prose-headings:text-blue-900 prose-strong:text-blue-800 prose-li:marker:text-blue-400 prose-blockquote:border-blue-200 prose-blockquote:text-blue-700 space-y-8">
        <h2 className="mt-0">Découvrez nos solutions de pointe pour l'apnée du sommeil</h2>
        
        <p>
          Chez Elite Médicale, nous proposons une gamme complète de produits de haute qualité pour traiter efficacement 
          l'apnée du sommeil et améliorer votre qualité de vie. Voici une sélection de nos meilleures solutions, 
          choisies pour leur efficacité, leur confort et leur fiabilité.
        </p>
        
        <h3>Appareils à Pression Positive Continue (PPC/CPAP)</h3>
        
        <div className="not-prose border-blue-200 border p-6 rounded-xl mb-8 shadow">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3 relative h-64">
              <Image 
                src="/catalogue photo/Capture d'écran 2025-05-29 120214.png"
                alt="Appareil CPAP Yuwell YH-680"
                fill
                className="object-contain rounded-lg"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="md:w-2/3">
              <h4 className="text-xl font-bold text-blue-800 mb-2">Appareil CPAP Yuwell YH-680</h4>
              <p className="text-blue-700 mb-4">
                Notre appareil CPAP le plus populaire combine performance et confort. Avec son design compact et silencieux, 
                le Yuwell YH-680 offre une thérapie efficace contre l'apnée du sommeil tout en assurant une expérience 
                utilisateur optimale.
              </p>
              <ul className="list-disc list-inside text-blue-700 mb-4">
                <li>Niveau sonore ultra-faible (&lt;26 dBA)</li>
                <li>Rampe de pression ajustable pour un endormissement confortable</li>
                <li>Humidificateur intégré pour prévenir la sécheresse des voies respiratoires</li>
                <li>Détection automatique des fuites et ajustement de la pression</li>
                <li>Compact et facile à transporter</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="not-prose border-blue-200 border p-6 rounded-xl mb-8 shadow">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3 relative h-64">
              <Image 
                src="/catalogue photo/Capture d'écran 2025-05-29 121437.png"
                alt="ResMed AirSense 11 AutoSet"
                fill
                className="object-contain rounded-lg"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="md:w-2/3">
              <h4 className="text-xl font-bold text-blue-800 mb-2">Yuwell YH-830</h4>
              <p className="text-blue-700 mb-4">
                Le Yuwell YH-830 est un appareil CPAP compact et silencieux offrant un traitement efficace contre l'apnée du sommeil. 
                Avec son design moderne et ses fonctionnalités avancées, il assure un confort optimal pendant la nuit.
              </p>
              <ul className="list-disc list-inside text-blue-700 mb-4">
                <li>Conception compacte et légère pour un transport facile</li>
                <li>Niveau sonore très bas pour un sommeil paisible</li>
                <li>Écran LCD rétroéclairé pour une utilisation nocturne</li>
                <li>Humidificateur intégré pour un air confortable</li>
                <li>Fonction de démarrage/arrêt automatique</li>
              </ul>
            </div>
          </div>
        </div>
        
        <h3>Appareils PPC/CPAP de voyage</h3>
        
        <div className="not-prose border-blue-200 border p-6 rounded-xl mb-8 shadow">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3 relative h-64">
              <Image 
                src="/catalogue photo/Capture d'écran 2025-05-29 132904.png"
                alt="Spirit 3 CPAP mobile"
                fill
                className="object-contain rounded-lg"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="md:w-2/3">
              <h4 className="text-xl font-bold text-blue-800 mb-2">Spirit 6 - La solution CPAP mobile</h4>
              <p className="text-blue-700 mb-4">
                Le Spirit 6 redéfinit le traitement mobile de l'apnée du sommeil. Conçu pour les voyageurs actifs, 
                ce CPAP ultra-léger offre des performances professionnelles dans un format compact et facile à transporter.
              </p>
              <ul className="list-disc list-inside text-blue-700 mb-4">
                <li>Poids plume de seulement 450g avec son alimentation</li>
                <li>Batterie intégrée longue durée (jusqu'à 2 nuits d'autonomie)</li>
                <li>Technologie d'auto-ajustement pour une thérapie optimale en déplacement</li>
                <li>Niveau sonore extrêmement bas (moins de 26 dB)</li>
                <li>Écran LCD rétroéclairé pour une utilisation nocturne facile</li>
              </ul>
            </div>
          </div>
        </div>
        
        <h3>Masques pour PPC/CPAP</h3>
        
        <div className="not-prose border-blue-200 border p-6 rounded-xl mb-8 shadow">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3 relative h-64">
              <Image 
                src="/catalogue photo/maska-YN-03.jpg"
                alt="Masque nasal YN-03"
                fill
                className="object-contain rounded-lg"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="md:w-2/3">
              <h4 className="text-xl font-bold text-blue-800 mb-2">Masque Nasal YN-03</h4>
              <p className="text-blue-700 mb-4">
                Le masque nasal YN-03 allie confort et performance avec son design ergonomique et ses matériaux de haute qualité. 
                Sa conception innovante assure une étanchéité optimale tout en préservant le confort pendant toute la nuit.
              </p>
              <ul className="list-disc list-inside text-blue-700 mb-4">
                <li>Étanchéité supérieure grâce à son joint en gel silicone médical</li>
                <li>Conception légère et discrète pour un confort nocturne optimal</li>
                <li>Rembourrage frontale réglable pour une adaptation personnalisée</li>
                <li>Compatible avec la plupart des appareils CPAP du marché</li>
                <li>Entretien facile et rapide grâce à son design démontable</li>
              </ul>
            </div>
          </div>
        </div>
        
        <h3>Pourquoi choisir nos produits&nbsp;?</h3>
        
        <ul>
          <li><strong>Qualité médicale certifiée</strong> – Tous nos produits répondent aux normes médicales les plus strictes</li>
          <li><strong>Conseil personnalisé</strong> – Notre équipe d'experts vous aide à choisir la solution adaptée à vos besoins</li>
          <li><strong>Service après-vente</strong> – Assistance technique et suivi de votre équipement</li>
          <li><strong>Garantie étendue</strong> – Tranquillité d'esprit avec nos garanties sur tous les appareils</li>
          <li><strong>Prix compétitifs</strong> – Le meilleur rapport qualité-prix pour des équipements médicaux de pointe</li>
        </ul>
        
        <blockquote>
          <p>
            <strong>Conseil :</strong> Consultez toujours un professionnel de santé pour choisir la solution la mieux adaptée à votre situation d’apnée du sommeil.
          </p>
        </blockquote>
        
        <p>
          Pour plus d'informations sur nos produits ou pour obtenir des conseils personnalisés, 
          n'hésitez pas à contacter notre équipe ou à visiter notre catalogue complet.
        </p>
        
        <div className="not-prose mt-8">
          <Link 
            href="/products" 
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-8 shadow"
          >
            Découvrir notre catalogue complet
          </Link>
        </div>
      </div>
    </article>
  );
}