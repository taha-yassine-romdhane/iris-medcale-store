import { ArrowLeft, Heart, AlertTriangle, Activity } from 'lucide-react';
import Link from 'next/link';

export default function BpcoSohVniPage() {
  return (
    <article className="mx-auto px-4 md:px-8 py-12 bg-gradient-to-b from-green-50 via-white to-green-100 rounded-2xl shadow-xl">
      {/* Back Link */}
      <Link href="/blog" className="inline-flex items-center text-green-700 hover:text-green-900 font-semibold mb-10 transition-colors duration-200 cursor-pointer">
        <ArrowLeft size={18} className="mr-2" />
        Retour aux articles
      </Link>
      
      {/* Header */}
      <header className="mb-12">
        <div className="flex flex-wrap items-center gap-3 text-sm text-green-700 mb-4">
          <span className="bg-green-200 text-green-900 px-4 py-1 rounded-full text-xs font-semibold tracking-wide shadow">
            Ventilation non Invasive
          </span>
          <span className="text-green-400">•</span>
          <time dateTime="2023-11-15" className="italic">15 novembre 2023</time>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 mb-4 leading-tight drop-shadow-lg">
          Quand la VNI devient nécessaire ?
        </h1>
      </header>
      
      {/* Featured Image */}
      <div className="relative w-full h-96 md:h-96 mb-12 flex items-center justify-center bg-gradient-to-r from-green-100 to-blue-100 rounded-xl">
        <div className="flex items-center justify-center space-x-8">
          <Activity size={120} className="text-green-600 opacity-80" />
          <Heart size={100} className="text-blue-600 opacity-80" />
        </div>
      </div>
      
      {/* Content */}
      <div className="prose prose-lg max-w-none space-y-8">
        <h2 className="mt-0 text-green-800 font-semibold">Qu&apos;est-ce que la BPCO et le SOH ?</h2>
        
        <p className="text-green-700">
          La Bronchopneumopathie Chronique Obstructive (BPCO) et le Syndrome d&apos;Obésité-Hypoventilation (SOH) 
          sont deux pathologies respiratoires chroniques graves qui peuvent nécessiter une prise en charge par 
          Ventilation Non Invasive (VNI), distincte du traitement par CPAP utilisé pour l&apos;apnée du sommeil.
        </p>
        
        <div className="bg-green-50 rounded-xl p-6 shadow mb-8 border-l-4 border-green-400">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="text-green-600 mt-1 flex-shrink-0" size={20} />
            <div>
              <p className="text-green-800 font-semibold mb-2">Important à retenir</p>
              <p className="text-green-700">
                Contrairement à l&apos;apnée du sommeil qui nécessite une pression positive continue (CPAP), 
                la BPCO et le SOH requièrent souvent une ventilation à deux niveaux de pression (VNI/BiPAP) 
                pour assister activement la respiration et améliorer l&apos;échange gazeux.
              </p>
            </div>
          </div>
        </div>
        
        <h3 className="text-green-800 font-semibold">La BPCO (Bronchopneumopathie Chronique Obstructive)</h3>
        
        <p className="text-green-700">
          La BPCO est une maladie respiratoire chronique caractérisée par une obstruction progressive et peu réversible 
          des voies aériennes. Elle englobe principalement la bronchite chronique et l&apos;emphysème pulmonaire.
        </p>
        
        <h4 className="text-green-800 font-semibold">Symptômes de la BPCO</h4>
        
        <ul className="text-green-900">
          <li><strong className="text-green-800">Dyspnée progressive</strong> : Essoufflement à l&apos;effort puis au repos</li>
          <li><strong className="text-green-800">Toux chronique</strong> : Souvent productive, persistante depuis plus de 3 mois</li>
          <li><strong className="text-green-800">Expectoration</strong> : Crachats blancs, jaunes ou verdâtres</li>
          <li><strong className="text-green-800">Sifflements respiratoires</strong></li>
          <li><strong className="text-green-800">Fatigue chronique</strong></li>
          <li><strong className="text-green-800">Infections respiratoires fréquentes</strong></li>
          <li><strong className="text-green-800">Perte de poids</strong> dans les stades avancés</li>
        </ul>
        
        <h4 className="text-green-800 font-semibold">Causes principales de la BPCO</h4>
        
        <ul className="text-green-900">
          <li><strong className="text-green-800">Tabagisme</strong> : Responsable de 80 à 90% des cas</li>
          <li><strong className="text-green-800">Exposition professionnelle</strong> : Poussières, vapeurs chimiques</li>
          <li><strong className="text-green-800">Pollution atmosphérique</strong></li>
          <li><strong className="text-green-800">Facteurs génétiques</strong> : Déficit en alpha-1-antitrypsine</li>
          <li><strong className="text-green-800">Infections respiratoires répétées</strong> dans l&apos;enfance</li>
        </ul>
        
        <h3 className="text-green-800 font-semibold">Le SOH (Syndrome d&apos;Obésité-Hypoventilation)</h3>
        
        <p className="text-green-700">
          Le SOH, également appelé syndrome de Pickwick, associe une obésité morbide (IMC ≥ 30 kg/m²) 
          à une hypoventilation alvéolaire chronique diurne, caractérisée par une hypercapnie (PaCO2 ≥ 45 mmHg) 
          en l&apos;absence d&apos;autre cause d&apos;hypoventilation.
        </p>
        
        <h4 className="text-green-800 font-semibold">Symptômes du SOH</h4>
        
        <ul className="text-green-900">
          <li><strong className="text-green-800">Somnolence diurne excessive</strong></li>
          <li><strong className="text-green-800">Dyspnée d&apos;effort</strong> marquée</li>
          <li><strong className="text-green-800">Céphalées matinales</strong></li>
          <li><strong className="text-green-800">Cyanose</strong> (coloration bleutée des lèvres et extrémités)</li>
          <li><strong className="text-green-800">Œdèmes des membres inférieurs</strong></li>
          <li><strong className="text-green-800">Troubles de concentration</strong></li>
          <li><strong className="text-green-800">Ronflements intenses</strong></li>
        </ul>
        
        <div className="rounded-lg bg-green-100 border-l-4 border-green-400 p-4 my-8">
          <strong className="text-green-900">Témoignage :</strong>
          <p className="text-green-800 mt-2 italic">
          &quot;Avec mon obésité, je n&apos;arrivais plus à respirer normalement, même au repos. La VNI m&apos;a redonné 
            une qualité de vie et m&apos;a permis de mieux dormir.&quot;
            <br />
            <span className="text-green-700">— Sophie, 58 ans, Lyon</span>
          </p>
        </div>
        
        <h3 className="text-green-800 font-semibold">Pourquoi la VNI plutôt que la CPAP ?</h3>
        
        <div className="bg-blue-50 rounded-xl p-6 shadow mb-8">
          <h4 className="text-blue-800 font-bold text-lg mb-4">Différences fondamentales</h4>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h5 className="text-blue-800 font-semibold mb-2">CPAP (Apnée du sommeil)</h5>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• Pression unique constante</li>
                <li>• Maintient les voies aériennes ouvertes</li>
                <li>• Traite l&apos;obstruction mécanique</li>
                <li>• Utilisation nocturne principalement</li>
              </ul>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h5 className="text-green-800 font-semibold mb-2">VNI/BiPAP (BPCO/SOH)</h5>
              <ul className="text-green-700 text-sm space-y-1">
                <li>• Deux pressions (inspiration/expiration)</li>
                <li>• Assiste activement la ventilation</li>
                <li>• Améliore l&apos;échange gazeux</li>
                <li>• Peut être utilisée 24h/24</li>
              </ul>
            </div>
          </div>
        </div>
        
        <p className="text-green-700">
          Dans la BPCO et le SOH, le problème n&apos;est pas seulement obstructif mais aussi restrictif et ventilatoire. 
          La VNI fournit une assistance respiratoire en délivrant deux niveaux de pression : une pression inspiratoire 
          plus élevée (IPAP) qui aide à faire entrer l&apos;air, et une pression expiratoire plus basse (EPAP) qui maintient 
          les voies aériennes ouvertes et facilite l&apos;expiration.
        </p>
        
        <h3 className="text-green-800 font-semibold">Diagnostic et indications de la VNI</h3>
        
        <h4 className="text-green-800 font-semibold">Pour la BPCO</h4>
        <ul className="text-green-900">
          <li><strong className="text-green-800">Spirométrie</strong> : VEMS/CV  70% et VEMS  50% prédit</li>
          <li><strong className="text-green-800">Gazométrie artérielle</strong> : Hypercapnie diurne (PaCO2  45 mmHg)</li>
          <li><strong className="text-green-800">Hospitalisation répétée</strong> pour exacerbation</li>
          <li><strong className="text-green-800">Insuffisance respiratoire chronique</strong></li>
        </ul>
        
        <h4 className="text-green-800 font-semibold">Pour le SOH</h4>
        <ul className="text-green-900">
          <li><strong className="text-green-800">IMC ≥ 30 kg/m²</strong></li>
          <li><strong className="text-green-800">Hypercapnie diurne</strong> (PaCO2 ≥ 45 mmHg)</li>
          <li><strong className="text-green-800">Exclusion d&apos;autres causes</strong> d&apos;hypoventilation</li>
          <li><strong className="text-green-800">Souvent associé à un SAOS</strong></li>
        </ul>
        
        <h3 className="text-green-800 font-semibold">Traitement par VNI</h3>
        
        <p className="text-green-700">
          La Ventilation Non Invasive (VNI) est devenue le traitement de référence pour ces pathologies 
          en cas d&apos;insuffisance respiratoire chronique avec hypercapnie.
        </p>
        
        <h4 className="text-green-800 font-semibold">Avantages de la VNI</h4>
        
        <ul className="text-green-900">
          <li><strong className="text-green-800">Amélioration des échanges gazeux</strong> : Réduction du CO2, amélioration de l&apos;oxygénation</li>
          <li><strong className="text-green-800">Repos des muscles respiratoires</strong> : Soulage la fatigue diaphragmatique</li>
          <li><strong className="text-green-800">Amélioration de la qualité de vie</strong> : Moins de dyspnée, meilleur sommeil</li>
          <li><strong className="text-green-800">Réduction des hospitalisations</strong></li>
          <li><strong className="text-green-800">Amélioration de la survie</strong> dans certains cas</li>
        </ul>
        
        <div className="flex flex-col md:flex-row gap-8 items-center bg-green-50 rounded-xl p-6 shadow mt-8 mb-8">
          <div className="flex-1">
            <h4 className="text-green-800 font-bold text-lg mb-2">Mise en place de la VNI</h4>
            <p className="text-green-700">
              L&apos;initiation de la VNI nécessite une titration progressive et un accompagnement personnalisé 
              pour optimiser les paramètres et assurer une bonne tolérance du traitement.
            </p>
          </div>
          <div className="w-40 h-40 bg-gradient-to-br from-green-200 to-blue-200 rounded-full flex items-center justify-center">
            <Activity size={80} className="text-green-700" />
          </div>
        </div>
        
        <h3 className="text-green-800 font-semibold mt-12">Autres indications de la VNI</h3>

        <div className="space-y-8">
          {/* 3. Maladies neuromusculaires */}
          <section>
            <h4 className="text-green-800 font-semibold mb-2">3. Maladies neuromusculaires</h4>
            <p className="text-green-700 mb-1">Exemples : SLA (sclérose latérale amyotrophique), dystrophies musculaires, myopathies.</p>
            <p className="text-green-700">Les muscles respiratoires sont faibles &rarr; la VNI est utilisée pour assister la ventilation, surtout la nuit.</p>
          </section>

          {/* 4. Déformations thoraciques restrictives */}
          <section>
            <h4 className="text-green-800 font-semibold mb-2">4. Déformations thoraciques restrictives</h4>
            <p className="text-green-700 mb-1">Exemples : cyphoscoliose sévère, syndrome de la cage thoracique.</p>
            <p className="text-green-700">La déformation empêche une respiration normale &rarr; la VNI aide à ventiler correctement.</p>
          </section>

          {/* 5. Hypercapnie chronique idiopathique */}
          <section>
            <h4 className="text-green-800 font-semibold mb-2">5. Hypercapnie chronique idiopathique</h4>
            <p className="text-green-700">Certains patients accumulent du CO₂ sans cause précise évidente. La VNI aide à corriger cette situation et à éviter la fatigue respiratoire.</p>
          </section>

          {/* 6. Œdème aigu du poumon cardiogénique (OAP) */}
          <section>
            <h4 className="text-green-800 font-semibold mb-2">6. Œdème aigu du poumon cardiogénique (OAP)</h4>
            <p className="text-green-700 mb-1">Cas aigu en urgence : la VNI est utilisée à l&apos;hôpital pour améliorer l’oxygénation rapidement.</p>
            <p className="text-green-700">Elle réduit la charge cardiaque et améliore le confort respiratoire.</p>
          </section>

          {/* 7. Prévention post-extubation ou post-opératoire */}
          <section>
            <h4 className="text-green-800 font-semibold mb-2">7. Prévention post-extubation ou post-opératoire</h4>
            <p className="text-green-700">Chez les patients à risque de récidive de détresse respiratoire (BPCO, obésité, chirurgie thoracique ou abdominale…), la VNI peut prévenir la réapparition des difficultés respiratoires après une extubation ou une intervention.</p>
          </section>
        </div>

        <h4 className="text-green-800 font-semibold">Traitements complémentaires</h4>
        
        <ul className="text-green-900">
          <li><strong className="text-green-800">Oxygénothérapie de longue durée</strong> si hypoxémie sévère</li>
          <li><strong className="text-green-800">Bronchodilatateurs</strong> pour la BPCO</li>
          <li><strong className="text-green-800">Corticostéroïdes inhalés</strong> selon les indications</li>
          <li><strong className="text-green-800">Perte de poids</strong> cruciale dans le SOH</li>
          <li><strong className="text-green-800">Réhabilitation respiratoire</strong></li>
          <li><strong className="text-green-800">Vaccination antigrippale et antipneumococcique</strong></li>
        </ul>
        
        <h3 className="text-green-800 font-semibold">Suivi et surveillance</h3>
        
        <p className="text-green-700">
          Le suivi régulier est essentiel pour :
        </p>
        
        <ul className="text-green-900">
          <li>Contrôler l&apos;efficacité de la VNI (gazométrie de contrôle)</li>
          <li>Ajuster les paramètres ventilatoires</li>
          <li>Évaluer l&apos;observance du traitement</li>
          <li>Surveiller l&apos;évolution des symptômes</li>
          <li>Prévenir et traiter les exacerbations</li>
          <li>Maintenir l&apos;équipement en bon état</li>
        </ul>
        
        <div className="bg-green-50 rounded-xl p-6 shadow mb-8 border-l-4 border-green-400">
          <h4 className="text-green-800 font-bold text-lg mb-4">Complications possibles sans traitement</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h5 className="text-green-800 font-semibold mb-2">BPCO non traitée :</h5>
              <ul className="text-green-700 text-sm space-y-1">
                <li>• Insuffisance respiratoire aiguë</li>
                <li>• Cœur pulmonaire chronique</li>
                <li>• Exacerbations fréquentes</li>
                <li>• Décès prématuré</li>
              </ul>
            </div>
            <div>
              <h5 className="text-green-800 font-semibold mb-2">SOH non traité :</h5>
              <ul className="text-green-700 text-sm space-y-1">
                <li>• Hypertension artérielle pulmonaire</li>
                <li>• Insuffisance cardiaque droite</li>
                <li>• Polyglobulie</li>
                <li>• Risque de décès brutal</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="not-prose border-green-200 border p-6 rounded-xl mb-8 shadow bg-gradient-to-r from-green-50 to-blue-50">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="text-green-600 mt-1 flex-shrink-0" size={24} />
            <div>
              <p className="text-green-800 font-semibold mb-2">Conseil important :</p>
              <p className="text-green-700">
                Si vous souffrez de BPCO ou de SOH, un suivi pneumologique régulier est indispensable. 
                La VNI peut considérablement améliorer votre qualité de vie et votre pronostic, 
                mais nécessite un accompagnement médical spécialisé pour une mise en place optimale.
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}