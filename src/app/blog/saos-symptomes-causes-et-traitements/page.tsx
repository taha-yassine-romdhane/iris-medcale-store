'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function SaosSymptomesCausesTraitementsPage() {
  
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
            Syndrome d&apos;Apnée Obstructive du Sommeil
          </span>
          <span className="text-blue-400">•</span>
          <time dateTime="2022-09-06" className="italic">06 septembre 2022</time>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4 leading-tight drop-shadow-lg">
          SAOS : symptômes, causes et traitements
        </h1>
      
      </header>
      
      {/* Featured Image */}
      <div className="relative w-full h-96 md:h-96 mb-12 flex items-center justify-cente">
        <div className="h-full w-full flex items-center justify-center">
          <Image
            src="/catalogue photo/AdobeStock_128403299.jpeg"
            alt="Syndrome d'apnées obstructives du sommeil"
            fill
            className="object-contain rounded-xl"
            priority
          />
        </div>
      </div>
      
      {/* Content */}
      <div className="prose prose-lg max-w-none space-y-8">
        <h2 className="mt-0 text-blue-800 font-semibold">Qu&apos;est-ce que le Syndrome d&apos;Apnées Obstructives du Sommeil (SAOS) ?</h2>
        
        <p className="text-blue-700">
          Le syndrome d&apos;apnées obstructives du sommeil (SAOS) est un trouble respiratoire caractérisé par des pauses 
          respiratoires répétées pendant le sommeil, dues à une obstruction partielle ou complète des voies aériennes supérieures. 
          Ces interruptions de la respiration peuvent durer de quelques secondes à plus d&apos;une minute et se produire plusieurs 
          fois par heure.
        </p>
        
        <blockquote className="text-blue-700">
          <p>
            <strong>Bon à savoir :</strong> Près d&apos;1 milliard de personnes dans le monde seraient touchées par l&apos;apnée du sommeil. Parmi elles, environ 425 millions de cas modérés à sévères nécessitent un traitement médical. Plus de 80&nbsp;% des personnes concernées ne sont pas diagnostiquées, selon plusieurs études internationales (The Lancet Respiratory Medicine, American Academy of Sleep Medicine).
          </p>
        </blockquote>
        
        <p className="text-blue-700">
          Le SAOS est le type d&apos;apnée du sommeil le plus courant. Il se caractérise par des pauses respiratoires involontaires 
          causées par un relâchement des muscles de la gorge, entraînant un blocage temporaire du passage de l&apos;air.
        </p>
        
        <h3 className="text-blue-800 font-semibold">Symptômes du SAOS</h3>
        
        <p className="text-blue-700">
          Les symptômes du syndrome d&apos;apnées obstructives du sommeil peuvent varier en intensité, mais les plus courants sont :
        </p>
        
        <ul className="text-blue-900">
          <li><strong className="text-blue-800">Ronflement fort et chronique</strong>, souvent interrompu par des silences suivis de respirations bruyantes</li>
          <li><strong className="text-blue-800">Somnolence diurne excessive</strong>, même après une nuit complète de sommeil</li>
          <li><strong className="text-blue-800">Réveils nocturnes</strong> avec sensation d&apos;étouffement ou de suffocation</li>
          <li><strong className="text-blue-800">Maux de tête matinaux</strong></li>
          <li><strong className="text-blue-800">Difficultés de concentration</strong> et problèmes de mémoire</li>
          <li><strong className="text-blue-800">Irritabilité</strong> et changements d&apos;humeur</li>
          <li><strong className="text-blue-800">Sécheresse buccale</strong> au réveil</li>
          <li><strong className="text-blue-800">Nycturie</strong> (besoin d&apos;uriner pendant la nuit)</li>
          <li><strong className="text-blue-800">Diminution de la libido</strong></li>
        </ul>
        
        <div className="rounded-lg bg-blue-100 border-l-4 border-blue-400 p-4 my-8">
          <strong className="text-blue-900">Témoignage :</strong>
          <p className="text-blue-800 mt-2 italic">
            “Je ronflais fort toutes les nuits et je me sentais épuisé en journée. Grâce au diagnostic et au traitement, j&apos;ai retrouvé un sommeil réparateur et plus d&apos;énergie.”
            <br />
            <span className="text-blue-700">— Marc, 52 ans, Toulouse</span>
          </p>
        </div>
        
        <h3 className="text-blue-800 font-semibold">Causes et facteurs de risque</h3>
        
        <p className="text-blue-700">
          Plusieurs facteurs peuvent contribuer au développement du SAOS :
        </p>
        
        <ul className="text-blue-900">
          <li><strong className="text-blue-800">Surpoids et obésité</strong> : L&apos;excès de tissu adipeux autour du cou peut comprimer les voies respiratoires</li>
          <li><strong className="text-blue-800">Anatomie des voies respiratoires</strong> : Une mâchoire reculée, un cou court, des amygdales hypertrophiées</li>
          <li><strong className="text-blue-800">Âge</strong> : Le risque augmente avec l&apos;âge, particulièrement après 40 ans</li>
          <li><strong className="text-blue-800">Sexe</strong> : Les hommes sont plus susceptibles de développer un SAOS que les femmes</li>
          <li><strong className="text-blue-800">Antécédents familiaux</strong> : Prédisposition génétique possible</li>
          <li><strong className="text-blue-800">Consommation d&apos;alcool et de sédatifs</strong> : Relaxe les muscles de la gorge</li>
          <li><strong className="text-blue-800">Tabagisme</strong> : Augmente l&apos;inflammation et la rétention de fluides dans les voies respiratoires</li>
          <li><strong className="text-blue-800">Position de sommeil</strong> : Dormir sur le dos aggrave souvent les symptômes</li>
        </ul>
        
        <h3 className="text-blue-800 font-semibold">Complications potentielles</h3>
        
        <p className="text-blue-700">
          Non traité, le SAOS peut entraîner diverses complications graves :
        </p>
        
        <ul className="text-blue-900">
          <li><strong className="text-blue-800">Hypertension artérielle</strong></li>
          <li><strong className="text-blue-800">Maladies cardiovasculaires (infarctus, AVC)</strong></li>
          <li><strong className="text-blue-800">Arythmies cardiaques</strong></li>
          <li><strong className="text-blue-800">Diabète de type 2</strong></li>
          <li><strong className="text-blue-800">Syndrome métabolique</strong></li>
          <li><strong className="text-blue-800">Complications lors d&apos;interventions chirurgicales</strong></li>
          <li>Problèmes hépatiques</li>
          <li>Risque accru d&apos;accidents (routiers, domestiques, professionnels)</li>
        </ul>
        
        <h3 className="text-blue-800 font-semibold">Diagnostic du SAOS</h3>
        
        <p className="text-blue-700">
          Le diagnostic du SAOS repose principalement sur :
        </p>
        
        <ul className="text-blue-900">
          <li><strong className="text-blue-800">Évaluation clinique</strong> : Antécédents médicaux, symptômes, examen physique</li>
          <li><strong className="text-blue-800">Polysomnographie</strong> : Test de sommeil réalisé en laboratoire qui enregistre l&apos;activité cérébrale, les mouvements oculaires, la fréquence cardiaque, la respiration et d&apos;autres paramètres pendant le sommeil</li>
          <li><strong className="text-blue-800">Polygraphie ventilatoire</strong> : Version simplifiée de la polysomnographie, souvent réalisée à domicile</li>
        </ul>
        
        <div className="flex flex-col md:flex-row gap-8 items-center bg-blue-50 rounded-xl p-6 shadow mt-8 mb-8">
          <div className="flex-1">
            <h4 className="text-blue-800 font-bold text-lg mb-2">Le diagnostic en pratique</h4>
            <p className="text-blue-700">
              La polysomnographie reste l&apos;examen de référence. Des capteurs enregistrent votre respiration, votre rythme cardiaque et votre sommeil, généralement sur une nuit.
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

        {/* Physiopathologie d'une apnée obstructive du sommeil */}
        <div className="bg-blue-50 rounded-xl p-6 shadow mb-8">
          <h4 className="text-blue-800 font-bold text-lg mb-4">Que se passe-t-il lors d&apos;une apnée obstructive du sommeil&nbsp;?</h4>
          <p className="text-blue-700 mb-2">
            Pendant une apnée obstructive du sommeil, le passage de l&apos;air dans les voies respiratoires supérieures se trouve temporairement bloqué. L&apos;air n&apos;arrive plus à atteindre les poumons pendant plusieurs secondes, ce qui provoque une interruption de la respiration.
          </p>
          <p className="text-blue-700 mb-2">
            Face à ce manque d&apos;oxygène, le cerveau réagit rapidement en envoyant un signal d&apos;alerte au corps. Cette stimulation provoque un micro-réveil, souvent inconscient, qui permet de reprendre la respiration.
          </p>
          <p className="text-blue-700 mb-2">
            Ce phénomène peut se répéter de nombreuses fois au cours de la nuit, parfois plusieurs centaines de fois, sans que la personne ne s&apos;en rende compte. Ces interruptions fragmentent le sommeil et expliquent la fatigue et la somnolence ressenties durant la journée.
          </p>
        </div>

        <h3 className="text-blue-800 font-semibold">Traitements du SAOS</h3>
        
        <p className="text-blue-700">
          Plusieurs options thérapeutiques sont disponibles pour traiter le SAOS :
        </p>
        
        <h4 className="text-blue-800 font-semibold">Pression Positive Continue (PPC/CPAP)</h4>
        
        <p className="text-blue-700">
          Le traitement par PPC (Pression Positive Continue) ou CPAP (Continuous Positive Airway Pressure) est le traitement de référence pour le SAOS modéré à sévère. 
          Ce dispositif maintient les voies respiratoires ouvertes pendant le sommeil en fournissant de l&apos;air sous pression à travers un masque.
        </p>
        
        <p className="text-blue-700">
          Le CPAP est généralement porté à l&apos;aide d&apos;un masque sur le nez ou le nez et la bouche. 
          Ce dispositif est efficace pour réduire les symptômes de l&apos;apnée du sommeil et améliorer la qualité du sommeil des patients.
        </p>
        

        

        
        <h4 className="text-blue-800 font-semibold"> Mesures hygiéno-diététiques</h4>
        
        <ul className="text-blue-900">
          <li>Perte de poids</li>
          <li>Éviter l&apos;alcool et les sédatifs avant le coucher</li>
          <li>Arrêt du tabac</li>
          <li>Dormir sur le côté plutôt que sur le dos</li>
          <li>Traitement des allergies nasales</li>
          <li>Régularité des horaires de sommeil</li>
        </ul>
        
        <h3 className="text-blue-800 font-semibold">Suivi et adaptation du traitement</h3>
        
        <p className="text-blue-700">
          Le traitement du SAOS nécessite un suivi régulier pour :
        </p>
        
        <ul className="text-blue-900">
          <li>Évaluer l&apos;efficacité du traitement</li>
          <li>Ajuster les paramètres de la PPC si nécessaire</li>
          <li>Résoudre les problèmes d&apos;adaptation au traitement</li>
          <li>Vérifier l&apos;évolution des symptômes</li>
        </ul>
        
        <blockquote className="not-prose border-blue-200 border p-6 rounded-xl mb-8 shadow">
          <p className="text-blue-700">
            <strong className="text-blue-800">Conseil :</strong> N&apos;hésitez pas à consulter un médecin si vous présentez des symptômes d&apos;apnée du sommeil. Un traitement précoce peut aider à réduire les risques de complications à long terme et à améliorer significativement la qualité de vie.
          </p>
        </blockquote>
      </div>
    </article>
  );
}