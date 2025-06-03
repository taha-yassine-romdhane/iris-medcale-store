import { ArrowLeft, Zap, Heart, AlertTriangle, Clock } from 'lucide-react';
import Link from 'next/link';

export default function ConcentrateurOxygenePage() {
  return (
    <article className="mx-auto px-4 md:px-8 py-12 bg-gradient-to-b from-cyan-50 via-white to-cyan-100 rounded-2xl shadow-xl">
      {/* Back Link */}
      <Link href="/blog" className="inline-flex items-center text-cyan-700 hover:text-cyan-900 font-semibold mb-10 transition-colors duration-200 cursor-pointer">
        <ArrowLeft size={18} className="mr-2" />
        Retour aux articles
      </Link>
      
      {/* Header */}
      <header className="mb-12">
        <div className="flex flex-wrap items-center gap-3 text-sm text-cyan-700 mb-4">
          <span className="bg-cyan-200 text-cyan-900 px-4 py-1 rounded-full text-xs font-semibold tracking-wide shadow">
            OXYGÉNOTHÉRAPIE
          </span>
          <span className="text-cyan-400">•</span>
          <time dateTime="2023-12-20" className="italic">20 décembre 2023</time>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-cyan-900 mb-4 leading-tight drop-shadow-lg">
          Concentrateur d'oxygène : indications et pathologies
        </h1>
      </header>
      
      {/* Featured Image */}
      <div className="relative w-full h-96 md:h-96 mb-12 flex items-center justify-center bg-gradient-to-r from-cyan-100 to-sky-100 rounded-xl">
        <div className="flex items-center justify-center space-x-8">
          <Zap size={120} className="text-cyan-600 opacity-80" />
          <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-cyan-200">
            <span className="text-cyan-700 font-bold text-xl">O₂</span>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="prose prose-lg max-w-none space-y-8">
        <h2 className="mt-0 text-cyan-800 font-semibold">Qu'est-ce qu'un concentrateur d'oxygène ?</h2>
        
        <p className="text-cyan-700">
          Un concentrateur d'oxygène est un dispositif médical qui extrait l'oxygène de l'air ambiant et le concentre 
          pour délivrer de l'oxygène médical à une concentration supérieure à 90%. Contrairement aux bouteilles d'oxygène, 
          il fonctionne électriquement et produit de l'oxygène en continu, offrant une solution pratique et économique 
          pour l'oxygénothérapie de longue durée.
        </p>
        
        <div className="bg-cyan-50 rounded-xl p-6 shadow mb-8 border-l-4 border-cyan-400">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="text-cyan-600 mt-1 flex-shrink-0" size={20} />
            <div>
              <p className="text-cyan-800 font-semibold mb-2">Principe de fonctionnement</p>
              <p className="text-cyan-700">
                Le concentrateur utilise la technologie PSA (Pressure Swing Adsorption) qui sépare l'oxygène 
                de l'azote présent dans l'air ambiant grâce à des tamis moléculaires, permettant une production 
                continue d'oxygène médical.
              </p>
            </div>
          </div>
        </div>
        
        <h3 className="text-cyan-800 font-semibold">Pathologies nécessitant un concentrateur d'oxygène</h3>
        
        <p className="text-cyan-700">
          L'oxygénothérapie par concentrateur est indiquée dans plusieurs pathologies chroniques présentant 
          une hypoxémie (diminution du taux d'oxygène dans le sang) :
        </p>
        
        <h4 className="text-cyan-800 font-semibold">BPCO (Bronchopneumopathie Chronique Obstructive)</h4>
        
        <p className="text-cyan-700">
          La BPCO est la première indication de l'oxygénothérapie de longue durée. Elle est prescrite lorsque :
        </p>
        
        <ul className="text-cyan-900">
          <li><strong className="text-cyan-800">PaO₂ ≤ 55 mmHg</strong> (7,3 kPa) en air ambiant au repos</li>
          <li><strong className="text-cyan-800">PaO₂ entre 55-60 mmHg</strong> avec signes de retentissement (polyglobulie, hypertension artérielle pulmonaire)</li>
          <li><strong className="text-cyan-800">Saturation en oxygène ≤ 88%</strong> de façon permanente</li>
        </ul>
        
        <h4 className="text-cyan-800 font-semibold">Fibrose pulmonaire idiopathique</h4>
        
        <p className="text-cyan-700">
          Cette maladie rare provoque une cicatrisation progressive du tissu pulmonaire, entraînant :
        </p>
        
        <ul className="text-cyan-900">
          <li><strong className="text-cyan-800">Dyspnée progressive</strong> d'abord à l'effort puis au repos</li>
          <li><strong className="text-cyan-800">Désaturation à l'effort</strong> puis au repos</li>
          <li><strong className="text-cyan-800">Toux sèche chronique</strong></li>
          <li><strong className="text-cyan-800">Fatigue importante</strong></li>
        </ul>
        
        <h4 className="text-cyan-800 font-semibold">Insuffisance cardiaque sévère</h4>
        
        <p className="text-cyan-700">
          L'oxygénothérapie peut être nécessaire dans l'insuffisance cardiaque avancée avec :
        </p>
        
        <ul className="text-cyan-900">
          <li><strong className="text-cyan-800">Œdème pulmonaire chronique</strong></li>
          <li><strong className="text-cyan-800">Hypoxémie de repos</strong></li>
          <li><strong className="text-cyan-800">Dyspnée au moindre effort</strong></li>
          <li><strong className="text-cyan-800">Orthopnée</strong> (difficulté à respirer en position allongée)</li>
        </ul>
        
        <div className="rounded-lg bg-cyan-100 border-l-4 border-cyan-400 p-4 my-8">
          <strong className="text-cyan-900">Témoignage :</strong>
          <p className="text-cyan-800 mt-2 italic">
            "Depuis que j'ai mon concentrateur, je peux à nouveau faire mes courses et voir mes petits-enfants 
            sans être essoufflée. C'est un vrai retour à la vie normale."
            <br />
            <span className="text-cyan-700">— Marie, 67 ans, atteinte de BPCO</span>
          </p>
        </div>
        
        <h4 className="text-cyan-800 font-semibold">Autres indications</h4>
        
        <ul className="text-cyan-900">
          <li><strong className="text-cyan-800">Mucoviscidose</strong> avec atteinte respiratoire sévère</li>
          <li><strong className="text-cyan-800">Hypertension artérielle pulmonaire</strong></li>
          <li><strong className="text-cyan-800">Déficit en alpha-1-antitrypsine</strong></li>
          <li><strong className="text-cyan-800">Pneumoconioses</strong> (silicose, asbestose)</li>
          <li><strong className="text-cyan-800">Séquelles de tuberculose pulmonaire</strong></li>
          <li><strong className="text-cyan-800">Malformations thoraciques</strong> sévères</li>
        </ul>
        
        <h3 className="text-cyan-800 font-semibold">Types de concentrateurs d'oxygène</h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-cyan-200">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mr-4">
                <Zap className="text-cyan-600" size={24} />
              </div>
              <h4 className="text-cyan-800 font-semibold text-lg">Concentrateur fixe</h4>
            </div>
            <ul className="text-cyan-700 space-y-2 text-sm">
              <li>• Débit : 1 à 10 L/min</li>
              <li>• Usage domiciliaire</li>
              <li>• Fonctionnement continu</li>
              <li>• Plus économique</li>
              <li>• Nécessite alimentation électrique</li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border border-cyan-200">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mr-4">
                <Clock className="text-cyan-600" size={24} />
              </div>
              <h4 className="text-cyan-800 font-semibold text-lg">Concentrateur portable</h4>
            </div>
            <ul className="text-cyan-700 space-y-2 text-sm">
              <li>• Débit : 1 à 6 L/min</li>
              <li>• Mobilité préservée</li>
              <li>• Batterie autonome</li>
              <li>• Débit pulsé ou continu</li>
              <li>• Maintien activités sociales</li>
            </ul>
          </div>
        </div>
        
        <h3 className="text-cyan-800 font-semibold">Prescription et modalités</h3>
        
        <div className="bg-cyan-50 rounded-xl p-6 shadow mb-8">
          <h4 className="text-cyan-800 font-bold text-lg mb-4">Critères de prescription</h4>
          <p className="text-cyan-700 mb-4">
            L'oxygénothérapie de longue durée est prescrite sur la base d'une gazométrie artérielle 
            réalisée en état stable (en dehors d'une exacerbation) et confirmée à 3 semaines d'intervalle.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <h5 className="text-cyan-800 font-semibold mb-2">Prescription obligatoire si :</h5>
              <ul className="text-cyan-700 text-sm space-y-1">
                <li>• PaO₂ ≤ 55 mmHg (7,3 kPa)</li>
                <li>• SaO₂ ≤ 88%</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h5 className="text-cyan-800 font-semibold mb-2">Prescription conditionnelle si :</h5>
              <ul className="text-cyan-700 text-sm space-y-1">
                <li>• PaO₂ 55-60 mmHg + complications</li>
                <li>• Polyglobulie (hématocrite  55%)</li>
                <li>• Hypertension artérielle pulmonaire</li>
              </ul>
            </div>
          </div>
        </div>
        
        <h4 className="text-cyan-800 font-semibold">Durée d'utilisation recommandée</h4>
        
        <ul className="text-cyan-900">
          <li><strong className="text-cyan-800">Minimum 15 heures par jour</strong> pour être efficace</li>
          <li><strong className="text-cyan-800">Idéalement 18-24 heures par jour</strong></li>
          <li><strong className="text-cyan-800">Utilisation nocturne obligatoire</strong></li>
          <li><strong className="text-cyan-800">Maintien durant les activités</strong> quotidiennes</li>
        </ul>
        
        <h3 className="text-cyan-800 font-semibold">Bénéfices de l'oxygénothérapie</h3>
        
        <div className="flex flex-col md:flex-row gap-8 items-center bg-cyan-50 rounded-xl p-6 shadow mt-8 mb-8">
          <div className="flex-1">
            <h4 className="text-cyan-800 font-bold text-lg mb-2">Amélioration prouvée</h4>
            <p className="text-cyan-700">
              L'oxygénothérapie de longue durée améliore significativement la survie et la qualité de vie 
              des patients hypoxémiques chroniques, particulièrement dans la BPCO.
            </p>
          </div>
          <div className="w-40 h-40 bg-gradient-to-br from-cyan-200 to-sky-200 rounded-full flex items-center justify-center">
            <Heart size={80} className="text-cyan-700" />
          </div>
        </div>
        
        <ul className="text-cyan-900">
          <li><strong className="text-cyan-800">Amélioration de la survie</strong> (études NOTT et MRC)</li>
          <li><strong className="text-cyan-800">Réduction de la polyglobulie</strong></li>
          <li><strong className="text-cyan-800">Amélioration des fonctions cognitives</strong></li>
          <li><strong className="text-cyan-800">Réduction de l'hypertension artérielle pulmonaire</strong></li>
          <li><strong className="text-cyan-800">Amélioration de la capacité d'exercice</strong></li>
          <li><strong className="text-cyan-800">Réduction des hospitalisations</strong></li>
          <li><strong className="text-cyan-800">Amélioration du sommeil</strong></li>
        </ul>
        
        <h3 className="text-cyan-800 font-semibold">Surveillance et suivi</h3>
        
        <p className="text-cyan-700">
          Le suivi de l'oxygénothérapie comprend :
        </p>
        
        <ul className="text-cyan-900">
          <li><strong className="text-cyan-800">Contrôle gazométrique</strong> à 1-3 mois puis tous les 6-12 mois</li>
          <li><strong className="text-cyan-800">Vérification du débit</strong> et ajustement si nécessaire</li>
          <li><strong className="text-cyan-800">Évaluation de l'observance</strong> (compteur horaire)</li>
          <li><strong className="text-cyan-800">Surveillance des effets secondaires</strong></li>
          <li><strong className="text-cyan-800">Maintenance du matériel</strong></li>
          <li><strong className="text-cyan-800">Éducation thérapeutique</strong> continue</li>
        </ul>
        
        <h4 className="text-cyan-800 font-semibold">Effets secondaires possibles</h4>
        
        <ul className="text-cyan-900">
          <li><strong className="text-cyan-800">Sécheresse nasale</strong> et irritation</li>
          <li><strong className="text-cyan-800">Épistaxis</strong> (saignements de nez)</li>
          <li><strong className="text-cyan-800">Céphalées</strong> en début de traitement</li>
          <li><strong className="text-cyan-800">Rétention de CO₂</strong> chez certains patients BPCO</li>
        </ul>
        
        <div className="bg-cyan-50 rounded-xl p-6 shadow mb-8 border-l-4 border-cyan-400">
          <h4 className="text-cyan-800 font-bold text-lg mb-4">Conseils pratiques</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h5 className="text-cyan-800 font-semibold mb-2">Utilisation :</h5>
              <ul className="text-cyan-700 text-sm space-y-1">
                <li>• Maintenir une utilisation ≥ 15h/jour</li>
                <li>• Nettoyer régulièrement les filtres</li>
                <li>• Utiliser un humidificateur si nécessaire</li>
                <li>• Changer les canules nasales régulièrement</li>
              </ul>
            </div>
            <div>
              <h5 className="text-cyan-800 font-semibold mb-2">Sécurité :</h5>
              <ul className="text-cyan-700 text-sm space-y-1">
                <li>• Interdiction absolue de fumer</li>
                <li>• Éloigner des sources de chaleur</li>
                <li>• Ventiler correctement la pièce</li>
                <li>• Prévoir une alimentation de secours</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="not-prose border-cyan-200 border p-6 rounded-xl mb-8 shadow bg-gradient-to-r from-cyan-50 to-sky-50">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="text-cyan-600 mt-1 flex-shrink-0" size={24} />
            <div>
              <p className="text-cyan-800 font-semibold mb-2">Message important :</p>
              <p className="text-cyan-700">
                L'oxygénothérapie de longue durée est un traitement vital pour de nombreuses pathologies chroniques. 
                Une utilisation régulière et conforme aux prescriptions médicales peut considérablement améliorer 
                votre qualité de vie et votre pronostic. N'hésitez pas à contacter votre équipe soignante pour 
                toute question concernant votre traitement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}