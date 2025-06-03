import { ArrowLeft, CheckCircle, Shield, Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function SolutionsCpapPage() {
  return (
    <article className="mx-auto px-4 md:px-8 py-12 bg-gradient-to-b from-blue-50 via-white to-blue-100 rounded-2xl shadow-xl">
      {/* Back Link */}
      <Link
        href="/blog"
        className="inline-flex items-center text-blue-700 hover:text-blue-900 font-semibold mb-10 transition-colors duration-200 cursor-pointer"
      >
        <ArrowLeft size={18} className="mr-2" />
        Retour aux articles
      </Link>

      {/* Header */}
      <header className="mb-12">
        <div className="flex flex-wrap items-center gap-3 text-sm text-blue-700 mb-4">
          <span className="bg-blue-200 text-blue-900 px-4 py-1 rounded-full text-xs font-semibold tracking-wide shadow">
            SOLUTIONS CPAP
          </span>
          <span className="text-blue-400">•</span>
          <time dateTime="2024-06-02" className="italic">2 juin 2024</time>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-6 leading-tight drop-shadow-lg">
          Solutions CPAP : Dormez mieux, respirez librement
        </h1>

        <p className="text-xl text-blue-700 leading-relaxed">
          Découvrez nos solutions CPAP (Pression Positive Continue) de dernière génération pour le traitement de l&apos;apnée du sommeil et des troubles respiratoires nocturnes. Améliorez votre sommeil, votre énergie et votre bien-être au quotidien.
        </p>
      </header>

      {/* Hero Benefits Section */}
      <div className="bg-gradient-to-r from-blue-100 to-blue-50 rounded-2xl p-8 mb-12 shadow-lg">
        <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">
          Pourquoi choisir la CPAP ?
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="text-blue-700" size={32} />
            </div>
            <h3 className="text-blue-800 font-semibold text-lg mb-2">Traitement de référence</h3>
            <p className="text-blue-700">Efficacité prouvée pour réduire les apnées et améliorer la qualité du sommeil</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="text-blue-700" size={32} />
            </div>
            <h3 className="text-blue-800 font-semibold text-lg mb-2">Confort & Silencieux</h3>
            <p className="text-blue-700">Technologies avancées pour un confort optimal et une utilisation discrète</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="text-blue-700" size={32} />
            </div>
            <h3 className="text-blue-800 font-semibold text-lg mb-2">Sécurité & Fiabilité</h3>
            <p className="text-blue-700">Appareils robustes, support technique dédié, garantie complète</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="prose prose-lg max-w-none space-y-8">
        <h2 className="text-blue-800 font-semibold">La CPAP : La solution de référence contre l&apos;apnée du sommeil</h2>

        <p className="text-blue-700">
          La Pression Positive Continue (CPAP) est le traitement de première intention pour l&apos;apnée obstructive du sommeil modérée à sévère. Elle permet de maintenir les voies respiratoires ouvertes toute la nuit, supprimant les pauses respiratoires et leurs conséquences (fatigue, somnolence, risques cardiovasculaires...).
        </p>

        <div className="bg-blue-50 rounded-xl p-6 shadow-lg border-l-4 border-blue-400 mb-8">
          <p className="text-blue-800 font-semibold mb-2">À qui s&apos;adresse la CPAP ?</p>
          <ul className="text-blue-700 list-disc pl-6">
            <li>Patients souffrant d&apos;apnée du sommeil diagnostiquée (SAOS)</li>
            <li>Ronfleurs avec somnolence diurne</li>
            <li>Personnes à risque cardiovasculaire élevé</li>
            <li>Patients ayant échoué aux autres traitements (orthèses, hygiène de vie...)</li>
          </ul>
        </div>

        {/* Product Section */}
        <h3 className="text-blue-800 font-semibold">Nos modèles CPAP Yuwell</h3>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* YH-680 */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-200 text-center flex flex-col items-center">
            <div className="bg-white rounded-lg mb-4 min-h-[220px] flex flex-col justify-between items-center w-full">
              <Image src="/catalogue photo/cpap yuwell YH-680.jpg" alt="CPAP Yuwell YH-680" className="h-56 object-contain mx-auto" />
            </div>
            <h4 className="text-blue-800 font-semibold mb-2">Yuwell YH-680</h4>
            <p className="text-blue-600 text-sm">CPAP automatique haut de gamme avec écran tactile, connectivité avancée, humidificateur intégré.</p>
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold mt-2">NOUVEAUTÉ</span>
          </div>
          {/* YH-550 */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-200 text-center flex flex-col items-center">
            <div className="bg-white rounded-lg p-6 mb-4 min-h-[160px] flex items-center justify-center w-full">
              <Image src="/catalogue photo/yh-550.webp" alt="CPAP Yuwell YH-550" className="h-40 object-contain mx-auto" />
            </div>
            <h4 className="text-blue-800 font-semibold mb-2">Yuwell YH-550</h4>
            <p className="text-blue-600 text-sm">CPAP silencieuse, compacte et performante, idéale pour un usage quotidien à domicile.</p>
            <span className="bg-blue-400 text-white px-3 py-1 rounded-full text-xs font-bold mt-2">BESTSELLER</span>
          </div>
          {/* YH-350 */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-200 text-center flex flex-col items-center">
            <div className="bg-white rounded-lg mb-4 min-h-[220px] flex flex-col justify-between items-center w-full">
              <Image src="/catalogue photo/yh-350.webp" alt="CPAP Yuwell YH-350" className="h-56 object-contain mx-auto" />
            </div>
            <h4 className="text-blue-800 font-semibold mb-2">Yuwell YH-350</h4>
            <p className="text-blue-600 text-sm">Modèle économique et fiable, parfait pour débuter ou en solution de voyage.</p>
            <span className="bg-blue-300 text-white px-3 py-1 rounded-full text-xs font-bold mt-2">VOYAGE</span>
          </div>
        </div>

        <h3 className="text-blue-800 font-semibold">Support et Services Inclus</h3>
        <div className="bg-blue-50 rounded-xl p-6 shadow-lg mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-blue-800 font-semibold text-lg mb-3">Installation & Formation</h4>
              <ul className="text-blue-700 space-y-2">
                <li>• Installation à domicile par nos techniciens</li>
                <li>• Formation complète à l&apos;utilisation</li>
                <li>• Guide d&apos;utilisation personnalisé</li>
                <li>• Suivi post-installation</li>
              </ul>
            </div>
            <div>
              <h4 className="text-blue-800 font-semibold text-lg mb-3">Maintenance & SAV</h4>
              <ul className="text-blue-700 space-y-2">
                <li>• Maintenance préventive programmée</li>
                <li>• Support technique 24/7</li>
                <li>• Pièces de rechange garanties</li>
                <li>• Service de télésurveillance</li>
              </ul>
            </div>
          </div>
        </div>
        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl p-8 text-center text-white shadow-xl">
          <h3 className="text-2xl font-bold mb-4">Prêt à retrouver un sommeil réparateur ?</h3>
          <p className="text-blue-100 mb-6 text-lg">
            Contactez-nous pour une consultation personnalisée et découvrez la solution CPAP la mieux adaptée à vos besoins.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-200 shadow-lg">
              Contactez  nous
            </Link>
            <Link href="/products?category=CPAP%2FPPC&subCategory=APPAREILS" className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-200">
              Consultez nos produits CPAP
            </Link>
          </div>
          <div className="mt-6 flex justify-center items-center space-x-6 text-blue-100">
            <div className="flex items-center">
              <CheckCircle size={20} className="mr-2" />
              <span>Service à domicile</span>
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