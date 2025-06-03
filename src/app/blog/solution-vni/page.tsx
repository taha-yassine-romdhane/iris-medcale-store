import { ArrowLeft, CheckCircle, Star, Shield, Zap, Heart, Award } from 'lucide-react';
import Image from 'next/image';

import Link from 'next/link';

export default function SolutionsVniPage() {

  
  return (
    <article className="mx-auto px-4 md:px-8 py-12 bg-gradient-to-b from-emerald-50 via-white to-emerald-100 rounded-2xl shadow-xl">
      {/* Back Link */}
      <Link 
        href="/blog" 
        className="inline-flex items-center text-emerald-700 hover:text-emerald-900 font-semibold mb-10 transition-colors duration-200 cursor-pointer"
      >
        <ArrowLeft size={18} className="mr-2" />
        Retour aux articles
      </Link>
      
      {/* Header */}
      <header className="mb-12">
        <div className="flex flex-wrap items-center gap-3 text-sm text-emerald-700 mb-4">
          <span className="bg-emerald-200 text-emerald-900 px-4 py-1 rounded-full text-xs font-semibold tracking-wide shadow">
            SOLUTIONS VNI
          </span>
          <span className="text-emerald-400">•</span>
          <time dateTime="2024-01-10" className="italic">10 janvier 2024</time>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-900 mb-6 leading-tight drop-shadow-lg">
          Solutions VNI : Retrouvez une respiration normale
        </h1>
        
        <p className="text-xl text-emerald-700 leading-relaxed">
          Découvrez nos solutions de Ventilation Non Invasive (VNI) de dernière génération, 
          conçues pour améliorer votre qualité de vie et votre bien-être respiratoire.
        </p>
      </header>
      
      {/* Hero Benefits Section */}
      <div className="bg-gradient-to-r from-emerald-100 to-teal-100 rounded-2xl p-8 mb-12 shadow-lg">
        <h2 className="text-3xl font-bold text-emerald-900 mb-6 text-center">
          Pourquoi choisir la VNI ?
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="text-emerald-700" size={32} />
            </div>
            <h3 className="text-emerald-800 font-semibold text-lg mb-2">Efficacité Prouvée</h3>
            <p className="text-emerald-700">Amélioration significative de la qualité du sommeil et de la respiration</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="text-emerald-700" size={32} />
            </div>
            <h3 className="text-emerald-800 font-semibold text-lg mb-2">Confort Optimal</h3>
            <p className="text-emerald-700">Technologies avancées pour un traitement confortable et silencieux</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="text-emerald-700" size={32} />
            </div>
            <h3 className="text-emerald-800 font-semibold text-lg mb-2">Fiabilité</h3>
            <p className="text-emerald-700">Équipements robustes avec support technique professionnel</p>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="prose prose-lg max-w-none space-y-8">
        <h2 className="text-emerald-800 font-semibold">La VNI : Une Solution Transformative</h2>
        
        <p className="text-emerald-700">
          La Ventilation Non Invasive (VNI) représente une révolution dans le traitement des troubles respiratoires chroniques. 
          Contrairement aux méthodes invasives, la VNI offre une assistance respiratoire efficace tout en préservant 
          votre confort et votre autonomie au quotidien.
        </p>
        
        <div className="bg-emerald-50 rounded-xl p-6 shadow-lg border-l-4 border-emerald-400 mb-8">
          <h3 className="text-emerald-800 font-bold text-xl mb-4">Comment la VNI transforme votre vie</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-emerald-700 font-semibold mb-2">Avant la VNI :</h4>
              <ul className="text-emerald-600 text-sm space-y-1">
                <li>• Fatigue chronique et essoufflement</li>
                <li>• Sommeil fragmenté et non réparateur</li>
                <li>• Limitation des activités quotidiennes</li>
                <li>• Hospitalisations fréquentes</li>
              </ul>
            </div>
            <div>
              <h4 className="text-emerald-700 font-semibold mb-2">Avec la VNI :</h4>
              <ul className="text-emerald-600 text-sm space-y-1">
                <li>• Énergie retrouvée et respiration facilitée</li>
                <li>• Sommeil profond et réparateur</li>
                <li>• Retour aux activités normales</li>
                <li>• Réduction des complications</li>
              </ul>
            </div>
          </div>
        </div>
        
        <h3 className="text-emerald-800 font-semibold">Notre Solution Phare : YH-830</h3>
        
        {/* Product Showcase Section */}
        <div className="bg-emerald-50 rounded-2xl shadow-xl p-8 border border-emerald-200 mb-8">
          <div className=" grid md:grid-cols-2 gap-8 items-center">
            <div >
              <div className="flex items-center mb-4 ">
                <Award className="text-emerald-600 mr-3" size={28} />
                <h4 className="text-2xl font-bold text-emerald-900">YH-830</h4>
                <span className="ml-3 bg-emerald-200 text-emerald-800 px-3 py-1 rounded-full text-sm font-semibold">
                  RECOMMANDÉ
                </span>
              </div>
              
              <p className="text-emerald-700 text-lg mb-4">
                Le YH-830 représente l&apos;excellence en matière de ventilation non invasive. 
                Conçu avec les dernières innovations technologiques, il offre un traitement 
                personnalisé et efficace pour tous types de pathologies respiratoires.
              </p>
              
              <div className="flex items-center space-x-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="text-yellow-500 fill-current" size={20} />
                ))}
                <span className="text-emerald-700 font-semibold ml-2">5/5 - Satisfaction client</span>
              </div>
              
              <a 
                href="https://elitemedicaleservices.tn/product/yh-830" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 shadow-lg"
              >
                Découvrir le YH-830
                <ArrowLeft className="ml-2 rotate-180" size={18} />
              </a>
            </div>
            
            {/* Product Image */}
            <div className="p-8 flex items-center justify-center ">
              <Image
                src="/catalogue photo/yh-830.webp"
                alt="Ventilateur YH-830 - Image produit médical pour VNI"
                className="max-h-72 w-auto rounded-lg shadow-md object-contain"
                width={400}
                height={300}
                loading="lazy"
              />
            </div>
          </div>
        </div>
        
        {/* Technical Specifications */}
        <div className="bg-emerald-50 rounded-xl p-6 shadow-lg mb-8">
          <h4 className="text-emerald-800 font-bold text-xl mb-4">Caractéristiques Techniques du YH-830</h4>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h5 className="text-emerald-700 font-semibold mb-3">Performances</h5>
              <ul className="text-emerald-600 space-y-2 text-sm">
                <li>• <strong>Modes de ventilation :</strong> CPAP, S, S/T, T, AVAPS</li>
                <li>• <strong>Pression IPAP :</strong> 4-30 cmH₂O</li>
                <li>• <strong>Pression EPAP :</strong> 4-25 cmH₂O</li>
                <li>• <strong>Fréquence respiratoire :</strong> 5-40 bpm</li>
                <li>• <strong>Volume courant :</strong> 100-2000 mL</li>
              </ul>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h5 className="text-emerald-700 font-semibold mb-3">Confort & Technologie</h5>
              <ul className="text-emerald-600 space-y-2 text-sm">
                <li>• <strong>Écran :</strong> LCD couleur haute résolution</li>
                <li>• <strong>Humidificateur :</strong> Intégré avec contrôle automatique</li>
                <li>• <strong>Niveau sonore :</strong> &lt; 30 dB (ultra-silencieux)</li>
                <li>• <strong>Connectivité :</strong> WiFi, Bluetooth, carte SD</li>
                <li>• <strong>Autonomie :</strong> Batterie intégrée optionnelle</li>
              </ul>
            </div>
          </div>
        </div>
        
        <h3 className="text-emerald-800 font-semibold">Avantages Uniques de Nos Solutions VNI</h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-emerald-200">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                <Zap className="text-emerald-600" size={24} />
              </div>
              <h4 className="text-emerald-800 font-semibold text-lg">Technologie Avancée</h4>
            </div>
            <ul className="text-emerald-700 space-y-2 text-sm">
              <li>• Algorithmes intelligents d&apos;adaptation automatique</li>
              <li>• Détection avancée des apnées et hypopnées</li>
              <li>• Compensation automatique des fuites</li>
              <li>• Rampe de pression progressive</li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border border-emerald-200">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                <Heart className="text-emerald-600" size={24} />
              </div>
              <h4 className="text-emerald-800 font-semibold text-lg">Confort Patient</h4>
            </div>
            <ul className="text-emerald-700 space-y-2 text-sm">
              <li>• Masques ergonomiques avec ajustement parfait</li>
              <li>• Fonction de réchauffement et humidification</li>
              <li>• Interface intuitive et navigation simple</li>
              <li>• Fonctionnement ultra-silencieux</li>
            </ul>
          </div>
        </div>
        
        {/* Patient Testimonials */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 shadow-lg mb-8">
          <h4 className="text-emerald-800 font-bold text-xl mb-6 text-center">Témoignages de Nos Patients</h4>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="text-yellow-500 fill-current" size={16} />
                ))}
              </div>
              <p className="text-emerald-700 italic mb-3">
                Le YH-830 a littéralement changé ma vie. Je dors enfin paisiblement et j&apos;ai retrouvé 
                mon énergie d&apos;avant. L&apos;équipe d&apos;Elite Médicale Services a été exceptionnelle.
              </p>
              <p className="text-emerald-600 font-semibold">— Ahmed, 58 ans, Tunis</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="text-yellow-500 fill-current" size={16} />
                ))}
              </div>
              <p className="text-emerald-700 italic mb-3">
                Grâce à ma VNI, je peux enfin voyager et profiter de mes petits-enfants. 
                La technologie est remarquable et le service après-vente impeccable.
              </p>
              <p className="text-emerald-600 font-semibold">— Fatma, 62 ans, Sfax</p>
            </div>
          </div>
        </div>
        <h3 className="text-emerald-800 font-semibold">Support et Services Inclus</h3>
        
        <div className="bg-emerald-50 rounded-xl p-6 shadow-lg mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-emerald-800 font-semibold text-lg mb-3">Installation & Formation</h4>
              <ul className="text-emerald-700 space-y-2">
                <li>• Installation à domicile par nos techniciens</li>
                <li>• Formation complète à l&apos;utilisation</li>
                <li>• Guide d&apos;utilisation personnalisé</li>
                <li>• Suivi post-installation</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-emerald-800 font-semibold text-lg mb-3">Maintenance & SAV</h4>
              <ul className="text-emerald-700 space-y-2">
                <li>• Maintenance préventive programmée</li>
                <li>• Support technique 24/7</li>
                <li>• Pièces de rechange garanties</li>
                <li>• Service de télésurveillance</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-center text-white shadow-xl">
          <h3 className="text-2xl font-bold mb-4">Prêt à Transformer Votre Qualité de Vie ?</h3>
          <p className="text-emerald-100 mb-6 text-lg">
            Contactez-nous dès aujourd&apos;hui pour une consultation personnalisée et découvrez 
            la solution VNI qui vous convient le mieux.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-emerald-600 font-semibold px-8 py-3 rounded-lg hover:bg-emerald-50 transition-colors duration-200 shadow-lg">
              Contactez-nous
            </Link>
            <Link href="/products?category=APPAREILS+BIPAP%2FVNI&type=APPAREIL" className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-emerald-600 transition-all duration-200">
              Voire nos produits VNI
            </Link>
          </div>
          
          <div className="mt-6 flex justify-center items-center space-x-6 text-emerald-100">
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