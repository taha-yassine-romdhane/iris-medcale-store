'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';

export default function OxygenotherapiePage() {
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
            Oxygénothérapie
          </span>
          <span className="text-blue-400">•</span>
          <time dateTime="2025-02-18" className="italic">18 février 2025</time>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4 leading-tight drop-shadow-lg">
          Comment l'oxygénothérapie peut aider les personnes souffrant de troubles respiratoires&nbsp;?
        </h1>
        <p className="text-blue-800 text-lg md:text-xl max-w-2xl">
          L'oxygénothérapie transforme la vie de milliers de patients en leur redonnant souffle, énergie et autonomie. Découvrez comment cette technique innovante peut améliorer la qualité de vie au quotidien.
        </p>
      </header>

      {/* Featured Image */}
      <div className="relative w-full h-72 md:h-96 mb-12 rounded-xl overflow-hidden shadow-lg border-4 border-blue-200">
        <Image
          src="/catalogue photo/polygraphie-domicile_banniere.webp"
          alt="Oxygénothérapie pour troubles respiratoires"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 1024px"
        />
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-none prose-blue prose-headings:text-blue-900 prose-strong:text-blue-800 prose-li:marker:text-blue-400 prose-blockquote:border-blue-200 prose-blockquote:text-blue-700 space-y-8">
        <h2 className="mt-0">Qu'est-ce que l'oxygénothérapie&nbsp;?</h2>
        <p>
          L'oxygénothérapie est une méthode médicale qui consiste à administrer de l'oxygène supplémentaire à des patients en détresse respiratoire ou souffrant d'hypoxémie (taux d'oxygène dans le sang trop bas). Cette technique est devenue essentielle dans le traitement de nombreuses pathologies pulmonaires et cardiaques.
        </p>
        <blockquote>
          <p>
            En France, près d'<strong>un million de personnes</strong> bénéficient chaque année d'une forme d'oxygénothérapie, que ce soit à l'hôpital ou à domicile.
          </p>
        </blockquote>

        <h3>Pourquoi l'oxygénothérapie est-elle nécessaire&nbsp;?</h3>
        <p>
          Quand les poumons ne parviennent plus à absorber suffisamment d’oxygène, le corps s’essouffle, les organes sont en souffrance, et la fatigue devient chronique. L'oxygénothérapie vise alors à compenser ce déficit vital, permettant de soulager l’essoufflement, d’améliorer le confort et de prévenir les complications.
        </p>

        <h3>Troubles respiratoires traités par oxygénothérapie</h3>
        <p>
          L’oxygénothérapie est prescrite dans de nombreux cas, notamment :
        </p>
        <ul>
          <li><strong>BPCO (bronchopneumopathie chronique obstructive)</strong> : maladie évolutive et fréquente chez les fumeurs</li>
          <li><strong>Fibrose pulmonaire</strong> : atteinte irréversible du tissu pulmonaire</li>
          <li><strong>Apnées du sommeil sévères</strong> : pauses respiratoires durant le sommeil</li>
          <li><strong>Asthme grave</strong> : crises d’asthme fréquentes et mal contrôlées</li>
          <li><strong>Insuffisance cardiaque</strong> : cœur incapable d’oxygéner suffisamment l’organisme</li>
          <li><strong>Pneumonie</strong> : infection aiguë du poumon</li>
          <li><strong>Hypertension pulmonaire</strong> : pression élevée dans les artères pulmonaires</li>
        </ul>

        <div className="flex flex-col md:flex-row gap-8 items-center bg-blue-50 rounded-xl p-6 shadow mt-8 mb-8">
          <div className="flex-1">
            <h4 className="text-blue-800 font-bold text-lg mb-2">À retenir</h4>
            <p className="text-blue-700">
              L’oxygénothérapie ne guérit pas la maladie, mais elle améliore considérablement le quotidien et la survie des patients souffrant de maladies respiratoires chroniques.
            </p>
          </div>
          <Image
            src="/catalogue photo/troubleres.png"
            alt="Équipements oxygénothérapie"
            width={180}
            height={120}
            className="object-cover rounded-lg shadow border-2 border-blue-200"
          />
        </div>

        <h3>Types d’oxygénothérapie</h3>
        <p>
          Selon les besoins et la mobilité du patient, le médecin peut prescrire différents modes d’administration :
        </p>
        <ol>
          <li>
            <strong>Oxygénothérapie à long terme à domicile</strong><br />
            Idéale pour les patients chroniques, elle offre autonomie et confort à la maison.
            <ul className="mt-1">
              <li><strong>Concentrateurs d’oxygène fixes</strong> : branchés sur secteur, robustes et fiables</li>
              <li><strong>Bouteilles d’oxygène</strong> : portables, pour les déplacements ou en secours</li>
              <li><strong>Systèmes d’oxygène liquide</strong> : grande autonomie, réservoirs compacts</li>
              <li><strong>Concentrateurs portables</strong> : légers, sur batterie, idéaux pour sortir</li>
            </ul>
          </li>
          <li>
            <strong>Oxygénothérapie à haut débit</strong><br />
            Utilisée à l’hôpital pour les insuffisances respiratoires aiguës, elle permet d’administrer de grands volumes d’oxygène chauffé et humidifié.
          </li>
          <li>
            <strong>Oxygénothérapie hyperbare</strong><br />
            En chambre pressurisée, réservée à des indications spécifiques comme les intoxications au monoxyde de carbone.
          </li>
        </ol>

        <h3>Bénéfices de l’oxygénothérapie</h3>
        <ul>
          <li><strong>Améliore la qualité de vie</strong>&nbsp;: réduction de l’essoufflement, regain d’énergie</li>
          <li><strong>Favorise l’autonomie</strong>&nbsp;: permet de reprendre certaines activités</li>
          <li><strong>Améliore le sommeil</strong>&nbsp;: moins de réveils nocturnes liés au manque d’oxygène</li>
          <li><strong>Diminue la charge cardiaque</strong>&nbsp;: préserve le cœur et le cerveau</li>
          <li><strong>Allonge l’espérance de vie</strong>&nbsp;: particulièrement chez les patients atteints de BPCO</li>
          <li><strong>Améliore la concentration</strong>&nbsp;: le cerveau est mieux oxygéné</li>
        </ul>

        <div className="rounded-lg bg-blue-100 border-l-4 border-blue-400 p-4 my-8">
          <strong className="text-blue-900">Témoignage :</strong>
          <p className="text-blue-800 mt-2 italic">
            “Depuis que j’ai commencé l’oxygénothérapie à domicile, je me sens moins essoufflé. J’arrive à sortir marcher avec mon petit-fils sans appréhension.”
            <br />
            <span className="text-blue-700">— Jean, 72 ans, Lyon</span>
          </p>
        </div>

        <h3>Comment l’oxygénothérapie est-elle administrée&nbsp;?</h3>
        <p>
          L’oxygène est le plus souvent administré via :
        </p>
        <ul>
          <li><strong>Canules nasales</strong> : fines sondes dans les narines, discrètes et confortables</li>
          <li><strong>Masques à oxygène</strong> : couvrent le nez et la bouche, pour des besoins plus importants</li>
          <li><strong>Masques Venturi ou à réservoir</strong> : permettent d’ajuster la concentration d’oxygène délivrée</li>
        </ul>
        <p>
          Le choix dépend de la pathologie, du débit requis et du confort du patient.
        </p>

        <h3>Prescription et suivi</h3>
        <p>
          L’oxygénothérapie est toujours prescrite par un médecin, après des tests de saturation en oxygène (oxymétrie, gaz du sang). Le traitement est personnalisé&nbsp;: débit (litres/minute), durée quotidienne, type d’appareillage… Un suivi régulier permet d’adapter le traitement selon l’évolution de la maladie.
        </p>
        <ul>
          <li>Ne jamais modifier le débit sans avis médical</li>
          <li>Vérifier le fonctionnement du matériel</li>
          <li>Consulter en cas d’aggravation des symptômes</li>
        </ul>

        <h3>Précautions et conseils pratiques</h3>
        <ul>
          <li className="font-medium">
            <span className="text-blue-600">⚠️ Sécurité&nbsp;: </span>L’oxygène favorise la combustion. Ne jamais fumer ou approcher de flamme de l’appareil.
          </li>
          <li>
            Maintenir l’équipement propre et bien entretenu
          </li>
          <li>
            Prévoir une solution de secours en cas de panne d’électricité
          </li>
          <li>
            Informer les compagnies aériennes en cas de voyage
          </li>
        </ul>

        <h3>Conclusion</h3>
        <p>
          L’oxygénothérapie est bien plus qu’un simple traitement&nbsp;: c’est une véritable aide à la vie quotidienne, qui permet à des milliers de personnes de respirer mieux chaque jour. Les progrès techniques rendent aujourd’hui l’oxygène plus accessible, plus mobile, et plus discret.
        </p>
        <p>
          En cas de doute ou pour toute question, n’hésitez pas à consulter un professionnel de santé ou à nous contacter pour être accompagné dans le choix du dispositif le plus adapté à vos besoins.
        </p>
      </div>
    </article>
  );
}