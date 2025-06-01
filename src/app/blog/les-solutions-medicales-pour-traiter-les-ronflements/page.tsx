'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';

export default function SolutionsRonflementsPage() {
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
            Troubles respiratoires
          </span>
          <span className="text-blue-400">•</span>
          <time dateTime="2025-02-21" className="italic">21 février 2025</time>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4 leading-tight drop-shadow-lg">
          Les différents types d'apnée du sommeil et les solutions médicales pour traiter les ronflements
        </h1>
        <p className="text-blue-800 text-lg md:text-xl max-w-2xl">
          Comprendre l'apnée du sommeil et ses solutions permet d'améliorer la santé, le bien-être et la qualité de vie, pour vous et vos proches.
        </p>
      </header>
      
      {/* Featured Image */}
      <div className="relative w-full h-72 md:h-96 mb-12 rounded-xl overflow-hidden shadow-lg border-4 border-blue-200">
        <Image
          src="/catalogue photo/ApneesDuSommeil-scaled.jpg"
          alt="Apnée du sommeil et solutions pour le ronflement"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 1024px"
        />
      </div>
      
      {/* Content */}
      <div className="prose prose-lg max-w-none prose-blue prose-headings:text-blue-900 prose-strong:text-blue-800 prose-li:marker:text-blue-400 prose-blockquote:border-blue-200 prose-blockquote:text-blue-700 space-y-8">
        <h2 className="mt-0">Les différents types d'apnée du sommeil</h2>
        
        <p>
          L'apnée du sommeil est un phénomène courant qui peut perturber la qualité du sommeil et affecter la santé globale. 
          Il est souvent un signe de troubles respiratoires et peut être associé à des ronflements importants. 
          Il existe différents types d'apnée du sommeil, chacun ayant ses propres caractéristiques et nécessitant 
          des approches thérapeutiques spécifiques.
        </p>
        
        <blockquote>
          <p>
            <strong>À savoir :</strong> En France, près d'1 adulte sur 5 ronfle de manière régulière et 5% souffrent d'apnée du sommeil modérée à sévère.
          </p>
        </blockquote>
        
        <h3>L'apnée obstructive du sommeil (SAOS)</h3>
        
        <p>
          L'apnée obstructive du sommeil est le type le plus courant d'apnée du sommeil. Elle se caractérise par des pauses 
          respiratoires involontaires causées par un blocage physique des voies respiratoires supérieures pendant le sommeil. 
          Ce blocage se produit généralement lorsque les muscles de la gorge se relâchent, permettant à la langue et aux tissus 
          mous de la gorge de s'affaisser et d'obstruer le passage de l'air.
        </p>
        
        <ul>
          <li>Ronflement fort et chronique</li>
          <li>Pauses respiratoires observées par le partenaire</li>
          <li>Réveils en sursaut avec sensation d'étouffement</li>
          <li>Somnolence diurne excessive</li>
          <li>Maux de tête matinaux</li>
          <li>Sécheresse buccale au réveil</li>
        </ul>
        
        <h3>L'apnée centrale du sommeil</h3>
        
        <p>
          L'apnée centrale du sommeil est caractérisée par des interruptions de la respiration pendant le sommeil en 
          l'absence d'une obstruction des voies respiratoires. Dans ce cas, le problème provient du cerveau qui ne transmet 
          pas correctement les signaux aux muscles respiratoires. Le corps "oublie" temporairement de respirer.
        </p>
        
        <ul>
          <li>Pauses respiratoires sans ronflement</li>
          <li>Réveils fréquents</li>
          <li>Insomnie</li>
          <li>Somnolence diurne</li>
          <li>Difficultés de concentration</li>
        </ul>
        
        <h3>L'apnée mixte du sommeil</h3>
        
        <p>
          L'apnée mixte se forme lorsque l'apnée centrale et le mécanisme obstructif cités précédemment s'associent. 
          Les patients présentent à la fois des caractéristiques de l'apnée obstructive et de l'apnée centrale. 
          Généralement, l'épisode commence comme une apnée centrale et se termine comme une apnée obstructive.
        </p>

        <div className="flex flex-col md:flex-row gap-8 items-center bg-blue-50 rounded-xl p-6 shadow mt-8 mb-8">
          <div className="flex-1">
            <h4 className="text-blue-800 font-bold text-lg mb-2">Témoignage</h4>
            <p className="text-blue-700">
              “Mon sommeil était très agité et je me réveillais épuisé. Après une polysomnographie, j'ai découvert que je souffrais d'apnée du sommeil. Depuis le début du traitement, ma vie a changé.”
              <br />
              <span className="text-blue-700">— Claire, 46 ans, Paris</span>
            </p>
          </div>
          <Image
            src="/catalogue photo/troubleres.png"
            alt="Ronflement et diagnostic du sommeil"
            width={180}
            height={120}
            className="object-cover rounded-lg shadow border-2 border-blue-200"
          />
        </div>
        
        <h2>Solutions médicales pour traiter les ronflements et l'apnée du sommeil</h2>
        
        <p>
          Le ronflement et l'apnée du sommeil peuvent avoir un impact significatif sur la qualité de vie des patients et 
          de leurs partenaires. Heureusement, plusieurs solutions médicales sont disponibles pour traiter ces conditions.
        </p>
        
        <h3>1. Appareils à pression positive continue (PPC/CPAP)</h3>
        
        <p>
          Le traitement par PPC (Pression Positive Continue) ou CPAP (Continuous Positive Airway Pressure) est le traitement 
          de référence pour l'apnée obstructive du sommeil modérée à sévère. Ce dispositif maintient les voies respiratoires 
          ouvertes pendant le sommeil en fournissant de l'air sous pression à travers un masque.
        </p>
        
        <p>
          Ce dispositif est généralement porté à l'aide d'un masque sur le nez ou le nez et la bouche. 
          L'appareil PPC/CPAP est efficace pour réduire les symptômes de l'apnée du sommeil et améliorer la qualité du sommeil.
        </p>
        
        <h4>Variantes de la PPC :</h4>
        
        <ul>
          <li>
            <strong>Auto-PPC (APAP)</strong> : Ajuste automatiquement la pression en fonction des besoins du patient 
            tout au long de la nuit.
          </li>
          <li>
            <strong>BiPAP (Bi-level Positive Airway Pressure)</strong> : Délivre deux niveaux de pression - une pression 
            plus élevée à l'inspiration et plus faible à l'expiration. Particulièrement utile pour les patients qui ont 
            du mal à tolérer la PPC standard.
          </li>
        </ul>
        
        <h3>2. Orthèses d'avancée mandibulaire (OAM)</h3>
        
        <p>
          Les orthèses d'avancée mandibulaire sont des dispositifs buccaux qui maintiennent la mâchoire inférieure et la langue 
          en position avancée pour dégager les voies respiratoires. Elles sont particulièrement adaptées aux cas légers à modérés 
          d'apnée du sommeil ou pour les patients ne tolérant pas la PPC.
        </p>
        
        <ul>
          <li>Non invasives</li>
          <li>Faciles à transporter</li>
          <li>Silencieuses</li>
          <li>Ne nécessitent pas d'électricité</li>
          <li>Alternative viable pour les voyageurs fréquents</li>
        </ul>
        
        <h3>3. Chirurgies pour le ronflement et l'apnée du sommeil</h3>
        
        <p>
          Plusieurs interventions chirurgicales peuvent être envisagées pour traiter le ronflement et l'apnée du sommeil, 
          particulièrement lorsque des anomalies anatomiques spécifiques sont identifiées :
        </p>
        
        <ul>
          <li>
            <strong>Uvulopalatopharyngoplastie (UPPP)</strong> : Retrait des tissus excédentaires de la gorge, 
            y compris une partie du palais mou et de la luette.
          </li>
          <li>
            <strong>Amygdalectomie et adénoïdectomie</strong> : Particulièrement efficace chez les enfants souffrant 
            d'apnée du sommeil due à des amygdales hypertrophiées.
          </li>
          <li>
            <strong>Réduction de la base de la langue</strong> : Différentes techniques pour réduire le volume de la 
            base de la langue qui peut obstruer les voies respiratoires.
          </li>
          <li>
            <strong>Chirurgie d'avancement maxillo-mandibulaire</strong> : Repositionnement de la mâchoire pour élargir 
            les voies respiratoires supérieures.
          </li>
          <li>
            <strong>Septoplastie</strong> : Correction d'une déviation de la cloison nasale pour améliorer la respiration nasale.
          </li>
        </ul>
        
        <h3>4. Stimulation du nerf hypoglosse</h3>
        
        <p>
          Cette technique récente consiste à implanter un petit dispositif qui stimule le nerf hypoglosse pendant le sommeil, 
          provoquant une contraction de la langue qui maintient les voies respiratoires ouvertes. Elle est généralement 
          réservée aux patients souffrant d'apnée obstructive modérée à sévère qui ne peuvent pas utiliser la PPC.
        </p>
        
        <h3>5. Dispositifs de positionnement</h3>
        
        <p>
          Pour les patients dont l'apnée du sommeil est principalement positionnelle (survenant surtout en position dorsale), 
          des dispositifs de positionnement peuvent être utilisés pour éviter de dormir sur le dos :
        </p>
        
        <ul>
          <li>Ceintures de positionnement</li>
          <li>Oreillers spéciaux</li>
          <li>Vêtements de nuit avec des éléments intégrés pour empêcher la position dorsale</li>
        </ul>
        
        <h3>6. Traitements spécifiques pour l'apnée centrale</h3>
        
        <p>
          Pour l'apnée centrale du sommeil, des traitements spécifiques peuvent être nécessaires :
        </p>
        
        <ul>
          <li>
            <strong>Servoventilation adaptative (ASV)</strong> : Technologie avancée qui ajuste la pression respiratoire 
            en fonction du schéma respiratoire du patient.
          </li>
          <li>
            <strong>Oxygénothérapie</strong> : Administration d'oxygène supplémentaire pendant le sommeil.
          </li>
          <li>
            <strong>Médicaments</strong> : Certains médicaments peuvent aider à stimuler la respiration ou traiter 
            les conditions sous-jacentes.
          </li>
        </ul>
        
        <h3>7. Mesures complémentaires</h3>
        
        <p>
          En complément des traitements médicaux, plusieurs mesures peuvent aider à réduire le ronflement et l'apnée du sommeil :
        </p>
        
        <ul>
          <li><strong>Perte de poids</strong> : Même une perte de poids modérée peut réduire significativement la sévérité de l'apnée du sommeil</li>
          <li><strong>Position de sommeil</strong> : Éviter de dormir sur le dos</li>
          <li><strong>Éviter l'alcool et les sédatifs</strong> : Ils peuvent aggraver le relâchement des muscles de la gorge</li>
          <li><strong>Traitement des allergies nasales</strong> : Pour améliorer la respiration nasale</li>
          <li><strong>Arrêt du tabac</strong> : Le tabagisme peut augmenter l'inflammation et la congestion des voies respiratoires</li>
          <li><strong>Humidificateur</strong> : Pour réduire la sécheresse des voies respiratoires</li>
        </ul>
        
        <div className="rounded-lg bg-blue-100 border-l-4 border-blue-400 p-4 my-8">
          <strong className="text-blue-900">Conseil d'expert :</strong>
          <p className="text-blue-800 mt-2 italic">
            “Un diagnostic précoce et une prise en charge adaptée sont essentiels pour prévenir les complications de l'apnée du sommeil.”
          </p>
        </div>
        
        <h3>L'importance du diagnostic et du suivi</h3>
        
        <p>
          Il est important de consulter un médecin si vous présentez des symptômes d'apnée du sommeil tels que la 
          somnolence diurne excessive, les troubles de la concentration ou les pauses respiratoires pendant le sommeil.
        </p>
        
        <p>
          Le diagnostic de l'apnée du sommeil est généralement posé par un médecin spécialisé à l'aide d'un test de 
          sommeil : la polysomnographie ventilatoire ou la polysomnographie complète. Ce test enregistre l'activité cérébrale, 
          la respiration, le rythme cardiaque et d'autres paramètres pendant le sommeil pour évaluer la présence et la gravité des apnées.
        </p>
        
        <p>
          Une fois le diagnostic établi, le médecin peut recommander un traitement adapté en fonction du type d'apnée du 
          sommeil et de sa sévérité. Un suivi régulier est essentiel pour ajuster le traitement si nécessaire et s'assurer 
          de son efficacité.
        </p>
        
        <h3>Conclusion</h3>
        
        <p>
          Le ronflement et l'apnée du sommeil ne sont pas simplement des nuisances nocturnes, mais peuvent avoir des 
          conséquences graves sur la santé s'ils ne sont pas traités. Grâce aux avancées médicales, de nombreuses options 
          thérapeutiques sont aujourd'hui disponibles pour traiter efficacement ces conditions et améliorer significativement 
          la qualité de vie des patients.
        </p>
        
        <p>
          Un traitement précoce de l'apnée du sommeil peut aider à réduire les risques de complications à long terme et à 
          améliorer la qualité de vie des patients. N'hésitez pas à consulter nos experts pour découvrir les solutions 
          adaptées à votre situation.
        </p>
      </div>
    </article>
  );
}