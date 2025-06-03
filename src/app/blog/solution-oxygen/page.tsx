import { ArrowLeft, CheckCircle, Shield, Heart } from 'lucide-react';
import Image from 'next/image';

import Link from 'next/link';

export default function SolutionsOxygenPage() {

  return (
    <article className="mx-auto px-4 md:px-8 py-12 bg-gradient-to-b from-cyan-50 via-white to-cyan-100 rounded-2xl shadow-xl">
      {/* Back Link */}
      <Link 
        href="/blog" 
        className="inline-flex items-center text-cyan-700 hover:text-cyan-900 font-semibold mb-10 transition-colors duration-200 cursor-pointer"
      >
        <ArrowLeft size={18} className="mr-2" />
        Retour aux articles
      </Link>
      
      {/* Header */}
      <header className="mb-12">
        <div className="flex flex-wrap items-center gap-3 text-sm text-cyan-700 mb-4">
          <span className="bg-cyan-200 text-cyan-900 px-4 py-1 rounded-full text-xs font-semibold tracking-wide shadow">
            SOLUTIONS OXYGÈNE
          </span>
          <span className="text-cyan-400">•</span>
          <time dateTime="2024-06-02" className="italic">2 juin 2024</time>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-cyan-900 mb-6 leading-tight drop-shadow-lg">
          Solutions Oxygène : Vivez pleinement chaque respiration
        </h1>
        
        <p className="text-xl text-cyan-700 leading-relaxed">
          Découvrez nos concentrateurs d&apos;oxygène fixes et portables pour répondre à tous les besoins en oxygénothérapie à domicile ou en mobilité. Sécurité, autonomie et confort pour une meilleure qualité de vie.
        </p>
      </header>
      
      {/* Hero Benefits Section */}
      <div className="bg-gradient-to-r from-cyan-100 to-cyan-50 rounded-2xl p-8 mb-12 shadow-lg">
        <h2 className="text-3xl font-bold text-cyan-900 mb-6 text-center">
          Pourquoi choisir nos solutions d&apos;oxygène ?
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-cyan-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="text-cyan-700" size={32} />
            </div>
            <h3 className="text-cyan-800 font-semibold text-lg mb-2">Oxygène à la demande</h3>
            <p className="text-cyan-700">Appareils adaptés à tous les profils et niveaux d&apos;activité</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-cyan-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="text-cyan-700" size={32} />
            </div>
            <h3 className="text-cyan-800 font-semibold text-lg mb-2">Confort & Autonomie</h3>
            <p className="text-cyan-700">Utilisation intuitive, silencieuse, grande autonomie pour la vie quotidienne</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-cyan-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="text-cyan-700" size={32} />
            </div>
            <h3 className="text-cyan-800 font-semibold text-lg mb-2">Sécurité & Fiabilité</h3>
            <p className="text-cyan-700">Technologie éprouvée, support technique, garantie complète</p>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="prose prose-lg max-w-none space-y-8">
        <h2 className="text-cyan-800 font-semibold">L&apos;oxygénothérapie : mobilité et liberté retrouvées</h2>
        
        <p className="text-cyan-700">
          Nos concentrateurs d&apos;oxygène permettent de traiter l&apos;insuffisance respiratoire chronique à domicile ou en déplacement. Ils assurent un apport continu ou pulsé d&apos;oxygène, favorisant l&apos;autonomie et la sécurité des patients.
        </p>
        
        <div className="bg-cyan-50 rounded-xl p-6 shadow-lg border-l-4 border-cyan-400 mb-8">
          <p className="text-cyan-800 font-semibold mb-2">À qui s&apos;adressent ces solutions ?</p>
          <ul className="text-cyan-700 list-disc pl-6">
            <li>Patients souffrant de BPCO, fibrose pulmonaire, insuffisance respiratoire chronique</li>
            <li>Personnes nécessitant une oxygénothérapie de longue durée</li>
            <li>Utilisateurs actifs souhaitant conserver leur mobilité</li>
          </ul>
        </div>
        
        {/* Product Section */}
        <h3 className="text-cyan-800 font-semibold">Nos modèles de concentrateurs d&apos;oxygène</h3>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* 8F-5 */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-cyan-200 text-center flex flex-col items-center">
            <div className="bg-cyan-100 rounded-lg p-6 mb-4 min-h-[120px] flex items-center justify-center w-full">
              <Image src="/catalogue photo/8F-5.webp" alt="Concentrateur d&apos;oxygène 8F-5" className="h-28 object-contain mx-auto" />
            </div>
            <h4 className="text-cyan-800 font-semibold mb-2">8F-5 Stationnaire</h4>
            <p className="text-cyan-600 text-sm">Concentrateur d&apos;oxygène fixe, haut débit (jusqu&apos;à 5L/min), silencieux et fiable, idéal pour la maison.</p>
            <span className="bg-cyan-500 text-white px-3 py-1 rounded-full text-xs font-bold mt-2">DOMICILE</span>
          </div>
          {/* 8F-10 */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-cyan-200 text-center flex flex-col items-center">
            <div className="bg-cyan-100 rounded-lg p-6 mb-4 min-h-[120px] flex items-center justify-center w-full">
              <Image src="/catalogue photo/8F-10.webp" alt="Concentrateur d&apos;oxygène 8F-10" className="h-28 object-contain mx-auto" />
            </div>
            <h4 className="text-cyan-800 font-semibold mb-2">8F-10 Stationnaire</h4>
            <p className="text-cyan-600 text-sm">Concentrateur d&apos;oxygène haut débit (jusqu&apos;à 10L/min), performance maximale pour besoins importants.</p>
            <span className="bg-cyan-400 text-white px-3 py-1 rounded-full text-xs font-bold mt-2">HAUT DÉBIT</span>
          </div>
          {/* Spirit 6 Portable */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-cyan-200 text-center flex flex-col items-center">
            <div className="bg-cyan-100 rounded-lg p-6 mb-4 min-h-[120px] flex items-center justify-center w-full">
              <Image src="/catalogue photo/spirit-6.webp" alt="Concentrateur d&apos;oxygène Spirit 6 portable" className="h-28 object-contain mx-auto" />
            </div>
            <h4 className="text-cyan-800 font-semibold mb-2">Spirit 6 Portable</h4>
            <p className="text-cyan-600 text-sm">Concentrateur portable léger, idéal pour les déplacements, autonomie longue durée, utilisation simple.</p>
            <span className="bg-cyan-300 text-white px-3 py-1 rounded-full text-xs font-bold mt-2">PORTABLE</span>
          </div>
        </div>
        
        <h3 className="text-cyan-800 font-semibold">Support et Services Inclus</h3>
        <div className="bg-cyan-50 rounded-xl p-6 shadow-lg mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-cyan-800 font-semibold text-lg mb-3">Installation & Formation</h4>
              <ul className="text-cyan-700 space-y-2">
                <li>• Installation à domicile par nos techniciens</li>
                <li>• Formation complète à l&apos;utilisation</li>
                <li>• Guide d&apos;utilisation personnalisé</li>
                <li>• Suivi post-installation</li>
              </ul>
            </div>
            <div>
              <h4 className="text-cyan-800 font-semibold text-lg mb-3">Maintenance & SAV</h4>
              <ul className="text-cyan-700 space-y-2">
                <li>• Maintenance préventive programmée</li>
                <li>• Support technique 24/7</li>
                <li>• Pièces de rechange garanties</li>
                <li>• Service de télésurveillance</li>
              </ul>
            </div>
          </div>
        </div>
        {/* Call to Action */}
        <div className="bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-2xl p-8 text-center text-white shadow-xl">
          <h3 className="text-2xl font-bold mb-4">Besoin d&apos;une solution sur-mesure ?</h3>
          <p className="text-cyan-100 mb-6 text-lg">
            Contactez-nous pour une étude personnalisée et bénéficiez de l&apos;oxygénothérapie adaptée à votre mode de vie.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products?category=CONCENTRATEURS+D%27OXYGENE" className="bg-white text-cyan-600 font-semibold px-8 py-3 rounded-lg hover:bg-cyan-50 transition-colors duration-200 shadow-lg">
              Consultez nos Concentrateurs d&apos;oxygène
            </Link>
            <Link href="/contact" className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-cyan-600 transition-all duration-200">
              Contactez nous
            </Link>
          </div>
          <div className="mt-6 flex justify-center items-center space-x-6 text-cyan-100">
            <div className="flex items-center">
              <CheckCircle size={20} className="mr-2" />
              <span>Service après-vente</span>
            </div>
            <div className="flex items-center">
              <Heart size={20} className="mr-2" />
              <span>Support 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}