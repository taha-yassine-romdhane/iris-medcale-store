'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';

export default function TroubleRespiratoirePage() {
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
            Santé respiratoire
          </span>
          <span className="text-blue-400">•</span>
          <time dateTime="2025-02-14" className="italic">14 février 2025</time>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4 leading-tight drop-shadow-lg">
          Qu'est-ce qu'un trouble respiratoire ?
        </h1>
        <p className="text-blue-800 text-lg md:text-xl max-w-2xl">
          Comprendre les causes, symptômes et traitements des troubles respiratoires pour mieux gérer votre santé.
        </p>
      </header>
      
      {/* Featured Image */}
      <div className="relative w-full h-72 md:h-96 mb-12 rounded-xl overflow-hidden shadow-lg border-4 border-blue-200">
        <Image
          src="/catalogue photo/polygraphie-domicile_banniere.webp"
          alt="Personne souffrant de troubles respiratoires"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 1024px"
        />
      </div>
      
      {/* Content */}
      <div className="prose prose-lg max-w-none prose-blue prose-headings:text-blue-900 prose-strong:text-blue-800 prose-li:marker:text-blue-400 prose-blockquote:border-blue-200 prose-blockquote:text-blue-700 space-y-8">
        <h2 className="mt-0">Comprendre les troubles respiratoires</h2>
        
        <p>
          Un trouble respiratoire est une condition médicale qui affecte la respiration normale, souvent entraînant des difficultés 
          à respirer et d'autres complications de santé. Ces troubles peuvent varier en gravité, allant de légers et temporaires 
          à chroniques et potentiellement mortels.
        </p>
        
        <p>
          La respiration est un processus vital qui permet à l'organisme d'absorber l'oxygène nécessaire à son fonctionnement 
          et d'éliminer le dioxyde de carbone. Toute perturbation de ce processus peut avoir des conséquences importantes 
          sur la santé et la qualité de vie.
        </p>
        
        <h3>Les principaux types de troubles respiratoires</h3>
        
        <h4>1. Troubles obstructifs</h4>
        
        <p>
          Ces troubles sont caractérisés par une obstruction ou un rétrécissement des voies respiratoires, 
          rendant l'expiration difficile. Les principaux troubles obstructifs comprennent :
        </p>
        
        <ul>
          <li>
            <strong>Asthme</strong> : Inflammation chronique des voies respiratoires qui provoque des épisodes récurrents 
            de respiration sifflante, d'essoufflement, d'oppression thoracique et de toux.
          </li>
          <li>
            <strong>Bronchopneumopathie chronique obstructive (BPCO)</strong> : Groupe de maladies pulmonaires qui bloquent 
            le flux d'air et rendent la respiration difficile, principalement causées par le tabagisme.
          </li>
          <li>
            <strong>Syndrome d'apnées obstructives du sommeil (SAOS)</strong> : Trouble caractérisé par des pauses respiratoires 
            répétées pendant le sommeil dues à l'obstruction des voies aériennes supérieures.
          </li>
          <li>
            <strong>Bronchiolite</strong> : Inflammation des petites voies respiratoires (bronchioles), souvent observée chez les nourrissons.
          </li>
        </ul>
        
        <h4>2. Troubles restrictifs</h4>
        
        <p>
          Ces troubles limitent l'expansion des poumons, rendant l'inspiration difficile. Ils peuvent être causés par :
        </p>
        
        <ul>
          <li>
            <strong>Fibrose pulmonaire</strong> : Formation de tissu cicatriciel dans les poumons qui réduit leur élasticité.
          </li>
          <li>
            <strong>Pneumoconioses</strong> : Maladies pulmonaires causées par l'inhalation de poussières, comme la silicose ou l'asbestose.
          </li>
          <li>
            <strong>Scoliose sévère</strong> : Déformation de la colonne vertébrale qui peut comprimer les poumons.
          </li>
          <li>
            <strong>Obésité morbide</strong> : L'excès de poids peut limiter l'expansion de la cage thoracique.
          </li>
        </ul>
        
        <h4>3. Troubles du contrôle de la ventilation</h4>
        
        <p>
          Ces troubles affectent la régulation de la respiration par le système nerveux central :
        </p>
        
        <ul>
          <li>
            <strong>Apnée centrale du sommeil</strong> : Interruptions de la respiration pendant le sommeil dues à un défaut 
            de signalisation du cerveau vers les muscles respiratoires.
          </li>
          <li>
            <strong>Syndrome d'hypoventilation centrale</strong> : Défaut congénital du contrôle automatique de la respiration.
          </li>
        </ul>
        
        <h4>4. Troubles vasculaires pulmonaires</h4>
        
        <p>
          Ces troubles affectent les vaisseaux sanguins des poumons :
        </p>
        
        <ul>
          <li>
            <strong>Embolie pulmonaire</strong> : Obstruction d'une artère pulmonaire par un caillot sanguin.
          </li>
          <li>
            <strong>Hypertension pulmonaire</strong> : Pression artérielle élevée dans les vaisseaux pulmonaires.
          </li>
        </ul>
        
        <h4>5. Infections respiratoires</h4>
        
        <ul>
          <li>
            <strong>Pneumonie</strong> : Infection des poumons causée par des bactéries, des virus ou des champignons.
          </li>
          <li>
            <strong>Tuberculose</strong> : Infection bactérienne qui affecte principalement les poumons.
          </li>
          <li>
            <strong>Bronchite</strong> : Inflammation des bronches, souvent due à une infection.
          </li>
        </ul>
        
        <h3>Symptômes courants des troubles respiratoires</h3>
        
        <p>
          Bien que les symptômes varient selon le type de trouble respiratoire, certains signes communs incluent :
        </p>
        
        <ul>
          <li>Essoufflement (dyspnée)</li>
          <li>Respiration sifflante</li>
          <li>Toux persistante</li>
          <li>Production excessive de mucus</li>
          <li>Douleur ou inconfort thoracique</li>
          <li>Fatigue et faiblesse</li>
          <li>Cyanose (coloration bleuâtre de la peau due au manque d'oxygène)</li>
          <li>Troubles du sommeil</li>
        </ul>
        
        <h3>Facteurs de risque</h3>
        
        <p>
          Plusieurs facteurs peuvent augmenter le risque de développer des troubles respiratoires :
        </p>
        
        <ul>
          <li>
            <strong>Tabagisme</strong> : Principal facteur de risque pour de nombreuses maladies respiratoires, y compris la BPCO et le cancer du poumon.
          </li>
          <li>
            <strong>Pollution de l'air</strong> : L'exposition à la pollution atmosphérique, aux produits chimiques ou aux poussières industrielles.
          </li>
          <li>
            <strong>Allergènes</strong> : Exposition à des allergènes comme le pollen, les acariens ou les moisissures.
          </li>
          <li>
            <strong>Génétique</strong> : Certains troubles respiratoires ont une composante génétique.
          </li>
          <li>
            <strong>Infections respiratoires récurrentes</strong> : Particulièrement pendant l'enfance.
          </li>
          <li>
            <strong>Obésité</strong> : Augmente le risque de plusieurs troubles respiratoires, dont l'apnée du sommeil.
          </li>
        </ul>
        
        <h3>Diagnostic des troubles respiratoires</h3>
        
        <p>
          Le diagnostic des troubles respiratoires peut impliquer plusieurs examens :
        </p>
        
        <ul>
          <li>
            <strong>Examen physique</strong> : Écoute des bruits respiratoires, observation des signes de détresse respiratoire.
          </li>
          <li>
            <strong>Tests de fonction pulmonaire</strong> : Spirométrie, mesure des volumes pulmonaires, capacité de diffusion.
          </li>
          <li>
            <strong>Imagerie</strong> : Radiographie thoracique, scanner thoracique, IRM.
          </li>
          <li>
            <strong>Tests de sommeil</strong> : Polysomnographie pour diagnostiquer les troubles respiratoires liés au sommeil.
          </li>
          <li>
            <strong>Analyses de sang</strong> : Mesure des gaz sanguins artériels, recherche de marqueurs d'inflammation.
          </li>
          <li>
            <strong>Tests d'allergie</strong> : Pour identifier les déclencheurs potentiels.
          </li>
        </ul>
        
        <h3>Traitements des troubles respiratoires</h3>
        
        <p>
          Les approches thérapeutiques varient selon le type et la gravité du trouble respiratoire :
        </p>
        
        <ul>
          <li>
            <strong>Médicaments</strong> : Bronchodilatateurs, corticostéroïdes, antibiotiques, antihistaminiques.
          </li>
          <li>
            <strong>Oxygénothérapie</strong> : Administration d'oxygène supplémentaire pour les patients souffrant d'hypoxémie.
          </li>
          <li>
            <strong>Thérapie par pression positive</strong> : CPAP, BiPAP pour traiter l'apnée du sommeil et certaines insuffisances respiratoires.
          </li>
          <li>
            <strong>Réhabilitation pulmonaire</strong> : Programme d'exercices, d'éducation et de soutien pour améliorer la capacité respiratoire.
          </li>
          <li>
            <strong>Chirurgie</strong> : Dans certains cas, comme la réduction de volume pulmonaire pour la BPCO sévère ou la transplantation pulmonaire.
          </li>
          <li>
            <strong>Changements de mode de vie</strong> : Arrêt du tabac, perte de poids, évitement des allergènes.
          </li>
        </ul>
        
        <h3>Prévention des troubles respiratoires</h3>
        
        <p>
          Plusieurs mesures peuvent aider à prévenir ou à réduire le risque de troubles respiratoires :
        </p>
        
        <ul>
          <li>Ne pas fumer et éviter l'exposition à la fumée secondaire</li>
          <li>Éviter l'exposition aux polluants et aux irritants</li>
          <li>Se faire vacciner contre la grippe et la pneumonie</li>
          <li>Maintenir une bonne hygiène pour prévenir les infections</li>
          <li>Traiter rapidement les infections respiratoires</li>
          <li>Maintenir un poids santé</li>
          <li>Pratiquer une activité physique régulière</li>
        </ul>
        
        <h3>Conclusion</h3>
        
        <p>
          Les troubles respiratoires représentent un groupe diversifié de conditions médicales qui peuvent affecter 
          significativement la qualité de vie. Une détection précoce, un diagnostic précis et un traitement approprié 
          sont essentiels pour gérer efficacement ces troubles et prévenir les complications.
        </p>
        
        <p>
          Si vous présentez des symptômes persistants de problèmes respiratoires, il est important de consulter un 
          professionnel de santé pour une évaluation complète et un plan de traitement adapté à votre situation.
        </p>
      </div>
    </article>
  );
}
