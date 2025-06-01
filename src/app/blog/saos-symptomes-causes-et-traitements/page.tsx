'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';

export default function SaosSymptomesCausesTraitementsPage() {
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
            SAOS
          </span>
          <span className="text-blue-400">•</span>
          <time dateTime="2022-09-06" className="italic">06 septembre 2022</time>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4 leading-tight drop-shadow-lg">
          SAOS : symptômes, causes et traitements
        </h1>
        <p className="text-blue-800 text-lg md:text-xl max-w-2xl">
          Le Syndrome d'Apnées Obstructives du Sommeil (SAOS) est un problème fréquent mais souvent sous-diagnostiqué. Découvrez ses symptômes, ses causes et les solutions pour mieux dormir et protéger votre santé.
        </p>
      </header>
      
      {/* Featured Image */}
      <div className="relative w-full h-72 md:h-96 mb-12 rounded-xl overflow-hidden shadow-lg border-4 border-blue-200">
        <Image
          src="/catalogue photo/Formation-Syndrome-dapnee-obstructive-du-sommeil-SAOS-et-ATM.png"
          alt="Syndrome d'apnées obstructives du sommeil"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 1024px"
        />
      </div>
      
      {/* Content */}
      <div className="prose prose-lg max-w-none prose-blue prose-headings:text-blue-900 prose-strong:text-blue-800 prose-li:marker:text-blue-400 prose-blockquote:border-blue-200 prose-blockquote:text-blue-700 space-y-8">
        <h2 className="mt-0">Qu'est-ce que le Syndrome d'Apnées Obstructives du Sommeil (SAOS) ?</h2>
        
        <p>
          Le syndrome d'apnées obstructives du sommeil (SAOS) est un trouble respiratoire caractérisé par des pauses 
          respiratoires répétées pendant le sommeil, dues à une obstruction partielle ou complète des voies aériennes supérieures. 
          Ces interruptions de la respiration peuvent durer de quelques secondes à plus d'une minute et se produire plusieurs 
          fois par heure.
        </p>
        
        <blockquote>
          <p>
            <strong>Bon à savoir :</strong> En France, près d'1,5 million de personnes seraient concernées par le SAOS, dont une grande partie l’ignore.
          </p>
        </blockquote>
        
        <p>
          Le SAOS est le type d'apnée du sommeil le plus courant. Il se caractérise par des pauses respiratoires involontaires 
          causées par un relâchement des muscles de la gorge, entraînant un blocage temporaire du passage de l'air.
        </p>
        
        <h3>Symptômes du SAOS</h3>
        
        <p>
          Les symptômes du syndrome d'apnées obstructives du sommeil peuvent varier en intensité, mais les plus courants sont :
        </p>
        
        <ul>
          <li><strong>Ronflement fort et chronique</strong>, souvent interrompu par des silences suivis de respirations bruyantes</li>
          <li><strong>Somnolence diurne excessive</strong>, même après une nuit complète de sommeil</li>
          <li><strong>Réveils nocturnes</strong> avec sensation d'étouffement ou de suffocation</li>
          <li><strong>Maux de tête matinaux</strong></li>
          <li><strong>Difficultés de concentration</strong> et problèmes de mémoire</li>
          <li><strong>Irritabilité</strong> et changements d'humeur</li>
          <li><strong>Sécheresse buccale</strong> au réveil</li>
          <li><strong>Nycturie</strong> (besoin d'uriner pendant la nuit)</li>
          <li><strong>Diminution de la libido</strong></li>
        </ul>
        
        <div className="rounded-lg bg-blue-100 border-l-4 border-blue-400 p-4 my-8">
          <strong className="text-blue-900">Témoignage :</strong>
          <p className="text-blue-800 mt-2 italic">
            “Je ronflais fort toutes les nuits et je me sentais épuisé en journée. Grâce au diagnostic et au traitement, j’ai retrouvé un sommeil réparateur et plus d’énergie.”
            <br />
            <span className="text-blue-700">— Marc, 52 ans, Toulouse</span>
          </p>
        </div>
        
        <h3>Causes et facteurs de risque</h3>
        
        <p>
          Plusieurs facteurs peuvent contribuer au développement du SAOS :
        </p>
        
        <ul>
          <li><strong>Surpoids et obésité</strong> : L'excès de tissu adipeux autour du cou peut comprimer les voies respiratoires</li>
          <li><strong>Anatomie des voies respiratoires</strong> : Une mâchoire reculée, un cou court, des amygdales hypertrophiées</li>
          <li><strong>Âge</strong> : Le risque augmente avec l'âge, particulièrement après 40 ans</li>
          <li><strong>Sexe</strong> : Les hommes sont plus susceptibles de développer un SAOS que les femmes</li>
          <li><strong>Antécédents familiaux</strong> : Prédisposition génétique possible</li>
          <li><strong>Consommation d'alcool et de sédatifs</strong> : Relaxe les muscles de la gorge</li>
          <li><strong>Tabagisme</strong> : Augmente l'inflammation et la rétention de fluides dans les voies respiratoires</li>
          <li><strong>Position de sommeil</strong> : Dormir sur le dos aggrave souvent les symptômes</li>
        </ul>
        
        <h3>Complications potentielles</h3>
        
        <p>
          Non traité, le SAOS peut entraîner diverses complications graves :
        </p>
        
        <ul>
          <li>Hypertension artérielle</li>
          <li>Maladies cardiovasculaires (infarctus, AVC)</li>
          <li>Arythmies cardiaques</li>
          <li>Diabète de type 2</li>
          <li>Syndrome métabolique</li>
          <li>Complications lors d'interventions chirurgicales</li>
          <li>Problèmes hépatiques</li>
          <li>Risque accru d'accidents (routiers, domestiques, professionnels)</li>
        </ul>
        
        <h3>Diagnostic du SAOS</h3>
        
        <p>
          Le diagnostic du SAOS repose principalement sur :
        </p>
        
        <ul>
          <li><strong>Évaluation clinique</strong> : Antécédents médicaux, symptômes, examen physique</li>
          <li><strong>Polysomnographie</strong> : Test de sommeil réalisé en laboratoire qui enregistre l'activité cérébrale, les mouvements oculaires, la fréquence cardiaque, la respiration et d'autres paramètres pendant le sommeil</li>
          <li><strong>Polygraphie ventilatoire</strong> : Version simplifiée de la polysomnographie, souvent réalisée à domicile</li>
        </ul>
        
        <div className="flex flex-col md:flex-row gap-8 items-center bg-blue-50 rounded-xl p-6 shadow mt-8 mb-8">
          <div className="flex-1">
            <h4 className="text-blue-800 font-bold text-lg mb-2">Le diagnostic en pratique</h4>
            <p className="text-blue-700">
              La polysomnographie reste l’examen de référence. Des capteurs enregistrent votre respiration, votre rythme cardiaque et votre sommeil, généralement sur une nuit.
            </p>
          </div>
          <Image
            src="/catalogue photo/polygraphie-domicile_banniere.webp"
            alt="Polysomnographie pour diagnostic SAOS"
            width={180}
            height={120}
            className="object-cover rounded-lg shadow border-2 border-blue-200"
          />
        </div>
        
        <h3>Traitements du SAOS</h3>
        
        <p>
          Plusieurs options thérapeutiques sont disponibles pour traiter le SAOS :
        </p>
        
        <h4>1. Pression Positive Continue (PPC/CPAP)</h4>
        
        <p>
          Le traitement par PPC (Pression Positive Continue) ou CPAP (Continuous Positive Airway Pressure) est le traitement de référence pour le SAOS modéré à sévère. 
          Ce dispositif maintient les voies respiratoires ouvertes pendant le sommeil en fournissant de l'air sous pression à travers un masque.
        </p>
        
        <p>
          Le CPAP est généralement porté à l'aide d'un masque sur le nez ou le nez et la bouche. 
          Ce dispositif est efficace pour réduire les symptômes de l'apnée du sommeil et améliorer la qualité du sommeil des patients.
        </p>
        
        <h4>2. Orthèses d'avancée mandibulaire</h4>
        
        <p>
          Ces dispositifs buccaux maintiennent la mâchoire inférieure et la langue en position avancée pour dégager les voies respiratoires. 
          Ils sont particulièrement adaptés aux cas légers à modérés ou aux patients ne tolérant pas la PPC.
        </p>
        
        <h4>3. Chirurgie</h4>
        
        <p>
          Différentes interventions chirurgicales peuvent être envisagées selon la cause de l'obstruction :
        </p>
        
        <ul>
          <li>Uvulopalatopharyngoplastie (UPPP)</li>
          <li>Amygdalectomie et adénoïdectomie</li>
          <li>Chirurgie d'avancement maxillo-mandibulaire</li>
          <li>Chirurgie bariatrique (en cas d'obésité sévère)</li>
        </ul>
        
        <h4>4. Stimulation du nerf hypoglosse</h4>
        
        <p>
          Cette technique récente consiste à implanter un dispositif qui stimule le nerf hypoglosse pour maintenir les voies respiratoires ouvertes pendant le sommeil.
        </p>
        
        <h4>5. Mesures hygiéno-diététiques</h4>
        
        <ul>
          <li>Perte de poids</li>
          <li>Éviter l'alcool et les sédatifs avant le coucher</li>
          <li>Arrêt du tabac</li>
          <li>Dormir sur le côté plutôt que sur le dos</li>
          <li>Traitement des allergies nasales</li>
          <li>Régularité des horaires de sommeil</li>
        </ul>
        
        <h3>Suivi et adaptation du traitement</h3>
        
        <p>
          Le traitement du SAOS nécessite un suivi régulier pour :
        </p>
        
        <ul>
          <li>Évaluer l'efficacité du traitement</li>
          <li>Ajuster les paramètres de la PPC si nécessaire</li>
          <li>Résoudre les problèmes d'adaptation au traitement</li>
          <li>Vérifier l'évolution des symptômes</li>
        </ul>
        
        <blockquote>
          <p>
            <strong>Conseil :</strong> N'hésitez pas à consulter un médecin si vous présentez des symptômes d'apnée du sommeil. Un traitement précoce peut aider à réduire les risques de complications à long terme et à améliorer significativement la qualité de vie.
          </p>
        </blockquote>
      </div>
    </article>
  );
}