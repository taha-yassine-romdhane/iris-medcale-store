import Image from 'next/image';
import { Heart, Users, Trophy, Target, CheckCircle } from 'lucide-react';

const values = [
  {
    icon: Heart,
    title: "Engagement envers les patients",
    description: "Notre priorité absolue est le bien-être et le confort de nos patients"
  },
  {
    icon: Users,
    title: "Équipe expérimentée",
    description: "Des techniciens qualifiés et un personnel médical dévoué"
  },
  {
    icon: Trophy,
    title: "Excellence médicale",
    description: "Équipements de pointe et services de haute qualité"
  },
  {
    icon: Target,
    title: "Service personnalisé",
    description: "Solutions adaptées aux besoins spécifiques de chaque patient"
  }
];

const keyPoints = [
  "Installation et maintenance d'équipements médicaux à domicile",
  "Service d'assistance technique 24/7",
  "Couverture des régions de Sousse, Monastir, Mahdia, Cap Bon et Grand Tunis",
  "Équipe technique hautement qualifiée",
  "Suivi régulier des patients",
  "Solutions d'oxygénothérapie et ventilation"
];

export default function AboutPage() {
  return (
    <main className="pt-16 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            À Propos de Elite Medicale Service
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Leader en solutions d&apos;oxygénothérapie et d&apos;assistance respiratoire en Tunisie
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">
                Notre Mission
              </h2>
              <p className="text-lg text-gray-700">
                Nous sommes une société spécialisée en oxygénothérapie, offrant des solutions
                médicales pour les patients nécessitant une assistance respiratoire. Notre engagement
                est d&apos;assurer un service à domicile personnalisé pour garantir le confort et le
                bien-être de nos patients.
              </p>
              <div className="space-y-4">
                {keyPoints.map((point, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{point}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/Respiratoire-2-1024x811.jpg" 
                alt="Medical Equipment"
                fill
                className="object-cover"
                priority 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Nos Valeurs
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-md transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                  <value.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CNAM Collaboration Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">
                Convention avec CNAM
              </h2>
              <p className="text-lg text-gray-700">
                En tant que partenaire agréé de la Caisse Nationale d&apos;Assurance Maladie (CNAM),
                nous facilitons l&apos;accès aux équipements médicaux essentiels pour nos patients.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Prise en charge directe avec la CNAM</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Processus simplifié de remboursement</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Équipements conformes aux normes CNAM</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Assistance pour les formalités administratives</span>
                </div>
              </div>
              <div className="pt-4">
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg bg-white p-8">
              <Image
                src="/CNAM_Tunisie.jpg"
                alt="Logo CNAM Tunisie"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">
                  Notre Couverture
                </h2>
                <p className="text-lg text-gray-700">
                  Nos techniciens qualifiés couvrent les régions de Sousse, Monastir, Mahdia,
                  Cap Bon et le Grand Tunis, assurant une installation rapide et un suivi
                  technique rigoureux.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900">Régions Nord</h4>
                    <ul className="mt-2 space-y-2">
                      <li className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="text-gray-700">Grand Tunis</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="text-gray-700">Cap Bon</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900">Régions Centre</h4>
                    <ul className="mt-2 space-y-2">
                      <li className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="text-gray-700">Sousse</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="text-gray-700">Monastir</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="text-gray-700">Mahdia</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="relative h-[500px] p-8 flex items-center justify-center bg-white">
                <div className="relative w-full h-full max-w-[500px]">
                  <Image
                    src="/tn-04.png"
                    alt="Carte de couverture en Tunisie"
                    fill
                    className="object-contain"
                    priority
                  />

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Besoin de nos services ?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Contactez-nous dès aujourd&apos;hui pour discuter de vos besoins en matière de santé respiratoire
          </p>
          <a
            href="/contact"
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors"
          >
            Contactez-nous
          </a>
        </div>
      </section>
    </main>
  );
}
