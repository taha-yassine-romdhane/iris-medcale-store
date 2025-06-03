'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PpcCpapVoyagePage() {
  
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
            Équipement
          </span>
          <span className="text-blue-400">•</span>
          <time dateTime="2022-11-02" className="italic">02 novembre 2022</time>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4 leading-tight drop-shadow-lg">
          Les PPC / CPAP de voyage
        </h1>
        <p className="text-blue-800 text-lg md:text-xl max-w-2xl">
          Profitez de votre liberté&nbsp;: voyagez sereinement tout en maintenant votre traitement de l&apos;apnée du sommeil grâce aux appareils PPC/CPAP de voyage, compacts et performants.
        </p>
      </header>
      
      {/* Featured Image */}
      <div className="relative w-full h-72 md:h-96 mb-12 rounded-xl overflow-hidden shadow-lg border-4 border-blue-200">
        <Image
          src="/catalogue photo/Capture d'écran 2025-05-29 120308.png"
          alt="PPC / CPAP de voyage"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 1024px"
        />
      </div>
      
      {/* Content */}
      <div className="prose prose-lg max-w-none prose-blue prose-headings:text-blue-900 prose-strong:text-blue-800 prose-li:marker:text-blue-400 prose-blockquote:border-blue-200 prose-blockquote:text-blue-700 space-y-8">
        <h2 className="mt-0">Voyager avec votre appareil PPC/CPAP</h2>
        
        <p>
          Vous partez en vacances, et vous n&apos;avez pas envie d&apos;emporter votre appareil PPC/CPAP habituel qui peut être encombrant&nbsp;? 
          Les appareils PPC/CPAP de voyage sont conçus spécifiquement pour répondre à ce besoin.
        </p>

        <blockquote>
          <p>
            <strong>Bon à savoir :</strong> Les compagnies aériennes autorisent généralement le transport des PPC/CPAP de voyage en bagage cabine. Pensez à vérifier leur politique avant le départ.
          </p>
        </blockquote>
        
        <h3>Qu&apos;est-ce qu&apos;un appareil PPC/CPAP de voyage&nbsp;?</h3>
        
        <p>
          Un appareil PPC (Pression Positive Continue) ou CPAP (Continuous Positive Airway Pressure) de voyage est une version 
          compacte et légère des appareils standard utilisés pour traiter l&apos;apnée du sommeil. Ces appareils sont spécialement 
          conçus pour être facilement transportables lors de vos déplacements.
        </p>
        
        <h3>Caractéristiques principales des PPC/CPAP de voyage</h3>
        
        <ul>
          <li><strong>Taille réduite et poids léger&nbsp;:</strong> Généralement 50% plus petits et plus légers que les modèles standard</li>
          <li><strong>Batterie intégrée ou option de batterie&nbsp;:</strong> Idéal pour les voyages où l&apos;accès à l&apos;électricité peut être limité</li>
          <li><strong>Adaptabilité internationale&nbsp;:</strong> Compatibles avec différentes tensions électriques (110V-240V)</li>
          <li><strong>Options d&apos;alimentation diverses&nbsp;:</strong> Possibilité de fonctionner sur secteur, batterie ou même allume-cigare</li>
          <li><strong>Fonctionnalités similaires aux modèles standard&nbsp;:</strong> Malgré leur taille réduite, ils offrent souvent les mêmes options thérapeutiques</li>
        </ul>

        <div className="flex flex-col md:flex-row gap-8 items-center bg-blue-50 rounded-xl p-6 shadow mt-8 mb-8">
          <div className="flex-1">
            <h4 className="text-blue-800 font-bold text-lg mb-2">Témoignage patient</h4>
            <p className="text-blue-700">
              “Grâce à mon mini-CPAP de voyage, j&apos;ai pu partir en randonnée plusieurs jours sans interrompre mon traitement. Compact, silencieux, il m’a suivi partout&nbsp;!”
              <br />
              <span className="text-blue-700">— Sophie, 38 ans, Aix-en-Provence</span>
            </p>
          </div>
          <Image
            src="/catalogue photo/Capture d'écran 2025-05-29 132904.png"
            alt="CPAP de voyage en randonnée"
            width={180}
            height={120}
            className="object-cover rounded-lg shadow border-2 border-blue-200"
          />
        </div>
        
        <h3>Avantages des appareils de voyage</h3>
        
        <p>
          Les appareils PPC/CPAP de voyage présentent plusieurs avantages pour les personnes souffrant d&apos;apnée du sommeil qui voyagent fréquemment&nbsp;:
        </p>
        
        <ul>
          <li>Facilité de transport dans les bagages à main</li>
          <li>Discrétion accrue lors des déplacements</li>
          <li>Autonomie énergétique pour les voyages en camping ou dans des zones reculées</li>
          <li>Continuité du traitement même en déplacement, évitant ainsi les interruptions thérapeutiques</li>
        </ul>
        
        <h3>Comment choisir votre appareil PPC/CPAP de voyage&nbsp;?</h3>
        
        <p>
          Lors du choix d&apos;un appareil PPC/CPAP de voyage, plusieurs critères sont à prendre en compte&nbsp;:
        </p>
        
        <ul>
          <li><strong>Poids et dimensions&nbsp;:</strong> Vérifiez qu&apos;il correspond à vos besoins de mobilité</li>
          <li><strong>Autonomie de la batterie&nbsp;:</strong> Essentiel si vous prévoyez de l&apos;utiliser sans accès au secteur</li>
          <li><strong>Niveau sonore&nbsp;:</strong> Un appareil silencieux est préférable, surtout dans des environnements partagés</li>
          <li><strong>Facilité d&apos;utilisation&nbsp;:</strong> Une interface intuitive simplifie l&apos;utilisation en déplacement</li>
          <li><strong>Compatibilité avec vos accessoires actuels&nbsp;:</strong> Vérifiez si vous pouvez utiliser votre masque habituel</li>
        </ul>
        
        <div className="rounded-lg bg-blue-100 border-l-4 border-blue-400 p-4 my-8">
          <strong className="text-blue-900">Conseil pratique :</strong>
          <p className="text-blue-800 mt-2 italic">
            Testez l&apos;appareil avant de partir pour vous assurer qu&apos;il répond bien à vos besoins, et pensez à emporter une prise universelle lors de voyages à l&apos;étranger.
          </p>
        </div>
        
        <h3>Précautions à prendre en voyage</h3>
        
        <p>
          Même avec un appareil de voyage, quelques précautions sont recommandées&nbsp;:
        </p>
        
        <ul>
          <li>Emportez un adaptateur universel pour les prises électriques</li>
          <li>Prévoyez une batterie de secours pour les situations imprévues</li>
          <li>Transportez votre appareil en bagage à main lors des voyages en avion</li>
          <li>Demandez une lettre de votre médecin confirmant la nécessité médicale de l&apos;appareil</li>
          <li>Nettoyez régulièrement votre équipement, même en déplacement</li>
        </ul>
        
        <h3>En résumé</h3>
        <p>
          Ne laissez pas l&apos;apnée du sommeil perturber vos voyages. Avec un appareil PPC/CPAP de voyage adapté, 
          vous pouvez maintenir votre traitement tout en profitant pleinement de vos déplacements.
        </p>
        
        <p>
          Consultez notre sélection d&apos;appareils PPC/CPAP de voyage pour trouver celui qui conviendra parfaitement à vos besoins, ou contactez notre équipe pour un conseil personnalisé.
        </p>
      </div>
    </article>
  );
}