'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';

export default function PpcCpapVoyagePage() {
  const { t } = useTranslation();

  return (
    <article className="mx-auto px-4 md:px-8 py-12 bg-gradient-to-b from-blue-50 via-white to-blue-100 rounded-2xl shadow-xl text-blue-900">
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
            Appareils CPAP Tunisie
          </span>
          <span className="text-blue-400">•</span>
          <time dateTime="2022-11-02" className="italic">02 novembre 2022</time>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4 leading-tight drop-shadow-lg">
          Appareils PPC / CPAP de voyage en Tunisie : liberté et traitement combinés
        </h1>
        <p className="text-blue-800 text-lg md:text-xl max-w-2xl">
          Découvrez comment les <strong>CPAP de voyage</strong> permettent de maintenir votre <strong>traitement de l’apnée du sommeil</strong> lors de vos déplacements, que vous soyez en vacances ou en mission professionnelle.
        </p>
      </header>

      {/* Featured Image */}
      <div className="relative w-full h-72 md:h-96 mb-12 rounded-xl overflow-hidden shadow-lg border-4 border-blue-200">
        <Image
          src="/catalogue photo/Capture d'écran 2025-05-29 120308.png"
          alt="Appareil CPAP de voyage"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 1024px"
        />
      </div>

      {/* Content */}
      <div className="space-y-8 text-blue-900">
        <h2 className="mt-0 text-2xl font-bold">Pourquoi utiliser un CPAP de voyage&nbsp;?</h2>
        <p>
          Voyager avec un <strong>appareil CPAP classique</strong> peut s'avérer difficile en raison de sa taille, de son poids et de la nécessité d'accès à une alimentation électrique. C’est ici qu’interviennent les <strong>CPAP de voyage</strong>, spécialement conçus pour les déplacements.
        </p>

        <blockquote className="border-l-4 border-blue-300 pl-4 italic text-blue-800">
          <strong>Bon à savoir :</strong> La majorité des compagnies aériennes en Tunisie et à l'international acceptent les appareils CPAP en cabine, mais une <strong>lettre de votre médecin</strong> est souvent recommandée.
        </blockquote>

        <h3 className="text-xl font-semibold">Qu'est-ce qu’un CPAP de voyage&nbsp;?</h3>
        <p>
          Il s’agit d’une <strong>version compacte et légère</strong> des appareils CPAP standard, offrant une <strong>solution efficace pour le traitement de l’apnée du sommeil</strong> tout en restant facile à transporter.
        </p>

        <h3 className="text-xl font-semibold">Caractéristiques clés des CPAP de voyage</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Ultra-portables</strong> : parfaits pour le sac à dos ou le bagage cabine</li>
          <li><strong>Batterie autonome</strong> : utile pour le camping ou les vols long-courriers</li>
          <li><strong>Silencieux</strong> : idéal pour ne pas déranger les autres dans l’avion ou l’hôtel</li>
          <li><strong>Compatibles avec les masques CPAP ResMed et Philips</strong></li>
        </ul>

        <h3 className="text-xl font-semibold">Quels sont les avantages&nbsp;?</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Maintien du <strong>traitement de l’apnée du sommeil</strong> sans interruption</li>
          <li>Moins d’encombrement dans les transports</li>
          <li>Idéal pour les voyages en <strong>Tunisie</strong> ou à l'étranger</li>
          <li>Plus grande autonomie avec des batteries ou adaptateurs voiture</li>
        </ul>

        <div className="rounded-lg bg-blue-100 border-l-4 border-blue-400 p-4 my-8">
          <strong>Conseil pratique :</strong>
          <p className="mt-2 italic">
            Avant de voyager, testez votre appareil CPAP compact chez vous. Pensez aussi à vérifier la <strong>compatibilité électrique (110V-240V)</strong> et à emporter une prise universelle.
          </p>
        </div>

        <h3 className="text-xl font-semibold">Comment choisir le bon modèle&nbsp;?</h3>
        <p>Voici quelques critères à considérer avant l'achat&nbsp;:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Poids et taille</strong> : assurez-vous qu’il tient dans vos bagages</li>
          <li><strong>Autonomie de la batterie</strong> : essentielle pour les zones sans électricité</li>
          <li><strong>Compatibilité avec vos accessoires actuels</strong></li>
          <li><strong>Fiabilité de la marque</strong> : ResMed, Philips, Yuwell, etc.</li>
        </ul>

        <h3 className="text-xl font-semibold">Besoin de conseils personnalisés&nbsp;?</h3>
        <p>
          Notre équipe spécialisée en <strong>appareils CPAP Tunisie</strong> peut vous aider à choisir un modèle adapté à votre situation. Contactez-nous ou consultez nos <Link href="/produits/cpap" className="text-blue-700 underline hover:text-blue-900">CPAP de voyage disponibles</Link>.
        </p>

        <h3 className="text-xl font-semibold">Conclusion</h3>
        <p>
          Ne laissez pas votre traitement vous empêcher de voyager. Grâce aux <strong>appareils CPAP portables</strong>, vous pouvez profiter de chaque moment, tout en assurant la continuité de votre santé respiratoire.
        </p>
      </div>
    </article>
  );
}
